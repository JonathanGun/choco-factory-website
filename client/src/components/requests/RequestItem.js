import React from "react";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { red, lightGreen } from "@material-ui/core/colors";

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
        {props.requestID} {/* TODO Change to Choco name */}
      </TableCell>
      <TableCell align="center">{props.amount}</TableCell>
      <TableCell align="center">
        <Box bgcolor={bgColor} py={1}>
          {props.status}
        </Box>
      </TableCell>
      <TableCell align="center">{stringDate}</TableCell>
      <TableCell align="center">
        <Button
          onClick={() => props.handleApprove(props.index)}
          disabled={props.status !== "Pending"}
        >
          Approve
        </Button>
      </TableCell>
    </TableRow>
  );
}
