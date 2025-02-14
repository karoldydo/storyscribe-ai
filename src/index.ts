import { generateMarkdown, generatePdf, generateSummaries, listFiles, listTranscriptions } from './controllers';
import { logSuccess, toSeconds } from './utils';

async function main() {
  const processStart = Date.now();

  // 1. Get all video files from docker/videos directory
  const files = await listFiles();

  // 2. Invoking transcribe for all files
  const transcriptions = await listTranscriptions(files);

  // 3. Invoking summarize for all transcriptions
  const summaries = await generateSummaries(transcriptions);

  // 4. Invoking markdown for the summary
  const markdown = await generateMarkdown(summaries);

  // 5. Generate PDF
  await generatePdf(markdown);

  logSuccess(`Entire process completed in ${toSeconds(Date.now() - processStart)}`);
}

main();
