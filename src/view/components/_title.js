import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
	root: {
		color: "purple",
	},
});

function _title({ children }) {
	const classes = useStyles();

	return (
		<Typography component="h1" variant="h5" className={classes.root}>
			{children}
		</Typography>
	);
}

export default _title;
