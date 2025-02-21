/* eslint-disable no-undef */

import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    PORT, 
    NODE_ENV, 
    MONGODB_URI, 
    ARCJET_ENV,
    ARCJET_KEY,
    JWT_SECRET, 
    JWT_EXPIRES_IN
} = process.env