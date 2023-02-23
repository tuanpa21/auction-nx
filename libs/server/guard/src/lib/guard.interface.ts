export interface IConfigCookie {
  expires: Date
  domain: string
  httpOnly: boolean
  secure: boolean
  path: string
}

export interface IConfigJwt {
  secretKey: string
  expireIns: number
  refreshSecretKey: string
  refreshExpireIns: number
}

export interface IConfigGuard {
  cookie: IConfigCookie
  auth: {
    jwt: IConfigJwt
  }
}

export enum GuardCookie {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  EXPIRE_INS = 'expireIns',
}

export enum JwtCache {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export interface IJwtResponse<T> {
  user: T
  accessToken: string
  refreshToken: string
  expireIns: number
}
