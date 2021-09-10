import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Fab} from './';
import {Mic, MicOff, ArrowForwardIos, Replay} from '@material-ui/icons'
import AudioPlayer from 'material-ui-audio-player';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: "center",
    flexWrap: 'wrap',
    justifyContent: "center",
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
  audio: {
    display: 'flex',
    width: 500,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 24
  },
}));

export default function Actions({ audioURL, recordHandler, stopHandler, reloadHandler, nextHandler }) {
  const classes = useStyles();
  const [currentState, setCurrentState] = useState("idle");

  const onStart = () => {
    setCurrentState("recording");
    recordHandler()
  }
  const onStop = () => {
    console.log(currentState);
    setCurrentState("stopped");
    console.log(currentState);

    stopHandler()
  }
  const onNext = () => {
    setCurrentState("idle");
    nextHandler()
  }
  const onReload = () => {
    setCurrentState("idle");
    recordHandler()
  }

  console.log(currentState);


  if (currentState === "idle") {    
    return (    
    <div className={classes.root}>
      <Fab>
        <Mic onClick={onStart}/>
      </Fab>
    </div> 
    );
  } 
  else if (currentState === "recording") {    
    return (    
    <div className={classes.root}>
      <Fab>
        <MicOff onClick={onStop}/>
      </Fab>
    </div> 
    );
  } 

  return (
    <div>
      <div className={classes.audio}>
        <AudioPlayer 
          elevation={1}
          width="100%"
          variation="default"
          spacing={3}
          src={audioURL} />
      </div>
      <div className={classes.root}>
        <Fab>
          <Replay onClick={onReload}/>
        </Fab>
        <Fab>
          <ArrowForwardIos onClick={onNext}/>
        </Fab>
      </div>
    </div>
  )
}