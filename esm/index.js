import React, { createContext, useState, useEffect, useContext } from 'react';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
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
      if (o === f) throw Error("Generator is already running");
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
            if (!u) throw Error("try statement without catch or finally");
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
      throw Error("illegal catch attempt");
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
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var AutoTranslateContext = /*#__PURE__*/createContext();
var isDev$1 = process.env.NODE_ENV === 'development';
var AutoTranslateProvider = function AutoTranslateProvider(_ref) {
  var children = _ref.children,
    pathname = _ref.pathname,
    _ref$defaultLocale = _ref.defaultLocale,
    defaultLocale = _ref$defaultLocale === void 0 ? "en" : _ref$defaultLocale,
    _ref$gptModel = _ref.gptModel,
    gptModel = _ref$gptModel === void 0 ? "gpt-3.5-turbo" : _ref$gptModel,
    locales = _ref.locales,
    locale = _ref.locale,
    debug = _ref.debug,
    messages = _ref.messages,
    disabled = _ref.disabled;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    checkQueue = _useState2[0],
    setCheckQueue = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    translationQueue = _useState4[0],
    setTranslationQueue = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isProcessing = _useState6[0],
    setIsProcessing = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isChecking = _useState8[0],
    setIsChecking = _useState8[1];
  var addToTranslationQueue = function addToTranslationQueue(translationTask) {
    if (debug && isDev$1) console.log("[AutoTranslate] Adding to Translation queue:", translationTask.tKey);

    // Set the new queue with the existing item removed and the new item added
    setTranslationQueue(function (prevQueue) {
      return [].concat(_toConsumableArray(prevQueue.filter(function (t) {
        return t.tKey !== translationTask.tKey || t.namespace !== translationTask.namespace;
      })), [translationTask]);
    });
  };
  var addToCheckQueue = function addToCheckQueue(checkTask) {
    if (debug && isDev$1) console.log("[AutoTranslate] Adding to Check queue:", checkTask.tKey);

    // Set the new queue with the existing item removed and the new item added
    setCheckQueue(function (prevQueue) {
      return [].concat(_toConsumableArray(prevQueue.filter(function (t) {
        return t.tKey !== checkTask.tKey || t.namespace !== checkTask.namespace;
      })), [checkTask]);
    });
  };
  var processQueue = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var currentTask;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(isProcessing || translationQueue.length === 0)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            if (debug && isDev$1) {
              console.log("[AutoTranslate] GPT Model: ", gptModel);
              console.log("[AutoTranslate] Default Locale: ", defaultLocale);
              console.log("[AutoTranslate] Current Locale: ", locale);
            }
            if (isDev$1) {
              console.log("[AutoTranslate] Start translation for: ", translationQueue[0].tKey);
            }
            setIsProcessing(true);
            currentTask = translationQueue[0];
            _context.prev = 6;
            _context.next = 9;
            return runTranslations(currentTask);
          case 9:
            setTranslationQueue(function (prevQueue) {
              return prevQueue.filter(function (t) {
                return t.tKey !== currentTask.tKey || t.message !== currentTask.message;
              });
            });
            _context.next = 15;
            break;
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](6);
            console.error('Translation Error:', _context.t0);
          case 15:
            _context.prev = 15;
            setIsProcessing(false);
            return _context.finish(15);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[6, 12, 15, 18]]);
    }));
    return function processQueue() {
      return _ref2.apply(this, arguments);
    };
  }();
  var processCheckQueue = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var currentTask;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(isChecking || checkQueue.length === 0)) {
              _context2.next = 2;
              break;
            }
            return _context2.abrupt("return");
          case 2:
            setIsChecking(true);
            currentTask = checkQueue[0];
            _context2.prev = 4;
            _context2.next = 7;
            return checkTranslations(currentTask);
          case 7:
            setCheckQueue(function (prevQueue) {
              return prevQueue.filter(function (t) {
                return t.tKey !== currentTask.tKey || t.message !== currentTask.message;
              });
            });
            _context2.next = 13;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](4);
            console.error('Checking Error:', _context2.t0);
          case 13:
            _context2.prev = 13;
            setIsChecking(false);
            return _context2.finish(13);
          case 16:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4, 10, 13, 16]]);
    }));
    return function processCheckQueue() {
      return _ref3.apply(this, arguments);
    };
  }();
  useEffect(function () {
    processQueue();
  }, [translationQueue, isProcessing]);
  useEffect(function () {
    processCheckQueue();
  }, [checkQueue, isChecking]);
  var runTranslations = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref4) {
      var namespace, tKey, message, response, data;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            namespace = _ref4.namespace, tKey = _ref4.tKey, message = _ref4.message;
            _context3.next = 3;
            return fetch("/api/translate/runTranslations", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                namespace: namespace,
                tKey: tKey,
                message: message,
                locales: locales,
                defaultLocale: defaultLocale,
                gptModel: gptModel,
                debug: debug
              })
            });
          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.json();
          case 6:
            data = _context3.sent;
            if (!data.success) {
              _context3.next = 10;
              break;
            }
            _context3.next = 11;
            break;
          case 10:
            throw new Error(data.error || 'Translation failed');
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function runTranslations(_x) {
      return _ref5.apply(this, arguments);
    };
  }();
  var checkTranslations = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref6) {
      var tKey, message, namespace, response, data;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            tKey = _ref6.tKey, message = _ref6.message, namespace = _ref6.namespace;
            if (isDev$1 && debug) {
              console.log("[AutoTranslate] Namespace: ", namespace);
            }
            _context4.prev = 2;
            _context4.next = 5;
            return fetch("/api/translate/checkTranslation", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                namespace: namespace,
                tKey: tKey,
                message: message,
                locales: locales,
                defaultLocale: defaultLocale,
                debug: debug
              })
            });
          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();
          case 8:
            data = _context4.sent;
            if (data.run_translate) {
              addToTranslationQueue({
                namespace: namespace,
                tKey: tKey,
                message: message
              });
            } else {
              if (isDev$1 && debug) {
                console.log("[AutoTranslate] ".concat(namespace, ".").concat(tKey, " Translations already exist! \uD83D\uDE0E"));
              }
            }
            _context4.next = 16;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](2);
            console.log("[AutoTranslate] Error checking translations: ", _context4.t0);
            console.error(_context4.t0);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[2, 12]]);
    }));
    return function checkTranslations(_x2) {
      return _ref7.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement(AutoTranslateContext.Provider, {
    value: _defineProperty(_defineProperty(_defineProperty({
      pathname: pathname,
      defaultLocale: defaultLocale,
      debug: debug,
      locales: locales,
      addToTranslationQueue: addToTranslationQueue,
      addToCheckQueue: addToCheckQueue
    }, "debug", debug), "messages", messages), "disabled", disabled)
  }, children, isProcessing && translatingElement);
};
var translatingElement = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, "\n                @keyframes ellipsis {\n                    0% { content: ''; }\n                    25% { content: '.'; }\n                    50% { content: '..'; }\n                    75% { content: '...'; }\n                    100% { content: '...'; }\n                }\n\n                .ellipsis::after {\n                    content: '';\n                    animation: ellipsis 2.0s infinite;\n                }\n\n                .auto-translate-toast {\n                    position: fixed;\n                    bottom: 10%;\n                    left: 50%;\n                    transform: translateX(-50%);\n                    width: 160px;\n                    background: slategray;\n                    color: white;\n                    text-align: center;\n                    border-radius: 10px;\n                    padding: 10px 0;\n                    z-index: 1000;\n                    font-size: 14px;\n                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n                }\n            "), /*#__PURE__*/React.createElement("span", {
  className: "auto-translate-toast"
}, /*#__PURE__*/React.createElement("span", {
  className: "ellipsis"
}, /*#__PURE__*/React.createElement("i", null, "Translating"))));

var isDev = process.env.NODE_ENV === 'development';
var useAutoTranslate = function useAutoTranslate(namespace) {
  var _useContext = useContext(AutoTranslateContext),
    pathname = _useContext.pathname,
    defaultLocale = _useContext.defaultLocale,
    locales = _useContext.locales,
    addToCheckQueue = _useContext.addToCheckQueue,
    messages = _useContext.messages,
    locale = _useContext.locale,
    disabled = _useContext.disabled;

  // If no locales provided, throw getTranslationProps error
  if ((!locales || !defaultLocale) && isDev && typeof window !== 'undefined') {
    console.error("[AutoTranslate]\nMissing required props in AutoTranslateProvider: locales & defaultLocale\n        \n-- You must export 'getTranslationProps' to use AutoTranslate on this Page --\n\nExample:\n\nimport { getTranslationProps } from 'next-auto-translate/server'\n\nexport async function getStaticProps(context) {\n    return {\n        props: {\n            ...await getTranslationProps(context)\n        }\n    };\n}\n");
  }

  // Utilizing a closure to hold our cache
  if (isDev && !disabled) {
    if (!globalThis.cache) {
      globalThis.cache = {};
    }
  }

  /**
   * Automatically translate a given key
   * @param {string} tKey - The translation key
   * @param {string} message - The message to translate
   * @param {string?} tNamespace - The namespace to use for translation
   */
  var autoTranslate = function autoTranslate(tKey, message, tNamespace) {
    var _messages$effectiveNa;
    // Computation or derivation of namespace if not directly provided
    var effectiveNamespace = tNamespace || namespace;
    if (!effectiveNamespace) {
      var usePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      var startPath = usePathname.replace("/" + locale, "").split("/")[1];
      effectiveNamespace = startPath.length === 0 ? "index" : startPath;
    }
    if (isDev && !disabled) {
      // Construct a unique cache key
      var cacheKey = "".concat(effectiveNamespace, ":").concat(tKey);
      if (globalThis.cache[cacheKey] != message) {
        setTimeout(function () {
          addToCheckQueue({
            tKey: tKey,
            message: message,
            namespace: effectiveNamespace
          });
        });
        globalThis.cache[cacheKey] = message;
      }
    }

    // Return the appropriate translation if available
    return ((_messages$effectiveNa = messages[effectiveNamespace]) === null || _messages$effectiveNa === void 0 ? void 0 : _messages$effectiveNa[tKey]) || message;
  };
  return {
    autoTranslate: autoTranslate
  };
};
var AutoTranslate = function AutoTranslate(_ref) {
  var _messages$namespace;
  var tKey = _ref.tKey,
    children = _ref.children,
    namespace = _ref.namespace;
  var _useContext2 = useContext(AutoTranslateContext),
    pathname = _useContext2.pathname,
    messages = _useContext2.messages,
    locale = _useContext2.locale,
    locales = _useContext2.locales,
    disabled = _useContext2.disabled,
    addToCheckQueue = _useContext2.addToCheckQueue;
  var message = children;
  if (!namespace) {
    var usePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
    var startPath = usePathname.replace("/" + locale, "").split("/")[1];
    namespace = startPath.length === 0 ? "index" : startPath;
  }

  // Utilizing a closure to hold our cache
  if (isDev && !disabled) {
    if (!globalThis.cache) {
      globalThis.cache = {};
    }
  }

  // Only automatically run translations in dev mode
  useEffect(function () {
    if (isDev && !disabled) {
      var cacheKey = "".concat(namespace, ":").concat(tKey);
      if (globalThis.cache[cacheKey] != message) {
        addToCheckQueue({
          tKey: tKey,
          message: message,
          namespace: namespace
        });
        globalThis.cache[cacheKey] = message;
      }
    }
  }, [children, messages, locales]);
  return ((_messages$namespace = messages[namespace]) === null || _messages$namespace === void 0 ? void 0 : _messages$namespace[tKey]) || children;
};

export { AutoTranslate, AutoTranslateContext, AutoTranslateProvider, useAutoTranslate };
