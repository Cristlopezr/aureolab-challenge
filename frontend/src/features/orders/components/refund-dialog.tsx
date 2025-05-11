import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useUiStore } from '../../../store/ui-store';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usdFormatter } from '../../../helpers/usd-formatter';
import { useEffect } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';

type PartialRefundProps = {
    handleRefund: ({ orderId, amount }: { orderId: string; amount: string }) => void;
    orderId: string;
    isRefundPending: boolean;
    maxRefund: number;
};

const partialRefundSchema = (maxRefund: number) =>
    z.object({
        amount: z
            .string()
            .nonempty({ message: 'Amount is required' })
            .refine(val => !isNaN(Number(val)), {
                message: 'Amount must be a number',
            })
            .refine(val => Number(val) > 0, {
                message: 'Amount must be greater than 0',
            })
            .refine(val => Number(val) <= maxRefund, {
                message: `Amount cannot exceed the available refund (${usdFormatter.format(maxRefund)})`,
            }),
    });

export const PartialRefundDialog = ({ handleRefund, orderId, isRefundPending, maxRefund }: PartialRefundProps) => {
    const schema = partialRefundSchema(maxRefund);
    const isPartialRefundOpen = useUiStore(state => state.isPartialRefundOpen);
    const closePartialRefund = useUiStore(state => state.closePartialRefund);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            amount: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = form;

    useEffect(() => {
        if (isPartialRefundOpen) {
            reset({ amount: '' });
        }
    }, [isPartialRefundOpen]);

    const onSubmit = (data: z.infer<ReturnType<typeof partialRefundSchema>>) => {
        handleRefund({ orderId, amount: data.amount });
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

                <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                    <input
                        type='number'
                        placeholder='Amount in dollars'
                        className='w-full border px-3 py-2 rounded-md'
                        {...register('amount')}
                        step='0.01'
                    />
                    {errors.amount && <p className='text-red-500 text-sm p-1'>{errors.amount.message}</p>}

                    <div className='mt-6 flex justify-end gap-2'>
                        <button
                            type='button'
                            disabled={isRefundPending}
                            onClick={closePartialRefund}
                            className={`px-4 py-2 rounded-md border ${
                                isRefundPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                            }`}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={isRefundPending}
                            className={`px-4 py-2 rounded-md bg-blue-600 text-white inline-flex items-center ${
                                isRefundPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                        >
                            {isRefundPending ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <HiOutlineRefresh className='animate-spin' size={20} />
                                    Processing...
                                </span>
                            ) : (
                                'Confirm'
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

type FullRefundProps = {
    handleRefund: ({ orderId, amount }: { orderId: string; amount?: string }) => void;
    orderId: string;
    isRefundPending: boolean;
};

export const FullRefundDialog = ({ orderId, handleRefund, isRefundPending }: FullRefundProps) => {
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
                        disabled={isRefundPending}
                        onClick={closeFullRefund}
                        className={`px-4 py-2 rounded-md border ${
                            isRefundPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isRefundPending}
                        onClick={() => handleRefund({ orderId })}
                        className={`px-4 py-2 rounded-md bg-blue-600 text-white inline-flex items-center ${
                            isRefundPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        {isRefundPending ? (
                            <span className='flex items-center justify-center gap-2'>
                                <HiOutlineRefresh className='animate-spin' size={20} />
                                Processing...
                            </span>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
