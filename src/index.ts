import { checkbox } from '@inquirer/prompts';
import getMetadataFromFiles from './scripts/getMetadataFromFiles.js';
import getMetadataFromCSV from './scripts/getMetadataFromCSV.js';

const questions = {
  scripts: {
    message: 'Select which scripts to run',
    required: true,
    choices: [
      { name: 'Get metadata from video files', value: 'getMetadataFromFiles' },
      { name: 'Get metadata from CSV', value: 'getMetadataFromCSV' },
    ],
  },
};

async function main() {
  const selectedScripts = await checkbox(questions.scripts);

  if (selectedScripts.includes('getMetadataFromFiles')) {
    await getMetadataFromFiles();
  }

  if (selectedScripts.includes('getMetadataFromCSV')) {
    await getMetadataFromCSV();
  }
}

main();
