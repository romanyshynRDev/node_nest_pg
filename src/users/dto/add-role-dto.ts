import { IsNumber, IsString } from "class-validator";

//Validation Object 
export class AddRoleDto {
    @IsString({ message: "Must be a string" })
    readonly role: string;
    @IsNumber({}, { message: "Must be a number" })
    readonly userId: number;
}