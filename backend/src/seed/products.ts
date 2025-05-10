type Product = {
    name: string;
    description: string;
    images: string[];
    stock: number;
    price: number;
    slug: string;
};

export const products: Product[] = [
    {
        name: 'Sony WH-CH510 Wireless Headphones - Black',
        description:
            'Lightweight and comfortable wireless headphones with up to 35 hours of battery life, voice assistant support, and swivel design. Perfect for daily use with crisp sound quality.',
        images: [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90',
            'https://images.unsplash.com/photo-1583305727488-61f82c7eae4b',
        ],
        stock: 7,
        price: 7500,
        slug: 'sony-wh-ch510-wireless-headphones-black',
    },
    {
        name: 'Aukey EP-T21 True Wireless Earbuds - Black',
        description:
            'Compact and ergonomic Bluetooth 5.0 earbuds offering 5 hours of playtime, with a 25-hour total from the charging case. Sweat-resistant and perfect for workouts or commuting.',
        images: [
            'https://images.unsplash.com/photo-1634874256168-a64b3aadbf81',
            'https://images.unsplash.com/photo-1634874258475-eae5cacb9663',
        ],
        stock: 5,
        price: 3500,
        slug: 'aukey-ep-t21-true-wireless-earbuds-black',
    },
    {
        name: 'Apple MacBook Air M2 - 13.6” - Silver',
        description:
            'Powerful and ultra-portable MacBook Air with the Apple M2 chip, 8GB RAM, 256GB SSD, and a Liquid Retina display. Silent, fanless design perfect for productivity on the go.',
        images: [
            'https://images.unsplash.com/photo-1669278922520-0f9c07e86cb9',
            'https://images.unsplash.com/photo-1527443195645-1133f7f28990',
        ],
        stock: 5,
        price: 119900,
        slug: 'apple-macbook-air-m2-13-silver',
    },
    {
        name: 'Apple iPhone 13 - 128GB - Midnight',
        description:
            'The iPhone 13 features a 6.1-inch Super Retina XDR display, A15 Bionic chip, dual-camera system, and 128GB storage. Sleek, powerful, and ready for 5G connectivity.',
        images: [
            'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80',
            'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
        ],
        stock: 5,
        price: 79900,
        slug: 'apple-iphone-13-128gb-midnight',
    },
    {
        name: 'Logitech MK270 Wireless Keyboard and Mouse Combo',
        description:
            'Reliable full-size wireless keyboard and compact mouse combo. Long battery life, plug-and-play USB receiver, and quiet typing. Ideal for home and office setups.',
        images: [
            'https://images.unsplash.com/photo-1623371748986-9a829391f7c9',
            'https://images.unsplash.com/photo-1652850494316-3d30b01debca',
        ],
        stock: 5,
        price: 4500,
        slug: 'logitech-mk270-wireless-keyboard-mouse-combo',
    },
    {
        name: 'Samsung Galaxy S21 Ultra 5G - 128GB - Phantom Black',
        description:
            'Flagship smartphone with a 6.8” Quad HD+ AMOLED display, Snapdragon 888, 108MP camera, and 100x Space Zoom. Cutting-edge performance and premium design.',
        images: [
            'https://images.unsplash.com/photo-1610792516820-2bff50c652a2',
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
        ],
        stock: 5,
        price: 99900,
        slug: 'samsung-galaxy-s21-ultra-5g-phantom-black',
    },
    {
        name: 'FIFINE K669B USB Condenser Microphone - Black',
        description:
            'Plug-and-play USB microphone with cardioid pickup pattern, volume control, and sturdy metal body. Ideal for podcasting, gaming, voice-over, and remote meetings.',
        images: [
            'https://images.unsplash.com/photo-1674644859619-a290ef8c70e4',
            'https://images.unsplash.com/photo-1674644651631-0a96c4bb9a3b',
        ],
        stock: 5,
        price: 4900,
        slug: 'fifine-k669b-usb-condenser-microphone-black',
    },
    {
        name: 'Lenovo IdeaPad 3 Laptop 15.6" - AMD Ryzen 5, 8GB RAM, 256GB SSD',
        description:
            'The Lenovo IdeaPad 3 is a powerful and reliable everyday laptop featuring a 15.6-inch Full HD display, AMD Ryzen 5 processor, 8GB of RAM, and a 256GB SSD. Perfect for students, remote workers, and anyone who needs solid performance on the go.',
        images: [
            'https://images.unsplash.com/photo-1588620353536-ded12e518f45',
            'https://images.unsplash.com/photo-1611078489935-0cb964de46d6',
        ],
        stock: 5,
        price: 44900,
        slug: 'lenovo-ideapad-3-ryzen5-256gb',
    },
    {
        name: 'Xiaomi Redmi Note 10 Pro - 128GB, 6GB RAM, AMOLED Display',
        description:
            'The Xiaomi Redmi Note 10 Pro offers a premium experience at a mid-range price. Featuring a 6.67" AMOLED display, Snapdragon 732G processor, 128GB storage, and 108MP quad-camera setup, it’s built for speed, photography, and immersive viewing.',
        images: [
            'https://images.unsplash.com/photo-1624434207284-727cf0e6ea8e',
            'https://images.unsplash.com/photo-1624434207310-94fc4a4394db',
        ],
        stock: 5,
        price: 27900,
        slug: 'xiaomi-redmi-note-10-pro-128gb',
    },
    {
        name: 'Logitech MX Vertical Wireless Ergonomic Mouse',
        description:
            'Designed to reduce muscle strain and wrist pressure, the Logitech MX Vertical is an advanced ergonomic mouse that combines a natural handshake position with high-precision tracking. Features include customizable buttons, USB-C quick charging, and Bluetooth or USB receiver connection.',
        images: [
            'https://images.unsplash.com/photo-1617233083187-be4925d699d6',
            'https://images.unsplash.com/photo-1617233082866-9d9c58674778',
        ],
        stock: 5,
        price: 9900,
        slug: 'logitech-mx-vertical-ergonomic-mouse',
    },
];
