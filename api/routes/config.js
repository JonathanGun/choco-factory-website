const soap = require("soap");
const EasySoap = require("easysoap");
const url = "http://localhost:8080";

const params = {
  host: url,
  path: "/",
  wsdl: "/balance/?wsdl",
};

const opts = {
  secure: false,
};
const soapClient = EasySoap(params, opts);

exports.url = url;
exports.params = params;
exports.opts = opts;
exports.soapClient = soapClient;
exports.soap = soap;
