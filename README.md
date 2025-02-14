# **storyscribe-ai** _(Quick PDF Access for Course Material)_

## Introduction

This repository contains a proof-of-concept (PoC) project that was born out of a need for a faster way to review course materials. While taking a video course, I wanted to quickly refresh or reproduce the content without having to relaunch the entire course in a web browser. Instead, I envisioned a streamlined solution to easily open and view PDFs - such as on an e-reader.

This project is currently under active development and represents the first basic concept of what will evolve into a more robust solution. Feedback, and suggestions are welcome as the project matures.\
Feel free to explore and experiment!

## Process Overview

1. After startup, the application searches for video files within the [videos](./docker/videos/) directory and its subdirectories.
2. The application then transcribes the audio from each video file.
3. Each transcript is sent to the ollama service, which generates a summary.
4. The summary is converted into a markdown document.
5. Finally, the markdown document is transformed into a pdf and saved in the [pdf](./docker/pdf/) directory.

## Project Structure

- [/docker/build](./docker/build/): contains the Dockerfile
- [/docker/css](./docker/css/): CSS file for the pdf (edit `style.css` to customize the pdf output)
- [/docker/model](./docker/model/): model files for ollama (for more details, check the [ollama documentation](https://github.com/ollama/ollama/blob/main/docs/modelfile.md))

  > **Note:** Not all models support Modelfile creation. Please refer to the ollama documentation for the list of currently supported model architectures and further details.

- [/docker/pdf](./docker/pdf/): generated pdf files
- [/docker/prompts](./docker/prompts/): prompts for ollama (edit `summary.txt` or `markdown.txt` to customize the output)
- [/docker/server](./docker/server/): server code for whisper, ollama, and the pdf generator
- [/docker/videos](./docker/videos/): video files to be processed

Rest of the files are for the Node.js application that orchestrates the process.

## Requirements

1. Docker
2. Node.js

## Installation

1. Clone the repository
2. Navigate to the root of the project and install the required dependencies

   ```shell
   npm install
   ```

## Docker Configuration

### Using only CPU

1. Navigate to [docker](./docker/) folder, and run the following command to pull and start the services

   ```shell
   docker compose --file docker-compose.cpu.yml up -d
   ```

2. Install models for ollama by running the following commands

   - For `llama3:8b` model

     ```shell
     docker exec ollama-service ollama create llama -f ./tmp/Modelfile.llama
     docker exec ollama-service ollama run llama
     ```

     > **Note:** The `llama` used in the command is a custom name

   - For `mistral:7b` model

     ```shell
     docker exec ollama-service ollama create mistral -f ./tmp/Modelfile.mistral
     docker exec ollama-service ollama run mistral
     ```

     > **Note:** The `mistral` used in the command is a custom name

3. Copy the video file or files you want to process to the [videos](./docker/videos/) folder

## Start application

1. Navigate to the root of the project
2. Run the following command to start the process

   ```shell
   npm start
   ```

## Environment variables

- `WHISPER_MODEL` - model utilized by `whisper` (default: `small.en`), check for available models [here](https://github.com/openai/whisper?tab=readme-ov-file#available-models-and-languages)
- `WHISPER_LANGUAGE` - language utilized by `whisper` (default: `en`), check for available languages [here](https://github.com/openai/whisper/blob/main/whisper/tokenizer.py)
- `OLLAMA_SUMMARY_MODEL` - model utilized by `ollama` (default: `llama:latest`), check for available models [here](https://ollama.com/search)
- `OLLAMA_MARKDOWN_MODEL` - model utilized by `ollama` (default: `mistral:latest`), check for available models [here](https://ollama.com/search)
- `PDF_ENGINE` - engine utilized to generate the PDF (default: `wkhtmltopdf`), possible values: `weasyprint`, `wkhtmltopdf` and `pdflatex`

> **Note:** The default model names `llama:latest` and `mistral:latest` are custom names used in the commands to install the `llama` and `mistral` models respectively in the Docker section. You can change these names (and the models, at least) as per your requirements, but make sure to update the installation commands accordingly.\
> **Note:** To check the available models installed in the `ollama` service, open your browser and navigate to `http://localhost:11434/v1/models`.

## Planned Features

1. Add support for Nvidia and AMD GPUs for faster processing
2. Improve quality of the generated PDFs
3. Improve quality of the generated summaries

> **Note:** No ETA for these features yet.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
