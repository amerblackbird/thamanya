import { PartialType } from '@nestjs/swagger';
import { CreateBrowserDto } from './create-browser.dto';

export class UpdateBrowserDto extends PartialType(CreateBrowserDto) {}
