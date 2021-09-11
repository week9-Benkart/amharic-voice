import React, { createContext, useState } from "react";
import axios from 'axios';

const appAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const ServerContext = createContext();

function ServerProvider({ children }) {
  const [transcription, setTranscription] = useState('')
  
	const receiveTranscription = () => {
    appAxios.get("api/transcription").then((res) => {
        if (res.status === 200) {
          console.log("res.data.data: ", res.data.data);
          setTranscription(res.data.data)
          return;
        }
      })
      .catch((err) => {
        console.log("Error")
      });
  }

  const sendAudio = () => {
    appAxios.post(`/api/audio`, {data: "Works"})
      .then((res) => {
      })
      .catch((err) => {});
  };

	const value = [transcription, receiveTranscription, sendAudio];

	return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
}

export default ServerProvider;
