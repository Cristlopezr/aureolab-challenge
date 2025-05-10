import { Request, Response } from 'express';
import { prisma } from '../lib/prisma-client';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({ include: { images: true } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
};
