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
        return (
            <div className='pt-40 mx-auto'>
                <div className='text-center'>
                    <div className='text-red-500 text-5xl mb-4'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-24 w-24 mx-auto'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>Oops! Something went wrong</h2>
                    <p className='text-gray-600'>We couldn't load the products. Please try again later.</p>
                </div>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className='pt-40 mx-auto'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4'></div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>Loading Products</h2>
                    <p className='text-gray-600'>Please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className='text-4xl text-center py-5 font-medium'>Welcome to E-shop</h1>
            <button onClick={handleCheckout}>Pagar</button>
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
