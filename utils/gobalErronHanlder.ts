import { Request, Response, NextFunction } from "express";
import { sendResponse } from "./responseHandler";

// Global error handler middleware
export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Global error handler caught:", err);

  // Default values
  let statusCode = 500;
  let message = "Internal Server Error";

  // Handle Mongoose validation errors
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    // Extract validation messages from mongoose error object
    const errors = Object.values(err.errors).map((el: any) => el.message);
    message = `Validation error: ${errors.join(", ")}`;
  }
  // Handle Mongoose duplicate key error (unique constraint)
  else if (err.code && err.code === 11000) {
    statusCode = 409; // Conflict
    const duplicateField = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for field(s): ${duplicateField}`;
  }
  // Handle Joi validation errors
  else if (err.isJoi) {
    statusCode = 400;
    message = err.details.map((d: any) => d.message).join(", ");
  }
  // Handle custom errors with statusCode and message
  else if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Handle HTTP errors (e.g., from http-errors package)
  else if (err.status && err.message) {
    statusCode = err.status;
    message = err.message;
  }
  // You can add more specific error handling here for other error types...

  // Send the error response
    sendResponse(res, {
    success: false,
    statusCode,
    message,
    data: null,
    }); 
    // Call next middleware if needed
    next(err);  
    // Note: You can also log the error to an external service here if needed
    // For example, you could use a service like Sentry or Loggly to log errors
}
