#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import request
from flask import Flask, url_for
from flask_cors import CORS
from consumer import Consumer
from producer import Producer
from s3_helper import S3Helper

consumer = Consumer()
producer = Producer()
s3_helper = S3Helper()

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.route("/api", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return consumer.get_transcription()
    if request.method == "POST":
        print("________________________________")
        print(request.files)
        print("________________________________")
        f = request.files['wavFile']
        with open('test_audio.wav', 'wb') as audio:
            f.save(audio)
        producer.send_audio_metadata("test_audio")
        # s3_helper.send_audio(test_audio)
        
        return("Works")

if __name__ == '__main__':
    app.run(debug=True)
