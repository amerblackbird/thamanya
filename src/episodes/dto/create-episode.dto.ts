import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EpisodeStatus } from '../types';

export class CreateEpisodeDto {
  @ApiProperty({
    description: 'UUID v4 of the program this episode belongs to',
    format: 'uuid',
    example: 'b3b6c8e2-1d2a-4e5b-9c3d-2f1a4b5c6d7e',
  })
  @IsUUID('4')
  programId: string;

  @ApiProperty({
    description: 'Title of the episode',
    example: 'The Future of AI',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the episode',
    example: 'A discussion about the future of artificial intelligence.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Duration of the episode in seconds (max 86400)',
    example: 3600,
    minimum: 1,
    maximum: 86400,
  })
  @IsInt({ message: 'Invalid duration, must be an integer, in seconds.' })
  @IsNotEmpty()
  @IsPositive({ message: 'Invalid duration, must be an integer, in seconds.' })
  @Max(86400, { message: 'Duration cannot exceed 24 hours (86400 seconds).' })
  duration: number;

  @ApiPropertyOptional({
    description: 'Publish date in ISO 8601 format',
    example: '2024-06-01T12:00:00Z',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  publishDate?: string;

  @ApiPropertyOptional({
    description: 'URL to the audio file',
    example: 'https://example.com/audio.mp3',
  })
  @IsOptional()
  @IsUrl()
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to the episode image',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to the video file',
    example: 'https://example.com/video.mp4',
  })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to the transcript file',
    example: 'https://example.com/transcript.pdf',
  })
  @IsOptional()
  @IsUrl()
  transcriptUrl?: string;

  @ApiPropertyOptional({
    description: 'External URL related to the episode',
    example: 'https://external.com/resource',
  })
  @IsOptional()
  @IsUrl()
  externalUrl?: string;

  @ApiPropertyOptional({
    description: 'Status of the episode',
    enum: EpisodeStatus,
    example: EpisodeStatus.PUBLISHED,
  })
  @IsEnum(EpisodeStatus)
  @IsOptional()
  status?: EpisodeStatus;
}
