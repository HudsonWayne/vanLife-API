"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // dotenv.config();

var PORT = process.env.PORT || 5000;
var MONGOURL = process.env.MONGO_URI || "mongodb+srv://vanLifeAPI:qwerty12345@vanlifecluster.t679a.mongodb.net/?retryWrites=true&w=majority&appName=VanLifeCluster";

_mongoose["default"].connect(MONGOURL).then(function () {
  console.log("Database is successfully configured");
  app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
  });
})["catch"](function (error) {
  return console.log("error");
});

console.log(MONGOURL);