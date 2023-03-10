export const HEADERS = {
  CONTENT_TYPE: `content-type`,
  CONTENT_ENCODING: `content-encoding`,
  CONTENT_DISPOSITION: `content-disposition`,
  AUTHORIZATION: `authorization`,
}

export const TTL = {
  ONE_MINUTE: 60,
  ONE_HOUR: 3600,
  ONE_DAY: 86400,
  ONE_WEEK: 604800,
  ONE_MONTH: 2592000,
}

export const CORS = {
  methods: ['HEAD', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'TRACE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'sentry-trace', 'x-request-id'],
  exposedHeaders: ['Content-Disposition'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
