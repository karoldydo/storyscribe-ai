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
        return jsonify({"error": "No file name (file_name) provided."}), 400

    # build full file path, it is a shared directory between backend-service and whisper-service
    file_path = os.path.join("/usr/workspace/storyscribe-ai/shared/videos", file_name)

    # check if file exists
    if not os.path.exists(file_path):
        return jsonify({"error": f"File '{file_name}' not found."}), 400

    try:
        model = whisper.load_model(model_name)
        result = model.transcribe(file_path, language=language)
        transcript = result["text"].strip()
        return jsonify({"transcript": transcript}), 200
    except Exception as error:
        return jsonify({"error": f"Transcription failed due to error: {error}"}), 500
