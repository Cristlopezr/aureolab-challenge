import { ToastContainer } from 'react-toastify';
import './App.css';
import LoadCartFromLocalStorage from './features/cart/components/load-cart-localStorage';
import { AppRouter } from './router/app-router';
import { HiShoppingCart } from 'react-icons/hi';

function App() {
    return (
        <>
            <LoadCartFromLocalStorage />
            <ToastContainer
                position='top-right'
                autoClose={1500}
                icon={() => <HiShoppingCart size={30} className='text-green-500' />}
            />
            <AppRouter />
        </>
    );
}

export default App;
