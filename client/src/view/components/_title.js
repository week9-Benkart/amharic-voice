import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
	root: {
		display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
		color: "#002884",
		fontWeight: 400,
		marginBottom: 16,
		minWidth: 500,
	},
});

function _title({ children }) {
	const classes = useStyles();

	return (
		<Typography component="h2" variant="h6" className={classes.root}>
			{children}
		</Typography>
	);
}

export default _title;
