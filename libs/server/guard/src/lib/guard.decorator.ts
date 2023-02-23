import { ApiFailedRes, ForbiddenDataDto, UnauthorizedDataDto } from '@jitera/common'
import { applyDecorators, Controller, HttpStatus, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAtGuard } from './guard/auth-at.guard'
import { RoleGuard } from './guard/role.guard'

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)

export function IsAuthController(name: string, tags: string, isRequire = true) {
  return applyDecorators(
    Controller(name),
    ApiTags(tags),
    ...(isRequire ? [ApiBearerAuth(), UseGuards(JwtAtGuard, RoleGuard)] : []),
    ...(isRequire
      ? [
          ApiFailedRes(UnauthorizedDataDto, HttpStatus.UNAUTHORIZED),
          ApiFailedRes(ForbiddenDataDto, HttpStatus.FORBIDDEN),
        ]
      : [])
  )
}
