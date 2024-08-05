import { Controller, Get, HttpCode, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";

import { ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "@guard/google-auth.guard";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@ApiTags("Authentication")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService, private readonly jwtService: JwtService) {
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
    res.status(HttpStatus.OK).json({ token: token, user });
  }
}
