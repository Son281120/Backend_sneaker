import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserRegisterDto {
    @Expose()
    @IsNotEmpty()
    user_name: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 20)
    @Transform(({ value }) => value.trim())
    password: string;
}