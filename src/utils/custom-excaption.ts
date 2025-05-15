import { HttpException } from '@nestjs/common';
import { ERROR } from 'src/common/error/common.error';

export class CustomException extends HttpException {
    code: string;
    data?: any;
    constructor(error: ERROR) {
        super(error.message, error.statusCode);
        this.code = error.code;
        this.data = error.data as Record<string, unknown>;
    }
}
