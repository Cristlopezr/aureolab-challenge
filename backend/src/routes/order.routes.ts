import { Router } from 'express';
import { createCheckoutSession } from '../controllers/order.controller';

export const orderRouter = Router();
orderRouter.post('/create-checkout-session', createCheckoutSession);
