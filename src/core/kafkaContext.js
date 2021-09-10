import React, { createContext, useState } from "react";
import { kafka } from "kafkajs";

export const kafkaContext = createContext();

function KafkaProvider({ children }) {

  const producer = kafka.producer()
  const consumer = kafka.consumer({ groupId: 'my-group' })
  
	const receiveTranscription = (request) => {

  }

  const sendAudio = (audio) => {
  
  }

	const value = [receiveTranscription, sendAudio];

	return <kafkaContext.Provider value={value}>{children}</kafkaContext.Provider>;
}

export default KafkaProvider;
