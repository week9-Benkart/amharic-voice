import React, { createContext } from "react";
import axios from 'axios';

const appAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const kafkaContext = createContext();

function KafkaProvider({ children }) {
  
	const receiveTranscription = async () => {
    appAxios.get("/api/transcription").then((res) => {
        if (res.status === 200) {
          return res.data;
        }
        //TODO: handle couldn't fetch data
      })
      .catch((err) => {
        console.log("Error")
      });
  }

  const sendAudio = async () => {
    appAxios.post(`/api/audio`, {data: "Works"})
      .then((res) => {
      })
      .catch((err) => {});
  };

	const value = [receiveTranscription, sendAudio];

	return <kafkaContext.Provider value={value}>{children}</kafkaContext.Provider>;
}

export default KafkaProvider;
