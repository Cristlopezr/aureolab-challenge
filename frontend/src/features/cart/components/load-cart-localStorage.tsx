import { useEffect } from 'react';
import { useCartStore } from '../../../store/cart-store';
import useGetProducts from '../../products/hooks/products';
import type { CartItem } from '../interfaces/cart';

const CART_STORAGE_KEY = 'cart';

export default function LoadCartFromLocalStorage() {
    const setItems = useCartStore(state => state.setItems);
    const { data: products } = useGetProducts();

    useEffect(() => {
        if (!products) return;

        const productsFromLocalStorage = localStorage.getItem(CART_STORAGE_KEY);
        if (!productsFromLocalStorage) return;

        const parsedProductsFromLocalStorage: { productId: string; quantity: number }[] =
            JSON.parse(productsFromLocalStorage);

        const cartProducts = parsedProductsFromLocalStorage
            .map(({ productId, quantity }) => {
                const product = products.find(p => p.id === productId);
                if (!product) return null;

                return {
                    productId,
                    name: product.name,
                    price: product.price,
                    image: product.images[0].url,
                    quantity,
                };
            })
            .filter(Boolean);

        setItems(cartProducts as CartItem[]);
    }, [products]);

    return null;
}
