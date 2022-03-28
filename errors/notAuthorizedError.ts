import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return [{ message: 'Not authorized' }];
  }

}
