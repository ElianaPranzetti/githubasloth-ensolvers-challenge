import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateNote {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    content?: string

    @IsString()
    @IsOptional()
    state?: string

    @IsOptional()
    @IsArray()
    categories?: number[]
}