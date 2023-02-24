import { IsSwaggerString } from '@auction-nx/server/common';
import { IsEmail, Matches } from 'class-validator';

// Request
export class AuthCheckExistDto {
  @IsSwaggerString({ example: 'user@jitera.io' })
  @IsEmail()
  email: string;
}

export class AuthSignInDto extends AuthCheckExistDto {
  @IsSwaggerString({ example: 'Jitera123!' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
  )
  // 1 lower, 1 upper, 1 special, between 8 ~ 30 chars
  password: string;
}

export class AuthSignUpDto extends AuthSignInDto {
  @IsSwaggerString({ example: 'jitera_user', maxLength: 255 })
  name: string;
}
