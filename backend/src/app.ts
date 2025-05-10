import express from 'express';
import cors from 'cors';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';
import { webhookRouter } from './routes/webhook.routes';

const app = express();

app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(cors());
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/webhook', webhookRouter);

export default app;
