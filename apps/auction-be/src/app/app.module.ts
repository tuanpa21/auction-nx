import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModule, Module } from '@nestjs/common';
import { CommonModule } from '@auction-nx/server/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './app.config';
import { GuardModule } from '@jitera/guard';
import { PrismaModule } from '@jitera/prisma';
import { UserModule } from './user/user.module';
import type { RedisClientOptions } from 'redis';
import { ItemModule } from './item/item.module';
import { JobModule } from './job/job.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Read app.config.ts => format to json
      isGlobal: true,
      encoding: 'utf-8',
      envFilePath: ['.env'],
      load: [configuration],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Caching Ram or Redis
        const isRedis = config.get('redis.host');
        if (!isRedis) return { isGlobal: true };

        //Using redis
        return {
          isGlobal: true,
          store: redisStore, // Redis will be the store, otherwise it's RAM
          host: config.get('redis.host'),
          port: config.get('redis.port'),
          password: config.get('redis.pass') ?? undefined,
        } as RedisClientOptions;
      },
    }),
    CommonModule,
    PrismaModule,
    //THIRD PARTY MODULE
    GuardModule,
    //API MODULE
    AuthModule,
    UserModule,
    ItemModule,
    WalletModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
