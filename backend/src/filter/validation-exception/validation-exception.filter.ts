import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(BadRequestException)
export class CustomValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as any;
    const errors = exceptionResponse.message as ValidationError[];
    const status = exception.getStatus();


    response
      .status(status)
      .json({
        "success" : false,
        "message" : "Bad Request" ,
        "data"  : this.transformArray(errors)
      });
  }

  private transformArray(arr : Array<any>) {
    const result = {};

    arr.forEach(item => {
      const words = item.split(' ');
      const key = words[0];
      const value = item.slice(key.length).trim();

      if (result[key])  result[key].push(value);
      else result[key] = [value];
      
    });

    return result;
  }
}