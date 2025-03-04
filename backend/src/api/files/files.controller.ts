import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto, FilterGetItemDTO, UpdateFileDto } from './dto/file.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { isNotDeleted } from 'src/utlis/function';
import { Prisma } from '@prisma/client';

@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async create(@Request() req, @Body() createFileDto: CreateFileDto) {
    if(!createFileDto.user_id) createFileDto.user_id = req.user.id;
    return await this.filesService.create(createFileDto);
  }

  @Get()
  async findAll(@Request() req, @Query() query?: FilterGetItemDTO) {
    if(!query.user_id) query.user_id = req.user.id;
    if(query.user_id) {
      await this.filesService.validasiPemilik(req.user, {user_id : +query.user_id});
    }
    const where = this.filterWhereStatus(query)
    return await this.filesService.findAll({
      where : {
        ...where, ...isNotDeleted
      } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    await this.filesService.validasiPemilik(req.user, {id : +id});
    return await this.filesService.findOne({
      where : {
        id : +id, ...isNotDeleted
      }});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateFileDto,  @Request() req) {
    await this.filesService.validasiPemilik(req.user, {id : +id});
    return await this.filesService.update({id : +id, ...isNotDeleted}, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,  @Request() req) {
    await this.filesService.validasiPemilik(req.user, {id : +id});
    return await this.filesService.remove({id : +id, ...isNotDeleted});
  }

  filterWhereStatus(query : FilterGetItemDTO) {
      let where : Prisma.FilesWhereInput = {};
      if(query.user_id) {
        where  = {
          ...where, user_id : +query.user_id,
        }
      }
      if(query.folder_id) {
        where  = {
          ...where, folder_id : +query.folder_id,
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
