import { useMutation, useQuery } from '@tanstack/react-query';
import eShopApi from '../../../api/eShop-api';
import type { Order, OrderWithDetails } from '../interfaces/order';

export const useGetOrders = () => {
    const query = useQuery({
        queryKey: ['orders'],
        queryFn: async () => await getOrders(),
    });

    return query;
};

const getOrders = async () => {
    try {
        const { data } = await eShopApi.get<Order[]>('/orders');
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const useGetOrderDetail = (id: string) => {
    const query = useQuery({
        queryKey: ['orderDetail', id],
        queryFn: async () => await getOrderDetail(id),
    });

    return query;
};

const getOrderDetail = async (id: string) => {
    try {
        const { data } = await eShopApi.get<OrderWithDetails>(`/orders/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default function useOrderRefund() {
    return useMutation({
        mutationFn: async (orderId: string, amount?: string) => await handleRefund(orderId, amount),
    });
}

const handleRefund = async (orderId: string, amount?: string) => {
    try {
        const { data } = await eShopApi.post('/orders/refund', {
            orderId,
            amount,
        });
    } catch (error) {
        console.error('Error al crear sesión de pago:', error);
    }
};
