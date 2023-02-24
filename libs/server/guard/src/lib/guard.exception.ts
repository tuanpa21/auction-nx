import { HttpStatus } from '@nestjs/common';
import { AppException, IAppError } from '@auction-nx/server/common';

export enum GuardCode {
  FORBIDDEN_RESOURCE = 'FORBIDDEN_RESOURCE',
  UNAUTHORIZED_ACCESS_TOKEN = 'UNAUTHORIZED_ACCESS_TOKEN',
  UNAUTHORIZED_REFRESH_TOKEN = 'UNAUTHORIZED_REFRESH_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_CLAIMS_BEFORE = 'TOKEN_CLAIMS_BEFORE',
  TOKEN_INVALID = 'TOKEN_INVALID',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_CLAIMS_BEFORE = 'REFRESH_CLAIMS_BEFORE',
  REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  DEACTIVATE_ACCOUNT = 'DEACTIVATE_ACCOUNT',
}

export const GUARD_ERROR: Record<GuardCode, IAppError> = {
  FORBIDDEN_RESOURCE: {
    code: `1000`,
    message: `Your don't have enough permission to access this resource`,
    status: HttpStatus.FORBIDDEN,
  },
  UNAUTHORIZED_ACCESS_TOKEN: {
    code: `1001`,
    message: `Require access token in header`,
    status: HttpStatus.UNAUTHORIZED,
  },
  UNAUTHORIZED_REFRESH_TOKEN: {
    code: `1002`,
    message: `Require refresh token in header`,
    status: HttpStatus.UNAUTHORIZED,
  },
  TOKEN_EXPIRED: {
    code: `1003`,
    message: `Your access token has been expired`,
    status: HttpStatus.UNAUTHORIZED,
  },
  TOKEN_CLAIMS_BEFORE: {
    code: `1004`,
    message: `Your access token has been claims before create`,
    status: HttpStatus.UNAUTHORIZED,
  },
  TOKEN_INVALID: {
    code: `1005`,
    message: `Your access token has been invalid`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_TOKEN_EXPIRED: {
    code: `1006`,
    message: `Your refresh token has been expired`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_CLAIMS_BEFORE: {
    code: `1007`,
    message: `Your refresh token has been claims before create`,
    status: HttpStatus.UNAUTHORIZED,
  },
  REFRESH_TOKEN_INVALID: {
    code: `1008`,
    message: `Your refresh token has been invalid`,
    status: HttpStatus.UNAUTHORIZED,
  },
  PASSWORD_INCORRECT: {
    code: `1009`,
    message: `Your password is incorrect`,
    status: HttpStatus.BAD_REQUEST,
  },
  DEACTIVATE_ACCOUNT: {
    code: `1010`,
    message: `Your account has been deactivate by admin. Please contact him to know reason`,
    status: HttpStatus.FORBIDDEN,
  },
};

export class GuardException extends AppException {
  constructor(code: keyof typeof GuardCode, message?: string) {
    super(code, message, GUARD_ERROR);
  }
}
