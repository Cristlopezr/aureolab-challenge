import { Request, Response } from 'express';
import { prisma } from '../lib/prisma-client';
import { stripe } from '../lib/stripe';

export const handleStripeWebhook = async (req: Request, res: Response) => {
    let event = req.body;

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            await handleCheckoutSessionCompleted(session);
        }

        if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object;
            await handlePaymentIntentFailed(paymentIntent);
        }

        res.send();
    } catch (error) {
        console.error('Error processing Stripe webhook:', error);
        if (error instanceof Error) {
            res.status(400).send(`Webhook Error`);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

async function handleCheckoutSessionCompleted(session: any) {
    const stripeSessionId = session.id;
    const stripePaymentIntentId = session.payment_intent;

    const order = await prisma.order.findUnique({
        where: {
            stripeSessionId: stripeSessionId,
        },
    });

    if (!order) {
        throw new Error(`Order not found with sessionId: ${stripeSessionId}`);
    }

    await prisma.order.update({
        where: {
            id: order.id,
        },
        data: {
            stripePaymentIntentId: stripePaymentIntentId,
            status: 'PAID',
            customerEmail: session.customer_details.email,
            customerName: session.customer_details.name,
        },
    });

    console.log('Order updated successfully');
}

async function handlePaymentIntentFailed(paymentIntent: any) {
    const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
    });

    const checkoutSession = session.data[0];

    if (!checkoutSession) {
        throw new Error('Checkout session not found');
    }

    const order = await prisma.order.findUnique({
        where: { stripeSessionId: checkoutSession.id },
    });

    if (order) {
        await prisma.order.update({
            where: { id: order.id },
            data: { status: 'FAILED' },
        });
        console.log('Order marked as FAILED');
    }
}
