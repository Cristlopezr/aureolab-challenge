import { ToastContainer } from 'react-toastify';
import './App.css';
import LoadCartFromLocalStorage from './features/cart/components/load-cart-localStorage';
import { AppRouter } from './router/app-router';

function App() {
    return (
        <>
            <LoadCartFromLocalStorage />
            <ToastContainer position='top-right' autoClose={2000} />
            <AppRouter />
        </>
    );
}

export default App;
