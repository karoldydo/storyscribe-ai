import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const extensions = ['.avi', '.flv', '.mkv', '.mov', '.mp4', '.webm'];

/**
 * Get list of video files in the directory and its subdirectories
 *
 * @param directoryPath relative path to the directory to search for files
 * @returns list of files in the directory and its subdirectories
 */
async function getListFiles(directoryPath: string): Promise<string[]> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      // recursively go into subfolders
      const subFiles = await getListFiles(fullPath);
      files.push(...subFiles);
    } else {
      // check file extension
      if (extensions.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }

  return files.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
}

export { getListFiles };
