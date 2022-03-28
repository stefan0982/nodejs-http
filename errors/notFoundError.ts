import { CustomError } from "./customError";
import { HttpStatus } from "../types";

export class NotFoundError extends CustomError {
  statusCode = HttpStatus.NOT_FOUND;

  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeError(): { message: string; field?: string }[] {
    return [{message: 'not found'}];
  }

}
