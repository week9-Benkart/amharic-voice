import json
from kafka import KafkaProducer
from kafka.errors import KafkaError
import pandas as pd
import random
import time

class Producer:
    """ Create a producer and emit events
    :param bootstrap: bootstrap server
    :param create_topic: a variable to create or not to create a new topic
    :param topic: topic name
    """

    def __init__(self, bootstrap='b-1.demo-cluster-1.9q7lp7.c1.kafka.eu-west-1.amazonaws.com:9092', topic='example_topic_group2'):
        self.bootstrap = bootstrap
        self.topic = topic
        self.producer = KafkaProducer( bootstrap_servers=[self.bootstrap] )

    def send_audio_metadata(self, value):
        self.producer.send(self.topic , value="Testing String nnnn".encode())
        self.producer.flush()