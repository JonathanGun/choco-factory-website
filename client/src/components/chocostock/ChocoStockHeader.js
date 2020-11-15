import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ChocoStockHeader(props) {
  const classes = useStyles();

  var choco = props.choco;
  return (
    <CardHeader
      avatar={
        <Avatar aria-label="chocoimage" className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <Box display="flex" flex-direction="row" alignItems="center">
          <Typography>Stock: {choco.amount}</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: choco.expanded,
            })}
            aria-expanded={choco.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      }
      title={choco.name}
      subheader={"ID: " + choco.chocoID}
      onClick={() => props.handleExpandClick(props.index)}
    />
  );
}
