import { ApiExtraModels, ApiOkResponse, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { applyDecorators, HttpStatus, Type } from '@nestjs/common'
import { IAppError } from '../error'
import { IMeta, IResponse } from '../common.interface'

export class SwaggerResOk<T> implements IResponse<T> {
  @ApiProperty()
  data: T
}

export class SwaggerResError<T> implements IResponse<T> {
  @ApiProperty()
  error: IAppError
}

//DECORATOR CONTROLLER
export class UnauthorizedDataDto implements IAppError {
  @ApiProperty({ type: 'string', default: '1001' })
  code

  @ApiProperty({ type: 'string', default: `Require access token in header` })
  message

  @ApiProperty({ type: 'string', default: HttpStatus.UNAUTHORIZED })
  status: HttpStatus.UNAUTHORIZED
}

export class ForbiddenDataDto {
  @ApiProperty({ type: 'string', default: '1000' })
  code: string

  @ApiProperty({ type: 'string', default: `Your don't have enough permission to access this resource` })
  message

  @ApiProperty({ type: 'string', default: HttpStatus.FORBIDDEN })
  status: HttpStatus.FORBIDDEN
}

export class PaginateMetadataDto implements IMeta {
  @ApiProperty({ example: 100 })
  total: number

  @ApiProperty({ example: 1 })
  currentPage: number

  @ApiProperty({ example: 10 })
  lastPage: number

  @ApiProperty({ example: 10 })
  perPage: number

  @ApiProperty({ example: null, nullable: true })
  prev: number | null

  @ApiProperty({ example: 2, nullable: true })
  next: number | null
}

export class PaginatedResponseDto<T> {
  @ApiProperty()
  data: T[]

  @ApiProperty()
  meta: PaginateMetadataDto
}

export const ApiPassedRes = <DataDto extends Type<unknown>>(dataDto: DataDto, status: HttpStatus) => {
  return applyDecorators(
    ApiExtraModels(SwaggerResOk, dataDto),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SwaggerResOk) },
          { properties: { data: { type: 'object', $ref: getSchemaPath(dataDto) } } },
        ],
      },
    })
  )
}

export const ApiFailedRes = <DataDto extends Type<unknown>>(dataDto: DataDto, status: HttpStatus) => {
  return applyDecorators(
    ApiExtraModels(SwaggerResError, dataDto),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SwaggerResError) },
          { properties: { error: { type: 'object', $ref: getSchemaPath(dataDto) } } },
        ],
      },
    })
  )
}

export const ApiPaginateRes = <DataDto extends Type<unknown>>(dataDto: DataDto) => {
  const properties = { data: { type: 'array', items: { $ref: getSchemaPath(dataDto) } } }
  return applyDecorators(
    ApiExtraModels(SwaggerResOk, PaginatedResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SwaggerResOk) },
          { properties: { data: { type: 'object', $ref: getSchemaPath(PaginatedResponseDto), properties } } },
        ],
      },
    })
  )
}
