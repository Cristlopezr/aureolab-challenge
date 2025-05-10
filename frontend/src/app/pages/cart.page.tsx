import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/ui/page-title';

export const CartPage = () => {
    const arr = new Array(3).fill(0);

    return (
        <div className='w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            <div className='flex flex-col'>
                <PageTitle title='Shopping Cart' />

                <span className='text-xl font-medium mb-4'>Your Items</span>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10'>
                    <div className='flex flex-col'>
                        <div className='bg-white rounded-xl shadow-md p-4 sm:p-6 mb-5'>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
                                <span className='text-gray-600 mb-2 sm:mb-0'>Your cart is empty</span>
                                <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium'>
                                    Continue Shopping
                                </Link>
                            </div>

                            {arr.map((_, i) => (
                                <div
                                    key={i}
                                    className='flex flex-col sm:flex-row sm:items-center border-b border-gray-200 py-4 last:border-0'
                                >
                                    {/* <img
                                        src={`/products/${product.images[0]}`}
                                        width={120}
                                        height={120}
                                        alt={product.title}
                                        className='object-cover rounded-lg mr-6'
                                    /> */}

                                    <div className='flex-grow'>
                                        <h3 className='text-lg font-medium'>Producto</h3>
                                        <p className='text-gray-600 mb-2'>$100</p>
                                        {/*  <QuantitySelector quantity={3} /> */}

                                        <button className='text-red-600 hover:text-red-800 font-medium mt-3'>
                                            Remove Item
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className='bg-white rounded-xl shadow-xl p-4 sm:p-7 h-fit'>
                        <h2 className='text-xl sm:text-2xl font-bold mb-6'>Order Summary</h2>

                        <div className='space-y-4'>
                            <div className='flex justify-between text-gray-600'>
                                <span>Items (3)</span>
                                <span>$100.00</span>
                            </div>

                            <div className='flex justify-between text-gray-600'>
                                <span>Subtotal</span>
                                <span>$100.00</span>
                            </div>

                            <div className='flex justify-between text-gray-600'>
                                <span>Tax (15%)</span>
                                <span>$15.00</span>
                            </div>

                            <div className='border-t border-gray-200 pt-4 mt-4'>
                                <div className='flex justify-between font-bold text-lg sm:text-xl'>
                                    <span>Total</span>
                                    <span>$115.00</span>
                                </div>
                            </div>

                            <button className='w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-6'>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
