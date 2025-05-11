import { Router } from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller';
import express from 'express';
import { verifyStripeWebhook } from '../middlewares/verify-stripe-webhook';

export const webhookRouter = Router();

webhookRouter.post('/', express.raw({ type: 'application/json' }), verifyStripeWebhook, handleStripeWebhook);
