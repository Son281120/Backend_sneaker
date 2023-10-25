import { Controller, Get, Post, Body, Put, Param, UseGuards, Delete, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './create-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {

    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Param('page') page: number, @Param('size') size: number) : Promise<UserDto[]> {
        return this.userService.findAll(page, size);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) : Promise<UserDto> {
        return this.userService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.createUser(user);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateUser(@Param('id') id: string,@Body() user: UserDto) : Promise<UpdateResult> {
        return this.userService.updateUser(id, user);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id:string) : Promise<DeleteResult> {
        return this.userService.deleteUser(id)
    }

    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}
