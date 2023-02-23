import { HEADERS, IUserJwt } from '@jitera/common'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Cache } from 'cache-manager'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { GuardCode, GuardException } from './guard.exception'
import { GuardCookie, JwtCache } from './guard.interface'

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const accessToken: string | null =
            request.cookies?.[GuardCookie.ACCESS_TOKEN] || request.headers[HEADERS.AUTHORIZATION]

          if (!accessToken) return accessToken
          return accessToken.startsWith('Bearer ') ? accessToken.split('Bearer ')[1] : accessToken
        },
      ]),
      secretOrKeyProvider: async (request, rawJwt, done) => {
        this.cache.get(`${JwtCache.ACCESS_TOKEN}_${rawJwt}`).then((reason: GuardCode) => {
          reason ? done(new GuardException(reason)) : done(null, config.get('auth.jwt.secretKey'))
        })
      },
    } as StrategyOptions)
  }

  async validate(payload: IUserJwt) {
    return payload
  }
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const refreshToken: string | null =
            request.cookies?.[GuardCookie.REFRESH_TOKEN] || request.headers[HEADERS.AUTHORIZATION]

          if (!refreshToken) return refreshToken
          return refreshToken.startsWith('Bearer ') ? refreshToken.split('Bearer ')[1] : refreshToken
        },
      ]),
      secretOrKeyProvider: async (request, rawJwt, done) => {
        this.cache.get(`${JwtCache.ACCESS_TOKEN}_${rawJwt}`).then((reason: GuardCode) => {
          reason ? done(new GuardException(reason)) : done(null, config.get('auth.jwt.refreshSecretKey'))
        })
      },
    } as StrategyOptions)
  }

  validate(payload: IUserJwt) {
    return payload
  }
}
