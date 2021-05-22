import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ErrorsInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      catchError((error) => {
        const message = 'Internal server error';
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        if (!error.message) error.message = message;
        if (error.status) statusCode = error.status;
        if (error.name && (<string>error.name).includes('Sequelize')) {
          statusCode = HttpStatus.CONFLICT;
          error.response = {
            statusCode,
            message: error.message,
            errors: error.errors,
          };
        }
        return throwError(new HttpException(error.response, statusCode));
      }),
    );
  }
}
