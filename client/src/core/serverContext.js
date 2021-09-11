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

  const sendAudio = async (audioURL) => {
    console.log("audioURL: ", audioURL)

    axios({
        method: 'get',
        url: audioURL, 
        responseType: 'blob'
    }).then(function(response){
        console.log("response: ", response.data)
        sendWavToServer(response.data);

        // console.log("response: ", response.data)
        // let x = URL.createObjectURL(response.data)
        // console.log("audioURL: ", x)
        //  var reader = new FileReader();
        //  reader.readAsDataURL(response.data); 
        //  reader.onloadend = function() {
        //     var blob = reader.result;
        //     console.log("response: ", blob)
        //     let x = URL.createObjectURL(blob)
        //     console.log("audioURL: ", x)
        //  }
    })
  };


function sendWavToServer(wavFile) {
  console.log("wavFile: ", wavFile)

  var formData = new FormData();
  formData.append("wavFile", wavFile); 
  console.log("formData: ", formData)
  appAxios.post(`/api/audio`, formData)
      .then((res) => {
        console.log("successfully sent audio: ", res)
      })
      .catch((err) => {
         console.log("error sending audio: ", err)
      });
}

	const value = [transcription, receiveTranscription, sendAudio];

	return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
}

export default ServerProvider;
