import axios from 'axios';

import { OLLAMA_SERVICE_API_URL, PDF_SERVICE_API_URL, WHISPER_SERVICE_API_URL } from '../env';

const ollamaExternalService = axios.create({
  baseURL: OLLAMA_SERVICE_API_URL,
});

const whisperExternalService = axios.create({
  baseURL: WHISPER_SERVICE_API_URL,
});

const pdfExternalService = axios.create({
  baseURL: PDF_SERVICE_API_URL,
});

export { ollamaExternalService, pdfExternalService, whisperExternalService };
