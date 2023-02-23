import { MultipartFile } from '@fastify/multipart'
import { FastifyReply, FastifyRequest } from 'fastify'
import { JwtPayload } from 'jsonwebtoken'
import { CUID, NUM_DATE, Role } from './common.enum'
import { IAppError } from './error'

export interface IUserJwt extends Omit<JwtPayload, 'sub'> {
  sub: CUID
  role: Role
  name: string
  email: string
  provider: string
  exp: NUM_DATE
  iat: NUM_DATE
}

export interface IMeta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null
  next: number | null
}

export interface IResponse<T> {
  data?: T
  meta?: IMeta
  error?: IAppError
}

export interface IRequest extends FastifyRequest {
  user: IUserJwt
  cookies: Record<string, string> & { accessToken?: string; refreshToken?: string }
  raw: FastifyRequest['raw'] & { user?: IUserJwt }
  rawBody: Buffer
  file: () => Promise<MultipartFile>
  files: () => AsyncIterableIterator<MultipartFile>
  parts: () => AsyncIterableIterator<MultipartFile>
}

export interface IReply extends FastifyReply {
  cookie: (key: string, value: string, options?: unknown) => this
  setCookie: (key: string, value: string, options?: unknown) => this
  clearCookie: (key: string, options?: unknown) => this
}
