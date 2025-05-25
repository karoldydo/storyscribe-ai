FROM python:3.9-slim

RUN apt-get update && \
    apt-get install -y ffmpeg git && \
    rm -rf /var/lib/apt/lists/*

COPY ../../servers/whisper/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /app

COPY ../../servers/whisper/main.py .

EXPOSE 3000

# w - number of workers, b - bind address, --timeout - request timeout in seconds
CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:3000", "--timeout", "900", "--log-level", "info", "main:app"]
