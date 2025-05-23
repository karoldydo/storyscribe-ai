import { PdfRequest, TranscriptionRequest } from './model';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OLLAMA_MARKDOWN_MODEL: string;
      OLLAMA_SUMMARY_MODEL: string;
      PDF_ENGINE: PdfRequest['engine'];
      WHISPER_LANGUAGE: string;
      WHISPER_MODEL: TranscriptionRequest['model'];
    }
  }
}

export {};
