import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class ReportGenerator {
  constructor() {}

  async generate(ReportName: string, ReportUrl: string, data: any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:8007/index.html`);

    const GC = await page.evaluate('GC');
    const reportFile = `${__dirname}/../../reports/${ReportName}.pdf`;

    const pdfString: any = await page.evaluate(
      ({ reportUrl, reportData }) => {
        return new Promise(async (resolve, reject) => {
          try {
            await GC.ActiveReports.Core.FontStore.registerFonts(
              'fontsConfig.json',
            );
            const report = new GC.ActiveReports.Core.PageReport();
            await report.load(reportUrl);
            // stringfy the json data and add it to the report datasource
						// report._instance.definition.DataSources[0].ConnectionProperties.ConnectString = `jsondata=${JSON.stringify(reportData)}`;
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
    await browser.close();
    return reportFile;
  }
}
