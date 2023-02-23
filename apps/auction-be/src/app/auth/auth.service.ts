import {
  GuardCode,
  GuardException,
  GuardUtil,
  JwtCache,
} from '@auction-nx/server/guard';
import { IUserJwt, Role } from '@auction-nx/server/common';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthProvider, User } from '@prisma/client';
import { Cache } from 'cache-manager';
import { AuthException } from './auth.exception';
import {
  AuthCheckExistDto,
  AuthSignInDto,
  AuthSignUpDto,
} from './auth.validation';
import { PrismaService } from '@auction-nx/server/prisma';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly guard: GuardUtil,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  async checkExist(data: AuthCheckExistDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true, email: true },
    });
    if (user) {
      if (user.email === data.email) throw new AuthException('EMAIL_EXISTED');
    }

    return user;
  }

  async signUp(data: AuthSignUpDto) {
    await this.checkExist({ email: data.email });

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: Role.USER,
        password: await this.guard.hashing(data.password),
        wallet: { create: { amount: 0 } },
      },
    });
    return this.upsertToken(user, AuthProvider.NORMAL);
  }

  async signIn(data: AuthSignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) throw new AuthException('EMAIL_NOT_FOUND');

    await this.guard.compare(data.password, user.password);

    return this.upsertToken(user, AuthProvider.NORMAL);
  }

  async signOut(info: IUserJwt, accessToken: string) {
    await this.prisma.auth.update({
      where: {
        userId_provider: {
          userId: info.sub,
          provider: info.provider as AuthProvider,
        },
      },
      data: { accessToken: '', refreshToken: '' },
      select: { userId: true },
    });
    await this.cache.set(
      `${JwtCache.ACCESS_TOKEN}_${accessToken}`,
      GuardCode.TOKEN_INVALID,
      {
        ttl: Math.floor(+info.exp - Date.now() / 1000),
      }
    );
  }

  async refresh(info: IUserJwt, refreshToken: string) {
    const auth = await this.prisma.auth.findUnique({
      where: {
        userId_provider: {
          userId: info.sub,
          provider: info.provider as AuthProvider,
        },
      },
      include: { user: true },
    });
    if (!auth || !auth.refreshToken || !auth.user)
      throw new GuardException('REFRESH_TOKEN_INVALID');
    if (auth.user.status === 'DEACTIVE')
      throw new GuardException('DEACTIVATE_ACCOUNT');

    return this.upsertToken(auth.user, auth.provider, refreshToken);
  }

  private async upsertToken(
    user: User,
    provider: AuthProvider,
    refreshToken?: string
  ) {
    const jwtData = await this.guard.generate(user, provider);

    await this.prisma.auth.upsert({
      // Insert into Data if not available
      where: { userId_provider: { userId: user.id, provider } },
      update: {
        accessToken: jwtData.accessToken,
        refreshToken: refreshToken ?? jwtData.refreshToken,
      },
      create: {
        userId: user.id,
        provider,
        accessToken: jwtData.accessToken,
        refreshToken: refreshToken ?? jwtData.refreshToken,
      },
    });
    return jwtData;
  }
}
