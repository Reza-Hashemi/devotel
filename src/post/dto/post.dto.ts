import { IsOptional, IsString } from "class-validator";


export class FindPostDto {
    @IsString()
    @IsOptional()
    pageSize: string
    @IsString()
    @IsOptional()
    pageNumber: string
}

export class CreatePostDto {
    @IsString()
    title: string
    @IsString()
    content: string
}