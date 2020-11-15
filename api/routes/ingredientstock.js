const express = require("express");
var { url, soap } = require("./config.js");
url += "/ingredientstock/?wsdl";

const router = express.Router();

router.get("/get/:id", function (req, res, next) {
  if (req.params.id !== undefined && req.params.id > 0) {
    soap.createClient(url, function (err, client) {
      const args = {
        id: req.params.id,
      };
      if (req.query.notexpired) {
        client.getIngredientStockNotExpired(args, function (err, result) {
          res.send(result);
        });
      } else {
        client.getIngredientStock(args, function (err, result) {
          res.send(result);
        });
      }
    });
  } else {
    res.send("ID (id) must be positive integer");
  }
});

router.get("/total", function (req, res, next) {
  const args = {};
  soap.createClient(url, function (err, client) {
    client.getIngredientStockList(args, function (err, result) {
      res.send(result);
    });
  });
});

router.get("/total/:id", function (req, res, next) {
  if (req.params.id !== undefined && req.params.id > 0) {
    const args = {
      id: req.params.id,
    };
    soap.createClient(url, function (err, client) {
      client.getIngredientStockSum(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("ID (id) be positive integer");
  }
});

router.post("/add/:ingredientid", function (req, res, next) {
  console.log(req.body.amount, req.params.ingredientid);
  if (req.body.amount !== undefined && req.body.amount > 0) {
    if (req.params.ingredientid !== undefined && req.params.ingredientid > 0) {
      const args = {
        ingredientid: req.params.ingredientid,
        amount: req.body.amount,
      };
      soap.createClient(url, function (err, client) {
        client.addIngredientStock(args, function (err, result) {
          res.send(result);
        });
      });
    } else {
      res.send("IngredientID (ingredientid) must be positive integer");
    }
  } else {
    res.send("Amount must be positive integer");
  }
});

router.post("/update/:stockid", function (req, res, next) {
  if (req.body.amount !== undefined && req.body.amount > 0) {
    if (req.params.stockid !== undefined && req.params.stockid > 0) {
      const args = {
        stockid: req.params.stockid,
        amount: req.body.amount,
      };
      soap.createClient(url, function (err, client) {
        client.updateIngredientStock(args, function (err, result) {
          res.send(result);
        });
      });
    } else {
      res.send("StockID (stockid) must be positive integer");
    }
  } else {
    res.send("Amount must be positive integer");
  }
});

router.post("/delete/:stockid", function (req, res, next) {
  if (req.params.stockid !== undefined && req.params.stockid > 0) {
    const args = {
      stockid: req.params.stockid,
    };
    soap.createClient(url, function (err, client) {
      client.deleteIngredientStock(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("StockID (stockid) must be positive integer");
  }
});

router.post("/process", function (req, res, next) {
  console.log(req.body);
  if (req.body.amount !== undefined && req.body.amount > 0) {
    if (req.body.chocoid !== undefined && req.body.chocoid > 0) {
      const args = {
        chocoid: req.body.chocoid,
        amount: req.body.amount,
      };
      soap.createClient(url, function (err, client) {
        client.process(args, function (err, result) {
          res.send(result);
        });
      });
    } else {
      res.send("ChocoID (chocoid) must be positive integer");
    }
  } else {
    res.send("Amount must be positive integer");
  }
});

module.exports = router;
