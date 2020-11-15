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
    };
  }

  getActivePage = () => {
    switch (this.props.activePage) {
      case 0:
        return (
          <ChocoStock
            ingredientInfo={this.state.ingredientInfo}
            getIngredientName={this.getIngredientName}
            getIngredientStock={this.getIngredientStock}
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
            handleExpandClick={this.handleExpandClick}
            handleDelete={this.handleDelete}
            handleIngredientBuy={this.handleIngredientBuy}
            updateIngredientDetail={this.updateIngredientDetail}
            updateIngredients={this.updateIngredients}
          />
        );
      case 2:
        return <Requests />;
      default:
        return null;
    }
  };

  handleExpandClick = (i) => {
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
          var newIngredients = this.state.ingredients;
          newIngredients[i].details.splice(j, 1);
          this.setState({ ingredients: newIngredients });
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
          this.updateIngredientDetail(ingredientID);
        }
      })
      .catch((err) => console.log(err));
  };

  updateIngredients = () => {
    fetch("http://localhost:9000/ingredientstock/total/")
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res.return);
        this.setState({ ingredients: res.return });
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
          }
        });
        this.setState({ ingredients: newIngredient });
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

  componentDidMount() {
    this.updateBalance();
    if (this.state.ingredients.length === 0) {
      this.updateIngredients();
    }
    if (this.state.ingredientInfo.length === 0) {
      this.updateIngredientInfo();
    }
  }

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
