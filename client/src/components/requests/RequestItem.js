import React from "react";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { red, lightGreen } from "@material-ui/core/colors";

import GroupedButton from "../button/GroupedButton.js";

export default function RequestItem(props) {
  const bgColor = props.status === "Pending" ? red["A100"] : lightGreen["A200"];
  const stringDate = new Date(props.requestDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <TableRow key={props.requestID}>
      <TableCell component="th" scope="props">
        {props.name}
      </TableCell>
      <TableCell align="center">{props.amount}</TableCell>
      <TableCell align="center">{props.stock}</TableCell>
      <TableCell align="center">
        <Box bgcolor={bgColor} py={1}>
          {props.status}
        </Box>
      </TableCell>
      <TableCell align="center">{stringDate}</TableCell>
      <TableCell align="center">{props.profit}</TableCell>
      <TableCell align="center">
        {props.status !== "Delivered" ? (
          props.amount > props.stock ? (
            <GroupedButton
              handleClick={props.handleProcessChoco}
              buttonText="Process More"
            />
          ) : (
            <Button onClick={() => props.handleApprove(props.index)}>
              Approve
            </Button>
          )
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
}
