import { IsDefined, IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class LoginDto {
  @IsEmail()
  @IsDefined()
  @ApiProperty({ description: "The email of the user", example: "Kevin Lop" })
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: "The email id of the user", example: "Kevin Lop" })
  emailId: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: "The picture of the user", example: "123456yuj" })
  picture: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: "The username of the user", example: "Phong" })
  username: string;

  constructor(email: string, emailId: string, picture: string, username: string) {
    this.emailId = emailId;
    this.picture = picture;
    this.username = username;
    this.email = email;
  }
}