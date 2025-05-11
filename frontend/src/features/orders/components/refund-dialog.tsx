import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useUiStore } from '../../../store/ui-store';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usdFormatter } from '../../../helpers/usd-formatter';

type PartialRefundProps = {
    handleRefund: ({ orderId, amount }: { orderId: string; amount: string }) => void;
    orderId: string;
    isRefundPeding: boolean;
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

export const PartialRefundDialog = ({ handleRefund, orderId, isRefundPeding, maxRefund }: PartialRefundProps) => {
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

    const onSubmit = (data: z.infer<ReturnType<typeof partialRefundSchema>>) => {
        handleRefund({ orderId, amount: data.amount });
        reset({ amount: '' });
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
                            disabled={isRefundPeding}
                            onClick={closePartialRefund}
                            className={`px-4 py-2 rounded-md border ${
                                isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                            }`}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={isRefundPeding}
                            className={`px-4 py-2 rounded-md bg-blue-600 text-white inline-flex items-center ${
                                isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                        >
                            {isRefundPeding ? (
                                <>
                                    <svg
                                        className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        ></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
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
                        className={`px-4 py-2 rounded-md bg-blue-600 text-white inline-flex items-center ${
                            isRefundPeding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        {isRefundPeding ? (
                            <>
                                <svg
                                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                >
                                    <circle
                                        className='opacity-25'
                                        cx='12'
                                        cy='12'
                                        r='10'
                                        stroke='currentColor'
                                        strokeWidth='4'
                                    ></circle>
                                    <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                    ></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
