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
