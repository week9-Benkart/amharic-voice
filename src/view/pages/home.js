import { Container } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Card, Title, Fab, Actions} from "../components"
import Typography from '@material-ui/core/Typography';

let x = "አገራችን ከአፍሪካም ሆነ ከሌሎች የአለም አገራት ጋር ያላትን አለም አቀፋዊ ግንኙነት ወደ ላቀ ደረጃ ያሸጋገረ ሆኗል በአገር ውስጥ አራት አለም ጀልባያውም የወረቀት"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
	transcription: {
    fontSize: 24,
  },
}));

function Home() {
	const classes = useStyles();

  const record = () => {
    console.log("Record");
  }
	const stop = () => {
    console.log("stop");
  }
	const reload = () => {
    console.log("reload");
  }
	const next = () => {
    console.log("next");
  }

	return (
    <Container component="main" maxWidth="xs">      
      <div className={classes.paper}>
        <Title>
          Welcome
        </Title>
        <Card>
					<Typography className={classes.transcription} color="textSecondary" align="center" gutterBottom>
          	{x}
        	</Typography>
				</Card>

				<Actions recordHandler={record} stopHandler={stop} reloadHandler={reload}  nextHandler={next}></Actions>
        
      </div>
    </Container>
  );
}

export default Home;