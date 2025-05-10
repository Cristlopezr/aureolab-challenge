import { useQuery } from '@tanstack/react-query';
import eShopApi from '../../../api/eShop-api';
import type { Order } from '../interfaces/order';

export default function useGetOrders() {
    const query = useQuery({
        queryKey: ['orders'],
        queryFn: async () => await getOrders(),
    });

    return query;
}

const getOrders = async () => {
    try {
        const { data } = await eShopApi.get<Order[]>('/orders');
        return data;
    } catch (error) {
        console.log(error);
    }
};
