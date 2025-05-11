import { Error } from '../../components/ui/error';
import { PendingState } from '../../components/ui/pending-state';
import { Card } from '../../features/products/components/card';
import useGetProducts from '../../features/products/hooks/products';

export const ProductsPage = () => {
    const { isError, data, isPending } = useGetProducts();

    if (isError) {
        return <Error />;
    }

    if (isPending) {
        return <PendingState text='Loading products' />;
    }

    return (
        <div>
            <h1 className='text-4xl text-center pt-5 pb-10 font-medium'>Welcome to E-shop</h1>
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
