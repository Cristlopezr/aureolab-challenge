import { Router } from 'express';
import { createCheckoutSession, createRefund, getOrders } from '../controllers/order.controller';

export const orderRouter = Router();
orderRouter.post('/create-checkout-session', createCheckoutSession);
orderRouter.get('/', getOrders);
orderRouter.post('/refund', createRefund);
