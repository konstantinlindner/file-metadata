import { readdirSync } from 'fs';
import ffmpeg from 'fluent-ffmpeg';

export default async function compressVideos() {
  console.log('Started compressing videos...');

  const files = readdirSync('fileInput');

  for (const file of files) {
    if (file === '.DS_Store') {
      continue;
    }

    const filePath = `fileInput/${file}`;

    await new Promise<void>((resolve, reject) => {
      ffmpeg(filePath)
        .size('720x1280')
        // .fps(29.97)
        .addOptions(['-crf 30', '-preset veryslow'])
        .on('end', () => {
          console.log('Finished compressing video:', file);
          resolve();
        })
        .on('error', (err) => {
          console.log('An error occured while compressing video:', file);
          console.log(err);
          reject(err);
        })
        .save(`output/compressed-${file}`);
    });
  }

  console.log('Finished compressing all videos');
}
