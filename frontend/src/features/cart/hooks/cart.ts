import { useMutation } from '@tanstack/react-query';
import eShopApi from '../../../api/eShop-api';
import type { CartItem } from '../interfaces/cart';

export default function useHandleCheckout() {
    return useMutation({
        mutationFn: async (cart: CartItem[]) => await handleCheckout(cart),
    });
}

const handleCheckout = async (cart: CartItem[]) => {
    try {
        const { data } = await eShopApi.post('/orders/create-checkout-session', {
            cart,
        });

        window.location.href = data.url;
    } catch (error) {
        console.error('Error al crear sesión de pago:', error);
    }
};
