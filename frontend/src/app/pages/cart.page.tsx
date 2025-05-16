import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/ui/page-title';
import { useCartStore } from '../../store/cart-store';
import { usdFormatter } from '../../helpers/usd-formatter';
import { HiMinusCircle, HiOutlineRefresh, HiPlusCircle } from 'react-icons/hi';
import useHandleCheckout from '../../features/cart/hooks/cart';

export const CartPage = () => {
    const productsInCart = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);
    const decreseQuantity = useCartStore(state => state.decreaseItemQuantity);
    const removeItem = useCartStore(state => state.removeItemCompletely);
    const getTotalItems = useCartStore(state => state.getTotalItems);
    const getTotalAmount = useCartStore(state => state.getTotalAmount);
    const { mutate: handleCheckout, isPending } = useHandleCheckout();

    return (
        <div className='w-full mx-auto'>
            <div className='flex flex-col'>
                <PageTitle title='Shopping Cart' />

                {productsInCart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <span className='text-xl font-medium mb-4'>Your Items</span>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10'>
                            <div className='flex flex-col'>
                                <div className='bg-white rounded-xl shadow-md p-4 sm:p-6 mb-5'>
                                    {productsInCart.map(product => (
                                        <div
                                            key={product.productId}
                                            className='flex flex-col gap-2 md:flex-row items-center sm:items-start border-b border-gray-200 py-4 last:border-0'
                                        >
                                            <div className='flex-shrink-0 mb-4 sm:mb-0'>
                                                <img
                                                    src={`${product.image}?w=150`}
                                                    width={120}
                                                    height={120}
                                                    alt={product.name}
                                                    className='object-cover aspect-square rounded-lg sm:mr-6'
                                                />
                                            </div>

                                            <div className='flex-1 min-w-0 text-center sm:text-left'>
                                                <h3 className='text-lg font-medium break-words'>{product.name}</h3>
                                                <p className='text-gray-600 mb-2'>
                                                    {usdFormatter.format(product.price / 100)}
                                                </p>
                                                <div className='flex justify-center sm:justify-start'>
                                                    <button
                                                        className='cursor-pointer'
                                                        onClick={() => decreseQuantity(product.productId)}
                                                    >
                                                        <HiMinusCircle size={30} />
                                                    </button>

                                                    <span className='w-20 flex items-center justify-center mx-3 px-5 bg-gray-100 rounded'>
                                                        {product.quantity}
                                                    </span>

                                                    <button className='cursor-pointer' onClick={() => addItem(product)}>
                                                        <HiPlusCircle size={30} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(product.productId)}
                                                    className='cursor-pointer text-red-600 hover:text-red-800 font-medium mt-5'
                                                >
                                                    Remove Item
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='bg-white rounded-xl shadow-xl p-4 sm:p-7 h-fit'>
                                <h2 className='text-xl sm:text-2xl font-bold mb-6'>Order Summary</h2>

                                <div className='space-y-4'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Items ({getTotalItems()})</span>
                                        <span>{usdFormatter.format(getTotalAmount() / 100)}</span>
                                    </div>

                                    <div className='flex justify-between text-gray-600'>
                                        <span>Subtotal</span>
                                        <span>{usdFormatter.format(getTotalAmount() / 100)}</span>
                                    </div>

                                    <div className='border-t border-gray-200 pt-4 mt-4'>
                                        <div className='flex justify-between font-bold text-lg sm:text-xl'>
                                            <span>Total</span>
                                            <span>{usdFormatter.format(getTotalAmount() / 100)}</span>
                                        </div>
                                    </div>

                                    <button
                                        disabled={isPending}
                                        onClick={() => handleCheckout(productsInCart)}
                                        className='w-full cursor-pointer py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        {isPending ? (
                                            <span className='flex items-center justify-center gap-2'>
                                                <HiOutlineRefresh className='animate-spin' size={20} />
                                                Processing...
                                            </span>
                                        ) : (
                                            'Proceed to Checkout'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const EmptyCart = () => {
    return (
        <div className='bg-white rounded-xl shadow-md p-4 sm:p-6 mb-5'>
            <div className='flex flex-col items-center justify-center py-12'>
                <svg
                    className='w-16 h-16 text-gray-400 mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                    />
                </svg>
                <h3 className='text-xl font-medium text-gray-900 mb-2'>Your cart is empty</h3>
                <p className='text-gray-500 text-center mb-6'>
                    Looks like you haven't added any items to your cart yet.
                </p>
                <Link
                    to='/'
                    className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'
                >
                    Start Shopping
                </Link>
            </div>
        </div>
    );
};
