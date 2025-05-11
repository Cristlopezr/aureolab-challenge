import { useQuery } from '@tanstack/react-query';
import eShopApi from '../../../api/eShop-api';
import type { Product } from '../interfaces/product.interfaces';

export default function useGetProducts() {
    const query = useQuery({
        queryKey: ['products'],
        queryFn: async () => await getProducts(),
    });

    return query;
}

const getProducts = async () => {
    try {
        const { data } = await eShopApi.get<Product[]>('/products');
        return data;
    } catch (error) {
        throw new Error('Unable to load the products. Please try again later.');
    }
};
