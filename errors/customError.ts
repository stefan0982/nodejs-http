import { HttpStatus } from "../types";

export abstract class CustomError extends Error{
  abstract statusCode: HttpStatus;
  protected constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeError(): {
    message: string;
    field?: string
  }[]
}
