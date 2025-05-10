import { useState } from 'react';
import './App.css';
import { Card } from './features/products/components/card';

function App() {
    const [count, setCount] = useState(0);

    //TODO:Mostrar lista de productos
    //TODO:En cada producto agregar un boton para agregar al carrito
    //TODO:Realizar pago
    //TODO:Visualizar las ordenes de compra con su detalle
    //TODO:Solicitar reembolsos

    const handleCheckout = async () => {
        try {
          const response = await fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
          });
          console.log({response})
          const session = await response.json();
          window.location.href = session.url;
        } catch (error) {
          console.error("Error al crear sesión de pago:", error);
        }
      };

    return (
        <div className='min-h-screen bg-gray-100 py-12'>
            <h1 className='text-4xl font-bold text-center text-gray-900 mb-8'>Welcome to Our Store</h1>
            <button onClick={handleCheckout}>Pagar</button>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
                    {[...Array(12)].map((_, index) => (
                        <Card key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
