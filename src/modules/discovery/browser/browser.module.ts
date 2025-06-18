import { Module } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { BrowserController } from './browser.controller';
import { CmsModule } from '../../cms/cms.module';

@Module({
  controllers: [BrowserController],
  providers: [BrowserService],
  imports: [CmsModule],
})
export class BrowserModule {}
