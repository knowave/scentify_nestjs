import { ERROR } from './common.error';

const FORBIDDEN_STATUS_CODE = 403;

export const FORBIDDEN = {
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        message: 'unauthorized',
        statusCode: FORBIDDEN_STATUS_CODE
    } as ERROR
};
