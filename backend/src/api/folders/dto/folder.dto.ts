import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFolderDTO {
    @IsString()
    @IsNotEmpty({message : 'name Required Data'})
    @ApiProperty({example : "Tugas Kuliah"})
    name : string;

    @IsNumber()
    @IsNotEmpty({message : 'parent_folder_id Required Data'})
    @ApiProperty({example : 2})
    parent_folder_id : number;

    @IsNumber()
    @IsOptional()
    user_id? : number;
}

export class UpdateFolderDto {
    @IsString()
    @IsNotEmpty({message : 'name Required Data'})
    @ApiProperty({example : "Tugas Kuliah"})
    name : string;
}

export class FilterGetFolderDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({example : "Folder Kuliah"})
    name? : string;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @ApiProperty({example : 2})
    parent_folder_id? : number;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @ApiProperty({example : 2})
    user_id? : number;
}

export class Folder {
    id: number;
    parent_folder_id: number | null;
    name: string;
    user_id: number | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date | null;
    childrens? : Folder[];
    path? : {id : number, name : string}[]
}

export class WhereAndInclude {
    where? : Prisma.FoldersWhereInput;
    include? : Prisma.FoldersInclude
}