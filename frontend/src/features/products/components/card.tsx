import type { Product } from '../interfaces/product.interfaces';

type Props = {
    product: Product;
};

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const Card = ({ product }: Props) => {
    const filledStars = Math.floor(product.rating);
    const emptyStars = 5 - filledStars;

    return (
        <div className='group relative bg-white rounded-xl border border-gray-200'>
            <div className='aspect-w-3 aspect-h-4 overflow-hidden rounded-t-xl bg-gray-100'>
                <img
                    src={`${product.images[0].url}?w=800`}
                    alt={product.name}
                    className='w-full h-full object-cover aspect-square transform group-hover:scale-105 transition-transform duration-300'
                    loading='lazy'
                />
            </div>
            <div className='p-4'>
                <div className='mb-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        {product.stock && 'In Stock'}
                    </span>
                </div>
                <h2 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200'>
                    {product.name}
                </h2>
                <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{product.description}</p>
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <span className='text-2xl font-bold text-gray-900'>
                                {formatter.format(product.price / 100)}
                            </span>
                        </div>
                        <div className='flex items-center text-sm text-yellow-500'>
                            {'★'.repeat(filledStars)}
                            {'☆'.repeat(emptyStars)}
                            <span className='ml-1 text-gray-500'>({product.rating})</span>
                        </div>
                    </div>
                    <button className='w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md active:transform active:scale-95'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
