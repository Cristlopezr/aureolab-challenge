interface Image {
    id: string;
    url: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    slug: string;
    images: Image[];
    rating: number;
}
