import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { Inject, Injectable, forwardRef  } from '@nestjs/common';
import { AuthService } from '../auth.service';
const prisma = require("../../../config/prisma")
import { PrismaService } from '../../../prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsernameConstraint implements ValidatorConstraintInterface {

  async validate(username: string, args: ValidationArguments) {
    const cek_user = await prisma.user.findFirst({where : {username : username}})
    return !cek_user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'username already in use';
  }
}

export function UniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UniqueUsername',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: UniqueUsernameConstraint,
    });
  };
}
