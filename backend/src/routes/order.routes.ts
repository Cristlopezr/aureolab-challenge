import { Router } from 'express';
import { createCheckoutSession, createRefund, getOrderDetails, getOrders } from '../controllers/order.controller';

export const orderRouter = Router();
orderRouter.post('/create-checkout-session', createCheckoutSession);
orderRouter.get('/', getOrders);
orderRouter.post('/refund', createRefund);
orderRouter.get('/:id', getOrderDetails);
