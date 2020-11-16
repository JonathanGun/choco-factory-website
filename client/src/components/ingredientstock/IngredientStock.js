import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import IngredientDetailItem from "./IngredientDetailItem.js";
import IngredientStockHeader from "./IngredientStockHeader.js";
import GroupedButton from "../button/GroupedButton.js";

const styles = (theme) => ({
  root: {
    minWidth: 350,
  },
});

class IngredientStock extends React.Component {
  dateToString = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  render() {
    const classes = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader title="Ingredient Stock" />
        <CardContent>
          {this.props.ingredients.map((ingredient, index) => (
            <Box py={1}>
              <Card variant="outlined">
                <IngredientStockHeader
                  ingredient={ingredient}
                  name={this.props.getIngredientName(ingredient.ingredientID)}
                  index={index}
                  getIngredientName={this.props.getIngredientName}
                  handleExpandClick={this.props.handleExpandClick}
                />
                <Collapse in={ingredient.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <TableContainer>
                      <Table className={classes.root} size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Expiry Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ingredient.expanded &&
                            ingredient.details &&
                            ingredient.details.map((row, j) => (
                              <IngredientDetailItem
                                key={row.stockID}
                                amount={row.amount}
                                expiryDate={this.dateToString(row.expiryDate)}
                                handleDelete={() =>
                                  this.props.handleDelete(index, j)
                                }
                                isExpired={
                                  new Date(row.expiryDate) < new Date()
                                }
                              />
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mx={2}
                      mt={2}
                    >
                      <Typography>
                        Buy Price (/pcs): Rp.&nbsp;
                        {this.props.thousandSep(
                          this.props.getIngredientPrice(ingredient.ingredientID)
                        )}
                      </Typography>
                      <GroupedButton
                        handleClick={(amount) =>
                          this.props.handleIngredientBuy(
                            ingredient.ingredientID,
                            amount
                          )
                        }
                        buttonText="Buy More"
                      />
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(IngredientStock);
