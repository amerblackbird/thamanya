import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ProgramsModule } from './programs/programs.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [SharedModule, ProgramsModule, EpisodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
