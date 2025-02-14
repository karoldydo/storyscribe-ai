import path from 'path';

import { getListFiles } from '../services';
import { __dirname, logInfo } from '../utils';

async function listFiles(): Promise<string[]> {
  const directoryPath = path.join(__dirname, '..', 'docker', 'videos');

  logInfo(`Starting search for video files in the "${directoryPath}" directory`);

  const files = await getListFiles(directoryPath);

  logInfo(`Found files: ${files.length}`);

  if (!files.length) {
    throw new Error('No files in the videos directory found');
  }

  return files;
}

export { listFiles };
