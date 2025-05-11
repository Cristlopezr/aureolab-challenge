import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import eShopApi from '../../../api/eShop-api';
import type { Order, OrderWithDetails } from '../interfaces/order';
import { toast } from 'react-toastify';
import { useUiStore } from '../../../store/ui-store';

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
    const queryClient = useQueryClient();
    const closeFullRefund = useUiStore(state => state.closeFullRefund);
    const closePartialRefund = useUiStore(state => state.closePartialRefund);
    return useMutation({
        mutationFn: async ({ orderId, amount }: { orderId: string; amount?: string }) =>
            await handleRefund({ orderId, amount }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['orderDetail', variables.orderId] });
            toast.success('Refund processed successfully');
        },
        onError: () => {
            toast.error('An error occurred while processing the refund');
        },
        onSettled: () => {
            closeFullRefund();
            closePartialRefund();
        },
    });
}

const handleRefund = async ({ orderId, amount }: { orderId: string; amount?: string }) => {
    try {
        const { data } = await eShopApi.post('/orders/refund', {
            orderId,
            amount,
        });
        return data;
    } catch (error) {
        console.error('Error requesting refund', error);
    }
};
