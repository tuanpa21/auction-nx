import { HttpStatus } from '@nestjs/common'

export enum ErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface IAppError {
  code: string
  message: string
  status: HttpStatus
}
