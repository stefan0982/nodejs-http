import { CustomError } from "./customError";
import { HttpStatus } from "../types";

export class BadRequestError extends CustomError{
  statusCode: HttpStatus = HttpStatus.BAD_REQUEST;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }

}
