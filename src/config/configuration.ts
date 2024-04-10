import { config } from 'dotenv';

const env = process.env.NODE_ENV || false;
if (!env) process.exit(100);

config({ path: `bin/.env.${env}` });

export default () => ({
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
  AUTH_EMAIL:process.env.AUTH_EMAIL,
  AUTH_PASSWORD:process.env.AUTH_PASSWORD
});
