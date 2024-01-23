import { useLocale, useTranslations } from 'next-intl';
import React, { createContext, useContext, useState } from 'react';

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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var AutoTranslateContext = /*#__PURE__*/createContext();
var AutoTranslateProvider = function AutoTranslateProvider(_ref) {
  var children = _ref.children,
    pathname = _ref.pathname,
    _ref$defaultLocale = _ref.defaultLocale,
    defaultLocale = _ref$defaultLocale === void 0 ? "en" : _ref$defaultLocale,
    locales = _ref.locales,
    debug = _ref.debug;
  return /*#__PURE__*/React.createElement(AutoTranslateContext.Provider, {
    value: {
      pathname: pathname,
      defaultLocale: defaultLocale,
      debug: debug,
      locales: locales
    }
  }, children);
};

var isDev = process.env.NODE_ENV === 'development';
var AutoTranslate = function AutoTranslate(_ref) {
  var tKey = _ref.tKey,
    children = _ref.children,
    namespace = _ref.namespace;
  var _useContext = useContext(AutoTranslateContext),
    pathname = _useContext.pathname,
    defaultLocale = _useContext.defaultLocale,
    locales = _useContext.locales,
    debug = _useContext.debug;
  var locale = useLocale();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0];
    _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    translated = _useState6[0];
    _useState6[1];
  if (!locales && (debug || isDev)) {
    console.error("\nMissing required props in AutoTranslateProvider: locales & defaultLocale\n        \n-- You must export 'getTranslationProps' to use AutoTranslate on this Page --\n\nExample:\n\nimport { getTranslationProps } from 'next-auto-translate/server'\n\nexport async function getStaticProps(context) {\n    return {\n        props: {\n            ...await getTranslationProps(context)\n        }\n    };\n}\n");
  }
  if (debug) {
    console.log("[AutoTranslate] Default Locale: ", defaultLocale);
    console.log("[AutoTranslate] Current Locale: ", locale);
  }
  var usePathname = pathname;
  if (!pathname) {
    usePathname = window.location.pathname;
  }

  // Get namespace from pathname, which is the first part of the pathname
  var startPath = usePathname.replace("/" + locale, "").split("/")[1];
  if (startPath.length == 0) {
    startPath = "index";
  }
  if (!namespace) {
    namespace = startPath;
  }

  // Determine Key Prefix based on the rest of the pathname
  // const keyPrefix = pathname.split("/").slice(2).join(".")

  if (debug) {
    console.log("[AutoTranslate] Namespace: ", namespace);
  }
  var t = useTranslations(namespace);

  /*
  
  // Only automatically run translations in dev mode
  if (isDev) {
      const checkTranslations = () => {
          fetch(`/api/translate/check`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  namespace,
                  keyPrefix,
                  tKey,
                  text: children
              })
          }).then(response => response.json()).then(data => {
              if (data.run_translate) {
                  runTranslations();
              } else {
                  // console.log("[AutoTranslate] Translations already exist! 😎")
                  setLoading(false)
              }
               setInitialized(true)
          }).catch(err => {
              console.error(err);
              setLoading(false)
          });
      };
        const runTranslations = async () => {
          console.log("[AutoTranslate] Run translations 🚀")
          setLoading(true)
           fetch(`/api/translate/run`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  namespace,
                  keyPrefix,
                  tKey,
                  text: children
              })
          }).then(response => response.json()).then(data => {
              console.log("[AutoTranslate] Translations Complete! 😎")
               if (locale != defaultLocale) {
                  // window.location.reload()
              } else {
                  setTranslated(true)
                  setLoading(false)
              }
          }).catch(err => {
              console.error(err);
              setLoading(false)
          });
       }
       useEffect(() => {
          if (initialized) {
              setLoading(true)
              checkTranslations()
          }
      }, [children])
       useEffect(() => {
          if (!initialized) {
              checkTranslations()
          }
      }, [])
  }
  */

  return /*#__PURE__*/React.createElement(React.Fragment, null, loading || translated ? children : t(tKey, children), loading && loadingElement);
};
var loadingElement = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, "\n                @keyframes ellipsis {\n                    0% { content: ''; }\n                    25% { content: '.'; }\n                    50% { content: '..'; }\n                    75% { content: '...'; }\n                    100% { content: '...'; }\n                }\n\n                .ellipsis::after {\n                    content: '';\n                    animation: ellipsis 2.0s infinite;\n                }\n            "), /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'fixed',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '160px',
    background: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    textAlign: 'center',
    borderRadius: '10px',
    padding: '10px 0',
    zIndex: 1000,
    fontSize: '14px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "ellipsis"
}, /*#__PURE__*/React.createElement("i", null, "Translating"))));

export { AutoTranslate, AutoTranslateContext, AutoTranslateProvider };
