import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { WhitelistService } from "./whitelist.service";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";
import { CreateWhitelistDto } from "@model/whitelist/dto/create-whitelist.dto";
import { ParseIntegerPipe } from "@pipe/parse-int.pipe";
import { ApiTags } from "@nestjs/swagger";


@Controller("whitelist")
@ApiTags("Whitelist")
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {
  }

  @Get()
  async getAllAuthorizedEmails(): Promise<string[]> {
    return await this.whitelistService.getAllAuthorizedEmails();
  }

  @Post()
  async authorizeUser(@Body() user: CreateWhitelistDto): Promise<string> {
    return await this.whitelistService.authorizeEmail(user);
  }

  @Post("many")
  async authorizeUsers(@Body() users: CreateWhitelistDto[]): Promise<string> {
    return await this.whitelistService.authorizeEmails(users);
  }

  @Patch(":id")
  async updateAuthorizedUser(
    @Body() user: CreateWhitelistDto,
    @Param("id", ParseIntegerPipe) id: number
  ): Promise<WhitelistEntity> {
    return await this.whitelistService.updateAuthorizedEmail(user, id);
  }

  @Delete(":id")
  async deleteAuthorizedUser(
    @Param("id", ParseIntegerPipe) id: number
  ): Promise<string> {
    return await this.whitelistService.deleteAuthorizedEmail(id);
  }
}
