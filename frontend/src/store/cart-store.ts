import { create } from 'zustand';
import type { CartItem } from '../features/cart/interfaces/cart';
import { toast } from 'react-toastify';

const CART_STORAGE_KEY = 'cart';

function saveToLocalStorage(items: CartItem[]) {
    const minimalItems = items.map(({ productId, quantity }) => ({ productId, quantity }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimalItems));
}

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItemCompletely: (productId: string) => void;
    decreaseItemQuantity: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalAmount: () => number;
    setItems: (items: CartItem[]) => void;
}

export const useCartStore = create<CartStore>()((set, get) => ({
    items: [],

    setItems: items => {
        set({ items });
    },

    addItem: item =>
        set(state => {
            const existingItem = state.items.find(i => i.productId === item.productId);
            let updatedItems;

            if (existingItem) {
                updatedItems = state.items.map(i =>
                    i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                updatedItems = [...state.items, { ...item, quantity: 1 }];
                toast.success('Added to cart');
            }

            saveToLocalStorage(updatedItems);
            return { items: updatedItems };
        }),

    removeItemCompletely: productId =>
        set(state => {
            const updatedItems = state.items.filter(item => item.productId !== productId);
            saveToLocalStorage(updatedItems);
            return { items: updatedItems };
        }),

    decreaseItemQuantity: productId =>
        set(state => {
            const existingItem = state.items.find(i => i.productId === productId);
            if (!existingItem) return state;

            let updatedItems;
            if (existingItem.quantity > 1) {
                updatedItems = state.items.map(i =>
                    i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
                );
            } else {
                updatedItems = state.items.filter(i => i.productId !== productId);
            }

            saveToLocalStorage(updatedItems);
            return { items: updatedItems };
        }),

    updateQuantity: (productId, quantity) =>
        set(state => {
            const updatedItems = state.items.map(item => (item.productId === productId ? { ...item, quantity } : item));
            saveToLocalStorage(updatedItems);
            return { items: updatedItems };
        }),

    clearCart: () => {
        localStorage.removeItem(CART_STORAGE_KEY);
        set({ items: [] });
    },

    getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

    getTotalAmount: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));
