import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength} from 'class-validator';
import { UniqueEmail } from '../validator/unique-email.validator';
import { UniqueUsername } from '../validator/unique-username.service';


export class CreateAuthDto {}

export class userRegisterDTO {
  @ApiProperty({example : 'dimas123'})
  @IsNotEmpty()
  @IsString()
  @UniqueUsername()
  username: string;
  
  @ApiProperty({example : "dimas@gmail.com"})
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @UniqueEmail()
  email: string;

  @ApiProperty({example : "12345"})
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({example : "Dimas Saputra"})
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class LoginInputDto {
  @ApiProperty({example : 'dimas123'})
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({example : "12345"})
  @IsNotEmpty()
  @IsString()
  password: string;
}