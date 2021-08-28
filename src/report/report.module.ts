import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { ReportGenerator } from './report-generator.service';

@Module({
  providers: [ReportResolver, ReportService, ReportGenerator],
})
export class ReportModule {}
