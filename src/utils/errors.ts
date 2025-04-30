export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
  }

  static fromError(error: Error): ApiError {
    if (error instanceof NotFoundError) {
      return new ApiError(error.statusCode, error.message);
    }
    if (error instanceof ServerError) {
      return new ApiError(error.statusCode, error.message);
    }
    return new ApiError(500, error.message || "An unexpected error occurred");
  }
}

export class NotFoundError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export class ServerError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}