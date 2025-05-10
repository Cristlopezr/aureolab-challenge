import { Error } from '../../components/ui/error';
import { PendingState } from '../../components/ui/pending-state';
import { Card } from '../../features/products/components/card';
import useGetProducts from '../../features/products/hooks/products';

export const ProductsPage = () => {
    //TODO:En cada producto agregar un boton para agregar al carrito
    //TODO:Realizar pago
    //TODO:Visualizar las ordenes de compra con su detalle
    //TODO:Solicitar reembolsos

    const { isError, data, isPending } = useGetProducts();

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://localhost:3000/orders/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: [
                        {
                            id: '3eba958e-e608-4bbc-b130-94c076f86645',
                            quantity: 2,
                        },
                        {
                            id: '66a34e07-078d-4186-af98-20bfb7439bf4',
                            quantity: 1,
                        },
                    ],
                }),
            });
            console.log({ response });
            const session = await response.json();
            window.location.href = session.url;
        } catch (error) {
            console.error('Error al crear sesión de pago:', error);
        }
    };

    if (isError) {
        return <Error />;
    }

    if (isPending) {
        return <PendingState text='Loading products' />;
    }

    return (
        <div>
            <h1 className='text-4xl text-center py-5 font-medium'>Welcome to E-shop</h1>
            <div>
                <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
                    {data?.map(product => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
