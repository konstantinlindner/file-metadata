import { readFileSync, readdirSync, writeFileSync } from 'fs';
import crypto from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import { fileTypeFromBuffer } from 'file-type';

export default async function getMetadataFromFiles() {
  const files = readdirSync('input');
  const results = [];

  for (const file of files) {
    const filePath = `input/${file}`;
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
      durationMs,
      size,
    });
  }

  console.log('Finished processing files');
  writeFileSync('output/output.json', JSON.stringify(results, null, 2));
}
