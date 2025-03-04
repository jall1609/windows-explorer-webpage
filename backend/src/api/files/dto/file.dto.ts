import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    @IsNotEmpty({message : 'name Required Data'})
    @ApiProperty({example : "Catatan Kuliah"})
    name : string;

    @IsString()
    @IsNotEmpty({message : 'content Required Data'})
    @ApiProperty({example : "Lorem Ipsum Dolor Sit Amet"})
    content : string;

    @IsNumber()
    @IsNotEmpty({message : 'folder_id Required Data'})
    @ApiProperty({example : 2})
    folder_id : number;

    @IsNumber()
    @IsOptional()
    user_id? : number;

}


export class UpdateFileDto {
    @IsString()
    @IsOptional({message : 'name Required Data'})
    @ApiProperty({example : "Tugas Kuliah"})
    name : string;

    @IsString()
    @IsOptional({message : 'content Required Data'})
    @ApiProperty({example : "Lorem Ipsum Dolor Sit Amet Amet"})
    content : string;
}

export class FilterGetItemDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({example : "Catatan Kuliah"})
    name? : string;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @ApiProperty({example : 2})
    folder_id? : number;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @ApiProperty({example : 2})
    user_id? : number;
}

export class WhereAndInclude {
    where? : Prisma.FilesWhereInput;
    include? : Prisma.FilesInclude
}