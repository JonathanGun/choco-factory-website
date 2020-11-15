const express = require("express");
var { soapClient } = require("./config.js");

const router = express.Router();

router.get("/", function (req, res, next) {
  /*
   * get all available functions
   */
  soapClient
    .getAllFunctions()
    .then((functionArray) => {
      console.log(functionArray);
      res.send(functionArray);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get("/help/:methodName", function (req, res, next) {
  /*
   * get the method params by given methodName
   */
  soapClient
    .getMethodParamsByName(req.params.methodName)
    .then((methodParams) => {
      console.log(methodParams.request);
      console.log(methodParams.response);
      res.send(methodParams);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const doSoap = (res, method, args) => {
  /*
   * call soap method
   */
  soapClient
    .call({
      method: method,
      params: args,
    })
    .then((callResponse) => {
      console.log(callResponse.data); // response data as json
      console.log(callResponse.body); // response body
      console.log(callResponse.header); //response header
      res.send(callResponse.data);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = router;
