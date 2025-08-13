import dotenv from 'dotenv';
import path from 'path';
import { EnvVariables } from './utilsInterface';

// Load .env file once at app start with explicit path
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || '';
}

export const envVariables: EnvVariables = {
  jwtSecret: getEnvVar('JWT_SECRET'),
  port: getEnvVar('PORT'),
  dbUri: getEnvVar('DB_URI'),
  salt: getEnvVar('SALT', false) || '10', // Default to '10' if not set
  jwrtRefreshSecret: getEnvVar('JWT_REFRESH_SECRET', false) // Optional, if you have a refresh token secret
};
