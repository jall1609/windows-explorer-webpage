import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFileDto, UpdateFileDto, WhereAndInclude } from './dto/file.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { isNotDeleted } from 'src/utlis/function';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService ) {}

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
    return await this.prisma.files.findMany({where, include : include ?? this.relation});
  }

  async findOne( {where, include} : WhereAndInclude) {
    return await this.prisma.files.findFirst({where, include : include ?? this.relation});
  }

  async update(where : Prisma.FilesWhereUniqueInput, data: UpdateFileDto) {
    return await this.prisma.files.update({where, data});
  }

  async remove(where : Prisma.FilesWhereUniqueInput) {
    return await this.prisma.files.update({
      where, data: {deletedAt : new Date()}
    });
  }

  async validasiPemilik(user : User, where : Prisma.FilesWhereInput)  {
    const existing = await this.findOne({ where  });
    if ( !existing || (existing?.user_id != null &&  existing?.user_id != user.id) ) throw new UnauthorizedException('You are not authorized to access this resource')
    return true
  }
}
