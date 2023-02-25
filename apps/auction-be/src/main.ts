import compression from '@fastify/compress';
import cookies from '@fastify/cookie';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  CORS,
  Env,
  HttpExceptionFilter,
  TransformInterceptor,
  setupSwagger,
} from '@auction-nx/server/common';
import { AppModule } from './app/app.module';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: true });
  fastify.getInstance().addHook('onRoute', (opts) => {
    if (opts.path === '/api/v1/healthcheck') opts.logLevel = 'error';
  });
  fastify.register(compression); // Zip data for lighter transfer
  fastify.register(cookies, { secret: 'jitera-cookie-secret-key' }); // Login, session, jitera-cookie-secret-key will be added manually, like JWT_SECRET
  fastify.register(multipart, {
    // Read File
    attachFieldsToBody: true,
    limits: {
      fieldNameSize: 1024, // Max field name size in bytes
      fieldSize: 128 * 1024 * 1024 * 1024, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 128 * 1024 * 1024 * 1024, // For multipart forms, the max file size
      files: 10, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });
  fastify.register(helmet, {
    // Header security
    contentSecurityPolicy:
      process.env.NODE_ENV === Env.PRODUCTION
        ? {
            directives: {
              defaultSrc: [`'self'`],
              styleSrc: [`'self'`, `'unsafe-inline'`],
              imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
          }
        : false,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
    { bufferLogs: true, rawBody: true }
  ); // How app run
  const logger = app.get(Logger);

  app.useLogger(logger); // Logger
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); // Validation request + format
  app.useGlobalFilters(new HttpExceptionFilter(logger)); // Error response format
  app.useGlobalInterceptors(new TransformInterceptor()); // Response format

  const config = app.get(ConfigService); // Read env
  const { version = 'v1', port = 3333, service = 'jitera' } = config.get('app'); // Get env or use default value

  app.setGlobalPrefix(`api/${version}`); // Set prefix for endpoint
  if (process.env.NODE_ENV !== Env.PRODUCTION) {
    setupSwagger(app, version, service); // Setup swagger
  }
  app.enableCors({
    // origin:
    //   config.get<Env>('env') === Env.PRODUCTION
    //     ? config.get<string | string[]>('server.whitelist')
    //     : '*', // Enable CORS
    origin: 'http://localhost:4200', // Hardcode for local development
    ...CORS,
  });
  await app.listen(port, '0.0.0.0'); // Public endpoint
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/api/${version}`
  );
}

bootstrap(); // Start
