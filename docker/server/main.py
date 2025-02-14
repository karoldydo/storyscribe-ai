from flask import Flask, request, jsonify
import os
import subprocess
import requests
import re
import uuid

app = Flask(__name__)


@app.route("/transcribe", methods=["POST"])
def transcribe():
    app.logger.info("Starting transcription")

    data = request.get_json() or {}
    file_name = data.get("file_name")
    model = data.get("model")
    language = data.get("language")

    # validate model
    if not model:
        app.logger.warning("No model specified. Defaulting to 'small'.")
        model = "small"

    # validate language
    if not language:
        app.logger.warning("No language specified. Defaulting to 'en'.")
        language = "en"

    # validate file name
    if not file_name:
        return jsonify({"error": "No file name (file_name) provided."}), 400

    # build full file path in /videos
    file_path = os.path.join("/videos", file_name)

    # check if file exists
    if not os.path.exists(file_path):
        return jsonify(
            {"error": f"File '{file_name}' not found in /videos directory."}
        ), 400

    try:
        # run whisper command
        subprocess.run(
            [
                "whisper",
                file_path,
                "--model",
                model,
                "--task",
                "transcribe",
                "--language",
                language,
                "--output_format",
                "txt",
                "--output_dir",
                "/transcripts",
                "--verbose",
                "False",
            ],
            check=True,
        )

        # build base file name without extension
        base_name = os.path.splitext(os.path.basename(file_path))[0]
        transcript_file = os.path.join("/transcripts", f"{base_name}.txt")

        # read transcript from file
        with open(transcript_file, "r", encoding="utf-8") as buffer:
            transcript = " ".join(buffer.read().splitlines())
            app.logger.info(f"transcript: {transcript}")

        # remove transcript file after reading
        try:
            os.remove(transcript_file)
        except OSError as error:
            app.logger.error(
                f"Unable to remove transcript file '{transcript_file}' due to error: {error}"
            )

        # return transcript
        return jsonify({"transcript": transcript}), 200

    except subprocess.CalledProcessError as error:
        return jsonify({"error": f"Transcription failed due to error: {error}"}), 500


@app.route("/summarize", methods=["POST"])
def summarize():
    app.logger.info("Starting summarization")

    data = request.get_json() or {}
    model = data.get("model")
    transcript = data.get("transcript")

    if not model:
        return jsonify({"error": "No model specified."}), 400
    if not transcript:
        return jsonify({"error": "No transcript specified."}), 400

    # read base prompt
    try:
        with open("/prompts/summary.txt", "r", encoding="utf-8") as buffer:
            base_prompt = "".join(buffer.read().splitlines())
    except Exception as error:
        app.logger.error(f"Could not read summary prompt file: {error}")
        return jsonify(
            {"error": f"Could not read summary prompt file: {str(error)}"}
        ), 500

    app.logger.info(f"base_prompt: {base_prompt}")

    # combine base prompt with transcript
    final_prompt = f"{base_prompt}{transcript}"

    app.logger.info(f"final_prompt: {final_prompt}")

    try:
        response = requests.post(
            "http://ollama-service:11434/api/generate",
            json={"model": model, "prompt": final_prompt, "stream": False},
        )

        # check response
        response.raise_for_status()

        # get response
        response_data = response.json()

        # clean response
        if "response" in response_data:
            clean_response = re.sub(
                r"<think>.*?</think>", "", response_data["response"], flags=re.DOTALL
            )
            response_data["response"] = clean_response.strip()

        # return response
        return jsonify(response_data), 200
    except Exception as error:
        app.logger.error(f"Summarization failed due to error: {error}")
        return jsonify(
            {"error": f"Summarization failed due to error: {str(error)}"}
        ), 500


@app.route("/markdown", methods=["POST"])
def markdown():
    app.logger.info("Starting markdown generation")

    data = request.get_json() or {}
    model = data.get("model")
    summary = data.get("summary")

    if not model:
        return jsonify({"error": "No model specified."}), 400
    if not summary:
        return jsonify({"error": "No transcript specified."}), 400

    # read base prompt
    try:
        with open("/prompts/markdown.txt", "r", encoding="utf-8") as buffer:
            base_prompt = "".join(buffer.read().splitlines())
    except Exception as error:
        app.logger.error(f"Could not read markdown prompt file: {error}")
        return jsonify(
            {"error": f"Could not read markdown prompt file: {str(error)}"}
        ), 500

    app.logger.info(f"base_prompt: {base_prompt}")
    app.logger.info(f"summary: {summary}")

    # combine base prompt with transcript
    final_prompt = f"{base_prompt}{summary}"

    app.logger.info(f"final_prompt: {final_prompt}")

    try:
        response = requests.post(
            "http://ollama-service:11434/api/generate",
            json={"model": model, "prompt": final_prompt, "stream": False},
        )

        # check response
        response.raise_for_status()

        # get response
        response_data = response.json()

        # clean response
        if "response" in response_data:
            clean_response = re.sub(
                r"<think>.*?</think>", "", response_data["response"], flags=re.DOTALL
            )
            response_data["response"] = clean_response.strip()

        # return response
        return jsonify(response_data), 200
    except Exception as error:
        app.logger.error(f"Markdown generation failed due to error: {error}")
        return jsonify(
            {"error": f"Markdown generation failed due to error: {str(error)}"}
        ), 500


@app.route("/pdf", methods=["POST"])
def md_to_pdf():
    app.logger.info("Starting markdown conversion to PDF")

    data = request.get_json() or {}
    markdown = data.get("markdown")
    engine = data.get("engine", "")
    css = data.get("css", "")

    if not markdown:
        return jsonify({"error": "No markdown content provided"}), 400

    try:
        # convert markdown to pdf
        response = requests.post(
            "http://pdf-service:8000",
            data={"markdown": markdown, "engine": engine, "css": css},
        )

        if response.status_code != 200:
            return jsonify(
                {"error": "External conversion service returned an error"}
            ), 500

        # create output directory
        output_dir = "/pdf"
        os.makedirs(output_dir, exist_ok=True)

        # generate a unique filename
        pdf_filename = f"{uuid.uuid4()}.pdf"
        pdf_path = os.path.join(output_dir, pdf_filename)

        # save pdf
        with open(pdf_path, "wb") as f:
            f.write(response.content)

        # return response
        return jsonify({"message": "PDF saved successfully", "pdf_path": pdf_path}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
