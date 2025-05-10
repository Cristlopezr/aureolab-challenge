import { useQuery } from '@tanstack/react-query';
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
