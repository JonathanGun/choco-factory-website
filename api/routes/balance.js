const express = require("express");
var { url, soap } = require("./config.js");

const router = express.Router();

url += "/balance/?wsdl";

router.get("/get", function (req, res, next) {
  soap.createClient(url, function (err, client) {
    const args = {};
    client.getBalance(args, function (err, result) {
      res.send(result);
    });
  });
});

router.post("/add", function (req, res, next) {
  console.log(req.body);
  if (req.body.amount !== undefined && req.body.amount > 0) {
    const args = {
      amount: req.body.amount,
    };
    soap.createClient(url, function (err, client) {
      client.addBalance(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("Amount must be positive integer");
  }
});

router.post("/update", function (req, res, next) {
  if (req.body.amount !== undefined && req.body.amount > 0) {
    const args = {
      amount: req.body.amount,
    };
    soap.createClient(url, function (err, client) {
      client.updateBalance(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("Amount must be positive integer");
  }
});

module.exports = router;
