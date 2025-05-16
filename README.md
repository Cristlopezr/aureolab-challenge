# Aureolab Challenge

## Dev mode

1. Clone the repository 
```
https://github.com/Cristlopezr/aureolab-challenge.git
```

2. Set up environment variables:
   - Navigate to the backend directory.
   - Create a copy of the ```.env.example``` file and rename it to ```.env```.
   - Update the variables as needed.
   - Repeat the same steps in the frontend directory.

3. Install dependencies:
   - Run ```npm install``` in both the frontend and backend directories.

4. Start the database 
   - In the backend directory, run ```docker compose up -d```

5. Seed the database
   - In the backend directory, run: ```npm run seed```

6. Run the development servers:
   - In both frontend and backend directories, run: ```npm run dev```

## How to Use the Application (User Guide)

1. Viewing Products
   - Navigate to the homepage of the app to view the list of available products.

2. Adding Products to the Cart
   - Click the "Add to Cart" button for each product to add them to your shopping cart.

3. Making a Payment
   - When you're ready to checkout, go to the cart and proceed to the Stripe payment page to complete your purchase.

4. Viewing Orders
   - After a successful purchase, go to the "My Orders" page where you can see the details of your orders.

5. Requesting a Refund
   - If you need to request a refund for an order, click on the "View Details" button next to the order. From there, you can request either a full or partial refund by clicking on the respective buttons.

## Integration details

### 1. Stripe integration

1.1 **Payment Integration**: 
   - The Stripe payment integration is handled in the backend using the Stripe API. You will need to configure your STRIPE_SECRET_KEY in the .env file to enable payments, and also set the STRIPE_ENDPOINT_SECRET to allow the webhook to function properly.

1.2 **Checkout Session Creation**:
   - When a user proceeds to checkout, a **Stripe Checkout session** is created on the backend. This session represents the payment process for the selected items in the cart.
   - The backend creates the session and returns a session url, which the frontend uses to redirect the user to the Stripe-hosted payment page.

1.3 **Order Creation**:
   - Before redirecting the user to Stripe, an **order** is created in the database with the status set to `pending`.

1.4 **Stripe Webhook**:
   - Once the user completes the payment, Stripe sends an **event** to the backend via a **webhook**. This event informs the app about the outcome of the transaction (whether it was successful, failed, etc.).
   - The backend listens for the Stripe webhook and updates the **order's status** in the database based on the payment result. The status will either be:
     - `paid` if the transaction was successful.
     - `failed` if the transaction failed.

1.5 **Order Management**:
   - After the payment process, users will be able to view all their orders—both successful and failed—in the "My Orders" section.
   - If the payment was successful, the order will appear with a "PAID" status; if it failed, it will show as "FAILED".
   - If needed, users can request a full or partial refund via the order details page, available only for orders marked as "PAID".

### 2. PostgreSQL Database Integration
2.1 **PostgreSQL, Docker, and Prisma**:  
   - The app uses **PostgreSQL** as the database, managed through **Docker** for easy setup and consistency.  
   - **Prisma** is used as the ORM to interact with the database (for reading products, creating orders, updating status, etc.).  
   - Make sure Docker is running and the database container is started before running the application.