"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _http = require("http");

var http = _interopRequireWildcard(_http);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _cartController = require("../controllers/cartController");

var CartController = _interopRequireWildcard(_cartController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cartRouter = _express2.default.Router();

function checkAuth(req, res, next) {
  var bearerHeader = req.headers["authorization"];
  var bearerArray = bearerHeader.split(" ");
  var token = bearerArray[1];
  req.token = token;
  jwt.verify(token, process && process.env && process.env.JWT_SECRET_KEY || undefined, function (err, data) {
    if (err) {
      // res.sendStatus(403);
      res.json({
        status: false,
        errorCode: 401,
        errMessage: "Authorizatin failed."
      });
    } else {
      req.user = data.user;
      delete req.user.password;
      next();
    }
  });
}

function checkAuthV2(req, res, next) {
  console.log('HH', req.headers);
  _request2.default.post((process && process.env && process.env.API_ENDPOINT || "https://ecomm-user.herokuapp.com") + "/user/authorize", {
    headers: {
      "Authorization": req.headers.authorization,
      "Content-Type": "application/json"
    }
  }, function (err, response, body) {
    console.log(err);
    var resJSON = JSON.parse(body);
    if (resJSON.status && resJSON.user) {
      req.user = resJSON.user;
      next();
    } else {
      res.json(resJSON);
    }
  });
}

cartRouter.use(checkAuthV2);

cartRouter.route("/").get(CartController.getCart);
cartRouter.route("/add").post(CartController.addProductToCart);
cartRouter.route("/delete").post(CartController.deleteProductToCart);

exports.default = cartRouter;