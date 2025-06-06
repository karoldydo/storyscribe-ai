import { PdfServiceRequest, TranscriptionServiceRequest } from '@storyscribe-ai/model/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OLLAMA_MARKDOWN_MODEL: string;
      OLLAMA_SUMMARY_MODEL: string;
      PDF_ENGINE: PdfServiceRequest['engine'];
      WHISPER_LANGUAGE: string;
      WHISPER_MODEL: TranscriptionServiceRequest['model'];
    }
  }
}

export {};
