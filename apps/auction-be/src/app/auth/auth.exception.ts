import { AppException, IAppError } from '@auction-nx/server/common';
import { HttpStatus } from '@nestjs/common';

export enum AuthCode {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  EMAIL_EXISTED = 'EMAIL_EXISTED',
  PASSWORD_DUPLICATED = 'PASSWORD_DUPLICATED',
}

export const AUTH_ERROR: Record<AuthCode, IAppError> = {
  EMAIL_NOT_FOUND: {
    code: `1100`,
    message: `This email is not registered`,
    status: HttpStatus.BAD_REQUEST,
  },
  EMAIL_EXISTED: {
    code: `1101`,
    message: `This email has been registered! Please using another email`,
    status: HttpStatus.BAD_REQUEST,
  },
  PASSWORD_DUPLICATED: {
    code: `1102`,
    message: `Your new password duplicated previous password`,
    status: HttpStatus.BAD_REQUEST,
  },
};

export class AuthException extends AppException {
  constructor(code: keyof typeof AuthCode, message?: string) {
    super(code, message, AUTH_ERROR);
  }
}
