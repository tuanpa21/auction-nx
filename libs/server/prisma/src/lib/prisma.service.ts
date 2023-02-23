import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'development'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      super.$on<any>('query', (event: Prisma.QueryEvent) => {
        console.log('Query: ' + event.query);
        console.log('Params: ' + event.params);
        console.log('Duration: ' + event.duration + 'ms');
      });
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
