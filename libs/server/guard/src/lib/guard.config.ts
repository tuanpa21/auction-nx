import { Env, TTL } from '@auction-nx/server/common';
import { IConfigGuard } from './guard.interface';

export const guardConfig = (): IConfigGuard => {
  return {
    auth: {
      jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        expireIns: process.env.JWT_EXPIRE_INS
          ? parseInt(process.env.JWT_EXPIRE_INS)
          : TTL.ONE_HOUR,
        refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
        refreshExpireIns: process.env.JWT_REFRESH_EXPIRE_INS
          ? parseInt(process.env.JWT_REFRESH_EXPIRE_INS)
          : TTL.ONE_MONTH,
      },
    },
    cookie: {
      path: process.env.COOKIE_PATH || '/',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      secure: process.env.NODE_ENV !== 'default',
      expires: null,
      httpOnly: process.env.NODE_ENV === Env.PRODUCTION ? true : false,
    },
  };
};
