#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import request
from flask import Flask, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        # randomly select text and send to user
        text = "የተሻለ ብቃት ያሳዩ ቦክሰኞች ለቶኪዮ ኦሊምፒክ ማጣሪያ ተሳታፊ እንደሚሆኑም ታውቋል"
        return text
    if request.method == "POST":
        f = request.files['wavFile']
        with open('audio.wav', 'wb') as audio:
            # send the file to kafka
            f.save(audio)
        print('file uploaded successfully')
        return("Works")

if __name__ == '__main__':
    app.run(debug=True)
