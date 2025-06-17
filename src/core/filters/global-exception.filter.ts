import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { BusinessError } from '../errors';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: BusinessError<any, any>, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<Request>();

    console.log(exception);

    response.status(exception.status).send({
      ...exception,
      timestamp: new Date().toISOString(),
      path: req.url || 'unknown',
    });
  }
}
