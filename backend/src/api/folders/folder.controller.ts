import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CreateFolderDTO, FilterGetFolderDTO, UpdateFolderDto } from './dto/folder.dto';
import { FoldersService } from './folder.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { findFolderPathById, findFoldersByParentId, isNotDeleted, organizeFolders } from 'src/utlis/function';

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

  @Get('full-folder')
  async getFull(@Request() req) {
    const get_data =  await this.foldersService.findAll({
      where : {
        OR :[
          {user_id : +req.user.id},
          {user_id : null},
        ], ...isNotDeleted
      }, include : {} });

      return organizeFolders(get_data);
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
      }, 
      include : {
        childrens : {
          where : {
            ...isNotDeleted, user_id : req.user.id
          }
        }, files: {
          where : {
            ...isNotDeleted, user_id : req.user.id
          }
        }
      }
    });
  }

  @Get('search-with-children')
  async searchWithChildren(@Request() req, @Query() query?: FilterGetFolderDTO) {
    const get_full_folder = (await this.getFull(req))
    // const ww = get_full_folder.map(folder => {
    //   folder.path = findFolderPathById(get_full_folder[0], folder.id).map(e => {
    //     return {
    //       id : e.id,
    //       name : e.name
    //     }
    //   })
    //   return folder
    // });
    // return get_full_folder[0]
    // return ww[0]
    return findFoldersByParentId( get_full_folder, +query.parent_folder_id, query.name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    await this.foldersService.validasiPemilik(req.user, {id : +id});
    return await this.foldersService.findOne({
      where : {
        id : +id, ...isNotDeleted
      },
      include : {
        childrens : {
          where : {
            ...isNotDeleted, user_id : req.user.id
          }
        }, files: {
          where : {
            ...isNotDeleted, user_id : req.user.id
          }
        }
      }
    });
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

  filterWhereStatus(query : FilterGetFolderDTO, exclude : string[] = []) {
    let where : Prisma.FoldersWhereInput = {};
    if(query.user_id && exclude.includes('user_id') == false) {
      where  = {
        ...where, user_id : +query.user_id,
      }
    }
    if(query.parent_folder_id && exclude.includes('parent_folder_id') == false) {
      where  = {
        ...where, parent_folder_id : +query.parent_folder_id,
      }
    }
    if(query.name && exclude.includes('name') == false) {
      where  = {
        ...where, name : {
          contains : query.name,
        },
      }
    }
    return where;
  }
}
