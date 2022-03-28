import { CustomError } from "./customError";
import { HttpStatus } from "../types";

export class ForbiddenError extends CustomError {
  statusCode = HttpStatus.FORBIDDEN;

  constructor() {
    super('Forbidden');
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }

  serializeError(): { message: string; field?: string }[] {
    return [{message: 'Forbidden'}];
  }

}
