import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function IngredientItem(props) {
  return (
    <TableRow key={props.key}>
      <TableCell component="th">{props.name}</TableCell>
      <TableCell align="center">{props.amount}</TableCell>
      <TableCell align="center">{props.stock}</TableCell>
    </TableRow>
  );
}
