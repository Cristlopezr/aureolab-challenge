import { useEffect } from 'react';
import { useCartStore } from '../../../store/cart-store';

const CART_STORAGE_KEY = 'cart';

export default function SaveCartToLocalStorage() {
    const items = useCartStore(state => state.items);

    useEffect(() => {
        if (items.length > 0) {
            console.log('cambio');
            const minimalItems = items.map(({ productId, quantity }) => ({ productId, quantity }));
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimalItems));
        }
    }, [items]);

    return null;
}
