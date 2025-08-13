import { Request, Response, NextFunction, RequestHandler } from 'express';

// This wraps an async function and catches errors to pass to next()
export function asyncHandler(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
