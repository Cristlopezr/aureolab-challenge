import { NextFunction, Request, Response } from 'express';
import { stripe } from '../lib/stripe';
import { envs } from '../config/envs';

export const verifyStripeWebhook = (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers['stripe-signature'];
    try {
        req.body = stripe.webhooks.constructEvent(req.body, signature!, envs.STRIPE_ENDPOINT_SECRET);
        next();
    } catch (err: any) {
        console.error('Invalid Stripe signature', err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
};
