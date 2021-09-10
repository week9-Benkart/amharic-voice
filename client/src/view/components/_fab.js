import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import React from "react";

const useStyles = makeStyles({
	fab: {
		backgroundColor: "#ffffff",
		color: "#002884"
	},
});

function _fab({ children }) {
	const classes = useStyles();

	return (
		<div className={classes.fab}>
			<Fab color= "inherit" aria-label="record">
      	{children}
    	</Fab>
		</div>

	);
}

export default _fab;
