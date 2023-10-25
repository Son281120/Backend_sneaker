import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserLoginDto {

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 20)
    @Transform(({ value }) => value.trim())
    password: string;
}