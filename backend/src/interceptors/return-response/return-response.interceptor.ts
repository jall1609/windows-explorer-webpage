import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class ReturnResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const request = context.switchToHttp().getRequest();
    const status_code = response.statusCode;
    const httpMethod = request.method;

    let kegiatan = "get";
    if(httpMethod == "POST") kegiatan = "create"
    if(httpMethod == "PUT" || httpMethod == 'PATCH') kegiatan = "update"
    if(httpMethod == "DELETE") kegiatan = "delete"

    let success = false;
    let berhasil_or_gagal = 'Failed';
    if(status_code >= 200 && status_code < 300) {
      success = true;
      berhasil_or_gagal = 'Success';
    }

    if(status_code == 200) response.status(201);
    return next.handle().pipe(
      map(data => (
        { 
          success,
          message : `${berhasil_or_gagal} ${kegiatan} data`,
          data
        }))
    );
  }
}
