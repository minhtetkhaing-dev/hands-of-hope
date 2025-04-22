import { Response } from 'express';
import { stat } from 'fs';
import { ZodError } from 'zod';

interface SuccessResponseOptions<T> {
  res: Response;
  message: string;
  data?: T;
  status?: number;
}

export type ValidationErrorItem = {
  field: string;
  message: string;
};

export type ErrorResponse = {
  success: false;
  errors: ValidationErrorItem[];
};

interface FailedResponseOptions<T> {
  res: Response;
  errors: ValidationErrorItem[];
  status?: number;
}

export const successResponse = <T>({
  res,
  message,
  data,
  status = 200,
}: SuccessResponseOptions<T>) => {
  return res.status(status).json({
    success: true,
    message,
    data: data ?? null,
  });
};

export const errorResponse = ({
  res,
  error,
  status = 422,
}: {
  res: Response;
  error: ZodError;
  status?: number;
}) => {
  const errors: ValidationErrorItem[] = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return res.status(status).json({
    success: false,
    errors,
  });
};