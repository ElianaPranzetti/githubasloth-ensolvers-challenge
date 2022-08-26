import { IsNotEmpty, IsString } from "class-validator";

export class CreateTag {
    @IsString()
    @IsNotEmpty()
    name: string
}