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

  var ingredient = props.ingredient;
  return (
    <CardHeader
      avatar={
        <Avatar aria-label="ingredientimage" className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography>Avalable: {ingredient.amount}</Typography>
          <Typography>&nbsp;|&nbsp;</Typography>
          <Typography>Expired: {ingredient.expired}</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: ingredient.expanded,
            })}
            aria-expanded={ingredient.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      }
      title={props.getIngredientName(ingredient.ingredientID)}
      subheader={"ID: " + ingredient.ingredientID}
      onClick={() => props.handleExpandClick(props.index)}
    />
  );
}
