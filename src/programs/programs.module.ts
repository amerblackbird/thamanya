import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramCategory } from './entities/program-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, ProgramCategory])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
