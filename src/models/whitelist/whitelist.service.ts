import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";
import { Repository } from "typeorm";
import { CreateWhitelistDto } from "@model/whitelist/dto/create-whitelist.dto";
import { UpdateWhitelistDto } from "@model/whitelist/dto/update-whitelist.dto";

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(WhitelistEntity)
    private readonly whitelistRepository: Repository<WhitelistEntity>) {
  }

  async checkEmailPermission(email: string): Promise<boolean> {
    let userExists: WhitelistEntity;
    try {
      userExists = await this.whitelistRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!userExists) {
      throw new ForbiddenException("Your google account do not have permission to login");
    }
    return true;
  }

  async getAllAuthorizedEmails(): Promise<string[]> {
    try {
      const whitelist: WhitelistEntity[] = await this.whitelistRepository.find();
      return whitelist.map(user => user.email);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async authorizeEmail(user: CreateWhitelistDto): Promise<string> {
    await this.addEmail(user.email);
    return `Email ${user.email} is authorized successfully`;
  }

  async authorizeEmails(users: CreateWhitelistDto[]): Promise<string> {
    try {
      for (const user of users) {
        await this.authorizeEmail(user);
      }
      return "Authorize emails successfully";
    } catch (error) {``
      throw new InternalServerErrorException(error);
    }
  }

  async updateAuthorizedEmail(user: UpdateWhitelistDto, id: number): Promise<WhitelistEntity> {
    let whitelistEntity: WhitelistEntity;
    try {
      whitelistEntity = await this.whitelistRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!whitelistEntity) {
      throw new NotFoundException(`Whitelist entry with ID ${id} not found`);
    }
    whitelistEntity.email = user.email;
    try {
      return await this.whitelistRepository.save(whitelistEntity);
    } catch (error) {
      throw new InternalServerErrorException("Failed to update whitelist entry " + error);
    }
  }

  async deleteAuthorizedEmail(id: number): Promise<string> {
    const emailExists: WhitelistEntity | null = await this.getAuthorizedEmailById(id);
    if (!emailExists) {
      throw new NotFoundException(`Whitelist entry with ID ${id} not found`);
    }
    try {
      await this.whitelistRepository.delete({ id });
      return `Whitelist entry with ID ${id} successfully deleted`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  private async getAuthorizedEmailById(id: number): Promise<WhitelistEntity> {
    try {
      return this.whitelistRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async getAuthorizedEmailByEmail(email: string): Promise<WhitelistEntity> {
    try {
      return this.whitelistRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async addEmail(email: string) {
    const emailExists: WhitelistEntity | null = await this.getAuthorizedEmailByEmail(email);
    if (emailExists) {
      throw new ConflictException(`Whitelist entry with email ${email} already exist`);
    }
    try {
      const newUser = new WhitelistEntity({ email });
      const newWhitelist: WhitelistEntity = this.whitelistRepository.create(newUser);
      await this.whitelistRepository.save(newWhitelist);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
