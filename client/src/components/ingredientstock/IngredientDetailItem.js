import React from "react";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function IngredientDetailItem(props) {
  const bgColor = props.isExpired ? grey["200"] : "";

  return (
    <TableRow key={props.key} bgColor={bgColor}>
      <TableCell align="center">{props.amount}</TableCell>
      <TableCell align="center">{props.expiryDate}</TableCell>
      <TableCell align="center">
        <Button onClick={props.handleDelete} disabled={!props.isExpired}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
