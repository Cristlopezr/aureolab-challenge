import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/ui/navbar';

export const AppLayout = () => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <Navbar />
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <Outlet />
            </main>
        </div>
    );
};
