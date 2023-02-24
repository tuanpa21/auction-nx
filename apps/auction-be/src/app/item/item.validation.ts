import {
  IsSwaggerDate,
  IsSwaggerNumber,
  IsSwaggerString,
  PaginationQueryDto,
} from '@auction-nx/server/common';
import { PartialType } from '@nestjs/mapped-types';
import { MinDate } from 'class-validator';

export class ItemQueryDto extends PaginationQueryDto {}

export class ItemCreateDto {
  @IsSwaggerString({ maxLength: 255 })
  name: string;

  @IsSwaggerNumber({ minimum: 0 })
  cost: number;

  @IsSwaggerDate({})
  @MinDate(new Date())
  expiredAt: Date;
}

export class ItemUpdateDto extends PartialType(ItemCreateDto) {}
