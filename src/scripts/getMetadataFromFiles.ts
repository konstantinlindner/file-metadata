import { readFileSync, readdirSync, writeFileSync } from 'fs';
import crypto from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import { fileTypeFromBuffer } from 'file-type';
import Papa from 'papaparse';

export default async function getMetadataFromFiles() {
  const files = readdirSync('fileInput');
  const results = [];

  for (const file of files) {
    const filePath = `fileInput/${file}`;
    const fileBuffer = readFileSync(filePath);

    const fileType = await fileTypeFromBuffer(fileBuffer);
    const extension = fileType?.ext;
    const mime = fileType?.mime;

    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const duration: number | undefined = await new Promise(
      (resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            resolve(metadata.format.duration);
          }
        });
      }
    );
    const durationMs = duration ? Math.round(duration * 1000) : undefined;

    const size = fileBuffer.byteLength;

    results.push({
      file,
      extension,
      mime,
      hash,
      duration,
      durationMs,
      size,
    });
  }

  const csv = Papa.unparse(results);

  writeFileSync('output/fileOutput.csv', csv);
  writeFileSync('output/fileOutput.json', JSON.stringify(results, null, 2));

  console.log('Finished processing files');
}
