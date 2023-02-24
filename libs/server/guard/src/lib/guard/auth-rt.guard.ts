import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import { Observable } from 'rxjs'
import { GuardException } from '../guard.exception'

@Injectable()
export class JwtRtGuard extends AuthGuard('jwt-refresh') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const response = super.canActivate(context)
    return response
  }

  handleRequest<TUser = any>(err: Error, user: any, info: any): TUser {
    if (info instanceof TokenExpiredError) {
      throw new GuardException('REFRESH_TOKEN_EXPIRED')
    }
    if (info instanceof NotBeforeError) {
      throw new GuardException('REFRESH_CLAIMS_BEFORE')
    }
    if (info instanceof JsonWebTokenError) {
      throw new GuardException('REFRESH_TOKEN_INVALID')
    }
    if (err || !user) throw new GuardException('UNAUTHORIZED_REFRESH_TOKEN')
    return user
  }
}
