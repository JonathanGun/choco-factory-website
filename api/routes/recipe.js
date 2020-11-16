const express = require("express");
var { url, soap } = require("./config.js");
url += "/recipe/?wsdl";

const router = express.Router();

router.get("/:id", function (req, res, next) {
  if (req.params.id !== undefined && req.params.id > 0) {
    console.log(url);
    soap.createClient(url, function (err, client) {
      const args = {
        id: req.params.id,
      };
      client.getRecipe(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send("ID (id) must be positive integer");
  }
});

router.post("/add", function (req, res, next) {
  if (req.body.chocoid && req.body.ids && req.body.amounts) {
    const args = {
      chocoid: req.body.chocoid,
      price: req.nbody.price,
      ids: req.body.ids,
      amounts: req.body.amounts,
    };
    soap.createClient(url, function (err, client) {
      client.addRecipe(args, function (err, result) {
        res.send(result);
      });
    });
  } else {
    res.send(
      "Body must include: chocoid(int), price(int), ids(array of int), amounts(array of int)."
    );
  }
});

module.exports = router;
