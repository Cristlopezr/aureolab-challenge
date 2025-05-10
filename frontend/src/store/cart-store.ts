import { create } from 'zustand';
import type { CartItem } from '../features/cart/interfaces/cart';

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
    setItems: items => set({ items }),
    addItem: item =>
        set(state => {
            const existingItem = state.items.find(i => i.productId === item.productId);
            if (existingItem) {
                return {
                    items: state.items.map(i =>
                        i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

    removeItemCompletely: productId =>
        set(state => ({
            items: state.items.filter(item => item.productId !== productId),
        })),

    decreaseItemQuantity: productId =>
        set(state => {
            const existingItem = state.items.find(i => i.productId === productId);
            if (!existingItem) return state;

            if (existingItem.quantity > 1) {
                return {
                    items: state.items.map(i => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i)),
                };
            } else {
                // Si solo queda uno, lo elimina
                return {
                    items: state.items.filter(i => i.productId !== productId),
                };
            }
        }),

    updateQuantity: (productId, quantity) =>
        set(state => ({
            items: state.items.map(item => (item.productId === productId ? { ...item, quantity } : item)),
        })),

    clearCart: () => set({ items: [] }),

    getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

    getTotalAmount: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));
