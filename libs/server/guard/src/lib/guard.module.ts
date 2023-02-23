import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { guardConfig } from './guard.config'
import { JwtAccessTokenStrategy, JwtRefreshTokenStrategy } from './guard.strategy'
import { GuardUtil } from './guard.util'

@Global()
@Module({
  imports: [ConfigModule.forFeature(guardConfig), JwtModule.register({}), PassportModule.register({ session: true })],
  providers: [GuardUtil, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [GuardUtil, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class GuardModule {}
