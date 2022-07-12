"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cartModel = require("./cartModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = exports.UserSchema = new _mongoose.Schema({
    email: {
        type: String,
        required: "Please enter Email Address"
    },
    password: {
        type: String,
        required: "Please enter Password"
    },
    name: {
        type: String,
        required: "Please enter Full Name"
    },
    cart: _cartModel.CartSchema,
    createdat: {
        type: Date,
        default: Date.now
    }

});
var User = _mongoose2.default.model("User", UserSchema);
exports.default = User;