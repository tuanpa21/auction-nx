import { ReasonPhrases } from 'http-status-codes';
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { IReply, IResponse } from '../common.interface';
import { AppException, IAppError } from '../error';

// Catch all error from try catch => Return the same error format
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: IReply = ctx.getResponse();

    const errorResponse: IResponse<IAppError> = {
      error: {
        code: exception instanceof AppException ? exception.code : exception.getStatus().toString(),
        // TODO: Better handling
        message:
          exception instanceof BadRequestException
            ? (exception.getResponse() as any).message
            : exception instanceof AppException || exception instanceof HttpException
            ? exception.message
            : ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: exception.getStatus(),
      },
    };

    this.logger.error(
      exception.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : JSON.stringify(errorResponse),
      'ExceptionFilter'
    );
    return response.code(exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
  }
}
