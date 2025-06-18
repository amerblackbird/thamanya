import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { BrowserModule } from './browser/browser.module';

@Module({
  imports: [SearchModule, BrowserModule],
})
export class DiscoveryModule {}
