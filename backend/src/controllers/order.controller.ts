import { Request, Response } from 'express';
import { prisma } from '../lib/prisma-client';
import { stripe } from '../lib/stripe';

interface CartItem {
    id: string;
    quantity: number;
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({ include: { orderItems: true, refunds: true } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
    const cart: CartItem[] = req.body.cart;

    const productIds = cart.map(item => item.id);

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
            res.status(400).json({ error: `One or more products don't exists` });
            return;
        }

        let totalAmount = 0;

        const line_items = cart.map(item => {
            const product = products.find(p => p.id === item.id);
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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173',
            cancel_url: 'http://localhost:5173',
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
                        product: { connect: { id: item.id } },
                    })),
                },
            },
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Something went wrong.',
        });
    }
};

export const createRefund = async (req: Request, res: Response) => {
    const { orderId, amount } = req.body;

    if (!orderId || typeof orderId !== 'string') {
        res.status(400).json({ error: 'orderId is required and must be a string' });
        return;
    }

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        res.status(400).json({ error: 'amount must be a valid number greater than 0' });
        return;
    }

    try {
        const order = await getOrderById(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        /* const paymentIntent = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId!);
        const chargeId = paymentIntent.charges.data[0].id; */

        const refund = await stripe.refunds.create({
            payment_intent: order.stripePaymentIntentId!,
            reason: 'requested_by_customer',
            ...(amount ? { amount } : {}), // Si no se pasa amount, será total
        });

        await prisma.refund.create({
            data: {
                amount: refund.amount,
                stripeRefundId: refund.id,
                orderId: order.id,
                stripeCreatedAt: new Date(refund.created * 1000),
                currency: refund.currency,
                status: refund.status ?? '',
                reason: refund.reason,
            },
        });

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                totalRefunded: order.totalRefunded + refund.amount,
            },
        });

        res.json({ message: 'Reembolso creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar el reembolso' });
    }
};

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
