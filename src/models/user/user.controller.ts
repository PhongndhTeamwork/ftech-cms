import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { Response } from "express";


@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getAllUser(@Res() res: Response) {
    console.log("All user");
    res.status(HttpStatus.OK).json("GET ALL");
  }

}
