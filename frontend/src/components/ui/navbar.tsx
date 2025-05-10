import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className='bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex-shrink-0 flex items-center'>
                        <span className='text-white text-xl font-bold'>E-Shop</span>
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
                                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                    />
                                </svg>
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
                                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                    />
                                </svg>
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
                                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                                    />
                                </svg>
                                My Orders
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
