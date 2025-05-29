import axios from 'axios';

import { OLLAMA_SERVICE_API_URL, PDF_SERVICE_API_URL, WHISPER_SERVICE_API_URL } from '../env';

const ollamaService = axios.create({
  baseURL: OLLAMA_SERVICE_API_URL,
});

const whisperService = axios.create({
  baseURL: WHISPER_SERVICE_API_URL,
});

const pdfService = axios.create({
  baseURL: PDF_SERVICE_API_URL,
});

export { ollamaService, pdfService, whisperService };
