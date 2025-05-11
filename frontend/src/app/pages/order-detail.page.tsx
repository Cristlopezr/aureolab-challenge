import { useNavigate, useParams } from 'react-router-dom';
import { PageTitle } from '../../components/ui/page-title';
import { useEffect } from 'react';
import useOrderRefund, { useGetOrderDetail } from '../../features/orders/hooks/orders';
import { Error } from '../../components/ui/error';
import { PendingState } from '../../components/ui/pending-state';
import { capitalizeFirstLetter } from '../../helpers/capitalize-first-letter';
import { formatFullDate } from '../../helpers/date-formatter';
import { usdFormatter } from '../../helpers/usd-formatter';
import { HiArrowLeft } from 'react-icons/hi';

export const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate('/');
        }
    }, [id]);

    if (!id) {
        return null;
    }

    const { isError, data: order, isPending } = useGetOrderDetail(id);
    const { mutate: handleRefund, isPending: isRefundPeding } = useOrderRefund();

    const totalItems = order?.orderItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    if (isError) return <Error />;

    if (isPending) return <PendingState text='Loading order details' />;

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className='inline-flex items-center pb-2 gap-1 text-sm font-medium text-gray-700 hover:text-gray-900'
            >
                <HiArrowLeft className='mr-1 h-5 w-5' />
                Back
            </button>
            <PageTitle title={`Order ${order!.id.slice(-6)}`} />

            <div className='mt-8 space-y-8'>
                <div className='bg-white rounded-lg shadow p-6'>
                    <div className='flex items-center'>
                        {order?.status === 'PAID' ? (
                            <>
                                <div className='h-3 w-3 rounded-full bg-green-500 mr-2'></div>
                                <span className='font-medium text-green-700'>
                                    {capitalizeFirstLetter(order.status)}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className='h-3 w-3 rounded-full bg-red-500 mr-2'></div>
                                <span className='font-medium text-red-700'>{capitalizeFirstLetter(order!.status)}</span>
                            </>
                        )}
                    </div>
                    <div className='mt-4 flex items-center space-x-2 text-sm text-gray-500'>
                        <span className='font-medium'>{formatFullDate(order!.createdAt)}</span>
                    </div>
                    {order?.customerName && order?.customerEmail && (
                        <div className='mt-4 text-sm text-gray-700'>
                            <p className='font-medium'>Customer: {order.customerName}</p>
                            <p>Email: {order.customerEmail}</p>
                        </div>
                    )}
                </div>

                {order!.totalRefunded > 0 && (
                    <div className='bg-white rounded-lg shadow p-6'>
                        <h2 className='text-lg font-medium text-gray-900 mb-4'>Refund Information</h2>
                        <div className='space-y-3'>
                            <div className='flex items-center'>
                                <div className='h-3 w-3 rounded-full bg-yellow-500 mr-2'></div>
                                <span className='font-medium text-yellow-700'>
                                    {order!.totalRefunded === order!.amount ? 'Fully Refunded' : 'Partially Refunded'}
                                </span>
                            </div>
                            <div className='text-sm text-gray-500'>
                                <p>Total Refunded Amount: {usdFormatter.format(order!.totalRefunded / 100)}</p>
                                {order!.totalRefunded !== order!.amount && (
                                    <p className='mt-1'>
                                        Remaining Amount:{' '}
                                        {usdFormatter.format((order!.amount - order!.totalRefunded) / 100)}
                                    </p>
                                )}
                            </div>

                            <div className='mt-4'>
                                <h3 className='text-md font-medium text-gray-900 mb-2'>Refund History</h3>
                                <div className='space-y-3'>
                                    {order!.refunds.map(refund => (
                                        <div key={refund.id} className='border-t pt-3'>
                                            <div className='flex justify-between'>
                                                <span className='text-sm text-gray-500'>
                                                    {formatFullDate(refund.createdAt)}
                                                </span>
                                                <span className='text-sm font-medium'>
                                                    {usdFormatter.format(refund.amount / 100)}
                                                </span>
                                            </div>
                                            <div className='text-sm text-gray-500 mt-1'>
                                                <span className='capitalize'>
                                                    Status: {refund.status.toLowerCase()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className='bg-white rounded-lg shadow overflow-hidden'>
                    <div className='p-6'>
                        <h2 className='text-lg font-medium text-gray-900 mb-4'>Order Items</h2>
                        <div className='space-y-4'>
                            {order?.orderItems.map(item => (
                                <div key={item.product.id} className='flex items-center border-b pb-4'>
                                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                        <img
                                            src={`${item.product.images[0].url}?w=150`}
                                            alt='Product'
                                            className='h-full w-full aspect-square object-cover object-center'
                                        />
                                    </div>
                                    <div className='ml-4 flex flex-1 flex-col'>
                                        <div>
                                            <div className='flex justify-between text-base font-medium text-gray-900'>
                                                <h3>{item.product.name}</h3>
                                                <p className='ml-4'>
                                                    {usdFormatter.format((item.product.price * item.quantity) / 100)}
                                                </p>
                                            </div>
                                            <p className='mt-1 text-sm text-gray-500'>
                                                {usdFormatter.format(item.product.price / 100)} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='bg-white rounded-lg shadow p-6'>
                        <h2 className='text-lg font-medium text-gray-900 mb-4'>Order Summary</h2>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-sm'>
                                <span>Items ({totalItems})</span>
                                <span>{usdFormatter.format(order?.amount ? order.amount / 100 : 0)}</span>
                            </div>
                            <div className='border-t pt-3 mt-3'>
                                <div className='flex justify-between text-lg font-medium'>
                                    <span>Total</span>
                                    <span>{usdFormatter.format(order!.amount / 100)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {order?.status === 'PAID' && order.totalRefunded < order.amount && (
                    <div className='flex justify-end space-x-4'>
                        <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                            Refund Partially
                        </button>
                        <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                            Refund Full Amount
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
