import { IsDefined, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateWhitelistDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ description: "The email of the user", example: "example@gmail.com" })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}