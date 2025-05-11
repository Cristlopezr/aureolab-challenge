import { ToastContainer } from 'react-toastify';
import './App.css';
import LoadCartFromLocalStorage from './features/cart/components/load-cart-localStorage';
import { AppRouter } from './router/app-router';
import { HiShoppingCart } from 'react-icons/hi';

function App() {
    console.log('Aqui');
    return (
        <>
            <LoadCartFromLocalStorage />
            <ToastContainer position='top-right' autoClose={2000} icon={() => <HiShoppingCart size={30} />} />
            <AppRouter />
        </>
    );
}

export default App;
