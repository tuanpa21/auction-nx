import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  Max,
  Min,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function PaginateLimit(options: ApiPropertyOptions = {}, max = 10) {
  return applyDecorators(
    ApiPropertyOptional({ minimum: 1, maximum: max, ...options }),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(max),
    IsOptional()
  );
}

export function IsLargeThan<T>(
  property: keyof T,
  validationOptions?: ValidationOptions
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isLargeThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | number | Date, args: ValidationArguments) {
          const validateValue = (args.object as any)[args.constraints[0]];
          return value > validateValue;
        },

        defaultMessage(args: ValidationArguments) {
          const [constraintProperty]: (() => any)[] = args.constraints;
          return `${args.property} must be large than ${constraintProperty}`;
        },
      },
    });
  };
}
