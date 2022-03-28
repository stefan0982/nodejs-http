import { CustomError } from "./customError";
import { HttpStatus } from "../types";

export class DatabaseConnectionError extends CustomError {
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  reason: string = 'Error connecting to database'

  constructor() {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeError() {
    return [
      { message: this.reason }
    ]
  }
}
