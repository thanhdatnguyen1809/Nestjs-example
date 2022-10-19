import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data2: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log('here transform interceptor');
    // return next.handle().pipe(
    //   map(data2 => ({ data2 }))
    //   );
    return next
        .handle()
        .pipe(
            catchError(err => throwError(() => new BadGatewayException())),
        );
  }
}