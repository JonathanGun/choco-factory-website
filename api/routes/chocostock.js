const express = require("express");
var { url, soap } = require("./config.js");

url += "/chocostock/?wsdl";

const router = express.Router();

router.get("/get/:id", function (req, res, next) {
  var args = {};
  if (req.params.id !== undefined && req.params.id > 0) {
    args.id = req.params.id;
    soap.createClient(url, function (err, client) {
      client.getChocoStock(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    soap.createClient(url, function (err, client) {
      client.getChocoStockList(args, function (err, result) {
        res.send(result);
      });
    });
  }
});

router.get("/get", function (req, res, next) {
  var args = {};
  soap.createClient(url, function (err, client) {
    client.getChocoStockList(args, function (err, result) {
      res.send(result);
    });
  });
});

module.exports = router;
