from flask import Flask, request, jsonify
import logging
import os
import whisper

app = Flask(__name__)
app.logger.setLevel(logging.INFO)


@app.route("/transcribe", methods=["POST"])
def transcribe():
    data = request.get_json() or {}
    file_name = data.get("file_name")
    file_path = data.get("file_path")
    model_name = data.get("model_name")
    language = data.get("language")

    # validate model
    if not model_name:
        app.logger.warning("No model specified. Defaulting to 'small'.")
        model_name = "small"

    # validate language
    if not language:
        app.logger.warning("No language specified. Defaulting to 'en'.")
        language = "en"

    # validate file name
    if not file_name:
        return jsonify({"error": "No file name file_name provided."}), 400

    # validate file path
    if not file_path:
        app.logger.warning("No file path file_path provided. Using default path.")
        file_path = "/usr/workspace/storyscribe-ai/shared/videos"

    # build full file path, it is a shared directory between backend-service and whisper-service
    path = os.path.join(file_path, file_name)

    # check if file exists
    if not os.path.exists(path):
        return jsonify({"error": f"File '{file_name}' not found."}), 400

    try:
        model = whisper.load_model(model_name)
        result = model.transcribe(path, language=language)
        transcript = result["text"].strip()
        return jsonify({"transcript": transcript}), 200
    except Exception as error:
        return jsonify({"error": f"Transcription failed due to error: {error}"}), 500
