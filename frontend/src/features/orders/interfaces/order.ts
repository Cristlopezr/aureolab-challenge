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
