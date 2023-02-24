import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { HttpModule } from '@nestjs/axios'
import { Global, Module, RequestMethod } from '@nestjs/common'
import { Env } from './common.enum'

@Global()
@Module({
  imports: [
    HttpModule,
    LoggerModule.forRootAsync({ // Use pino for streaming log
      imports: [ConfigModule], // Config must be available before running logger
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const ENV = config.get<Env>('env') ?? Env.DEFAULT
        const { version, service } = config.get('app')

        return {
          pinoHttp: {
            useLevel: 'info',
            level: ENV === Env.PRODUCTION ? 'info' : 'debug',
            autoLogging: true,
            transport: {
              target: 'pino-pretty',
              options: {
                levelFirst: true,
                singleLine: true,
                colorize: true,
                translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                ignore: 'pid,host,context,req,res,responseTime',
                messageFormat: `{pid} {req.id} - [{context}]:{msg}`,
                errorLikeObjectKeys: ['err', 'error'],
              },
            },
          },
          forRoutes: ['*'],
          exclude: [
            { method: RequestMethod.ALL, path: `/api/${version}/${service}/docs` },
            { method: RequestMethod.ALL, path: `/api/${version}/${service}/docs/swagger-ui-init.js` },
            { method: RequestMethod.ALL, path: `/api/${version}/${service}/docs/swagger-ui.css` },
            { method: RequestMethod.ALL, path: `/api/${version}/${service}/docs/swagger-ui-bundle.js` },
            { method: RequestMethod.ALL, path: `/api/${version}/${service}/docs/swagger-ui-standalone-preset.js` },
            { method: RequestMethod.ALL, path: `/api/${version}/${service}/docs/favicon-32x32.png` },
          ],
        }
      },
    }),
  ],
  exports: [HttpModule],
})
export class CommonModule {}
