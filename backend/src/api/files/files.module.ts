import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from 'src/prisma.service';
import { FoldersService } from '../folders/folder.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, PrismaService, FoldersService],
})
export class FilesModule {}
