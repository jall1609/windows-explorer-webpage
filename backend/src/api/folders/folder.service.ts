import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFolderDTO, UpdateFolderDto, WhereAndInclude } from './dto/folder.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { isNotDeleted } from 'src/utlis/function';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService ) {}

  public relation = {
    childrens : {
      where : isNotDeleted
    }, files: {
      where : isNotDeleted
    }
  }

  async create(data: CreateFolderDTO) {
    return await  this.prisma.folders.create({data});
  }

  async findAll( {where, include} : WhereAndInclude ) {
    return await this.prisma.folders.findMany({where : {...where, ...isNotDeleted}, include : include ?? this.relation, distinct: ['id']});
  }

  async findOne( {where, include} : WhereAndInclude) {
    return await this.prisma.folders.findFirst({where : {...where, ...isNotDeleted}, include : include ?? this.relation});
  }

  async update(where : Prisma.FoldersWhereUniqueInput, data: UpdateFolderDto) {
    return await this.prisma.folders.update({where : {...where, ...isNotDeleted}, data});
  }

  async remove(where : Prisma.FoldersWhereUniqueInput) {
    return await this.prisma.folders.update({
      where : {...where, ...isNotDeleted}, data: {deletedAt : new Date()}
    });
  }

  async validasiPemilik(user : User, where : Prisma.FoldersWhereInput)   {
    const existing = await this.findOne({ where : {...where, ...isNotDeleted}  });
    if ( !existing || (existing?.user_id != null &&  existing?.user_id != user.id) ) throw new UnauthorizedException('You are not authorized to access this resource')
    return true
  }
}
