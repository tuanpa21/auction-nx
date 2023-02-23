import { IReply, IUserJwt } from '@auction-nx/server/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { addSeconds } from 'date-fns';
import { GuardException } from './guard.exception';
import {
  GuardCookie,
  IConfigCookie,
  IConfigJwt,
  IJwtResponse,
} from './guard.interface';

@Injectable()
export class GuardUtil {
  private readonly logger = new Logger(GuardUtil.name);
  private readonly jwt: IConfigJwt;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.jwt = this.config.get('auth.jwt');
  }

  async hashing(text: string, saltRounds = 10): Promise<string> {
    return hash(text, saltRounds);
  }

  async compare(text: string, hash: string, check = true): Promise<boolean> {
    const matches = await compare(text, hash);
    if (!matches && check) {
      throw new GuardException('PASSWORD_INCORRECT');
    }
    return matches;
  }

  async generate<T>(
    user: T & Omit<IUserJwt, 'exp' | 'iat'>,
    provider: string
  ): Promise<IJwtResponse<T>> {
    const payload: Omit<IUserJwt, 'exp' | 'iat'> = {
      sub: user.id ?? user.sub,
      name: user.name,
      role: user.role,
      email: user.email,
      provider,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
        expiresIn: this.jwt.expireIns,
        secret: this.jwt.secretKey,
      }),
      this.jwtService.signAsync(payload, {
        algorithm: 'HS512',
        expiresIn: this.jwt.refreshExpireIns,
        secret: this.jwt.refreshSecretKey,
      }),
    ]);
    return {
      user,
      accessToken,
      refreshToken,
      expireIns: this.jwt.expireIns,
    };
  }

  setCookie<T>(
    res: IReply,
    response: IJwtResponse<T>,
    refresh = addSeconds(new Date(), this.jwt.refreshExpireIns)
  ): IReply {
    const cookie = this.config.get<IConfigCookie>('cookie');
    cookie.expires = addSeconds(new Date(), this.jwt.expireIns);
    return res
      .setCookie(GuardCookie.ACCESS_TOKEN, response.accessToken, cookie)
      .setCookie(GuardCookie.EXPIRE_INS, response.expireIns.toString(), cookie)
      .setCookie(GuardCookie.REFRESH_TOKEN, response.refreshToken, {
        ...cookie,
        expires: refresh,
      });
  }
}
