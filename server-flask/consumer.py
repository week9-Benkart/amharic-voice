from kafka import KafkaConsumer
import json
import numpy as np
import time


class Consumer:
    """ Class for Consumer"""

    def __init__(self, bootstrap='b-1.demo-cluster-1.9q7lp7.c1.kafka.eu-west-1.amazonaws.com:9092', topic='Benkart_Benkart_Text_Topic2', file_type="text"):
        """ Initialize consumer with the given bootstrapserver"""
        self.bootstrap = bootstrap
        self.topic = topic
        self.file_type = file_type
        self.trans = []

    def get_transcription_from_kafka(self):
        """ Initialize Consumer"""
        consumer = KafkaConsumer( self.topic,
                                  bootstrap_servers=[self.bootstrap],
                                  auto_offset_reset='earliest',
                                  group_id='benkart-group2v',
                                  )
        messages = consumer.poll(timeout_ms=1000, max_records=10)
        if(messages=={}):
          print("Error -")
          return

        for tp, mess in messages.items():
          for message in mess:
            self.trans.append(message.value.decode('utf-8'))
          self.trans.reverse()
          consumer.close()
          return

    def get_transcription(self):
      if(len(self.trans)==0):
        self.get_transcription_from_kafka()
      if(len(self.trans)==0): 
        return 'ለራስ ሲባል ሌላውን'
      print(len(self.trans))
      text = self.trans.pop()
      return text

    def print_msg(self):
        """ Print text messages from consumer"""
        for message in self.consumer:
            if self.file_type == "text":
                print ("%s:%d:%d: value=%s" % (message.topic, message.partition,
                                          message.offset,message.value.decode('utf-8')))

            elif self.file_type == "audio":
                print ("%s:%d:%d: value=%s" % (message.topic, message.partition,
                                      message.offset,np.frombuffer(message.value, dtype=np.float32)))

            else:
                print("error")