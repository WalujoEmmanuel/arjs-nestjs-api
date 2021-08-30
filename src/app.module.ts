import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PuppeteerModule } from 'nest-puppeteer';
import { join } from 'path';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ReportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
      playground: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'resources'),
    }),
    PuppeteerModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
