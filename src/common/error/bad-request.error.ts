import { ERROR } from './common.error';

const BAD_REQUEST_STATUS_CODE = 400;

export const BAD_REQUEST = {
    EMAIL_ALREADY_EXIST: {
        code: 'EMAIL_ALREADY_EXIST',
        message: '이메일이 이미 존재합니다.',
        statusCode: BAD_REQUEST_STATUS_CODE
    } as ERROR,
    INVALID_PASSWORD: {
        code: 'INVALID_PASSWORD',
        message: '비밀번호가 일치하지 않습니다.',
        statusCode: BAD_REQUEST_STATUS_CODE
    } as ERROR
};
