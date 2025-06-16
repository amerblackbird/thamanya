import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum ProgramType {
  PODCAST = 'podcast',
  DOCUMENTARY = 'documentary',
}

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProgramType)
  type: ProgramType;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsDateString()
  @IsOptional()
  publish_date?: string;
}