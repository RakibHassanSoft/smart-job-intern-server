// utils/responseHandler.ts
import { Response } from 'express';
import { ResponseOptions } from './utilsInterface';

export function sendResponse<T = any>(
  res: Response,
  options: ResponseOptions<T>
) {
  const {
    statusCode = 200,
    message,
    data,
    success = statusCode < 400,
  } = options;

  const responsePayload: Record<string, unknown> = {
    success,
    message,
  };

  if (data !== undefined) {
    responsePayload.data = data;
  }

  return res.status(statusCode).json(responsePayload);
}
