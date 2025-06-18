import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramCategory } from './entities/program-category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ProgramsTask } from './task/programs.task';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program, ProgramCategory]),
    CategoriesModule,
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsTask],
  exports: [ProgramsService],
})
export class ProgramsModule {}
