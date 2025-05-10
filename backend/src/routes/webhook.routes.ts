import { Router } from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller';
import express from 'express';

export const webhookRouter = Router();

webhookRouter.post('/', express.raw({ type: 'application/json' }), handleStripeWebhook);
