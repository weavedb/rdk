
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // sdk/contracts/node_modules/ramda/src/F.js
  var require_F = __commonJS({
    "sdk/contracts/node_modules/ramda/src/F.js"(exports, module) {
      var F = function() {
        return false;
      };
      module.exports = F;
    }
  });

  // sdk/contracts/node_modules/ramda/src/T.js
  var require_T = __commonJS({
    "sdk/contracts/node_modules/ramda/src/T.js"(exports, module) {
      var T = function() {
        return true;
      };
      module.exports = T;
    }
  });

  // sdk/contracts/node_modules/ramda/src/__.js
  var require__ = __commonJS({
    "sdk/contracts/node_modules/ramda/src/__.js"(exports, module) {
      module.exports = {
        "@@functional/placeholder": true
      };
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isPlaceholder.js
  var require_isPlaceholder = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isPlaceholder.js"(exports, module) {
      function _isPlaceholder(a) {
        return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
      }
      module.exports = _isPlaceholder;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_curry1.js
  var require_curry1 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_curry1.js"(exports, module) {
      var _isPlaceholder = require_isPlaceholder();
      function _curry1(fn) {
        return function f1(a) {
          if (arguments.length === 0 || _isPlaceholder(a)) {
            return f1;
          } else {
            return fn.apply(this, arguments);
          }
        };
      }
      module.exports = _curry1;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_curry2.js
  var require_curry2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_curry2.js"(exports, module) {
      var _curry1 = require_curry1();
      var _isPlaceholder = require_isPlaceholder();
      function _curry2(fn) {
        return function f2(a, b) {
          switch (arguments.length) {
            case 0:
              return f2;
            case 1:
              return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
                return fn(a, _b);
              });
            default:
              return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
                return fn(_a, b);
              }) : _isPlaceholder(b) ? _curry1(function(_b) {
                return fn(a, _b);
              }) : fn(a, b);
          }
        };
      }
      module.exports = _curry2;
    }
  });

  // sdk/contracts/node_modules/ramda/src/add.js
  var require_add = __commonJS({
    "sdk/contracts/node_modules/ramda/src/add.js"(exports, module) {
      var _curry2 = require_curry2();
      var add = /* @__PURE__ */ _curry2(function add2(a, b) {
        return Number(a) + Number(b);
      });
      module.exports = add;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_concat.js
  var require_concat = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_concat.js"(exports, module) {
      function _concat(set1, set2) {
        set1 = set1 || [];
        set2 = set2 || [];
        var idx;
        var len1 = set1.length;
        var len2 = set2.length;
        var result = [];
        idx = 0;
        while (idx < len1) {
          result[result.length] = set1[idx];
          idx += 1;
        }
        idx = 0;
        while (idx < len2) {
          result[result.length] = set2[idx];
          idx += 1;
        }
        return result;
      }
      module.exports = _concat;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_arity.js
  var require_arity = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_arity.js"(exports, module) {
      function _arity(n, fn) {
        switch (n) {
          case 0:
            return function() {
              return fn.apply(this, arguments);
            };
          case 1:
            return function(a0) {
              return fn.apply(this, arguments);
            };
          case 2:
            return function(a0, a1) {
              return fn.apply(this, arguments);
            };
          case 3:
            return function(a0, a1, a2) {
              return fn.apply(this, arguments);
            };
          case 4:
            return function(a0, a1, a2, a3) {
              return fn.apply(this, arguments);
            };
          case 5:
            return function(a0, a1, a2, a3, a4) {
              return fn.apply(this, arguments);
            };
          case 6:
            return function(a0, a1, a2, a3, a4, a5) {
              return fn.apply(this, arguments);
            };
          case 7:
            return function(a0, a1, a2, a3, a4, a5, a6) {
              return fn.apply(this, arguments);
            };
          case 8:
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
              return fn.apply(this, arguments);
            };
          case 9:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
              return fn.apply(this, arguments);
            };
          case 10:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
              return fn.apply(this, arguments);
            };
          default:
            throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
        }
      }
      module.exports = _arity;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_curryN.js
  var require_curryN = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_curryN.js"(exports, module) {
      var _arity = require_arity();
      var _isPlaceholder = require_isPlaceholder();
      function _curryN(length, received, fn) {
        return function() {
          var combined = [];
          var argsIdx = 0;
          var left = length;
          var combinedIdx = 0;
          while (combinedIdx < received.length || argsIdx < arguments.length) {
            var result;
            if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
              result = received[combinedIdx];
            } else {
              result = arguments[argsIdx];
              argsIdx += 1;
            }
            combined[combinedIdx] = result;
            if (!_isPlaceholder(result)) {
              left -= 1;
            }
            combinedIdx += 1;
          }
          return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
        };
      }
      module.exports = _curryN;
    }
  });

  // sdk/contracts/node_modules/ramda/src/curryN.js
  var require_curryN2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/curryN.js"(exports, module) {
      var _arity = require_arity();
      var _curry1 = require_curry1();
      var _curry2 = require_curry2();
      var _curryN = require_curryN();
      var curryN = /* @__PURE__ */ _curry2(function curryN2(length, fn) {
        if (length === 1) {
          return _curry1(fn);
        }
        return _arity(length, _curryN(length, [], fn));
      });
      module.exports = curryN;
    }
  });

  // sdk/contracts/node_modules/ramda/src/addIndex.js
  var require_addIndex = __commonJS({
    "sdk/contracts/node_modules/ramda/src/addIndex.js"(exports, module) {
      var _concat = require_concat();
      var _curry1 = require_curry1();
      var curryN = require_curryN2();
      var addIndex = /* @__PURE__ */ _curry1(function addIndex2(fn) {
        return curryN(fn.length, function() {
          var idx = 0;
          var origFn = arguments[0];
          var list = arguments[arguments.length - 1];
          var args = Array.prototype.slice.call(arguments, 0);
          args[0] = function() {
            var result = origFn.apply(this, _concat(arguments, [idx, list]));
            idx += 1;
            return result;
          };
          return fn.apply(this, args);
        });
      });
      module.exports = addIndex;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_curry3.js
  var require_curry3 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_curry3.js"(exports, module) {
      var _curry1 = require_curry1();
      var _curry2 = require_curry2();
      var _isPlaceholder = require_isPlaceholder();
      function _curry3(fn) {
        return function f3(a, b, c) {
          switch (arguments.length) {
            case 0:
              return f3;
            case 1:
              return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
                return fn(a, _b, _c);
              });
            case 2:
              return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
                return fn(_a, b, _c);
              }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
                return fn(a, _b, _c);
              }) : _curry1(function(_c) {
                return fn(a, b, _c);
              });
            default:
              return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
                return fn(_a, _b, c);
              }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
                return fn(_a, b, _c);
              }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
                return fn(a, _b, _c);
              }) : _isPlaceholder(a) ? _curry1(function(_a) {
                return fn(_a, b, c);
              }) : _isPlaceholder(b) ? _curry1(function(_b) {
                return fn(a, _b, c);
              }) : _isPlaceholder(c) ? _curry1(function(_c) {
                return fn(a, b, _c);
              }) : fn(a, b, c);
          }
        };
      }
      module.exports = _curry3;
    }
  });

  // sdk/contracts/node_modules/ramda/src/adjust.js
  var require_adjust = __commonJS({
    "sdk/contracts/node_modules/ramda/src/adjust.js"(exports, module) {
      var _concat = require_concat();
      var _curry3 = require_curry3();
      var adjust = /* @__PURE__ */ _curry3(function adjust2(idx, fn, list) {
        var len = list.length;
        if (idx >= len || idx < -len) {
          return list;
        }
        var _idx = (len + idx) % len;
        var _list = _concat(list);
        _list[_idx] = fn(list[_idx]);
        return _list;
      });
      module.exports = adjust;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isArray.js
  var require_isArray = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isArray.js"(exports, module) {
      module.exports = Array.isArray || function _isArray(val) {
        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
      };
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isTransformer.js
  var require_isTransformer = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isTransformer.js"(exports, module) {
      function _isTransformer(obj) {
        return obj != null && typeof obj["@@transducer/step"] === "function";
      }
      module.exports = _isTransformer;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_dispatchable.js
  var require_dispatchable = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_dispatchable.js"(exports, module) {
      var _isArray = require_isArray();
      var _isTransformer = require_isTransformer();
      function _dispatchable(methodNames, transducerCreator, fn) {
        return function() {
          if (arguments.length === 0) {
            return fn();
          }
          var obj = arguments[arguments.length - 1];
          if (!_isArray(obj)) {
            var idx = 0;
            while (idx < methodNames.length) {
              if (typeof obj[methodNames[idx]] === "function") {
                return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
              }
              idx += 1;
            }
            if (_isTransformer(obj)) {
              var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
              return transducer(obj);
            }
          }
          return fn.apply(this, arguments);
        };
      }
      module.exports = _dispatchable;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_reduced.js
  var require_reduced = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_reduced.js"(exports, module) {
      function _reduced(x) {
        return x && x["@@transducer/reduced"] ? x : {
          "@@transducer/value": x,
          "@@transducer/reduced": true
        };
      }
      module.exports = _reduced;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xfBase.js
  var require_xfBase = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xfBase.js"(exports, module) {
      module.exports = {
        init: function() {
          return this.xf["@@transducer/init"]();
        },
        result: function(result) {
          return this.xf["@@transducer/result"](result);
        }
      };
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xall.js
  var require_xall = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xall.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduced = require_reduced();
      var _xfBase = require_xfBase();
      var XAll = /* @__PURE__ */ function() {
        function XAll2(f, xf) {
          this.xf = xf;
          this.f = f;
          this.all = true;
        }
        XAll2.prototype["@@transducer/init"] = _xfBase.init;
        XAll2.prototype["@@transducer/result"] = function(result) {
          if (this.all) {
            result = this.xf["@@transducer/step"](result, true);
          }
          return this.xf["@@transducer/result"](result);
        };
        XAll2.prototype["@@transducer/step"] = function(result, input) {
          if (!this.f(input)) {
            this.all = false;
            result = _reduced(this.xf["@@transducer/step"](result, false));
          }
          return result;
        };
        return XAll2;
      }();
      var _xall = /* @__PURE__ */ _curry2(function _xall2(f, xf) {
        return new XAll(f, xf);
      });
      module.exports = _xall;
    }
  });

  // sdk/contracts/node_modules/ramda/src/all.js
  var require_all = __commonJS({
    "sdk/contracts/node_modules/ramda/src/all.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xall = require_xall();
      var all = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["all"], _xall, function all2(fn, list) {
          var idx = 0;
          while (idx < list.length) {
            if (!fn(list[idx])) {
              return false;
            }
            idx += 1;
          }
          return true;
        })
      );
      module.exports = all;
    }
  });

  // sdk/contracts/node_modules/ramda/src/max.js
  var require_max = __commonJS({
    "sdk/contracts/node_modules/ramda/src/max.js"(exports, module) {
      var _curry2 = require_curry2();
      var max = /* @__PURE__ */ _curry2(function max2(a, b) {
        return b > a ? b : a;
      });
      module.exports = max;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_map.js
  var require_map = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_map.js"(exports, module) {
      function _map(fn, functor) {
        var idx = 0;
        var len = functor.length;
        var result = Array(len);
        while (idx < len) {
          result[idx] = fn(functor[idx]);
          idx += 1;
        }
        return result;
      }
      module.exports = _map;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isString.js
  var require_isString = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isString.js"(exports, module) {
      function _isString(x) {
        return Object.prototype.toString.call(x) === "[object String]";
      }
      module.exports = _isString;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isArrayLike.js
  var require_isArrayLike = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isArrayLike.js"(exports, module) {
      var _curry1 = require_curry1();
      var _isArray = require_isArray();
      var _isString = require_isString();
      var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x) {
        if (_isArray(x)) {
          return true;
        }
        if (!x) {
          return false;
        }
        if (typeof x !== "object") {
          return false;
        }
        if (_isString(x)) {
          return false;
        }
        if (x.length === 0) {
          return true;
        }
        if (x.length > 0) {
          return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
        }
        return false;
      });
      module.exports = _isArrayLike;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xwrap.js
  var require_xwrap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xwrap.js"(exports, module) {
      var XWrap = /* @__PURE__ */ function() {
        function XWrap2(fn) {
          this.f = fn;
        }
        XWrap2.prototype["@@transducer/init"] = function() {
          throw new Error("init not implemented on XWrap");
        };
        XWrap2.prototype["@@transducer/result"] = function(acc) {
          return acc;
        };
        XWrap2.prototype["@@transducer/step"] = function(acc, x) {
          return this.f(acc, x);
        };
        return XWrap2;
      }();
      function _xwrap(fn) {
        return new XWrap(fn);
      }
      module.exports = _xwrap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/bind.js
  var require_bind = __commonJS({
    "sdk/contracts/node_modules/ramda/src/bind.js"(exports, module) {
      var _arity = require_arity();
      var _curry2 = require_curry2();
      var bind = /* @__PURE__ */ _curry2(function bind2(fn, thisObj) {
        return _arity(fn.length, function() {
          return fn.apply(thisObj, arguments);
        });
      });
      module.exports = bind;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_reduce.js
  var require_reduce = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_reduce.js"(exports, module) {
      var _isArrayLike = require_isArrayLike();
      var _xwrap = require_xwrap();
      var bind = require_bind();
      function _arrayReduce(xf, acc, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
          acc = xf["@@transducer/step"](acc, list[idx]);
          if (acc && acc["@@transducer/reduced"]) {
            acc = acc["@@transducer/value"];
            break;
          }
          idx += 1;
        }
        return xf["@@transducer/result"](acc);
      }
      function _iterableReduce(xf, acc, iter) {
        var step = iter.next();
        while (!step.done) {
          acc = xf["@@transducer/step"](acc, step.value);
          if (acc && acc["@@transducer/reduced"]) {
            acc = acc["@@transducer/value"];
            break;
          }
          step = iter.next();
        }
        return xf["@@transducer/result"](acc);
      }
      function _methodReduce(xf, acc, obj, methodName) {
        return xf["@@transducer/result"](obj[methodName](bind(xf["@@transducer/step"], xf), acc));
      }
      var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
      function _reduce(fn, acc, list) {
        if (typeof fn === "function") {
          fn = _xwrap(fn);
        }
        if (_isArrayLike(list)) {
          return _arrayReduce(fn, acc, list);
        }
        if (typeof list["fantasy-land/reduce"] === "function") {
          return _methodReduce(fn, acc, list, "fantasy-land/reduce");
        }
        if (list[symIterator] != null) {
          return _iterableReduce(fn, acc, list[symIterator]());
        }
        if (typeof list.next === "function") {
          return _iterableReduce(fn, acc, list);
        }
        if (typeof list.reduce === "function") {
          return _methodReduce(fn, acc, list, "reduce");
        }
        throw new TypeError("reduce: list must be array or iterable");
      }
      module.exports = _reduce;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xmap.js
  var require_xmap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xmap.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XMap = /* @__PURE__ */ function() {
        function XMap2(f, xf) {
          this.xf = xf;
          this.f = f;
        }
        XMap2.prototype["@@transducer/init"] = _xfBase.init;
        XMap2.prototype["@@transducer/result"] = _xfBase.result;
        XMap2.prototype["@@transducer/step"] = function(result, input) {
          return this.xf["@@transducer/step"](result, this.f(input));
        };
        return XMap2;
      }();
      var _xmap = /* @__PURE__ */ _curry2(function _xmap2(f, xf) {
        return new XMap(f, xf);
      });
      module.exports = _xmap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_has.js
  var require_has = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_has.js"(exports, module) {
      function _has(prop, obj) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module.exports = _has;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isArguments.js
  var require_isArguments = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isArguments.js"(exports, module) {
      var _has = require_has();
      var toString = Object.prototype.toString;
      var _isArguments = /* @__PURE__ */ function() {
        return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
          return toString.call(x) === "[object Arguments]";
        } : function _isArguments2(x) {
          return _has("callee", x);
        };
      }();
      module.exports = _isArguments;
    }
  });

  // sdk/contracts/node_modules/ramda/src/keys.js
  var require_keys = __commonJS({
    "sdk/contracts/node_modules/ramda/src/keys.js"(exports, module) {
      var _curry1 = require_curry1();
      var _has = require_has();
      var _isArguments = require_isArguments();
      var hasEnumBug = !/* @__PURE__ */ {
        toString: null
      }.propertyIsEnumerable("toString");
      var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
      var hasArgsEnumBug = /* @__PURE__ */ function() {
        "use strict";
        return arguments.propertyIsEnumerable("length");
      }();
      var contains = function contains2(list, item) {
        var idx = 0;
        while (idx < list.length) {
          if (list[idx] === item) {
            return true;
          }
          idx += 1;
        }
        return false;
      };
      var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
        return Object(obj) !== obj ? [] : Object.keys(obj);
      }) : /* @__PURE__ */ _curry1(function keys2(obj) {
        if (Object(obj) !== obj) {
          return [];
        }
        var prop, nIdx;
        var ks = [];
        var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
        for (prop in obj) {
          if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
            ks[ks.length] = prop;
          }
        }
        if (hasEnumBug) {
          nIdx = nonEnumerableProps.length - 1;
          while (nIdx >= 0) {
            prop = nonEnumerableProps[nIdx];
            if (_has(prop, obj) && !contains(ks, prop)) {
              ks[ks.length] = prop;
            }
            nIdx -= 1;
          }
        }
        return ks;
      });
      module.exports = keys;
    }
  });

  // sdk/contracts/node_modules/ramda/src/map.js
  var require_map2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/map.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _map = require_map();
      var _reduce = require_reduce();
      var _xmap = require_xmap();
      var curryN = require_curryN2();
      var keys = require_keys();
      var map = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["fantasy-land/map", "map"], _xmap, function map2(fn, functor) {
          switch (Object.prototype.toString.call(functor)) {
            case "[object Function]":
              return curryN(functor.length, function() {
                return fn.call(this, functor.apply(this, arguments));
              });
            case "[object Object]":
              return _reduce(function(acc, key) {
                acc[key] = fn(functor[key]);
                return acc;
              }, {}, keys(functor));
            default:
              return _map(fn, functor);
          }
        })
      );
      module.exports = map;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isInteger.js
  var require_isInteger = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isInteger.js"(exports, module) {
      module.exports = Number.isInteger || function _isInteger(n) {
        return n << 0 === n;
      };
    }
  });

  // sdk/contracts/node_modules/ramda/src/nth.js
  var require_nth = __commonJS({
    "sdk/contracts/node_modules/ramda/src/nth.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isString = require_isString();
      var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
        var idx = offset < 0 ? list.length + offset : offset;
        return _isString(list) ? list.charAt(idx) : list[idx];
      });
      module.exports = nth;
    }
  });

  // sdk/contracts/node_modules/ramda/src/prop.js
  var require_prop = __commonJS({
    "sdk/contracts/node_modules/ramda/src/prop.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isInteger = require_isInteger();
      var nth = require_nth();
      var prop = /* @__PURE__ */ _curry2(function prop2(p, obj) {
        if (obj == null) {
          return;
        }
        return _isInteger(p) ? nth(p, obj) : obj[p];
      });
      module.exports = prop;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pluck.js
  var require_pluck = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pluck.js"(exports, module) {
      var _curry2 = require_curry2();
      var map = require_map2();
      var prop = require_prop();
      var pluck = /* @__PURE__ */ _curry2(function pluck2(p, list) {
        return map(prop(p), list);
      });
      module.exports = pluck;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reduce.js
  var require_reduce2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reduce.js"(exports, module) {
      var _curry3 = require_curry3();
      var _reduce = require_reduce();
      var reduce = /* @__PURE__ */ _curry3(_reduce);
      module.exports = reduce;
    }
  });

  // sdk/contracts/node_modules/ramda/src/allPass.js
  var require_allPass = __commonJS({
    "sdk/contracts/node_modules/ramda/src/allPass.js"(exports, module) {
      var _curry1 = require_curry1();
      var curryN = require_curryN2();
      var max = require_max();
      var pluck = require_pluck();
      var reduce = require_reduce2();
      var allPass = /* @__PURE__ */ _curry1(function allPass2(preds) {
        return curryN(reduce(max, 0, pluck("length", preds)), function() {
          var idx = 0;
          var len = preds.length;
          while (idx < len) {
            if (!preds[idx].apply(this, arguments)) {
              return false;
            }
            idx += 1;
          }
          return true;
        });
      });
      module.exports = allPass;
    }
  });

  // sdk/contracts/node_modules/ramda/src/always.js
  var require_always = __commonJS({
    "sdk/contracts/node_modules/ramda/src/always.js"(exports, module) {
      var _curry1 = require_curry1();
      var always = /* @__PURE__ */ _curry1(function always2(val) {
        return function() {
          return val;
        };
      });
      module.exports = always;
    }
  });

  // sdk/contracts/node_modules/ramda/src/and.js
  var require_and = __commonJS({
    "sdk/contracts/node_modules/ramda/src/and.js"(exports, module) {
      var _curry2 = require_curry2();
      var and = /* @__PURE__ */ _curry2(function and2(a, b) {
        return a && b;
      });
      module.exports = and;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xany.js
  var require_xany = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xany.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduced = require_reduced();
      var _xfBase = require_xfBase();
      var XAny = /* @__PURE__ */ function() {
        function XAny2(f, xf) {
          this.xf = xf;
          this.f = f;
          this.any = false;
        }
        XAny2.prototype["@@transducer/init"] = _xfBase.init;
        XAny2.prototype["@@transducer/result"] = function(result) {
          if (!this.any) {
            result = this.xf["@@transducer/step"](result, false);
          }
          return this.xf["@@transducer/result"](result);
        };
        XAny2.prototype["@@transducer/step"] = function(result, input) {
          if (this.f(input)) {
            this.any = true;
            result = _reduced(this.xf["@@transducer/step"](result, true));
          }
          return result;
        };
        return XAny2;
      }();
      var _xany = /* @__PURE__ */ _curry2(function _xany2(f, xf) {
        return new XAny(f, xf);
      });
      module.exports = _xany;
    }
  });

  // sdk/contracts/node_modules/ramda/src/any.js
  var require_any = __commonJS({
    "sdk/contracts/node_modules/ramda/src/any.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xany = require_xany();
      var any = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["any"], _xany, function any2(fn, list) {
          var idx = 0;
          while (idx < list.length) {
            if (fn(list[idx])) {
              return true;
            }
            idx += 1;
          }
          return false;
        })
      );
      module.exports = any;
    }
  });

  // sdk/contracts/node_modules/ramda/src/anyPass.js
  var require_anyPass = __commonJS({
    "sdk/contracts/node_modules/ramda/src/anyPass.js"(exports, module) {
      var _curry1 = require_curry1();
      var curryN = require_curryN2();
      var max = require_max();
      var pluck = require_pluck();
      var reduce = require_reduce2();
      var anyPass = /* @__PURE__ */ _curry1(function anyPass2(preds) {
        return curryN(reduce(max, 0, pluck("length", preds)), function() {
          var idx = 0;
          var len = preds.length;
          while (idx < len) {
            if (preds[idx].apply(this, arguments)) {
              return true;
            }
            idx += 1;
          }
          return false;
        });
      });
      module.exports = anyPass;
    }
  });

  // sdk/contracts/node_modules/ramda/src/ap.js
  var require_ap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/ap.js"(exports, module) {
      var _concat = require_concat();
      var _curry2 = require_curry2();
      var _reduce = require_reduce();
      var map = require_map2();
      var ap = /* @__PURE__ */ _curry2(function ap2(applyF, applyX) {
        return typeof applyX["fantasy-land/ap"] === "function" ? applyX["fantasy-land/ap"](applyF) : typeof applyF.ap === "function" ? applyF.ap(applyX) : typeof applyF === "function" ? function(x) {
          return applyF(x)(applyX(x));
        } : _reduce(function(acc, f) {
          return _concat(acc, map(f, applyX));
        }, [], applyF);
      });
      module.exports = ap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_aperture.js
  var require_aperture = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_aperture.js"(exports, module) {
      function _aperture(n, list) {
        var idx = 0;
        var limit = list.length - (n - 1);
        var acc = new Array(limit >= 0 ? limit : 0);
        while (idx < limit) {
          acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
          idx += 1;
        }
        return acc;
      }
      module.exports = _aperture;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xaperture.js
  var require_xaperture = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xaperture.js"(exports, module) {
      var _concat = require_concat();
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XAperture = /* @__PURE__ */ function() {
        function XAperture2(n, xf) {
          this.xf = xf;
          this.pos = 0;
          this.full = false;
          this.acc = new Array(n);
        }
        XAperture2.prototype["@@transducer/init"] = _xfBase.init;
        XAperture2.prototype["@@transducer/result"] = function(result) {
          this.acc = null;
          return this.xf["@@transducer/result"](result);
        };
        XAperture2.prototype["@@transducer/step"] = function(result, input) {
          this.store(input);
          return this.full ? this.xf["@@transducer/step"](result, this.getCopy()) : result;
        };
        XAperture2.prototype.store = function(input) {
          this.acc[this.pos] = input;
          this.pos += 1;
          if (this.pos === this.acc.length) {
            this.pos = 0;
            this.full = true;
          }
        };
        XAperture2.prototype.getCopy = function() {
          return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
        };
        return XAperture2;
      }();
      var _xaperture = /* @__PURE__ */ _curry2(function _xaperture2(n, xf) {
        return new XAperture(n, xf);
      });
      module.exports = _xaperture;
    }
  });

  // sdk/contracts/node_modules/ramda/src/aperture.js
  var require_aperture2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/aperture.js"(exports, module) {
      var _aperture = require_aperture();
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xaperture = require_xaperture();
      var aperture = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xaperture, _aperture)
      );
      module.exports = aperture;
    }
  });

  // sdk/contracts/node_modules/ramda/src/append.js
  var require_append = __commonJS({
    "sdk/contracts/node_modules/ramda/src/append.js"(exports, module) {
      var _concat = require_concat();
      var _curry2 = require_curry2();
      var append = /* @__PURE__ */ _curry2(function append2(el, list) {
        return _concat(list, [el]);
      });
      module.exports = append;
    }
  });

  // sdk/contracts/node_modules/ramda/src/apply.js
  var require_apply = __commonJS({
    "sdk/contracts/node_modules/ramda/src/apply.js"(exports, module) {
      var _curry2 = require_curry2();
      var apply = /* @__PURE__ */ _curry2(function apply2(fn, args) {
        return fn.apply(this, args);
      });
      module.exports = apply;
    }
  });

  // sdk/contracts/node_modules/ramda/src/values.js
  var require_values = __commonJS({
    "sdk/contracts/node_modules/ramda/src/values.js"(exports, module) {
      var _curry1 = require_curry1();
      var keys = require_keys();
      var values = /* @__PURE__ */ _curry1(function values2(obj) {
        var props = keys(obj);
        var len = props.length;
        var vals = [];
        var idx = 0;
        while (idx < len) {
          vals[idx] = obj[props[idx]];
          idx += 1;
        }
        return vals;
      });
      module.exports = values;
    }
  });

  // sdk/contracts/node_modules/ramda/src/applySpec.js
  var require_applySpec = __commonJS({
    "sdk/contracts/node_modules/ramda/src/applySpec.js"(exports, module) {
      var _curry1 = require_curry1();
      var _isArray = require_isArray();
      var apply = require_apply();
      var curryN = require_curryN2();
      var max = require_max();
      var pluck = require_pluck();
      var reduce = require_reduce2();
      var keys = require_keys();
      var values = require_values();
      function mapValues(fn, obj) {
        return _isArray(obj) ? obj.map(fn) : keys(obj).reduce(function(acc, key) {
          acc[key] = fn(obj[key]);
          return acc;
        }, {});
      }
      var applySpec = /* @__PURE__ */ _curry1(function applySpec2(spec) {
        spec = mapValues(function(v) {
          return typeof v == "function" ? v : applySpec2(v);
        }, spec);
        return curryN(reduce(max, 0, pluck("length", values(spec))), function() {
          var args = arguments;
          return mapValues(function(f) {
            return apply(f, args);
          }, spec);
        });
      });
      module.exports = applySpec;
    }
  });

  // sdk/contracts/node_modules/ramda/src/applyTo.js
  var require_applyTo = __commonJS({
    "sdk/contracts/node_modules/ramda/src/applyTo.js"(exports, module) {
      var _curry2 = require_curry2();
      var applyTo = /* @__PURE__ */ _curry2(function applyTo2(x, f) {
        return f(x);
      });
      module.exports = applyTo;
    }
  });

  // sdk/contracts/node_modules/ramda/src/ascend.js
  var require_ascend = __commonJS({
    "sdk/contracts/node_modules/ramda/src/ascend.js"(exports, module) {
      var _curry3 = require_curry3();
      var ascend = /* @__PURE__ */ _curry3(function ascend2(fn, a, b) {
        var aa = fn(a);
        var bb = fn(b);
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
      module.exports = ascend;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_assoc.js
  var require_assoc = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_assoc.js"(exports, module) {
      var _isArray = require_isArray();
      var _isInteger = require_isInteger();
      function _assoc(prop, val, obj) {
        if (_isInteger(prop) && _isArray(obj)) {
          var arr = [].concat(obj);
          arr[prop] = val;
          return arr;
        }
        var result = {};
        for (var p in obj) {
          result[p] = obj[p];
        }
        result[prop] = val;
        return result;
      }
      module.exports = _assoc;
    }
  });

  // sdk/contracts/node_modules/ramda/src/isNil.js
  var require_isNil = __commonJS({
    "sdk/contracts/node_modules/ramda/src/isNil.js"(exports, module) {
      var _curry1 = require_curry1();
      var isNil = /* @__PURE__ */ _curry1(function isNil2(x) {
        return x == null;
      });
      module.exports = isNil;
    }
  });

  // sdk/contracts/node_modules/ramda/src/assocPath.js
  var require_assocPath = __commonJS({
    "sdk/contracts/node_modules/ramda/src/assocPath.js"(exports, module) {
      var _curry3 = require_curry3();
      var _has = require_has();
      var _isInteger = require_isInteger();
      var _assoc = require_assoc();
      var isNil = require_isNil();
      var assocPath = /* @__PURE__ */ _curry3(function assocPath2(path, val, obj) {
        if (path.length === 0) {
          return val;
        }
        var idx = path[0];
        if (path.length > 1) {
          var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
          val = assocPath2(Array.prototype.slice.call(path, 1), val, nextObj);
        }
        return _assoc(idx, val, obj);
      });
      module.exports = assocPath;
    }
  });

  // sdk/contracts/node_modules/ramda/src/assoc.js
  var require_assoc2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/assoc.js"(exports, module) {
      var _curry3 = require_curry3();
      var assocPath = require_assocPath();
      var assoc = /* @__PURE__ */ _curry3(function assoc2(prop, val, obj) {
        return assocPath([prop], val, obj);
      });
      module.exports = assoc;
    }
  });

  // sdk/contracts/node_modules/ramda/src/nAry.js
  var require_nAry = __commonJS({
    "sdk/contracts/node_modules/ramda/src/nAry.js"(exports, module) {
      var _curry2 = require_curry2();
      var nAry = /* @__PURE__ */ _curry2(function nAry2(n, fn) {
        switch (n) {
          case 0:
            return function() {
              return fn.call(this);
            };
          case 1:
            return function(a0) {
              return fn.call(this, a0);
            };
          case 2:
            return function(a0, a1) {
              return fn.call(this, a0, a1);
            };
          case 3:
            return function(a0, a1, a2) {
              return fn.call(this, a0, a1, a2);
            };
          case 4:
            return function(a0, a1, a2, a3) {
              return fn.call(this, a0, a1, a2, a3);
            };
          case 5:
            return function(a0, a1, a2, a3, a4) {
              return fn.call(this, a0, a1, a2, a3, a4);
            };
          case 6:
            return function(a0, a1, a2, a3, a4, a5) {
              return fn.call(this, a0, a1, a2, a3, a4, a5);
            };
          case 7:
            return function(a0, a1, a2, a3, a4, a5, a6) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
            };
          case 8:
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
            };
          case 9:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
            };
          case 10:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            };
          default:
            throw new Error("First argument to nAry must be a non-negative integer no greater than ten");
        }
      });
      module.exports = nAry;
    }
  });

  // sdk/contracts/node_modules/ramda/src/binary.js
  var require_binary = __commonJS({
    "sdk/contracts/node_modules/ramda/src/binary.js"(exports, module) {
      var _curry1 = require_curry1();
      var nAry = require_nAry();
      var binary = /* @__PURE__ */ _curry1(function binary2(fn) {
        return nAry(2, fn);
      });
      module.exports = binary;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isFunction.js
  var require_isFunction = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isFunction.js"(exports, module) {
      function _isFunction(x) {
        var type = Object.prototype.toString.call(x);
        return type === "[object Function]" || type === "[object AsyncFunction]" || type === "[object GeneratorFunction]" || type === "[object AsyncGeneratorFunction]";
      }
      module.exports = _isFunction;
    }
  });

  // sdk/contracts/node_modules/ramda/src/liftN.js
  var require_liftN = __commonJS({
    "sdk/contracts/node_modules/ramda/src/liftN.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduce = require_reduce();
      var ap = require_ap();
      var curryN = require_curryN2();
      var map = require_map2();
      var liftN = /* @__PURE__ */ _curry2(function liftN2(arity, fn) {
        var lifted = curryN(arity, fn);
        return curryN(arity, function() {
          return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
        });
      });
      module.exports = liftN;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lift.js
  var require_lift = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lift.js"(exports, module) {
      var _curry1 = require_curry1();
      var liftN = require_liftN();
      var lift = /* @__PURE__ */ _curry1(function lift2(fn) {
        return liftN(fn.length, fn);
      });
      module.exports = lift;
    }
  });

  // sdk/contracts/node_modules/ramda/src/both.js
  var require_both = __commonJS({
    "sdk/contracts/node_modules/ramda/src/both.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isFunction = require_isFunction();
      var and = require_and();
      var lift = require_lift();
      var both = /* @__PURE__ */ _curry2(function both2(f, g) {
        return _isFunction(f) ? function _both() {
          return f.apply(this, arguments) && g.apply(this, arguments);
        } : lift(and)(f, g);
      });
      module.exports = both;
    }
  });

  // sdk/contracts/node_modules/ramda/src/call.js
  var require_call = __commonJS({
    "sdk/contracts/node_modules/ramda/src/call.js"(exports, module) {
      var _curry1 = require_curry1();
      var call = /* @__PURE__ */ _curry1(function call2(fn) {
        return fn.apply(this, Array.prototype.slice.call(arguments, 1));
      });
      module.exports = call;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_makeFlat.js
  var require_makeFlat = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_makeFlat.js"(exports, module) {
      var _isArrayLike = require_isArrayLike();
      function _makeFlat(recursive) {
        return function flatt(list) {
          var value, jlen, j;
          var result = [];
          var idx = 0;
          var ilen = list.length;
          while (idx < ilen) {
            if (_isArrayLike(list[idx])) {
              value = recursive ? flatt(list[idx]) : list[idx];
              j = 0;
              jlen = value.length;
              while (j < jlen) {
                result[result.length] = value[j];
                j += 1;
              }
            } else {
              result[result.length] = list[idx];
            }
            idx += 1;
          }
          return result;
        };
      }
      module.exports = _makeFlat;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_forceReduced.js
  var require_forceReduced = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_forceReduced.js"(exports, module) {
      function _forceReduced(x) {
        return {
          "@@transducer/value": x,
          "@@transducer/reduced": true
        };
      }
      module.exports = _forceReduced;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_flatCat.js
  var require_flatCat = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_flatCat.js"(exports, module) {
      var _forceReduced = require_forceReduced();
      var _isArrayLike = require_isArrayLike();
      var _reduce = require_reduce();
      var _xfBase = require_xfBase();
      var preservingReduced = function(xf) {
        return {
          "@@transducer/init": _xfBase.init,
          "@@transducer/result": function(result) {
            return xf["@@transducer/result"](result);
          },
          "@@transducer/step": function(result, input) {
            var ret = xf["@@transducer/step"](result, input);
            return ret["@@transducer/reduced"] ? _forceReduced(ret) : ret;
          }
        };
      };
      var _flatCat = function _xcat(xf) {
        var rxf = preservingReduced(xf);
        return {
          "@@transducer/init": _xfBase.init,
          "@@transducer/result": function(result) {
            return rxf["@@transducer/result"](result);
          },
          "@@transducer/step": function(result, input) {
            return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
          }
        };
      };
      module.exports = _flatCat;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xchain.js
  var require_xchain = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xchain.js"(exports, module) {
      var _curry2 = require_curry2();
      var _flatCat = require_flatCat();
      var map = require_map2();
      var _xchain = /* @__PURE__ */ _curry2(function _xchain2(f, xf) {
        return map(f, _flatCat(xf));
      });
      module.exports = _xchain;
    }
  });

  // sdk/contracts/node_modules/ramda/src/chain.js
  var require_chain = __commonJS({
    "sdk/contracts/node_modules/ramda/src/chain.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _makeFlat = require_makeFlat();
      var _xchain = require_xchain();
      var map = require_map2();
      var chain = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["fantasy-land/chain", "chain"], _xchain, function chain2(fn, monad) {
          if (typeof monad === "function") {
            return function(x) {
              return fn(monad(x))(x);
            };
          }
          return _makeFlat(false)(map(fn, monad));
        })
      );
      module.exports = chain;
    }
  });

  // sdk/contracts/node_modules/ramda/src/clamp.js
  var require_clamp = __commonJS({
    "sdk/contracts/node_modules/ramda/src/clamp.js"(exports, module) {
      var _curry3 = require_curry3();
      var clamp = /* @__PURE__ */ _curry3(function clamp2(min, max, value) {
        if (min > max) {
          throw new Error("min must not be greater than max in clamp(min, max, value)");
        }
        return value < min ? min : value > max ? max : value;
      });
      module.exports = clamp;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_cloneRegExp.js
  var require_cloneRegExp = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_cloneRegExp.js"(exports, module) {
      function _cloneRegExp(pattern) {
        return new RegExp(pattern.source, (pattern.global ? "g" : "") + (pattern.ignoreCase ? "i" : "") + (pattern.multiline ? "m" : "") + (pattern.sticky ? "y" : "") + (pattern.unicode ? "u" : ""));
      }
      module.exports = _cloneRegExp;
    }
  });

  // sdk/contracts/node_modules/ramda/src/type.js
  var require_type = __commonJS({
    "sdk/contracts/node_modules/ramda/src/type.js"(exports, module) {
      var _curry1 = require_curry1();
      var type = /* @__PURE__ */ _curry1(function type2(val) {
        return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
      });
      module.exports = type;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_clone.js
  var require_clone = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_clone.js"(exports, module) {
      var _cloneRegExp = require_cloneRegExp();
      var type = require_type();
      function _clone(value, refFrom, refTo, deep) {
        var copy = function copy2(copiedValue) {
          var len = refFrom.length;
          var idx = 0;
          while (idx < len) {
            if (value === refFrom[idx]) {
              return refTo[idx];
            }
            idx += 1;
          }
          refFrom[idx] = value;
          refTo[idx] = copiedValue;
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
            }
          }
          return copiedValue;
        };
        switch (type(value)) {
          case "Object":
            return copy(Object.create(Object.getPrototypeOf(value)));
          case "Array":
            return copy([]);
          case "Date":
            return new Date(value.valueOf());
          case "RegExp":
            return _cloneRegExp(value);
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array":
            return value.slice();
          default:
            return value;
        }
      }
      module.exports = _clone;
    }
  });

  // sdk/contracts/node_modules/ramda/src/clone.js
  var require_clone2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/clone.js"(exports, module) {
      var _clone = require_clone();
      var _curry1 = require_curry1();
      var clone = /* @__PURE__ */ _curry1(function clone2(value) {
        return value != null && typeof value.clone === "function" ? value.clone() : _clone(value, [], [], true);
      });
      module.exports = clone;
    }
  });

  // sdk/contracts/node_modules/ramda/src/collectBy.js
  var require_collectBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/collectBy.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduce = require_reduce();
      var collectBy = /* @__PURE__ */ _curry2(function collectBy2(fn, list) {
        var group = _reduce(function(o, x) {
          var tag2 = fn(x);
          if (o[tag2] === void 0) {
            o[tag2] = [];
          }
          o[tag2].push(x);
          return o;
        }, {}, list);
        var newList = [];
        for (var tag in group) {
          newList.push(group[tag]);
        }
        return newList;
      });
      module.exports = collectBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/comparator.js
  var require_comparator = __commonJS({
    "sdk/contracts/node_modules/ramda/src/comparator.js"(exports, module) {
      var _curry1 = require_curry1();
      var comparator = /* @__PURE__ */ _curry1(function comparator2(pred) {
        return function(a, b) {
          return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
        };
      });
      module.exports = comparator;
    }
  });

  // sdk/contracts/node_modules/ramda/src/not.js
  var require_not = __commonJS({
    "sdk/contracts/node_modules/ramda/src/not.js"(exports, module) {
      var _curry1 = require_curry1();
      var not = /* @__PURE__ */ _curry1(function not2(a) {
        return !a;
      });
      module.exports = not;
    }
  });

  // sdk/contracts/node_modules/ramda/src/complement.js
  var require_complement = __commonJS({
    "sdk/contracts/node_modules/ramda/src/complement.js"(exports, module) {
      var lift = require_lift();
      var not = require_not();
      var complement = /* @__PURE__ */ lift(not);
      module.exports = complement;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_pipe.js
  var require_pipe = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_pipe.js"(exports, module) {
      function _pipe(f, g) {
        return function() {
          return g.call(this, f.apply(this, arguments));
        };
      }
      module.exports = _pipe;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_checkForMethod.js
  var require_checkForMethod = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_checkForMethod.js"(exports, module) {
      var _isArray = require_isArray();
      function _checkForMethod(methodname, fn) {
        return function() {
          var length = arguments.length;
          if (length === 0) {
            return fn();
          }
          var obj = arguments[length - 1];
          return _isArray(obj) || typeof obj[methodname] !== "function" ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
        };
      }
      module.exports = _checkForMethod;
    }
  });

  // sdk/contracts/node_modules/ramda/src/slice.js
  var require_slice = __commonJS({
    "sdk/contracts/node_modules/ramda/src/slice.js"(exports, module) {
      var _checkForMethod = require_checkForMethod();
      var _curry3 = require_curry3();
      var slice = /* @__PURE__ */ _curry3(
        /* @__PURE__ */ _checkForMethod("slice", function slice2(fromIndex, toIndex, list) {
          return Array.prototype.slice.call(list, fromIndex, toIndex);
        })
      );
      module.exports = slice;
    }
  });

  // sdk/contracts/node_modules/ramda/src/tail.js
  var require_tail = __commonJS({
    "sdk/contracts/node_modules/ramda/src/tail.js"(exports, module) {
      var _checkForMethod = require_checkForMethod();
      var _curry1 = require_curry1();
      var slice = require_slice();
      var tail = /* @__PURE__ */ _curry1(
        /* @__PURE__ */ _checkForMethod(
          "tail",
          /* @__PURE__ */ slice(1, Infinity)
        )
      );
      module.exports = tail;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pipe.js
  var require_pipe2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pipe.js"(exports, module) {
      var _arity = require_arity();
      var _pipe = require_pipe();
      var reduce = require_reduce2();
      var tail = require_tail();
      function pipe() {
        if (arguments.length === 0) {
          throw new Error("pipe requires at least one argument");
        }
        return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
      }
      module.exports = pipe;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reverse.js
  var require_reverse = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reverse.js"(exports, module) {
      var _curry1 = require_curry1();
      var _isString = require_isString();
      var reverse = /* @__PURE__ */ _curry1(function reverse2(list) {
        return _isString(list) ? list.split("").reverse().join("") : Array.prototype.slice.call(list, 0).reverse();
      });
      module.exports = reverse;
    }
  });

  // sdk/contracts/node_modules/ramda/src/compose.js
  var require_compose = __commonJS({
    "sdk/contracts/node_modules/ramda/src/compose.js"(exports, module) {
      var pipe = require_pipe2();
      var reverse = require_reverse();
      function compose() {
        if (arguments.length === 0) {
          throw new Error("compose requires at least one argument");
        }
        return pipe.apply(this, reverse(arguments));
      }
      module.exports = compose;
    }
  });

  // sdk/contracts/node_modules/ramda/src/head.js
  var require_head = __commonJS({
    "sdk/contracts/node_modules/ramda/src/head.js"(exports, module) {
      var nth = require_nth();
      var head = /* @__PURE__ */ nth(0);
      module.exports = head;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_identity.js
  var require_identity = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_identity.js"(exports, module) {
      function _identity(x) {
        return x;
      }
      module.exports = _identity;
    }
  });

  // sdk/contracts/node_modules/ramda/src/identity.js
  var require_identity2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/identity.js"(exports, module) {
      var _curry1 = require_curry1();
      var _identity = require_identity();
      var identity = /* @__PURE__ */ _curry1(_identity);
      module.exports = identity;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pipeWith.js
  var require_pipeWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pipeWith.js"(exports, module) {
      var _arity = require_arity();
      var _curry2 = require_curry2();
      var head = require_head();
      var _reduce = require_reduce();
      var tail = require_tail();
      var identity = require_identity2();
      var pipeWith = /* @__PURE__ */ _curry2(function pipeWith2(xf, list) {
        if (list.length <= 0) {
          return identity;
        }
        var headList = head(list);
        var tailList = tail(list);
        return _arity(headList.length, function() {
          return _reduce(function(result, f) {
            return xf.call(this, f, result);
          }, headList.apply(this, arguments), tailList);
        });
      });
      module.exports = pipeWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/composeWith.js
  var require_composeWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/composeWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var pipeWith = require_pipeWith();
      var reverse = require_reverse();
      var composeWith = /* @__PURE__ */ _curry2(function composeWith2(xf, list) {
        return pipeWith.apply(this, [xf, reverse(list)]);
      });
      module.exports = composeWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_arrayFromIterator.js
  var require_arrayFromIterator = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_arrayFromIterator.js"(exports, module) {
      function _arrayFromIterator(iter) {
        var list = [];
        var next;
        while (!(next = iter.next()).done) {
          list.push(next.value);
        }
        return list;
      }
      module.exports = _arrayFromIterator;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_includesWith.js
  var require_includesWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_includesWith.js"(exports, module) {
      function _includesWith(pred, x, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
          if (pred(x, list[idx])) {
            return true;
          }
          idx += 1;
        }
        return false;
      }
      module.exports = _includesWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_functionName.js
  var require_functionName = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_functionName.js"(exports, module) {
      function _functionName(f) {
        var match = String(f).match(/^function (\w*)/);
        return match == null ? "" : match[1];
      }
      module.exports = _functionName;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_objectIs.js
  var require_objectIs = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_objectIs.js"(exports, module) {
      function _objectIs(a, b) {
        if (a === b) {
          return a !== 0 || 1 / a === 1 / b;
        } else {
          return a !== a && b !== b;
        }
      }
      module.exports = typeof Object.is === "function" ? Object.is : _objectIs;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_equals.js
  var require_equals = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_equals.js"(exports, module) {
      var _arrayFromIterator = require_arrayFromIterator();
      var _includesWith = require_includesWith();
      var _functionName = require_functionName();
      var _has = require_has();
      var _objectIs = require_objectIs();
      var keys = require_keys();
      var type = require_type();
      function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
        var a = _arrayFromIterator(aIterator);
        var b = _arrayFromIterator(bIterator);
        function eq(_a, _b) {
          return _equals(_a, _b, stackA.slice(), stackB.slice());
        }
        return !_includesWith(function(b2, aItem) {
          return !_includesWith(eq, aItem, b2);
        }, b, a);
      }
      function _equals(a, b, stackA, stackB) {
        if (_objectIs(a, b)) {
          return true;
        }
        var typeA = type(a);
        if (typeA !== type(b)) {
          return false;
        }
        if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
          return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
        }
        if (typeof a.equals === "function" || typeof b.equals === "function") {
          return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
        }
        switch (typeA) {
          case "Arguments":
          case "Array":
          case "Object":
            if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
              return a === b;
            }
            break;
          case "Boolean":
          case "Number":
          case "String":
            if (!(typeof a === typeof b && _objectIs(a.valueOf(), b.valueOf()))) {
              return false;
            }
            break;
          case "Date":
            if (!_objectIs(a.valueOf(), b.valueOf())) {
              return false;
            }
            break;
          case "Error":
            return a.name === b.name && a.message === b.message;
          case "RegExp":
            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
              return false;
            }
            break;
        }
        var idx = stackA.length - 1;
        while (idx >= 0) {
          if (stackA[idx] === a) {
            return stackB[idx] === b;
          }
          idx -= 1;
        }
        switch (typeA) {
          case "Map":
            if (a.size !== b.size) {
              return false;
            }
            return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
          case "Set":
            if (a.size !== b.size) {
              return false;
            }
            return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
          case "Arguments":
          case "Array":
          case "Object":
          case "Boolean":
          case "Number":
          case "String":
          case "Date":
          case "Error":
          case "RegExp":
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "ArrayBuffer":
            break;
          default:
            return false;
        }
        var keysA = keys(a);
        if (keysA.length !== keys(b).length) {
          return false;
        }
        var extendedStackA = stackA.concat([a]);
        var extendedStackB = stackB.concat([b]);
        idx = keysA.length - 1;
        while (idx >= 0) {
          var key = keysA[idx];
          if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
            return false;
          }
          idx -= 1;
        }
        return true;
      }
      module.exports = _equals;
    }
  });

  // sdk/contracts/node_modules/ramda/src/equals.js
  var require_equals2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/equals.js"(exports, module) {
      var _curry2 = require_curry2();
      var _equals = require_equals();
      var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
        return _equals(a, b, [], []);
      });
      module.exports = equals;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_indexOf.js
  var require_indexOf = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_indexOf.js"(exports, module) {
      var equals = require_equals2();
      function _indexOf(list, a, idx) {
        var inf, item;
        if (typeof list.indexOf === "function") {
          switch (typeof a) {
            case "number":
              if (a === 0) {
                inf = 1 / a;
                while (idx < list.length) {
                  item = list[idx];
                  if (item === 0 && 1 / item === inf) {
                    return idx;
                  }
                  idx += 1;
                }
                return -1;
              } else if (a !== a) {
                while (idx < list.length) {
                  item = list[idx];
                  if (typeof item === "number" && item !== item) {
                    return idx;
                  }
                  idx += 1;
                }
                return -1;
              }
              return list.indexOf(a, idx);
            case "string":
            case "boolean":
            case "function":
            case "undefined":
              return list.indexOf(a, idx);
            case "object":
              if (a === null) {
                return list.indexOf(a, idx);
              }
          }
        }
        while (idx < list.length) {
          if (equals(list[idx], a)) {
            return idx;
          }
          idx += 1;
        }
        return -1;
      }
      module.exports = _indexOf;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_includes.js
  var require_includes = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_includes.js"(exports, module) {
      var _indexOf = require_indexOf();
      function _includes(a, list) {
        return _indexOf(list, a, 0) >= 0;
      }
      module.exports = _includes;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_quote.js
  var require_quote = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_quote.js"(exports, module) {
      function _quote(s) {
        var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
        return '"' + escaped.replace(/"/g, '\\"') + '"';
      }
      module.exports = _quote;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_toISOString.js
  var require_toISOString = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_toISOString.js"(exports, module) {
      var pad = function pad2(n) {
        return (n < 10 ? "0" : "") + n;
      };
      var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
        return d.toISOString();
      } : function _toISOString2(d) {
        return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
      };
      module.exports = _toISOString;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_complement.js
  var require_complement2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_complement.js"(exports, module) {
      function _complement(f) {
        return function() {
          return !f.apply(this, arguments);
        };
      }
      module.exports = _complement;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_filter.js
  var require_filter = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_filter.js"(exports, module) {
      function _filter(fn, list) {
        var idx = 0;
        var len = list.length;
        var result = [];
        while (idx < len) {
          if (fn(list[idx])) {
            result[result.length] = list[idx];
          }
          idx += 1;
        }
        return result;
      }
      module.exports = _filter;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isObject.js
  var require_isObject = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isObject.js"(exports, module) {
      function _isObject(x) {
        return Object.prototype.toString.call(x) === "[object Object]";
      }
      module.exports = _isObject;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xfilter.js
  var require_xfilter = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xfilter.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XFilter = /* @__PURE__ */ function() {
        function XFilter2(f, xf) {
          this.xf = xf;
          this.f = f;
        }
        XFilter2.prototype["@@transducer/init"] = _xfBase.init;
        XFilter2.prototype["@@transducer/result"] = _xfBase.result;
        XFilter2.prototype["@@transducer/step"] = function(result, input) {
          return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
        };
        return XFilter2;
      }();
      var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f, xf) {
        return new XFilter(f, xf);
      });
      module.exports = _xfilter;
    }
  });

  // sdk/contracts/node_modules/ramda/src/filter.js
  var require_filter2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/filter.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _filter = require_filter();
      var _isObject = require_isObject();
      var _reduce = require_reduce();
      var _xfilter = require_xfilter();
      var keys = require_keys();
      var filter = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], _xfilter, function(pred, filterable) {
          return _isObject(filterable) ? _reduce(function(acc, key) {
            if (pred(filterable[key])) {
              acc[key] = filterable[key];
            }
            return acc;
          }, {}, keys(filterable)) : _filter(pred, filterable);
        })
      );
      module.exports = filter;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reject.js
  var require_reject = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reject.js"(exports, module) {
      var _complement = require_complement2();
      var _curry2 = require_curry2();
      var filter = require_filter2();
      var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
        return filter(_complement(pred), filterable);
      });
      module.exports = reject;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_toString.js
  var require_toString = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_toString.js"(exports, module) {
      var _includes = require_includes();
      var _map = require_map();
      var _quote = require_quote();
      var _toISOString = require_toISOString();
      var keys = require_keys();
      var reject = require_reject();
      function _toString(x, seen) {
        var recur = function recur2(y) {
          var xs = seen.concat([x]);
          return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
        };
        var mapPairs = function(obj, keys2) {
          return _map(function(k) {
            return _quote(k) + ": " + recur(obj[k]);
          }, keys2.slice().sort());
        };
        switch (Object.prototype.toString.call(x)) {
          case "[object Arguments]":
            return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
          case "[object Array]":
            return "[" + _map(recur, x).concat(mapPairs(x, reject(function(k) {
              return /^\d+$/.test(k);
            }, keys(x)))).join(", ") + "]";
          case "[object Boolean]":
            return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
          case "[object Date]":
            return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ")";
          case "[object Null]":
            return "null";
          case "[object Number]":
            return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
          case "[object String]":
            return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
          case "[object Undefined]":
            return "undefined";
          default:
            if (typeof x.toString === "function") {
              var repr = x.toString();
              if (repr !== "[object Object]") {
                return repr;
              }
            }
            return "{" + mapPairs(x, keys(x)).join(", ") + "}";
        }
      }
      module.exports = _toString;
    }
  });

  // sdk/contracts/node_modules/ramda/src/toString.js
  var require_toString2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/toString.js"(exports, module) {
      var _curry1 = require_curry1();
      var _toString = require_toString();
      var toString = /* @__PURE__ */ _curry1(function toString2(val) {
        return _toString(val, []);
      });
      module.exports = toString;
    }
  });

  // sdk/contracts/node_modules/ramda/src/concat.js
  var require_concat2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/concat.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isArray = require_isArray();
      var _isFunction = require_isFunction();
      var _isString = require_isString();
      var toString = require_toString2();
      var concat = /* @__PURE__ */ _curry2(function concat2(a, b) {
        if (_isArray(a)) {
          if (_isArray(b)) {
            return a.concat(b);
          }
          throw new TypeError(toString(b) + " is not an array");
        }
        if (_isString(a)) {
          if (_isString(b)) {
            return a + b;
          }
          throw new TypeError(toString(b) + " is not a string");
        }
        if (a != null && _isFunction(a["fantasy-land/concat"])) {
          return a["fantasy-land/concat"](b);
        }
        if (a != null && _isFunction(a.concat)) {
          return a.concat(b);
        }
        throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
      });
      module.exports = concat;
    }
  });

  // sdk/contracts/node_modules/ramda/src/cond.js
  var require_cond = __commonJS({
    "sdk/contracts/node_modules/ramda/src/cond.js"(exports, module) {
      var _arity = require_arity();
      var _curry1 = require_curry1();
      var map = require_map2();
      var max = require_max();
      var reduce = require_reduce2();
      var cond = /* @__PURE__ */ _curry1(function cond2(pairs) {
        var arity = reduce(max, 0, map(function(pair) {
          return pair[0].length;
        }, pairs));
        return _arity(arity, function() {
          var idx = 0;
          while (idx < pairs.length) {
            if (pairs[idx][0].apply(this, arguments)) {
              return pairs[idx][1].apply(this, arguments);
            }
            idx += 1;
          }
        });
      });
      module.exports = cond;
    }
  });

  // sdk/contracts/node_modules/ramda/src/curry.js
  var require_curry = __commonJS({
    "sdk/contracts/node_modules/ramda/src/curry.js"(exports, module) {
      var _curry1 = require_curry1();
      var curryN = require_curryN2();
      var curry = /* @__PURE__ */ _curry1(function curry2(fn) {
        return curryN(fn.length, fn);
      });
      module.exports = curry;
    }
  });

  // sdk/contracts/node_modules/ramda/src/constructN.js
  var require_constructN = __commonJS({
    "sdk/contracts/node_modules/ramda/src/constructN.js"(exports, module) {
      var _curry2 = require_curry2();
      var curry = require_curry();
      var nAry = require_nAry();
      var constructN = /* @__PURE__ */ _curry2(function constructN2(n, Fn) {
        if (n > 10) {
          throw new Error("Constructor with greater than ten arguments");
        }
        if (n === 0) {
          return function() {
            return new Fn();
          };
        }
        return curry(nAry(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
          switch (arguments.length) {
            case 1:
              return new Fn($0);
            case 2:
              return new Fn($0, $1);
            case 3:
              return new Fn($0, $1, $2);
            case 4:
              return new Fn($0, $1, $2, $3);
            case 5:
              return new Fn($0, $1, $2, $3, $4);
            case 6:
              return new Fn($0, $1, $2, $3, $4, $5);
            case 7:
              return new Fn($0, $1, $2, $3, $4, $5, $6);
            case 8:
              return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
            case 9:
              return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
            case 10:
              return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
          }
        }));
      });
      module.exports = constructN;
    }
  });

  // sdk/contracts/node_modules/ramda/src/construct.js
  var require_construct = __commonJS({
    "sdk/contracts/node_modules/ramda/src/construct.js"(exports, module) {
      var _curry1 = require_curry1();
      var constructN = require_constructN();
      var construct = /* @__PURE__ */ _curry1(function construct2(Fn) {
        return constructN(Fn.length, Fn);
      });
      module.exports = construct;
    }
  });

  // sdk/contracts/node_modules/ramda/src/converge.js
  var require_converge = __commonJS({
    "sdk/contracts/node_modules/ramda/src/converge.js"(exports, module) {
      var _curry2 = require_curry2();
      var _map = require_map();
      var curryN = require_curryN2();
      var max = require_max();
      var pluck = require_pluck();
      var reduce = require_reduce2();
      var converge = /* @__PURE__ */ _curry2(function converge2(after, fns) {
        return curryN(reduce(max, 0, pluck("length", fns)), function() {
          var args = arguments;
          var context = this;
          return after.apply(context, _map(function(fn) {
            return fn.apply(context, args);
          }, fns));
        });
      });
      module.exports = converge;
    }
  });

  // sdk/contracts/node_modules/ramda/src/count.js
  var require_count = __commonJS({
    "sdk/contracts/node_modules/ramda/src/count.js"(exports, module) {
      var _reduce = require_reduce();
      var curry = require_curry();
      var count = /* @__PURE__ */ curry(function(pred, list) {
        return _reduce(function(a, e) {
          return pred(e) ? a + 1 : a;
        }, 0, list);
      });
      module.exports = count;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xreduceBy.js
  var require_xreduceBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xreduceBy.js"(exports, module) {
      var _curryN = require_curryN();
      var _has = require_has();
      var _xfBase = require_xfBase();
      var XReduceBy = /* @__PURE__ */ function() {
        function XReduceBy2(valueFn, valueAcc, keyFn, xf) {
          this.valueFn = valueFn;
          this.valueAcc = valueAcc;
          this.keyFn = keyFn;
          this.xf = xf;
          this.inputs = {};
        }
        XReduceBy2.prototype["@@transducer/init"] = _xfBase.init;
        XReduceBy2.prototype["@@transducer/result"] = function(result) {
          var key;
          for (key in this.inputs) {
            if (_has(key, this.inputs)) {
              result = this.xf["@@transducer/step"](result, this.inputs[key]);
              if (result["@@transducer/reduced"]) {
                result = result["@@transducer/value"];
                break;
              }
            }
          }
          this.inputs = null;
          return this.xf["@@transducer/result"](result);
        };
        XReduceBy2.prototype["@@transducer/step"] = function(result, input) {
          var key = this.keyFn(input);
          this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
          this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
          return result;
        };
        return XReduceBy2;
      }();
      var _xreduceBy = /* @__PURE__ */ _curryN(4, [], function _xreduceBy2(valueFn, valueAcc, keyFn, xf) {
        return new XReduceBy(valueFn, valueAcc, keyFn, xf);
      });
      module.exports = _xreduceBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reduceBy.js
  var require_reduceBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reduceBy.js"(exports, module) {
      var _clone = require_clone();
      var _curryN = require_curryN();
      var _dispatchable = require_dispatchable();
      var _has = require_has();
      var _reduce = require_reduce();
      var _reduced = require_reduced();
      var _xreduceBy = require_xreduceBy();
      var reduceBy = /* @__PURE__ */ _curryN(
        4,
        [],
        /* @__PURE__ */ _dispatchable([], _xreduceBy, function reduceBy2(valueFn, valueAcc, keyFn, list) {
          return _reduce(function(acc, elt) {
            var key = keyFn(elt);
            var value = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, [], [], false), elt);
            if (value && value["@@transducer/reduced"]) {
              return _reduced(acc);
            }
            acc[key] = value;
            return acc;
          }, {}, list);
        })
      );
      module.exports = reduceBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/countBy.js
  var require_countBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/countBy.js"(exports, module) {
      var reduceBy = require_reduceBy();
      var countBy = /* @__PURE__ */ reduceBy(function(acc, elem) {
        return acc + 1;
      }, 0);
      module.exports = countBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dec.js
  var require_dec = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dec.js"(exports, module) {
      var add = require_add();
      var dec = /* @__PURE__ */ add(-1);
      module.exports = dec;
    }
  });

  // sdk/contracts/node_modules/ramda/src/defaultTo.js
  var require_defaultTo = __commonJS({
    "sdk/contracts/node_modules/ramda/src/defaultTo.js"(exports, module) {
      var _curry2 = require_curry2();
      var defaultTo = /* @__PURE__ */ _curry2(function defaultTo2(d, v) {
        return v == null || v !== v ? d : v;
      });
      module.exports = defaultTo;
    }
  });

  // sdk/contracts/node_modules/ramda/src/descend.js
  var require_descend = __commonJS({
    "sdk/contracts/node_modules/ramda/src/descend.js"(exports, module) {
      var _curry3 = require_curry3();
      var descend = /* @__PURE__ */ _curry3(function descend2(fn, a, b) {
        var aa = fn(a);
        var bb = fn(b);
        return aa > bb ? -1 : aa < bb ? 1 : 0;
      });
      module.exports = descend;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_Set.js
  var require_Set = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_Set.js"(exports, module) {
      var _includes = require_includes();
      var _Set = /* @__PURE__ */ function() {
        function _Set2() {
          this._nativeSet = typeof Set === "function" ? /* @__PURE__ */ new Set() : null;
          this._items = {};
        }
        _Set2.prototype.add = function(item) {
          return !hasOrAdd(item, true, this);
        };
        _Set2.prototype.has = function(item) {
          return hasOrAdd(item, false, this);
        };
        return _Set2;
      }();
      function hasOrAdd(item, shouldAdd, set) {
        var type = typeof item;
        var prevSize, newSize;
        switch (type) {
          case "string":
          case "number":
            if (item === 0 && 1 / item === -Infinity) {
              if (set._items["-0"]) {
                return true;
              } else {
                if (shouldAdd) {
                  set._items["-0"] = true;
                }
                return false;
              }
            }
            if (set._nativeSet !== null) {
              if (shouldAdd) {
                prevSize = set._nativeSet.size;
                set._nativeSet.add(item);
                newSize = set._nativeSet.size;
                return newSize === prevSize;
              } else {
                return set._nativeSet.has(item);
              }
            } else {
              if (!(type in set._items)) {
                if (shouldAdd) {
                  set._items[type] = {};
                  set._items[type][item] = true;
                }
                return false;
              } else if (item in set._items[type]) {
                return true;
              } else {
                if (shouldAdd) {
                  set._items[type][item] = true;
                }
                return false;
              }
            }
          case "boolean":
            if (type in set._items) {
              var bIdx = item ? 1 : 0;
              if (set._items[type][bIdx]) {
                return true;
              } else {
                if (shouldAdd) {
                  set._items[type][bIdx] = true;
                }
                return false;
              }
            } else {
              if (shouldAdd) {
                set._items[type] = item ? [false, true] : [true, false];
              }
              return false;
            }
          case "function":
            if (set._nativeSet !== null) {
              if (shouldAdd) {
                prevSize = set._nativeSet.size;
                set._nativeSet.add(item);
                newSize = set._nativeSet.size;
                return newSize === prevSize;
              } else {
                return set._nativeSet.has(item);
              }
            } else {
              if (!(type in set._items)) {
                if (shouldAdd) {
                  set._items[type] = [item];
                }
                return false;
              }
              if (!_includes(item, set._items[type])) {
                if (shouldAdd) {
                  set._items[type].push(item);
                }
                return false;
              }
              return true;
            }
          case "undefined":
            if (set._items[type]) {
              return true;
            } else {
              if (shouldAdd) {
                set._items[type] = true;
              }
              return false;
            }
          case "object":
            if (item === null) {
              if (!set._items["null"]) {
                if (shouldAdd) {
                  set._items["null"] = true;
                }
                return false;
              }
              return true;
            }
          default:
            type = Object.prototype.toString.call(item);
            if (!(type in set._items)) {
              if (shouldAdd) {
                set._items[type] = [item];
              }
              return false;
            }
            if (!_includes(item, set._items[type])) {
              if (shouldAdd) {
                set._items[type].push(item);
              }
              return false;
            }
            return true;
        }
      }
      module.exports = _Set;
    }
  });

  // sdk/contracts/node_modules/ramda/src/difference.js
  var require_difference = __commonJS({
    "sdk/contracts/node_modules/ramda/src/difference.js"(exports, module) {
      var _curry2 = require_curry2();
      var _Set = require_Set();
      var difference = /* @__PURE__ */ _curry2(function difference2(first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        var secondLen = second.length;
        var toFilterOut = new _Set();
        for (var i = 0; i < secondLen; i += 1) {
          toFilterOut.add(second[i]);
        }
        while (idx < firstLen) {
          if (toFilterOut.add(first[idx])) {
            out[out.length] = first[idx];
          }
          idx += 1;
        }
        return out;
      });
      module.exports = difference;
    }
  });

  // sdk/contracts/node_modules/ramda/src/differenceWith.js
  var require_differenceWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/differenceWith.js"(exports, module) {
      var _includesWith = require_includesWith();
      var _curry3 = require_curry3();
      var differenceWith = /* @__PURE__ */ _curry3(function differenceWith2(pred, first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        while (idx < firstLen) {
          if (!_includesWith(pred, first[idx], second) && !_includesWith(pred, first[idx], out)) {
            out.push(first[idx]);
          }
          idx += 1;
        }
        return out;
      });
      module.exports = differenceWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/remove.js
  var require_remove = __commonJS({
    "sdk/contracts/node_modules/ramda/src/remove.js"(exports, module) {
      var _curry3 = require_curry3();
      var remove = /* @__PURE__ */ _curry3(function remove2(start, count, list) {
        var result = Array.prototype.slice.call(list, 0);
        result.splice(start, count);
        return result;
      });
      module.exports = remove;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_dissoc.js
  var require_dissoc = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_dissoc.js"(exports, module) {
      var _isInteger = require_isInteger();
      var _isArray = require_isArray();
      var remove = require_remove();
      function _dissoc(prop, obj) {
        if (obj == null) {
          return obj;
        }
        if (_isInteger(prop) && _isArray(obj)) {
          return remove(prop, 1, obj);
        }
        var result = {};
        for (var p in obj) {
          result[p] = obj[p];
        }
        delete result[prop];
        return result;
      }
      module.exports = _dissoc;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dissocPath.js
  var require_dissocPath = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dissocPath.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dissoc = require_dissoc();
      var _isInteger = require_isInteger();
      var _isArray = require_isArray();
      var assoc = require_assoc2();
      function _shallowCloneObject(prop, obj) {
        if (_isInteger(prop) && _isArray(obj)) {
          return [].concat(obj);
        }
        var result = {};
        for (var p in obj) {
          result[p] = obj[p];
        }
        return result;
      }
      var dissocPath = /* @__PURE__ */ _curry2(function dissocPath2(path, obj) {
        if (obj == null) {
          return obj;
        }
        switch (path.length) {
          case 0:
            return obj;
          case 1:
            return _dissoc(path[0], obj);
          default:
            var head = path[0];
            var tail = Array.prototype.slice.call(path, 1);
            if (obj[head] == null) {
              return _shallowCloneObject(head, obj);
            } else {
              return assoc(head, dissocPath2(tail, obj[head]), obj);
            }
        }
      });
      module.exports = dissocPath;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dissoc.js
  var require_dissoc2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dissoc.js"(exports, module) {
      var _curry2 = require_curry2();
      var dissocPath = require_dissocPath();
      var dissoc = /* @__PURE__ */ _curry2(function dissoc2(prop, obj) {
        return dissocPath([prop], obj);
      });
      module.exports = dissoc;
    }
  });

  // sdk/contracts/node_modules/ramda/src/divide.js
  var require_divide = __commonJS({
    "sdk/contracts/node_modules/ramda/src/divide.js"(exports, module) {
      var _curry2 = require_curry2();
      var divide = /* @__PURE__ */ _curry2(function divide2(a, b) {
        return a / b;
      });
      module.exports = divide;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xdrop.js
  var require_xdrop = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xdrop.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XDrop = /* @__PURE__ */ function() {
        function XDrop2(n, xf) {
          this.xf = xf;
          this.n = n;
        }
        XDrop2.prototype["@@transducer/init"] = _xfBase.init;
        XDrop2.prototype["@@transducer/result"] = _xfBase.result;
        XDrop2.prototype["@@transducer/step"] = function(result, input) {
          if (this.n > 0) {
            this.n -= 1;
            return result;
          }
          return this.xf["@@transducer/step"](result, input);
        };
        return XDrop2;
      }();
      var _xdrop = /* @__PURE__ */ _curry2(function _xdrop2(n, xf) {
        return new XDrop(n, xf);
      });
      module.exports = _xdrop;
    }
  });

  // sdk/contracts/node_modules/ramda/src/drop.js
  var require_drop = __commonJS({
    "sdk/contracts/node_modules/ramda/src/drop.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xdrop = require_xdrop();
      var slice = require_slice();
      var drop = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["drop"], _xdrop, function drop2(n, xs) {
          return slice(Math.max(0, n), Infinity, xs);
        })
      );
      module.exports = drop;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xtake.js
  var require_xtake = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xtake.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduced = require_reduced();
      var _xfBase = require_xfBase();
      var XTake = /* @__PURE__ */ function() {
        function XTake2(n, xf) {
          this.xf = xf;
          this.n = n;
          this.i = 0;
        }
        XTake2.prototype["@@transducer/init"] = _xfBase.init;
        XTake2.prototype["@@transducer/result"] = _xfBase.result;
        XTake2.prototype["@@transducer/step"] = function(result, input) {
          this.i += 1;
          var ret = this.n === 0 ? result : this.xf["@@transducer/step"](result, input);
          return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
        };
        return XTake2;
      }();
      var _xtake = /* @__PURE__ */ _curry2(function _xtake2(n, xf) {
        return new XTake(n, xf);
      });
      module.exports = _xtake;
    }
  });

  // sdk/contracts/node_modules/ramda/src/take.js
  var require_take = __commonJS({
    "sdk/contracts/node_modules/ramda/src/take.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xtake = require_xtake();
      var slice = require_slice();
      var take = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["take"], _xtake, function take2(n, xs) {
          return slice(0, n < 0 ? Infinity : n, xs);
        })
      );
      module.exports = take;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_dropLast.js
  var require_dropLast = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_dropLast.js"(exports, module) {
      var take = require_take();
      function dropLast(n, xs) {
        return take(n < xs.length ? xs.length - n : 0, xs);
      }
      module.exports = dropLast;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xdropLast.js
  var require_xdropLast = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xdropLast.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XDropLast = /* @__PURE__ */ function() {
        function XDropLast2(n, xf) {
          this.xf = xf;
          this.pos = 0;
          this.full = false;
          this.acc = new Array(n);
        }
        XDropLast2.prototype["@@transducer/init"] = _xfBase.init;
        XDropLast2.prototype["@@transducer/result"] = function(result) {
          this.acc = null;
          return this.xf["@@transducer/result"](result);
        };
        XDropLast2.prototype["@@transducer/step"] = function(result, input) {
          if (this.full) {
            result = this.xf["@@transducer/step"](result, this.acc[this.pos]);
          }
          this.store(input);
          return result;
        };
        XDropLast2.prototype.store = function(input) {
          this.acc[this.pos] = input;
          this.pos += 1;
          if (this.pos === this.acc.length) {
            this.pos = 0;
            this.full = true;
          }
        };
        return XDropLast2;
      }();
      var _xdropLast = /* @__PURE__ */ _curry2(function _xdropLast2(n, xf) {
        return new XDropLast(n, xf);
      });
      module.exports = _xdropLast;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dropLast.js
  var require_dropLast2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dropLast.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _dropLast = require_dropLast();
      var _xdropLast = require_xdropLast();
      var dropLast = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xdropLast, _dropLast)
      );
      module.exports = dropLast;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_dropLastWhile.js
  var require_dropLastWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_dropLastWhile.js"(exports, module) {
      var slice = require_slice();
      function dropLastWhile(pred, xs) {
        var idx = xs.length - 1;
        while (idx >= 0 && pred(xs[idx])) {
          idx -= 1;
        }
        return slice(0, idx + 1, xs);
      }
      module.exports = dropLastWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xdropLastWhile.js
  var require_xdropLastWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xdropLastWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduce = require_reduce();
      var _xfBase = require_xfBase();
      var XDropLastWhile = /* @__PURE__ */ function() {
        function XDropLastWhile2(fn, xf) {
          this.f = fn;
          this.retained = [];
          this.xf = xf;
        }
        XDropLastWhile2.prototype["@@transducer/init"] = _xfBase.init;
        XDropLastWhile2.prototype["@@transducer/result"] = function(result) {
          this.retained = null;
          return this.xf["@@transducer/result"](result);
        };
        XDropLastWhile2.prototype["@@transducer/step"] = function(result, input) {
          return this.f(input) ? this.retain(result, input) : this.flush(result, input);
        };
        XDropLastWhile2.prototype.flush = function(result, input) {
          result = _reduce(this.xf["@@transducer/step"], result, this.retained);
          this.retained = [];
          return this.xf["@@transducer/step"](result, input);
        };
        XDropLastWhile2.prototype.retain = function(result, input) {
          this.retained.push(input);
          return result;
        };
        return XDropLastWhile2;
      }();
      var _xdropLastWhile = /* @__PURE__ */ _curry2(function _xdropLastWhile2(fn, xf) {
        return new XDropLastWhile(fn, xf);
      });
      module.exports = _xdropLastWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dropLastWhile.js
  var require_dropLastWhile2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dropLastWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _dropLastWhile = require_dropLastWhile();
      var _xdropLastWhile = require_xdropLastWhile();
      var dropLastWhile = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xdropLastWhile, _dropLastWhile)
      );
      module.exports = dropLastWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xdropRepeatsWith.js
  var require_xdropRepeatsWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xdropRepeatsWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XDropRepeatsWith = /* @__PURE__ */ function() {
        function XDropRepeatsWith2(pred, xf) {
          this.xf = xf;
          this.pred = pred;
          this.lastValue = void 0;
          this.seenFirstValue = false;
        }
        XDropRepeatsWith2.prototype["@@transducer/init"] = _xfBase.init;
        XDropRepeatsWith2.prototype["@@transducer/result"] = _xfBase.result;
        XDropRepeatsWith2.prototype["@@transducer/step"] = function(result, input) {
          var sameAsLast = false;
          if (!this.seenFirstValue) {
            this.seenFirstValue = true;
          } else if (this.pred(this.lastValue, input)) {
            sameAsLast = true;
          }
          this.lastValue = input;
          return sameAsLast ? result : this.xf["@@transducer/step"](result, input);
        };
        return XDropRepeatsWith2;
      }();
      var _xdropRepeatsWith = /* @__PURE__ */ _curry2(function _xdropRepeatsWith2(pred, xf) {
        return new XDropRepeatsWith(pred, xf);
      });
      module.exports = _xdropRepeatsWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/last.js
  var require_last = __commonJS({
    "sdk/contracts/node_modules/ramda/src/last.js"(exports, module) {
      var nth = require_nth();
      var last = /* @__PURE__ */ nth(-1);
      module.exports = last;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dropRepeatsWith.js
  var require_dropRepeatsWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dropRepeatsWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xdropRepeatsWith = require_xdropRepeatsWith();
      var last = require_last();
      var dropRepeatsWith = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xdropRepeatsWith, function dropRepeatsWith2(pred, list) {
          var result = [];
          var idx = 1;
          var len = list.length;
          if (len !== 0) {
            result[0] = list[0];
            while (idx < len) {
              if (!pred(last(result), list[idx])) {
                result[result.length] = list[idx];
              }
              idx += 1;
            }
          }
          return result;
        })
      );
      module.exports = dropRepeatsWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dropRepeats.js
  var require_dropRepeats = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dropRepeats.js"(exports, module) {
      var _curry1 = require_curry1();
      var _dispatchable = require_dispatchable();
      var _xdropRepeatsWith = require_xdropRepeatsWith();
      var dropRepeatsWith = require_dropRepeatsWith();
      var equals = require_equals2();
      var dropRepeats = /* @__PURE__ */ _curry1(
        /* @__PURE__ */ _dispatchable(
          [],
          /* @__PURE__ */ _xdropRepeatsWith(equals),
          /* @__PURE__ */ dropRepeatsWith(equals)
        )
      );
      module.exports = dropRepeats;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xdropWhile.js
  var require_xdropWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xdropWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XDropWhile = /* @__PURE__ */ function() {
        function XDropWhile2(f, xf) {
          this.xf = xf;
          this.f = f;
        }
        XDropWhile2.prototype["@@transducer/init"] = _xfBase.init;
        XDropWhile2.prototype["@@transducer/result"] = _xfBase.result;
        XDropWhile2.prototype["@@transducer/step"] = function(result, input) {
          if (this.f) {
            if (this.f(input)) {
              return result;
            }
            this.f = null;
          }
          return this.xf["@@transducer/step"](result, input);
        };
        return XDropWhile2;
      }();
      var _xdropWhile = /* @__PURE__ */ _curry2(function _xdropWhile2(f, xf) {
        return new XDropWhile(f, xf);
      });
      module.exports = _xdropWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/dropWhile.js
  var require_dropWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/dropWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xdropWhile = require_xdropWhile();
      var slice = require_slice();
      var dropWhile = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["dropWhile"], _xdropWhile, function dropWhile2(pred, xs) {
          var idx = 0;
          var len = xs.length;
          while (idx < len && pred(xs[idx])) {
            idx += 1;
          }
          return slice(idx, Infinity, xs);
        })
      );
      module.exports = dropWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/or.js
  var require_or = __commonJS({
    "sdk/contracts/node_modules/ramda/src/or.js"(exports, module) {
      var _curry2 = require_curry2();
      var or = /* @__PURE__ */ _curry2(function or2(a, b) {
        return a || b;
      });
      module.exports = or;
    }
  });

  // sdk/contracts/node_modules/ramda/src/either.js
  var require_either = __commonJS({
    "sdk/contracts/node_modules/ramda/src/either.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isFunction = require_isFunction();
      var lift = require_lift();
      var or = require_or();
      var either = /* @__PURE__ */ _curry2(function either2(f, g) {
        return _isFunction(f) ? function _either() {
          return f.apply(this, arguments) || g.apply(this, arguments);
        } : lift(or)(f, g);
      });
      module.exports = either;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isTypedArray.js
  var require_isTypedArray = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isTypedArray.js"(exports, module) {
      function _isTypedArray(val) {
        var type = Object.prototype.toString.call(val);
        return type === "[object Uint8ClampedArray]" || type === "[object Int8Array]" || type === "[object Uint8Array]" || type === "[object Int16Array]" || type === "[object Uint16Array]" || type === "[object Int32Array]" || type === "[object Uint32Array]" || type === "[object Float32Array]" || type === "[object Float64Array]" || type === "[object BigInt64Array]" || type === "[object BigUint64Array]";
      }
      module.exports = _isTypedArray;
    }
  });

  // sdk/contracts/node_modules/ramda/src/empty.js
  var require_empty = __commonJS({
    "sdk/contracts/node_modules/ramda/src/empty.js"(exports, module) {
      var _curry1 = require_curry1();
      var _isArguments = require_isArguments();
      var _isArray = require_isArray();
      var _isObject = require_isObject();
      var _isString = require_isString();
      var _isTypedArray = require_isTypedArray();
      var empty = /* @__PURE__ */ _curry1(function empty2(x) {
        return x != null && typeof x["fantasy-land/empty"] === "function" ? x["fantasy-land/empty"]() : x != null && x.constructor != null && typeof x.constructor["fantasy-land/empty"] === "function" ? x.constructor["fantasy-land/empty"]() : x != null && typeof x.empty === "function" ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === "function" ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? "" : _isObject(x) ? {} : _isArguments(x) ? function() {
          return arguments;
        }() : _isTypedArray(x) ? x.constructor.from("") : void 0;
      });
      module.exports = empty;
    }
  });

  // sdk/contracts/node_modules/ramda/src/takeLast.js
  var require_takeLast = __commonJS({
    "sdk/contracts/node_modules/ramda/src/takeLast.js"(exports, module) {
      var _curry2 = require_curry2();
      var drop = require_drop();
      var takeLast = /* @__PURE__ */ _curry2(function takeLast2(n, xs) {
        return drop(n >= 0 ? xs.length - n : 0, xs);
      });
      module.exports = takeLast;
    }
  });

  // sdk/contracts/node_modules/ramda/src/endsWith.js
  var require_endsWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/endsWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var equals = require_equals2();
      var takeLast = require_takeLast();
      var endsWith = /* @__PURE__ */ _curry2(function(suffix, list) {
        return equals(takeLast(suffix.length, list), suffix);
      });
      module.exports = endsWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/eqBy.js
  var require_eqBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/eqBy.js"(exports, module) {
      var _curry3 = require_curry3();
      var equals = require_equals2();
      var eqBy = /* @__PURE__ */ _curry3(function eqBy2(f, x, y) {
        return equals(f(x), f(y));
      });
      module.exports = eqBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/eqProps.js
  var require_eqProps = __commonJS({
    "sdk/contracts/node_modules/ramda/src/eqProps.js"(exports, module) {
      var _curry3 = require_curry3();
      var equals = require_equals2();
      var eqProps = /* @__PURE__ */ _curry3(function eqProps2(prop, obj1, obj2) {
        return equals(obj1[prop], obj2[prop]);
      });
      module.exports = eqProps;
    }
  });

  // sdk/contracts/node_modules/ramda/src/evolve.js
  var require_evolve = __commonJS({
    "sdk/contracts/node_modules/ramda/src/evolve.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isArray = require_isArray();
      var _isObject = require_isObject();
      var evolve = /* @__PURE__ */ _curry2(function evolve2(transformations, object) {
        if (!_isObject(object) && !_isArray(object)) {
          return object;
        }
        var result = object instanceof Array ? [] : {};
        var transformation, key, type;
        for (key in object) {
          transformation = transformations[key];
          type = typeof transformation;
          result[key] = type === "function" ? transformation(object[key]) : transformation && type === "object" ? evolve2(transformation, object[key]) : object[key];
        }
        return result;
      });
      module.exports = evolve;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xfind.js
  var require_xfind = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xfind.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduced = require_reduced();
      var _xfBase = require_xfBase();
      var XFind = /* @__PURE__ */ function() {
        function XFind2(f, xf) {
          this.xf = xf;
          this.f = f;
          this.found = false;
        }
        XFind2.prototype["@@transducer/init"] = _xfBase.init;
        XFind2.prototype["@@transducer/result"] = function(result) {
          if (!this.found) {
            result = this.xf["@@transducer/step"](result, void 0);
          }
          return this.xf["@@transducer/result"](result);
        };
        XFind2.prototype["@@transducer/step"] = function(result, input) {
          if (this.f(input)) {
            this.found = true;
            result = _reduced(this.xf["@@transducer/step"](result, input));
          }
          return result;
        };
        return XFind2;
      }();
      var _xfind = /* @__PURE__ */ _curry2(function _xfind2(f, xf) {
        return new XFind(f, xf);
      });
      module.exports = _xfind;
    }
  });

  // sdk/contracts/node_modules/ramda/src/find.js
  var require_find = __commonJS({
    "sdk/contracts/node_modules/ramda/src/find.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xfind = require_xfind();
      var find = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["find"], _xfind, function find2(fn, list) {
          var idx = 0;
          var len = list.length;
          while (idx < len) {
            if (fn(list[idx])) {
              return list[idx];
            }
            idx += 1;
          }
        })
      );
      module.exports = find;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xfindIndex.js
  var require_xfindIndex = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xfindIndex.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduced = require_reduced();
      var _xfBase = require_xfBase();
      var XFindIndex = /* @__PURE__ */ function() {
        function XFindIndex2(f, xf) {
          this.xf = xf;
          this.f = f;
          this.idx = -1;
          this.found = false;
        }
        XFindIndex2.prototype["@@transducer/init"] = _xfBase.init;
        XFindIndex2.prototype["@@transducer/result"] = function(result) {
          if (!this.found) {
            result = this.xf["@@transducer/step"](result, -1);
          }
          return this.xf["@@transducer/result"](result);
        };
        XFindIndex2.prototype["@@transducer/step"] = function(result, input) {
          this.idx += 1;
          if (this.f(input)) {
            this.found = true;
            result = _reduced(this.xf["@@transducer/step"](result, this.idx));
          }
          return result;
        };
        return XFindIndex2;
      }();
      var _xfindIndex = /* @__PURE__ */ _curry2(function _xfindIndex2(f, xf) {
        return new XFindIndex(f, xf);
      });
      module.exports = _xfindIndex;
    }
  });

  // sdk/contracts/node_modules/ramda/src/findIndex.js
  var require_findIndex = __commonJS({
    "sdk/contracts/node_modules/ramda/src/findIndex.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xfindIndex = require_xfindIndex();
      var findIndex = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xfindIndex, function findIndex2(fn, list) {
          var idx = 0;
          var len = list.length;
          while (idx < len) {
            if (fn(list[idx])) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        })
      );
      module.exports = findIndex;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xfindLast.js
  var require_xfindLast = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xfindLast.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XFindLast = /* @__PURE__ */ function() {
        function XFindLast2(f, xf) {
          this.xf = xf;
          this.f = f;
        }
        XFindLast2.prototype["@@transducer/init"] = _xfBase.init;
        XFindLast2.prototype["@@transducer/result"] = function(result) {
          return this.xf["@@transducer/result"](this.xf["@@transducer/step"](result, this.last));
        };
        XFindLast2.prototype["@@transducer/step"] = function(result, input) {
          if (this.f(input)) {
            this.last = input;
          }
          return result;
        };
        return XFindLast2;
      }();
      var _xfindLast = /* @__PURE__ */ _curry2(function _xfindLast2(f, xf) {
        return new XFindLast(f, xf);
      });
      module.exports = _xfindLast;
    }
  });

  // sdk/contracts/node_modules/ramda/src/findLast.js
  var require_findLast = __commonJS({
    "sdk/contracts/node_modules/ramda/src/findLast.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xfindLast = require_xfindLast();
      var findLast = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xfindLast, function findLast2(fn, list) {
          var idx = list.length - 1;
          while (idx >= 0) {
            if (fn(list[idx])) {
              return list[idx];
            }
            idx -= 1;
          }
        })
      );
      module.exports = findLast;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xfindLastIndex.js
  var require_xfindLastIndex = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xfindLastIndex.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XFindLastIndex = /* @__PURE__ */ function() {
        function XFindLastIndex2(f, xf) {
          this.xf = xf;
          this.f = f;
          this.idx = -1;
          this.lastIdx = -1;
        }
        XFindLastIndex2.prototype["@@transducer/init"] = _xfBase.init;
        XFindLastIndex2.prototype["@@transducer/result"] = function(result) {
          return this.xf["@@transducer/result"](this.xf["@@transducer/step"](result, this.lastIdx));
        };
        XFindLastIndex2.prototype["@@transducer/step"] = function(result, input) {
          this.idx += 1;
          if (this.f(input)) {
            this.lastIdx = this.idx;
          }
          return result;
        };
        return XFindLastIndex2;
      }();
      var _xfindLastIndex = /* @__PURE__ */ _curry2(function _xfindLastIndex2(f, xf) {
        return new XFindLastIndex(f, xf);
      });
      module.exports = _xfindLastIndex;
    }
  });

  // sdk/contracts/node_modules/ramda/src/findLastIndex.js
  var require_findLastIndex = __commonJS({
    "sdk/contracts/node_modules/ramda/src/findLastIndex.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xfindLastIndex = require_xfindLastIndex();
      var findLastIndex = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xfindLastIndex, function findLastIndex2(fn, list) {
          var idx = list.length - 1;
          while (idx >= 0) {
            if (fn(list[idx])) {
              return idx;
            }
            idx -= 1;
          }
          return -1;
        })
      );
      module.exports = findLastIndex;
    }
  });

  // sdk/contracts/node_modules/ramda/src/flatten.js
  var require_flatten = __commonJS({
    "sdk/contracts/node_modules/ramda/src/flatten.js"(exports, module) {
      var _curry1 = require_curry1();
      var _makeFlat = require_makeFlat();
      var flatten = /* @__PURE__ */ _curry1(
        /* @__PURE__ */ _makeFlat(true)
      );
      module.exports = flatten;
    }
  });

  // sdk/contracts/node_modules/ramda/src/flip.js
  var require_flip = __commonJS({
    "sdk/contracts/node_modules/ramda/src/flip.js"(exports, module) {
      var _curry1 = require_curry1();
      var curryN = require_curryN2();
      var flip = /* @__PURE__ */ _curry1(function flip2(fn) {
        return curryN(fn.length, function(a, b) {
          var args = Array.prototype.slice.call(arguments, 0);
          args[0] = b;
          args[1] = a;
          return fn.apply(this, args);
        });
      });
      module.exports = flip;
    }
  });

  // sdk/contracts/node_modules/ramda/src/forEach.js
  var require_forEach = __commonJS({
    "sdk/contracts/node_modules/ramda/src/forEach.js"(exports, module) {
      var _checkForMethod = require_checkForMethod();
      var _curry2 = require_curry2();
      var forEach = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _checkForMethod("forEach", function forEach2(fn, list) {
          var len = list.length;
          var idx = 0;
          while (idx < len) {
            fn(list[idx]);
            idx += 1;
          }
          return list;
        })
      );
      module.exports = forEach;
    }
  });

  // sdk/contracts/node_modules/ramda/src/forEachObjIndexed.js
  var require_forEachObjIndexed = __commonJS({
    "sdk/contracts/node_modules/ramda/src/forEachObjIndexed.js"(exports, module) {
      var _curry2 = require_curry2();
      var keys = require_keys();
      var forEachObjIndexed = /* @__PURE__ */ _curry2(function forEachObjIndexed2(fn, obj) {
        var keyList = keys(obj);
        var idx = 0;
        while (idx < keyList.length) {
          var key = keyList[idx];
          fn(obj[key], key, obj);
          idx += 1;
        }
        return obj;
      });
      module.exports = forEachObjIndexed;
    }
  });

  // sdk/contracts/node_modules/ramda/src/fromPairs.js
  var require_fromPairs = __commonJS({
    "sdk/contracts/node_modules/ramda/src/fromPairs.js"(exports, module) {
      var _curry1 = require_curry1();
      var fromPairs = /* @__PURE__ */ _curry1(function fromPairs2(pairs) {
        var result = {};
        var idx = 0;
        while (idx < pairs.length) {
          result[pairs[idx][0]] = pairs[idx][1];
          idx += 1;
        }
        return result;
      });
      module.exports = fromPairs;
    }
  });

  // sdk/contracts/node_modules/ramda/src/groupBy.js
  var require_groupBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/groupBy.js"(exports, module) {
      var _checkForMethod = require_checkForMethod();
      var _curry2 = require_curry2();
      var reduceBy = require_reduceBy();
      var groupBy = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _checkForMethod(
          "groupBy",
          /* @__PURE__ */ reduceBy(function(acc, item) {
            acc.push(item);
            return acc;
          }, [])
        )
      );
      module.exports = groupBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/groupWith.js
  var require_groupWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/groupWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var groupWith = /* @__PURE__ */ _curry2(function(fn, list) {
        var res = [];
        var idx = 0;
        var len = list.length;
        while (idx < len) {
          var nextidx = idx + 1;
          while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
            nextidx += 1;
          }
          res.push(list.slice(idx, nextidx));
          idx = nextidx;
        }
        return res;
      });
      module.exports = groupWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/gt.js
  var require_gt = __commonJS({
    "sdk/contracts/node_modules/ramda/src/gt.js"(exports, module) {
      var _curry2 = require_curry2();
      var gt = /* @__PURE__ */ _curry2(function gt2(a, b) {
        return a > b;
      });
      module.exports = gt;
    }
  });

  // sdk/contracts/node_modules/ramda/src/gte.js
  var require_gte = __commonJS({
    "sdk/contracts/node_modules/ramda/src/gte.js"(exports, module) {
      var _curry2 = require_curry2();
      var gte = /* @__PURE__ */ _curry2(function gte2(a, b) {
        return a >= b;
      });
      module.exports = gte;
    }
  });

  // sdk/contracts/node_modules/ramda/src/hasPath.js
  var require_hasPath = __commonJS({
    "sdk/contracts/node_modules/ramda/src/hasPath.js"(exports, module) {
      var _curry2 = require_curry2();
      var _has = require_has();
      var isNil = require_isNil();
      var hasPath = /* @__PURE__ */ _curry2(function hasPath2(_path, obj) {
        if (_path.length === 0 || isNil(obj)) {
          return false;
        }
        var val = obj;
        var idx = 0;
        while (idx < _path.length) {
          if (!isNil(val) && _has(_path[idx], val)) {
            val = val[_path[idx]];
            idx += 1;
          } else {
            return false;
          }
        }
        return true;
      });
      module.exports = hasPath;
    }
  });

  // sdk/contracts/node_modules/ramda/src/has.js
  var require_has2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/has.js"(exports, module) {
      var _curry2 = require_curry2();
      var hasPath = require_hasPath();
      var has = /* @__PURE__ */ _curry2(function has2(prop, obj) {
        return hasPath([prop], obj);
      });
      module.exports = has;
    }
  });

  // sdk/contracts/node_modules/ramda/src/hasIn.js
  var require_hasIn = __commonJS({
    "sdk/contracts/node_modules/ramda/src/hasIn.js"(exports, module) {
      var _curry2 = require_curry2();
      var isNil = require_isNil();
      var hasIn = /* @__PURE__ */ _curry2(function hasIn2(prop, obj) {
        if (isNil(obj)) {
          return false;
        }
        return prop in obj;
      });
      module.exports = hasIn;
    }
  });

  // sdk/contracts/node_modules/ramda/src/identical.js
  var require_identical = __commonJS({
    "sdk/contracts/node_modules/ramda/src/identical.js"(exports, module) {
      var _objectIs = require_objectIs();
      var _curry2 = require_curry2();
      var identical = /* @__PURE__ */ _curry2(_objectIs);
      module.exports = identical;
    }
  });

  // sdk/contracts/node_modules/ramda/src/ifElse.js
  var require_ifElse = __commonJS({
    "sdk/contracts/node_modules/ramda/src/ifElse.js"(exports, module) {
      var _curry3 = require_curry3();
      var curryN = require_curryN2();
      var ifElse = /* @__PURE__ */ _curry3(function ifElse2(condition, onTrue, onFalse) {
        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
          return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
        });
      });
      module.exports = ifElse;
    }
  });

  // sdk/contracts/node_modules/ramda/src/inc.js
  var require_inc = __commonJS({
    "sdk/contracts/node_modules/ramda/src/inc.js"(exports, module) {
      var add = require_add();
      var inc = /* @__PURE__ */ add(1);
      module.exports = inc;
    }
  });

  // sdk/contracts/node_modules/ramda/src/includes.js
  var require_includes2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/includes.js"(exports, module) {
      var _includes = require_includes();
      var _curry2 = require_curry2();
      var includes = /* @__PURE__ */ _curry2(_includes);
      module.exports = includes;
    }
  });

  // sdk/contracts/node_modules/ramda/src/indexBy.js
  var require_indexBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/indexBy.js"(exports, module) {
      var reduceBy = require_reduceBy();
      var indexBy = /* @__PURE__ */ reduceBy(function(acc, elem) {
        return elem;
      }, null);
      module.exports = indexBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/indexOf.js
  var require_indexOf2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/indexOf.js"(exports, module) {
      var _curry2 = require_curry2();
      var _indexOf = require_indexOf();
      var _isArray = require_isArray();
      var indexOf = /* @__PURE__ */ _curry2(function indexOf2(target, xs) {
        return typeof xs.indexOf === "function" && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
      });
      module.exports = indexOf;
    }
  });

  // sdk/contracts/node_modules/ramda/src/init.js
  var require_init = __commonJS({
    "sdk/contracts/node_modules/ramda/src/init.js"(exports, module) {
      var slice = require_slice();
      var init = /* @__PURE__ */ slice(0, -1);
      module.exports = init;
    }
  });

  // sdk/contracts/node_modules/ramda/src/innerJoin.js
  var require_innerJoin = __commonJS({
    "sdk/contracts/node_modules/ramda/src/innerJoin.js"(exports, module) {
      var _includesWith = require_includesWith();
      var _curry3 = require_curry3();
      var _filter = require_filter();
      var innerJoin = /* @__PURE__ */ _curry3(function innerJoin2(pred, xs, ys) {
        return _filter(function(x) {
          return _includesWith(pred, x, ys);
        }, xs);
      });
      module.exports = innerJoin;
    }
  });

  // sdk/contracts/node_modules/ramda/src/insert.js
  var require_insert = __commonJS({
    "sdk/contracts/node_modules/ramda/src/insert.js"(exports, module) {
      var _curry3 = require_curry3();
      var insert = /* @__PURE__ */ _curry3(function insert2(idx, elt, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        var result = Array.prototype.slice.call(list, 0);
        result.splice(idx, 0, elt);
        return result;
      });
      module.exports = insert;
    }
  });

  // sdk/contracts/node_modules/ramda/src/insertAll.js
  var require_insertAll = __commonJS({
    "sdk/contracts/node_modules/ramda/src/insertAll.js"(exports, module) {
      var _curry3 = require_curry3();
      var insertAll = /* @__PURE__ */ _curry3(function insertAll2(idx, elts, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
      });
      module.exports = insertAll;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xuniqBy.js
  var require_xuniqBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xuniqBy.js"(exports, module) {
      var _curry2 = require_curry2();
      var _Set = require_Set();
      var _xfBase = require_xfBase();
      var XUniqBy = /* @__PURE__ */ function() {
        function XUniqBy2(f, xf) {
          this.xf = xf;
          this.f = f;
          this.set = new _Set();
        }
        XUniqBy2.prototype["@@transducer/init"] = _xfBase.init;
        XUniqBy2.prototype["@@transducer/result"] = _xfBase.result;
        XUniqBy2.prototype["@@transducer/step"] = function(result, input) {
          return this.set.add(this.f(input)) ? this.xf["@@transducer/step"](result, input) : result;
        };
        return XUniqBy2;
      }();
      var _xuniqBy = /* @__PURE__ */ _curry2(function _xuniqBy2(f, xf) {
        return new XUniqBy(f, xf);
      });
      module.exports = _xuniqBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/uniqBy.js
  var require_uniqBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/uniqBy.js"(exports, module) {
      var _Set = require_Set();
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xuniqBy = require_xuniqBy();
      var uniqBy = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xuniqBy, function(fn, list) {
          var set = new _Set();
          var result = [];
          var idx = 0;
          var appliedItem, item;
          while (idx < list.length) {
            item = list[idx];
            appliedItem = fn(item);
            if (set.add(appliedItem)) {
              result.push(item);
            }
            idx += 1;
          }
          return result;
        })
      );
      module.exports = uniqBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/uniq.js
  var require_uniq = __commonJS({
    "sdk/contracts/node_modules/ramda/src/uniq.js"(exports, module) {
      var identity = require_identity2();
      var uniqBy = require_uniqBy();
      var uniq = /* @__PURE__ */ uniqBy(identity);
      module.exports = uniq;
    }
  });

  // sdk/contracts/node_modules/ramda/src/intersection.js
  var require_intersection = __commonJS({
    "sdk/contracts/node_modules/ramda/src/intersection.js"(exports, module) {
      var _includes = require_includes();
      var _curry2 = require_curry2();
      var _filter = require_filter();
      var flip = require_flip();
      var uniq = require_uniq();
      var intersection = /* @__PURE__ */ _curry2(function intersection2(list1, list2) {
        var lookupList, filteredList;
        if (list1.length > list2.length) {
          lookupList = list1;
          filteredList = list2;
        } else {
          lookupList = list2;
          filteredList = list1;
        }
        return uniq(_filter(flip(_includes)(lookupList), filteredList));
      });
      module.exports = intersection;
    }
  });

  // sdk/contracts/node_modules/ramda/src/intersperse.js
  var require_intersperse = __commonJS({
    "sdk/contracts/node_modules/ramda/src/intersperse.js"(exports, module) {
      var _checkForMethod = require_checkForMethod();
      var _curry2 = require_curry2();
      var intersperse = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _checkForMethod("intersperse", function intersperse2(separator, list) {
          var out = [];
          var idx = 0;
          var length = list.length;
          while (idx < length) {
            if (idx === length - 1) {
              out.push(list[idx]);
            } else {
              out.push(list[idx], separator);
            }
            idx += 1;
          }
          return out;
        })
      );
      module.exports = intersperse;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_objectAssign.js
  var require_objectAssign = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_objectAssign.js"(exports, module) {
      var _has = require_has();
      function _objectAssign(target) {
        if (target == null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }
        var output = Object(target);
        var idx = 1;
        var length = arguments.length;
        while (idx < length) {
          var source = arguments[idx];
          if (source != null) {
            for (var nextKey in source) {
              if (_has(nextKey, source)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
          idx += 1;
        }
        return output;
      }
      module.exports = typeof Object.assign === "function" ? Object.assign : _objectAssign;
    }
  });

  // sdk/contracts/node_modules/ramda/src/objOf.js
  var require_objOf = __commonJS({
    "sdk/contracts/node_modules/ramda/src/objOf.js"(exports, module) {
      var _curry2 = require_curry2();
      var objOf = /* @__PURE__ */ _curry2(function objOf2(key, val) {
        var obj = {};
        obj[key] = val;
        return obj;
      });
      module.exports = objOf;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_stepCat.js
  var require_stepCat = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_stepCat.js"(exports, module) {
      var _objectAssign = require_objectAssign();
      var _identity = require_identity();
      var _isArrayLike = require_isArrayLike();
      var _isTransformer = require_isTransformer();
      var objOf = require_objOf();
      var _stepCatArray = {
        "@@transducer/init": Array,
        "@@transducer/step": function(xs, x) {
          xs.push(x);
          return xs;
        },
        "@@transducer/result": _identity
      };
      var _stepCatString = {
        "@@transducer/init": String,
        "@@transducer/step": function(a, b) {
          return a + b;
        },
        "@@transducer/result": _identity
      };
      var _stepCatObject = {
        "@@transducer/init": Object,
        "@@transducer/step": function(result, input) {
          return _objectAssign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
        },
        "@@transducer/result": _identity
      };
      function _stepCat(obj) {
        if (_isTransformer(obj)) {
          return obj;
        }
        if (_isArrayLike(obj)) {
          return _stepCatArray;
        }
        if (typeof obj === "string") {
          return _stepCatString;
        }
        if (typeof obj === "object") {
          return _stepCatObject;
        }
        throw new Error("Cannot create transformer for " + obj);
      }
      module.exports = _stepCat;
    }
  });

  // sdk/contracts/node_modules/ramda/src/into.js
  var require_into = __commonJS({
    "sdk/contracts/node_modules/ramda/src/into.js"(exports, module) {
      var _clone = require_clone();
      var _curry3 = require_curry3();
      var _isTransformer = require_isTransformer();
      var _reduce = require_reduce();
      var _stepCat = require_stepCat();
      var into = /* @__PURE__ */ _curry3(function into2(acc, xf, list) {
        return _isTransformer(acc) ? _reduce(xf(acc), acc["@@transducer/init"](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
      });
      module.exports = into;
    }
  });

  // sdk/contracts/node_modules/ramda/src/invert.js
  var require_invert = __commonJS({
    "sdk/contracts/node_modules/ramda/src/invert.js"(exports, module) {
      var _curry1 = require_curry1();
      var _has = require_has();
      var keys = require_keys();
      var invert = /* @__PURE__ */ _curry1(function invert2(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = 0;
        var out = {};
        while (idx < len) {
          var key = props[idx];
          var val = obj[key];
          var list = _has(val, out) ? out[val] : out[val] = [];
          list[list.length] = key;
          idx += 1;
        }
        return out;
      });
      module.exports = invert;
    }
  });

  // sdk/contracts/node_modules/ramda/src/invertObj.js
  var require_invertObj = __commonJS({
    "sdk/contracts/node_modules/ramda/src/invertObj.js"(exports, module) {
      var _curry1 = require_curry1();
      var keys = require_keys();
      var invertObj = /* @__PURE__ */ _curry1(function invertObj2(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = 0;
        var out = {};
        while (idx < len) {
          var key = props[idx];
          out[obj[key]] = key;
          idx += 1;
        }
        return out;
      });
      module.exports = invertObj;
    }
  });

  // sdk/contracts/node_modules/ramda/src/invoker.js
  var require_invoker = __commonJS({
    "sdk/contracts/node_modules/ramda/src/invoker.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isFunction = require_isFunction();
      var curryN = require_curryN2();
      var toString = require_toString2();
      var invoker = /* @__PURE__ */ _curry2(function invoker2(arity, method) {
        return curryN(arity + 1, function() {
          var target = arguments[arity];
          if (target != null && _isFunction(target[method])) {
            return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
          }
          throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
        });
      });
      module.exports = invoker;
    }
  });

  // sdk/contracts/node_modules/ramda/src/is.js
  var require_is = __commonJS({
    "sdk/contracts/node_modules/ramda/src/is.js"(exports, module) {
      var _curry2 = require_curry2();
      var is = /* @__PURE__ */ _curry2(function is2(Ctor, val) {
        return val instanceof Ctor || val != null && (val.constructor === Ctor || Ctor.name === "Object" && typeof val === "object");
      });
      module.exports = is;
    }
  });

  // sdk/contracts/node_modules/ramda/src/isEmpty.js
  var require_isEmpty = __commonJS({
    "sdk/contracts/node_modules/ramda/src/isEmpty.js"(exports, module) {
      var _curry1 = require_curry1();
      var empty = require_empty();
      var equals = require_equals2();
      var isEmpty = /* @__PURE__ */ _curry1(function isEmpty2(x) {
        return x != null && equals(x, empty(x));
      });
      module.exports = isEmpty;
    }
  });

  // sdk/contracts/node_modules/ramda/src/join.js
  var require_join = __commonJS({
    "sdk/contracts/node_modules/ramda/src/join.js"(exports, module) {
      var invoker = require_invoker();
      var join = /* @__PURE__ */ invoker(1, "join");
      module.exports = join;
    }
  });

  // sdk/contracts/node_modules/ramda/src/juxt.js
  var require_juxt = __commonJS({
    "sdk/contracts/node_modules/ramda/src/juxt.js"(exports, module) {
      var _curry1 = require_curry1();
      var converge = require_converge();
      var juxt = /* @__PURE__ */ _curry1(function juxt2(fns) {
        return converge(function() {
          return Array.prototype.slice.call(arguments, 0);
        }, fns);
      });
      module.exports = juxt;
    }
  });

  // sdk/contracts/node_modules/ramda/src/keysIn.js
  var require_keysIn = __commonJS({
    "sdk/contracts/node_modules/ramda/src/keysIn.js"(exports, module) {
      var _curry1 = require_curry1();
      var keysIn = /* @__PURE__ */ _curry1(function keysIn2(obj) {
        var prop;
        var ks = [];
        for (prop in obj) {
          ks[ks.length] = prop;
        }
        return ks;
      });
      module.exports = keysIn;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lastIndexOf.js
  var require_lastIndexOf = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lastIndexOf.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isArray = require_isArray();
      var equals = require_equals2();
      var lastIndexOf = /* @__PURE__ */ _curry2(function lastIndexOf2(target, xs) {
        if (typeof xs.lastIndexOf === "function" && !_isArray(xs)) {
          return xs.lastIndexOf(target);
        } else {
          var idx = xs.length - 1;
          while (idx >= 0) {
            if (equals(xs[idx], target)) {
              return idx;
            }
            idx -= 1;
          }
          return -1;
        }
      });
      module.exports = lastIndexOf;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isNumber.js
  var require_isNumber = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isNumber.js"(exports, module) {
      function _isNumber(x) {
        return Object.prototype.toString.call(x) === "[object Number]";
      }
      module.exports = _isNumber;
    }
  });

  // sdk/contracts/node_modules/ramda/src/length.js
  var require_length = __commonJS({
    "sdk/contracts/node_modules/ramda/src/length.js"(exports, module) {
      var _curry1 = require_curry1();
      var _isNumber = require_isNumber();
      var length = /* @__PURE__ */ _curry1(function length2(list) {
        return list != null && _isNumber(list.length) ? list.length : NaN;
      });
      module.exports = length;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lens.js
  var require_lens = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lens.js"(exports, module) {
      var _curry2 = require_curry2();
      var map = require_map2();
      var lens = /* @__PURE__ */ _curry2(function lens2(getter, setter) {
        return function(toFunctorFn) {
          return function(target) {
            return map(function(focus) {
              return setter(focus, target);
            }, toFunctorFn(getter(target)));
          };
        };
      });
      module.exports = lens;
    }
  });

  // sdk/contracts/node_modules/ramda/src/update.js
  var require_update = __commonJS({
    "sdk/contracts/node_modules/ramda/src/update.js"(exports, module) {
      var _curry3 = require_curry3();
      var adjust = require_adjust();
      var always = require_always();
      var update = /* @__PURE__ */ _curry3(function update2(idx, x, list) {
        return adjust(idx, always(x), list);
      });
      module.exports = update;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lensIndex.js
  var require_lensIndex = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lensIndex.js"(exports, module) {
      var _curry1 = require_curry1();
      var lens = require_lens();
      var nth = require_nth();
      var update = require_update();
      var lensIndex = /* @__PURE__ */ _curry1(function lensIndex2(n) {
        return lens(nth(n), update(n));
      });
      module.exports = lensIndex;
    }
  });

  // sdk/contracts/node_modules/ramda/src/paths.js
  var require_paths = __commonJS({
    "sdk/contracts/node_modules/ramda/src/paths.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isInteger = require_isInteger();
      var nth = require_nth();
      var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
        return pathsArray.map(function(paths3) {
          var val = obj;
          var idx = 0;
          var p;
          while (idx < paths3.length) {
            if (val == null) {
              return;
            }
            p = paths3[idx];
            val = _isInteger(p) ? nth(p, val) : val[p];
            idx += 1;
          }
          return val;
        });
      });
      module.exports = paths;
    }
  });

  // sdk/contracts/node_modules/ramda/src/path.js
  var require_path = __commonJS({
    "sdk/contracts/node_modules/ramda/src/path.js"(exports, module) {
      var _curry2 = require_curry2();
      var paths = require_paths();
      var path = /* @__PURE__ */ _curry2(function path2(pathAr, obj) {
        return paths([pathAr], obj)[0];
      });
      module.exports = path;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lensPath.js
  var require_lensPath = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lensPath.js"(exports, module) {
      var _curry1 = require_curry1();
      var assocPath = require_assocPath();
      var lens = require_lens();
      var path = require_path();
      var lensPath = /* @__PURE__ */ _curry1(function lensPath2(p) {
        return lens(path(p), assocPath(p));
      });
      module.exports = lensPath;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lensProp.js
  var require_lensProp = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lensProp.js"(exports, module) {
      var _curry1 = require_curry1();
      var assoc = require_assoc2();
      var lens = require_lens();
      var prop = require_prop();
      var lensProp = /* @__PURE__ */ _curry1(function lensProp2(k) {
        return lens(prop(k), assoc(k));
      });
      module.exports = lensProp;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lt.js
  var require_lt = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lt.js"(exports, module) {
      var _curry2 = require_curry2();
      var lt = /* @__PURE__ */ _curry2(function lt2(a, b) {
        return a < b;
      });
      module.exports = lt;
    }
  });

  // sdk/contracts/node_modules/ramda/src/lte.js
  var require_lte = __commonJS({
    "sdk/contracts/node_modules/ramda/src/lte.js"(exports, module) {
      var _curry2 = require_curry2();
      var lte = /* @__PURE__ */ _curry2(function lte2(a, b) {
        return a <= b;
      });
      module.exports = lte;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mapAccum.js
  var require_mapAccum = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mapAccum.js"(exports, module) {
      var _curry3 = require_curry3();
      var mapAccum = /* @__PURE__ */ _curry3(function mapAccum2(fn, acc, list) {
        var idx = 0;
        var len = list.length;
        var result = [];
        var tuple = [acc];
        while (idx < len) {
          tuple = fn(tuple[0], list[idx]);
          result[idx] = tuple[1];
          idx += 1;
        }
        return [tuple[0], result];
      });
      module.exports = mapAccum;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mapAccumRight.js
  var require_mapAccumRight = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mapAccumRight.js"(exports, module) {
      var _curry3 = require_curry3();
      var mapAccumRight = /* @__PURE__ */ _curry3(function mapAccumRight2(fn, acc, list) {
        var idx = list.length - 1;
        var result = [];
        var tuple = [acc];
        while (idx >= 0) {
          tuple = fn(tuple[0], list[idx]);
          result[idx] = tuple[1];
          idx -= 1;
        }
        return [tuple[0], result];
      });
      module.exports = mapAccumRight;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mapObjIndexed.js
  var require_mapObjIndexed = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mapObjIndexed.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduce = require_reduce();
      var keys = require_keys();
      var mapObjIndexed = /* @__PURE__ */ _curry2(function mapObjIndexed2(fn, obj) {
        return _reduce(function(acc, key) {
          acc[key] = fn(obj[key], key, obj);
          return acc;
        }, {}, keys(obj));
      });
      module.exports = mapObjIndexed;
    }
  });

  // sdk/contracts/node_modules/ramda/src/match.js
  var require_match = __commonJS({
    "sdk/contracts/node_modules/ramda/src/match.js"(exports, module) {
      var _curry2 = require_curry2();
      var match = /* @__PURE__ */ _curry2(function match2(rx, str) {
        return str.match(rx) || [];
      });
      module.exports = match;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mathMod.js
  var require_mathMod = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mathMod.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isInteger = require_isInteger();
      var mathMod = /* @__PURE__ */ _curry2(function mathMod2(m, p) {
        if (!_isInteger(m)) {
          return NaN;
        }
        if (!_isInteger(p) || p < 1) {
          return NaN;
        }
        return (m % p + p) % p;
      });
      module.exports = mathMod;
    }
  });

  // sdk/contracts/node_modules/ramda/src/maxBy.js
  var require_maxBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/maxBy.js"(exports, module) {
      var _curry3 = require_curry3();
      var maxBy = /* @__PURE__ */ _curry3(function maxBy2(f, a, b) {
        return f(b) > f(a) ? b : a;
      });
      module.exports = maxBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/sum.js
  var require_sum = __commonJS({
    "sdk/contracts/node_modules/ramda/src/sum.js"(exports, module) {
      var add = require_add();
      var reduce = require_reduce2();
      var sum = /* @__PURE__ */ reduce(add, 0);
      module.exports = sum;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mean.js
  var require_mean = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mean.js"(exports, module) {
      var _curry1 = require_curry1();
      var sum = require_sum();
      var mean = /* @__PURE__ */ _curry1(function mean2(list) {
        return sum(list) / list.length;
      });
      module.exports = mean;
    }
  });

  // sdk/contracts/node_modules/ramda/src/median.js
  var require_median = __commonJS({
    "sdk/contracts/node_modules/ramda/src/median.js"(exports, module) {
      var _curry1 = require_curry1();
      var mean = require_mean();
      var median = /* @__PURE__ */ _curry1(function median2(list) {
        var len = list.length;
        if (len === 0) {
          return NaN;
        }
        var width = 2 - len % 2;
        var idx = (len - width) / 2;
        return mean(Array.prototype.slice.call(list, 0).sort(function(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        }).slice(idx, idx + width));
      });
      module.exports = median;
    }
  });

  // sdk/contracts/node_modules/ramda/src/memoizeWith.js
  var require_memoizeWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/memoizeWith.js"(exports, module) {
      var _arity = require_arity();
      var _curry2 = require_curry2();
      var _has = require_has();
      var memoizeWith = /* @__PURE__ */ _curry2(function memoizeWith2(mFn, fn) {
        var cache = {};
        return _arity(fn.length, function() {
          var key = mFn.apply(this, arguments);
          if (!_has(key, cache)) {
            cache[key] = fn.apply(this, arguments);
          }
          return cache[key];
        });
      });
      module.exports = memoizeWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeAll.js
  var require_mergeAll = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeAll.js"(exports, module) {
      var _objectAssign = require_objectAssign();
      var _curry1 = require_curry1();
      var mergeAll = /* @__PURE__ */ _curry1(function mergeAll2(list) {
        return _objectAssign.apply(null, [{}].concat(list));
      });
      module.exports = mergeAll;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeWithKey.js
  var require_mergeWithKey = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeWithKey.js"(exports, module) {
      var _curry3 = require_curry3();
      var _has = require_has();
      var mergeWithKey = /* @__PURE__ */ _curry3(function mergeWithKey2(fn, l, r) {
        var result = {};
        var k;
        for (k in l) {
          if (_has(k, l)) {
            result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
          }
        }
        for (k in r) {
          if (_has(k, r) && !_has(k, result)) {
            result[k] = r[k];
          }
        }
        return result;
      });
      module.exports = mergeWithKey;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeDeepWithKey.js
  var require_mergeDeepWithKey = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeDeepWithKey.js"(exports, module) {
      var _curry3 = require_curry3();
      var _isObject = require_isObject();
      var mergeWithKey = require_mergeWithKey();
      var mergeDeepWithKey = /* @__PURE__ */ _curry3(function mergeDeepWithKey2(fn, lObj, rObj) {
        return mergeWithKey(function(k, lVal, rVal) {
          if (_isObject(lVal) && _isObject(rVal)) {
            return mergeDeepWithKey2(fn, lVal, rVal);
          } else {
            return fn(k, lVal, rVal);
          }
        }, lObj, rObj);
      });
      module.exports = mergeDeepWithKey;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeDeepLeft.js
  var require_mergeDeepLeft = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeDeepLeft.js"(exports, module) {
      var _curry2 = require_curry2();
      var mergeDeepWithKey = require_mergeDeepWithKey();
      var mergeDeepLeft = /* @__PURE__ */ _curry2(function mergeDeepLeft2(lObj, rObj) {
        return mergeDeepWithKey(function(k, lVal, rVal) {
          return lVal;
        }, lObj, rObj);
      });
      module.exports = mergeDeepLeft;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeDeepRight.js
  var require_mergeDeepRight = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeDeepRight.js"(exports, module) {
      var _curry2 = require_curry2();
      var mergeDeepWithKey = require_mergeDeepWithKey();
      var mergeDeepRight = /* @__PURE__ */ _curry2(function mergeDeepRight2(lObj, rObj) {
        return mergeDeepWithKey(function(k, lVal, rVal) {
          return rVal;
        }, lObj, rObj);
      });
      module.exports = mergeDeepRight;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeDeepWith.js
  var require_mergeDeepWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeDeepWith.js"(exports, module) {
      var _curry3 = require_curry3();
      var mergeDeepWithKey = require_mergeDeepWithKey();
      var mergeDeepWith = /* @__PURE__ */ _curry3(function mergeDeepWith2(fn, lObj, rObj) {
        return mergeDeepWithKey(function(k, lVal, rVal) {
          return fn(lVal, rVal);
        }, lObj, rObj);
      });
      module.exports = mergeDeepWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeLeft.js
  var require_mergeLeft = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeLeft.js"(exports, module) {
      var _objectAssign = require_objectAssign();
      var _curry2 = require_curry2();
      var mergeLeft = /* @__PURE__ */ _curry2(function mergeLeft2(l, r) {
        return _objectAssign({}, r, l);
      });
      module.exports = mergeLeft;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeRight.js
  var require_mergeRight = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeRight.js"(exports, module) {
      var _objectAssign = require_objectAssign();
      var _curry2 = require_curry2();
      var mergeRight = /* @__PURE__ */ _curry2(function mergeRight2(l, r) {
        return _objectAssign({}, l, r);
      });
      module.exports = mergeRight;
    }
  });

  // sdk/contracts/node_modules/ramda/src/mergeWith.js
  var require_mergeWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/mergeWith.js"(exports, module) {
      var _curry3 = require_curry3();
      var mergeWithKey = require_mergeWithKey();
      var mergeWith = /* @__PURE__ */ _curry3(function mergeWith2(fn, l, r) {
        return mergeWithKey(function(_2, _l, _r) {
          return fn(_l, _r);
        }, l, r);
      });
      module.exports = mergeWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/min.js
  var require_min = __commonJS({
    "sdk/contracts/node_modules/ramda/src/min.js"(exports, module) {
      var _curry2 = require_curry2();
      var min = /* @__PURE__ */ _curry2(function min2(a, b) {
        return b < a ? b : a;
      });
      module.exports = min;
    }
  });

  // sdk/contracts/node_modules/ramda/src/minBy.js
  var require_minBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/minBy.js"(exports, module) {
      var _curry3 = require_curry3();
      var minBy = /* @__PURE__ */ _curry3(function minBy2(f, a, b) {
        return f(b) < f(a) ? b : a;
      });
      module.exports = minBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_modify.js
  var require_modify = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_modify.js"(exports, module) {
      var _isArray = require_isArray();
      var _isInteger = require_isInteger();
      function _modify(prop, fn, obj) {
        if (_isInteger(prop) && _isArray(obj)) {
          var arr = [].concat(obj);
          arr[prop] = fn(arr[prop]);
          return arr;
        }
        var result = {};
        for (var p in obj) {
          result[p] = obj[p];
        }
        result[prop] = fn(result[prop]);
        return result;
      }
      module.exports = _modify;
    }
  });

  // sdk/contracts/node_modules/ramda/src/modifyPath.js
  var require_modifyPath = __commonJS({
    "sdk/contracts/node_modules/ramda/src/modifyPath.js"(exports, module) {
      var _curry3 = require_curry3();
      var _isArray = require_isArray();
      var _isObject = require_isObject();
      var _has = require_has();
      var _assoc = require_assoc();
      var _modify = require_modify();
      var modifyPath = /* @__PURE__ */ _curry3(function modifyPath2(path, fn, object) {
        if (!_isObject(object) && !_isArray(object) || path.length === 0) {
          return object;
        }
        var idx = path[0];
        if (!_has(idx, object)) {
          return object;
        }
        if (path.length === 1) {
          return _modify(idx, fn, object);
        }
        var val = modifyPath2(Array.prototype.slice.call(path, 1), fn, object[idx]);
        if (val === object[idx]) {
          return object;
        }
        return _assoc(idx, val, object);
      });
      module.exports = modifyPath;
    }
  });

  // sdk/contracts/node_modules/ramda/src/modify.js
  var require_modify2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/modify.js"(exports, module) {
      var _curry3 = require_curry3();
      var modifyPath = require_modifyPath();
      var modify = /* @__PURE__ */ _curry3(function modify2(prop, fn, object) {
        return modifyPath([prop], fn, object);
      });
      module.exports = modify;
    }
  });

  // sdk/contracts/node_modules/ramda/src/modulo.js
  var require_modulo = __commonJS({
    "sdk/contracts/node_modules/ramda/src/modulo.js"(exports, module) {
      var _curry2 = require_curry2();
      var modulo = /* @__PURE__ */ _curry2(function modulo2(a, b) {
        return a % b;
      });
      module.exports = modulo;
    }
  });

  // sdk/contracts/node_modules/ramda/src/move.js
  var require_move = __commonJS({
    "sdk/contracts/node_modules/ramda/src/move.js"(exports, module) {
      var _curry3 = require_curry3();
      var move = /* @__PURE__ */ _curry3(function(from, to, list) {
        var length = list.length;
        var result = list.slice();
        var positiveFrom = from < 0 ? length + from : from;
        var positiveTo = to < 0 ? length + to : to;
        var item = result.splice(positiveFrom, 1);
        return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
      });
      module.exports = move;
    }
  });

  // sdk/contracts/node_modules/ramda/src/multiply.js
  var require_multiply = __commonJS({
    "sdk/contracts/node_modules/ramda/src/multiply.js"(exports, module) {
      var _curry2 = require_curry2();
      var multiply = /* @__PURE__ */ _curry2(function multiply2(a, b) {
        return a * b;
      });
      module.exports = multiply;
    }
  });

  // sdk/contracts/node_modules/ramda/src/partialObject.js
  var require_partialObject = __commonJS({
    "sdk/contracts/node_modules/ramda/src/partialObject.js"(exports, module) {
      var mergeDeepRight = require_mergeDeepRight();
      var _curry2 = require_curry2();
      module.exports = /* @__PURE__ */ _curry2((f, o) => (props) => f.call(exports, mergeDeepRight(o, props)));
    }
  });

  // sdk/contracts/node_modules/ramda/src/negate.js
  var require_negate = __commonJS({
    "sdk/contracts/node_modules/ramda/src/negate.js"(exports, module) {
      var _curry1 = require_curry1();
      var negate = /* @__PURE__ */ _curry1(function negate2(n) {
        return -n;
      });
      module.exports = negate;
    }
  });

  // sdk/contracts/node_modules/ramda/src/none.js
  var require_none = __commonJS({
    "sdk/contracts/node_modules/ramda/src/none.js"(exports, module) {
      var _complement = require_complement2();
      var _curry2 = require_curry2();
      var all = require_all();
      var none = /* @__PURE__ */ _curry2(function none2(fn, input) {
        return all(_complement(fn), input);
      });
      module.exports = none;
    }
  });

  // sdk/contracts/node_modules/ramda/src/nthArg.js
  var require_nthArg = __commonJS({
    "sdk/contracts/node_modules/ramda/src/nthArg.js"(exports, module) {
      var _curry1 = require_curry1();
      var curryN = require_curryN2();
      var nth = require_nth();
      var nthArg = /* @__PURE__ */ _curry1(function nthArg2(n) {
        var arity = n < 0 ? 1 : n + 1;
        return curryN(arity, function() {
          return nth(n, arguments);
        });
      });
      module.exports = nthArg;
    }
  });

  // sdk/contracts/node_modules/ramda/src/o.js
  var require_o = __commonJS({
    "sdk/contracts/node_modules/ramda/src/o.js"(exports, module) {
      var _curry3 = require_curry3();
      var o = /* @__PURE__ */ _curry3(function o2(f, g, x) {
        return f(g(x));
      });
      module.exports = o;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_of.js
  var require_of = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_of.js"(exports, module) {
      function _of(x) {
        return [x];
      }
      module.exports = _of;
    }
  });

  // sdk/contracts/node_modules/ramda/src/of.js
  var require_of2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/of.js"(exports, module) {
      var _curry1 = require_curry1();
      var _of = require_of();
      var of = /* @__PURE__ */ _curry1(_of);
      module.exports = of;
    }
  });

  // sdk/contracts/node_modules/ramda/src/omit.js
  var require_omit = __commonJS({
    "sdk/contracts/node_modules/ramda/src/omit.js"(exports, module) {
      var _curry2 = require_curry2();
      var omit = /* @__PURE__ */ _curry2(function omit2(names, obj) {
        var result = {};
        var index = {};
        var idx = 0;
        var len = names.length;
        while (idx < len) {
          index[names[idx]] = 1;
          idx += 1;
        }
        for (var prop in obj) {
          if (!index.hasOwnProperty(prop)) {
            result[prop] = obj[prop];
          }
        }
        return result;
      });
      module.exports = omit;
    }
  });

  // sdk/contracts/node_modules/ramda/src/on.js
  var require_on = __commonJS({
    "sdk/contracts/node_modules/ramda/src/on.js"(exports, module) {
      var curryN = require_curryN();
      var on = /* @__PURE__ */ curryN(4, [], function on2(f, g, a, b) {
        return f(g(a), g(b));
      });
      module.exports = on;
    }
  });

  // sdk/contracts/node_modules/ramda/src/once.js
  var require_once = __commonJS({
    "sdk/contracts/node_modules/ramda/src/once.js"(exports, module) {
      var _arity = require_arity();
      var _curry1 = require_curry1();
      var once = /* @__PURE__ */ _curry1(function once2(fn) {
        var called = false;
        var result;
        return _arity(fn.length, function() {
          if (called) {
            return result;
          }
          called = true;
          result = fn.apply(this, arguments);
          return result;
        });
      });
      module.exports = once;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_assertPromise.js
  var require_assertPromise = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_assertPromise.js"(exports, module) {
      var _isFunction = require_isFunction();
      var _toString = require_toString();
      function _assertPromise(name, p) {
        if (p == null || !_isFunction(p.then)) {
          throw new TypeError("`" + name + "` expected a Promise, received " + _toString(p, []));
        }
      }
      module.exports = _assertPromise;
    }
  });

  // sdk/contracts/node_modules/ramda/src/otherwise.js
  var require_otherwise = __commonJS({
    "sdk/contracts/node_modules/ramda/src/otherwise.js"(exports, module) {
      var _curry2 = require_curry2();
      var _assertPromise = require_assertPromise();
      var otherwise = /* @__PURE__ */ _curry2(function otherwise2(f, p) {
        _assertPromise("otherwise", p);
        return p.then(null, f);
      });
      module.exports = otherwise;
    }
  });

  // sdk/contracts/node_modules/ramda/src/over.js
  var require_over = __commonJS({
    "sdk/contracts/node_modules/ramda/src/over.js"(exports, module) {
      var _curry3 = require_curry3();
      var Identity = function(x) {
        return {
          value: x,
          map: function(f) {
            return Identity(f(x));
          }
        };
      };
      var over = /* @__PURE__ */ _curry3(function over2(lens, f, x) {
        return lens(function(y) {
          return Identity(f(y));
        })(x).value;
      });
      module.exports = over;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pair.js
  var require_pair = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pair.js"(exports, module) {
      var _curry2 = require_curry2();
      var pair = /* @__PURE__ */ _curry2(function pair2(fst, snd) {
        return [fst, snd];
      });
      module.exports = pair;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_createPartialApplicator.js
  var require_createPartialApplicator = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_createPartialApplicator.js"(exports, module) {
      var _arity = require_arity();
      var _curry2 = require_curry2();
      function _createPartialApplicator(concat) {
        return _curry2(function(fn, args) {
          return _arity(Math.max(0, fn.length - args.length), function() {
            return fn.apply(this, concat(args, arguments));
          });
        });
      }
      module.exports = _createPartialApplicator;
    }
  });

  // sdk/contracts/node_modules/ramda/src/partial.js
  var require_partial = __commonJS({
    "sdk/contracts/node_modules/ramda/src/partial.js"(exports, module) {
      var _concat = require_concat();
      var _createPartialApplicator = require_createPartialApplicator();
      var partial = /* @__PURE__ */ _createPartialApplicator(_concat);
      module.exports = partial;
    }
  });

  // sdk/contracts/node_modules/ramda/src/partialRight.js
  var require_partialRight = __commonJS({
    "sdk/contracts/node_modules/ramda/src/partialRight.js"(exports, module) {
      var _concat = require_concat();
      var _createPartialApplicator = require_createPartialApplicator();
      var flip = require_flip();
      var partialRight = /* @__PURE__ */ _createPartialApplicator(
        /* @__PURE__ */ flip(_concat)
      );
      module.exports = partialRight;
    }
  });

  // sdk/contracts/node_modules/ramda/src/partition.js
  var require_partition = __commonJS({
    "sdk/contracts/node_modules/ramda/src/partition.js"(exports, module) {
      var filter = require_filter2();
      var juxt = require_juxt();
      var reject = require_reject();
      var partition = /* @__PURE__ */ juxt([filter, reject]);
      module.exports = partition;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pathEq.js
  var require_pathEq = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pathEq.js"(exports, module) {
      var _curry3 = require_curry3();
      var equals = require_equals2();
      var path = require_path();
      var pathEq = /* @__PURE__ */ _curry3(function pathEq2(_path, val, obj) {
        return equals(path(_path, obj), val);
      });
      module.exports = pathEq;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pathOr.js
  var require_pathOr = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pathOr.js"(exports, module) {
      var _curry3 = require_curry3();
      var defaultTo = require_defaultTo();
      var path = require_path();
      var pathOr = /* @__PURE__ */ _curry3(function pathOr2(d, p, obj) {
        return defaultTo(d, path(p, obj));
      });
      module.exports = pathOr;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pathSatisfies.js
  var require_pathSatisfies = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pathSatisfies.js"(exports, module) {
      var _curry3 = require_curry3();
      var path = require_path();
      var pathSatisfies = /* @__PURE__ */ _curry3(function pathSatisfies2(pred, propPath, obj) {
        return pred(path(propPath, obj));
      });
      module.exports = pathSatisfies;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pick.js
  var require_pick = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pick.js"(exports, module) {
      var _curry2 = require_curry2();
      var pick = /* @__PURE__ */ _curry2(function pick2(names, obj) {
        var result = {};
        var idx = 0;
        while (idx < names.length) {
          if (names[idx] in obj) {
            result[names[idx]] = obj[names[idx]];
          }
          idx += 1;
        }
        return result;
      });
      module.exports = pick;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pickAll.js
  var require_pickAll = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pickAll.js"(exports, module) {
      var _curry2 = require_curry2();
      var pickAll = /* @__PURE__ */ _curry2(function pickAll2(names, obj) {
        var result = {};
        var idx = 0;
        var len = names.length;
        while (idx < len) {
          var name = names[idx];
          result[name] = obj[name];
          idx += 1;
        }
        return result;
      });
      module.exports = pickAll;
    }
  });

  // sdk/contracts/node_modules/ramda/src/pickBy.js
  var require_pickBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/pickBy.js"(exports, module) {
      var _curry2 = require_curry2();
      var pickBy = /* @__PURE__ */ _curry2(function pickBy2(test, obj) {
        var result = {};
        for (var prop in obj) {
          if (test(obj[prop], prop, obj)) {
            result[prop] = obj[prop];
          }
        }
        return result;
      });
      module.exports = pickBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/prepend.js
  var require_prepend = __commonJS({
    "sdk/contracts/node_modules/ramda/src/prepend.js"(exports, module) {
      var _concat = require_concat();
      var _curry2 = require_curry2();
      var prepend = /* @__PURE__ */ _curry2(function prepend2(el, list) {
        return _concat([el], list);
      });
      module.exports = prepend;
    }
  });

  // sdk/contracts/node_modules/ramda/src/product.js
  var require_product = __commonJS({
    "sdk/contracts/node_modules/ramda/src/product.js"(exports, module) {
      var multiply = require_multiply();
      var reduce = require_reduce2();
      var product = /* @__PURE__ */ reduce(multiply, 1);
      module.exports = product;
    }
  });

  // sdk/contracts/node_modules/ramda/src/useWith.js
  var require_useWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/useWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var curryN = require_curryN2();
      var useWith = /* @__PURE__ */ _curry2(function useWith2(fn, transformers) {
        return curryN(transformers.length, function() {
          var args = [];
          var idx = 0;
          while (idx < transformers.length) {
            args.push(transformers[idx].call(this, arguments[idx]));
            idx += 1;
          }
          return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
        });
      });
      module.exports = useWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/project.js
  var require_project = __commonJS({
    "sdk/contracts/node_modules/ramda/src/project.js"(exports, module) {
      var _map = require_map();
      var identity = require_identity2();
      var pickAll = require_pickAll();
      var useWith = require_useWith();
      var project = /* @__PURE__ */ useWith(_map, [pickAll, identity]);
      module.exports = project;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_promap.js
  var require_promap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_promap.js"(exports, module) {
      function _promap(f, g, profunctor) {
        return function(x) {
          return g(profunctor(f(x)));
        };
      }
      module.exports = _promap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xpromap.js
  var require_xpromap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xpromap.js"(exports, module) {
      var _curry3 = require_curry3();
      var _xfBase = require_xfBase();
      var _promap = require_promap();
      var XPromap = /* @__PURE__ */ function() {
        function XPromap2(f, g, xf) {
          this.xf = xf;
          this.f = f;
          this.g = g;
        }
        XPromap2.prototype["@@transducer/init"] = _xfBase.init;
        XPromap2.prototype["@@transducer/result"] = _xfBase.result;
        XPromap2.prototype["@@transducer/step"] = function(result, input) {
          return this.xf["@@transducer/step"](result, _promap(this.f, this.g, input));
        };
        return XPromap2;
      }();
      var _xpromap = /* @__PURE__ */ _curry3(function _xpromap2(f, g, xf) {
        return new XPromap(f, g, xf);
      });
      module.exports = _xpromap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/promap.js
  var require_promap2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/promap.js"(exports, module) {
      var _curry3 = require_curry3();
      var _dispatchable = require_dispatchable();
      var _promap = require_promap();
      var _xpromap = require_xpromap();
      var promap = /* @__PURE__ */ _curry3(
        /* @__PURE__ */ _dispatchable(["fantasy-land/promap", "promap"], _xpromap, _promap)
      );
      module.exports = promap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/propEq.js
  var require_propEq = __commonJS({
    "sdk/contracts/node_modules/ramda/src/propEq.js"(exports, module) {
      var _curry3 = require_curry3();
      var prop = require_prop();
      var equals = require_equals2();
      var propEq = /* @__PURE__ */ _curry3(function propEq2(name, val, obj) {
        return equals(val, prop(name, obj));
      });
      module.exports = propEq;
    }
  });

  // sdk/contracts/node_modules/ramda/src/propIs.js
  var require_propIs = __commonJS({
    "sdk/contracts/node_modules/ramda/src/propIs.js"(exports, module) {
      var _curry3 = require_curry3();
      var prop = require_prop();
      var is = require_is();
      var propIs = /* @__PURE__ */ _curry3(function propIs2(type, name, obj) {
        return is(type, prop(name, obj));
      });
      module.exports = propIs;
    }
  });

  // sdk/contracts/node_modules/ramda/src/propOr.js
  var require_propOr = __commonJS({
    "sdk/contracts/node_modules/ramda/src/propOr.js"(exports, module) {
      var _curry3 = require_curry3();
      var defaultTo = require_defaultTo();
      var prop = require_prop();
      var propOr = /* @__PURE__ */ _curry3(function propOr2(val, p, obj) {
        return defaultTo(val, prop(p, obj));
      });
      module.exports = propOr;
    }
  });

  // sdk/contracts/node_modules/ramda/src/propSatisfies.js
  var require_propSatisfies = __commonJS({
    "sdk/contracts/node_modules/ramda/src/propSatisfies.js"(exports, module) {
      var _curry3 = require_curry3();
      var prop = require_prop();
      var propSatisfies = /* @__PURE__ */ _curry3(function propSatisfies2(pred, name, obj) {
        return pred(prop(name, obj));
      });
      module.exports = propSatisfies;
    }
  });

  // sdk/contracts/node_modules/ramda/src/props.js
  var require_props = __commonJS({
    "sdk/contracts/node_modules/ramda/src/props.js"(exports, module) {
      var _curry2 = require_curry2();
      var path = require_path();
      var props = /* @__PURE__ */ _curry2(function props2(ps, obj) {
        return ps.map(function(p) {
          return path([p], obj);
        });
      });
      module.exports = props;
    }
  });

  // sdk/contracts/node_modules/ramda/src/range.js
  var require_range = __commonJS({
    "sdk/contracts/node_modules/ramda/src/range.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isNumber = require_isNumber();
      var range = /* @__PURE__ */ _curry2(function range2(from, to) {
        if (!(_isNumber(from) && _isNumber(to))) {
          throw new TypeError("Both arguments to range must be numbers");
        }
        var result = [];
        var n = from;
        while (n < to) {
          result.push(n);
          n += 1;
        }
        return result;
      });
      module.exports = range;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reduceRight.js
  var require_reduceRight = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reduceRight.js"(exports, module) {
      var _curry3 = require_curry3();
      var reduceRight = /* @__PURE__ */ _curry3(function reduceRight2(fn, acc, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
          acc = fn(list[idx], acc);
          if (acc && acc["@@transducer/reduced"]) {
            acc = acc["@@transducer/value"];
            break;
          }
          idx -= 1;
        }
        return acc;
      });
      module.exports = reduceRight;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reduceWhile.js
  var require_reduceWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reduceWhile.js"(exports, module) {
      var _curryN = require_curryN();
      var _reduce = require_reduce();
      var _reduced = require_reduced();
      var reduceWhile = /* @__PURE__ */ _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
        return _reduce(function(acc, x) {
          return pred(acc, x) ? fn(acc, x) : _reduced(acc);
        }, a, list);
      });
      module.exports = reduceWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/reduced.js
  var require_reduced2 = __commonJS({
    "sdk/contracts/node_modules/ramda/src/reduced.js"(exports, module) {
      var _curry1 = require_curry1();
      var _reduced = require_reduced();
      var reduced = /* @__PURE__ */ _curry1(_reduced);
      module.exports = reduced;
    }
  });

  // sdk/contracts/node_modules/ramda/src/times.js
  var require_times = __commonJS({
    "sdk/contracts/node_modules/ramda/src/times.js"(exports, module) {
      var _curry2 = require_curry2();
      var times = /* @__PURE__ */ _curry2(function times2(fn, n) {
        var len = Number(n);
        var idx = 0;
        var list;
        if (len < 0 || isNaN(len)) {
          throw new RangeError("n must be a non-negative number");
        }
        list = new Array(len);
        while (idx < len) {
          list[idx] = fn(idx);
          idx += 1;
        }
        return list;
      });
      module.exports = times;
    }
  });

  // sdk/contracts/node_modules/ramda/src/repeat.js
  var require_repeat = __commonJS({
    "sdk/contracts/node_modules/ramda/src/repeat.js"(exports, module) {
      var _curry2 = require_curry2();
      var always = require_always();
      var times = require_times();
      var repeat = /* @__PURE__ */ _curry2(function repeat2(value, n) {
        return times(always(value), n);
      });
      module.exports = repeat;
    }
  });

  // sdk/contracts/node_modules/ramda/src/replace.js
  var require_replace = __commonJS({
    "sdk/contracts/node_modules/ramda/src/replace.js"(exports, module) {
      var _curry3 = require_curry3();
      var replace = /* @__PURE__ */ _curry3(function replace2(regex, replacement, str) {
        return str.replace(regex, replacement);
      });
      module.exports = replace;
    }
  });

  // sdk/contracts/node_modules/ramda/src/scan.js
  var require_scan = __commonJS({
    "sdk/contracts/node_modules/ramda/src/scan.js"(exports, module) {
      var _curry3 = require_curry3();
      var scan = /* @__PURE__ */ _curry3(function scan2(fn, acc, list) {
        var idx = 0;
        var len = list.length;
        var result = [acc];
        while (idx < len) {
          acc = fn(acc, list[idx]);
          result[idx + 1] = acc;
          idx += 1;
        }
        return result;
      });
      module.exports = scan;
    }
  });

  // sdk/contracts/node_modules/ramda/src/sequence.js
  var require_sequence = __commonJS({
    "sdk/contracts/node_modules/ramda/src/sequence.js"(exports, module) {
      var _curry2 = require_curry2();
      var ap = require_ap();
      var map = require_map2();
      var prepend = require_prepend();
      var reduceRight = require_reduceRight();
      var sequence = /* @__PURE__ */ _curry2(function sequence2(of, traversable) {
        return typeof traversable.sequence === "function" ? traversable.sequence(of) : reduceRight(function(x, acc) {
          return ap(map(prepend, x), acc);
        }, of([]), traversable);
      });
      module.exports = sequence;
    }
  });

  // sdk/contracts/node_modules/ramda/src/set.js
  var require_set = __commonJS({
    "sdk/contracts/node_modules/ramda/src/set.js"(exports, module) {
      var _curry3 = require_curry3();
      var always = require_always();
      var over = require_over();
      var set = /* @__PURE__ */ _curry3(function set2(lens, v, x) {
        return over(lens, always(v), x);
      });
      module.exports = set;
    }
  });

  // sdk/contracts/node_modules/ramda/src/sort.js
  var require_sort = __commonJS({
    "sdk/contracts/node_modules/ramda/src/sort.js"(exports, module) {
      var _curry2 = require_curry2();
      var sort = /* @__PURE__ */ _curry2(function sort2(comparator, list) {
        return Array.prototype.slice.call(list, 0).sort(comparator);
      });
      module.exports = sort;
    }
  });

  // sdk/contracts/node_modules/ramda/src/sortBy.js
  var require_sortBy = __commonJS({
    "sdk/contracts/node_modules/ramda/src/sortBy.js"(exports, module) {
      var _curry2 = require_curry2();
      var sortBy = /* @__PURE__ */ _curry2(function sortBy2(fn, list) {
        return Array.prototype.slice.call(list, 0).sort(function(a, b) {
          var aa = fn(a);
          var bb = fn(b);
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
      });
      module.exports = sortBy;
    }
  });

  // sdk/contracts/node_modules/ramda/src/sortWith.js
  var require_sortWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/sortWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var sortWith = /* @__PURE__ */ _curry2(function sortWith2(fns, list) {
        return Array.prototype.slice.call(list, 0).sort(function(a, b) {
          var result = 0;
          var i = 0;
          while (result === 0 && i < fns.length) {
            result = fns[i](a, b);
            i += 1;
          }
          return result;
        });
      });
      module.exports = sortWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/split.js
  var require_split = __commonJS({
    "sdk/contracts/node_modules/ramda/src/split.js"(exports, module) {
      var invoker = require_invoker();
      var split = /* @__PURE__ */ invoker(1, "split");
      module.exports = split;
    }
  });

  // sdk/contracts/node_modules/ramda/src/splitAt.js
  var require_splitAt = __commonJS({
    "sdk/contracts/node_modules/ramda/src/splitAt.js"(exports, module) {
      var _curry2 = require_curry2();
      var length = require_length();
      var slice = require_slice();
      var splitAt = /* @__PURE__ */ _curry2(function splitAt2(index, array) {
        return [slice(0, index, array), slice(index, length(array), array)];
      });
      module.exports = splitAt;
    }
  });

  // sdk/contracts/node_modules/ramda/src/splitEvery.js
  var require_splitEvery = __commonJS({
    "sdk/contracts/node_modules/ramda/src/splitEvery.js"(exports, module) {
      var _curry2 = require_curry2();
      var slice = require_slice();
      var splitEvery = /* @__PURE__ */ _curry2(function splitEvery2(n, list) {
        if (n <= 0) {
          throw new Error("First argument to splitEvery must be a positive integer");
        }
        var result = [];
        var idx = 0;
        while (idx < list.length) {
          result.push(slice(idx, idx += n, list));
        }
        return result;
      });
      module.exports = splitEvery;
    }
  });

  // sdk/contracts/node_modules/ramda/src/splitWhen.js
  var require_splitWhen = __commonJS({
    "sdk/contracts/node_modules/ramda/src/splitWhen.js"(exports, module) {
      var _curry2 = require_curry2();
      var splitWhen = /* @__PURE__ */ _curry2(function splitWhen2(pred, list) {
        var idx = 0;
        var len = list.length;
        var prefix = [];
        while (idx < len && !pred(list[idx])) {
          prefix.push(list[idx]);
          idx += 1;
        }
        return [prefix, Array.prototype.slice.call(list, idx)];
      });
      module.exports = splitWhen;
    }
  });

  // sdk/contracts/node_modules/ramda/src/splitWhenever.js
  var require_splitWhenever = __commonJS({
    "sdk/contracts/node_modules/ramda/src/splitWhenever.js"(exports, module) {
      var _curryN = require_curryN();
      var splitWhenever = /* @__PURE__ */ _curryN(2, [], function splitWhenever2(pred, list) {
        var acc = [];
        var curr = [];
        for (var i = 0; i < list.length; i = i + 1) {
          if (!pred(list[i])) {
            curr.push(list[i]);
          }
          if ((i < list.length - 1 && pred(list[i + 1]) || i === list.length - 1) && curr.length > 0) {
            acc.push(curr);
            curr = [];
          }
        }
        return acc;
      });
      module.exports = splitWhenever;
    }
  });

  // sdk/contracts/node_modules/ramda/src/startsWith.js
  var require_startsWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/startsWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var equals = require_equals2();
      var take = require_take();
      var startsWith = /* @__PURE__ */ _curry2(function(prefix, list) {
        return equals(take(prefix.length, list), prefix);
      });
      module.exports = startsWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/subtract.js
  var require_subtract = __commonJS({
    "sdk/contracts/node_modules/ramda/src/subtract.js"(exports, module) {
      var _curry2 = require_curry2();
      var subtract = /* @__PURE__ */ _curry2(function subtract2(a, b) {
        return Number(a) - Number(b);
      });
      module.exports = subtract;
    }
  });

  // sdk/contracts/node_modules/ramda/src/symmetricDifference.js
  var require_symmetricDifference = __commonJS({
    "sdk/contracts/node_modules/ramda/src/symmetricDifference.js"(exports, module) {
      var _curry2 = require_curry2();
      var concat = require_concat2();
      var difference = require_difference();
      var symmetricDifference = /* @__PURE__ */ _curry2(function symmetricDifference2(list1, list2) {
        return concat(difference(list1, list2), difference(list2, list1));
      });
      module.exports = symmetricDifference;
    }
  });

  // sdk/contracts/node_modules/ramda/src/symmetricDifferenceWith.js
  var require_symmetricDifferenceWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/symmetricDifferenceWith.js"(exports, module) {
      var _curry3 = require_curry3();
      var concat = require_concat2();
      var differenceWith = require_differenceWith();
      var symmetricDifferenceWith = /* @__PURE__ */ _curry3(function symmetricDifferenceWith2(pred, list1, list2) {
        return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
      });
      module.exports = symmetricDifferenceWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/takeLastWhile.js
  var require_takeLastWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/takeLastWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var slice = require_slice();
      var takeLastWhile = /* @__PURE__ */ _curry2(function takeLastWhile2(fn, xs) {
        var idx = xs.length - 1;
        while (idx >= 0 && fn(xs[idx])) {
          idx -= 1;
        }
        return slice(idx + 1, Infinity, xs);
      });
      module.exports = takeLastWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xtakeWhile.js
  var require_xtakeWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xtakeWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var _reduced = require_reduced();
      var _xfBase = require_xfBase();
      var XTakeWhile = /* @__PURE__ */ function() {
        function XTakeWhile2(f, xf) {
          this.xf = xf;
          this.f = f;
        }
        XTakeWhile2.prototype["@@transducer/init"] = _xfBase.init;
        XTakeWhile2.prototype["@@transducer/result"] = _xfBase.result;
        XTakeWhile2.prototype["@@transducer/step"] = function(result, input) {
          return this.f(input) ? this.xf["@@transducer/step"](result, input) : _reduced(result);
        };
        return XTakeWhile2;
      }();
      var _xtakeWhile = /* @__PURE__ */ _curry2(function _xtakeWhile2(f, xf) {
        return new XTakeWhile(f, xf);
      });
      module.exports = _xtakeWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/takeWhile.js
  var require_takeWhile = __commonJS({
    "sdk/contracts/node_modules/ramda/src/takeWhile.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xtakeWhile = require_xtakeWhile();
      var slice = require_slice();
      var takeWhile = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable(["takeWhile"], _xtakeWhile, function takeWhile2(fn, xs) {
          var idx = 0;
          var len = xs.length;
          while (idx < len && fn(xs[idx])) {
            idx += 1;
          }
          return slice(0, idx, xs);
        })
      );
      module.exports = takeWhile;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xtap.js
  var require_xtap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xtap.js"(exports, module) {
      var _curry2 = require_curry2();
      var _xfBase = require_xfBase();
      var XTap = /* @__PURE__ */ function() {
        function XTap2(f, xf) {
          this.xf = xf;
          this.f = f;
        }
        XTap2.prototype["@@transducer/init"] = _xfBase.init;
        XTap2.prototype["@@transducer/result"] = _xfBase.result;
        XTap2.prototype["@@transducer/step"] = function(result, input) {
          this.f(input);
          return this.xf["@@transducer/step"](result, input);
        };
        return XTap2;
      }();
      var _xtap = /* @__PURE__ */ _curry2(function _xtap2(f, xf) {
        return new XTap(f, xf);
      });
      module.exports = _xtap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/tap.js
  var require_tap = __commonJS({
    "sdk/contracts/node_modules/ramda/src/tap.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _xtap = require_xtap();
      var tap = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xtap, function tap2(fn, x) {
          fn(x);
          return x;
        })
      );
      module.exports = tap;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_isRegExp.js
  var require_isRegExp = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_isRegExp.js"(exports, module) {
      function _isRegExp(x) {
        return Object.prototype.toString.call(x) === "[object RegExp]";
      }
      module.exports = _isRegExp;
    }
  });

  // sdk/contracts/node_modules/ramda/src/test.js
  var require_test = __commonJS({
    "sdk/contracts/node_modules/ramda/src/test.js"(exports, module) {
      var _cloneRegExp = require_cloneRegExp();
      var _curry2 = require_curry2();
      var _isRegExp = require_isRegExp();
      var toString = require_toString2();
      var test = /* @__PURE__ */ _curry2(function test2(pattern, str) {
        if (!_isRegExp(pattern)) {
          throw new TypeError("\u2018test\u2019 requires a value of type RegExp as its first argument; received " + toString(pattern));
        }
        return _cloneRegExp(pattern).test(str);
      });
      module.exports = test;
    }
  });

  // sdk/contracts/node_modules/ramda/src/andThen.js
  var require_andThen = __commonJS({
    "sdk/contracts/node_modules/ramda/src/andThen.js"(exports, module) {
      var _curry2 = require_curry2();
      var _assertPromise = require_assertPromise();
      var andThen = /* @__PURE__ */ _curry2(function andThen2(f, p) {
        _assertPromise("andThen", p);
        return p.then(f);
      });
      module.exports = andThen;
    }
  });

  // sdk/contracts/node_modules/ramda/src/toLower.js
  var require_toLower = __commonJS({
    "sdk/contracts/node_modules/ramda/src/toLower.js"(exports, module) {
      var invoker = require_invoker();
      var toLower = /* @__PURE__ */ invoker(0, "toLowerCase");
      module.exports = toLower;
    }
  });

  // sdk/contracts/node_modules/ramda/src/toPairs.js
  var require_toPairs = __commonJS({
    "sdk/contracts/node_modules/ramda/src/toPairs.js"(exports, module) {
      var _curry1 = require_curry1();
      var _has = require_has();
      var toPairs = /* @__PURE__ */ _curry1(function toPairs2(obj) {
        var pairs = [];
        for (var prop in obj) {
          if (_has(prop, obj)) {
            pairs[pairs.length] = [prop, obj[prop]];
          }
        }
        return pairs;
      });
      module.exports = toPairs;
    }
  });

  // sdk/contracts/node_modules/ramda/src/toPairsIn.js
  var require_toPairsIn = __commonJS({
    "sdk/contracts/node_modules/ramda/src/toPairsIn.js"(exports, module) {
      var _curry1 = require_curry1();
      var toPairsIn = /* @__PURE__ */ _curry1(function toPairsIn2(obj) {
        var pairs = [];
        for (var prop in obj) {
          pairs[pairs.length] = [prop, obj[prop]];
        }
        return pairs;
      });
      module.exports = toPairsIn;
    }
  });

  // sdk/contracts/node_modules/ramda/src/toUpper.js
  var require_toUpper = __commonJS({
    "sdk/contracts/node_modules/ramda/src/toUpper.js"(exports, module) {
      var invoker = require_invoker();
      var toUpper = /* @__PURE__ */ invoker(0, "toUpperCase");
      module.exports = toUpper;
    }
  });

  // sdk/contracts/node_modules/ramda/src/transduce.js
  var require_transduce = __commonJS({
    "sdk/contracts/node_modules/ramda/src/transduce.js"(exports, module) {
      var _reduce = require_reduce();
      var _xwrap = require_xwrap();
      var curryN = require_curryN2();
      var transduce = /* @__PURE__ */ curryN(4, function transduce2(xf, fn, acc, list) {
        return _reduce(xf(typeof fn === "function" ? _xwrap(fn) : fn), acc, list);
      });
      module.exports = transduce;
    }
  });

  // sdk/contracts/node_modules/ramda/src/transpose.js
  var require_transpose = __commonJS({
    "sdk/contracts/node_modules/ramda/src/transpose.js"(exports, module) {
      var _curry1 = require_curry1();
      var transpose = /* @__PURE__ */ _curry1(function transpose2(outerlist) {
        var i = 0;
        var result = [];
        while (i < outerlist.length) {
          var innerlist = outerlist[i];
          var j = 0;
          while (j < innerlist.length) {
            if (typeof result[j] === "undefined") {
              result[j] = [];
            }
            result[j].push(innerlist[j]);
            j += 1;
          }
          i += 1;
        }
        return result;
      });
      module.exports = transpose;
    }
  });

  // sdk/contracts/node_modules/ramda/src/traverse.js
  var require_traverse = __commonJS({
    "sdk/contracts/node_modules/ramda/src/traverse.js"(exports, module) {
      var _curry3 = require_curry3();
      var map = require_map2();
      var sequence = require_sequence();
      var traverse = /* @__PURE__ */ _curry3(function traverse2(of, f, traversable) {
        return typeof traversable["fantasy-land/traverse"] === "function" ? traversable["fantasy-land/traverse"](f, of) : typeof traversable.traverse === "function" ? traversable.traverse(f, of) : sequence(of, map(f, traversable));
      });
      module.exports = traverse;
    }
  });

  // sdk/contracts/node_modules/ramda/src/trim.js
  var require_trim = __commonJS({
    "sdk/contracts/node_modules/ramda/src/trim.js"(exports, module) {
      var _curry1 = require_curry1();
      var ws = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
      var zeroWidth = "\u200B";
      var hasProtoTrim = typeof String.prototype.trim === "function";
      var trim = !hasProtoTrim || /* @__PURE__ */ ws.trim() || !/* @__PURE__ */ zeroWidth.trim() ? /* @__PURE__ */ _curry1(function trim2(str) {
        var beginRx = new RegExp("^[" + ws + "][" + ws + "]*");
        var endRx = new RegExp("[" + ws + "][" + ws + "]*$");
        return str.replace(beginRx, "").replace(endRx, "");
      }) : /* @__PURE__ */ _curry1(function trim2(str) {
        return str.trim();
      });
      module.exports = trim;
    }
  });

  // sdk/contracts/node_modules/ramda/src/tryCatch.js
  var require_tryCatch = __commonJS({
    "sdk/contracts/node_modules/ramda/src/tryCatch.js"(exports, module) {
      var _arity = require_arity();
      var _concat = require_concat();
      var _curry2 = require_curry2();
      var tryCatch = /* @__PURE__ */ _curry2(function _tryCatch(tryer, catcher) {
        return _arity(tryer.length, function() {
          try {
            return tryer.apply(this, arguments);
          } catch (e) {
            return catcher.apply(this, _concat([e], arguments));
          }
        });
      });
      module.exports = tryCatch;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unapply.js
  var require_unapply = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unapply.js"(exports, module) {
      var _curry1 = require_curry1();
      var unapply = /* @__PURE__ */ _curry1(function unapply2(fn) {
        return function() {
          return fn(Array.prototype.slice.call(arguments, 0));
        };
      });
      module.exports = unapply;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unary.js
  var require_unary = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unary.js"(exports, module) {
      var _curry1 = require_curry1();
      var nAry = require_nAry();
      var unary = /* @__PURE__ */ _curry1(function unary2(fn) {
        return nAry(1, fn);
      });
      module.exports = unary;
    }
  });

  // sdk/contracts/node_modules/ramda/src/uncurryN.js
  var require_uncurryN = __commonJS({
    "sdk/contracts/node_modules/ramda/src/uncurryN.js"(exports, module) {
      var _curry2 = require_curry2();
      var curryN = require_curryN2();
      var uncurryN = /* @__PURE__ */ _curry2(function uncurryN2(depth, fn) {
        return curryN(depth, function() {
          var currentDepth = 1;
          var value = fn;
          var idx = 0;
          var endIdx;
          while (currentDepth <= depth && typeof value === "function") {
            endIdx = currentDepth === depth ? arguments.length : idx + value.length;
            value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
            currentDepth += 1;
            idx = endIdx;
          }
          return value;
        });
      });
      module.exports = uncurryN;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unfold.js
  var require_unfold = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unfold.js"(exports, module) {
      var _curry2 = require_curry2();
      var unfold = /* @__PURE__ */ _curry2(function unfold2(fn, seed) {
        var pair = fn(seed);
        var result = [];
        while (pair && pair.length) {
          result[result.length] = pair[0];
          pair = fn(pair[1]);
        }
        return result;
      });
      module.exports = unfold;
    }
  });

  // sdk/contracts/node_modules/ramda/src/union.js
  var require_union = __commonJS({
    "sdk/contracts/node_modules/ramda/src/union.js"(exports, module) {
      var _concat = require_concat();
      var _curry2 = require_curry2();
      var compose = require_compose();
      var uniq = require_uniq();
      var union = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ compose(uniq, _concat)
      );
      module.exports = union;
    }
  });

  // sdk/contracts/node_modules/ramda/src/internal/_xuniqWith.js
  var require_xuniqWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/internal/_xuniqWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var _includesWith = require_includesWith();
      var _xfBase = require_xfBase();
      var XUniqWith = /* @__PURE__ */ function() {
        function XUniqWith2(pred, xf) {
          this.xf = xf;
          this.pred = pred;
          this.items = [];
        }
        XUniqWith2.prototype["@@transducer/init"] = _xfBase.init;
        XUniqWith2.prototype["@@transducer/result"] = _xfBase.result;
        XUniqWith2.prototype["@@transducer/step"] = function(result, input) {
          if (_includesWith(this.pred, input, this.items)) {
            return result;
          } else {
            this.items.push(input);
            return this.xf["@@transducer/step"](result, input);
          }
        };
        return XUniqWith2;
      }();
      var _xuniqWith = /* @__PURE__ */ _curry2(function _xuniqWith2(pred, xf) {
        return new XUniqWith(pred, xf);
      });
      module.exports = _xuniqWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/uniqWith.js
  var require_uniqWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/uniqWith.js"(exports, module) {
      var _curry2 = require_curry2();
      var _dispatchable = require_dispatchable();
      var _includesWith = require_includesWith();
      var _xuniqWith = require_xuniqWith();
      var uniqWith = /* @__PURE__ */ _curry2(
        /* @__PURE__ */ _dispatchable([], _xuniqWith, function(pred, list) {
          var idx = 0;
          var len = list.length;
          var result = [];
          var item;
          while (idx < len) {
            item = list[idx];
            if (!_includesWith(pred, item, result)) {
              result[result.length] = item;
            }
            idx += 1;
          }
          return result;
        })
      );
      module.exports = uniqWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unionWith.js
  var require_unionWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unionWith.js"(exports, module) {
      var _concat = require_concat();
      var _curry3 = require_curry3();
      var uniqWith = require_uniqWith();
      var unionWith = /* @__PURE__ */ _curry3(function unionWith2(pred, list1, list2) {
        return uniqWith(pred, _concat(list1, list2));
      });
      module.exports = unionWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unless.js
  var require_unless = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unless.js"(exports, module) {
      var _curry3 = require_curry3();
      var unless = /* @__PURE__ */ _curry3(function unless2(pred, whenFalseFn, x) {
        return pred(x) ? x : whenFalseFn(x);
      });
      module.exports = unless;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unnest.js
  var require_unnest = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unnest.js"(exports, module) {
      var _identity = require_identity();
      var chain = require_chain();
      var unnest = /* @__PURE__ */ chain(_identity);
      module.exports = unnest;
    }
  });

  // sdk/contracts/node_modules/ramda/src/until.js
  var require_until = __commonJS({
    "sdk/contracts/node_modules/ramda/src/until.js"(exports, module) {
      var _curry3 = require_curry3();
      var until = /* @__PURE__ */ _curry3(function until2(pred, fn, init) {
        var val = init;
        while (!pred(val)) {
          val = fn(val);
        }
        return val;
      });
      module.exports = until;
    }
  });

  // sdk/contracts/node_modules/ramda/src/unwind.js
  var require_unwind = __commonJS({
    "sdk/contracts/node_modules/ramda/src/unwind.js"(exports, module) {
      var _curry2 = require_curry2();
      var _isArray = require_isArray();
      var _map = require_map();
      var _assoc = require_assoc();
      var unwind = /* @__PURE__ */ _curry2(function(key, object) {
        if (!(key in object && _isArray(object[key]))) {
          return [object];
        }
        return _map(function(item) {
          return _assoc(key, item, object);
        }, object[key]);
      });
      module.exports = unwind;
    }
  });

  // sdk/contracts/node_modules/ramda/src/valuesIn.js
  var require_valuesIn = __commonJS({
    "sdk/contracts/node_modules/ramda/src/valuesIn.js"(exports, module) {
      var _curry1 = require_curry1();
      var valuesIn = /* @__PURE__ */ _curry1(function valuesIn2(obj) {
        var prop;
        var vs = [];
        for (prop in obj) {
          vs[vs.length] = obj[prop];
        }
        return vs;
      });
      module.exports = valuesIn;
    }
  });

  // sdk/contracts/node_modules/ramda/src/view.js
  var require_view = __commonJS({
    "sdk/contracts/node_modules/ramda/src/view.js"(exports, module) {
      var _curry2 = require_curry2();
      var Const = function(x) {
        return {
          value: x,
          "fantasy-land/map": function() {
            return this;
          }
        };
      };
      var view = /* @__PURE__ */ _curry2(function view2(lens, x) {
        return lens(Const)(x).value;
      });
      module.exports = view;
    }
  });

  // sdk/contracts/node_modules/ramda/src/when.js
  var require_when = __commonJS({
    "sdk/contracts/node_modules/ramda/src/when.js"(exports, module) {
      var _curry3 = require_curry3();
      var when = /* @__PURE__ */ _curry3(function when2(pred, whenTrueFn, x) {
        return pred(x) ? whenTrueFn(x) : x;
      });
      module.exports = when;
    }
  });

  // sdk/contracts/node_modules/ramda/src/where.js
  var require_where = __commonJS({
    "sdk/contracts/node_modules/ramda/src/where.js"(exports, module) {
      var _curry2 = require_curry2();
      var _has = require_has();
      var where = /* @__PURE__ */ _curry2(function where2(spec, testObj) {
        for (var prop in spec) {
          if (_has(prop, spec) && !spec[prop](testObj[prop])) {
            return false;
          }
        }
        return true;
      });
      module.exports = where;
    }
  });

  // sdk/contracts/node_modules/ramda/src/whereAny.js
  var require_whereAny = __commonJS({
    "sdk/contracts/node_modules/ramda/src/whereAny.js"(exports, module) {
      var _curry2 = require_curry2();
      var _has = require_has();
      var whereAny = /* @__PURE__ */ _curry2(function whereAny2(spec, testObj) {
        for (var prop in spec) {
          if (_has(prop, spec) && spec[prop](testObj[prop])) {
            return true;
          }
        }
        return false;
      });
      module.exports = whereAny;
    }
  });

  // sdk/contracts/node_modules/ramda/src/whereEq.js
  var require_whereEq = __commonJS({
    "sdk/contracts/node_modules/ramda/src/whereEq.js"(exports, module) {
      var _curry2 = require_curry2();
      var equals = require_equals2();
      var map = require_map2();
      var where = require_where();
      var whereEq = /* @__PURE__ */ _curry2(function whereEq2(spec, testObj) {
        return where(map(equals, spec), testObj);
      });
      module.exports = whereEq;
    }
  });

  // sdk/contracts/node_modules/ramda/src/without.js
  var require_without = __commonJS({
    "sdk/contracts/node_modules/ramda/src/without.js"(exports, module) {
      var _includes = require_includes();
      var _curry2 = require_curry2();
      var flip = require_flip();
      var reject = require_reject();
      var without = /* @__PURE__ */ _curry2(function(xs, list) {
        return reject(flip(_includes)(xs), list);
      });
      module.exports = without;
    }
  });

  // sdk/contracts/node_modules/ramda/src/xor.js
  var require_xor = __commonJS({
    "sdk/contracts/node_modules/ramda/src/xor.js"(exports, module) {
      var _curry2 = require_curry2();
      var xor = /* @__PURE__ */ _curry2(function xor2(a, b) {
        return Boolean(!a ^ !b);
      });
      module.exports = xor;
    }
  });

  // sdk/contracts/node_modules/ramda/src/xprod.js
  var require_xprod = __commonJS({
    "sdk/contracts/node_modules/ramda/src/xprod.js"(exports, module) {
      var _curry2 = require_curry2();
      var xprod = /* @__PURE__ */ _curry2(function xprod2(a, b) {
        var idx = 0;
        var ilen = a.length;
        var j;
        var jlen = b.length;
        var result = [];
        while (idx < ilen) {
          j = 0;
          while (j < jlen) {
            result[result.length] = [a[idx], b[j]];
            j += 1;
          }
          idx += 1;
        }
        return result;
      });
      module.exports = xprod;
    }
  });

  // sdk/contracts/node_modules/ramda/src/zip.js
  var require_zip = __commonJS({
    "sdk/contracts/node_modules/ramda/src/zip.js"(exports, module) {
      var _curry2 = require_curry2();
      var zip = /* @__PURE__ */ _curry2(function zip2(a, b) {
        var rv = [];
        var idx = 0;
        var len = Math.min(a.length, b.length);
        while (idx < len) {
          rv[idx] = [a[idx], b[idx]];
          idx += 1;
        }
        return rv;
      });
      module.exports = zip;
    }
  });

  // sdk/contracts/node_modules/ramda/src/zipObj.js
  var require_zipObj = __commonJS({
    "sdk/contracts/node_modules/ramda/src/zipObj.js"(exports, module) {
      var _curry2 = require_curry2();
      var zipObj = /* @__PURE__ */ _curry2(function zipObj2(keys, values) {
        var idx = 0;
        var len = Math.min(keys.length, values.length);
        var out = {};
        while (idx < len) {
          out[keys[idx]] = values[idx];
          idx += 1;
        }
        return out;
      });
      module.exports = zipObj;
    }
  });

  // sdk/contracts/node_modules/ramda/src/zipWith.js
  var require_zipWith = __commonJS({
    "sdk/contracts/node_modules/ramda/src/zipWith.js"(exports, module) {
      var _curry3 = require_curry3();
      var zipWith = /* @__PURE__ */ _curry3(function zipWith2(fn, a, b) {
        var rv = [];
        var idx = 0;
        var len = Math.min(a.length, b.length);
        while (idx < len) {
          rv[idx] = fn(a[idx], b[idx]);
          idx += 1;
        }
        return rv;
      });
      module.exports = zipWith;
    }
  });

  // sdk/contracts/node_modules/ramda/src/thunkify.js
  var require_thunkify = __commonJS({
    "sdk/contracts/node_modules/ramda/src/thunkify.js"(exports, module) {
      var curryN = require_curryN2();
      var _curry1 = require_curry1();
      var thunkify = /* @__PURE__ */ _curry1(function thunkify2(fn) {
        return curryN(fn.length, function createThunk() {
          var fnArgs = arguments;
          return function invokeThunk() {
            return fn.apply(this, fnArgs);
          };
        });
      });
      module.exports = thunkify;
    }
  });

  // sdk/contracts/node_modules/ramda/src/index.js
  var require_src = __commonJS({
    "sdk/contracts/node_modules/ramda/src/index.js"(exports, module) {
      module.exports = {};
      module.exports.F = require_F();
      module.exports.T = require_T();
      module.exports.__ = require__();
      module.exports.add = require_add();
      module.exports.addIndex = require_addIndex();
      module.exports.adjust = require_adjust();
      module.exports.all = require_all();
      module.exports.allPass = require_allPass();
      module.exports.always = require_always();
      module.exports.and = require_and();
      module.exports.any = require_any();
      module.exports.anyPass = require_anyPass();
      module.exports.ap = require_ap();
      module.exports.aperture = require_aperture2();
      module.exports.append = require_append();
      module.exports.apply = require_apply();
      module.exports.applySpec = require_applySpec();
      module.exports.applyTo = require_applyTo();
      module.exports.ascend = require_ascend();
      module.exports.assoc = require_assoc2();
      module.exports.assocPath = require_assocPath();
      module.exports.binary = require_binary();
      module.exports.bind = require_bind();
      module.exports.both = require_both();
      module.exports.call = require_call();
      module.exports.chain = require_chain();
      module.exports.clamp = require_clamp();
      module.exports.clone = require_clone2();
      module.exports.collectBy = require_collectBy();
      module.exports.comparator = require_comparator();
      module.exports.complement = require_complement();
      module.exports.compose = require_compose();
      module.exports.composeWith = require_composeWith();
      module.exports.concat = require_concat2();
      module.exports.cond = require_cond();
      module.exports.construct = require_construct();
      module.exports.constructN = require_constructN();
      module.exports.converge = require_converge();
      module.exports.count = require_count();
      module.exports.countBy = require_countBy();
      module.exports.curry = require_curry();
      module.exports.curryN = require_curryN2();
      module.exports.dec = require_dec();
      module.exports.defaultTo = require_defaultTo();
      module.exports.descend = require_descend();
      module.exports.difference = require_difference();
      module.exports.differenceWith = require_differenceWith();
      module.exports.dissoc = require_dissoc2();
      module.exports.dissocPath = require_dissocPath();
      module.exports.divide = require_divide();
      module.exports.drop = require_drop();
      module.exports.dropLast = require_dropLast2();
      module.exports.dropLastWhile = require_dropLastWhile2();
      module.exports.dropRepeats = require_dropRepeats();
      module.exports.dropRepeatsWith = require_dropRepeatsWith();
      module.exports.dropWhile = require_dropWhile();
      module.exports.either = require_either();
      module.exports.empty = require_empty();
      module.exports.endsWith = require_endsWith();
      module.exports.eqBy = require_eqBy();
      module.exports.eqProps = require_eqProps();
      module.exports.equals = require_equals2();
      module.exports.evolve = require_evolve();
      module.exports.filter = require_filter2();
      module.exports.find = require_find();
      module.exports.findIndex = require_findIndex();
      module.exports.findLast = require_findLast();
      module.exports.findLastIndex = require_findLastIndex();
      module.exports.flatten = require_flatten();
      module.exports.flip = require_flip();
      module.exports.forEach = require_forEach();
      module.exports.forEachObjIndexed = require_forEachObjIndexed();
      module.exports.fromPairs = require_fromPairs();
      module.exports.groupBy = require_groupBy();
      module.exports.groupWith = require_groupWith();
      module.exports.gt = require_gt();
      module.exports.gte = require_gte();
      module.exports.has = require_has2();
      module.exports.hasIn = require_hasIn();
      module.exports.hasPath = require_hasPath();
      module.exports.head = require_head();
      module.exports.identical = require_identical();
      module.exports.identity = require_identity2();
      module.exports.ifElse = require_ifElse();
      module.exports.inc = require_inc();
      module.exports.includes = require_includes2();
      module.exports.indexBy = require_indexBy();
      module.exports.indexOf = require_indexOf2();
      module.exports.init = require_init();
      module.exports.innerJoin = require_innerJoin();
      module.exports.insert = require_insert();
      module.exports.insertAll = require_insertAll();
      module.exports.intersection = require_intersection();
      module.exports.intersperse = require_intersperse();
      module.exports.into = require_into();
      module.exports.invert = require_invert();
      module.exports.invertObj = require_invertObj();
      module.exports.invoker = require_invoker();
      module.exports.is = require_is();
      module.exports.isEmpty = require_isEmpty();
      module.exports.isNil = require_isNil();
      module.exports.join = require_join();
      module.exports.juxt = require_juxt();
      module.exports.keys = require_keys();
      module.exports.keysIn = require_keysIn();
      module.exports.last = require_last();
      module.exports.lastIndexOf = require_lastIndexOf();
      module.exports.length = require_length();
      module.exports.lens = require_lens();
      module.exports.lensIndex = require_lensIndex();
      module.exports.lensPath = require_lensPath();
      module.exports.lensProp = require_lensProp();
      module.exports.lift = require_lift();
      module.exports.liftN = require_liftN();
      module.exports.lt = require_lt();
      module.exports.lte = require_lte();
      module.exports.map = require_map2();
      module.exports.mapAccum = require_mapAccum();
      module.exports.mapAccumRight = require_mapAccumRight();
      module.exports.mapObjIndexed = require_mapObjIndexed();
      module.exports.match = require_match();
      module.exports.mathMod = require_mathMod();
      module.exports.max = require_max();
      module.exports.maxBy = require_maxBy();
      module.exports.mean = require_mean();
      module.exports.median = require_median();
      module.exports.memoizeWith = require_memoizeWith();
      module.exports.mergeAll = require_mergeAll();
      module.exports.mergeDeepLeft = require_mergeDeepLeft();
      module.exports.mergeDeepRight = require_mergeDeepRight();
      module.exports.mergeDeepWith = require_mergeDeepWith();
      module.exports.mergeDeepWithKey = require_mergeDeepWithKey();
      module.exports.mergeLeft = require_mergeLeft();
      module.exports.mergeRight = require_mergeRight();
      module.exports.mergeWith = require_mergeWith();
      module.exports.mergeWithKey = require_mergeWithKey();
      module.exports.min = require_min();
      module.exports.minBy = require_minBy();
      module.exports.modify = require_modify2();
      module.exports.modifyPath = require_modifyPath();
      module.exports.modulo = require_modulo();
      module.exports.move = require_move();
      module.exports.multiply = require_multiply();
      module.exports.nAry = require_nAry();
      module.exports.partialObject = require_partialObject();
      module.exports.negate = require_negate();
      module.exports.none = require_none();
      module.exports.not = require_not();
      module.exports.nth = require_nth();
      module.exports.nthArg = require_nthArg();
      module.exports.o = require_o();
      module.exports.objOf = require_objOf();
      module.exports.of = require_of2();
      module.exports.omit = require_omit();
      module.exports.on = require_on();
      module.exports.once = require_once();
      module.exports.or = require_or();
      module.exports.otherwise = require_otherwise();
      module.exports.over = require_over();
      module.exports.pair = require_pair();
      module.exports.partial = require_partial();
      module.exports.partialRight = require_partialRight();
      module.exports.partition = require_partition();
      module.exports.path = require_path();
      module.exports.paths = require_paths();
      module.exports.pathEq = require_pathEq();
      module.exports.pathOr = require_pathOr();
      module.exports.pathSatisfies = require_pathSatisfies();
      module.exports.pick = require_pick();
      module.exports.pickAll = require_pickAll();
      module.exports.pickBy = require_pickBy();
      module.exports.pipe = require_pipe2();
      module.exports.pipeWith = require_pipeWith();
      module.exports.pluck = require_pluck();
      module.exports.prepend = require_prepend();
      module.exports.product = require_product();
      module.exports.project = require_project();
      module.exports.promap = require_promap2();
      module.exports.prop = require_prop();
      module.exports.propEq = require_propEq();
      module.exports.propIs = require_propIs();
      module.exports.propOr = require_propOr();
      module.exports.propSatisfies = require_propSatisfies();
      module.exports.props = require_props();
      module.exports.range = require_range();
      module.exports.reduce = require_reduce2();
      module.exports.reduceBy = require_reduceBy();
      module.exports.reduceRight = require_reduceRight();
      module.exports.reduceWhile = require_reduceWhile();
      module.exports.reduced = require_reduced2();
      module.exports.reject = require_reject();
      module.exports.remove = require_remove();
      module.exports.repeat = require_repeat();
      module.exports.replace = require_replace();
      module.exports.reverse = require_reverse();
      module.exports.scan = require_scan();
      module.exports.sequence = require_sequence();
      module.exports.set = require_set();
      module.exports.slice = require_slice();
      module.exports.sort = require_sort();
      module.exports.sortBy = require_sortBy();
      module.exports.sortWith = require_sortWith();
      module.exports.split = require_split();
      module.exports.splitAt = require_splitAt();
      module.exports.splitEvery = require_splitEvery();
      module.exports.splitWhen = require_splitWhen();
      module.exports.splitWhenever = require_splitWhenever();
      module.exports.startsWith = require_startsWith();
      module.exports.subtract = require_subtract();
      module.exports.sum = require_sum();
      module.exports.symmetricDifference = require_symmetricDifference();
      module.exports.symmetricDifferenceWith = require_symmetricDifferenceWith();
      module.exports.tail = require_tail();
      module.exports.take = require_take();
      module.exports.takeLast = require_takeLast();
      module.exports.takeLastWhile = require_takeLastWhile();
      module.exports.takeWhile = require_takeWhile();
      module.exports.tap = require_tap();
      module.exports.test = require_test();
      module.exports.andThen = require_andThen();
      module.exports.times = require_times();
      module.exports.toLower = require_toLower();
      module.exports.toPairs = require_toPairs();
      module.exports.toPairsIn = require_toPairsIn();
      module.exports.toString = require_toString2();
      module.exports.toUpper = require_toUpper();
      module.exports.transduce = require_transduce();
      module.exports.transpose = require_transpose();
      module.exports.traverse = require_traverse();
      module.exports.trim = require_trim();
      module.exports.tryCatch = require_tryCatch();
      module.exports.type = require_type();
      module.exports.unapply = require_unapply();
      module.exports.unary = require_unary();
      module.exports.uncurryN = require_uncurryN();
      module.exports.unfold = require_unfold();
      module.exports.union = require_union();
      module.exports.unionWith = require_unionWith();
      module.exports.uniq = require_uniq();
      module.exports.uniqBy = require_uniqBy();
      module.exports.uniqWith = require_uniqWith();
      module.exports.unless = require_unless();
      module.exports.unnest = require_unnest();
      module.exports.until = require_until();
      module.exports.unwind = require_unwind();
      module.exports.update = require_update();
      module.exports.useWith = require_useWith();
      module.exports.values = require_values();
      module.exports.valuesIn = require_valuesIn();
      module.exports.view = require_view();
      module.exports.when = require_when();
      module.exports.where = require_where();
      module.exports.whereAny = require_whereAny();
      module.exports.whereEq = require_whereEq();
      module.exports.without = require_without();
      module.exports.xor = require_xor();
      module.exports.xprod = require_xprod();
      module.exports.zip = require_zip();
      module.exports.zipObj = require_zipObj();
      module.exports.zipWith = require_zipWith();
      module.exports.thunkify = require_thunkify();
    }
  });

  // sdk/contracts/weavedb-bpt/lib/md5.js
  var require_md5 = __commonJS({
    "sdk/contracts/weavedb-bpt/lib/md5.js"(exports, module) {
      var md5 = function(e) {
        function h(a2, b2) {
          var c2, d2, e2, f2, g;
          e2 = a2 & 2147483648;
          f2 = b2 & 2147483648;
          c2 = a2 & 1073741824;
          d2 = b2 & 1073741824;
          g = (a2 & 1073741823) + (b2 & 1073741823);
          return c2 & d2 ? g ^ 2147483648 ^ e2 ^ f2 : c2 | d2 ? g & 1073741824 ? g ^ 3221225472 ^ e2 ^ f2 : g ^ 1073741824 ^ e2 ^ f2 : g ^ e2 ^ f2;
        }
        function k(a2, b2, c2, d2, e2, f2, g) {
          a2 = h(a2, h(h(b2 & c2 | ~b2 & d2, e2), g));
          return h(a2 << f2 | a2 >>> 32 - f2, b2);
        }
        function l(a2, b2, c2, d2, e2, f2, g) {
          a2 = h(a2, h(h(b2 & d2 | c2 & ~d2, e2), g));
          return h(a2 << f2 | a2 >>> 32 - f2, b2);
        }
        function m(a2, b2, d2, c2, e2, f2, g) {
          a2 = h(a2, h(h(b2 ^ d2 ^ c2, e2), g));
          return h(a2 << f2 | a2 >>> 32 - f2, b2);
        }
        function n(a2, b2, d2, c2, e2, f2, g) {
          a2 = h(a2, h(h(d2 ^ (b2 | ~c2), e2), g));
          return h(a2 << f2 | a2 >>> 32 - f2, b2);
        }
        function p(a2) {
          var b2 = "", d2 = "", c2;
          for (c2 = 0; 3 >= c2; c2++)
            d2 = a2 >>> 8 * c2 & 255, d2 = "0" + d2.toString(16), b2 += d2.substr(d2.length - 2, 2);
          return b2;
        }
        var f = [], q, r, s, t, a, b, c, d;
        e = function(a2) {
          a2 = a2.replace(/\r\n/g, "\n");
          for (var b2 = "", d2 = 0; d2 < a2.length; d2++) {
            var c2 = a2.charCodeAt(d2);
            128 > c2 ? b2 += String.fromCharCode(c2) : (127 < c2 && 2048 > c2 ? b2 += String.fromCharCode(c2 >> 6 | 192) : (b2 += String.fromCharCode(c2 >> 12 | 224), b2 += String.fromCharCode(c2 >> 6 & 63 | 128)), b2 += String.fromCharCode(c2 & 63 | 128));
          }
          return b2;
        }(e);
        f = function(b2) {
          var a2, c2 = b2.length;
          a2 = c2 + 8;
          for (var d2 = 16 * ((a2 - a2 % 64) / 64 + 1), e2 = Array(d2 - 1), f2 = 0, g = 0; g < c2; )
            a2 = (g - g % 4) / 4, f2 = g % 4 * 8, e2[a2] |= b2.charCodeAt(g) << f2, g++;
          a2 = (g - g % 4) / 4;
          e2[a2] |= 128 << g % 4 * 8;
          e2[d2 - 2] = c2 << 3;
          e2[d2 - 1] = c2 >>> 29;
          return e2;
        }(e);
        a = 1732584193;
        b = 4023233417;
        c = 2562383102;
        d = 271733878;
        for (e = 0; e < f.length; e += 16)
          q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e + 10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e + 10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 4, 4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 23, 76029189), a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 4293915773), b = n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t);
        return (p(a) + p(b) + p(c) + p(d)).toLowerCase();
      };
      module.exports = md5;
    }
  });

  // sdk/contracts/node_modules/fpjson-lang/dist/cjs/index.js
  var require_cjs = __commonJS({
    "sdk/contracts/node_modules/fpjson-lang/dist/cjs/index.js"(exports, module) {
      var m = Object.create;
      var u = Object.defineProperty;
      var v = Object.getOwnPropertyDescriptor;
      var A = Object.getOwnPropertyNames;
      var j = Object.getPrototypeOf;
      var $ = Object.prototype.hasOwnProperty;
      var p = (i, s) => {
        for (var R in s)
          u(i, R, { get: s[R], enumerable: true });
      };
      var b = (i, s, R, o) => {
        if (s && typeof s == "object" || typeof s == "function")
          for (let f of A(s))
            !$.call(i, f) && f !== R && u(i, f, { get: () => s[f], enumerable: !(o = v(s, f)) || o.enumerable });
        return i;
      };
      var O = (i, s, R) => (R = i != null ? m(j(i)) : {}, b(s || !i || !i.__esModule ? u(R, "default", { value: i, enumerable: true }) : R, i));
      var S = (i) => b(u({}, "__esModule", { value: true }), i);
      var x = {};
      p(x, { default: () => w });
      module.exports = S(x);
      var e = O(require_src(), 1);
      var N = { Object, Array, String, Number, Boolean };
      var g = (i) => typeof i == "function";
      var c = (i, s = {}) => {
        if (e.isNil(i))
          return i;
        let R = e.curry((t) => {
          if (e.is(Array, t)) {
            let r = [];
            for (let n of t)
              r.push(R(n));
            return r;
          } else if (e.is(Object, t)) {
            let r = {};
            for (let n in t)
              r[n] = R(t[n]);
            return r;
          } else
            return e.is(String, t) ? t[0] === "%" ? e.tail(t) : (/^\$/.test(t) && (t = o(e.tail(t), true)), e.path(t.split("."))(s)) : t;
        }), o = e.curry((t, r) => R(t)), f = e.curry((t, r) => {
          let n = s;
          /^\$/.test(t) && (t = o(e.tail(t), true));
          let _2 = t.split(".");
          for (let y of e.init(_2))
            e.isNil(n[y]) && (n[y] = {}), n = n[y];
          return n[e.last(_2)] = r, r;
        }), l = null;
        if (g(i[0])) {
          let t = e.tail(i);
          l = i[0](...t);
        } else
          e.is(Array)(i) && i.length === 1 && i[0] === "__" ? l = e.__ : i[0] === "typ" ? l = N[i[1]] : i[0] === "reg" ? l = new RegExp(...e.tail(i)) : e.is(Array)(i) && (e.includes(i[0])(["let", "var", "$"]) || g(e[i[0]])) ? (l = e.compose(e.ifElse(e.o(e.gt(e.__, 0), e.length), e.apply(i[0] === "$" ? R : i[0] === "var" ? o : i[0] === "let" ? f : e[i[0]]), e.always(e[i[0]])), e.map((t) => c(t, s)), e.tail)(i), l = typeof l > "u" ? [] : l) : e.is(Object)(i) && e.is(String)(i.var) ? l = e.path(i.var.split("."))(s) : e.is(Array)(i) || e.is(Object)(i) ? l = e.map((t) => c(t, s))(i) : l = i;
        let a = null;
        return e.is(Array)(l) && e.is(String)(l[0]) && l[0] === "[]" ? a = e.tail(l) : a = g(l?.[0]) ? c(l, s) : l, a;
      };
      var w = c;
    }
  });

  // sdk/contracts/common/lib/pure.js
  var require_pure = __commonJS({
    "sdk/contracts/common/lib/pure.js"(exports, module) {
      var {
        complement,
        concat,
        without,
        split,
        uniq,
        path: _path,
        map,
        isNil,
        keys,
        difference,
        intersection,
        is,
        tail
      } = require_src();
      var fpjson = require_cjs();
      fpjson = fpjson.default || fpjson;
      var isValidName = (str) => /^[^\/]+$/.test(str) && !/^__.*__+$/.test(str) && !/^\.{1,2}$/.test(str) && Buffer.byteLength(str, "utf8") <= 1500;
      var clone = (state) => JSON.parse(JSON.stringify(state));
      var replace$ = (arrs) => {
        if (typeof arrs === "string") {
          return arrs.slice(0, 2) === "l$" ? ["toLower", { var: arrs.slice(2) }] : arrs.slice(0, 2) === "u$" ? ["toUpser", { var: arrs.slice(2) }] : arrs.slice(0, 2) === "o$" ? [["complement", ["isNil"]], { var: arrs.slice(2) }] : arrs.slice(0, 2) === "x$" ? ["isNil", { var: arrs.slice(2) }] : arrs.slice(0, 2) === "!$" ? ["not", { var: arrs.slice(2) }] : arrs.slice(0, 2) === "$$" ? tail(arrs) : arrs[0] === "$" ? { var: tail(arrs) } : arrs;
        } else if (is(Array, arrs)) {
          if (arrs[0] === "toBatchAll") {
            return [
              [
                "pipe",
                ["var", "batch"],
                ["concat", ["__"], arrs[1]],
                ["let", "batch"]
              ]
            ];
          } else if (arrs[0] === "toBatch") {
            return [
              "pipe",
              ["var", "batch"],
              ["append", ["[]", ...arrs[1]]],
              ["let", "batch"]
            ];
          } else {
            for (const [i, v] of arrs.entries())
              arrs[i] = replace$(v);
          }
        } else if (typeof arrs === "object") {
          for (let k in arrs)
            arrs[k] = replace$(arrs[k]);
        }
        return arrs;
      };
      function bigIntFromBytes(byteArr) {
        let hexString = "";
        for (const byte of byteArr) {
          hexString += byte.toString(16).padStart(2, "0");
        }
        return BigInt("0x" + hexString);
      }
      var setElm = (k, d, rule_data) => {
        let obj = rule_data;
        let elm_path = k.split("#")[0].split(".");
        for (const [i, field] of elm_path.entries()) {
          if (i === elm_path.length - 1) {
            if (is(Object)(d) && d.__op === "data") {
              obj[field] = rule_data.request.auth.extra[d.key] ?? null;
            } else if (is(Object)(d) && d.__op === "arrayUnion") {
              if (complement(is)(Array, d.arr))
                throw Error("field is not array");
              if (complement(is)(Array, obj[field]))
                obj[field] = [];
              obj[field] = concat(obj[field], d.arr);
            } else if (is(Object)(d) && d.__op === "arrayRemove") {
              if (complement(is)(Array, d.arr))
                throw Error("field is not array");
              if (complement(is)(Array, obj[field]))
                obj[field] = [];
              obj[field] = without(d.arr, obj[field]);
            } else if (is(Object)(d) && d.__op === "inc") {
              if (isNaN(d.n))
                throw Error("field is not number");
              if (isNil(obj[field]))
                obj[field] = 0;
              obj[field] += d.n;
            } else if (is(Object)(d) && d.__op === "del") {
              delete obj[field];
            } else if (is(Object)(d) && d.__op === "ts") {
              obj[field] = rule_data.ts;
            } else if (is(Object)(d) && d.__op === "signer") {
              obj[field] = rule_data.signer;
            } else {
              obj[field] = d;
            }
            break;
          } else if (isNil(obj[field]))
            obj[field] = {};
          obj = obj[field];
        }
        return obj;
      };
      var _parse = (query, vars) => {
        if (is(Array, query)) {
          query = map((v) => is(Object, v) ? _parse(v, vars) : v)(query);
        } else if (is(Object, query)) {
          if (is(String, query.var)) {
            return _path(query.var.split("."))(vars);
          } else {
            query = map((v) => _parse(v, vars))(query);
          }
        }
        return query;
      };
      async function fpj(arr = [], obj = {}, fn = {}) {
        const exec = (v) => fpjson(replace$(clone(v)), obj);
        const cmd = async (arr2, ctx = {}) => {
          let val = null;
          let isBreak = false;
          if (!is(Array, arr2)) {
            val = exec(arr2);
          } else if (/^=\$/.test(arr2[0])) {
            ;
            [val, isBreak] = await cmd(arr2[1]);
            if (!isBreak)
              setElm(arr2[0].replace(/^=\$/, ""), val, obj);
          } else if (/^.+\(\)$/.test(arr2[0])) {
            if (!isNil(fn[arr2[0].slice(0, -2)])) {
              ;
              [val, isBreak] = await fn[arr2[0].slice(0, -2)](
                _parse(replace$(arr2[1]), obj),
                obj,
                setElm
              );
              console.log(val);
            } else {
              throw Error(`unknow function ${arr2[0]}`);
            }
          } else if (arr2[0] === "break") {
            isBreak = true;
          } else if (arr2[0] === "[]") {
            for (let v of tail(arr2))
              await cmd(v);
          } else if (arr2[0] === "if") {
            if (exec(arr2[1])) {
              if (typeof arr2[2] === "undefined") {
                throw Error("wrong fpjson");
              } else {
                ;
                [val, isBreak] = await cmd(arr2[2]);
              }
            } else {
              ;
              [val, isBreak] = await cmd(arr2.slice(3), { if: true });
            }
          } else if (arr2[0] === "else") {
            if (ctx.if) {
              ;
              [val, isBreak] = await cmd(arr2[1]);
            } else {
              throw Error("wrong fpjson");
            }
          } else if (arr2[0] === "elif") {
            if (ctx.if) {
              if (exec(arr2[1])) {
                ;
                [val, isBreak] = await cmd(arr2[2]);
              } else {
                ;
                [val, isBreak] = await cmd(arr2.slice(3), { if: true });
              }
            } else {
              throw Error("wrong fpjson");
            }
          } else {
            val = exec(arr2);
          }
          return [val, isBreak];
        };
        for (const v of arr) {
          const [val, isBreak] = await cmd(v);
          if (isBreak)
            break;
        }
      }
      var ac_funcs = {
        split: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          const elms = split(v[0], fpjson(v[1], obj));
          if (is(Array, v[2])) {
            for (const [i2, v2] of elms.entries()) {
              if (!isNil(v[2][i2]) && typeof v[2][i2] === "string" && /^=\$.+$/.test(v[2][i2])) {
                set(v[2][i2].replace(/^=\$/, ""), v2, obj);
              }
            }
          }
          return [val, isBreak];
        },
        mod: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          for (const k3 in v) {
            set(`new.${k3}`, fpjson(v[k3], obj), obj);
          }
          return [val, isBreak];
        },
        fields: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          let _keys = keys(obj.req);
          let fields = [];
          let required = [];
          for (let v2 of v) {
            const field = v2.replace(/^\*/, "");
            fields.push(field);
            if (/^\*/.test(v2))
              required.push(field);
          }
          if (difference(_keys, fields).length > 0 || difference(required, _keys).length > 0) {
            obj.request.allow = false;
            isBreak = true;
          }
          return [val, isBreak];
        },
        required_fields: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          let _keys = keys(obj.req);
          let fields = v;
          if (difference(fields, _keys).length > 0) {
            obj.request.allow = false;
            isBreak = true;
          }
          return [val, isBreak];
        },
        disallowed_fields: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          let _keys = keys(obj.req);
          let fields = v;
          if (intersection(_keys, fields).length > 0) {
            obj.request.allow = false;
            isBreak = true;
          }
          return [val, isBreak];
        },
        denyifall: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(["all", ["equals", true], v], obj)) {
            obj.request.allow = false;
            isBreak = true;
          }
          return [val, isBreak];
        },
        denyifany: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(["any", ["equals", true], v], obj)) {
            obj.request.allow = false;
            isBreak = true;
          }
          return [val, isBreak];
        },
        allowifall: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(["all", ["equals", true], v], obj)) {
            obj.request.allow = true;
            isBreak = true;
          }
          return [val, isBreak];
        },
        allow: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          obj.request.allow = true;
          isBreak = true;
          return [val, isBreak];
        },
        deny: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          obj.request.allow = false;
          isBreak = true;
          return [val, isBreak];
        },
        allowifany: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(["any", ["equals", true], v], obj)) {
            obj.request.allow = true;
            isBreak = true;
          }
          return [val, isBreak];
        },
        denyif: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(v, obj)) {
            obj.request.allow = false;
            isBreak = true;
          }
          return [val, isBreak];
        },
        allowif: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(v, obj)) {
            obj.request.allow = true;
            isBreak = true;
          }
          return [val, isBreak];
        },
        breakif: (v, obj, set) => {
          let val = null;
          let isBreak = false;
          if (fpjson(v, obj))
            isBreak = true;
          return [val, isBreak];
        }
      };
      module.exports = {
        isValidName,
        clone,
        bigIntFromBytes,
        replace$,
        fpj,
        ac_funcs,
        setElm
      };
    }
  });

  // node_modules/punycode/punycode.js
  var require_punycode = __commonJS({
    "node_modules/punycode/punycode.js"(exports, module) {
      (function(root) {
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = typeof module == "object" && module && !module.nodeType && module;
        var freeGlobal = typeof global == "object" && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
          root = freeGlobal;
        }
        var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
          "overflow": "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
        function error(type) {
          throw RangeError(errors[type]);
        }
        function map(array, fn) {
          var length = array.length;
          var result = [];
          while (length--) {
            result[length] = fn(array[length]);
          }
          return result;
        }
        function mapDomain(string, fn) {
          var parts = string.split("@");
          var result = "";
          if (parts.length > 1) {
            result = parts[0] + "@";
            string = parts[1];
          }
          string = string.replace(regexSeparators, ".");
          var labels = string.split(".");
          var encoded = map(labels, fn).join(".");
          return result + encoded;
        }
        function ucs2decode(string) {
          var output = [], counter = 0, length = string.length, value, extra;
          while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
              extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) {
                output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                output.push(value);
                counter--;
              }
            } else {
              output.push(value);
            }
          }
          return output;
        }
        function ucs2encode(array) {
          return map(array, function(value) {
            var output = "";
            if (value > 65535) {
              value -= 65536;
              output += stringFromCharCode(value >>> 10 & 1023 | 55296);
              value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
          }).join("");
        }
        function basicToDigit(codePoint) {
          if (codePoint - 48 < 10) {
            return codePoint - 22;
          }
          if (codePoint - 65 < 26) {
            return codePoint - 65;
          }
          if (codePoint - 97 < 26) {
            return codePoint - 97;
          }
          return base;
        }
        function digitToBasic(digit, flag) {
          return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }
        function adapt(delta, numPoints, firstTime) {
          var k = 0;
          delta = firstTime ? floor(delta / damp) : delta >> 1;
          delta += floor(delta / numPoints);
          for (; delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
          }
          return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }
        function decode(input) {
          var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
          basic = input.lastIndexOf(delimiter);
          if (basic < 0) {
            basic = 0;
          }
          for (j = 0; j < basic; ++j) {
            if (input.charCodeAt(j) >= 128) {
              error("not-basic");
            }
            output.push(input.charCodeAt(j));
          }
          for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
            for (oldi = i, w = 1, k = base; ; k += base) {
              if (index >= inputLength) {
                error("invalid-input");
              }
              digit = basicToDigit(input.charCodeAt(index++));
              if (digit >= base || digit > floor((maxInt - i) / w)) {
                error("overflow");
              }
              i += digit * w;
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (digit < t) {
                break;
              }
              baseMinusT = base - t;
              if (w > floor(maxInt / baseMinusT)) {
                error("overflow");
              }
              w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            if (floor(i / out) > maxInt - n) {
              error("overflow");
            }
            n += floor(i / out);
            i %= out;
            output.splice(i++, 0, n);
          }
          return ucs2encode(output);
        }
        function encode(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
          input = ucs2decode(input);
          inputLength = input.length;
          n = initialN;
          delta = 0;
          bias = initialBias;
          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 128) {
              output.push(stringFromCharCode(currentValue));
            }
          }
          handledCPCount = basicLength = output.length;
          if (basicLength) {
            output.push(delimiter);
          }
          while (handledCPCount < inputLength) {
            for (m = maxInt, j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
              error("overflow");
            }
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < n && ++delta > maxInt) {
                error("overflow");
              }
              if (currentValue == n) {
                for (q = delta, k = base; ; k += base) {
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  qMinusT = q - t;
                  baseMinusT = base - t;
                  output.push(
                    stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                  );
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n;
          }
          return output.join("");
        }
        function toUnicode(input) {
          return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
          });
        }
        function toASCII(input) {
          return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
          });
        }
        punycode = {
          "version": "1.3.2",
          "ucs2": {
            "decode": ucs2decode,
            "encode": ucs2encode
          },
          "decode": decode,
          "encode": encode,
          "toASCII": toASCII,
          "toUnicode": toUnicode
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          define("punycode", function() {
            return punycode;
          });
        } else if (freeExports && freeModule) {
          if (module.exports == freeExports) {
            freeModule.exports = punycode;
          } else {
            for (key in punycode) {
              punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
            }
          }
        } else {
          root.punycode = punycode;
        }
      })(exports);
    }
  });

  // node_modules/url/util.js
  var require_util = __commonJS({
    "node_modules/url/util.js"(exports, module) {
      "use strict";
      module.exports = {
        isString: function(arg) {
          return typeof arg === "string";
        },
        isObject: function(arg) {
          return typeof arg === "object" && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };
    }
  });

  // node_modules/querystring/decode.js
  var require_decode = __commonJS({
    "node_modules/querystring/decode.js"(exports, module) {
      "use strict";
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module.exports = function(qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};
        if (typeof qs !== "string" || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;
        if (options && typeof options.maxKeys === "number") {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = "";
          }
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (Array.isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
        return obj;
      };
    }
  });

  // node_modules/querystring/encode.js
  var require_encode = __commonJS({
    "node_modules/querystring/encode.js"(exports, module) {
      "use strict";
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case "string":
            return v;
          case "boolean":
            return v ? "true" : "false";
          case "number":
            return isFinite(v) ? v : "";
          default:
            return "";
        }
      };
      module.exports = function(obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";
        if (obj === null) {
          obj = void 0;
        }
        if (typeof obj === "object") {
          return Object.keys(obj).map(function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (Array.isArray(obj[k])) {
              return obj[k].map(function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }
        if (!name)
          return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
    }
  });

  // node_modules/querystring/index.js
  var require_querystring = __commonJS({
    "node_modules/querystring/index.js"(exports) {
      "use strict";
      exports.decode = exports.parse = require_decode();
      exports.encode = exports.stringify = require_encode();
    }
  });

  // node_modules/url/url.js
  var require_url = __commonJS({
    "node_modules/url/url.js"(exports) {
      "use strict";
      var punycode = require_punycode();
      var util = require_util();
      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;
      exports.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i;
      var portPattern = /:[0-9]*$/;
      var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
      var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
      var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
      var autoEscape = ["'"].concat(unwise);
      var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
      var hostEndingChars = ["/", "?", "#"];
      var hostnameMaxLen = 255;
      var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
      var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
      var unsafeProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var hostlessProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var slashedProtocol = {
        "http": true,
        "https": true,
        "ftp": true,
        "gopher": true,
        "file": true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      };
      var querystring = require_querystring();
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && util.isObject(url) && url instanceof Url)
          return url;
        var u = new Url();
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, "/");
        url = uSplit.join(splitter);
        var rest = url;
        rest = rest.trim();
        if (!slashesDenoteHost && url.split("#").length === 1) {
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = "";
              this.query = {};
            }
            return this;
          }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf("@");
          } else {
            atSign = rest.lastIndexOf("@", hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    newpart += "x";
                  } else {
                    newpart += part[j];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = "/" + notHost.join(".") + rest;
                  }
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = "";
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            this.hostname = punycode.toASCII(this.hostname);
          }
          var p = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          this.host = h + p;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") {
              rest = "/" + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = "/";
        }
        if (this.pathname || this.search) {
          var p = this.pathname || "";
          var s = this.search || "";
          this.path = p + s;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (util.isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) {
            host += ":" + this.port;
          }
        }
        if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":")
          protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = "//" + (host || "");
          if (pathname && pathname.charAt(0) !== "/")
            pathname = "/" + pathname;
        } else if (!host) {
          host = "";
        }
        if (hash && hash.charAt(0) !== "#")
          hash = "#" + hash;
        if (search && search.charAt(0) !== "?")
          search = "?" + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace("#", "%23");
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== "protocol")
              result[rkey] = relative[rkey];
          }
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = "/";
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v = 0; v < keys.length; v++) {
              var k = keys[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = "";
            if (!relative.hostname)
              relative.hostname = "";
            if (relPath[0] !== "")
              relPath.unshift("");
            if (relPath.length < 2)
              relPath.unshift("");
            result.pathname = relPath.join("/");
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p = result.pathname || "";
            var s = result.search || "";
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) {
            if (srcPath[0] === "")
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === "")
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = "/" + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last === ".") {
            srcPath.splice(i, 1);
          } else if (last === "..") {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift("..");
          }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
          srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
          srcPath.push("");
        }
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift("");
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join("/");
        }
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ":") {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host)
          this.hostname = host;
      };
    }
  });

  // sdk/contracts/common/lib/jsonschema/helpers.js
  var require_helpers = __commonJS({
    "sdk/contracts/common/lib/jsonschema/helpers.js"(exports, module) {
      "use strict";
      var uri = require_url();
      var ValidationError = exports.ValidationError = function ValidationError2(message, instance, schema, path, name, argument) {
        if (Array.isArray(path)) {
          this.path = path;
          this.property = path.reduce(function(sum, item) {
            return sum + makeSuffix(item);
          }, "instance");
        } else if (path !== void 0) {
          this.property = path;
        }
        if (message) {
          this.message = message;
        }
        if (schema) {
          var id = schema.$id || schema.id;
          this.schema = id || schema;
        }
        if (instance !== void 0) {
          this.instance = instance;
        }
        this.name = name;
        this.argument = argument;
        this.stack = this.toString();
      };
      ValidationError.prototype.toString = function toString() {
        return this.property + " " + this.message;
      };
      var ValidatorResult = exports.ValidatorResult = function ValidatorResult2(instance, schema, options, ctx) {
        this.instance = instance;
        this.schema = schema;
        this.options = options;
        this.path = ctx.path;
        this.propertyPath = ctx.propertyPath;
        this.errors = [];
        this.throwError = options && options.throwError;
        this.throwFirst = options && options.throwFirst;
        this.throwAll = options && options.throwAll;
        this.disableFormat = options && options.disableFormat === true;
      };
      ValidatorResult.prototype.addError = function addError(detail) {
        var err2;
        if (typeof detail == "string") {
          err2 = new ValidationError(detail, this.instance, this.schema, this.path);
        } else {
          if (!detail)
            throw new Error("Missing error detail");
          if (!detail.message)
            throw new Error("Missing error message");
          if (!detail.name)
            throw new Error("Missing validator type");
          err2 = new ValidationError(
            detail.message,
            this.instance,
            this.schema,
            this.path,
            detail.name,
            detail.argument
          );
        }
        this.errors.push(err2);
        if (this.throwFirst) {
          throw new ValidatorResultError(this);
        } else if (this.throwError) {
          throw err2;
        }
        return err2;
      };
      ValidatorResult.prototype.importErrors = function importErrors(res) {
        if (typeof res == "string" || res && res.validatorType) {
          this.addError(res);
        } else if (res && res.errors) {
          this.errors = this.errors.concat(res.errors);
        }
      };
      function stringizer(v, i) {
        return i + ": " + v.toString() + "\n";
      }
      ValidatorResult.prototype.toString = function toString(res) {
        return this.errors.map(stringizer).join("");
      };
      Object.defineProperty(ValidatorResult.prototype, "valid", {
        get: function() {
          return !this.errors.length;
        }
      });
      module.exports.ValidatorResultError = ValidatorResultError;
      function ValidatorResultError(result) {
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, ValidatorResultError);
        }
        this.instance = result.instance;
        this.schema = result.schema;
        this.options = result.options;
        this.errors = result.errors;
      }
      ValidatorResultError.prototype = new Error();
      ValidatorResultError.prototype.constructor = ValidatorResultError;
      ValidatorResultError.prototype.name = "Validation Error";
      var SchemaError = exports.SchemaError = function SchemaError2(msg, schema) {
        this.message = msg;
        this.schema = schema;
        Error.call(this, msg);
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, SchemaError2);
        }
      };
      SchemaError.prototype = Object.create(Error.prototype, {
        constructor: { value: SchemaError, enumerable: false },
        name: { value: "SchemaError", enumerable: false }
      });
      var SchemaContext = exports.SchemaContext = function SchemaContext2(schema, options, path, base, schemas) {
        this.schema = schema;
        this.options = options;
        if (Array.isArray(path)) {
          this.path = path;
          this.propertyPath = path.reduce(function(sum, item) {
            return sum + makeSuffix(item);
          }, "instance");
        } else {
          this.propertyPath = path;
        }
        this.base = base;
        this.schemas = schemas;
      };
      SchemaContext.prototype.resolve = function resolve(target) {
        return uri.resolve(this.base, target);
      };
      SchemaContext.prototype.makeChild = function makeChild(schema, propertyName) {
        var path = propertyName === void 0 ? this.path : this.path.concat([propertyName]);
        var id = schema.$id || schema.id;
        var base = uri.resolve(this.base, id || "");
        var ctx = new SchemaContext(
          schema,
          this.options,
          path,
          base,
          Object.create(this.schemas)
        );
        if (id && !ctx.schemas[base]) {
          ctx.schemas[base] = schema;
        }
        return ctx;
      };
      var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
        "date-time": /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
        date: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
        time: /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
        duration: /P(T\d+(H(\d+M(\d+S)?)?|M(\d+S)?|S)|\d+(D|M(\d+D)?|Y(\d+M(\d+D)?)?)(T\d+(H(\d+M(\d+S)?)?|M(\d+S)?|S))?|\d+W)/i,
        email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
        "idn-email": /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u,
        "ip-address": /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        uri: /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/,
        "uri-reference": /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/,
        iri: /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/,
        "iri-reference": /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~-\u{10FFFF}]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~-\u{10FFFF}])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~-\u{10FFFF}]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~-\u{10FFFF}])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~-\u{10FFFF}])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~-\u{10FFFF}]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~-\u{10FFFF}])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/u,
        uuid: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        "uri-template": /(%[0-9a-f]{2}|[!#$&(-;=?@\[\]_a-z~]|\{[!#&+,./;=?@|]?(%[0-9a-f]{2}|[0-9_a-z])(\.?(%[0-9a-f]{2}|[0-9_a-z]))*(:[1-9]\d{0,3}|\*)?(,(%[0-9a-f]{2}|[0-9_a-z])(\.?(%[0-9a-f]{2}|[0-9_a-z]))*(:[1-9]\d{0,3}|\*)?)*\})*/iu,
        "json-pointer": /^(\/([\x00-\x2e0-@\[-}\x7f]|~[01])*)*$/iu,
        "relative-json-pointer": /^\d+(#|(\/([\x00-\x2e0-@\[-}\x7f]|~[01])*)*)$/iu,
        hostname: /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
        "host-name": /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
        "utc-millisec": function(input) {
          return typeof input === "string" && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
        },
        regex: function(input) {
          var result = true;
          try {
            new RegExp(input);
          } catch (e) {
            result = false;
          }
          return result;
        },
        style: /[\r\n\t ]*[^\r\n\t ][^:]*:[\r\n\t ]*[^\r\n\t ;]*[\r\n\t ]*;?/,
        color: /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
        phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
        alpha: /^[a-zA-Z]+$/,
        alphanumeric: /^[a-zA-Z0-9]+$/
      };
      FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
      FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
      FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS["ip-address"];
      exports.isFormat = function isFormat(input, format, validator) {
        if (typeof input === "string" && FORMAT_REGEXPS[format] !== void 0) {
          if (FORMAT_REGEXPS[format] instanceof RegExp) {
            return FORMAT_REGEXPS[format].test(input);
          }
          if (typeof FORMAT_REGEXPS[format] === "function") {
            return FORMAT_REGEXPS[format](input);
          }
        } else if (validator && validator.customFormats && typeof validator.customFormats[format] === "function") {
          return validator.customFormats[format](input);
        }
        return true;
      };
      var makeSuffix = exports.makeSuffix = function makeSuffix2(key) {
        key = key.toString();
        if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
          return "." + key;
        }
        if (key.match(/^\d+$/)) {
          return "[" + key + "]";
        }
        return "[" + JSON.stringify(key) + "]";
      };
      exports.deepCompareStrict = function deepCompareStrict(a, b) {
        if (typeof a !== typeof b) {
          return false;
        }
        if (Array.isArray(a)) {
          if (!Array.isArray(b)) {
            return false;
          }
          if (a.length !== b.length) {
            return false;
          }
          return a.every(function(v, i) {
            return deepCompareStrict(a[i], b[i]);
          });
        }
        if (typeof a === "object") {
          if (!a || !b) {
            return a === b;
          }
          var aKeys = Object.keys(a);
          var bKeys = Object.keys(b);
          if (aKeys.length !== bKeys.length) {
            return false;
          }
          return aKeys.every(function(v) {
            return deepCompareStrict(a[v], b[v]);
          });
        }
        return a === b;
      };
      function deepMerger(target, dst, e, i) {
        if (typeof e === "object") {
          dst[i] = deepMerge(target[i], e);
        } else {
          if (target.indexOf(e) === -1) {
            dst.push(e);
          }
        }
      }
      function copyist(src, dst, key) {
        dst[key] = src[key];
      }
      function copyistWithDeepMerge(target, src, dst, key) {
        if (typeof src[key] !== "object" || !src[key]) {
          dst[key] = src[key];
        } else {
          if (!target[key]) {
            dst[key] = src[key];
          } else {
            dst[key] = deepMerge(target[key], src[key]);
          }
        }
      }
      function deepMerge(target, src) {
        var array = Array.isArray(src);
        var dst = array && [] || {};
        if (array) {
          target = target || [];
          dst = dst.concat(target);
          src.forEach(deepMerger.bind(null, target, dst));
        } else {
          if (target && typeof target === "object") {
            Object.keys(target).forEach(copyist.bind(null, target, dst));
          }
          Object.keys(src).forEach(copyistWithDeepMerge.bind(null, target, src, dst));
        }
        return dst;
      }
      module.exports.deepMerge = deepMerge;
      exports.objectGetPath = function objectGetPath(o, s) {
        var parts = s.split("/").slice(1);
        var k;
        while (typeof (k = parts.shift()) == "string") {
          var n = decodeURIComponent(k.replace(/~0/, "~").replace(/~1/g, "/"));
          if (!(n in o))
            return;
          o = o[n];
        }
        return o;
      };
      function pathEncoder(v) {
        return "/" + encodeURIComponent(v).replace(/~/g, "%7E");
      }
      exports.encodePath = function encodePointer(a) {
        return a.map(pathEncoder).join("");
      };
      exports.getDecimalPlaces = function getDecimalPlaces(number) {
        var decimalPlaces = 0;
        if (isNaN(number))
          return decimalPlaces;
        if (typeof number !== "number") {
          number = Number(number);
        }
        var parts = number.toString().split("e");
        if (parts.length === 2) {
          if (parts[1][0] !== "-") {
            return decimalPlaces;
          } else {
            decimalPlaces = Number(parts[1].slice(1));
          }
        }
        var decimalParts = parts[0].split(".");
        if (decimalParts.length === 2) {
          decimalPlaces += decimalParts[1].length;
        }
        return decimalPlaces;
      };
      exports.isSchema = function isSchema(val) {
        return typeof val === "object" && val || typeof val === "boolean";
      };
    }
  });

  // sdk/contracts/common/lib/jsonschema/attribute.js
  var require_attribute = __commonJS({
    "sdk/contracts/common/lib/jsonschema/attribute.js"(exports, module) {
      "use strict";
      var helpers = require_helpers();
      var ValidatorResult = helpers.ValidatorResult;
      var SchemaError = helpers.SchemaError;
      var attribute = {};
      attribute.ignoreProperties = {
        "id": true,
        "default": true,
        "description": true,
        "title": true,
        "additionalItems": true,
        "then": true,
        "else": true,
        "$schema": true,
        "$ref": true,
        "extends": true
      };
      var validators = attribute.validators = {};
      validators.type = function validateType(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var types = Array.isArray(schema.type) ? schema.type : [schema.type];
        if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
          var list = types.map(function(v) {
            if (!v)
              return;
            var id = v.$id || v.id;
            return id ? "<" + id + ">" : v + "";
          });
          result.addError({
            name: "type",
            argument: list,
            message: "is not of a type(s) " + list
          });
        }
        return result;
      };
      function testSchemaNoThrow(instance, options, ctx, callback, schema) {
        var throwError = options.throwError;
        var throwAll = options.throwAll;
        options.throwError = false;
        options.throwAll = false;
        var res = this.validateSchema(instance, schema, options, ctx);
        options.throwError = throwError;
        options.throwAll = throwAll;
        if (!res.valid && callback instanceof Function) {
          callback(res);
        }
        return res.valid;
      }
      validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var inner = new ValidatorResult(instance, schema, options, ctx);
        if (!Array.isArray(schema.anyOf)) {
          throw new SchemaError("anyOf must be an array");
        }
        if (!schema.anyOf.some(
          testSchemaNoThrow.bind(
            this,
            instance,
            options,
            ctx,
            function(res) {
              inner.importErrors(res);
            }
          )
        )) {
          var list = schema.anyOf.map(function(v, i) {
            var id = v.$id || v.id;
            if (id)
              return "<" + id + ">";
            return v.title && JSON.stringify(v.title) || v["$ref"] && "<" + v["$ref"] + ">" || "[subschema " + i + "]";
          });
          if (options.nestedErrors) {
            result.importErrors(inner);
          }
          result.addError({
            name: "anyOf",
            argument: list,
            message: "is not any of " + list.join(",")
          });
        }
        return result;
      };
      validators.allOf = function validateAllOf(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        if (!Array.isArray(schema.allOf)) {
          throw new SchemaError("allOf must be an array");
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var self = this;
        schema.allOf.forEach(function(v, i) {
          var valid = self.validateSchema(instance, v, options, ctx);
          if (!valid.valid) {
            var id = v.$id || v.id;
            var msg = id || v.title && JSON.stringify(v.title) || v["$ref"] && "<" + v["$ref"] + ">" || "[subschema " + i + "]";
            result.addError({
              name: "allOf",
              argument: { id: msg, length: valid.errors.length, valid },
              message: "does not match allOf schema " + msg + " with " + valid.errors.length + " error[s]:"
            });
            result.importErrors(valid);
          }
        });
        return result;
      };
      validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        if (!Array.isArray(schema.oneOf)) {
          throw new SchemaError("oneOf must be an array");
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var inner = new ValidatorResult(instance, schema, options, ctx);
        var count = schema.oneOf.filter(
          testSchemaNoThrow.bind(
            this,
            instance,
            options,
            ctx,
            function(res) {
              inner.importErrors(res);
            }
          )
        ).length;
        var list = schema.oneOf.map(function(v, i) {
          var id = v.$id || v.id;
          return id || v.title && JSON.stringify(v.title) || v["$ref"] && "<" + v["$ref"] + ">" || "[subschema " + i + "]";
        });
        if (count !== 1) {
          if (options.nestedErrors) {
            result.importErrors(inner);
          }
          result.addError({
            name: "oneOf",
            argument: list,
            message: "is not exactly one from " + list.join(",")
          });
        }
        return result;
      };
      validators.if = function validateIf(instance, schema, options, ctx) {
        if (instance === void 0)
          return null;
        if (!helpers.isSchema(schema.if))
          throw new Error('Expected "if" keyword to be a schema');
        var ifValid = testSchemaNoThrow.call(this, instance, options, ctx, null, schema.if);
        var result = new ValidatorResult(instance, schema, options, ctx);
        var res;
        if (ifValid) {
          if (schema.then === void 0)
            return;
          if (!helpers.isSchema(schema.then))
            throw new Error('Expected "then" keyword to be a schema');
          res = this.validateSchema(instance, schema.then, options, ctx.makeChild(schema.then));
          result.importErrors(res);
        } else {
          if (schema.else === void 0)
            return;
          if (!helpers.isSchema(schema.else))
            throw new Error('Expected "else" keyword to be a schema');
          res = this.validateSchema(instance, schema.else, options, ctx.makeChild(schema.else));
          result.importErrors(res);
        }
        return result;
      };
      function getEnumerableProperty(object, key) {
        if (Object.hasOwnProperty.call(object, key))
          return object[key];
        if (!(key in object))
          return;
        while (object = Object.getPrototypeOf(object)) {
          if (Object.propertyIsEnumerable.call(object, key))
            return object[key];
        }
      }
      validators.propertyNames = function validatePropertyNames(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var subschema = schema.propertyNames !== void 0 ? schema.propertyNames : {};
        if (!helpers.isSchema(subschema))
          throw new SchemaError('Expected "propertyNames" to be a schema (object or boolean)');
        for (var property in instance) {
          if (getEnumerableProperty(instance, property) !== void 0) {
            var res = this.validateSchema(property, subschema, options, ctx.makeChild(subschema));
            result.importErrors(res);
          }
        }
        return result;
      };
      validators.properties = function validateProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var properties = schema.properties || {};
        for (var property in properties) {
          var subschema = properties[property];
          if (subschema === void 0) {
            continue;
          } else if (subschema === null) {
            throw new SchemaError('Unexpected null, expected schema in "properties"');
          }
          if (typeof options.preValidateProperty == "function") {
            options.preValidateProperty(instance, property, subschema, options, ctx);
          }
          var prop = getEnumerableProperty(instance, property);
          var res = this.validateSchema(prop, subschema, options, ctx.makeChild(subschema, property));
          if (res.instance !== result.instance[property])
            result.instance[property] = res.instance;
          result.importErrors(res);
        }
        return result;
      };
      function testAdditionalProperty(instance, schema, options, ctx, property, result) {
        if (!this.types.object(instance))
          return;
        if (schema.properties && schema.properties[property] !== void 0) {
          return;
        }
        if (schema.additionalProperties === false) {
          result.addError({
            name: "additionalProperties",
            argument: property,
            message: "is not allowed to have the additional property " + JSON.stringify(property)
          });
        } else {
          var additionalProperties = schema.additionalProperties || {};
          if (typeof options.preValidateProperty == "function") {
            options.preValidateProperty(instance, property, additionalProperties, options, ctx);
          }
          var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
          if (res.instance !== result.instance[property])
            result.instance[property] = res.instance;
          result.importErrors(res);
        }
      }
      validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var patternProperties = schema.patternProperties || {};
        for (var property in instance) {
          var test = true;
          for (var pattern in patternProperties) {
            var subschema = patternProperties[pattern];
            if (subschema === void 0) {
              continue;
            } else if (subschema === null) {
              throw new SchemaError('Unexpected null, expected schema in "patternProperties"');
            }
            try {
              var regexp = new RegExp(pattern, "u");
            } catch (_e) {
              regexp = new RegExp(pattern);
            }
            if (!regexp.test(property)) {
              continue;
            }
            test = false;
            if (typeof options.preValidateProperty == "function") {
              options.preValidateProperty(instance, property, subschema, options, ctx);
            }
            var res = this.validateSchema(instance[property], subschema, options, ctx.makeChild(subschema, property));
            if (res.instance !== result.instance[property])
              result.instance[property] = res.instance;
            result.importErrors(res);
          }
          if (test) {
            testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
          }
        }
        return result;
      };
      validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        if (schema.patternProperties) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        for (var property in instance) {
          testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
        }
        return result;
      };
      validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var keys = Object.keys(instance);
        if (!(keys.length >= schema.minProperties)) {
          result.addError({
            name: "minProperties",
            argument: schema.minProperties,
            message: "does not meet minimum property length of " + schema.minProperties
          });
        }
        return result;
      };
      validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var keys = Object.keys(instance);
        if (!(keys.length <= schema.maxProperties)) {
          result.addError({
            name: "maxProperties",
            argument: schema.maxProperties,
            message: "does not meet maximum property length of " + schema.maxProperties
          });
        }
        return result;
      };
      validators.items = function validateItems(instance, schema, options, ctx) {
        var self = this;
        if (!this.types.array(instance))
          return;
        if (schema.items === void 0)
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        instance.every(function(value, i) {
          if (Array.isArray(schema.items)) {
            var items = schema.items[i] === void 0 ? schema.additionalItems : schema.items[i];
          } else {
            var items = schema.items;
          }
          if (items === void 0) {
            return true;
          }
          if (items === false) {
            result.addError({
              name: "items",
              message: "additionalItems not permitted"
            });
            return false;
          }
          var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
          if (res.instance !== result.instance[i])
            result.instance[i] = res.instance;
          result.importErrors(res);
          return true;
        });
        return result;
      };
      validators.contains = function validateContains(instance, schema, options, ctx) {
        var self = this;
        if (!this.types.array(instance))
          return;
        if (schema.contains === void 0)
          return;
        if (!helpers.isSchema(schema.contains))
          throw new Error('Expected "contains" keyword to be a schema');
        var result = new ValidatorResult(instance, schema, options, ctx);
        var count = instance.some(function(value, i) {
          var res = self.validateSchema(value, schema.contains, options, ctx.makeChild(schema.contains, i));
          return res.errors.length === 0;
        });
        if (count === false) {
          result.addError({
            name: "contains",
            argument: schema.contains,
            message: "must contain an item matching given schema"
          });
        }
        return result;
      };
      validators.minimum = function validateMinimum(instance, schema, options, ctx) {
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
          if (!(instance > schema.minimum)) {
            result.addError({
              name: "minimum",
              argument: schema.minimum,
              message: "must be greater than " + schema.minimum
            });
          }
        } else {
          if (!(instance >= schema.minimum)) {
            result.addError({
              name: "minimum",
              argument: schema.minimum,
              message: "must be greater than or equal to " + schema.minimum
            });
          }
        }
        return result;
      };
      validators.maximum = function validateMaximum(instance, schema, options, ctx) {
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
          if (!(instance < schema.maximum)) {
            result.addError({
              name: "maximum",
              argument: schema.maximum,
              message: "must be less than " + schema.maximum
            });
          }
        } else {
          if (!(instance <= schema.maximum)) {
            result.addError({
              name: "maximum",
              argument: schema.maximum,
              message: "must be less than or equal to " + schema.maximum
            });
          }
        }
        return result;
      };
      validators.exclusiveMinimum = function validateExclusiveMinimum(instance, schema, options, ctx) {
        if (typeof schema.exclusiveMinimum === "boolean")
          return;
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var valid = instance > schema.exclusiveMinimum;
        if (!valid) {
          result.addError({
            name: "exclusiveMinimum",
            argument: schema.exclusiveMinimum,
            message: "must be strictly greater than " + schema.exclusiveMinimum
          });
        }
        return result;
      };
      validators.exclusiveMaximum = function validateExclusiveMaximum(instance, schema, options, ctx) {
        if (typeof schema.exclusiveMaximum === "boolean")
          return;
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var valid = instance < schema.exclusiveMaximum;
        if (!valid) {
          result.addError({
            name: "exclusiveMaximum",
            argument: schema.exclusiveMaximum,
            message: "must be strictly less than " + schema.exclusiveMaximum
          });
        }
        return result;
      };
      var validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy2(instance, schema, options, ctx, validationType, errorMessage) {
        if (!this.types.number(instance))
          return;
        var validationArgument = schema[validationType];
        if (validationArgument == 0) {
          throw new SchemaError(validationType + " cannot be zero");
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var instanceDecimals = helpers.getDecimalPlaces(instance);
        var divisorDecimals = helpers.getDecimalPlaces(validationArgument);
        var maxDecimals = Math.max(instanceDecimals, divisorDecimals);
        var multiplier = Math.pow(10, maxDecimals);
        if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) {
          result.addError({
            name: validationType,
            argument: validationArgument,
            message: errorMessage + JSON.stringify(validationArgument)
          });
        }
        return result;
      };
      validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
        return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
      };
      validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
        return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
      };
      validators.required = function validateRequired(instance, schema, options, ctx) {
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (instance === void 0 && schema.required === true) {
          result.addError({
            name: "required",
            message: "is required"
          });
        } else if (this.types.object(instance) && Array.isArray(schema.required)) {
          schema.required.forEach(function(n) {
            if (getEnumerableProperty(instance, n) === void 0) {
              result.addError({
                name: "required",
                argument: n,
                message: "requires property " + JSON.stringify(n)
              });
            }
          });
        }
        return result;
      };
      validators.pattern = function validatePattern(instance, schema, options, ctx) {
        if (!this.types.string(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var pattern = schema.pattern;
        try {
          var regexp = new RegExp(pattern, "u");
        } catch (_e) {
          regexp = new RegExp(pattern);
        }
        if (!instance.match(regexp)) {
          result.addError({
            name: "pattern",
            argument: schema.pattern,
            message: "does not match pattern " + JSON.stringify(schema.pattern.toString())
          });
        }
        return result;
      };
      validators.format = function validateFormat(instance, schema, options, ctx) {
        if (instance === void 0)
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
          result.addError({
            name: "format",
            argument: schema.format,
            message: "does not conform to the " + JSON.stringify(schema.format) + " format"
          });
        }
        return result;
      };
      validators.minLength = function validateMinLength(instance, schema, options, ctx) {
        if (!this.types.string(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var hsp = instance.match(/[\uDC00-\uDFFF]/g);
        var length = instance.length - (hsp ? hsp.length : 0);
        if (!(length >= schema.minLength)) {
          result.addError({
            name: "minLength",
            argument: schema.minLength,
            message: "does not meet minimum length of " + schema.minLength
          });
        }
        return result;
      };
      validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
        if (!this.types.string(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var hsp = instance.match(/[\uDC00-\uDFFF]/g);
        var length = instance.length - (hsp ? hsp.length : 0);
        if (!(length <= schema.maxLength)) {
          result.addError({
            name: "maxLength",
            argument: schema.maxLength,
            message: "does not meet maximum length of " + schema.maxLength
          });
        }
        return result;
      };
      validators.minItems = function validateMinItems(instance, schema, options, ctx) {
        if (!this.types.array(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!(instance.length >= schema.minItems)) {
          result.addError({
            name: "minItems",
            argument: schema.minItems,
            message: "does not meet minimum length of " + schema.minItems
          });
        }
        return result;
      };
      validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
        if (!this.types.array(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!(instance.length <= schema.maxItems)) {
          result.addError({
            name: "maxItems",
            argument: schema.maxItems,
            message: "does not meet maximum length of " + schema.maxItems
          });
        }
        return result;
      };
      function testArrays(v, i, a) {
        var j, len = a.length;
        for (j = i + 1, len; j < len; j++) {
          if (helpers.deepCompareStrict(v, a[j])) {
            return false;
          }
        }
        return true;
      }
      validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
        if (schema.uniqueItems !== true)
          return;
        if (!this.types.array(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!instance.every(testArrays)) {
          result.addError({
            name: "uniqueItems",
            message: "contains duplicate item"
          });
        }
        return result;
      };
      validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        for (var property in schema.dependencies) {
          if (instance[property] === void 0) {
            continue;
          }
          var dep = schema.dependencies[property];
          var childContext = ctx.makeChild(dep, property);
          if (typeof dep == "string") {
            dep = [dep];
          }
          if (Array.isArray(dep)) {
            dep.forEach(function(prop) {
              if (instance[prop] === void 0) {
                result.addError({
                  name: "dependencies",
                  argument: childContext.propertyPath,
                  message: "property " + prop + " not found, required by " + childContext.propertyPath
                });
              }
            });
          } else {
            var res = this.validateSchema(instance, dep, options, childContext);
            if (result.instance !== res.instance)
              result.instance = res.instance;
            if (res && res.errors.length) {
              result.addError({
                name: "dependencies",
                argument: childContext.propertyPath,
                message: "does not meet dependency required by " + childContext.propertyPath
              });
              result.importErrors(res);
            }
          }
        }
        return result;
      };
      validators["enum"] = function validateEnum(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        if (!Array.isArray(schema["enum"])) {
          throw new SchemaError("enum expects an array", schema);
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!schema["enum"].some(helpers.deepCompareStrict.bind(null, instance))) {
          result.addError({
            name: "enum",
            argument: schema["enum"],
            message: "is not one of enum values: " + schema["enum"].map(String).join(",")
          });
        }
        return result;
      };
      validators["const"] = function validateEnum(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!helpers.deepCompareStrict(schema["const"], instance)) {
          result.addError({
            name: "const",
            argument: schema["const"],
            message: "does not exactly match expected constant: " + schema["const"]
          });
        }
        return result;
      };
      validators.not = validators.disallow = function validateNot(instance, schema, options, ctx) {
        var self = this;
        if (instance === void 0)
          return null;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var notTypes = schema.not || schema.disallow;
        if (!notTypes)
          return null;
        if (!Array.isArray(notTypes))
          notTypes = [notTypes];
        notTypes.forEach(function(type) {
          if (self.testType(instance, schema, options, ctx, type)) {
            var id = type && (type.$id || type.id);
            var schemaId = id || type;
            result.addError({
              name: "not",
              argument: schemaId,
              message: "is of prohibited type " + schemaId
            });
          }
        });
        return result;
      };
      module.exports = attribute;
    }
  });

  // sdk/contracts/common/lib/jsonschema/scan.js
  var require_scan2 = __commonJS({
    "sdk/contracts/common/lib/jsonschema/scan.js"(exports, module) {
      "use strict";
      var urilib = require_url();
      var helpers = require_helpers();
      module.exports.SchemaScanResult = SchemaScanResult;
      function SchemaScanResult(found, ref) {
        this.id = found;
        this.ref = ref;
      }
      module.exports.scan = function scan(base, schema) {
        function scanSchema(baseuri, schema2) {
          if (!schema2 || typeof schema2 != "object")
            return;
          if (schema2.$ref) {
            var resolvedUri = urilib.resolve(baseuri, schema2.$ref);
            ref[resolvedUri] = ref[resolvedUri] ? ref[resolvedUri] + 1 : 0;
            return;
          }
          var id = schema2.$id || schema2.id;
          var ourBase = id ? urilib.resolve(baseuri, id) : baseuri;
          if (ourBase) {
            if (ourBase.indexOf("#") < 0)
              ourBase += "#";
            if (found[ourBase]) {
              if (!helpers.deepCompareStrict(found[ourBase], schema2)) {
                throw new Error(
                  "Schema <" + ourBase + "> already exists with different definition"
                );
              }
              return found[ourBase];
            }
            found[ourBase] = schema2;
            if (ourBase[ourBase.length - 1] == "#") {
              found[ourBase.substring(0, ourBase.length - 1)] = schema2;
            }
          }
          scanArray(
            ourBase + "/items",
            Array.isArray(schema2.items) ? schema2.items : [schema2.items]
          );
          scanArray(
            ourBase + "/extends",
            Array.isArray(schema2.extends) ? schema2.extends : [schema2.extends]
          );
          scanSchema(ourBase + "/additionalItems", schema2.additionalItems);
          scanObject(ourBase + "/properties", schema2.properties);
          scanSchema(ourBase + "/additionalProperties", schema2.additionalProperties);
          scanObject(ourBase + "/definitions", schema2.definitions);
          scanObject(ourBase + "/patternProperties", schema2.patternProperties);
          scanObject(ourBase + "/dependencies", schema2.dependencies);
          scanArray(ourBase + "/disallow", schema2.disallow);
          scanArray(ourBase + "/allOf", schema2.allOf);
          scanArray(ourBase + "/anyOf", schema2.anyOf);
          scanArray(ourBase + "/oneOf", schema2.oneOf);
          scanSchema(ourBase + "/not", schema2.not);
        }
        function scanArray(baseuri, schemas) {
          if (!Array.isArray(schemas))
            return;
          for (var i = 0; i < schemas.length; i++) {
            scanSchema(baseuri + "/" + i, schemas[i]);
          }
        }
        function scanObject(baseuri, schemas) {
          if (!schemas || typeof schemas != "object")
            return;
          for (var p in schemas) {
            scanSchema(baseuri + "/" + p, schemas[p]);
          }
        }
        var found = {};
        var ref = {};
        scanSchema(base, schema);
        return new SchemaScanResult(found, ref);
      };
    }
  });

  // sdk/contracts/common/lib/jsonschema/validator.js
  var require_validator = __commonJS({
    "sdk/contracts/common/lib/jsonschema/validator.js"(exports, module) {
      "use strict";
      var urilib = require_url();
      var attribute = require_attribute();
      var helpers = require_helpers();
      var scanSchema = require_scan2().scan;
      var ValidatorResult = helpers.ValidatorResult;
      var ValidatorResultError = helpers.ValidatorResultError;
      var SchemaError = helpers.SchemaError;
      var SchemaContext = helpers.SchemaContext;
      var anonymousBase = "/";
      var Validator = function Validator2() {
        this.customFormats = Object.create(Validator2.prototype.customFormats);
        this.schemas = {};
        this.unresolvedRefs = [];
        this.types = Object.create(types);
        this.attributes = Object.create(attribute.validators);
      };
      Validator.prototype.customFormats = {};
      Validator.prototype.schemas = null;
      Validator.prototype.types = null;
      Validator.prototype.attributes = null;
      Validator.prototype.unresolvedRefs = null;
      Validator.prototype.addSchema = function addSchema(schema, base) {
        var self = this;
        if (!schema) {
          return null;
        }
        var scan = scanSchema(base || anonymousBase, schema);
        var ourUri = base || schema.$id || schema.id;
        for (var uri in scan.id) {
          this.schemas[uri] = scan.id[uri];
        }
        for (var uri in scan.ref) {
          this.unresolvedRefs.push(uri);
        }
        this.unresolvedRefs = this.unresolvedRefs.filter(function(uri2) {
          return typeof self.schemas[uri2] === "undefined";
        });
        return this.schemas[ourUri];
      };
      Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
        if (!Array.isArray(schemas))
          return;
        for (var i = 0; i < schemas.length; i++) {
          this.addSubSchema(baseuri, schemas[i]);
        }
      };
      Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
        if (!schemas || typeof schemas != "object")
          return;
        for (var p in schemas) {
          this.addSubSchema(baseuri, schemas[p]);
        }
      };
      Validator.prototype.setSchemas = function setSchemas(schemas) {
        this.schemas = schemas;
      };
      Validator.prototype.getSchema = function getSchema(urn) {
        return this.schemas[urn];
      };
      Validator.prototype.validate = function validate(instance, schema, options, ctx) {
        if (typeof schema !== "boolean" && typeof schema !== "object" || schema === null) {
          throw new SchemaError("Expected `schema` to be an object or boolean");
        }
        if (!options) {
          options = {};
        }
        var id = schema.$id || schema.id;
        var base = urilib.resolve(options.base || anonymousBase, id || "");
        if (!ctx) {
          ctx = new SchemaContext(
            schema,
            options,
            [],
            base,
            Object.create(this.schemas)
          );
          if (!ctx.schemas[base]) {
            ctx.schemas[base] = schema;
          }
          var found = scanSchema(base, schema);
          for (var n in found.id) {
            var sch = found.id[n];
            ctx.schemas[n] = sch;
          }
        }
        if (options.required && instance === void 0) {
          var result = new ValidatorResult(instance, schema, options, ctx);
          result.addError("is required, but is undefined");
          return result;
        }
        var result = this.validateSchema(instance, schema, options, ctx);
        if (!result) {
          throw new Error("Result undefined");
        } else if (options.throwAll && result.errors.length) {
          throw new ValidatorResultError(result);
        }
        return result;
      };
      function shouldResolve(schema) {
        var ref = typeof schema === "string" ? schema : schema.$ref;
        if (typeof ref == "string")
          return ref;
        return false;
      }
      Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (typeof schema === "boolean") {
          if (schema === true) {
            schema = {};
          } else if (schema === false) {
            schema = { type: [] };
          }
        } else if (!schema) {
          throw new Error("schema is undefined");
        }
        if (schema["extends"]) {
          if (Array.isArray(schema["extends"])) {
            var schemaobj = { schema, ctx };
            schema["extends"].forEach(this.schemaTraverser.bind(this, schemaobj));
            schema = schemaobj.schema;
            schemaobj.schema = null;
            schemaobj.ctx = null;
            schemaobj = null;
          } else {
            schema = helpers.deepMerge(
              schema,
              this.superResolve(schema["extends"], ctx)
            );
          }
        }
        var switchSchema = shouldResolve(schema);
        if (switchSchema) {
          var resolved = this.resolve(schema, switchSchema, ctx);
          var subctx = new SchemaContext(
            resolved.subschema,
            options,
            ctx.path,
            resolved.switchSchema,
            ctx.schemas
          );
          return this.validateSchema(instance, resolved.subschema, options, subctx);
        }
        var skipAttributes = options && options.skipAttributes || [];
        for (var key in schema) {
          if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
            var validatorErr = null;
            var validator = this.attributes[key];
            if (validator) {
              validatorErr = validator.call(this, instance, schema, options, ctx);
            } else if (options.allowUnknownAttributes === false) {
              throw new SchemaError("Unsupported attribute: " + key, schema);
            }
            if (validatorErr) {
              result.importErrors(validatorErr);
            }
          }
        }
        if (typeof options.rewrite == "function") {
          var value = options.rewrite.call(this, instance, schema, options, ctx);
          result.instance = value;
        }
        return result;
      };
      Validator.prototype.schemaTraverser = function schemaTraverser(schemaobj, s) {
        schemaobj.schema = helpers.deepMerge(
          schemaobj.schema,
          this.superResolve(s, schemaobj.ctx)
        );
      };
      Validator.prototype.superResolve = function superResolve(schema, ctx) {
        var ref = shouldResolve(schema);
        if (ref) {
          return this.resolve(schema, ref, ctx).subschema;
        }
        return schema;
      };
      Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
        switchSchema = ctx.resolve(switchSchema);
        if (ctx.schemas[switchSchema]) {
          return { subschema: ctx.schemas[switchSchema], switchSchema };
        }
        var parsed = urilib.parse(switchSchema);
        var fragment = parsed && parsed.hash;
        var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
        if (!document || !ctx.schemas[document]) {
          throw new SchemaError("no such schema <" + switchSchema + ">", schema);
        }
        var subschema = helpers.objectGetPath(
          ctx.schemas[document],
          fragment.substr(1)
        );
        if (subschema === void 0) {
          throw new SchemaError(
            "no such schema " + fragment + " located in <" + document + ">",
            schema
          );
        }
        return { subschema, switchSchema };
      };
      Validator.prototype.testType = function validateType(instance, schema, options, ctx, type) {
        if (type === void 0) {
          return;
        } else if (type === null) {
          throw new SchemaError('Unexpected null in "type" keyword');
        }
        if (typeof this.types[type] == "function") {
          return this.types[type].call(this, instance);
        }
        if (type && typeof type == "object") {
          var res = this.validateSchema(instance, type, options, ctx);
          return res === void 0 || !(res && res.errors.length);
        }
        return true;
      };
      var types = Validator.prototype.types = {};
      types.string = function testString(instance) {
        return typeof instance == "string";
      };
      types.number = function testNumber(instance) {
        return typeof instance == "number" && isFinite(instance);
      };
      types.integer = function testInteger(instance) {
        return typeof instance == "number" && instance % 1 === 0;
      };
      types.boolean = function testBoolean(instance) {
        return typeof instance == "boolean";
      };
      types.array = function testArray(instance) {
        return Array.isArray(instance);
      };
      types["null"] = function testNull(instance) {
        return instance === null;
      };
      types.date = function testDate(instance) {
        return instance instanceof Date;
      };
      types.any = function testAny(instance) {
        return true;
      };
      types.object = function testObject(instance) {
        return instance && typeof instance === "object" && !Array.isArray(instance) && !(instance instanceof Date);
      };
      module.exports = Validator;
    }
  });

  // sdk/contracts/common/lib/jsonschema/index.js
  var require_jsonschema = __commonJS({
    "sdk/contracts/common/lib/jsonschema/index.js"(exports, module) {
      "use strict";
      var Validator = module.exports.Validator = require_validator();
      module.exports.ValidatorResult = require_helpers().ValidatorResult;
      module.exports.ValidatorResultError = require_helpers().ValidatorResultError;
      module.exports.ValidationError = require_helpers().ValidationError;
      module.exports.SchemaError = require_helpers().SchemaError;
      module.exports.SchemaScanResult = require_scan2().SchemaScanResult;
      module.exports.scan = require_scan2().scan;
      module.exports.validate = function(instance, schema, options) {
        var v = new Validator();
        return v.validate(instance, schema, options);
      };
    }
  });

  // sdk/contracts/common/lib/utils.js
  var require_utils = __commonJS({
    "sdk/contracts/common/lib/utils.js"(exports, module) {
      var {
        mergeLeft,
        includes,
        of,
        isNil,
        tail,
        is,
        complement,
        concat,
        without,
        last
      } = require_src();
      var md5 = require_md5();
      var { clone, bigIntFromBytes } = require_pure();
      var { validate } = require_jsonschema();
      var err2 = (msg = `The wrong query`, contractErr = false) => {
        if (contractErr) {
          const error = typeof ContractError === "undefined" ? Error : ContractError;
          throw new error(msg);
        } else {
          throw msg;
        }
      };
      var getField = (data, path) => {
        if (path.length === 1) {
          return [path[0], data];
        } else {
          if (isNil(data[path[0]]))
            data[path[0]] = {};
          return getField(data[path[0]], tail(path));
        }
      };
      var mergeData = (_data, new_data, extra = {}, overwrite = false, signer, SmartWeave2) => {
        let exists = true;
        if (isNil(_data.__data) || overwrite) {
          _data.__data = {};
          exists = false;
        }
        for (let k in new_data) {
          const path = exists ? k.split(".") : [k];
          const [field, obj] = getField(_data.__data, path);
          const d = new_data[k];
          if (is(Object)(d) && d.__op === "data") {
            obj[field] = extra[d.key] ?? null;
          } else if (is(Object)(d) && d.__op === "arrayUnion") {
            if (complement(is)(Array, d.arr))
              err2();
            if (complement(is)(Array, obj[field]))
              obj[field] = [];
            obj[field] = concat(obj[field], d.arr);
          } else if (is(Object)(d) && d.__op === "arrayRemove") {
            if (complement(is)(Array, d.arr))
              err2();
            if (complement(is)(Array, obj[field]))
              obj[field] = [];
            obj[field] = without(d.arr, obj[field]);
          } else if (is(Object)(d) && d.__op === "inc") {
            if (isNaN(d.n))
              err2();
            if (isNil(obj[field]))
              obj[field] = 0;
            obj[field] += d.n;
          } else if (is(Object)(d) && d.__op === "del") {
            delete obj[field];
          } else if (is(Object)(d) && d.__op === "ts") {
            obj[field] = SmartWeave2.block.timestamp;
          } else if (is(Object)(d) && d.__op === "signer") {
            obj[field] = signer;
          } else {
            obj[field] = d;
          }
        }
        return _data;
      };
      var isEvolving = (state) => !isNil(state.evolveHistory) && !isNil(last(state.evolveHistory)) && isNil(last(state.evolveHistory).newVersion);
      var genId = async (action, salt, SmartWeave2) => md5(JSON.stringify(action.input));
      var isOwner = (signer, state) => {
        let owner = state.owner || [];
        if (is(String)(owner))
          owner = of(owner);
        if (!includes(signer)(owner)) {
          err2(`Signer[${signer}] is not the owner[${owner.join(", ")}].`);
        }
        return owner;
      };
      var read = async (contract, param, SmartWeave2) => {
        return (await SmartWeave2.contracts.viewContractState(contract, param)).result;
      };
      var validateSchema = (schema, data, contractErr) => {
        if (!isNil(schema)) {
          const valid = validate(data, clone(schema)).valid;
          if (!valid)
            err2("invalid schema", contractErr);
        }
      };
      var wrapResult = (state, original_signer, SmartWeave2, extra) => ({
        state,
        result: mergeLeft(extra, {
          original_signer,
          transaction: {
            id: SmartWeave2?.transaction?.id || null,
            owner: SmartWeave2?.transaction?.owner || null,
            tags: SmartWeave2?.transaction?.tags || null,
            quantity: SmartWeave2?.transaction?.quantity || null,
            target: SmartWeave2?.transaction?.target || null,
            reward: SmartWeave2?.transaction?.reward || null
          },
          block: {
            height: SmartWeave2?.block?.height || null,
            timestamp: SmartWeave2?.block?.timestamp || null,
            indep_hash: SmartWeave2?.block?.indep_hash || null
          }
        })
      });
      var parse = async (state, action, _func, signer, salt, contractErr = true, SmartWeave2, kvs, type, fn) => {
        let func;
        if (!isNil(_func))
          func = _func.split(":")[0];
        const { data } = state;
        const { query } = action.input;
        const { relayer, jobID, extra } = action;
        let new_data = null;
        let path = null;
        let col;
        if (includes(func)([
          "delete",
          "getSchema",
          "getRules",
          "getAlgorithms",
          "removeRelayerJob",
          "getRelayerJob",
          "listCollections"
        ])) {
          path = query;
        } else {
          ;
          [new_data, ...path] = query;
          if (func === "add") {
            const id = await genId(action, salt, SmartWeave2);
            path.push(id);
            await fn.addNewDoc(id, SmartWeave2, state, kvs);
          }
        }
        if (isNil(new_data) && !includes(func)([
          "listCollections",
          "delete",
          "getSchema",
          "getRules",
          "getAlgorithms",
          "getRelayerJob",
          "removeRelayerJob",
          "getRelayerJob"
        ]) || path.length === 0 && !includes(func)(["setAlgorithms", "listCollections"]) || path.length % 2 !== 0 && !includes(func)([
          "addRelayerJob",
          "removeRelayerJob",
          "getRelayerJob",
          "addIndex",
          "addTrigger",
          "removeTrigger",
          "removeIndex",
          "setSchema",
          "getSchema",
          "getAlgorithms",
          "setRules",
          "getRules",
          "linkContract",
          "unlinkContract"
        ])) {
          err2(`the wrong query length[${query.length}] for ${func}`, contractErr);
        }
        let _data = null;
        let schema = null;
        let rules = null;
        let next_data;
        if (includes(func)([
          "addIndex",
          "addTrigger",
          "removeTrigger",
          "removeIndex",
          "setSchema",
          "getSchema",
          "setRules",
          "getRules"
        ])) {
          _data = await fn.getCol(data, path, signer, SmartWeave2, void 0, kvs);
          col = _data;
        } else if (!includes(func)([
          "setAlgorithms",
          "addRelayerJob",
          "removeRelayerJob",
          "getAlgorithms",
          "linkContract",
          "unlinkContract"
        ]) && path.length !== 0) {
          const doc = await fn.getDoc(
            data,
            path,
            signer,
            func,
            new_data,
            state.secure,
            relayer,
            jobID,
            extra,
            state,
            action,
            SmartWeave2,
            void 0,
            kvs,
            fn.get,
            type,
            _func
          );
          _data = doc.doc;
          ({ next_data, schema, rules, col } = doc);
        }
        let owner = state.owner || [];
        if (is(String)(owner))
          owner = of(owner);
        if (!isNil(state.auth) && includes(func)([
          "addRelayerJob",
          "removeRelayerJob",
          "addIndex",
          "addTrigger",
          "removeTrigger",
          "removeIndex",
          "setSchema",
          "setAlgorithms",
          "setRules",
          "unlinkContract",
          "linkContract",
          "unlinkContract"
        ]) && !includes(signer)(owner)) {
          err2(
            `caller[${signer}] is not contract owner[${owner.join(", ")}]`,
            contractErr
          );
        }
        return { data, query, new_data, path, _data, schema, col, next_data };
      };
      var auth = async (state, action, func, SmartWeave2, use_nonce = true, kvs, fn) => {
        if (isNil(state.auth))
          return { signer: null, original_signer: null };
        const {
          query,
          nonce,
          signature,
          caller,
          type = "secp256k1",
          pubKey
        } = action.input;
        if (!includes(type)(
          state.auth.algorithms || ["secp256k1", "secp256k1-2", "ed25519", "rsa256"]
        )) {
          err2(`The wrong algorithm`);
        }
        let _caller = caller;
        const EIP712Domain = [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "verifyingContract", type: "string" }
        ];
        const domain = {
          name: state.auth.name,
          version: state.auth.version,
          verifyingContract: isNil(SmartWeave2.contract) ? "exm" : SmartWeave2.contract.id
        };
        const message = {
          nonce,
          query: JSON.stringify({ func, query })
        };
        const _data = {
          types: {
            EIP712Domain,
            Query: [
              { name: "query", type: "string" },
              { name: "nonce", type: "uint256" }
            ]
          },
          domain,
          primaryType: "Query",
          message
        };
        let signer = null;
        if (type === "ed25519") {
          const { isValid } = await read(
            state.contracts.dfinity,
            {
              function: "verify",
              data: _data,
              signature,
              signer: caller
            },
            SmartWeave2
          );
          if (isValid) {
            signer = caller;
          } else {
            err2(`The wrong signature`);
          }
        } else if (type === "rsa256") {
          let encoded_data = JSON.stringify(_data);
          if (typeof TextEncoder !== "undefined") {
            const enc = new TextEncoder();
            encoded_data = enc.encode(encoded_data);
          }
          const _crypto = SmartWeave2.arweave.crypto || SmartWeave2.arweave.wallets.crypto;
          const isValid = await _crypto.verify(
            pubKey,
            encoded_data,
            Buffer.from(signature, "hex")
          );
          if (isValid) {
            signer = caller;
          } else {
            err2(`The wrong signature`);
          }
        } else if (type == "secp256k1") {
          signer = (await read(
            state.contracts.ethereum,
            {
              function: "verify712",
              data: _data,
              signature
            },
            SmartWeave2
          )).signer;
        } else if (type == "secp256k1-2") {
          signer = (await read(
            state.contracts.ethereum,
            {
              function: "verify",
              data: _data,
              signature
            },
            SmartWeave2
          )).signer;
        }
        if (includes(type)(["secp256k1", "secp256k1-2"])) {
          if (/^0x/.test(signer))
            signer = signer.toLowerCase();
          if (/^0x/.test(_caller))
            _caller = _caller.toLowerCase();
        }
        let original_signer = signer;
        let _signer = signer;
        if (_signer !== _caller) {
          const link = state.auth.links[_signer];
          if (!isNil(link)) {
            let _address = is(Object, link) ? link.address : link;
            let _expiry = is(Object, link) ? link.expiry || 0 : 0;
            if (_expiry === 0 || SmartWeave2.block.timestamp <= _expiry) {
              _signer = _address;
            }
          }
        }
        if (_signer !== _caller)
          err2(`signer[${_signer}] is not caller[${_caller}]`);
        if (use_nonce !== false)
          await fn.useNonce(nonce, original_signer, state, kvs, SmartWeave2);
        return { signer: _signer, original_signer };
      };
      module.exports = {
        err: err2,
        getField,
        mergeData,
        isEvolving,
        genId,
        isOwner,
        read,
        validateSchema,
        wrapResult,
        parse,
        auth
      };
    }
  });

  // sdk/contracts/nostr/lib/_assert.js
  var require_assert = __commonJS({
    "sdk/contracts/nostr/lib/_assert.js"(exports, module) {
      function bytes(b, ...lengths) {
        if (!(b instanceof Uint8Array))
          throw new Error("Expected Uint8Array");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error(
            `Expected Uint8Array of length ${lengths}, not of length=${b.length}`
          );
      }
      function exists(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function output(out, instance) {
        bytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error(
            `digestInto() expects output buffer of length at least ${min}`
          );
        }
      }
      function number(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error(`Wrong positive integer: ${n}`);
      }
      function hash(hash2) {
        if (typeof hash2 !== "function" || typeof hash2.create !== "function")
          throw new Error("Hash should be wrapped by utils.wrapConstructor");
        number(hash2.outputLen);
        number(hash2.blockLen);
      }
      module.exports = { exists, output, hash, bytes };
    }
  });

  // sdk/contracts/nostr/lib/utils.js
  var require_utils2 = __commonJS({
    "sdk/contracts/nostr/lib/utils.js"(exports, module) {
      var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      var u8a = (a) => a instanceof Uint8Array;
      function utf8ToBytes(str) {
        if (typeof str !== "string")
          throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function toBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        if (!u8a(data))
          throw new Error(`expected Uint8Array, got ${typeof data}`);
        return data;
      }
      var Hash = class {
        clone() {
          return this._cloneInto();
        }
      };
      var rotr = (word, shift) => word << 32 - shift | word >>> shift;
      function wrapConstructor(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function concatBytes(...arrays) {
        const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
        let pad = 0;
        arrays.forEach((a) => {
          if (!u8a(a))
            throw new Error("Uint8Array expected");
          r.set(a, pad);
          pad += a.length;
        });
        return r;
      }
      module.exports = {
        toBytes,
        createView,
        Hash,
        rotr,
        wrapConstructor,
        concatBytes
      };
    }
  });

  // sdk/contracts/nostr/lib/_sha2.js
  var require_sha2 = __commonJS({
    "sdk/contracts/nostr/lib/_sha2.js"(exports, module) {
      var { exists, output } = require_assert();
      var { Hash, createView, toBytes } = require_utils2();
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      var SHA2 = class extends Hash {
        finished = false;
        length = 0;
        pos = 0;
        destroyed = false;
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.buffer = new Uint8Array(blockLen);
          this.view = createView(this.buffer);
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
        }
        update(data) {
          exists(this);
          const { view, buffer, blockLen } = this;
          data = toBytes(data);
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = createView(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          exists(this);
          output(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          this.buffer.subarray(pos).fill(0);
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = createView(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to ||= new this.constructor();
          to.set(...this.get());
          const { blockLen, buffer, length, finished, destroyed, pos } = this;
          to.length = length;
          to.pos = pos;
          to.finished = finished;
          to.destroyed = destroyed;
          if (length % blockLen)
            to.buffer.set(buffer);
          return to;
        }
      };
      module.exports = { SHA2 };
    }
  });

  // sdk/contracts/nostr/lib/sha256.js
  var require_sha256 = __commonJS({
    "sdk/contracts/nostr/lib/sha256.js"(exports, module) {
      var { SHA2 } = require_sha2();
      var { rotr, wrapConstructor } = require_utils2();
      var Chi = (a, b, c) => a & b ^ ~a & c;
      var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
      var SHA256_K = /* @__PURE__ */ new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var IV = /* @__PURE__ */ new Uint32Array([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      var SHA256 = class extends SHA2 {
        A = IV[0] | 0;
        B = IV[1] | 0;
        C = IV[2] | 0;
        D = IV[3] | 0;
        E = IV[4] | 0;
        F = IV[5] | 0;
        G = IV[6] | 0;
        H = IV[7] | 0;
        constructor() {
          super(64, 32, 8, false);
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          SHA256_W.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          this.buffer.fill(0);
        }
      };
      var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());
      module.exports = { sha256 };
    }
  });

  // sdk/contracts/nostr/lib/abstract/utils.js
  var require_utils3 = __commonJS({
    "sdk/contracts/nostr/lib/abstract/utils.js"(exports, module) {
      var _0n = BigInt(0);
      var _1n = BigInt(1);
      var _2n = BigInt(2);
      var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
      var u8a = (a) => a instanceof Uint8Array;
      var hexes = /* @__PURE__ */ Array.from(
        { length: 256 },
        (_2, i) => i.toString(16).padStart(2, "0")
      );
      function hexToNumber(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        return BigInt(hex === "" ? "0" : `0x${hex}`);
      }
      var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
      function asciiToBase16(char) {
        if (char >= asciis._0 && char <= asciis._9)
          return char - asciis._0;
        if (char >= asciis._A && char <= asciis._F)
          return char - (asciis._A - 10);
        if (char >= asciis._a && char <= asciis._f)
          return char - (asciis._a - 10);
        return;
      }
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error(
            "padded hex string expected, got unpadded hex of length " + hl
          );
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase16(hex.charCodeAt(hi));
          const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error(
              'hex string expected, got non-hex character "' + char + '" at index ' + hi
            );
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      function bytesToHex(bytes) {
        if (!u8a(bytes))
          throw new Error("Uint8Array expected");
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      function bytesToNumberBE(bytes) {
        return hexToNumber(bytesToHex(bytes));
      }
      function bytesToNumberLE(bytes) {
        if (!u8a(bytes))
          throw new Error("Uint8Array expected");
        return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
      }
      function numberToBytesBE(n, len) {
        return hexToBytes(n.toString(16).padStart(len * 2, "0"));
      }
      function numberToBytesLE(n, len) {
        return numberToBytesBE(n, len).reverse();
      }
      function concatBytes(...arrays) {
        const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
        let pad = 0;
        arrays.forEach((a) => {
          if (!u8a(a))
            throw new Error("Uint8Array expected");
          r.set(a, pad);
          pad += a.length;
        });
        return r;
      }
      function ensureBytes(title, hex, expectedLength) {
        let res;
        if (typeof hex === "string") {
          try {
            res = hexToBytes(hex);
          } catch (e) {
            throw new Error(
              `${title} must be valid hex string, got "${hex}". Cause: ${e}`
            );
          }
        } else if (u8a(hex)) {
          res = Uint8Array.from(hex);
        } else {
          throw new Error(`${title} must be hex string or Uint8Array`);
        }
        const len = res.length;
        if (typeof expectedLength === "number" && len !== expectedLength)
          throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
        return res;
      }
      var validatorFns = {
        bigint: (val) => typeof val === "bigint",
        function: (val) => typeof val === "function",
        boolean: (val) => typeof val === "boolean",
        string: (val) => typeof val === "string",
        stringOrUint8Array: (val) => typeof val === "string" || val instanceof Uint8Array,
        isSafeInteger: (val) => Number.isSafeInteger(val),
        array: (val) => Array.isArray(val),
        field: (val, object) => object.Fp.isValid(val),
        hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
      };
      function validateObject(object, validators, optValidators = {}) {
        const checkField = (fieldName, type, isOptional) => {
          const checkVal = validatorFns[type];
          if (typeof checkVal !== "function")
            throw new Error(`Invalid validator "${type}", expected function`);
          const val = object[fieldName];
          if (isOptional && val === void 0)
            return;
          if (!checkVal(val, object)) {
            throw new Error(
              `Invalid param ${String(
                fieldName
              )}=${val} (${typeof val}), expected ${type}`
            );
          }
        };
        for (const [fieldName, type] of Object.entries(validators))
          checkField(fieldName, type, false);
        for (const [fieldName, type] of Object.entries(optValidators))
          checkField(fieldName, type, true);
        return object;
      }
      function bytesToHex(bytes) {
        if (!u8a(bytes))
          throw new Error("Uint8Array expected");
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error(
            "padded hex string expected, got unpadded hex of length " + hl
          );
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase16(hex.charCodeAt(hi));
          const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error(
              'hex string expected, got non-hex character "' + char + '" at index ' + hi
            );
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      function createHmacDrbg(hashLen, qByteLen, hmacFn) {
        if (typeof hashLen !== "number" || hashLen < 2)
          throw new Error("hashLen must be a number");
        if (typeof qByteLen !== "number" || qByteLen < 2)
          throw new Error("qByteLen must be a number");
        if (typeof hmacFn !== "function")
          throw new Error("hmacFn must be a function");
        let v = u8n(hashLen);
        let k = u8n(hashLen);
        let i = 0;
        const reset = () => {
          v.fill(1);
          k.fill(0);
          i = 0;
        };
        const h = (...b) => hmacFn(k, v, ...b);
        const reseed = (seed = u8n()) => {
          k = h(u8fr([0]), seed);
          v = h();
          if (seed.length === 0)
            return;
          k = h(u8fr([1]), seed);
          v = h();
        };
        const gen = () => {
          if (i++ >= 1e3)
            throw new Error("drbg: tried 1000 values");
          let len = 0;
          const out = [];
          while (len < qByteLen) {
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
          }
          return concatBytes(...out);
        };
        const genUntil = (seed, pred) => {
          reset();
          reseed(seed);
          let res = void 0;
          while (!(res = pred(gen())))
            reseed();
          reset();
          return res;
        };
        return genUntil;
      }
      module.exports = {
        bitMask,
        numberToBytesBE,
        numberToBytesLE,
        bytesToNumberBE,
        bytesToNumberLE,
        concatBytes,
        ensureBytes,
        validateObject,
        bytesToHex,
        hexToBytes,
        createHmacDrbg
      };
    }
  });

  // sdk/contracts/nostr/lib/abstract/modular.js
  var require_modular = __commonJS({
    "sdk/contracts/nostr/lib/abstract/modular.js"(exports, module) {
      var {
        bitMask,
        numberToBytesBE,
        numberToBytesLE,
        bytesToNumberBE,
        bytesToNumberLE,
        validateObject
      } = require_utils3();
      var _0n = BigInt(0);
      var _1n = BigInt(1);
      var _2n = BigInt(2);
      var _3n = BigInt(3);
      var _4n = BigInt(4);
      var _5n = BigInt(5);
      var _8n = BigInt(8);
      var _9n = BigInt(9);
      var _16n = BigInt(16);
      function pow(num, power, modulo) {
        if (modulo <= _0n || power < _0n)
          throw new Error("Expected power/modulo > 0");
        if (modulo === _1n)
          return _0n;
        let res = _1n;
        while (power > _0n) {
          if (power & _1n)
            res = res * num % modulo;
          num = num * num % modulo;
          power >>= _1n;
        }
        return res;
      }
      function tonelliShanks(P) {
        const legendreC = (P - _1n) / _2n;
        let Q, S, Z;
        for (Q = P - _1n, S = 0; Q % _2n === _0n; Q /= _2n, S++)
          ;
        for (Z = _2n; Z < P && pow(Z, legendreC, P) !== P - _1n; Z++)
          ;
        if (S === 1) {
          const p1div4 = (P + _1n) / _4n;
          return function tonelliFast(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n))
              throw new Error("Cannot find square root");
            return root;
          };
        }
        const Q1div2 = (Q + _1n) / _2n;
        return function tonelliSlow(Fp, n) {
          if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
            throw new Error("Cannot find square root");
          let r = S;
          let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q);
          let x = Fp.pow(n, Q1div2);
          let b = Fp.pow(n, Q);
          while (!Fp.eql(b, Fp.ONE)) {
            if (Fp.eql(b, Fp.ZERO))
              return Fp.ZERO;
            let m = 1;
            for (let t2 = Fp.sqr(b); m < r; m++) {
              if (Fp.eql(t2, Fp.ONE))
                break;
              t2 = Fp.sqr(t2);
            }
            const ge = Fp.pow(g, _1n << BigInt(r - m - 1));
            g = Fp.sqr(ge);
            x = Fp.mul(x, ge);
            b = Fp.mul(b, g);
            r = m;
          }
          return x;
        };
      }
      function FpPow(f, num, power) {
        if (power < _0n)
          throw new Error("Expected power > 0");
        if (power === _0n)
          return f.ONE;
        if (power === _1n)
          return num;
        let p = f.ONE;
        let d = num;
        while (power > _0n) {
          if (power & _1n)
            p = f.mul(p, d);
          d = f.sqr(d);
          power >>= _1n;
        }
        return p;
      }
      function FpSqrt(P) {
        if (P % _4n === _3n) {
          const p1div4 = (P + _1n) / _4n;
          return function sqrt3mod4(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n))
              throw new Error("Cannot find square root");
            return root;
          };
        }
        if (P % _8n === _5n) {
          const c1 = (P - _5n) / _8n;
          return function sqrt5mod8(Fp, n) {
            const n2 = Fp.mul(n, _2n);
            const v = Fp.pow(n2, c1);
            const nv = Fp.mul(n, v);
            const i = Fp.mul(Fp.mul(nv, _2n), v);
            const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
            if (!Fp.eql(Fp.sqr(root), n))
              throw new Error("Cannot find square root");
            return root;
          };
        }
        if (P % _16n === _9n) {
        }
        return tonelliShanks(P);
      }
      function mod(a, b) {
        const result = a % b;
        return result >= _0n ? result : b + result;
      }
      function pow2(x, power, modulo) {
        let res = x;
        while (power-- > _0n) {
          res *= res;
          res %= modulo;
        }
        return res;
      }
      function nLength(n, nBitLength) {
        const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
        const nByteLength = Math.ceil(_nBitLength / 8);
        return { nBitLength: _nBitLength, nByteLength };
      }
      function getFieldBytesLength(fieldOrder) {
        if (typeof fieldOrder !== "bigint")
          throw new Error("field order must be bigint");
        const bitLength = fieldOrder.toString(2).length;
        return Math.ceil(bitLength / 8);
      }
      function getMinHashLength(fieldOrder) {
        const length = getFieldBytesLength(fieldOrder);
        return length + Math.ceil(length / 2);
      }
      function mapHashToField(key, fieldOrder, isLE = false) {
        const len = key.length;
        const fieldLen = getFieldBytesLength(fieldOrder);
        const minLen = getMinHashLength(fieldOrder);
        if (len < 16 || len < minLen || len > 1024)
          throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
        const num = isLE ? bytesToNumberBE(key) : bytesToNumberLE(key);
        const reduced = mod(num, fieldOrder - _1n) + _1n;
        return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
      }
      function invert(number, modulo) {
        if (number === _0n || modulo <= _0n) {
          throw new Error(
            `invert: expected positive integers, got n=${number} mod=${modulo}`
          );
        }
        let a = mod(number, modulo);
        let b = modulo;
        let x = _0n, y = _1n, u = _1n, v = _0n;
        while (a !== _0n) {
          const q = b / a;
          const r = b % a;
          const m = x - u * q;
          const n = y - v * q;
          b = a, a = r, x = u, y = v, u = m, v = n;
        }
        const gcd = b;
        if (gcd !== _1n)
          throw new Error("invert: does not exist");
        return mod(x, modulo);
      }
      function FpInvertBatch(f, nums) {
        const tmp = new Array(nums.length);
        const lastMultiplied = nums.reduce((acc, num, i) => {
          if (f.is0(num))
            return acc;
          tmp[i] = acc;
          return f.mul(acc, num);
        }, f.ONE);
        const inverted = f.inv(lastMultiplied);
        nums.reduceRight((acc, num, i) => {
          if (f.is0(num))
            return acc;
          tmp[i] = f.mul(acc, tmp[i]);
          return f.mul(acc, num);
        }, inverted);
        return tmp;
      }
      function Field(ORDER, bitLen, isLE = false, redef = {}) {
        if (ORDER <= _0n)
          throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
        const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
        if (BYTES > 2048)
          throw new Error("Field lengths over 2048 bytes are not supported");
        const sqrtP = FpSqrt(ORDER);
        const f = Object.freeze({
          ORDER,
          BITS,
          BYTES,
          MASK: bitMask(BITS),
          ZERO: _0n,
          ONE: _1n,
          create: (num) => mod(num, ORDER),
          isValid: (num) => {
            if (typeof num !== "bigint")
              throw new Error(
                `Invalid field element: expected bigint, got ${typeof num}`
              );
            return _0n <= num && num < ORDER;
          },
          is0: (num) => num === _0n,
          isOdd: (num) => (num & _1n) === _1n,
          neg: (num) => mod(-num, ORDER),
          eql: (lhs, rhs) => lhs === rhs,
          sqr: (num) => mod(num * num, ORDER),
          add: (lhs, rhs) => mod(lhs + rhs, ORDER),
          sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
          mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
          pow: (num, power) => FpPow(f, num, power),
          div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
          sqrN: (num) => num * num,
          addN: (lhs, rhs) => lhs + rhs,
          subN: (lhs, rhs) => lhs - rhs,
          mulN: (lhs, rhs) => lhs * rhs,
          inv: (num) => invert(num, ORDER),
          sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
          invertBatch: (lst) => FpInvertBatch(f, lst),
          cmov: (a, b, c) => c ? b : a,
          toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
          fromBytes: (bytes) => {
            if (bytes.length !== BYTES)
              throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes.length}`);
            return isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
          }
        });
        return Object.freeze(f);
      }
      function validateField(field) {
        const initial = {
          ORDER: "bigint",
          MASK: "bigint",
          BYTES: "isSafeInteger",
          BITS: "isSafeInteger"
        };
        const FIELD_FIELDS = [
          "create",
          "isValid",
          "is0",
          "neg",
          "inv",
          "sqrt",
          "sqr",
          "eql",
          "add",
          "sub",
          "mul",
          "pow",
          "div",
          "addN",
          "subN",
          "mulN",
          "sqrN"
        ];
        const opts = FIELD_FIELDS.reduce((map, val) => {
          map[val] = "function";
          return map;
        }, initial);
        return validateObject(field, opts);
      }
      module.exports = {
        pow2,
        mod,
        Field,
        validateField,
        invert,
        getMinHashLength,
        mapHashToField,
        nLength
      };
    }
  });

  // sdk/contracts/nostr/lib/hmac.js
  var require_hmac = __commonJS({
    "sdk/contracts/nostr/lib/hmac.js"(exports, module) {
      var {
        hash: assertHash,
        bytes: assertBytes,
        exists: assertExists
      } = require_assert();
      var { Hash, toBytes } = require_utils2();
      var HMAC = class extends Hash {
        finished = false;
        destroyed = false;
        constructor(hash, _key) {
          super();
          assertHash(hash);
          const key = toBytes(_key);
          this.iHash = hash.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54;
          this.iHash.update(pad);
          this.oHash = hash.create();
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54 ^ 92;
          this.oHash.update(pad);
          pad.fill(0);
        }
        update(buf) {
          assertExists(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          assertExists(this);
          assertBytes(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to ||= Object.create(Object.getPrototypeOf(this), {});
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
      hmac.create = (hash, key) => new HMAC(hash, key);
      module.exports = { hmac };
    }
  });

  // sdk/contracts/nostr/lib/abstract/curve.js
  var require_curve = __commonJS({
    "sdk/contracts/nostr/lib/abstract/curve.js"(exports, module) {
      var { validateField, nLength } = require_modular();
      var { validateObject } = require_utils3();
      var _0n = BigInt(0);
      var _1n = BigInt(1);
      function wNAF(c, bits) {
        const constTimeNegate = (condition, item) => {
          const neg = item.negate();
          return condition ? neg : item;
        };
        const opts = (W) => {
          const windows = Math.ceil(bits / W) + 1;
          const windowSize = 2 ** (W - 1);
          return { windows, windowSize };
        };
        return {
          constTimeNegate,
          unsafeLadder(elm, n) {
            let p = c.ZERO;
            let d = elm;
            while (n > _0n) {
              if (n & _1n)
                p = p.add(d);
              d = d.double();
              n >>= _1n;
            }
            return p;
          },
          precomputeWindow(elm, W) {
            const { windows, windowSize } = opts(W);
            const points = [];
            let p = elm;
            let base = p;
            for (let window = 0; window < windows; window++) {
              base = p;
              points.push(base);
              for (let i = 1; i < windowSize; i++) {
                base = base.add(p);
                points.push(base);
              }
              p = base.double();
            }
            return points;
          },
          wNAF(W, precomputes, n) {
            const { windows, windowSize } = opts(W);
            let p = c.ZERO;
            let f = c.BASE;
            const mask = BigInt(2 ** W - 1);
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for (let window = 0; window < windows; window++) {
              const offset = window * windowSize;
              let wbits = Number(n & mask);
              n >>= shiftBy;
              if (wbits > windowSize) {
                wbits -= maxNumber;
                n += _1n;
              }
              const offset1 = offset;
              const offset2 = offset + Math.abs(wbits) - 1;
              const cond1 = window % 2 !== 0;
              const cond2 = wbits < 0;
              if (wbits === 0) {
                f = f.add(constTimeNegate(cond1, precomputes[offset1]));
              } else {
                p = p.add(constTimeNegate(cond2, precomputes[offset2]));
              }
            }
            return { p, f };
          },
          wNAFCached(P, precomputesMap, n, transform) {
            const W = P._WINDOW_SIZE || 1;
            let comp = precomputesMap.get(P);
            if (!comp) {
              comp = this.precomputeWindow(P, W);
              if (W !== 1) {
                precomputesMap.set(P, transform(comp));
              }
            }
            return this.wNAF(W, comp, n);
          }
        };
      }
      function validateBasic(curve) {
        validateField(curve.Fp);
        validateObject(
          curve,
          {
            n: "bigint",
            h: "bigint",
            Gx: "field",
            Gy: "field"
          },
          {
            nBitLength: "isSafeInteger",
            nByteLength: "isSafeInteger"
          }
        );
        return Object.freeze({
          ...nLength(curve.n, curve.nBitLength),
          ...curve,
          ...{ p: curve.Fp.ORDER }
        });
      }
      module.exports = { wNAF, validateBasic };
    }
  });

  // sdk/contracts/nostr/lib/abstract/weierstrass.js
  var require_weierstrass = __commonJS({
    "sdk/contracts/nostr/lib/abstract/weierstrass.js"(exports, module) {
      var mod = require_modular();
      var ut = require_utils3();
      var { ensureBytes } = require_utils3();
      var { wNAF, validateBasic } = require_curve();
      function validatePointOpts(curve) {
        const opts = validateBasic(curve);
        ut.validateObject(
          opts,
          {
            a: "field",
            b: "field"
          },
          {
            allowedPrivateKeyLengths: "array",
            wrapPrivateKey: "boolean",
            isTorsionFree: "function",
            clearCofactor: "function",
            allowInfinityPoint: "boolean",
            fromBytes: "function",
            toBytes: "function"
          }
        );
        const { endo, Fp, a } = opts;
        if (endo) {
          if (!Fp.eql(a, Fp.ZERO)) {
            throw new Error(
              "Endomorphism can only be defined for Koblitz curves that have a=0"
            );
          }
          if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
            throw new Error(
              "Expected endomorphism with beta: bigint and splitScalar: function"
            );
          }
        }
        return Object.freeze({ ...opts });
      }
      var _0n = BigInt(0);
      var _1n = BigInt(1);
      var _2n = BigInt(2);
      var _3n = BigInt(3);
      var _4n = BigInt(4);
      function weierstrassPoints(opts) {
        const CURVE = validatePointOpts(opts);
        const { Fp } = CURVE;
        const toBytes = CURVE.toBytes || ((_c, point, _isCompressed) => {
          const a = point.toAffine();
          return ut.concatBytes(
            Uint8Array.from([4]),
            Fp.toBytes(a.x),
            Fp.toBytes(a.y)
          );
        });
        const fromBytes = CURVE.fromBytes || ((bytes) => {
          const tail = bytes.subarray(1);
          const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
          const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
          return { x, y };
        });
        function weierstrassEquation(x) {
          const { a, b } = CURVE;
          const x2 = Fp.sqr(x);
          const x3 = Fp.mul(x2, x);
          return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
        }
        if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
          throw new Error("bad generator point: equation left != right");
        function isWithinCurveOrder(num) {
          return typeof num === "bigint" && _0n < num && num < CURVE.n;
        }
        function assertGE(num) {
          if (!isWithinCurveOrder(num))
            throw new Error("Expected valid bigint: 0 < bigint < curve.n");
        }
        const pointPrecomputes = /* @__PURE__ */ new Map();
        function assertPrjPoint(other) {
          if (!(other instanceof Point))
            throw new Error("ProjectivePoint expected");
        }
        class Point {
          static BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
          static ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
          constructor(px, py, pz) {
            this.px = px;
            this.py = py;
            this.pz = pz;
            if (px == null || !Fp.isValid(px))
              throw new Error("x required");
            if (py == null || !Fp.isValid(py))
              throw new Error("y required");
            if (pz == null || !Fp.isValid(pz))
              throw new Error("z required");
          }
          static fromAffine(p) {
            const { x, y } = p || {};
            if (!p || !Fp.isValid(x) || !Fp.isValid(y))
              throw new Error("invalid affine point");
            if (p instanceof Point)
              throw new Error("projective point not allowed");
            const is0 = (i) => Fp.eql(i, Fp.ZERO);
            if (is0(x) && is0(y))
              return Point.ZERO;
            return new Point(x, y, Fp.ONE);
          }
          get x() {
            return this.toAffine().x;
          }
          get y() {
            return this.toAffine().y;
          }
          static normalizeZ(points) {
            const toInv = Fp.invertBatch(points.map((p) => p.pz));
            return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
          }
          static fromHex(hex) {
            const P = Point.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
            P.assertValidity();
            return P;
          }
          _setWindowSize(windowSize) {
            this._WINDOW_SIZE = windowSize;
            pointPrecomputes.delete(this);
          }
          assertValidity() {
            if (this.is0()) {
              if (CURVE.allowInfinityPoint && !Fp.is0(this.py))
                return;
              throw new Error("bad point: ZERO");
            }
            const { x, y } = this.toAffine();
            if (!Fp.isValid(x) || !Fp.isValid(y))
              throw new Error("bad point: x or y not FE");
            const left = Fp.sqr(y);
            const right = weierstrassEquation(x);
            if (!Fp.eql(left, right))
              throw new Error("bad point: equation left != right");
            if (!this.isTorsionFree())
              throw new Error("bad point: not in prime-order subgroup");
          }
          hasEvenY() {
            const { y } = this.toAffine();
            if (Fp.isOdd)
              return !Fp.isOdd(y);
            throw new Error("Field doesn't support isOdd");
          }
          equals(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
            const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
            return U1 && U2;
          }
          negate() {
            return new Point(this.px, Fp.neg(this.py), this.pz);
          }
          double() {
            const { a, b } = CURVE;
            const b3 = Fp.mul(b, _3n);
            const { px: X1, py: Y1, pz: Z1 } = this;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
            let t0 = Fp.mul(X1, X1);
            let t1 = Fp.mul(Y1, Y1);
            let t2 = Fp.mul(Z1, Z1);
            let t3 = Fp.mul(X1, Y1);
            t3 = Fp.add(t3, t3);
            Z3 = Fp.mul(X1, Z1);
            Z3 = Fp.add(Z3, Z3);
            X3 = Fp.mul(a, Z3);
            Y3 = Fp.mul(b3, t2);
            Y3 = Fp.add(X3, Y3);
            X3 = Fp.sub(t1, Y3);
            Y3 = Fp.add(t1, Y3);
            Y3 = Fp.mul(X3, Y3);
            X3 = Fp.mul(t3, X3);
            Z3 = Fp.mul(b3, Z3);
            t2 = Fp.mul(a, t2);
            t3 = Fp.sub(t0, t2);
            t3 = Fp.mul(a, t3);
            t3 = Fp.add(t3, Z3);
            Z3 = Fp.add(t0, t0);
            t0 = Fp.add(Z3, t0);
            t0 = Fp.add(t0, t2);
            t0 = Fp.mul(t0, t3);
            Y3 = Fp.add(Y3, t0);
            t2 = Fp.mul(Y1, Z1);
            t2 = Fp.add(t2, t2);
            t0 = Fp.mul(t2, t3);
            X3 = Fp.sub(X3, t0);
            Z3 = Fp.mul(t2, t1);
            Z3 = Fp.add(Z3, Z3);
            Z3 = Fp.add(Z3, Z3);
            return new Point(X3, Y3, Z3);
          }
          add(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
            const a = CURVE.a;
            const b3 = Fp.mul(CURVE.b, _3n);
            let t0 = Fp.mul(X1, X2);
            let t1 = Fp.mul(Y1, Y2);
            let t2 = Fp.mul(Z1, Z2);
            let t3 = Fp.add(X1, Y1);
            let t4 = Fp.add(X2, Y2);
            t3 = Fp.mul(t3, t4);
            t4 = Fp.add(t0, t1);
            t3 = Fp.sub(t3, t4);
            t4 = Fp.add(X1, Z1);
            let t5 = Fp.add(X2, Z2);
            t4 = Fp.mul(t4, t5);
            t5 = Fp.add(t0, t2);
            t4 = Fp.sub(t4, t5);
            t5 = Fp.add(Y1, Z1);
            X3 = Fp.add(Y2, Z2);
            t5 = Fp.mul(t5, X3);
            X3 = Fp.add(t1, t2);
            t5 = Fp.sub(t5, X3);
            Z3 = Fp.mul(a, t4);
            X3 = Fp.mul(b3, t2);
            Z3 = Fp.add(X3, Z3);
            X3 = Fp.sub(t1, Z3);
            Z3 = Fp.add(t1, Z3);
            Y3 = Fp.mul(X3, Z3);
            t1 = Fp.add(t0, t0);
            t1 = Fp.add(t1, t0);
            t2 = Fp.mul(a, t2);
            t4 = Fp.mul(b3, t4);
            t1 = Fp.add(t1, t2);
            t2 = Fp.sub(t0, t2);
            t2 = Fp.mul(a, t2);
            t4 = Fp.add(t4, t2);
            t0 = Fp.mul(t1, t4);
            Y3 = Fp.add(Y3, t0);
            t0 = Fp.mul(t5, t4);
            X3 = Fp.mul(t3, X3);
            X3 = Fp.sub(X3, t0);
            t0 = Fp.mul(t3, t1);
            Z3 = Fp.mul(t5, Z3);
            Z3 = Fp.add(Z3, t0);
            return new Point(X3, Y3, Z3);
          }
          subtract(other) {
            return this.add(other.negate());
          }
          is0() {
            return this.equals(Point.ZERO);
          }
          wNAF(n) {
            return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
              const toInv = Fp.invertBatch(comp.map((p) => p.pz));
              return comp.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
            });
          }
          multiplyUnsafe(n) {
            const I = Point.ZERO;
            if (n === _0n)
              return I;
            assertGE(n);
            if (n === _1n)
              return this;
            const { endo } = CURVE;
            if (!endo)
              return wnaf.unsafeLadder(this, n);
            let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
            let k1p = I;
            let k2p = I;
            let d = this;
            while (k1 > _0n || k2 > _0n) {
              if (k1 & _1n)
                k1p = k1p.add(d);
              if (k2 & _1n)
                k2p = k2p.add(d);
              d = d.double();
              k1 >>= _1n;
              k2 >>= _1n;
            }
            if (k1neg)
              k1p = k1p.negate();
            if (k2neg)
              k2p = k2p.negate();
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            return k1p.add(k2p);
          }
          multiply(scalar) {
            assertGE(scalar);
            let n = scalar;
            let point, fake;
            const { endo } = CURVE;
            if (endo) {
              const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
              let { p: k1p, f: f1p } = this.wNAF(k1);
              let { p: k2p, f: f2p } = this.wNAF(k2);
              k1p = wnaf.constTimeNegate(k1neg, k1p);
              k2p = wnaf.constTimeNegate(k2neg, k2p);
              k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
              point = k1p.add(k2p);
              fake = f1p.add(f2p);
            } else {
              const { p, f } = this.wNAF(n);
              point = p;
              fake = f;
            }
            return Point.normalizeZ([point, fake])[0];
          }
          multiplyAndAddUnsafe(Q, a, b) {
            const G = Point.BASE;
            const mul = (P, a2) => a2 === _0n || a2 === _1n || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
            const sum = mul(this, a).add(mul(Q, b));
            return sum.is0() ? void 0 : sum;
          }
          toAffine(iz) {
            const { px: x, py: y, pz: z } = this;
            const is0 = this.is0();
            if (iz == null)
              iz = is0 ? Fp.ONE : Fp.inv(z);
            const ax = Fp.mul(x, iz);
            const ay = Fp.mul(y, iz);
            const zz = Fp.mul(z, iz);
            if (is0)
              return { x: Fp.ZERO, y: Fp.ZERO };
            if (!Fp.eql(zz, Fp.ONE))
              throw new Error("invZ was invalid");
            return { x: ax, y: ay };
          }
          isTorsionFree() {
            const { h: cofactor, isTorsionFree } = CURVE;
            if (cofactor === _1n)
              return true;
            if (isTorsionFree)
              return isTorsionFree(Point, this);
            throw new Error(
              "isTorsionFree() has not been declared for the elliptic curve"
            );
          }
          clearCofactor() {
            const { h: cofactor, clearCofactor } = CURVE;
            if (cofactor === _1n)
              return this;
            if (clearCofactor)
              return clearCofactor(Point, this);
            return this.multiplyUnsafe(CURVE.h);
          }
          toRawBytes(isCompressed = true) {
            this.assertValidity();
            return toBytes(Point, this, isCompressed);
          }
          toHex(isCompressed = true) {
            return ut.bytesToHex(this.toRawBytes(isCompressed));
          }
        }
        const _bits = CURVE.nBitLength;
        const wnaf = wNAF(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
        return { ProjectivePoint: Point };
      }
      function validateOpts(curve) {
        const opts = validateBasic(curve);
        ut.validateObject(
          opts,
          {
            hash: "hash",
            hmac: "function"
          },
          {
            bits2int: "function",
            bits2int_modN: "function",
            lowS: "boolean"
          }
        );
        return Object.freeze({ lowS: true, ...opts });
      }
      function weierstrass(curveDef) {
        const CURVE = validateOpts(curveDef);
        const { Fp, n: CURVE_ORDER } = CURVE;
        const compressedLen = Fp.BYTES + 1;
        const uncompressedLen = 2 * Fp.BYTES + 1;
        function isValidFieldElement(num) {
          return _0n < num && num < Fp.ORDER;
        }
        function modN(a) {
          return mod.mod(a, CURVE_ORDER);
        }
        function invN(a) {
          return mod.invert(a, CURVE_ORDER);
        }
        const {
          ProjectivePoint: Point,
          weierstrassEquation,
          isWithinCurveOrder
        } = weierstrassPoints({
          ...CURVE,
          toBytes(_c, point, isCompressed) {
            const a = point.toAffine();
            const x = Fp.toBytes(a.x);
            const cat = ut.concatBytes;
            if (isCompressed) {
              return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
            } else {
              return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
            }
          },
          fromBytes(bytes) {
            const len = bytes.length;
            const head = bytes[0];
            const tail = bytes.subarray(1);
            if (len === compressedLen && (head === 2 || head === 3)) {
              const x = ut.bytesToNumberBE(tail);
              if (!isValidFieldElement(x))
                throw new Error("Point is not on curve");
              const y2 = weierstrassEquation(x);
              let y = Fp.sqrt(y2);
              const isYOdd = (y & _1n) === _1n;
              const isHeadOdd = (head & 1) === 1;
              if (isHeadOdd !== isYOdd)
                y = Fp.neg(y);
              return { x, y };
            } else if (len === uncompressedLen && head === 4) {
              const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
              const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
              return { x, y };
            } else {
              throw new Error(
                `Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`
              );
            }
          }
        });
        const numToNByteStr = (num) => ut.bytesToHex(ut.numberToBytesBE(num, CURVE.nByteLength));
        function isBiggerThanHalfOrder(number) {
          const HALF = CURVE_ORDER >> _1n;
          return number > HALF;
        }
        function normalizeS(s) {
          return isBiggerThanHalfOrder(s) ? modN(-s) : s;
        }
        const slcNum = (b, from, to) => ut.bytesToNumberBE(b.slice(from, to));
        const bits2int = CURVE.bits2int || function(bytes) {
          const num = ut.bytesToNumberBE(bytes);
          const delta = bytes.length * 8 - CURVE.nBitLength;
          return delta > 0 ? num >> BigInt(delta) : num;
        };
        const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
          return modN(bits2int(bytes));
        };
        const ORDER_MASK = ut.bitMask(CURVE.nBitLength);
        function int2octets(num) {
          if (typeof num !== "bigint")
            throw new Error("bigint expected");
          if (!(_0n <= num && num < ORDER_MASK))
            throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
          return ut.numberToBytesBE(num, CURVE.nByteLength);
        }
        const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
        const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
        Point.BASE._setWindowSize(8);
        return {
          CURVE,
          ProjectivePoint: Point
        };
      }
      module.exports = { weierstrass };
    }
  });

  // sdk/contracts/nostr/lib/_shortw_utils.js
  var require_shortw_utils = __commonJS({
    "sdk/contracts/nostr/lib/_shortw_utils.js"(exports, module) {
      var { hmac } = require_hmac();
      var { concatBytes } = require_utils2();
      var { weierstrass } = require_weierstrass();
      function getHash(hash) {
        return {
          hash,
          hmac: (key, ...msgs) => hmac(hash, key, concatBytes(...msgs))
        };
      }
      function createCurve(curveDef, defHash) {
        const create = (hash) => {
          return weierstrass({ ...curveDef, ...getHash(hash) });
        };
        return Object.freeze({ ...create(defHash), create });
      }
      module.exports = { createCurve };
    }
  });

  // sdk/contracts/nostr/lib/secp256k1.js
  var require_secp256k1 = __commonJS({
    "sdk/contracts/nostr/lib/secp256k1.js"(exports, module) {
      var { sha256 } = require_sha256();
      var { Field, mod, pow2 } = require_modular();
      var {
        bytesToNumberBE,
        concatBytes,
        ensureBytes,
        numberToBytesBE
      } = require_utils3();
      var { createCurve } = require_shortw_utils();
      var secp256k1P = BigInt(
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
      );
      var secp256k1N = BigInt(
        "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
      );
      var _1n = BigInt(1);
      var _2n = BigInt(2);
      var divNearest = (a, b) => (a + b / _2n) / b;
      function sqrtMod(y) {
        const P = secp256k1P;
        const _3n = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
        const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
        const b2 = y * y * y % P;
        const b3 = b2 * b2 * y % P;
        const b6 = pow2(b3, _3n, P) * b3 % P;
        const b9 = pow2(b6, _3n, P) * b3 % P;
        const b11 = pow2(b9, _2n, P) * b2 % P;
        const b22 = pow2(b11, _11n, P) * b11 % P;
        const b44 = pow2(b22, _22n, P) * b22 % P;
        const b88 = pow2(b44, _44n, P) * b44 % P;
        const b176 = pow2(b88, _88n, P) * b88 % P;
        const b220 = pow2(b176, _44n, P) * b44 % P;
        const b223 = pow2(b220, _3n, P) * b3 % P;
        const t1 = pow2(b223, _23n, P) * b22 % P;
        const t2 = pow2(t1, _6n, P) * b2 % P;
        const root = pow2(t2, _2n, P);
        if (!Fp.eql(Fp.sqr(root), y))
          throw new Error("Cannot find square root");
        return root;
      }
      var Fp = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
      var secp256k1 = createCurve(
        {
          a: BigInt(0),
          b: BigInt(7),
          Fp,
          n: secp256k1N,
          Gx: BigInt(
            "55066263022277343669578718895168534326250603453777594175500187360389116729240"
          ),
          Gy: BigInt(
            "32670510020758816978083085130507043184471273380659243275938904335757337482424"
          ),
          h: BigInt(1),
          lowS: true,
          endo: {
            beta: BigInt(
              "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
            ),
            splitScalar: (k) => {
              const n = secp256k1N;
              const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
              const b1 = -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
              const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
              const b2 = a1;
              const POW_2_128 = BigInt("0x100000000000000000000000000000000");
              const c1 = divNearest(b2 * k, n);
              const c2 = divNearest(-b1 * k, n);
              let k1 = mod(k - c1 * a1 - c2 * a2, n);
              let k2 = mod(-c1 * b1 - c2 * b2, n);
              const k1neg = k1 > POW_2_128;
              const k2neg = k2 > POW_2_128;
              if (k1neg)
                k1 = n - k1;
              if (k2neg)
                k2 = n - k2;
              if (k1 > POW_2_128 || k2 > POW_2_128) {
                throw new Error("splitScalar: Endomorphism failed, k=" + k);
              }
              return { k1neg, k1, k2neg, k2 };
            }
          }
        },
        sha256
      );
      var _0n = BigInt(0);
      var fe = (x) => typeof x === "bigint" && _0n < x && x < secp256k1P;
      var ge = (x) => typeof x === "bigint" && _0n < x && x < secp256k1N;
      var TAGGED_HASH_PREFIXES = {};
      function taggedHash(tag, ...messages) {
        let tagP = TAGGED_HASH_PREFIXES[tag];
        if (tagP === void 0) {
          const tagH = sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
          tagP = concatBytes(tagH, tagH);
          TAGGED_HASH_PREFIXES[tag] = tagP;
        }
        return sha256(concatBytes(tagP, ...messages));
      }
      var pointToBytes = (point) => point.toRawBytes(true).slice(1);
      var numTo32b = (n) => numberToBytesBE(n, 32);
      var modP = (x) => mod(x, secp256k1P);
      var modN = (x) => mod(x, secp256k1N);
      var Point = secp256k1.ProjectivePoint;
      var GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
      function lift_x(x) {
        if (!fe(x))
          throw new Error("bad x: need 0 < x < p");
        const xx = modP(x * x);
        const c = modP(xx * x + BigInt(7));
        let y = sqrtMod(c);
        if (y % _2n !== _0n)
          y = modP(-y);
        const p = new Point(x, y, _1n);
        p.assertValidity();
        return p;
      }
      function challenge(...args) {
        return modN(bytesToNumberBE(taggedHash("BIP0340/challenge", ...args)));
      }
      function schnorrVerify(signature, message, publicKey) {
        const sig = ensureBytes("signature", signature, 64);
        const m = ensureBytes("message", message);
        const pub = ensureBytes("publicKey", publicKey, 32);
        try {
          const P = lift_x(bytesToNumberBE(pub));
          const r = bytesToNumberBE(sig.subarray(0, 32));
          if (!fe(r))
            return false;
          const s = bytesToNumberBE(sig.subarray(32, 64));
          if (!ge(s))
            return false;
          const e = challenge(numTo32b(r), pointToBytes(P), m);
          const R = GmulAdd(P, s, modN(-e));
          if (!R || !R.hasEvenY() || R.toAffine().x !== r)
            return false;
          return true;
        } catch (error) {
          return false;
        }
      }
      var schnorr = (() => ({ verify: schnorrVerify }))();
      module.exports = { schnorr };
    }
  });

  // sdk/contracts/nostr/lib/nostr-tools.js
  var require_nostr_tools = __commonJS({
    "sdk/contracts/nostr/lib/nostr-tools.js"(exports, module) {
      var { schnorr } = require_secp256k1();
      var { sha256 } = require_sha256();
      var isRecord = (obj) => obj instanceof Object;
      function validateEvent(event) {
        if (!isRecord(event))
          return false;
        if (typeof event.kind !== "number")
          return false;
        if (typeof event.content !== "string")
          return false;
        if (typeof event.created_at !== "number")
          return false;
        if (typeof event.pubkey !== "string")
          return false;
        if (!event.pubkey.match(/^[a-f0-9]{64}$/))
          return false;
        if (!Array.isArray(event.tags))
          return false;
        for (let i = 0; i < event.tags.length; i++) {
          let tag = event.tags[i];
          if (!Array.isArray(tag))
            return false;
          for (let j = 0; j < tag.length; j++) {
            if (typeof tag[j] === "object")
              return false;
          }
        }
        return true;
      }
      var verifiedSymbol = Symbol("verified");
      var utf8Encoder = new TextEncoder();
      function serializeEvent(evt) {
        if (!validateEvent(evt))
          err("can't serialize event with wrong or missing properties");
        return JSON.stringify([
          0,
          evt.pubkey,
          evt.created_at,
          evt.kind,
          evt.tags,
          evt.content
        ]);
      }
      var u8a = (a) => a instanceof Uint8Array;
      var hexes = Array.from(
        { length: 256 },
        (_2, i) => i.toString(16).padStart(2, "0")
      );
      function bytesToHex(bytes) {
        if (!u8a(bytes))
          throw new Error("Uint8Array expected");
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      function getEventHash(event) {
        let eventHash = sha256(utf8Encoder.encode(serializeEvent(event)));
        return bytesToHex(eventHash);
      }
      function verifySignature(event) {
        if (typeof event[verifiedSymbol] === "boolean")
          return event[verifiedSymbol];
        const hash = getEventHash(event);
        if (hash !== event.id) {
          return event[verifiedSymbol] = false;
        }
        try {
          return event[verifiedSymbol] = schnorr.verify(
            event.sig,
            hash,
            event.pubkey
          );
        } catch (err2) {
          return event[verifiedSymbol] = false;
        }
      }
      module.exports = { verifySignature, validateEvent };
    }
  });

  // sdk/contracts/nostr/actions/read/verify.js
  var require_verify = __commonJS({
    "sdk/contracts/nostr/actions/read/verify.js"(exports, module) {
      var { verifySignature, validateEvent } = require_nostr_tools();
      var verify = async (state, action) => {
        const { event } = action.input;
        return { result: { isValid: validateEvent(event) && verifySignature(event) } };
      };
      module.exports = verify;
    }
  });

  // sdk/contracts/nostr/contract.js
  var require_contract = __commonJS({
    "sdk/contracts/nostr/contract.js"(exports, module) {
      var { err: err2 } = require_utils();
      var verify = require_verify();
      async function handle2(state, action, _SmartWeave) {
        if (typeof SmartWeave !== "undefined")
          _SmartWeave = SmartWeave;
        switch (action.input.function) {
          case "verify":
            return await verify(state, action);
          default:
            err2(
              `No function supplied or function not recognised: "${action.input.function}"`
            );
        }
        return { state };
      }
      module.exports = { handle: handle2 };
    }
  });

  // contracts/nostr/nostr.js
  var import_contract = __toESM(require_contract());
  async function handle(state, action) {
    return await (0, import_contract.handle)(state, action);
  }

/*! https://mths.be/punycode v1.3.2 by @mathias */
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
