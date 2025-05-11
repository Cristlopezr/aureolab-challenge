import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from '../app/pages/products.page';
import { CartPage } from '../app/pages/cart.page';
import { OrdersPage } from '../app/pages/orders.page';
import { AppLayout } from '../layout/app-layout';
import { OrderDetailPage } from '../app/pages/order-detail.page';
import SuccessPage from '../app/pages/success.page';
import { ScrollToTop } from '../components/scroll-to-top';

export const AppRouter = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<ProductsPage />} />
                    <Route path='/orders/:id' element={<OrderDetailPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/orders' element={<OrdersPage />} />
                    <Route path='/success' element={<SuccessPage />} />
                </Route>
            </Routes>
        </>
    );
};
