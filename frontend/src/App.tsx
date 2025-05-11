import './App.css';
import LoadCartFromLocalStorage from './features/cart/components/load-cart-localStorage';
import { AppRouter } from './router/app-router';

function App() {
    return (
        <>
            <LoadCartFromLocalStorage />
            <AppRouter />
        </>
    );
}

export default App;
