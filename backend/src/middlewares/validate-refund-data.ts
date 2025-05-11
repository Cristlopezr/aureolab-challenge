import { NextFunction, Request, Response } from 'express';

export const validateRefundData = (req: Request, res: Response, next: NextFunction) => {
    const { orderId, amount } = req.body;
    if (!orderId) {
        res.status(400).json({ error: 'orderId is required' });
        return;
    }

    if (amount) {
        const numberAmount = Number(amount);

        if (Number.isNaN(numberAmount) || numberAmount <= 0) {
            res.status(400).json({ error: 'amount must be a valid number greater than 0' });
            return;
        }

        req.body.amountInCents = numberAmount * 100;
    }

    next();
};
