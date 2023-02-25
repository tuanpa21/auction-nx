import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { isArray, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../common.interface';

// Format all response (Passing through IResponse<T>)
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<IResponse<T>> {
    return next
      .handle()
      .pipe(
        map((res) =>
          isObject(res) ? this.transformResponse(res) : { data: res }
        )
      );
  }

  transformResponse(response: Record<string, any>): IResponse<T> {
    return response.meta && response.data
      ? { data: response.data.map(this.transformToPlain), meta: response.meta }
      : {
          data: isArray(response)
            ? response.map(this.transformToPlain)
            : this.transformToPlain(response),
        };
  }

  transformToPlain(plainOrClass: any) {
    return plainOrClass && plainOrClass.constructor !== Object
      ? instanceToPlain(plainOrClass)
      : plainOrClass;
  }
}
