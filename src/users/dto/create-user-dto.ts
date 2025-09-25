import { ApiProperty } from "@nestjs/swagger"

//Validation Object 
export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
    readonly email: string

    @ApiProperty({ example: 'ojcids89H', description: 'User password' })
    readonly password: string
}