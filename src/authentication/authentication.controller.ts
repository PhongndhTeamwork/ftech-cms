import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { OAuth2Client } from "google-auth-library";

import { ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "@guard/google-auth.guard";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginDto } from "@authentication/dto/login.dto";
import { UserEntity } from "@model/user/entities/user.entity";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

@ApiTags("Authentication")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {
  }

  @Get("/google/login")
  @UseGuards(GoogleAuthGuard)
  handleLoginByGoogle() {
  }

  @Get("/google/redirect")
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.log("start");
    const user = req.user;
    console.log(user);
    const token = await this.authenticationService.generateJwt({ ...user });
    // let frontendUrl = this.configService.getOrThrow("FRONTEND_URL");
    // frontendUrl += `?token=${encodeURIComponent(token)}&user=${encodeURIComponent(JSON.stringify(user))}`;
    // res.redirect(frontendUrl);
    res.status(HttpStatus.OK).json({ token: token, user });
  }

  @Post("/login")
  async login(@Body() { credential }: { credential: string }): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: this.configService.getOrThrow("GOOGLE_CLIENT_ID")
    });
    const profile = ticket.getPayload();
    const newLoginDto = new LoginDto(profile.email, profile.sub, profile.picture, profile.name);
    const user: UserEntity = await this.authenticationService.signIn(newLoginDto);
    const token = await this.authenticationService.generateJwt({ ...user });
    return { token };

  }
}
