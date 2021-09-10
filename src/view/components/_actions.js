import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Fab} from './';
import {Mic, MicOff, ArrowForwardIos, Replay} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
}));

export default function Actions({ recordHandler, stopHandler, reloadHandler, nextHandler }) {
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
    <div className={classes.root}>
      <Fab>
        <Replay onClick={onReload}/>
      </Fab>
      <Fab>
        <ArrowForwardIos onClick={onNext}/>
      </Fab>
    </div>
  )
}