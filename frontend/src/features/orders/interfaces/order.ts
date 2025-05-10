import type { Product } from '../../products/interfaces/product.interfaces';

type OrderStatus = 'PAID' | 'PENDING' | 'FAILED';

export interface Order {
    amount: number;
    createdAt: string;
    customerEmail: string;
    customerName: string;
    id: string;
    status: OrderStatus;
    totalRefunded: number;
}

export interface OrderDetail {
    product: Product;
    quantity: number;
}

export interface OrderWithDetails extends Order {
    orderItems: OrderDetail[];
    refunds: Refund[];
}

export interface Refund {
    id: string;
    amount: number;
    status: string;
    reason: string;
    createdAt: string;
}
