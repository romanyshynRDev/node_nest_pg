import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, IsEmail } from "class-validator"

//Validation Object 
export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
    @IsString({ message: 'Must be a string' })
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string


    @ApiProperty({ example: 'ojcids89H', description: 'User password' })
    @IsString({ message: 'Must be a string' })
    @Length(5, 16, { message: 'Password should be between 5 and 16 characters' })
    readonly password: string
}