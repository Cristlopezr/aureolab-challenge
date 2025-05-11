import { useEffect } from 'react';
import { useCartStore } from '../../store/cart-store';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
    const clearCart = useCartStore(state => state.clearCart);

    const { search } = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(search);
    const sessionId = query.get('session_id');

    useEffect(() => {
        if (!sessionId) {
            navigate('/');
        }
    }, [sessionId]);

    if (!sessionId) return null;

    useEffect(() => {
        clearCart();
        localStorage.removeItem('cart');
    }, []);

    return (
        <div className='w-full pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            <div className='bg-white rounded-xl shadow-md p-8 sm:p-10 my-8 text-center'>
                <div className='mb-6'>
                    <svg
                        className='w-16 h-16 text-green-500 mx-auto'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-4'>Thank you for your purchase!</h1>
                <p className='text-lg text-gray-600 mb-8'>Your order has been successfully processed.</p>
                <div className='flex flex-col gap-5'>
                    <div className='flex justify-center'>
                        <Link
                            to='/'
                            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                    <p className='font-medium'>Or</p>
                    <div className='flex justify-center'>
                        <Link
                            to='/orders'
                            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'
                        >
                            View My Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
