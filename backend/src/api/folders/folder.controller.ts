import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CreateFolderDTO, FilterGetFolderDTO, UpdateFolderDto } from './dto/folder.dto';
import { FoldersService } from './folder.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { isNotDeleted } from 'src/utlis/function';

@Controller('folders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async create(@Request() req, @Body() CreateFolderDTO: CreateFolderDTO) {
    if(!CreateFolderDTO.user_id) CreateFolderDTO.user_id = req.user.id;
    return await this.foldersService.create(CreateFolderDTO);
  }

  @Get()
  async findAll(@Request() req, @Query() query?: FilterGetFolderDTO) {
    if(!query.user_id) query.user_id = req.user.id;
    if(query.user_id) {
      await this.foldersService.validasiPemilik(req.user, {user_id : +query.user_id});
    }
    const where = this.filterWhereStatus(query)
    return await this.foldersService.findAll({
      where : {
        ...where, ...isNotDeleted
      } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    await this.foldersService.validasiPemilik(req.user, {id : +id});
    return await this.foldersService.findOne({
      where : {
        id : +id, ...isNotDeleted
      }});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateFolderDto,  @Request() req) {
    await this.foldersService.validasiPemilik(req.user, {id : +id});
    return await this.foldersService.update({id : +id, ...isNotDeleted}, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,  @Request() req) {
    await this.foldersService.validasiPemilik(req.user, {id : +id});
    return await this.foldersService.remove({id : +id, ...isNotDeleted});
  }

  filterWhereStatus(query : FilterGetFolderDTO) {
    let where : Prisma.FoldersWhereInput = {};
    if(query.user_id) {
      where  = {
        ...where, user_id : +query.user_id,
      }
    }
    if(query.parent_folder_id) {
      where  = {
        ...where, parent_folder_id : +query.parent_folder_id,
      }
    }
    if(query.name) {
      where  = {
        ...where, name : {
          contains : query.name,
        },
      }
    }
    return where;
  }
}
