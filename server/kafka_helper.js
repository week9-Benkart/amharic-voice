const { Kafka } = require('kafkajs')

class kafkaHelper{

	constructor(clientId, brokers){
    this.kafka = new Kafka({
      clientId: clientId,
      brokers: brokers
    })
  }

  async sendAudio(audio) {
    	const producer = this.kafka.producer()
      await producer.connect()
      await producer.send({
          topic: "first_topic",
          messages: [
              { key: 'key1', value: audio },
          ],
    })
  }
 
  async receiveTranscription(topic) {
    const consumer = this.kafka.consumer({ groupId: 'my-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: "first_topic"})
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(topic)
            console.log(partition)
            console.log(message)
        },
    })
  }
}

clientId=  'my-app',
brokers= ['127.0.0.1:9092']
kh = new kafkaHelper(clientId, brokers)
kh.sendAudio("love")
kh.receiveTranscription("first_topic")