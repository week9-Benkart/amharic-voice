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
    var formData = new FormData(); // Currently empty
    formData.append('id', '12345');
    formData.append("wavFile", wavFile, "node_icon.wav"); 
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    // axios.post(`http://127.0.0.1:8000/api/audio`, formData,  {
    //   headers: {'Content-Type': 'multipart/form-data'},
    //   timeout: 30000,
    // })
    // .then((res) => {
    //       console.log("successfully sent audio: ", res)
    //     })
    //     .catch((err) => {
    //       console.log("error sending audio: ", err)
    //     });

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/audio',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
    }
	const value = [transcription, receiveTranscription, sendAudio];

	return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
}

export default ServerProvider;
