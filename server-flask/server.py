#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import request
from flask import Flask, url_for
from flask_cors import CORS
from consumer import Consumer
from producer import Producer
from s3_helper import S3Helper
import hashlib

consumer = Consumer()
producer = Producer()
s3_helper = S3Helper()

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
current_transcription = ''

@app.route("/api", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        current_transcription = consumer.get_transcription()
        return consumer.get_transcription()
        # return 'ለራስ ሲባል ሌላውን'
    if request.method == "POST":
        f = request.files['wavFile']
        b = bytes(f.filename, 'utf-8')
        hash_object = hashlib.md5(b)
        message = {
            'text': f.filename,
            'name': hash_object.hexdigest()
        }
        with open(f'{hash_object.hexdigest()}.wav', 'wb') as audio:
            f.save(audio)
        producer.send_audio_metadata(message)
        s3_helper.upload_file(hash_object.hexdigest())
        
        return("Works")

if __name__ == '__main__':
    app.run(debug=True)
