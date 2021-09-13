import logging
import os
import pandas as pd
from kafka import KafkaProducer
from kafka.errors import KafkaError
from kafka import KafkaConsumer

class KafkaHelper:

  def __init__(self):
    self.consumer = KafkaConsumer('first_topic',
                                  bootstrap_servers=['localhost:9092'],
                                  auto_offset_reset='earliest',
                                  group_id='my-group2a',
                                  enable_auto_commit=True,
                                  auto_commit_interval_ms=1000,
                                  consumer_timeout_ms=-1)

  def get_transcription(self):
    messages = self.consumer.poll(timeout_ms=1000, max_records=1)
    for tp, mess in messages.items():
      message = mess[0]
      print("%s:%d:%d: key=%s value=%s" % (tp.topic, tp.partition,
                                           message.offset, message.key,
                                           message.value.decode('utf-8')))
      text = message.value.decode('utf-8')
      self.consumer.close()
      return text

  
  def send_audio(self):
    pass
    


# kh = KafkaHelper()
# kh.get_transcription()
