# Aureolab Challenge

## Dev mode

1. Clone the repository.

2. Set up environment variables:
    Navigate to the backend directory.
    Create a copy of the ```.env.example``` file and rename it to ```.env```.
    Update the variables as needed.
    Repeat the same steps in the frontend directory.

3. Install dependencies:
    Run ```npm install`` in both the frontend and backend directories.

4. Start the database 
    In the backend directory, run ```docker compose up -d```

5. Seed the database
    In the backend directory, run: ```npm run seed```

6. Run the development servers:
    In both frontend and backend directories, run: ```npm run dev```