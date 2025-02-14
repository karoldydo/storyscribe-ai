import { minify } from 'csso';
import fs from 'fs';
import path from 'path';

import { PDF_ENGINE } from '../config';
import { PdfRequest, PdfResponse } from '../model';
import { __dirname, axios, AxiosError, AxiosResponse, logSuccess } from '../utils';

/**
 * Converts markdown to pdf
 *
 * @param markdown formatted markdown string
 */
async function convertMarkdownToPdf(markdown: string): Promise<void> {
  const cssPath = path.join(__dirname, '..', 'docker', 'css', 'style.css');

  const css = fs.existsSync(cssPath) ? minify(fs.readFileSync(cssPath, 'utf-8')).css : '';

  try {
    const {
      data: { pdf_path },
    } = await axios.post<PdfResponse, AxiosResponse<PdfResponse>, PdfRequest>('/pdf', {
      css,
      engine: PDF_ENGINE,
      markdown,
    });

    logSuccess(`PDF file: ${path.join(__dirname, '..', 'docker', pdf_path)}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error('PDF generation failed', { cause: error.toJSON() });
    }
    throw new Error('PDF generation failed', { cause: error });
  }
}

export { convertMarkdownToPdf };
