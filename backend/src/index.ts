import express from 'express';
import { prisma } from './lib/prisma-client';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import cors from 'cors';
import { envs } from './config/envs';
const stripe = new Stripe(envs.STRIPE_SECRET_KEY);

const app = express();

app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(cors());

app.get('/', async (req, res) => {
    res.status(202).json({
        hello: 'world',
    });
});

app.post('/create-checkout-session', async (req, res) => {
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
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
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
});

app.listen(envs.PORT, () => {
    console.log(`App listening in port ${envs.PORT}`);
});
