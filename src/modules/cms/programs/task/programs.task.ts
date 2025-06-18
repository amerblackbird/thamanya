import { Injectable, Logger } from '@nestjs/common';
import { ProgramsService } from '../programs.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProgramsTask {
  private readonly logger = new Logger(ProgramsTask.name);

  constructor(private readonly programsService: ProgramsService) {}

  /**
   * Runs a scheduled task every day at 5 PM to validate the search vector for programs.
   * Logs the start and completion of the validation process.
   * If an error occurs during validation, logs the error.
   */
  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async validateSearchVector() {
    this.logger.verbose(
      'Running daily search vector validation task for programs...',
    );
    try {
      await this.programsService.validateSearchVector();
      this.logger.verbose(`Search vector validation completed`);
    } catch (error) {
      this.logger.error('Error during search vector validation', error);
    }
  }
}
