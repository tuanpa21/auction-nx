import { ERROR } from './error.constant'
import { HttpException } from '@nestjs/common'
import { IAppError } from './error.interface'

export * from './error.constant'
export * from './error.decorator'
export * from './error.interface'

// Custom exception
export class AppException extends HttpException {
  public code: string
  constructor(code: string, message?: string, service: Record<string, IAppError> = ERROR) {
    const { status, ...error } = service[code]
    if (message) error.message = message
    super(error, status)
    this.code = error.code
  }
}
