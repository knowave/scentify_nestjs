import 'dotenv/config';

// Database Environment Variables
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = +process.env.DATABASE_PORT;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;

// Naver Login Environment Variables
export const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
export const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
export const NAVER_CALLBACK_URL = process.env.NAVER_CALLBACK_URL;

// Kakao Login Environment Variables
export const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
export const KAKAO_CALLBACK_URL = process.env.KAKAO_CALLBACK_URL;

// JWT Environment Variables
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;

// PASSWORD Environment Variables
export const SALT_ROUNDS = +process.env.SALT_ROUNDS;

// AWS Environment Variables
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
export const AWS_REGION = process.env.AWS_REGION;

// REDIS Environment Variables
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

export const IS_LOCAL_ENV = process.env.NODE_ENV === 'local';
