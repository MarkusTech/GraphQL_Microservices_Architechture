import { Module } from '@nestjs/common';
import { DayCheckService } from './day-check/day-check.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DayCheckService],
})
export class AppModule {}
