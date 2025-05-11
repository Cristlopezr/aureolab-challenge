import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useUiStore } from '../../../store/ui-store';

type PartialRefundProps = {
    handleRefund: ({ orderId, amount }: { orderId: string; amount: string }) => void;
    orderId: string;
    isRefundPeding: boolean;
};

export const PartialRefundDialog = ({ handleRefund, orderId, isRefundPeding }: PartialRefundProps) => {
    const [refundAmount, setRefundAmount] = useState('');
    const [error, setError] = useState('');

    const isPartialRefundOpen = useUiStore(state => state.isPartialRefundOpen);
    const closePartialRefund = useUiStore(state => state.closePartialRefund);

    const onRefund = () => {
        console.log(refundAmount);
        if (!refundAmount) {
            setError(`Amount needs to be a number`);
            return;
        }
        handleRefund({ orderId, amount: refundAmount });
    };

    return (
        <Dialog open={isPartialRefundOpen}>
            <DialogContent className='sm:max-w-md bg-white'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-semibold text-gray-900'>Partial Refund</DialogTitle>
                    <DialogDescription className='text-sm text-gray-600 mt-2'>
                        Enter the amount you want to refund.
                    </DialogDescription>
                </DialogHeader>
                <div className='mt-4'>
                    <input
                        type='number'
                        placeholder='Amount in cents'
                        className='w-full border px-3 py-2 rounded-md'
                        value={refundAmount}
                        onChange={e => setRefundAmount(e.target.value)}
                    />
                    {error && <p className='text-red-500 text-sm p-1'>{error}</p>}
                </div>

                <div className='mt-6 flex justify-end gap-2'>
                    <button
                        disabled={isRefundPeding}
                        onClick={closePartialRefund}
                        className={`px-4 py-2 rounded-md border ${
                            isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isRefundPeding}
                        onClick={onRefund}
                        className={`px-4 py-2 rounded-md bg-blue-600 text-white ${
                            isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        {isRefundPeding ? 'Processing...' : 'Confirm'}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

type FullRefundProps = {
    handleRefund: ({ orderId, amount }: { orderId: string; amount?: string }) => void;
    orderId: string;
    isRefundPeding: boolean;
};

export const FullRefundDialog = ({ orderId, handleRefund, isRefundPeding }: FullRefundProps) => {
    const isFullRefundOpen = useUiStore(state => state.isFullRefundOpen);
    const closeFullRefund = useUiStore(state => state.closeFullRefund);

    return (
        <Dialog open={isFullRefundOpen}>
            <DialogContent className='sm:max-w-md bg-white'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-semibold text-gray-900'>Are you absolutely sure?</DialogTitle>
                    <DialogDescription className='text-sm text-gray-600 mt-2'>
                        This will refund the total amount.
                    </DialogDescription>
                </DialogHeader>

                <div className='mt-6 flex justify-end gap-2'>
                    <button
                        disabled={isRefundPeding}
                        onClick={closeFullRefund}
                        className={`px-4 py-2 rounded-md border ${
                            isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isRefundPeding}
                        onClick={() => handleRefund({ orderId })}
                        className={`px-4 py-2 rounded-md bg-blue-600 text-white ${
                            isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        {isRefundPeding ? 'Processing...' : 'Confirm'}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
