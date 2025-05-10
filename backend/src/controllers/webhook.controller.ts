import { Request, Response } from 'express';
import Stripe from 'stripe';
import { envs } from '../config/envs';
import { prisma } from '../lib/prisma-client';

const stripe = new Stripe(envs.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req: Request, res: Response) => {
    const endpointSecret = envs.STRIPE_ENDPOINT_SECRET;
    let event = req.body;

    if (!endpointSecret) {
        console.error('Stripe endpoint secret not found. Rejecting request.');
        res.sendStatus(500);
        return;
    }

    const signature = req.headers['stripe-signature'];
    try {
        event = stripe.webhooks.constructEvent(req.body, signature!, endpointSecret);
    } catch (err: any) {
        console.log(`Webhook signature verification failed.`, err.message);
        res.sendStatus(400);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const stripeSessionId = session.id;
        const stripePaymentIntentId = session.payment_intent;

        const order = await prisma.order.findUnique({
            where: {
                stripeSessionId: stripeSessionId,
            },
        });

        if (!order) {
            console.error(`Order not found with sessionId: ${stripeSessionId}`);
            res.sendStatus(400);
            return;
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                stripePaymentIntentId: stripePaymentIntentId,
                status: 'PAID',
            },
        });

        console.log('Order updated successfully');
    }

    res.send();
};
