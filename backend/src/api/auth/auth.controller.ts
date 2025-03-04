import { Body, Controller,  Get, Post,   Req,     Request as RequestNest,     Res,     UnauthorizedException,   Session,  UseGuards} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginInputDto, userRegisterDTO } from "./dto/auth.dto";
import { LocalAuthGuard } from "./jwt/local-auth.guard";
import { Request, Response } from 'express';
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import * as bcrypt from 'bcrypt';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@RequestNest() req, @Body() user: LoginInputDto,) {
    const login = await this.authService.login(req.user);
    return login
  }

  @Post("register")
  async register(@Body() user: userRegisterDTO) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.authService.register(user);
  }
}
