export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
  ) {
    super(message);
  }

  static badRequest(message: string = "Bad request") {
    return new HttpError(400, message)
  }

  static unauthorized(message: string = "Unauthorized") {
    return new HttpError(401, message)
  }

  static forbidden(message: string = "Forbidden") {
    return new HttpError(403, message)
  }

  static internalServerError(message: string = "Internal Server Error") {
    return new HttpError(500, message)
  }
}
