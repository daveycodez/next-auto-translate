import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from 'openai-edge';
import config from 'next.config';

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

var openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
var openai = new OpenAIApi(openaiConfig);
var basePath = "/public/locales/";
var defaultLocale = "en";
var locales = config.i18n.locales;
var TranslateRoute = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, namespace, keyPrefix, tKey, text, runTranslate;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, namespace = _req$body.namespace, keyPrefix = _req$body.keyPrefix, tKey = _req$body.tKey, text = _req$body.text;
          _context.prev = 1;
          if (!(req.query.action == "check")) {
            _context.next = 9;
            break;
          }
          _context.next = 5;
          return needsTranslations(namespace, keyPrefix, tKey, text);
        case 5:
          runTranslate = _context.sent;
          res.json({
            run_translate: runTranslate
          });
          _context.next = 16;
          break;
        case 9:
          if (!(req.query.action == "run")) {
            _context.next = 15;
            break;
          }
          _context.next = 12;
          return runTranslations(namespace, keyPrefix, tKey, text);
        case 12:
          res.json({
            success: true
          });
          _context.next = 16;
          break;
        case 15:
          res.status(400).json({
            error: "Invalid action"
          });
        case 16:
          _context.next = 21;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 18]]);
  }));
  return function TranslateRoute(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce(function (current, key) {
    return current ? current[key] : undefined;
  }, obj);
}
function needsTranslations(_x3, _x4, _x5, _x6) {
  return _needsTranslations.apply(this, arguments);
} // Mock translation function (replace this with your actual translation service)
function _needsTranslations() {
  _needsTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(namespace, keyPrefix, tKey, text) {
    var defaultLocaleTranslations, fullKey, defaultValue, _iterator, _step, locale, translations, value;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return loadJSONFile(namespace);
        case 2:
          defaultLocaleTranslations = _context2.sent;
          if (defaultLocaleTranslations) {
            _context2.next = 6;
            break;
          }
          console.log('Translations JSON not found:', namespace);
          return _context2.abrupt("return", true);
        case 6:
          // Construct the full translation key
          fullKey = keyPrefix ? "".concat(keyPrefix, ".").concat(tKey) : tKey; // Check if the key exists in the default locale
          defaultValue = getNestedValue(defaultLocaleTranslations, fullKey);
          if (!(defaultValue === undefined)) {
            _context2.next = 11;
            break;
          }
          console.log('Translations key not found:', fullKey);
          return _context2.abrupt("return", true);
        case 11:
          if (!(defaultValue != text)) {
            _context2.next = 14;
            break;
          }
          console.log('Translations key has different value:', fullKey);
          return _context2.abrupt("return", true);
        case 14:
          // Check other locales
          _iterator = _createForOfIteratorHelper(locales);
          _context2.prev = 15;
          _iterator.s();
        case 17:
          if ((_step = _iterator.n()).done) {
            _context2.next = 32;
            break;
          }
          locale = _step.value;
          if (!(locale !== defaultLocale)) {
            _context2.next = 30;
            break;
          }
          _context2.next = 22;
          return loadJSONFile(namespace, locale);
        case 22:
          translations = _context2.sent;
          if (translations) {
            _context2.next = 26;
            break;
          }
          console.log('Translations JSON not found:', namespace, locale);
          return _context2.abrupt("return", true);
        case 26:
          // Check if the key exists and has content in each locale
          value = getNestedValue(translations, fullKey);
          if (!(value === undefined || value === '')) {
            _context2.next = 30;
            break;
          }
          console.log('Translations key not found or empty:', fullKey, locale);
          return _context2.abrupt("return", true);
        case 30:
          _context2.next = 17;
          break;
        case 32:
          _context2.next = 37;
          break;
        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](15);
          _iterator.e(_context2.t0);
        case 37:
          _context2.prev = 37;
          _iterator.f();
          return _context2.finish(37);
        case 40:
          return _context2.abrupt("return", false);
        case 41:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[15, 34, 37, 40]]);
  }));
  return _needsTranslations.apply(this, arguments);
}
function translateText(_x7, _x8, _x9) {
  return _translateText.apply(this, arguments);
}
function _translateText() {
  _translateText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(text, fromLocale, toLocale) {
    var response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return chatGptTranslate(text, fromLocale, toLocale);
        case 2:
          response = _context3.sent;
          return _context3.abrupt("return", response.translation);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _translateText.apply(this, arguments);
}
function runTranslations(_x10, _x11, _x12, _x13) {
  return _runTranslations.apply(this, arguments);
} // Helper function to set a nested value in an object based on a key path
function _runTranslations() {
  _runTranslations = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(namespace, keyPrefix, tKey, text) {
    var defaultLocaleTranslations, fullKey, _iterator2, _step2, locale, translatedText, localeTranslations;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return loadJSONFile(namespace, defaultLocale, true);
        case 2:
          defaultLocaleTranslations = _context4.sent;
          // Construct the full translation key
          fullKey = keyPrefix ? "".concat(keyPrefix, ".").concat(tKey) : tKey; // Set the key to the provided text in the default locale
          setNestedValue(defaultLocaleTranslations, fullKey, text);

          // Save the updated default locale translations back to the JSON file
          _context4.next = 7;
          return saveJSONFile(namespace, defaultLocale, defaultLocaleTranslations);
        case 7:
          // Iterate over all locales and translate the text
          _iterator2 = _createForOfIteratorHelper(locales);
          _context4.prev = 8;
          _iterator2.s();
        case 10:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 24;
            break;
          }
          locale = _step2.value;
          if (!(locale !== defaultLocale)) {
            _context4.next = 22;
            break;
          }
          _context4.next = 15;
          return translateText(text, defaultLocale, locale);
        case 15:
          translatedText = _context4.sent;
          _context4.next = 18;
          return loadJSONFile(namespace, locale, true);
        case 18:
          localeTranslations = _context4.sent;
          // Set the translated text in the JSON object
          setNestedValue(localeTranslations, fullKey, translatedText);

          // Save the updated translations back to the JSON file
          _context4.next = 22;
          return saveJSONFile(namespace, locale, localeTranslations);
        case 22:
          _context4.next = 10;
          break;
        case 24:
          _context4.next = 29;
          break;
        case 26:
          _context4.prev = 26;
          _context4.t0 = _context4["catch"](8);
          _iterator2.e(_context4.t0);
        case 29:
          _context4.prev = 29;
          _iterator2.f();
          return _context4.finish(29);
        case 32:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[8, 26, 29, 32]]);
  }));
  return _runTranslations.apply(this, arguments);
}
function setNestedValue(obj, keyPath, value) {
  var keys = keyPath.split('.');
  var current = obj;
  for (var i = 0; i < keys.length - 1; i++) {
    var key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

// Helper function to save a JSON object to a file
function saveJSONFile(_x14, _x15, _x16) {
  return _saveJSONFile.apply(this, arguments);
}
function _saveJSONFile() {
  _saveJSONFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(namespace, locale, data) {
    var jsonPath;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          jsonPath = path.join(process.cwd(), basePath, locale, "".concat(namespace, ".json"));
          _context5.prev = 1;
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
          _context5.next = 9;
          break;
        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](1);
          console.error('Error saving translations JSON:', jsonPath, _context5.t0);
          throw _context5.t0;
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 5]]);
  }));
  return _saveJSONFile.apply(this, arguments);
}
function loadJSONFile(namespace) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultLocale;
  var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var jsonPath = path.join(process.cwd(), basePath, locale, "".concat(namespace, ".json"));
  try {
    console.debug('Load Translations JSON:', jsonPath);

    // Check if the file exists. If it does, parse and return its content.
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } else if (create) {
      // If the file does not exist and create is true, create an empty JSON file.
      var dirPath = path.dirname(jsonPath);
      console.debug("Check if dirPath exists", dirPath);
      if (!fs.existsSync(dirPath)) {
        console.debug('Translations directory not found:', dirPath);
        // Create the directory path if it doesn't exist.
        fs.mkdirSync(dirPath, {
          recursive: true
        });
      }
      fs.writeFileSync(jsonPath, '{}', 'utf8');
      return {};
    }
    console.debug('Translations JSON not found:', jsonPath);
    return null;
  } catch (error) {
    console.error('Error loading translations JSON:', jsonPath, error);
    return null;
  }
}
function chatGptTranslate(_x17, _x18, _x19) {
  return _chatGptTranslate.apply(this, arguments);
}
function _chatGptTranslate() {
  _chatGptTranslate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(text, fromLocale, toLocale) {
    var systemMessage, userMessage, messages, response, data, translatedText;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          // System message to instruct the model for translation
          systemMessage = {
            role: 'system',
            content: "\n        Translate the user's text from ".concat(fromLocale, " to ").concat(toLocale, ".\n        Only respond with the exact translation of the user's input.\n        ")
          }; // User message with the text to be translated
          userMessage = {
            role: 'user',
            content: text
          }; // Messages array combining the system and user messages
          messages = [systemMessage, userMessage]; // Ask OpenAI for a streaming chat completion given the prompt
          _context6.next = 5;
          return openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages
          });
        case 5:
          response = _context6.sent;
          _context6.next = 8;
          return response.json();
        case 8:
          data = _context6.sent;
          console.log(JSON.stringify(data));

          // Extracting the translation from the response
          translatedText = data.choices[0].message.content;
          console.log("Translated text:", translatedText);

          // Returning the translation in the desired JSON format
          return _context6.abrupt("return", {
            "translation": translatedText
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _chatGptTranslate.apply(this, arguments);
}

export { TranslateRoute };
