import { ErrorCode, IAppError } from './error.interface'
import { HttpStatus } from '@nestjs/common'

export const ERROR: Record<ErrorCode, IAppError> = {
  [ErrorCode.UNKNOWN_ERROR]: {
    code: `0001`,
    message: `Unknown error. Please contact the admin`,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
}
