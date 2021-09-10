import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
	root: {
		minWidth: 500,
		minHeight: 200,
	},
});

function _card({ children }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

export default _card;
