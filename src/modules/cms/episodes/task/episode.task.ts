import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EpisodesService } from '../episodes.service';

@Injectable()
export class EpisodeTask {
  private readonly logger = new Logger(EpisodeTask.name);

  constructor(private readonly episodesService: EpisodesService) {}

  /**
   * Scheduled task that runs every day at 5 PM to validate the search vector
   * for episodes. Logs the start and completion of the task, and handles errors.
   */
  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async validateSearchVector() {
    this.logger.verbose(
      'Running daily search vector validation task for episodes...',
    );
    try {
      await this.episodesService.validateSearchVector();
      this.logger.verbose(`Search vector validation completed`);
    } catch (error) {
      this.logger.error('Error during search vector validation', error);
    }
  }
}
