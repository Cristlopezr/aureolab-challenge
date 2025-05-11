import { NextFunction, Request, Response } from 'express';

export const validateCart = (req: Request, res: Response, next: NextFunction) => {
    const { cart } = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
        res.status(400).json({ error: 'Cart is required and must contain at least one item.' });
        return;
    }

    next();
};
