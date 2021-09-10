import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Card, Title, Actions} from "../components"
import Typography from '@material-ui/core/Typography';
import useRecorder from "../../core/useRecorder";
import useKafka from "../../core/useKafka";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(0deg,var(--white) 20%,var(--desert-storm))'
  },
	transcription: {
    fontSize: 24,
  },
}));

function Home() {
	const classes = useStyles();
  const [receiveTranscription, sendAudio] = useKafka();
  const [transcription, setTranscription] = useState("");
  const [audio, setAudio] = useState("")

  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  const record = () => {
    console.log("Record");
    // sendAudio()
		startRecording()
  }
	const stop = () => {
    console.log("stop");
		stopRecording()
  }
	const reload = () => {
    console.log("reload");
  }
	const next = () => {
    console.log("next");
		console.log(audioURL);
    const trans = receiveTranscription()
    console.log(trans);
    setTranscription(trans)
  }
	console.log(isRecording);

  useEffect(() => {
    console.log("trans");

    const trans = receiveTranscription()
    console.log(trans);
     setTranscription(trans)
  }, [])


	return (
    <Container component="main" maxWidth="xs">      
      <div className={classes.paper}>
        <Title>
          ለቋንቋው እድገት ላደረጉት ድጋፍ ምስጋናችን ከልብ ነው
        </Title>
        <Card>
					<Typography className={classes.transcription} color="textSecondary" align="center" gutterBottom>
          	{transcription}
        	</Typography>
				</Card>

				<Actions audioURL = {audioURL} recordHandler={record} stopHandler={stop} reloadHandler={reload}  nextHandler={next}></Actions>
        
      </div>
    </Container>
  );
}

export default Home;