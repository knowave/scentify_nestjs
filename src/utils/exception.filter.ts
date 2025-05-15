import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { CustomException } from './custom-excaption';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger(CustomExceptionFilter.name);
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof CustomException) {
            return response.status(exception.getStatus()).json({
                message: exception.message,
                code: exception.code,
                data: exception.data as Record<string, unknown>,
                statusCode: exception.getStatus()
            });
        }

        if (exception instanceof HttpException) {
            return response.status(exception.getStatus()).json({
                message: exception.getResponse(),
                statusCode: exception.getStatus()
            });
        }

        this.logger.debug(exception);

        return response.status(500).json({
            message: 'Internal Server Error',
            statusCode: 500
        });
    }
}
