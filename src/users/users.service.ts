import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page: number, size: number): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserDto> {
    await this.checkIdValid(id);
    const existingUser = await this.userRepository.findOne({
      where: {
        user_id: Number(id),
      },
    });
    return plainToInstance(UserDto, existingUser);
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await this.userRepository.save({
        ...createUserDto,
        password: hashPassword,
      });
      return plainToInstance(CreateUserDto, newUser);
    } catch {
      throw new HttpException(
        'Input from customer is not valid!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(id: string, userDto: UserDto): Promise<UpdateResult> {
    try {
      await this.checkIdValid(id);
      return await this.userRepository.update(Number(id), userDto);
    } catch {
      throw new HttpException(
        'Input from customer is not valid!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(id: string):Promise<DeleteResult> {
    await this.checkIdValid(id);
    return await this.userRepository.delete(Number(id));
  }

  private async checkIdValid(id: string): Promise<void> {
    if (!Number(id)) {
      throw new HttpException('Id is not a number!', HttpStatus.BAD_REQUEST);
    }
    const existingUser = await this.userRepository.findOne({
      where: {
        user_id: Number(id),
      },
    });
    if (!existingUser) {
      throw new HttpException('Id is not valid!', HttpStatus.BAD_REQUEST);
    }
  }
}
