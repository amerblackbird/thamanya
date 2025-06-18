import { BaseSerializer } from '../../../../core/serializers';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EpisodeStatus } from '../types';

export class EpisodeSerializer extends BaseSerializer {
  @ApiProperty({
    description: 'UUID v4 of the program this episode belongs to',
    format: 'uuid',
    example: 'b3b6c8e2-1d2a-4e5b-9c3d-2f1a4b5c6d7e',
  })
  programId: string;

  @ApiProperty({
    description: 'Title of the episode',
    example: 'The Future of AI',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the episode',
    example: 'A discussion about the future of artificial intelligence.',
  })
  description?: string;

  @ApiProperty({
    description: 'Duration of the episode in seconds (max 86400)',
    example: 3600,
    minimum: 1,
    maximum: 86400,
  })
  duration: number;

  @ApiPropertyOptional({
    description: 'Publish date in ISO 8601 format',
    example: '2024-06-01T12:00:00Z',
    type: String,
    format: 'date-time',
  })
  publishDate?: string;

  @ApiPropertyOptional({
    description: 'URL to the audio file',
    example: 'https://example.com/audio.mp3',
  })
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to the episode image',
    example: 'https://example.com/image.jpg',
  })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to the video file',
    example: 'https://example.com/video.mp4',
  })
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to the transcript file',
    example: 'https://example.com/transcript.pdf',
  })
  transcriptUrl?: string;

  @ApiPropertyOptional({
    description: 'External URL related to the episode',
    example: 'https://external.com/resource',
  })
  externalUrl?: string;

  @ApiPropertyOptional({
    description: 'Status of the episode',
    enum: EpisodeStatus,
    example: EpisodeStatus.PUBLISHED,
  })
  status?: EpisodeStatus;
}
