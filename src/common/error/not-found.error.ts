import { ERROR } from './common.error';

const NOT_FOUND_STATUS_CODE = 404;

export const NOT_FOUND = {
    USER: {
        code: 'NOT_FOUND_USER',
        message: 'user not found',
        statusCode: NOT_FOUND_STATUS_CODE
    } as ERROR
};
