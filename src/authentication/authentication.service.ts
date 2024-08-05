import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "@authentication/dto/login.dto";
import { UserEntity } from "@model/user/entities/user.entity";
import { WhitelistService } from "@model/whitelist/whitelist.service";
import { UserService } from "@model/user/user.service";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly whitelistService: WhitelistService
  ) {

  }

  async generateJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: LoginDto): Promise<UserEntity> {
    if (!user) {
      throw new BadRequestException("Unauthenticated");
    }
    const userExists = await this.userService.findUserByEmail(user.email);
    if (!userExists) {
      return this.registerUser(user);
    }
    return userExists;
  }

  private async registerUser(user: LoginDto) {
    await this.whitelistService.checkEmailPermission(user.email);
    try {
      const newUser = new UserEntity({
        email: user.email,
        emailId: user.emailId,
        username: user.username,
        picture: user.picture
      });
      return this.userService.createUser(newUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
