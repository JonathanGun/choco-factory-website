const express = require("express");
var url = "http://localhost:3000";
const fetch = require("node-fetch");

const router = express.Router();

router.get("/:id", function (req, res, next) {
  fetch(
    url +
      "/" +
      req.params.id +
      "?price=" +
      (req.query.price === "false" ? "false" : "true"),
    {
      method: "GET",
    }
  )
    .then((ress) => ress.text())
    .then((ress) => {
      res.send(ress);
    });
});

router.get("/", function (req, res, next) {
  fetch(url + "?price=" + (req.query.price === "false" ? "false" : "true"), {
    method: "GET",
  })
    .then((ress) => ress.text())
    .then((ress) => {
      res.send(ress);
    });
});

router.post("/", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  fetch(url, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((ress) => ress.text())
    .then((ress) => {
      res.send(ress);
    });
});

router.post("/buy", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  fetch(url + "/buy", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((ress) => ress.text())
    .then((ress) => {
      res.send(ress);
    });
});

module.exports = router;
