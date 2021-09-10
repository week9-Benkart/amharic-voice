import React, { createContext } from "react";
// import { Kafka } from "kafkajs";
const { Kafka } = require('kafkajs')

export const kafkaContext = createContext();
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})


function KafkaProvider({ children }) {

  const producer = kafka.producer()
  
	const receiveTranscription = async () => {
    const consumer = kafka.consumer({ groupId: 'my-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'first_topic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
  }

  const sendAudio = async () => {
    await producer.connect()
    await producer.send({
      topic: 'first_topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })

    await producer.disconnect()
  }

	const value = [receiveTranscription, sendAudio];

	return <kafkaContext.Provider value={value}>{children}</kafkaContext.Provider>;
}

export default KafkaProvider;
