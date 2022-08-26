import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator"

export class UpdateNote {
    @IsString()
    @IsOptional()
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