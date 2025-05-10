import { prisma } from '../lib/prisma-client';
import { products } from './products';

async function main() {
    const { count: imageCount } = await prisma.productImage.deleteMany();
    const { count: productCount } = await prisma.product.deleteMany();

    console.log(`${productCount} products deleted and ${imageCount} images deleted`);

    for (const product of products) {
        const { images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: rest,
        });

        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imagesData,
        });
    }

    console.log('Seed executed');
}

(() => {
    main();
})();
