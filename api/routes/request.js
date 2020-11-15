const express = require("express");
var { url, soap } = require("./config.js");
url += "/request/?wsdl";

const router = express.Router();

router.get("/:id", function (req, res, next) {
  var args = {};
  if (req.params.id !== undefined && req.params.id > 0) {
    args.id = req.params.id;
    soap.createClient(url, function (err, client) {
      client.getRequest(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    soap.createClient(url, function (err, client) {
      client.getRequestList(args, function (err, result) {
        res.send(result);
      });
    });
  }
});

router.get("/", function (req, res, next) {
  var args = {};
  soap.createClient(url, function (err, client) {
    client.getRequestList(args, function (err, result) {
      res.send(result);
    });
  });
});

router.get("/status/:id", function (req, res, next) {
  if (req.params.id !== undefined && req.params.id > 0) {
    const args = {
      id: req.params.id,
    };
    soap.createClient(url, function (err, client) {
      client.getRequestStatus(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("ID (id) be positive integer");
  }
});

router.post("/add", function (req, res, next) {
  if (req.body.amount !== undefined && req.body.amount > 0) {
    if (req.body.chocoid !== undefined && req.body.chocoid > 0) {
      const args = {
        amount: req.body.amount,
        chocoid: req.body.chocoid,
      };
      soap.createClient(url, function (err, client) {
        client.addRequest(args, function (err, result) {
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

router.post("/deliver/:id", function (req, res, next) {
  if (req.params.id !== undefined && req.params.id > 0) {
    const args = {
      id: req.params.id,
    };
    soap.createClient(url, function (err, client) {
      client.deliverRequest(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("ID (id) must be positive integer");
  }
});

module.exports = router;
