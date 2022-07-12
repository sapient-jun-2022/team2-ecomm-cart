"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cartRoutes = require("./routes/cartRoutes");

var _cartRoutes2 = _interopRequireDefault(_cartRoutes);

var _dotenv = require("dotenv");

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();
var PORT = process && process.env && process.env.PORT || undefined || 3002;
//import { routes } from "./routes";
var app = (0, _express2.default)();

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(process && process.env && process.env.MONGO_CONNECT || "mongodb+srv://himanshum:8ArdZzmKTnG7La5J@cluster0.aggqj.mongodb.net/ecomm?retryWrites=true&w=majority");

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json({ type: "application/json" }));

app.use("/cart", _cartRoutes2.default);
app.listen(PORT, function () {
    console.log("Cart is connected to " + PORT);
});