import { HttpException, HttpStatus } from "@nestjs/common";

export class GlobalException extends HttpException{
    constructor(message: string, status: HttpStatus, code?: string) {
        super({ message, code }, status);
      }
}