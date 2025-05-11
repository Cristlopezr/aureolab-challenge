import { HiClipboardList, HiHome, HiShoppingCart } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/cart-store';

export const Navbar = () => {
    const cartItems = useCartStore(state => state.items).reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className='bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex-shrink-0 flex items-center'>
                        <Link to='/' className='text-white text-xl font-bold'>
                            E-Shop
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-white border-b-2 border-white'
                                        : 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:border-b-2 hover:border-blue-100'
                                }
                            >
                                <HiHome className='w-5 h-5 mr-2' />
                                Products
                            </NavLink>
                            <NavLink
                                to='/cart'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-white border-b-2 border-white'
                                        : 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:border-b-2 hover:border-blue-100'
                                }
                            >
                                <div className='relative'>
                                    <HiShoppingCart className='w-5 h-5 mr-2' />
                                    {cartItems > 0 && (
                                        <span className='absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce'>
                                            {cartItems}
                                        </span>
                                    )}
                                </div>
                                Cart
                            </NavLink>
                            <NavLink
                                to='/orders'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-white border-b-2 border-white'
                                        : 'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:border-b-2 hover:border-blue-100'
                                }
                            >
                                <HiClipboardList className='w-5 h-5 mr-2' />
                                My Orders
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
