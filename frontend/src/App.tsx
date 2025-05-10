import './App.css';
import LoadCartFromLocalStorage from './features/cart/components/load-cart-localStorage';
import SaveCartToLocalStorage from './features/cart/components/save-cart-localStorage';
import { AppRouter } from './router/app-router';

function App() {
    return (
        <>
            <SaveCartToLocalStorage />
            <LoadCartFromLocalStorage />
            <AppRouter />
        </>
    );
}

export default App;
