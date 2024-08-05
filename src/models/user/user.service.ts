import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@model/user/entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {

  }

  async findUserById(id: number) {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createUser(user : UserEntity) : Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }catch (error){
      throw new InternalServerErrorException(error);
    }
  }
}
