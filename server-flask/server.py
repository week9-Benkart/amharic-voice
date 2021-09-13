#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import request
from flask import Flask, url_for
from flask import render_template

app = Flask(name)


@app.route("/", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        # randomly select text and send to user
        text = "የተሻለ ብቃት ያሳዩ ቦክሰኞች ለቶኪዮ ኦሊምፒክ ማጣሪያ ተሳታፊ እንደሚሆኑም ታውቋል"
        return text
    if request.method == "POST":
        f = request.files['audio_data']
        with open('audio.wav', 'wb') as audio:
            # send the file to kafka
            f.save(audio)
        print('file uploaded successfully')


if name == "main":
    app.run(debug=True)
