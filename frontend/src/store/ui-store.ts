import { create } from 'zustand';

type UiState = {
    isPartialRefundOpen: boolean;
    isFullRefundOpen: boolean;
    openPartialRefund: () => void;
    closePartialRefund: () => void;
    openFullRefund: () => void;
    closeFullRefund: () => void;
};

export const useUiStore = create<UiState>(set => ({
    isPartialRefundOpen: false,
    isFullRefundOpen: false,
    openPartialRefund: () => set({ isPartialRefundOpen: true }),
    closePartialRefund: () => set({ isPartialRefundOpen: false }),
    openFullRefund: () => set({ isFullRefundOpen: true }),
    closeFullRefund: () => set({ isFullRefundOpen: false }),
}));
