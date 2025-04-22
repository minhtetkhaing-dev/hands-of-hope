import { ZodError } from 'zod';

export type ValidationErrorItem = {
    field: string;
    message: string;
  };
  
  export type ErrorResponse = {
    success: false;
    code: string; // Example: "VALIDATION_ERROR"
    message: string;
    errors: ValidationErrorItem[];
  };

export function formatZodError(error: ZodError): ErrorResponse {
  return {
    success: false,
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    errors: error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    })),
  };
}