import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, ForbiddenException, HttpException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { AppMessages } from "./constant/exception-constant";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
    
        const status = exception.getStatus();
        const responseBody = exception.getResponse?.();

        let message = AppMessages.COMMON.INTERNAL_ERROR.message;
        let error = exception.name;
    
        if (exception instanceof NotFoundException) {
          message = AppMessages.COMMON.NOT_FOUND.message;
          error = AppMessages.COMMON.NOT_FOUND.error;
        } else if (exception instanceof BadRequestException) {
          message = AppMessages.COMMON.BAD_REQUEST.message;
          error = AppMessages.COMMON.BAD_REQUEST.error;
        } else if (exception instanceof ForbiddenException) {
          message = AppMessages.COMMON.FORBIDDEN.message;
          error = AppMessages.COMMON.FORBIDDEN.error;
        } else if (exception instanceof UnauthorizedException) {
          message = AppMessages.COMMON.UNAUTHORIZED.message;
          error = AppMessages.COMMON.UNAUTHORIZED.error
        } else if(exception instanceof HttpException){
          message = responseBody?.message || exception.message || AppMessages.COMMON.INTERNAL_ERROR.message;
          error = AppMessages.COMMON.INTERNAL_ERROR.error;
        }
    
        response.status(status).json({
          timestamp: new Date().toISOString(),
          code: status,
          error,
          message,
          path: request.url,
        });
      }
}