import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, IsString, ValidateIf } from 'class-validator'
import { PAGINATION, QuerySort } from './pagination.constant'
import { IsLargeThan, PaginateLimit } from './pagination.decorator'

export class PaginationOptionsDto {
  @PaginateLimit({ default: 1 }, PAGINATION.MAXIMUM_PAGE)
  readonly page: number = 1

  @PaginateLimit({ default: 10 }, PAGINATION.MAXIMUM_SIZE)
  readonly size: number = 1
}

export class PaginationQueryDto extends PaginationOptionsDto {
  @ApiProperty({ type: 'string', required: false, description: 'Not Required' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value && value.trimEnd().trimStart())
  search?: string

  @ApiProperty({ type: 'string', required: false, description: 'Not Required' })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Transform(({ value }: { value: string }) => value && value.split('.'))
  sort?: [string, QuerySort]

  @ApiProperty({ type: 'string', required: false, description: 'Not Required' })
  @IsOptional()
  @IsString()
  group?: string
}

export class PaginationRangeDto extends PaginationOptionsDto {
  @ApiProperty({ type: 'date', default: new Date(), required: false, description: 'Not Required' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value && new Date(value))
  from?: Date

  @ValidateIf((o) => o.from)
  @ApiProperty({ type: 'date', default: new Date(), required: false, description: 'Not Required' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value && new Date(value))
  @IsLargeThan<PaginationRangeDto>('from')
  to?: Date
}
