import { prisma } from '../lib/prisma-client';
import { products } from './products';

async function main() {
    await prisma.orderDetail.deleteMany();
    await prisma.refund.deleteMany();

    const { count: imageCount } = await prisma.productImage.deleteMany();
    const { count: productCount } = await prisma.product.deleteMany();
    await prisma.order.deleteMany();

    console.log(`${productCount} products deleted and ${imageCount} images deleted`);
    console.log('Base de datos limpia');

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
