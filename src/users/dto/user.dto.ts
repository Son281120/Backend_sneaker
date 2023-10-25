import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Transform } from 'class-transformer'

export class UserDto {
    @Expose()
    @IsNotEmpty()
    user_id: number;

    @Expose()
    @IsNotEmpty()
    user_name: string;

    @Expose()
    avatar: string;

    @Expose()
    phone_number: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    address: string;

    @Expose()
    old: number;

    @IsNotEmpty()
    @Length(6, 20)
    @Transform(({ value }) => value.trim())
    password: string;
}
