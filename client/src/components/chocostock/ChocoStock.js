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

import IngredientItem from "./IngredientItem.js";
import ChocoStockHeader from "./ChocoStockHeader.js";
import GroupedButton from "../button/GroupedButton.js";

const styles = (theme) => ({
  root: {
    minWidth: 350,
  },
});

class ChocoStock extends React.Component {
  render() {
    const classes = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader title="Choco Stock and Recipe" />
        <CardContent>
          {this.props.chocos.map((choco, index) => (
            <Box py={1}>
              <Card variant="outlined">
                <ChocoStockHeader
                  choco={choco}
                  index={index}
                  handleExpandClick={this.props.handleExpandClick}
                />
                <Collapse in={choco.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <TableContainer>
                      <Table className={classes.root} size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Ingredient Name</TableCell>
                            <TableCell align="center">
                              Amount Needed (pcs / choco)
                            </TableCell>
                            <TableCell align="center">
                              Available Stock (pcs)
                            </TableCell>
                            <TableCell align="center">Price (/pcs)</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {choco.expanded &&
                            choco.ingredients &&
                            choco.ingredients.map((ingredient) => (
                              <IngredientItem
                                name={this.props.getIngredientName(
                                  ingredient.ingredientID
                                )}
                                price={this.props.thousandSep(
                                  this.props.getIngredientPrice(
                                    ingredient.ingredientID
                                  )
                                )}
                                amount={ingredient.amount}
                                stock={this.props.getIngredientStock(
                                  ingredient.ingredientID
                                )}
                                action={
                                  <GroupedButton
                                    handleClick={(amount) =>
                                      this.props.handleIngredientBuy(
                                        ingredient.ingredientID,
                                        amount
                                      )
                                    }
                                    buttonText="Buy More"
                                  />
                                }
                              />
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    m={2}
                    px={2}
                  >
                    <Typography>
                      Sell Price (/pcs): Rp.&nbsp;
                      {this.props.thousandSep(
                        this.props.getChocoPrice(choco.chocoID)
                      )}
                    </Typography>
                    <GroupedButton
                      handleClick={(amount) => {
                        this.props.processChoco(choco.chocoID, amount);
                      }}
                      buttonText="Process More"
                    />
                  </Box>
                </Collapse>
              </Card>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChocoStock);
