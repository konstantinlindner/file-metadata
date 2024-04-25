import { readFileSync, readdirSync, writeFileSync } from 'fs';
import crypto from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import { fileTypeFromBuffer } from 'file-type';

async function getVideoInfo() {
  const files = readdirSync('input');
  const results = [];

  for (const file of files) {
    const filePath = `input/${file}`;
    const fileBuffer = readFileSync(filePath);

    const fileType = await fileTypeFromBuffer(fileBuffer);
    const extension = fileType?.ext;
    const mime = fileType?.mime;

    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const duration = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          resolve(metadata.format.duration);
        }
      });
    });

    const size = fileBuffer.byteLength;

    results.push({
      file,
      extension,
      mime,
      hash,
      duration,
      size,
    });
  }

  console.log('Finished processing files');
  writeFileSync('output/output.json', JSON.stringify(results, null, 2));
}

getVideoInfo();
