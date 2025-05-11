import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/ui/page-title';
import { useGetOrders } from '../../features/orders/hooks/orders';
import { capitalizeFirstLetter } from '../../helpers/capitalize-first-letter';
import { usdFormatter } from '../../helpers/usd-formatter';
import { Error } from '../../components/ui/error';
import { PendingState } from '../../components/ui/pending-state';
import { formatFullDate } from '../../helpers/date-formatter';

export const OrdersPage = () => {
    const { isError, data, isPending } = useGetOrders();

    if (isError) {
        return <Error />;
    }
    if (isPending) return <PendingState text='Loading orders' />;

    return (
        <div>
            <PageTitle title='My Orders' />
            {data?.length === 0 ? (
                <div className='text-center py-12'>
                    <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                        />
                    </svg>
                    <h3 className='mt-2 text-sm font-medium text-gray-900'>No orders</h3>
                    <p className='mt-1 text-sm text-gray-500'>You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <div className='bg-white shadow-sm rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Order Date
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Total Amount
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {data?.map(order => (
                                    <tr key={order.id}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {formatFullDate(order.createdAt)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {order.status === 'PAID' ? (
                                                <div className='flex items-center gap-2'>
                                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                        {capitalizeFirstLetter(order.status)}
                                                    </span>
                                                    {order.totalRefunded > 0 ? (
                                                        order.totalRefunded === order.amount ? (
                                                            <span className='text-sm font-semibold'>
                                                                Fully refunded
                                                            </span>
                                                        ) : (
                                                            <span className='text-sm font-semibold'>
                                                                Partially refunded
                                                            </span>
                                                        )
                                                    ) : null}
                                                </div>
                                            ) : (
                                                <>
                                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                                                        {capitalizeFirstLetter(order.status)}
                                                    </span>
                                                </>
                                            )}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {usdFormatter.format(order.amount / 100)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm'>
                                            <Link
                                                to={`/orders/${order.id}`}
                                                className='text-indigo-600 hover:text-indigo-900 font-medium'
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
