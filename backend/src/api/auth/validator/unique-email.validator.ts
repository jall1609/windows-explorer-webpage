import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
const prisma = require("../../../config/prisma")
import { User } from '@prisma/client';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private userService: AuthService) {}

  async validate(email: string, args: ValidationArguments) {
    const cek_user = await prisma.user.findFirst({where : {email : email}})
    console.log(cek_user)
    return !cek_user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'email already in use';
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UniqueEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: UniqueEmailConstraint,
    });
  };
}
