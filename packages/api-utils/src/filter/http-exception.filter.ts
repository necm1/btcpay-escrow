import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // TODO: improve typing
    const { message } = exception.getResponse() as any;

    response.status(status).json({
      status,
      data: [],
      errors: message
        ? Array.isArray(message)
          ? message
          : [message]
        : [exception.message],
    });
  }
}
