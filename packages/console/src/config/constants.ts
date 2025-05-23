// whisper
const WHISPER_MODEL = process.env['WHISPER_MODEL'] || ('small.en' as const);
const WHISPER_LANGUAGE = process.env['WHISPER_LANGUAGE'] || 'en';

// ollama
const OLLAMA_SUMMARY_MODEL = process.env['OLLAMA_SUMMARY_MODEL'] || 'llama:latest';
const OLLAMA_MARKDOWN_MODEL = process.env['OLLAMA_MARKDOWN_MODEL'] || 'mistral:latest';

// pdf
const PDF_ENGINE = process.env['PDF_ENGINE'] || ('wkhtmltopdf' as const);

export { OLLAMA_MARKDOWN_MODEL, OLLAMA_SUMMARY_MODEL, PDF_ENGINE, WHISPER_LANGUAGE, WHISPER_MODEL };
