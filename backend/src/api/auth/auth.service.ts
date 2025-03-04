import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {  Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { userRegisterDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(  private jwtService: JwtService, private prisma: PrismaService) {}

	async validateUser(username: string, password: string) {
		const user = await this.findAccount({ username });
		if (!user || !(await bcrypt.compare(password, user.password)))  return null;
		return user;
	}

	async findAccount(where : Prisma.UserWhereInput, include? : Prisma.UserInclude ) {
		return this.prisma.user.findFirst({
			where , include 
		})
	}

	async login(user : User) {
		return { access_token: this.jwtService.sign(user), user };
	}

	async register(request : userRegisterDTO)  {
		return await this.prisma.user.create({data : request});
	}
}
