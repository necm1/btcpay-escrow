import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    const res = context.switchToHttp().getResponse();
    const status = res.statusCode;

    return next.handle().pipe(
      map((response) => {
        const { data, meta, links } = response || {};

        if (!response) {
          return response;
        }

        if (data && meta && links) {
          return {
            status,
            data,
            meta,
            links,
          };
        }

        return {
          status,
          data: response,
        };
      })
    );
  }
}
