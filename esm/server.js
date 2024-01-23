import fs from 'fs';
import path from 'path';
import axios from 'axios';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var messagesPath = "/messages";
var isDev = process.env.NODE_ENV === 'development';
var TranslateRoute = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, namespace, tKey, message, locales, defaultLocale, _req$body$gptModel, gptModel, _req$body$debug, debug, runTranslate;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, namespace = _req$body.namespace, tKey = _req$body.tKey, message = _req$body.message, locales = _req$body.locales, defaultLocale = _req$body.defaultLocale, _req$body$gptModel = _req$body.gptModel, gptModel = _req$body$gptModel === void 0 ? 'gpt-3.5-turbo' : _req$body$gptModel, _req$body$debug = _req$body.debug, debug = _req$body$debug === void 0 ? false : _req$body$debug;
          if (isDev) {
            _context.next = 4;
            break;
          }
          res.status(403).json({
            error: "Forbidden"
          });
          return _context.abrupt("return");
        case 4:
          if (!(!namespace || !tKey || !message || !locales || !defaultLocale)) {
            _context.next = 7;
            break;
          }
          res.status(400).json({
            error: "Missing required parameter(s)"
          });
          return _context.abrupt("return");
        case 7:
          _context.prev = 7;
          if (!(req.query.action == "check")) {
            _context.next = 15;
            break;
          }
          _context.next = 11;
          return needsTranslations(namespace, tKey, message, locales, defaultLocale, debug);
        case 11:
          runTranslate = _context.sent;
          res.json({
            run_translate: runTranslate
          });
          _context.next = 24;
          break;
        case 15:
          if (!(req.query.action == "run")) {
            _context.next = 23;
            break;
          }
          _context.next = 18;
          return runTranslations(namespace, tKey, message, locales, defaultLocale, gptModel);
        case 18:
          _context.next = 20;
          return runAllTranslations(locales, defaultLocale, gptModel);
        case 20:
          res.json({
            success: true
          });
          _context.next = 24;
          break;
        case 23:
          res.status(400).json({
            error: "Invalid action"
          });
        case 24:
          _context.next = 29;
          break;
        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](7);
          res.status(500).json({
            error: _context.t0
          });
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 26]]);
  }));
  return function TranslateRoute(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
function needsTranslations(_x3, _x4, _x5, _x6, _x7, _x8) {
  return _needsTranslations.apply(this, arguments);
}
function _needsTranslations() {
  _needsTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(namespace, tKey, message, locales, defaultLocale, debug) {
    var defaultLocaleTranslations, defaultMessage, _iterator, _step, locale, translations;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return loadTranslations(defaultLocale);
        case 2:
          defaultLocaleTranslations = _context2.sent;
          if (isDev && debug) {
            console.log("[TranslateRoute] Checking translations for:", namespace, tKey, message, locales, defaultLocale);
          }

          // Check if namespace exists
          if (defaultLocaleTranslations[namespace]) {
            _context2.next = 7;
            break;
          }
          if (isDev && debug) {
            console.log("[TranslateRoute] Namespace not found for ".concat(defaultLocale, ":"), namespace);
          }
          return _context2.abrupt("return", true);
        case 7:
          // Check if default message is changed or not found
          defaultMessage = defaultLocaleTranslations[namespace][tKey];
          if (!(!defaultMessage || defaultMessage != message)) {
            _context2.next = 11;
            break;
          }
          if (isDev && debug) {
            console.log("[TranslateRoute] Message not found for ".concat(defaultLocale, ", Namespace: ").concat(namespace, ", Key: ").concat(tKey));
          }
          return _context2.abrupt("return", true);
        case 11:
          // Check if any locale is missing the translation
          _iterator = _createForOfIteratorHelper(locales);
          _context2.prev = 12;
          _iterator.s();
        case 14:
          if ((_step = _iterator.n()).done) {
            _context2.next = 25;
            break;
          }
          locale = _step.value;
          if (!(locale != defaultLocale)) {
            _context2.next = 23;
            break;
          }
          _context2.next = 19;
          return loadTranslations(locale);
        case 19:
          translations = _context2.sent;
          if (!(!translations[namespace] || !translations[namespace][tKey])) {
            _context2.next = 23;
            break;
          }
          if (isDev && debug) {
            console.log("[TranslateRoute] Translation not found for ".concat(locale, ", Namespace: ").concat(namespace, ", Key: ").concat(tKey));
          }
          return _context2.abrupt("return", true);
        case 23:
          _context2.next = 14;
          break;
        case 25:
          _context2.next = 30;
          break;
        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](12);
          _iterator.e(_context2.t0);
        case 30:
          _context2.prev = 30;
          _iterator.f();
          return _context2.finish(30);
        case 33:
          return _context2.abrupt("return", false);
        case 34:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[12, 27, 30, 33]]);
  }));
  return _needsTranslations.apply(this, arguments);
}
function runAllTranslations(_x9, _x10, _x11) {
  return _runAllTranslations.apply(this, arguments);
}
function _runAllTranslations() {
  _runAllTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(locales, defaultLocale, gptModel) {
    var defaultTranslations, namespace, tKey, message;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return loadTranslations(defaultLocale);
        case 2:
          defaultTranslations = _context3.sent;
          _context3.t0 = _regeneratorRuntime().keys(defaultTranslations);
        case 4:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 16;
            break;
          }
          namespace = _context3.t1.value;
          _context3.t2 = _regeneratorRuntime().keys(defaultTranslations[namespace]);
        case 7:
          if ((_context3.t3 = _context3.t2()).done) {
            _context3.next = 14;
            break;
          }
          tKey = _context3.t3.value;
          message = defaultTranslations[namespace][tKey];
          _context3.next = 12;
          return runTranslations(namespace, tKey, message, locales, defaultLocale, gptModel);
        case 12:
          _context3.next = 7;
          break;
        case 14:
          _context3.next = 4;
          break;
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _runAllTranslations.apply(this, arguments);
}
function runTranslations(_x12, _x13, _x14, _x15, _x16, _x17, _x18) {
  return _runTranslations.apply(this, arguments);
}
function _runTranslations() {
  _runTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(namespace, tKey, message, locales, defaultLocale, gptModel, debug) {
    var defaultTranslations, messageChanged, _iterator2, _step2, locale, translations, _iterator3, _step3, _locale, _translations, translation, newTranslations;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return loadTranslations(defaultLocale);
        case 2:
          defaultTranslations = _context4.sent;
          messageChanged = false;
          if (!defaultTranslations[namespace] || defaultTranslations[namespace][tKey] != message) {
            messageChanged = true;
          }

          // Set the default message & delete the message from all other locales
          _iterator2 = _createForOfIteratorHelper(locales);
          _context4.prev = 6;
          _iterator2.s();
        case 8:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 19;
            break;
          }
          locale = _step2.value;
          _context4.next = 12;
          return loadTranslations(locale);
        case 12:
          translations = _context4.sent;
          if (!translations[namespace]) {
            if (isDev && debug) {
              console.log("[TranslateRoute] Creating namespace ".concat(namespace, " for ").concat(locale, ":"));
            }
            translations[namespace] = {};
          }
          if (locale == defaultLocale) {
            if (isDev && debug) {
              console.log("[TranslateRoute] Setting default message for ".concat(locale, ": ").concat(namespace, ".").concat(tKey, ":"), message);
            }
            translations[namespace][tKey] = message;
          } else {
            if (isDev && debug) {
              console.log("[TranslateRoute] Deleting translation for ".concat(locale, ": ").concat(namespace, ".").concat(tKey));
            }
            if (messageChanged) {
              delete translations[namespace][tKey];
            }
          }
          _context4.next = 17;
          return saveTranslations(locale, translations);
        case 17:
          _context4.next = 8;
          break;
        case 19:
          _context4.next = 24;
          break;
        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](6);
          _iterator2.e(_context4.t0);
        case 24:
          _context4.prev = 24;
          _iterator2.f();
          return _context4.finish(24);
        case 27:
          // Translate the message to all other locales
          _iterator3 = _createForOfIteratorHelper(locales);
          _context4.prev = 28;
          _iterator3.s();
        case 30:
          if ((_step3 = _iterator3.n()).done) {
            _context4.next = 51;
            break;
          }
          _locale = _step3.value;
          if (!(_locale == defaultLocale)) {
            _context4.next = 34;
            break;
          }
          return _context4.abrupt("continue", 49);
        case 34:
          _context4.next = 36;
          return loadTranslations(_locale);
        case 36:
          _translations = _context4.sent;
          if (!(_translations[namespace] && _translations[namespace][tKey])) {
            _context4.next = 39;
            break;
          }
          return _context4.abrupt("continue", 49);
        case 39:
          _context4.next = 41;
          return translateMessage(message, defaultLocale, _locale, gptModel);
        case 41:
          translation = _context4.sent;
          _context4.next = 44;
          return loadTranslations(_locale);
        case 44:
          newTranslations = _context4.sent;
          if (isDev) {
            console.log("[TranslateRoute] Setting translation for ".concat(_locale, ": ").concat(namespace, ".").concat(tKey, ":"), translation);
          }
          newTranslations[namespace][tKey] = translation;
          _context4.next = 49;
          return saveTranslations(_locale, newTranslations);
        case 49:
          _context4.next = 30;
          break;
        case 51:
          _context4.next = 56;
          break;
        case 53:
          _context4.prev = 53;
          _context4.t1 = _context4["catch"](28);
          _iterator3.e(_context4.t1);
        case 56:
          _context4.prev = 56;
          _iterator3.f();
          return _context4.finish(56);
        case 59:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[6, 21, 24, 27], [28, 53, 56, 59]]);
  }));
  return _runTranslations.apply(this, arguments);
}
function loadTranslations(_x19) {
  return _loadTranslations.apply(this, arguments);
}
function _loadTranslations() {
  _loadTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(locale) {
    var jsonPath;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          jsonPath = path.join(process.cwd(), messagesPath, "".concat(locale, ".json"));
          if (!fs.existsSync(jsonPath)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", JSON.parse(fs.readFileSync(jsonPath, 'utf8')));
        case 6:
          if (isDev) {
            console.log("[TranslateRoute] File not found:", jsonPath);
          }
        case 7:
          return _context5.abrupt("return", {});
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error("[TranslateRoute] Error loading translations:", _context5.t0);
          return _context5.abrupt("return", {});
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return _loadTranslations.apply(this, arguments);
}
function saveTranslations(_x20, _x21) {
  return _saveTranslations.apply(this, arguments);
}
function _saveTranslations() {
  _saveTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(locale, translations) {
    var jsonPath;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          jsonPath = path.join(process.cwd(), messagesPath, "".concat(locale, ".json"));
          fs.writeFileSync(jsonPath, JSON.stringify(translations, null, 2), 'utf8');
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _saveTranslations.apply(this, arguments);
}
function translateMessage(_x22, _x23, _x24, _x25) {
  return _translateMessage.apply(this, arguments);
}
function _translateMessage() {
  _translateMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(message, fromLocale, toLocale, model) {
    var response;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return gptTranslate(message, model, fromLocale, toLocale);
        case 2:
          response = _context7.sent;
          return _context7.abrupt("return", response.translation);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _translateMessage.apply(this, arguments);
}
function gptTranslate(_x26, _x27, _x28, _x29) {
  return _gptTranslate.apply(this, arguments);
}
function _gptTranslate() {
  _gptTranslate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(message, model, fromLocale, toLocale) {
    var systemMessage, userMessage, messages, response, translatedText;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          // System message to instruct the model for translation
          systemMessage = {
            role: 'system',
            content: "Translate the user's text from ".concat(fromLocale, " to ").concat(toLocale, ". Only respond with the exact translation of the user's input.")
          }; // User message with the text to translate
          userMessage = {
            role: 'user',
            content: message
          }; // Combining system and user messages
          messages = [systemMessage, userMessage];
          _context8.prev = 3;
          _context8.next = 6;
          return axios.post('https://api.openai.com/v1/chat/completions', {
            model: model,
            messages: messages
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(process.env.OPENAI_API_KEY)
            }
          });
        case 6:
          response = _context8.sent;
          // Logging for development environment
          if (isDev) {
            console.log("[TranslateRoute] GPT Response with Axios:\n", JSON.stringify(response.data, null, 2));
          }

          // Extracting the translation from the response
          translatedText = response.data.choices[0].message.content; // Returning the translation
          return _context8.abrupt("return", {
            "translation": translatedText
          });
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](3);
          console.error("Error in Axios request:", _context8.t0);
          throw _context8.t0;
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 12]]);
  }));
  return _gptTranslate.apply(this, arguments);
}

export { TranslateRoute };
