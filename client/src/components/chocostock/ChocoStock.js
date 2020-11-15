import React from "react";
// import Typography from "@material-ui/core/Typography";
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
import GroupedButtons from "../button/GroupedButton.js";

const styles = (theme) => ({
  root: {
    minWidth: 350,
  },
});

class ChocoStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chocos: [],
    };
  }

  handleExpandClick = (i) => {
    var newChoco = this.state.chocos;
    newChoco[i].expanded ^= true;
    if (newChoco[i].expanded) {
      if (newChoco[i].ingredients === undefined) {
        this.updateIngredients(i);
      }
    }
    this.setState({ chocos: newChoco });
  };

  updateIngredients = (i) => {
    fetch("http://localhost:9000/recipe/" + this.state.chocos[i].chocoID)
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        var newChoco = this.state.chocos;
        newChoco[i].ingredients = res.return;
        this.setState({ chocos: newChoco });
      })
      .catch((err) => console.log(err));
  };

  updateChoco = () => {
    fetch("http://localhost:9000/chocostock/get")
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        this.setState({ chocos: res.return });
      })
      .catch((err) => console.log(err));
  };

  processChoco = (chocoID, amount) => {
    fetch("http://localhost:9000/ingredientstock/process", {
      method: "POST",
      body: JSON.stringify({
        chocoid: chocoID,
        amount: amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          this.updateChoco();
        }
      })
      .catch((err) => console.log(err));
    console.log("process", chocoID, amount);
  };

  componentDidMount() {
    if (this.state.chocos.length === 0) {
      this.updateChoco();
    }
  }

  render() {
    const classes = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader title="Choco Stock and Recipe" />
        <CardContent>
          {this.state.chocos.map((choco, index) => (
            <Box py={1}>
              <Card variant="outlined">
                <ChocoStockHeader
                  choco={choco}
                  index={index}
                  handleExpandClick={this.handleExpandClick}
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
                                amount={ingredient.amount}
                                stock={this.props.getIngredientStock(
                                  ingredient.ingredientID
                                )}
                              />
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Box m={2}>
                    <GroupedButtons
                      handleClick={(amount) => {
                        this.processChoco(choco.chocoID, amount);
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
