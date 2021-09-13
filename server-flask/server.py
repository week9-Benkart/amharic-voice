#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import request
from flask import Flask, url_for
from flask_cors import CORS
from kafka_helper import KafkaHelper
kh = KafkaHelper()

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        # randomly select text and send to user

        # text = "የተሻለ ብቃት ያሳዩ ቦክሰኞች ለቶኪዮ ኦሊምፒክ ማጣሪያ ተሳታፊ እንደሚሆኑም ታውቋል"
        return kh.get_transcription()
    if request.method == "POST":
        f = request.files['wavFile']
        with open('audio.wav', 'wb') as audio:
            # send the file to kafka
            f.save(audio)
        print('file uploaded successfully')
        kh.send_audio()
        return("Works")

if __name__ == '__main__':
    app.run(debug=True)
