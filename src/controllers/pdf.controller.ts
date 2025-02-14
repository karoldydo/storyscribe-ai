import { convertMarkdownToPdf } from '../services';
import { logError, logInfo, logSuccess, toSeconds } from '../utils';

async function generatePdf(markdown: string): Promise<void> {
  const pdfStart = Date.now();

  logInfo('Generating PDF file from markdown');

  try {
    await convertMarkdownToPdf(markdown);
    logSuccess(`PDF generated in ${toSeconds(Date.now() - pdfStart)}`);
  } catch (error) {
    logError('An error occurred while converting markdown to pdf');
    throw error;
  }
}

export { generatePdf };
