import Stripe from 'stripe';
import { envs } from '../config/envs';

export const stripe = new Stripe(envs.STRIPE_SECRET_KEY);
