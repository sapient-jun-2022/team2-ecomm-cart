"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSchema = new _mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: 0
  },
  price: {
    type: Number,
    required: 0
  },
  image: String,
  description: String,
  subtotal: {
    type: Number,
    required: true
  }
}, { _id: false });

var CartSchema = exports.CartSchema = new _mongoose.Schema({
  products: [ProductSchema],
  total: {
    type: Number,
    required: false
  }
});
var Cart = _mongoose2.default.model("Cart", CartSchema);
exports.default = Cart;