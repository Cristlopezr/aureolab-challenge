import express from 'express';
import { prisma } from './lib/prisma-client';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.status(202).json({
        hello: 'world',
    });
});

app.listen(port, () => {
    console.log(`App listening in port ${port}`);
});
