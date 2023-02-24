import { applyDecorators } from '@nestjs/common'
import { Transform, Type } from 'class-transformer'
import { ApiBody, ApiConsumes, ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator'

export function IsSwaggerUUID(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsUUID('all')
  )
}

export function IsSwaggerArrayUUID(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsUUID('all', { each: true })
  )
}

export function IsSwaggerString(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsString(),
    ...(options.maxLength ? [MaxLength(options.maxLength)] : []),
    ...(options.minLength ? [MinLength(options.minLength)] : [])
  )
}

export function IsSwaggerArrayString(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsString({ each: true }),
    ...(options.maxLength ? [MaxLength(options.maxLength)] : []),
    ...(options.minLength ? [MinLength(options.minLength)] : [])
  )
}

export function IsSwaggerStringNumber(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsNumberString(),
    ...(options.maxLength ? [MaxLength(options.maxLength)] : []),
    ...(options.minLength ? [MinLength(options.minLength)] : [])
  )
}

export function IsSwaggerArrayStringNumber(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsNumberString({}, { each: true }),
    ...(options.maxLength ? [MaxLength(options.maxLength)] : []),
    ...(options.minLength ? [MinLength(options.minLength)] : [])
  )
}

export function IsSwaggerNumber(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'number',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsNumber(),
    ...(options.minimum ? [Min(options.minimum)] : []),
    ...(options.maximum ? [Max(options.maximum)] : [])
  )
}

export function IsSwaggerArrayNumber(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'number',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsNumber({}, { each: true }),
    ...(options.minimum ? [Min(options.minimum)] : []),
    ...(options.maximum ? [Max(options.maximum)] : [])
  )
}

export function IsSwaggerBoolean(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'boolean',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsBoolean()
  )
}

export function IsSwaggerArrayBoolean(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'boolean',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsBoolean({ each: true })
  )
}

export function IsSwaggerDate(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'date',
      default: new Date(),
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    Transform(({ value }: { value: string }) => value && new Date(value)),
    IsDate()
  )
}

export function IsSwaggerArrayDate(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'date',
      default: new Date(),
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    Transform(({ value }) => value && new Date(value)),
    IsDate({ each: true })
  )
}

export function IsSwaggerEnum(enumData: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'enum',
      enum: enumData,
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsEnum(enumData)
  )
}

export function IsSwaggerArrayEnum(enumData: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'enum',
      enum: enumData,
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    isRequire ? IsDefined() : IsOptional(),
    IsEnum(enumData, { each: true })
  )
}

export function IsSwaggerObject(typeClass: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      type: 'object',
      required: isRequire,
      ...options,
    }),
    ...(isRequire ? [ArrayNotEmpty] : []),
    ValidateNested(),
    Type(() => typeClass)
  )
}

export function IsSwaggerArray(typeClass: any, options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({
      isArray: true,
      type: 'array',
      required: isRequire,
      description: isRequire ? 'required' : 'not required',
      ...options,
    }),
    ValidateNested({ each: true }),
    Type(() => typeClass),
    ...(isRequire ? [ArrayNotEmpty()] : []),
    ...(isRequire ? [ArrayMinSize(options.minItems)] : []),
    ...(isRequire ? [ArrayMaxSize(options.maxItems)] : [])
  )
}

export function IsSwaggerUpload(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({ ...options, type: 'string', format: 'binary' }),
    IsSwaggerString(options, isRequire)
  )
}

export function IsSwaggerUploads(options: ApiPropertyOptions = {}, isRequire = true) {
  return applyDecorators(
    ApiProperty({ ...options, type: 'array', format: 'binary' }),
    IsSwaggerArrayString(options, isRequire)
  )
}

export function IsFileUpload(type: any) {
  return applyDecorators(ApiConsumes('multipart/form-data'), ApiBody({ type }))
}
