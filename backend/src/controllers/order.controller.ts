import { Request, Response } from 'express';
import { prisma } from '../lib/prisma-client';
import { stripe } from '../lib/stripe';
import { envs } from '../config/envs';

interface CartItem {
    productId: string;
    quantity: number;
}

export const getOrderDetails = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orderDetails = await prisma.order.findFirst({
            where: {
                id,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                images: true,
                            },
                        },
                    },
                },
                refunds: true,
            },
        });

        if (!orderDetails) {
            res.status(404).json({
                message: 'Order not found',
            });
            return;
        }

        res.status(200).json(orderDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Something went wrong. Error: ${error}`,
        });
    }
};

//Here we could send back all the orders if we wanted to, with status paid | failed | pending
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: 'PAID',
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            error: `Something went wrong. Error: ${error}`,
        });
    }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
    const cart: CartItem[] = req.body.cart;

    const { totalAmount, line_items } = await getCartTotal(cart);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${envs.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: envs.APP_URL,
        });

        await prisma.order.create({
            data: {
                status: 'PENDING',
                stripeSessionId: session.id,
                amount: totalAmount,
                stripeCreatedAt: new Date(session.created * 1000),
                orderItems: {
                    create: cart.map(item => ({
                        quantity: item.quantity,
                        product: { connect: { id: item.productId } },
                    })),
                },
            },
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Something went wrong. Error: ${error}`,
        });
    }
};

export const createRefund = async (req: Request, res: Response) => {
    const { orderId, amountInCents } = req.body;

    try {
        const order = await getOrderById(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        const remainingAmountToRefund = order.amount - order.totalRefunded;

        if (amountInCents && amountInCents > remainingAmountToRefund) {
            res.status(400).json({ error: 'Refund amount exceeds the remaining balance to refund' });
            return;
        }

        const refund = await stripe.refunds.create({
            payment_intent: order.stripePaymentIntentId!,
            reason: 'requested_by_customer',
            ...(amountInCents ? { amount: amountInCents } : {}),
        });

        await Promise.all([
            prisma.refund.create({
                data: {
                    amount: refund.amount,
                    stripeRefundId: refund.id,
                    orderId: order.id,
                    stripeCreatedAt: new Date(refund.created * 1000),
                    currency: refund.currency,
                    status: refund.status ?? '',
                    reason: refund.reason,
                },
            }),
            prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    totalRefunded: order.totalRefunded + refund.amount,
                },
            }),
        ]);

        res.status(200).json({ message: 'Refund processed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while processing the refund: ${error}` });
    }
};

async function getCartTotal(cart: CartItem[]) {
    const productIds = cart.map(item => item.productId);

    try {
        const products = await prisma.product.findMany({
            where: {
                id: { in: productIds },
            },
            include: {
                images: true,
            },
        });

        if (products.length !== cart.length) {
            throw new Error(`One or more products don't exists`);
        }

        let totalAmount = 0;

        const line_items = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) throw new Error('Product not found.');

            const productImage = product.images[0]?.url || '';
            const unit_amount = product.price;

            totalAmount += unit_amount * item.quantity;

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        images: [`${productImage}?w=150`],
                    },
                    unit_amount,
                },
                quantity: item.quantity,
            };
        });

        return { totalAmount, line_items };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getOrderById = async (id: string) => {
    try {
        const order = await prisma.order.findFirst({
            where: {
                id,
            },
        });
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
