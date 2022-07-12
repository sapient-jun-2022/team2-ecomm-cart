"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCart = exports.deleteProductToCart = exports.addProductToCart = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _userModel = require("../models/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addProductToCart = exports.addProductToCart = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var user, cart, addProductTotal, total, products, productIndex, currentProduct, _cart;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userModel2.default.findOne({ _id: req.user._id }).select({ cart: 1 });

          case 2:
            user = _context.sent;
            cart = user.cart;
            addProductTotal = parseFloat(req.body.product.price * req.body.product.quantity).toFixed(2);

            if (cart) {
              total = +cart.total + addProductToCart;
              products = [].concat((0, _toConsumableArray3.default)(cart.products));
              productIndex = products.findIndex(function (product) {
                return product.productId === req.body.product._id;
              });
              currentProduct = products[productIndex];

              if (currentProduct) {
                currentProduct.quantity += +req.body.product.quantity;
                currentProduct.price = req.body.product.price;
                currentProduct.subtotal = parseFloat(currentProduct.quantity * currentProduct.price);
                products[productIndex] = currentProduct;
              } else {
                products.push((0, _extends3.default)({}, req.body.product, {
                  productId: req.body.product._id,
                  subtotal: addProductTotal
                }));
              }

              cart.products = products;
              cart.total = parseFloat(products.reduce(function (total, _product) {
                return total + +_product.subtotal;
              }, 0)).toFixed(2);

              user.cart = cart;
            } else {
              _cart = {
                products: (0, _extends3.default)({}, req.body.product, {
                  productId: req.body.product._id,
                  subtotal: parseFloat(req.body.product.price * req.body.product.quantity)
                }),
                total: addProductTotal
              };

              user.cart = _cart;
            }

            user.save(function (err, updatedUser) {
              if (err) {
                res.send(err);
              } else {
                res.json({
                  status: true,
                  cart: updatedUser.cart
                });
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addProductToCart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var deleteProductToCart = exports.deleteProductToCart = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var user, cart, products, productIndex, product;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userModel2.default.findOne({ _id: req.user._id }).select({ cart: 1 });

          case 2:
            user = _context2.sent;
            cart = user.cart;

            if (!cart) {
              _context2.next = 20;
              break;
            }

            products = [].concat((0, _toConsumableArray3.default)(cart.products));
            productIndex = products.findIndex(function (_product) {
              return _product.productId === req.body.product._id;
            });
            product = products[productIndex];

            product.quantity -= req.body.product.quantity;
            product.subtotal = parseFloat(product.price * product.quantity).toFixed(2);
            products[productIndex] = product;
            if (product.quantity <= 0) {
              products.splice(productIndex, 1);
            }
            cart.products = products;
            cart.total = parseFloat(products.reduce(function (total, _product) {
              return total + _product.subtotal;
            }, 0)).toFixed(2);

            user.cart = cart;
            _context2.next = 17;
            return user.save();

          case 17:
            res.json({ status: true, cart: cart });

            _context2.next = 21;
            break;

          case 20:
            res.json(cart);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function deleteProductToCart(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getCart = exports.getCart = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userModel2.default.findOne({ _id: req.user._id }).select({ cart: 1 });

          case 2:
            user = _context3.sent;

            res.json({ status: true, cart: user.cart });
            //res.send("GET: get cart");

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getCart(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();