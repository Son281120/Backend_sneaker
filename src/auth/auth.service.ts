import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/user_register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserLoginDto } from './dto/user_login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async register(userRegisterDto: UserRegisterDto): Promise<UserRegisterDto> {
    const existEmail = await this.userRepository.findOne({
      where: {
        email: userRegisterDto.email,
      },
    });

    if (existEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    if (userRegisterDto.password.length < 6) {
      throw new HttpException(
        'Password must be at least 6 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userRegisterDto.password.length > 20) {
      throw new HttpException(
        'Password must be at most 20 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await this.hashPassword(userRegisterDto.password);
    const newUser = await this.userRepository.save({
      ...userRegisterDto,
      refresh_token: 'refresh_token_string',
      password: hashPassword,
    });
    return plainToInstance(UserRegisterDto, newUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async login(userLoginDto: UserLoginDto): Promise<any> {
    const userLogin = await this.userRepository.findOne({
      where: {
        email: userLoginDto.email,
      },
    });
    if (!userLogin) {
      throw new HttpException('Email is not exist!', HttpStatus.UNAUTHORIZED);
    }
    const checkPassword = bcrypt.compareSync(
      userLoginDto.password,
      userLogin.password,
    );
    if (!checkPassword) {
      throw new HttpException(
        'Password is not correct!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { user_id: userLogin.user_id, email: userLogin.email };
    return this.generateToken(payload);
  }

  private async generateToken(payload: { user_id: number; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
    });
    await this.userRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET')
      });
      const checkExistToken = await this.userRepository.findOneBy({
        email: verify.email,
        refresh_token,
      });
      if (checkExistToken) {
        return this.generateToken({
          user_id: verify.user_id,
          email: verify.email,
        });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
