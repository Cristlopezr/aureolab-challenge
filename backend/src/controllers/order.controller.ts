import { Request, Response } from 'express';
import { prisma } from '../lib/prisma-client';
import Stripe from 'stripe';
import { envs } from '../config/envs';

const stripe = new Stripe(envs.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req: Request, res: Response) => {
    const cart = [
        {
            id: '084016ce-d651-4c11-a28c-e982f519e95c',
            quantity: 2,
        },
        {
            id: '28bc3ea4-b27f-466b-ae66-811ae3110e4b',
            quantity: 1,
        },
    ];

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
            res.status(400).json({ message: `One or more products don't exists` });
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
                orderItems: {
                    create: cart.map(item => ({
                        quantity: item.quantity,
                        product: { connect: { id: item.id } },
                    })),
                },
            },
        });
        console.log({ session });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong.',
        });
    }
};
