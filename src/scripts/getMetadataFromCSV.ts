import { readFileSync, readdirSync, writeFileSync } from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import Papa from 'papaparse';

type CSVRow = {
  link: string | null;
};

export default async function getMetadataFromCSV() {
  const csvFiles = readdirSync('csvInput');

  if (csvFiles.length === 0) {
    console.log('No CSV files found');
    return;
  }

  if (csvFiles.length > 1) {
    console.log('Multiple CSV files found, please only insert one at a time');
    return;
  }

  const csvFilePath = `csvInput/${csvFiles[0]}`;
  const csvString = readFileSync(csvFilePath, 'utf8');

  const csv = Papa.parse<CSVRow>(csvString, {
    header: true,
  });

  // check if the csv has a link header
  if (!csv.meta.fields?.includes('link')) {
    console.log('CSV file must have a "link" column');
    return;
  }

  const rows = csv.data;

  const results: unknown[] = [];

  for (const row of rows) {
    const link = row.link;

    if (!link || link === 'NULL') {
      console.log('Link is empty or null, skipping...');
      continue;
    }

    console.log('processing link:', link);

    const duration: number | undefined = await new Promise(
      (resolve, reject) => {
        ffmpeg.ffprobe(link, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            resolve(metadata.format.duration);
          }
        });
      }
    );
    const durationMs = duration ? Math.round(duration * 1000) : undefined;

    results.push({
      ...row,
      link,
      duration,
      durationMs,
    });
  }

  const outputCsv = Papa.unparse(results);

  writeFileSync('output/CSVOutput.csv', outputCsv);
  writeFileSync('output/CSVOutput.json', JSON.stringify(results, null, 2));

  console.log('Finished processing CSV');
}
