import { IsNotEmpty, IsString } from "class-validator";

export class AuthType {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}