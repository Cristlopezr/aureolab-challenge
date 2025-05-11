import { Router } from 'express';
import { createCheckoutSession, createRefund, getOrderDetails, getOrders } from '../controllers/order.controller';
import { validateRefundData } from '../middlewares/validate-refund-data';
import { validateCart } from '../middlewares/validate-cart';

export const orderRouter = Router();
orderRouter.post('/create-checkout-session', validateCart, createCheckoutSession);
orderRouter.get('/', getOrders);
orderRouter.post('/refund', validateRefundData, createRefund);
orderRouter.get('/:id', getOrderDetails);
