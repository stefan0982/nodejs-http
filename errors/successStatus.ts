import { CustomError } from "./customError";
import { HttpStatus } from "../types";

export class SuccessStatus extends CustomError {
  statusCode = HttpStatus.OK;

  constructor() {
    super('Success');
    Object.setPrototypeOf(this, SuccessStatus.prototype)
  }

  serializeError(): { message: string; field?: string }[] {
    return [{message: 'Success'}];
  }

}
