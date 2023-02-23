import { Env, IConfig } from '@auction-nx/server/common';

export const configuration = (): IConfig => ({
  env: (process.env['NODE' + '_ENV'] as Env) || Env.DEFAULT,
  app: {
    endpoint: process.env.APP_ENDPOINT,
    version: process.env.APP_VERSION || 'v1',
    service: process.env.APP_SERVICE || 'jitera',
    whitelist: process.env.APP_WHITELIST
      ? process.env.APP_WHITELIST.split(',')
      : [],
  },
  redis: {
    host: process.env.REDIS_HOST ?? undefined,
    port: process.env.REDIS_PORT ?? undefined,
    pass: process.env.REDIS_PASS ?? undefined,
  },
});
