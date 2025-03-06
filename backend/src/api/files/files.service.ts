import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFileDto, UpdateFileDto, WhereAndInclude } from './dto/file.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { getAllChildrenByParentId, isNotDeleted } from 'src/utlis/function';
import { FoldersService } from '../folders/folder.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService, private folderService : FoldersService ) {}

  public relation = {
    user : true,
    folder: {
      where : isNotDeleted
    }
  }


  async create(data: CreateFileDto) {
    return await  this.prisma.files.create({data});
  }

  async findAll( {where, include} : WhereAndInclude ) {
    return await this.prisma.files.findMany({where : {...where, ...isNotDeleted}, include : include ?? this.relation});
  }
  
  async searchWithChildren( {where, include} : WhereAndInclude ) {
    const get_data =  await this.folderService.findAll({
      where : {
        OR :[
          {user_id : +where.user_id},
          {user_id : null},
        ], ...isNotDeleted
      }, include : {} });
      
    const search_in_folder_id =  getAllChildrenByParentId(get_data , +where.folder_id).map(e => e.id)

    return await this.findAll({
      where : {
        folder_id : {in : search_in_folder_id},
        name : where.name
      }
    })
  }

  async findOne( {where, include} : WhereAndInclude) {
    return await this.prisma.files.findFirst({where : {...where, ...isNotDeleted}, include : include ?? this.relation});
  }

  async update(where : Prisma.FilesWhereUniqueInput, data: UpdateFileDto) {
    return await this.prisma.files.update({where : {...where, ...isNotDeleted}, data});
  }

  async remove(where : Prisma.FilesWhereUniqueInput) {
    return await this.prisma.files.update({
      where : {...where, ...isNotDeleted}, data: {deletedAt : new Date()}
    });
  }

  async validasiPemilik(user : User, where : Prisma.FilesWhereInput)  {
    const existing = await this.findOne({ where : {...where, ...isNotDeleted}  });
    if ( !existing || (existing?.user_id != null &&  existing?.user_id != user.id) ) throw new UnauthorizedException('You are not authorized to access this resource')
    return true
  }
}
