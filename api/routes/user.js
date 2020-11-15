const express = require("express");
var { url, soap } = require("./config.js");

const router = express.Router();

url += "/user/?wsdl";

router.post("/login", function (req, res, next) {
  console.log(req.body);
  if (req.body.username !== undefined) {
    if (req.body.password !== undefined) {
      const args = {
        username: req.body.username,
        password: req.body.password,
      };
      soap.createClient(url, function (err, client) {
        client.login(args, function (err, result) {
          res.send(result);
        });
      });
    } else {
      res.send("Password must be a String and can't be empty");
    }
  } else {
    res.send("Username must be a String and can't be empty");
  }
});

module.exports = router;
