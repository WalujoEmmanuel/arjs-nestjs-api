import { Injectable } from '@nestjs/common';
import type { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
import * as fs from 'fs';

@Injectable()
export class ReportGenerator {
  constructor(
    @InjectContext() private readonly browserContext: BrowserContext,
  ) {}

  async generate(ReportName: string, ReportUrl: string, data: any) {
    const page = await this.browserContext.newPage();
    await page.goto(`http://localhost:8007/index.html`);

    const GC = await page.evaluate('GC');
    const reportFile = `${__dirname}/${ReportName}.pdf`;

    const pdfString: any = await page.evaluate(
      ({ reportUrl, reportData }) => {
        return new Promise(async (resolve, reject) => {
          try {
            await GC.ActiveReports.Core.FontStore.registerFonts(
              'fontsConfig.json',
            );
            const report = new GC.ActiveReports.Core.PageReport();
            await report.load(reportUrl);
            const doc = await report.run();
            const result = await GC.ActiveReports.PdfExport.exportDocument(
              doc,
              {
                info: { author: 'PBS' },
              },
            );
            const reader = new FileReader();
            reader.readAsBinaryString(result.data);
            reader.onload = () => resolve(reader.result);
            reader.onerror = () =>
              reject('Error occurred while reading binary string');
          } catch (error) {
            reject(error);
          }
        });
      },
      { reportUrl: ReportUrl, reportData: data },
    );

    const pdfData = Buffer.from(pdfString, 'binary');
    fs.writeFileSync(reportFile, pdfData);

    return reportFile;
  }
}
