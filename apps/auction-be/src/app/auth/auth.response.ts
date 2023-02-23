import { IJwtResponse } from '@auction-nx/server/guard';
import {
  IsSwaggerNumber,
  IsSwaggerObject,
  IsSwaggerString,
  Role,
  TTL,
} from '@auction-nx/server/common';
import { User } from '@prisma/client';

export class AuthCheckExistRes {
  @IsSwaggerString({ default: 'This email is valid' })
  message: string;
}

export class AuthSignInRes implements IJwtResponse<User> {
  @IsSwaggerString({ example: 'accessToken' })
  accessToken: string;

  @IsSwaggerString({ example: 'refreshToken' })
  refreshToken: string;

  @IsSwaggerNumber({ example: TTL.ONE_DAY })
  expireIns: number;

  @IsSwaggerObject(
    {},
    {
      example: {
        id: 'cjld2cjxh0000qzrmn831i7rn',
        name: 'user_jitera',
        email: 'user@jitera.io',
        role: Role.USER,
        gender: 'MALE',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Omit<User, 'password'>,
    }
  )
  user: User;
}

export class AuthSignUpRes extends AuthSignInRes {}

export class AuthRefreshRes extends AuthSignInRes {}
