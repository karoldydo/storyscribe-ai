# **@storyscribe-ai/console**

## Process Overview

1. After startup, the application searches for video files within the [packages/docker/console/videos](../docker/console/videos) directory and its subdirectories.
2. The application then transcribes the audio from each video file.
3. Each transcript is sent to the ollama service, which generates a summary.
4. The summary is converted into a Markdown document.
5. Finally, the Markdown document is transformed into a pdf and saved in the [packages/docker/console/pdf](../docker/console/pdf) directory.

## Project Structure

- [packages/docker/console/build](../docker/console/build): contains the Dockerfile
- [packages/docker/console/css](../docker/console/css): CSS file for the pdf (edit `style.css` to customize the pdf output)
- [packages/docker/console/model](../docker/console/model): model files for ollama (for more details, check the [ollama documentation](https://github.com/ollama/ollama/blob/main/docs/modelfile.md))

  > **Note:** Not all models support Modelfile creation. Please refer to the ollama documentation for the list of currently supported model architectures and further details.

- [packages/docker/console/pdf](../docker/console/pdf): generated pdf files
- [packages/docker/console/prompts](../docker/console/prompts): prompts for ollama (edit `summary.txt` or `markdown.txt` to customize the output)
- [packages/docker/console/server](../docker/console/server): server code for whisper, ollama, and the pdf generator
- [packages/docker/console/videos](../docker/console/videos): video files to be processed

Rest of the files are for the Node.js application that orchestrates the process.

## Requirements

1. [Docker](https://www.docker.com/)
2. [Node.js](https://nodejs.org/)
3. [Yarn](https://yarnpkg.com/getting-started/install)

## Installation

1. Clone the repository
2. Navigate to the root of the project and install the required dependencies

   ```shell
   yarn install
   ```

## Docker Configuration

### Using only CPU

1. Navigate to [packages/docker/console](../docker/console) folder, and run the following command to pull and start the services

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

3. Copy the video file or files you want to process to the [packages/docker/console/videos](../docker/console/videos) folder

## Start application

1. Navigate to the root of the project
2. Run the following command to start the process

   ```shell
   yarn start
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
