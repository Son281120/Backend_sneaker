import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user_register.dto';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { UserLoginDto } from './dto/user_login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userRegisterDto: UserRegisterDto): Promise<UserRegisterDto> {
    return this.authService.register(userRegisterDto);
  }

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userLoginDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() {refresh_token}):Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }
}
