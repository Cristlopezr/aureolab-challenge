import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
    STRIPE_ENDPOINT_SECRET: get('STRIPE_ENDPOINT_SECRET').required().asString(),
};
