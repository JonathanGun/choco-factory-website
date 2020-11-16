import React from "react";
import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Balance from "./Balance.js";
import ChocoStock from "./chocostock/ChocoStock.js";
import IngredientStock from "./ingredientstock/IngredientStock.js";
import Requests from "./requests/Requests.js";

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "-",
      ingredientInfo: [],
      ingredients: [],
      chocos: [],
    };
  }

  // ============================================== ChocoStock

  handleChocoExpandClick = (i) => {
    var newChoco = this.state.chocos;
    newChoco[i].expanded ^= true;
    if (newChoco[i].expanded) {
      if (newChoco[i].ingredients === undefined) {
        this.updateChocoIngredients(i);
      }
    }
    this.setState({ chocos: newChoco });
  };

  updateChocoIngredients = (i) => {
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
        var newChocos = res.return;
        var iUpdated = [];
        newChocos.forEach((choco, index) => {
          var match = this.state.chocos.filter(
            (el) => el.chocoID === choco.chocoID
          );
          if (match[0] !== undefined) {
            if (match[0].expanded) {
              choco.expanded = match[0].expanded;
              iUpdated.push(index);
            }
          }
        });
        this.setState({ chocos: res.return });
        this.updateIngredients();
        iUpdated.forEach((i) => this.updateChocoIngredients(i));
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
  };

  // ============================================== IngredientStock

  handleIngredientExpandClick = (i) => {
    var newIngredient = this.state.ingredients;
    newIngredient[i].expanded ^= true;
    if (newIngredient[i].expanded) {
      if (newIngredient[i].details === undefined) {
        this.updateIngredientDetail(newIngredient[i].ingredientID);
      }
    }
    this.setState({ ingredients: newIngredient });
  };

  handleDelete = (i, j) => {
    fetch(
      "http://localhost:9000/ingredientstock/delete/" +
        this.state.ingredients[i].details[j].stockID,
      {
        method: "POST",
      }
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          this.updateIngredients();
        }
      })
      .catch((err) => console.log(err));
  };

  handleIngredientBuy = (ingredientID, amount) => {
    fetch("http://localhost:9000/ingredient/buy/", {
      method: "POST",
      body: JSON.stringify({
        money: this.state.balance,
        ingredients: [
          {
            id: ingredientID,
            amount: amount,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.success) {
          this.addIngredientStock(ingredientID, amount, res.money);
        }
      })
      .catch((err) => console.log(err));
  };

  addIngredientStock = (ingredientID, amount, money) => {
    fetch("http://localhost:9000/ingredientstock/add/" + ingredientID, {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          this.handleNewBalance(money);
          this.updateIngredients();
        }
      })
      .catch((err) => console.log(err));
  };

  updateIngredients = () => {
    fetch("http://localhost:9000/ingredientstock/total/")
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        var newIngredient = res.return;
        var idUpdated = [];
        newIngredient.forEach((ingredient) => {
          var match = this.state.ingredients.filter(
            (el) => el.ingredientID === ingredient.ingredientID
          );
          if (match[0] !== undefined) {
            if (match[0].expanded) {
              ingredient.expanded = match[0].expanded;
              idUpdated.push(match[0].ingredientID);
            }
          }
        });
        this.setState({ ingredients: res.return });
        idUpdated.forEach((id) => this.updateIngredientDetail(id));
      })
      .catch((err) => console.log(err));
  };

  updateIngredientDetail = (ingredientID) => {
    fetch("http://localhost:9000/ingredientstock/get/" + ingredientID)
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        var newIngredient = this.state.ingredients;
        newIngredient.forEach((ingredient) => {
          if (ingredient.ingredientID === ingredientID) {
            ingredient.details = res.return;
            ingredient.expanded = true;
          }
        });
        this.setState({ ingredients: newIngredient });
      })
      .catch((err) => console.log(err));
  };

  // ============================================== Balance

  handleNewBalance = (newAmount) => {
    fetch("http://localhost:9000/balance/update", {
      method: "POST",
      body: JSON.stringify({ amount: parseInt(newAmount) }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          this.updateBalance();
        }
      })
      .catch((err) => console.log(err));
  };

  handleTopup = (addAmount) => {
    fetch("http://localhost:9000/balance/add", {
      method: "POST",
      body: JSON.stringify({ amount: parseInt(addAmount) }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          this.updateBalance();
        }
      })
      .catch((err) => console.log(err));
  };

  updateBalance = () => {
    fetch("http://localhost:9000/balance/get")
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        this.setState({ balance: res.return });
      })
      .catch((err) => console.log(err));
  };

  // ============================================== Content

  getChocoName = (chocoID) => {
    if (this.state.chocos.length > 0) {
      let x = this.state.chocos.filter((el) => el.chocoID === chocoID);
      if (x[0] !== undefined) {
        return x[0].name;
      }
    } else {
      return "Choco Name";
    }
  };

  getChocoStock = (chocoID) => {
    if (this.state.chocos.length > 0) {
      let x = this.state.chocos.filter((el) => el.chocoID === chocoID);
      if (x[0] !== undefined) {
        return x[0].amount;
      }
    } else {
      return "Choco Name";
    }
  };

  getChocoPrice = (chocoID) => {
    if (this.state.chocos.length > 0) {
      let x = this.state.chocos.filter((el) => el.chocoID === chocoID);
      if (x[0] !== undefined) {
        return x[0].price;
      }
    } else {
      return "Choco Name";
    }
  };

  updateIngredientInfo = () => {
    fetch("http://localhost:9000/ingredient/")
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        this.setState({ ingredientInfo: res });
      })
      .catch((err) => console.log(err));
  };

  getIngredientName = (ingredientID) => {
    if (this.state.ingredientInfo.length > 0) {
      let x = this.state.ingredientInfo.filter(
        (el) => el.IngredientID === ingredientID
      );
      if (x[0] !== undefined) {
        return x[0].IngredientName;
      }
    } else {
      return "Ingredient Name";
    }
  };

  getIngredientPrice = (ingredientID) => {
    if (this.state.ingredientInfo.length > 0) {
      let x = this.state.ingredientInfo.filter(
        (el) => el.IngredientID === ingredientID
      );
      if (x[0] !== undefined) {
        return x[0].Price;
      }
    } else {
      return "Loading...";
    }
  };

  getIngredientStock = (ingredientID) => {
    if (this.state.ingredients.length > 0) {
      let x = this.state.ingredients.filter(
        (el) => el.ingredientID === ingredientID
      );
      if (x[0] !== undefined) {
        return x[0].amount;
      }
    } else {
      return "0";
    }
  };

  getActivePage = () => {
    switch (this.props.activePage) {
      case 0:
        return (
          <ChocoStock
            chocos={this.state.chocos}
            ingredientInfo={this.state.ingredientInfo}
            handleExpandClick={this.handleChocoExpandClick}
            getIngredientName={this.getIngredientName}
            getIngredientStock={this.getIngredientStock}
            getIngredientPrice={this.getIngredientPrice}
            getChocoPrice={this.getChocoPrice}
            updateIngredients={this.updateIngredients}
            handleIngredientBuy={this.handleIngredientBuy}
            updateChoco={this.updateChoco}
            processChoco={this.processChoco}
            thousandSep={this.thousandSep}
          />
        );
      case 1:
        return (
          <IngredientStock
            ingredients={this.state.ingredients}
            ingredientInfo={this.state.ingredientInfo}
            updateIngredientInfo={this.updateIngredientInfo}
            getIngredientName={this.getIngredientName}
            getIngredientPrice={this.getIngredientPrice}
            handleExpandClick={this.handleIngredientExpandClick}
            handleDelete={this.handleDelete}
            handleIngredientBuy={this.handleIngredientBuy}
            updateIngredientDetail={this.updateIngredientDetail}
            updateIngredients={this.updateIngredients}
            thousandSep={this.thousandSep}
          />
        );
      case 2:
        return (
          <Requests
            getChocoName={this.getChocoName}
            getChocoStock={this.getChocoStock}
            getChocoPrice={this.getChocoPrice}
            processChoco={this.processChoco}
            updateChoco={this.updateChoco}
            thousandSep={this.thousandSep}
          />
        );
      default:
        return null;
    }
  };

  componentDidMount() {
    this.updateBalance();
    if (this.state.ingredients.length === 0) {
      this.updateIngredients();
    }
    if (this.state.ingredientInfo.length === 0) {
      this.updateIngredientInfo();
    }
    if (this.state.chocos.length === 0) {
      this.updateChoco();
    }
  }

  thousandSep = (price) => {
    return price
      ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : "Loading...";
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Balance
          balance={this.state.balance}
          updateBalance={this.updateBalance}
          handleTopup={this.handleTopup}
        />
        <Box py={2}>{this.getActivePage()}</Box>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Content);
