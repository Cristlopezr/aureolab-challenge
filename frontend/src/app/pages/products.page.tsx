import { Card } from '../../features/products/components/card';

export const ProductsPage = () => {
    //TODO:Mostrar lista de productos
    //TODO:En cada producto agregar un boton para agregar al carrito
    //TODO:Realizar pago
    //TODO:Visualizar las ordenes de compra con su detalle
    //TODO:Solicitar reembolsos

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

    return (
        <div>
            <h1 className='text-4xl text-center py-5 font-medium'>Welcome to E-shop</h1>
            <button onClick={handleCheckout}>Pagar</button>
            <div>
                <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
                    {[...Array(12)].map((_, index) => (
                        <Card key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
