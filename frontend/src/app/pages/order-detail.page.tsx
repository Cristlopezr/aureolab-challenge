import { PageTitle } from '../../components/ui/page-title';

export const OrderDetailPage = () => {
    return (
        <div className=''>
            <div className=''>
                <PageTitle title={`Order #${123}`} />

                <div className='mt-8 space-y-8'>
                    {/* Order Status */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center'>
                            <div className='h-3 w-3 rounded-full bg-green-500 mr-2'></div>
                            <span className='font-medium text-green-700'>Order Paid & Confirmed</span>
                        </div>
                        <div className='mt-4 flex items-center space-x-2 text-sm text-gray-500'>
                            <span className='font-medium'>March 15, 2024</span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className='bg-white rounded-lg shadow overflow-hidden'>
                        <div className='p-6'>
                            <h2 className='text-lg font-medium text-gray-900 mb-4'>Order Items</h2>
                            <div className='space-y-4'>
                                {/* Sample Item - Replace with actual items mapping */}
                                <div className='flex items-center border-b pb-4'>
                                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                        <img
                                            src='/placeholder-product.jpg'
                                            alt='Product'
                                            className='h-full w-full object-cover object-center'
                                        />
                                    </div>
                                    <div className='ml-4 flex flex-1 flex-col'>
                                        <div>
                                            <div className='flex justify-between text-base font-medium text-gray-900'>
                                                <h3>Product Name</h3>
                                                <p className='ml-4'>$100.00</p>
                                            </div>
                                            <p className='mt-1 text-sm text-gray-500'>Quantity: 3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {/* Shipping Information */}
                        <div className='bg-white rounded-lg shadow p-6'>
                            <h2 className='text-lg font-medium text-gray-900 mb-4'>Shipping Address</h2>
                            <div className='text-sm text-gray-500 space-y-2'>
                                <p className='text-base font-medium text-gray-900'>John Doe</p>
                                <p>123 Main Street</p>
                                <p>Apt 4B</p>
                                <p>New York, NY 10001</p>
                                <p>United States</p>
                                <p>Phone: (555) 123-4567</p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='bg-white rounded-lg shadow p-6'>
                            <h2 className='text-lg font-medium text-gray-900 mb-4'>Order Summary</h2>
                            <div className='space-y-3'>
                                <div className='flex justify-between text-sm'>
                                    <span>Items (3)</span>
                                    <span>$300.00</span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span>Shipping</span>
                                    <span>$10.00</span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span>Tax</span>
                                    <span>$31.00</span>
                                </div>
                                <div className='border-t pt-3 mt-3'>
                                    <div className='flex justify-between text-lg font-medium'>
                                        <span>Total</span>
                                        <span>$341.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end space-x-4'>
                        <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                            Partial refund
                        </button>
                        <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                            Total refund
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
