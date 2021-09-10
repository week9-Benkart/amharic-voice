import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import React from "react";

const useStyles = makeStyles({
	root: {
		color: "purple",
	},
});

function _fab({ children }) {
	const classes = useStyles();

	return (
    <Fab color="primary" aria-label="record" className={classes.root}>
      {children}
    </Fab>
	);
}

export default _fab;
