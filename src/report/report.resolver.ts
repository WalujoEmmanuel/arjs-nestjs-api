import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Resolver(() => ReportDto)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => String)
  testQuery(): string {
    return 'Arjs NestJs Server Mode!';
  }

  @Mutation(() => ReportDto)
  async generateReport() {
    return this.reportService.generateReport();
  }
}
