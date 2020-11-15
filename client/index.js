// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// // parse requests of content-type: application/json
// app.use(bodyParser.json());

// // parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

getRecipeArgs = {
  id: 1,
};

addRecipeArgs = {
  chocoid: 2,
  ids: [1, 2],
  amounts: [2, 3],
};

addRequestArgs = {
  chocoid: 1,
  amount: 2,
};

getRequestStatusArgs = {
  id: 2,
};

getRequestArgs = {
  id: 2,
};

deliverRequestArgs = {
  id: 2,
};

getChocoStockArgs = {
  id: 1,
};

getIngredientStockArgs = {
  id: 3,
};

getIngredientStockSumArgs = {
  id: 28,
};

getBalanceArgs = {};

addBalanceArgs = {
  amount: 10000,
};

updateBalanceArgs = {
  amount: 1000000,
};

processArgs = {
  chocoid: 4,
  amount: 1,
};

// require("./application/routes/ingredient.routes.js")(app);
var soap = require("soap");
var url = "http://localhost:8080/?wsdl";

soap.createClient(url, function (err, client) {
  // console.log(client);
  // console.log(JSON.stringify(client.describe(), true, 2));
  // Request
  // client.getRequest(getRequestArgs, function (err, result) {
  //   console.log(result);
  // });
  // client.getRequestStatus(getRequestStatusArgs, function (err, result) {
  //   console.log(result);
  // });
  // client.addRequest(addRequestArgs, function (err, result) {
  //   console.log(result);
  // });
  // client.deliverRequest(deliverRequestArgs, function (err, result) {
  //   console.log(result);
  // });
  // Recipe
  // client.getRecipe(getRecipeArgs, function (err, result) {
  //   console.log(result);
  // });
  // client.addRecipe(addChocoArgs, function (err, result) {
  //   console.log(result);
  // });
  // ChocoStock
  // client.getChocoStock(getChocoStockArgs, function (err, result) {
  //   console.log(result);
  // });
  // IngredientStock
  // client.getIngredientStock(getIngredientStockArgs, function (err, result) {
  //   console.log(result);
  // });
  // client.getIngredientStockSum(getIngredientStockSumArgs, function (
  //   err,
  //   result
  // ) {
  //   console.log(result);
  // });
  // client.process(processArgs, function (err, result) {
  //   console.log(result);
  // });
  // Balance
  client.getBalance(getBalanceArgs, function (
    err,
    result,
    rawResponse,
    soapHeader,
    rawRequest
  ) {
    console.log(rawResponse);
    console.log(soapHeader);
    console.log(rawRequest);
    console.log(result);
  });
  // client.addBalance(addBalanceArgs, function (err, result) {
  //   console.log(result);
  // });
});

// // set port, listen for requests
// app.listen(3001, () => {
//   console.log("Server is running on port 3001.");
// });
