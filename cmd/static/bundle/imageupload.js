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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/jquery/dist/jquery.js
var require_jquery = __commonJS({
  "node_modules/jquery/dist/jquery.js"(exports, module) {
    (function(global, factory) {
      "use strict";
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
      } else {
        factory(global);
      }
    })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
      "use strict";
      var arr = [];
      var getProto = Object.getPrototypeOf;
      var slice = arr.slice;
      var flat = arr.flat ? function(array) {
        return arr.flat.call(array);
      } : function(array) {
        return arr.concat.apply([], array);
      };
      var push = arr.push;
      var indexOf = arr.indexOf;
      var class2type = {};
      var toString = class2type.toString;
      var hasOwn = class2type.hasOwnProperty;
      var fnToString = hasOwn.toString;
      var ObjectFunctionString = fnToString.call(Object);
      var support = {};
      var isFunction = function isFunction2(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
      };
      var isWindow = function isWindow2(obj) {
        return obj != null && obj === obj.window;
      };
      var document2 = window2.document;
      var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
      };
      function DOMEval(code, node, doc) {
        doc = doc || document2;
        var i, val, script = doc.createElement("script");
        script.text = code;
        if (node) {
          for (i in preservedScriptAttributes) {
            val = node[i] || node.getAttribute && node.getAttribute(i);
            if (val) {
              script.setAttribute(i, val);
            }
          }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
      }
      function toType(obj) {
        if (obj == null) {
          return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
      }
      var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      };
      jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,
        constructor: jQuery,
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function() {
          return slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
          if (num == null) {
            return slice.call(this);
          }
          return num < 0 ? this[num + this.length] : this[num];
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {
          var ret = jQuery.merge(this.constructor(), elems);
          ret.prevObject = this;
          return ret;
        },
        // Execute a callback for every element in the matched set.
        each: function(callback) {
          return jQuery.each(this, callback);
        },
        map: function(callback) {
          return this.pushStack(jQuery.map(this, function(elem, i) {
            return callback.call(elem, i, elem);
          }));
        },
        slice: function() {
          return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        even: function() {
          return this.pushStack(jQuery.grep(this, function(_elem, i) {
            return (i + 1) % 2;
          }));
        },
        odd: function() {
          return this.pushStack(jQuery.grep(this, function(_elem, i) {
            return i % 2;
          }));
        },
        eq: function(i) {
          var len = this.length, j = +i + (i < 0 ? len : 0);
          return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function() {
          return this.prevObject || this.constructor();
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push,
        sort: arr.sort,
        splice: arr.splice
      };
      jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[i] || {};
          i++;
        }
        if (typeof target !== "object" && !isFunction(target)) {
          target = {};
        }
        if (i === length) {
          target = this;
          i--;
        }
        for (; i < length; i++) {
          if ((options = arguments[i]) != null) {
            for (name in options) {
              copy = options[name];
              if (name === "__proto__" || target === copy) {
                continue;
              }
              if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                src = target[name];
                if (copyIsArray && !Array.isArray(src)) {
                  clone = [];
                } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                  clone = {};
                } else {
                  clone = src;
                }
                copyIsArray = false;
                target[name] = jQuery.extend(deep, clone, copy);
              } else if (copy !== void 0) {
                target[name] = copy;
              }
            }
          }
        }
        return target;
      };
      jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        // Assume jQuery is ready without the ready module
        isReady: true,
        error: function(msg) {
          throw new Error(msg);
        },
        noop: function() {
        },
        isPlainObject: function(obj) {
          var proto, Ctor;
          if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
          }
          proto = getProto(obj);
          if (!proto) {
            return true;
          }
          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function(obj) {
          var name;
          for (name in obj) {
            return false;
          }
          return true;
        },
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function(code, options, doc) {
          DOMEval(code, { nonce: options && options.nonce }, doc);
        },
        each: function(obj, callback) {
          var length, i = 0;
          if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          } else {
            for (i in obj) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          }
          return obj;
        },
        // Retrieve the text value of an array of DOM nodes
        text: function(elem) {
          var node, ret = "", i = 0, nodeType = elem.nodeType;
          if (!nodeType) {
            while (node = elem[i++]) {
              ret += jQuery.text(node);
            }
          }
          if (nodeType === 1 || nodeType === 11) {
            return elem.textContent;
          }
          if (nodeType === 9) {
            return elem.documentElement.textContent;
          }
          if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
          }
          return ret;
        },
        // results is for internal usage only
        makeArray: function(arr2, results) {
          var ret = results || [];
          if (arr2 != null) {
            if (isArrayLike(Object(arr2))) {
              jQuery.merge(
                ret,
                typeof arr2 === "string" ? [arr2] : arr2
              );
            } else {
              push.call(ret, arr2);
            }
          }
          return ret;
        },
        inArray: function(elem, arr2, i) {
          return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
        },
        isXMLDoc: function(elem) {
          var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
          return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
        },
        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function(first, second) {
          var len = +second.length, j = 0, i = first.length;
          for (; j < len; j++) {
            first[i++] = second[j];
          }
          first.length = i;
          return first;
        },
        grep: function(elems, callback, invert) {
          var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
          for (; i < length; i++) {
            callbackInverse = !callback(elems[i], i);
            if (callbackInverse !== callbackExpect) {
              matches.push(elems[i]);
            }
          }
          return matches;
        },
        // arg is for internal usage only
        map: function(elems, callback, arg) {
          var length, value, i = 0, ret = [];
          if (isArrayLike(elems)) {
            length = elems.length;
            for (; i < length; i++) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          } else {
            for (i in elems) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          }
          return flat(ret);
        },
        // A global GUID counter for objects
        guid: 1,
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support
      });
      if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
      }
      jQuery.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(_i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase();
        }
      );
      function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) {
          return false;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
      }
      function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      }
      var pop = arr.pop;
      var sort = arr.sort;
      var splice = arr.splice;
      var whitespace = "[\\x20\\t\\r\\n\\f]";
      var rtrimCSS = new RegExp(
        "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
        "g"
      );
      jQuery.contains = function(a, b) {
        var bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
        // IE doesn't have `contains` on SVG.
        (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      };
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      function fcssescape(ch, asCodePoint) {
        if (asCodePoint) {
          if (ch === "\0") {
            return "\uFFFD";
          }
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }
        return "\\" + ch;
      }
      jQuery.escapeSelector = function(sel) {
        return (sel + "").replace(rcssescape, fcssescape);
      };
      var preferredDoc = document2, pushNative = push;
      (function() {
        var i, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document3, documentElement2, documentIsHTML, rbuggyQSA, matches, expando = jQuery.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
          ID: new RegExp("^#(" + identifier + ")"),
          CLASS: new RegExp("^\\.(" + identifier + ")"),
          TAG: new RegExp("^(" + identifier + "|[*])"),
          ATTR: new RegExp("^" + attributes),
          PSEUDO: new RegExp("^" + pseudos),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + booleans + ")$", "i"),
          // For use in libraries implementing .is()
          // We use this for POS matching in `select`
          needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
          var high = "0x" + escape.slice(1) - 65536;
          if (nonHex) {
            return nonHex;
          }
          return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
        }, unloadHandler = function() {
          setDocument();
        }, inDisabledFieldset = addCombinator(
          function(elem) {
            return elem.disabled === true && nodeName(elem, "fieldset");
          },
          { dir: "parentNode", next: "legend" }
        );
        function safeActiveElement() {
          try {
            return document3.activeElement;
          } catch (err) {
          }
        }
        try {
          push2.apply(
            arr = slice.call(preferredDoc.childNodes),
            preferredDoc.childNodes
          );
          arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
          push2 = {
            apply: function(target, els) {
              pushNative.apply(target, slice.call(els));
            },
            call: function(target) {
              pushNative.apply(target, slice.call(arguments, 1));
            }
          };
        }
        function find(selector, context, results, seed) {
          var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
          results = results || [];
          if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
            return results;
          }
          if (!seed) {
            setDocument(context);
            context = context || document3;
            if (documentIsHTML) {
              if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                if (m = match[1]) {
                  if (nodeType === 9) {
                    if (elem = context.getElementById(m)) {
                      if (elem.id === m) {
                        push2.call(results, elem);
                        return results;
                      }
                    } else {
                      return results;
                    }
                  } else {
                    if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                      push2.call(results, elem);
                      return results;
                    }
                  }
                } else if (match[2]) {
                  push2.apply(results, context.getElementsByTagName(selector));
                  return results;
                } else if ((m = match[3]) && context.getElementsByClassName) {
                  push2.apply(results, context.getElementsByClassName(m));
                  return results;
                }
              }
              if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                newSelector = selector;
                newContext = context;
                if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                  newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                  if (newContext != context || !support.scope) {
                    if (nid = context.getAttribute("id")) {
                      nid = jQuery.escapeSelector(nid);
                    } else {
                      context.setAttribute("id", nid = expando);
                    }
                  }
                  groups = tokenize(selector);
                  i2 = groups.length;
                  while (i2--) {
                    groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                  }
                  newSelector = groups.join(",");
                }
                try {
                  push2.apply(
                    results,
                    newContext.querySelectorAll(newSelector)
                  );
                  return results;
                } catch (qsaError) {
                  nonnativeSelectorCache(selector, true);
                } finally {
                  if (nid === expando) {
                    context.removeAttribute("id");
                  }
                }
              }
            }
          }
          return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
        }
        function createCache() {
          var keys = [];
          function cache(key, value) {
            if (keys.push(key + " ") > Expr.cacheLength) {
              delete cache[keys.shift()];
            }
            return cache[key + " "] = value;
          }
          return cache;
        }
        function markFunction(fn) {
          fn[expando] = true;
          return fn;
        }
        function assert(fn) {
          var el = document3.createElement("fieldset");
          try {
            return !!fn(el);
          } catch (e) {
            return false;
          } finally {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
            el = null;
          }
        }
        function createInputPseudo(type) {
          return function(elem) {
            return nodeName(elem, "input") && elem.type === type;
          };
        }
        function createButtonPseudo(type) {
          return function(elem) {
            return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
          };
        }
        function createDisabledPseudo(disabled) {
          return function(elem) {
            if ("form" in elem) {
              if (elem.parentNode && elem.disabled === false) {
                if ("label" in elem) {
                  if ("label" in elem.parentNode) {
                    return elem.parentNode.disabled === disabled;
                  } else {
                    return elem.disabled === disabled;
                  }
                }
                return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
              }
              return elem.disabled === disabled;
            } else if ("label" in elem) {
              return elem.disabled === disabled;
            }
            return false;
          };
        }
        function createPositionalPseudo(fn) {
          return markFunction(function(argument) {
            argument = +argument;
            return markFunction(function(seed, matches2) {
              var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
              while (i2--) {
                if (seed[j = matchIndexes[i2]]) {
                  seed[j] = !(matches2[j] = seed[j]);
                }
              }
            });
          });
        }
        function testContext(context) {
          return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        function setDocument(node) {
          var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
          if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
            return document3;
          }
          document3 = doc;
          documentElement2 = document3.documentElement;
          documentIsHTML = !jQuery.isXMLDoc(document3);
          matches = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
          if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
            subWindow.addEventListener("unload", unloadHandler);
          }
          support.getById = assert(function(el) {
            documentElement2.appendChild(el).id = jQuery.expando;
            return !document3.getElementsByName || !document3.getElementsByName(jQuery.expando).length;
          });
          support.disconnectedMatch = assert(function(el) {
            return matches.call(el, "*");
          });
          support.scope = assert(function() {
            return document3.querySelectorAll(":scope");
          });
          support.cssHas = assert(function() {
            try {
              document3.querySelector(":has(*,:jqfake)");
              return false;
            } catch (e) {
              return true;
            }
          });
          if (support.getById) {
            Expr.filter.ID = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                return elem.getAttribute("id") === attrId;
              };
            };
            Expr.find.ID = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var elem = context.getElementById(id);
                return elem ? [elem] : [];
              }
            };
          } else {
            Expr.filter.ID = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                return node2 && node2.value === attrId;
              };
            };
            Expr.find.ID = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var node2, i2, elems, elem = context.getElementById(id);
                if (elem) {
                  node2 = elem.getAttributeNode("id");
                  if (node2 && node2.value === id) {
                    return [elem];
                  }
                  elems = context.getElementsByName(id);
                  i2 = 0;
                  while (elem = elems[i2++]) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                  }
                }
                return [];
              }
            };
          }
          Expr.find.TAG = function(tag, context) {
            if (typeof context.getElementsByTagName !== "undefined") {
              return context.getElementsByTagName(tag);
            } else {
              return context.querySelectorAll(tag);
            }
          };
          Expr.find.CLASS = function(className, context) {
            if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
              return context.getElementsByClassName(className);
            }
          };
          rbuggyQSA = [];
          assert(function(el) {
            var input;
            documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
            if (!el.querySelectorAll("[selected]").length) {
              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
            }
            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }
            if (!el.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }
            if (!el.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }
            input = document3.createElement("input");
            input.setAttribute("type", "hidden");
            el.appendChild(input).setAttribute("name", "D");
            documentElement2.appendChild(el).disabled = true;
            if (el.querySelectorAll(":disabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            input = document3.createElement("input");
            input.setAttribute("name", "");
            el.appendChild(input);
            if (!el.querySelectorAll("[name='']").length) {
              rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
            }
          });
          if (!support.cssHas) {
            rbuggyQSA.push(":has");
          }
          rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
          sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }
            var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
            if (compare) {
              return compare;
            }
            compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
              // Otherwise we know they are disconnected
              1
            );
            if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
              if (a === document3 || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
                return -1;
              }
              if (b === document3 || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
                return 1;
              }
              return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
            }
            return compare & 4 ? -1 : 1;
          };
          return document3;
        }
        find.matches = function(expr, elements) {
          return find(expr, null, null, elements);
        };
        find.matchesSelector = function(elem, expr) {
          setDocument(elem);
          if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
            try {
              var ret = matches.call(elem, expr);
              if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11) {
                return ret;
              }
            } catch (e) {
              nonnativeSelectorCache(expr, true);
            }
          }
          return find(expr, document3, null, [elem]).length > 0;
        };
        find.contains = function(context, elem) {
          if ((context.ownerDocument || context) != document3) {
            setDocument(context);
          }
          return jQuery.contains(context, elem);
        };
        find.attr = function(elem, name) {
          if ((elem.ownerDocument || elem) != document3) {
            setDocument(elem);
          }
          var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
          if (val !== void 0) {
            return val;
          }
          return elem.getAttribute(name);
        };
        find.error = function(msg) {
          throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        jQuery.uniqueSort = function(results) {
          var elem, duplicates = [], j = 0, i2 = 0;
          hasDuplicate = !support.sortStable;
          sortInput = !support.sortStable && slice.call(results, 0);
          sort.call(results, sortOrder);
          if (hasDuplicate) {
            while (elem = results[i2++]) {
              if (elem === results[i2]) {
                j = duplicates.push(i2);
              }
            }
            while (j--) {
              splice.call(results, duplicates[j], 1);
            }
          }
          sortInput = null;
          return results;
        };
        jQuery.fn.uniqueSort = function() {
          return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
        };
        Expr = jQuery.expr = {
          // Can be adjusted by the user
          cacheLength: 50,
          createPseudo: markFunction,
          match: matchExpr,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: true },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: true },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function(match) {
              match[1] = match[1].replace(runescape, funescape);
              match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
              if (match[2] === "~=") {
                match[3] = " " + match[3] + " ";
              }
              return match.slice(0, 4);
            },
            CHILD: function(match) {
              match[1] = match[1].toLowerCase();
              if (match[1].slice(0, 3) === "nth") {
                if (!match[3]) {
                  find.error(match[0]);
                }
                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                match[5] = +(match[7] + match[8] || match[3] === "odd");
              } else if (match[3]) {
                find.error(match[0]);
              }
              return match;
            },
            PSEUDO: function(match) {
              var excess, unquoted = !match[6] && match[2];
              if (matchExpr.CHILD.test(match[0])) {
                return null;
              }
              if (match[3]) {
                match[2] = match[4] || match[5] || "";
              } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
              (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
              (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                match[0] = match[0].slice(0, excess);
                match[2] = unquoted.slice(0, excess);
              }
              return match.slice(0, 3);
            }
          },
          filter: {
            TAG: function(nodeNameSelector) {
              var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
              return nodeNameSelector === "*" ? function() {
                return true;
              } : function(elem) {
                return nodeName(elem, expectedNodeName);
              };
            },
            CLASS: function(className) {
              var pattern = classCache[className + " "];
              return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                return pattern.test(
                  typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                );
              });
            },
            ATTR: function(name, operator, check) {
              return function(elem) {
                var result = find.attr(elem, name);
                if (result == null) {
                  return operator === "!=";
                }
                if (!operator) {
                  return true;
                }
                result += "";
                if (operator === "=") {
                  return result === check;
                }
                if (operator === "!=") {
                  return result !== check;
                }
                if (operator === "^=") {
                  return check && result.indexOf(check) === 0;
                }
                if (operator === "*=") {
                  return check && result.indexOf(check) > -1;
                }
                if (operator === "$=") {
                  return check && result.slice(-check.length) === check;
                }
                if (operator === "~=") {
                  return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
                }
                if (operator === "|=") {
                  return result === check || result.slice(0, check.length + 1) === check + "-";
                }
                return false;
              };
            },
            CHILD: function(type, what, _argument, first, last) {
              var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
              return first === 1 && last === 0 ? (
                // Shortcut for :nth-*(n)
                function(elem) {
                  return !!elem.parentNode;
                }
              ) : function(elem, _context, xml) {
                var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                if (parent) {
                  if (simple) {
                    while (dir2) {
                      node = elem;
                      while (node = node[dir2]) {
                        if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                          return false;
                        }
                      }
                      start = dir2 = type === "only" && !start && "nextSibling";
                    }
                    return true;
                  }
                  start = [forward ? parent.firstChild : parent.lastChild];
                  if (forward && useCache) {
                    outerCache = parent[expando] || (parent[expando] = {});
                    cache = outerCache[type] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex && cache[2];
                    node = nodeIndex && parent.childNodes[nodeIndex];
                    while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                    (diff = nodeIndex = 0) || start.pop()) {
                      if (node.nodeType === 1 && ++diff && node === elem) {
                        outerCache[type] = [dirruns, nodeIndex, diff];
                        break;
                      }
                    }
                  } else {
                    if (useCache) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex;
                    }
                    if (diff === false) {
                      while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                        if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                          if (useCache) {
                            outerCache = node[expando] || (node[expando] = {});
                            outerCache[type] = [dirruns, diff];
                          }
                          if (node === elem) {
                            break;
                          }
                        }
                      }
                    }
                  }
                  diff -= last;
                  return diff === first || diff % first === 0 && diff / first >= 0;
                }
              };
            },
            PSEUDO: function(pseudo, argument) {
              var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);
              if (fn[expando]) {
                return fn(argument);
              }
              if (fn.length > 1) {
                args = [pseudo, pseudo, "", argument];
                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                  var idx, matched = fn(seed, argument), i2 = matched.length;
                  while (i2--) {
                    idx = indexOf.call(seed, matched[i2]);
                    seed[idx] = !(matches2[idx] = matched[i2]);
                  }
                }) : function(elem) {
                  return fn(elem, 0, args);
                };
              }
              return fn;
            }
          },
          pseudos: {
            // Potentially complex pseudos
            not: markFunction(function(selector) {
              var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
              return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                while (i2--) {
                  if (elem = unmatched[i2]) {
                    seed[i2] = !(matches2[i2] = elem);
                  }
                }
              }) : function(elem, _context, xml) {
                input[0] = elem;
                matcher(input, null, xml, results);
                input[0] = null;
                return !results.pop();
              };
            }),
            has: markFunction(function(selector) {
              return function(elem) {
                return find(selector, elem).length > 0;
              };
            }),
            contains: markFunction(function(text) {
              text = text.replace(runescape, funescape);
              return function(elem) {
                return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
              };
            }),
            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // https://www.w3.org/TR/selectors/#lang-pseudo
            lang: markFunction(function(lang) {
              if (!ridentifier.test(lang || "")) {
                find.error("unsupported lang: " + lang);
              }
              lang = lang.replace(runescape, funescape).toLowerCase();
              return function(elem) {
                var elemLang;
                do {
                  if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                    elemLang = elemLang.toLowerCase();
                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                  }
                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                return false;
              };
            }),
            // Miscellaneous
            target: function(elem) {
              var hash = window2.location && window2.location.hash;
              return hash && hash.slice(1) === elem.id;
            },
            root: function(elem) {
              return elem === documentElement2;
            },
            focus: function(elem) {
              return elem === safeActiveElement() && document3.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
            },
            // Boolean properties
            enabled: createDisabledPseudo(false),
            disabled: createDisabledPseudo(true),
            checked: function(elem) {
              return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
            },
            selected: function(elem) {
              if (elem.parentNode) {
                elem.parentNode.selectedIndex;
              }
              return elem.selected === true;
            },
            // Contents
            empty: function(elem) {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                if (elem.nodeType < 6) {
                  return false;
                }
              }
              return true;
            },
            parent: function(elem) {
              return !Expr.pseudos.empty(elem);
            },
            // Element/input types
            header: function(elem) {
              return rheader.test(elem.nodeName);
            },
            input: function(elem) {
              return rinputs.test(elem.nodeName);
            },
            button: function(elem) {
              return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
            },
            text: function(elem) {
              var attr;
              return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
              // New HTML5 attribute values (e.g., "search") appear
              // with elem.type === "text"
              ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
            },
            // Position-in-collection
            first: createPositionalPseudo(function() {
              return [0];
            }),
            last: createPositionalPseudo(function(_matchIndexes, length) {
              return [length - 1];
            }),
            eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
              return [argument < 0 ? argument + length : argument];
            }),
            even: createPositionalPseudo(function(matchIndexes, length) {
              var i2 = 0;
              for (; i2 < length; i2 += 2) {
                matchIndexes.push(i2);
              }
              return matchIndexes;
            }),
            odd: createPositionalPseudo(function(matchIndexes, length) {
              var i2 = 1;
              for (; i2 < length; i2 += 2) {
                matchIndexes.push(i2);
              }
              return matchIndexes;
            }),
            lt: createPositionalPseudo(function(matchIndexes, length, argument) {
              var i2;
              if (argument < 0) {
                i2 = argument + length;
              } else if (argument > length) {
                i2 = length;
              } else {
                i2 = argument;
              }
              for (; --i2 >= 0; ) {
                matchIndexes.push(i2);
              }
              return matchIndexes;
            }),
            gt: createPositionalPseudo(function(matchIndexes, length, argument) {
              var i2 = argument < 0 ? argument + length : argument;
              for (; ++i2 < length; ) {
                matchIndexes.push(i2);
              }
              return matchIndexes;
            })
          }
        };
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
          Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in { submit: true, reset: true }) {
          Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {
        }
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        function tokenize(selector, parseOnly) {
          var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
          if (cached) {
            return parseOnly ? 0 : cached.slice(0);
          }
          soFar = selector;
          groups = [];
          preFilters = Expr.preFilter;
          while (soFar) {
            if (!matched || (match = rcomma.exec(soFar))) {
              if (match) {
                soFar = soFar.slice(match[0].length) || soFar;
              }
              groups.push(tokens = []);
            }
            matched = false;
            if (match = rleadingCombinator.exec(soFar)) {
              matched = match.shift();
              tokens.push({
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace(rtrimCSS, " ")
              });
              soFar = soFar.slice(matched.length);
            }
            for (type in Expr.filter) {
              if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type,
                  matches: match
                });
                soFar = soFar.slice(matched.length);
              }
            }
            if (!matched) {
              break;
            }
          }
          if (parseOnly) {
            return soFar.length;
          }
          return soFar ? find.error(selector) : (
            // Cache the tokens
            tokenCache(selector, groups).slice(0)
          );
        }
        function toSelector(tokens) {
          var i2 = 0, len = tokens.length, selector = "";
          for (; i2 < len; i2++) {
            selector += tokens[i2].value;
          }
          return selector;
        }
        function addCombinator(matcher, combinator, base) {
          var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
          return combinator.first ? (
            // Check against closest ancestor/preceding element
            function(elem, context, xml) {
              while (elem = elem[dir2]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml);
                }
              }
              return false;
            }
          ) : (
            // Check against all ancestor/preceding elements
            function(elem, context, xml) {
              var oldCache, outerCache, newCache = [dirruns, doneName];
              if (xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    if (skip && nodeName(elem, skip)) {
                      elem = elem[dir2] || elem;
                    } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                      return newCache[2] = oldCache[2];
                    } else {
                      outerCache[key] = newCache;
                      if (newCache[2] = matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            }
          );
        }
        function elementMatcher(matchers) {
          return matchers.length > 1 ? function(elem, context, xml) {
            var i2 = matchers.length;
            while (i2--) {
              if (!matchers[i2](elem, context, xml)) {
                return false;
              }
            }
            return true;
          } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
          var i2 = 0, len = contexts.length;
          for (; i2 < len; i2++) {
            find(selector, contexts[i2], results);
          }
          return results;
        }
        function condense(unmatched, map, filter, context, xml) {
          var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
          for (; i2 < len; i2++) {
            if (elem = unmatched[i2]) {
              if (!filter || filter(elem, context, xml)) {
                newUnmatched.push(elem);
                if (mapped) {
                  map.push(i2);
                }
              }
            }
          }
          return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
          if (postFilter && !postFilter[expando]) {
            postFilter = setMatcher(postFilter);
          }
          if (postFinder && !postFinder[expando]) {
            postFinder = setMatcher(postFinder, postSelector);
          }
          return markFunction(function(seed, results, context, xml) {
            var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
              selector || "*",
              context.nodeType ? [context] : context,
              []
            ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
            if (matcher) {
              matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                // ...intermediate processing is necessary
                []
              ) : (
                // ...otherwise use results directly
                results
              );
              matcher(matcherIn, matcherOut, context, xml);
            } else {
              matcherOut = matcherIn;
            }
            if (postFilter) {
              temp = condense(matcherOut, postMap);
              postFilter(temp, [], context, xml);
              i2 = temp.length;
              while (i2--) {
                if (elem = temp[i2]) {
                  matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                }
              }
            }
            if (seed) {
              if (postFinder || preFilter) {
                if (postFinder) {
                  temp = [];
                  i2 = matcherOut.length;
                  while (i2--) {
                    if (elem = matcherOut[i2]) {
                      temp.push(matcherIn[i2] = elem);
                    }
                  }
                  postFinder(null, matcherOut = [], temp, xml);
                }
                i2 = matcherOut.length;
                while (i2--) {
                  if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                    seed[temp] = !(results[temp] = elem);
                  }
                }
              }
            } else {
              matcherOut = condense(
                matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
              );
              if (postFinder) {
                postFinder(null, results, matcherOut, xml);
              } else {
                push2.apply(results, matcherOut);
              }
            }
          });
        }
        function matcherFromTokens(tokens) {
          var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
            return indexOf.call(checkContext, elem) > -1;
          }, implicitRelative, true), matchers = [function(elem, context, xml) {
            var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
          for (; i2 < len; i2++) {
            if (matcher = Expr.relative[tokens[i2].type]) {
              matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
              matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
              if (matcher[expando]) {
                j = ++i2;
                for (; j < len; j++) {
                  if (Expr.relative[tokens[j].type]) {
                    break;
                  }
                }
                return setMatcher(
                  i2 > 1 && elementMatcher(matchers),
                  i2 > 1 && toSelector(
                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                    tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                  ).replace(rtrimCSS, "$1"),
                  matcher,
                  i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                  j < len && matcherFromTokens(tokens = tokens.slice(j)),
                  j < len && toSelector(tokens)
                );
              }
              matchers.push(matcher);
            }
          }
          return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
          var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
            var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
            if (outermost) {
              outermostContext = context == document3 || context || outermost;
            }
            for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument != document3) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while (matcher = elementMatchers[j++]) {
                  if (matcher(elem, context || document3, xml)) {
                    push2.call(results, elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if (elem = !matcher && elem) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i2;
            if (bySet && i2 !== matchedCount) {
              j = 0;
              while (matcher = setMatchers[j++]) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i2--) {
                    if (!(unmatched[i2] || setMatched[i2])) {
                      setMatched[i2] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push2.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                jQuery.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
          return bySet ? markFunction(superMatcher) : superMatcher;
        }
        function compile(selector, match) {
          var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
          if (!cached) {
            if (!match) {
              match = tokenize(selector);
            }
            i2 = match.length;
            while (i2--) {
              cached = matcherFromTokens(match[i2]);
              if (cached[expando]) {
                setMatchers.push(cached);
              } else {
                elementMatchers.push(cached);
              }
            }
            cached = compilerCache(
              selector,
              matcherFromGroupMatchers(elementMatchers, setMatchers)
            );
            cached.selector = selector;
          }
          return cached;
        }
        function select(selector, context, results, seed) {
          var i2, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
          results = results || [];
          if (match.length === 1) {
            tokens = match[0] = match[0].slice(0);
            if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
              context = (Expr.find.ID(
                token.matches[0].replace(runescape, funescape),
                context
              ) || [])[0];
              if (!context) {
                return results;
              } else if (compiled) {
                context = context.parentNode;
              }
              selector = selector.slice(tokens.shift().value.length);
            }
            i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
            while (i2--) {
              token = tokens[i2];
              if (Expr.relative[type = token.type]) {
                break;
              }
              if (find2 = Expr.find[type]) {
                if (seed = find2(
                  token.matches[0].replace(runescape, funescape),
                  rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                )) {
                  tokens.splice(i2, 1);
                  selector = seed.length && toSelector(tokens);
                  if (!selector) {
                    push2.apply(results, seed);
                    return results;
                  }
                  break;
                }
              }
            }
          }
          (compiled || compile(selector, match))(
            seed,
            context,
            !documentIsHTML,
            results,
            !context || rsibling.test(selector) && testContext(context.parentNode) || context
          );
          return results;
        }
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        setDocument();
        support.sortDetached = assert(function(el) {
          return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
        });
        jQuery.find = find;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = jQuery.uniqueSort;
        find.compile = compile;
        find.select = select;
        find.setDocument = setDocument;
        find.tokenize = tokenize;
        find.escape = jQuery.escapeSelector;
        find.getText = jQuery.text;
        find.isXML = jQuery.isXMLDoc;
        find.selectors = jQuery.expr;
        find.support = jQuery.support;
        find.uniqueSort = jQuery.uniqueSort;
      })();
      var dir = function(elem, dir2, until) {
        var matched = [], truncate = until !== void 0;
        while ((elem = elem[dir2]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && jQuery(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      };
      var siblings = function(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            matched.push(n);
          }
        }
        return matched;
      };
      var rneedsContext = jQuery.expr.match.needsContext;
      var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function winnow(elements, qualifier, not) {
        if (isFunction(qualifier)) {
          return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
          });
        }
        if (qualifier.nodeType) {
          return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
          });
        }
        if (typeof qualifier !== "string") {
          return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
          });
        }
        return jQuery.filter(qualifier, elements, not);
      }
      jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
          expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
          return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
          return elem2.nodeType === 1;
        }));
      };
      jQuery.fn.extend({
        find: function(selector) {
          var i, ret, len = this.length, self2 = this;
          if (typeof selector !== "string") {
            return this.pushStack(jQuery(selector).filter(function() {
              for (i = 0; i < len; i++) {
                if (jQuery.contains(self2[i], this)) {
                  return true;
                }
              }
            }));
          }
          ret = this.pushStack([]);
          for (i = 0; i < len; i++) {
            jQuery.find(selector, self2[i], ret);
          }
          return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
          return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
          return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
          return !!winnow(
            this,
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
            false
          ).length;
        }
      });
      var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document2,
                true
              ));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document2.getElementById(match[2]);
              if (elem) {
                this[0] = elem;
                this.length = 1;
              }
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
          return this;
        } else if (isFunction(selector)) {
          return root.ready !== void 0 ? root.ready(selector) : (
            // Execute immediately if ready is not present
            selector(jQuery)
          );
        }
        return jQuery.makeArray(selector, this);
      };
      init.prototype = jQuery.fn;
      rootjQuery = jQuery(document2);
      var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
      jQuery.fn.extend({
        has: function(target) {
          var targets = jQuery(target, this), l = targets.length;
          return this.filter(function() {
            var i = 0;
            for (; i < l; i++) {
              if (jQuery.contains(this, targets[i])) {
                return true;
              }
            }
          });
        },
        closest: function(selectors, context) {
          var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
          if (!rneedsContext.test(selectors)) {
            for (; i < l; i++) {
              for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                  // Don't pass non-elements to jQuery#find
                  cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors)
                ))) {
                  matched.push(cur);
                  break;
                }
              }
            }
          }
          return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        // Determine the position of an element within the set
        index: function(elem) {
          if (!elem) {
            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          }
          if (typeof elem === "string") {
            return indexOf.call(jQuery(elem), this[0]);
          }
          return indexOf.call(
            this,
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem
          );
        },
        add: function(selector, context) {
          return this.pushStack(
            jQuery.uniqueSort(
              jQuery.merge(this.get(), jQuery(selector, context))
            )
          );
        },
        addBack: function(selector) {
          return this.add(
            selector == null ? this.prevObject : this.prevObject.filter(selector)
          );
        }
      });
      function sibling(cur, dir2) {
        while ((cur = cur[dir2]) && cur.nodeType !== 1) {
        }
        return cur;
      }
      jQuery.each({
        parent: function(elem) {
          var parent = elem.parentNode;
          return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
          return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, _i, until) {
          return dir(elem, "parentNode", until);
        },
        next: function(elem) {
          return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
          return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
          return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
          return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, _i, until) {
          return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, _i, until) {
          return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
          return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
          return siblings(elem.firstChild);
        },
        contents: function(elem) {
          if (elem.contentDocument != null && // Support: IE 11+
          // <object> elements with no `data` attribute has an object
          // `contentDocument` with a `null` prototype.
          getProto(elem.contentDocument)) {
            return elem.contentDocument;
          }
          if (nodeName(elem, "template")) {
            elem = elem.content || elem;
          }
          return jQuery.merge([], elem.childNodes);
        }
      }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
          var matched = jQuery.map(this, fn, until);
          if (name.slice(-5) !== "Until") {
            selector = until;
          }
          if (selector && typeof selector === "string") {
            matched = jQuery.filter(selector, matched);
          }
          if (this.length > 1) {
            if (!guaranteedUnique[name]) {
              jQuery.uniqueSort(matched);
            }
            if (rparentsprev.test(name)) {
              matched.reverse();
            }
          }
          return this.pushStack(matched);
        };
      });
      var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
      function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
          object[flag] = true;
        });
        return object;
      }
      jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
          locked = locked || options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        }, self2 = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (isFunction(arg)) {
                    if (!options.unique || !self2.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && toType(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          // Remove all callbacks from the list
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function() {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            self2.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };
        return self2;
      };
      function Identity(v) {
        return v;
      }
      function Thrower(ex) {
        throw ex;
      }
      function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
          if (value && isFunction(method = value.promise)) {
            method.call(value).done(resolve).fail(reject);
          } else if (value && isFunction(method = value.then)) {
            method.call(value, resolve, reject);
          } else {
            resolve.apply(void 0, [value].slice(noValue));
          }
        } catch (value2) {
          reject.apply(void 0, [value2]);
        }
      }
      jQuery.extend({
        Deferred: function(func) {
          var tuples = [
            // action, add listener, callbacks,
            // ... .then handlers, argument index, [final state]
            [
              "notify",
              "progress",
              jQuery.Callbacks("memory"),
              jQuery.Callbacks("memory"),
              2
            ],
            [
              "resolve",
              "done",
              jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"),
              0,
              "resolved"
            ],
            [
              "reject",
              "fail",
              jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"),
              1,
              "rejected"
            ]
          ], state = "pending", promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            "catch": function(fn) {
              return promise.then(null, fn);
            },
            // Keep pipe for back-compat
            pipe: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(_i, tuple) {
                  var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function(onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;
              function resolve(depth, deferred2, handler, special) {
                return function() {
                  var that = this, args = arguments, mightThrow = function() {
                    var returned, then;
                    if (depth < maxDepth) {
                      return;
                    }
                    returned = handler.apply(that, args);
                    if (returned === deferred2.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }
                    then = returned && // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    (typeof returned === "object" || typeof returned === "function") && returned.then;
                    if (isFunction(then)) {
                      if (special) {
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special)
                        );
                      } else {
                        maxDepth++;
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special),
                          resolve(
                            maxDepth,
                            deferred2,
                            Identity,
                            deferred2.notifyWith
                          )
                        );
                      }
                    } else {
                      if (handler !== Identity) {
                        that = void 0;
                        args = [returned];
                      }
                      (special || deferred2.resolveWith)(that, args);
                    }
                  }, process = special ? mightThrow : function() {
                    try {
                      mightThrow();
                    } catch (e) {
                      if (jQuery.Deferred.exceptionHook) {
                        jQuery.Deferred.exceptionHook(
                          e,
                          process.error
                        );
                      }
                      if (depth + 1 >= maxDepth) {
                        if (handler !== Thrower) {
                          that = void 0;
                          args = [e];
                        }
                        deferred2.rejectWith(that, args);
                      }
                    }
                  };
                  if (depth) {
                    process();
                  } else {
                    if (jQuery.Deferred.getErrorHook) {
                      process.error = jQuery.Deferred.getErrorHook();
                    } else if (jQuery.Deferred.getStackHook) {
                      process.error = jQuery.Deferred.getStackHook();
                    }
                    window2.setTimeout(process);
                  }
                };
              }
              return jQuery.Deferred(function(newDefer) {
                tuples[0][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction(onProgress) ? onProgress : Identity,
                    newDefer.notifyWith
                  )
                );
                tuples[1][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction(onFulfilled) ? onFulfilled : Identity
                  )
                );
                tuples[2][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction(onRejected) ? onRejected : Thrower
                  )
                );
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          }, deferred = {};
          jQuery.each(tuples, function(i, tuple) {
            var list = tuple[2], stateString = tuple[5];
            promise[tuple[1]] = list.add;
            if (stateString) {
              list.add(
                function() {
                  state = stateString;
                },
                // rejected_callbacks.disable
                // fulfilled_callbacks.disable
                tuples[3 - i][2].disable,
                // rejected_handlers.disable
                // fulfilled_handlers.disable
                tuples[3 - i][3].disable,
                // progress_callbacks.lock
                tuples[0][2].lock,
                // progress_handlers.lock
                tuples[0][3].lock
              );
            }
            list.add(tuple[3].fire);
            deferred[tuple[0]] = function() {
              deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
              return this;
            };
            deferred[tuple[0] + "With"] = list.fireWith;
          });
          promise.promise(deferred);
          if (func) {
            func.call(deferred, deferred);
          }
          return deferred;
        },
        // Deferred helper
        when: function(singleValue) {
          var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
            return function(value) {
              resolveContexts[i2] = this;
              resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
              if (!--remaining) {
                primary.resolveWith(resolveContexts, resolveValues);
              }
            };
          };
          if (remaining <= 1) {
            adoptValue(
              singleValue,
              primary.done(updateFunc(i)).resolve,
              primary.reject,
              !remaining
            );
            if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
              return primary.then();
            }
          }
          while (i--) {
            adoptValue(resolveValues[i], updateFunc(i), primary.reject);
          }
          return primary.promise();
        }
      });
      var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      jQuery.Deferred.exceptionHook = function(error, asyncError) {
        if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
          window2.console.warn(
            "jQuery.Deferred exception: " + error.message,
            error.stack,
            asyncError
          );
        }
      };
      jQuery.readyException = function(error) {
        window2.setTimeout(function() {
          throw error;
        });
      };
      var readyList = jQuery.Deferred();
      jQuery.fn.ready = function(fn) {
        readyList.then(fn).catch(function(error) {
          jQuery.readyException(error);
        });
        return this;
      };
      jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See trac-6781
        readyWait: 1,
        // Handle when the DOM is ready
        ready: function(wait) {
          if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
            return;
          }
          jQuery.isReady = true;
          if (wait !== true && --jQuery.readyWait > 0) {
            return;
          }
          readyList.resolveWith(document2, [jQuery]);
        }
      });
      jQuery.ready.then = readyList.then;
      function completed() {
        document2.removeEventListener("DOMContentLoaded", completed);
        window2.removeEventListener("load", completed);
        jQuery.ready();
      }
      if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
        window2.setTimeout(jQuery.ready);
      } else {
        document2.addEventListener("DOMContentLoaded", completed);
        window2.addEventListener("load", completed);
      }
      var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = key == null;
        if (toType(key) === "object") {
          chainable = true;
          for (i in key) {
            access(elems, fn, i, key[i], true, emptyGet, raw);
          }
        } else if (value !== void 0) {
          chainable = true;
          if (!isFunction(value)) {
            raw = true;
          }
          if (bulk) {
            if (raw) {
              fn.call(elems, value);
              fn = null;
            } else {
              bulk = fn;
              fn = function(elem, _key, value2) {
                return bulk.call(jQuery(elem), value2);
              };
            }
          }
          if (fn) {
            for (; i < len; i++) {
              fn(
                elems[i],
                key,
                raw ? value : value.call(elems[i], i, fn(elems[i], key))
              );
            }
          }
        }
        if (chainable) {
          return elems;
        }
        if (bulk) {
          return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
      };
      var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
      function fcamelCase(_all, letter) {
        return letter.toUpperCase();
      }
      function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      }
      var acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
      };
      function Data() {
        this.expando = jQuery.expando + Data.uid++;
      }
      Data.uid = 1;
      Data.prototype = {
        cache: function(owner) {
          var value = owner[this.expando];
          if (!value) {
            value = {};
            if (acceptData(owner)) {
              if (owner.nodeType) {
                owner[this.expando] = value;
              } else {
                Object.defineProperty(owner, this.expando, {
                  value,
                  configurable: true
                });
              }
            }
          }
          return value;
        },
        set: function(owner, data2, value) {
          var prop, cache = this.cache(owner);
          if (typeof data2 === "string") {
            cache[camelCase(data2)] = value;
          } else {
            for (prop in data2) {
              cache[camelCase(prop)] = data2[prop];
            }
          }
          return cache;
        },
        get: function(owner, key) {
          return key === void 0 ? this.cache(owner) : (
            // Always use camelCase key (gh-2257)
            owner[this.expando] && owner[this.expando][camelCase(key)]
          );
        },
        access: function(owner, key, value) {
          if (key === void 0 || key && typeof key === "string" && value === void 0) {
            return this.get(owner, key);
          }
          this.set(owner, key, value);
          return value !== void 0 ? value : key;
        },
        remove: function(owner, key) {
          var i, cache = owner[this.expando];
          if (cache === void 0) {
            return;
          }
          if (key !== void 0) {
            if (Array.isArray(key)) {
              key = key.map(camelCase);
            } else {
              key = camelCase(key);
              key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
            }
            i = key.length;
            while (i--) {
              delete cache[key[i]];
            }
          }
          if (key === void 0 || jQuery.isEmptyObject(cache)) {
            if (owner.nodeType) {
              owner[this.expando] = void 0;
            } else {
              delete owner[this.expando];
            }
          }
        },
        hasData: function(owner) {
          var cache = owner[this.expando];
          return cache !== void 0 && !jQuery.isEmptyObject(cache);
        }
      };
      var dataPriv = new Data();
      var dataUser = new Data();
      var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
      function getData(data2) {
        if (data2 === "true") {
          return true;
        }
        if (data2 === "false") {
          return false;
        }
        if (data2 === "null") {
          return null;
        }
        if (data2 === +data2 + "") {
          return +data2;
        }
        if (rbrace.test(data2)) {
          return JSON.parse(data2);
        }
        return data2;
      }
      function dataAttr(elem, key, data2) {
        var name;
        if (data2 === void 0 && elem.nodeType === 1) {
          name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
          data2 = elem.getAttribute(name);
          if (typeof data2 === "string") {
            try {
              data2 = getData(data2);
            } catch (e) {
            }
            dataUser.set(elem, key, data2);
          } else {
            data2 = void 0;
          }
        }
        return data2;
      }
      jQuery.extend({
        hasData: function(elem) {
          return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function(elem, name, data2) {
          return dataUser.access(elem, name, data2);
        },
        removeData: function(elem, name) {
          dataUser.remove(elem, name);
        },
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function(elem, name, data2) {
          return dataPriv.access(elem, name, data2);
        },
        _removeData: function(elem, name) {
          dataPriv.remove(elem, name);
        }
      });
      jQuery.fn.extend({
        data: function(key, value) {
          var i, name, data2, elem = this[0], attrs = elem && elem.attributes;
          if (key === void 0) {
            if (this.length) {
              data2 = dataUser.get(elem);
              if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                i = attrs.length;
                while (i--) {
                  if (attrs[i]) {
                    name = attrs[i].name;
                    if (name.indexOf("data-") === 0) {
                      name = camelCase(name.slice(5));
                      dataAttr(elem, name, data2[name]);
                    }
                  }
                }
                dataPriv.set(elem, "hasDataAttrs", true);
              }
            }
            return data2;
          }
          if (typeof key === "object") {
            return this.each(function() {
              dataUser.set(this, key);
            });
          }
          return access(this, function(value2) {
            var data3;
            if (elem && value2 === void 0) {
              data3 = dataUser.get(elem, key);
              if (data3 !== void 0) {
                return data3;
              }
              data3 = dataAttr(elem, key);
              if (data3 !== void 0) {
                return data3;
              }
              return;
            }
            this.each(function() {
              dataUser.set(this, key, value2);
            });
          }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
          return this.each(function() {
            dataUser.remove(this, key);
          });
        }
      });
      jQuery.extend({
        queue: function(elem, type, data2) {
          var queue;
          if (elem) {
            type = (type || "fx") + "queue";
            queue = dataPriv.get(elem, type);
            if (data2) {
              if (!queue || Array.isArray(data2)) {
                queue = dataPriv.access(elem, type, jQuery.makeArray(data2));
              } else {
                queue.push(data2);
              }
            }
            return queue || [];
          }
        },
        dequeue: function(elem, type) {
          type = type || "fx";
          var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
            jQuery.dequeue(elem, type);
          };
          if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
          }
          if (fn) {
            if (type === "fx") {
              queue.unshift("inprogress");
            }
            delete hooks.stop;
            fn.call(elem, next, hooks);
          }
          if (!startLength && hooks) {
            hooks.empty.fire();
          }
        },
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function(elem, type) {
          var key = type + "queueHooks";
          return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
            empty: jQuery.Callbacks("once memory").add(function() {
              dataPriv.remove(elem, [type + "queue", key]);
            })
          });
        }
      });
      jQuery.fn.extend({
        queue: function(type, data2) {
          var setter = 2;
          if (typeof type !== "string") {
            data2 = type;
            type = "fx";
            setter--;
          }
          if (arguments.length < setter) {
            return jQuery.queue(this[0], type);
          }
          return data2 === void 0 ? this : this.each(function() {
            var queue = jQuery.queue(this, type, data2);
            jQuery._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
        },
        dequeue: function(type) {
          return this.each(function() {
            jQuery.dequeue(this, type);
          });
        },
        clearQueue: function(type) {
          return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
          var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
            if (!--count) {
              defer.resolveWith(elements, [elements]);
            }
          };
          if (typeof type !== "string") {
            obj = type;
            type = void 0;
          }
          type = type || "fx";
          while (i--) {
            tmp = dataPriv.get(elements[i], type + "queueHooks");
            if (tmp && tmp.empty) {
              count++;
              tmp.empty.add(resolve);
            }
          }
          resolve();
          return defer.promise(obj);
        }
      });
      var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
      var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
      var cssExpand = ["Top", "Right", "Bottom", "Left"];
      var documentElement = document2.documentElement;
      var isAttached = function(elem) {
        return jQuery.contains(elem.ownerDocument, elem);
      }, composed = { composed: true };
      if (documentElement.getRootNode) {
        isAttached = function(elem) {
          return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
        };
      }
      var isHiddenWithinTree = function(elem, el) {
        elem = el || elem;
        return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
        // Support: Firefox <=43 - 45
        // Disconnected elements can have computed display: none, so first confirm that elem is
        // in the document.
        isAttached(elem) && jQuery.css(elem, "display") === "none";
      };
      function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
          initial = initial / 2;
          unit = unit || initialInUnit[3];
          initialInUnit = +initial || 1;
          while (maxIterations--) {
            jQuery.style(elem, prop, initialInUnit + unit);
            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
              maxIterations = 0;
            }
            initialInUnit = initialInUnit / scale;
          }
          initialInUnit = initialInUnit * 2;
          jQuery.style(elem, prop, initialInUnit + unit);
          valueParts = valueParts || [];
        }
        if (valueParts) {
          initialInUnit = +initialInUnit || +initial || 0;
          adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
          if (tween) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
          }
        }
        return adjusted;
      }
      var defaultDisplayMap = {};
      function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
        if (display) {
          return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName2));
        display = jQuery.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
          display = "block";
        }
        defaultDisplayMap[nodeName2] = display;
        return display;
      }
      function showHide(elements, show) {
        var display, elem, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
          elem = elements[index];
          if (!elem.style) {
            continue;
          }
          display = elem.style.display;
          if (show) {
            if (display === "none") {
              values[index] = dataPriv.get(elem, "display") || null;
              if (!values[index]) {
                elem.style.display = "";
              }
            }
            if (elem.style.display === "" && isHiddenWithinTree(elem)) {
              values[index] = getDefaultDisplay(elem);
            }
          } else {
            if (display !== "none") {
              values[index] = "none";
              dataPriv.set(elem, "display", display);
            }
          }
        }
        for (index = 0; index < length; index++) {
          if (values[index] != null) {
            elements[index].style.display = values[index];
          }
        }
        return elements;
      }
      jQuery.fn.extend({
        show: function() {
          return showHide(this, true);
        },
        hide: function() {
          return showHide(this);
        },
        toggle: function(state) {
          if (typeof state === "boolean") {
            return state ? this.show() : this.hide();
          }
          return this.each(function() {
            if (isHiddenWithinTree(this)) {
              jQuery(this).show();
            } else {
              jQuery(this).hide();
            }
          });
        }
      });
      var rcheckableType = /^(?:checkbox|radio)$/i;
      var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
      (function() {
        var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
      })();
      var wrapMap = {
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
      wrapMap.th = wrapMap.td;
      if (!support.option) {
        wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
      }
      function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
          ret = context.getElementsByTagName(tag || "*");
        } else if (typeof context.querySelectorAll !== "undefined") {
          ret = context.querySelectorAll(tag || "*");
        } else {
          ret = [];
        }
        if (tag === void 0 || tag && nodeName(context, tag)) {
          return jQuery.merge([context], ret);
        }
        return ret;
      }
      function setGlobalEval(elems, refElements) {
        var i = 0, l = elems.length;
        for (; i < l; i++) {
          dataPriv.set(
            elems[i],
            "globalEval",
            !refElements || dataPriv.get(refElements[i], "globalEval")
          );
        }
      }
      var rhtml = /<|&#?\w+;/;
      function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
          elem = elems[i];
          if (elem || elem === 0) {
            if (toType(elem) === "object") {
              jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
            } else if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem));
            } else {
              tmp = tmp || fragment.appendChild(context.createElement("div"));
              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
              j = wrap[0];
              while (j--) {
                tmp = tmp.lastChild;
              }
              jQuery.merge(nodes, tmp.childNodes);
              tmp = fragment.firstChild;
              tmp.textContent = "";
            }
          }
        }
        fragment.textContent = "";
        i = 0;
        while (elem = nodes[i++]) {
          if (selection && jQuery.inArray(elem, selection) > -1) {
            if (ignored) {
              ignored.push(elem);
            }
            continue;
          }
          attached = isAttached(elem);
          tmp = getAll(fragment.appendChild(elem), "script");
          if (attached) {
            setGlobalEval(tmp);
          }
          if (scripts) {
            j = 0;
            while (elem = tmp[j++]) {
              if (rscriptType.test(elem.type || "")) {
                scripts.push(elem);
              }
            }
          }
        }
        return fragment;
      }
      var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
      function returnTrue() {
        return true;
      }
      function returnFalse() {
        return false;
      }
      function on(elem, types, selector, data2, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
          if (typeof selector !== "string") {
            data2 = data2 || selector;
            selector = void 0;
          }
          for (type in types) {
            on(elem, type, selector, data2, types[type], one);
          }
          return elem;
        }
        if (data2 == null && fn == null) {
          fn = selector;
          data2 = selector = void 0;
        } else if (fn == null) {
          if (typeof selector === "string") {
            fn = data2;
            data2 = void 0;
          } else {
            fn = data2;
            data2 = selector;
            selector = void 0;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return elem;
        }
        if (one === 1) {
          origFn = fn;
          fn = function(event) {
            jQuery().off(event);
            return origFn.apply(this, arguments);
          };
          fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function() {
          jQuery.event.add(this, types, fn, data2, selector);
        });
      }
      jQuery.event = {
        global: {},
        add: function(elem, types, handler, data2, selector) {
          var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
          if (!acceptData(elem)) {
            return;
          }
          if (handler.handler) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
          }
          if (selector) {
            jQuery.find.matchesSelector(documentElement, selector);
          }
          if (!handler.guid) {
            handler.guid = jQuery.guid++;
          }
          if (!(events = elemData.events)) {
            events = elemData.events = /* @__PURE__ */ Object.create(null);
          }
          if (!(eventHandle = elemData.handle)) {
            eventHandle = elemData.handle = function(e) {
              return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            };
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery.event.special[type] || {};
            handleObj = jQuery.extend({
              type,
              origType,
              data: data2,
              handler,
              guid: handler.guid,
              selector,
              needsContext: selector && jQuery.expr.match.needsContext.test(selector),
              namespace: namespaces.join(".")
            }, handleObjIn);
            if (!(handlers = events[type])) {
              handlers = events[type] = [];
              handlers.delegateCount = 0;
              if (!special.setup || special.setup.call(elem, data2, namespaces, eventHandle) === false) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle);
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }
            jQuery.event.global[type] = true;
          }
        },
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
          var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
          if (!elemData || !(events = elemData.events)) {
            return;
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              for (type in events) {
                jQuery.event.remove(elem, type + types[t], handler, selector, true);
              }
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            while (j--) {
              handleObj = handlers[j];
              if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                jQuery.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          }
          if (jQuery.isEmptyObject(events)) {
            dataPriv.remove(elem, "handle events");
          }
        },
        dispatch: function(nativeEvent) {
          var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
          args[0] = event;
          for (i = 1; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
          event.delegateTarget = this;
          if (special.preDispatch && special.preDispatch.call(this, event) === false) {
            return;
          }
          handlerQueue = jQuery.event.handlers.call(this, event, handlers);
          i = 0;
          while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
            event.currentTarget = matched.elem;
            j = 0;
            while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
              if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                event.handleObj = handleObj;
                event.data = handleObj.data;
                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                if (ret !== void 0) {
                  if ((event.result = ret) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }
              }
            }
          }
          if (special.postDispatch) {
            special.postDispatch.call(this, event);
          }
          return event.result;
        },
        handlers: function(event, handlers) {
          var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
          if (delegateCount && // Support: IE <=9
          // Black-hole SVG <use> instance trees (trac-13180)
          cur.nodeType && // Support: Firefox <=42
          // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
          // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
          // Support: IE 11 only
          // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
          !(event.type === "click" && event.button >= 1)) {
            for (; cur !== this; cur = cur.parentNode || this) {
              if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                matchedHandlers = [];
                matchedSelectors = {};
                for (i = 0; i < delegateCount; i++) {
                  handleObj = handlers[i];
                  sel = handleObj.selector + " ";
                  if (matchedSelectors[sel] === void 0) {
                    matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                  }
                  if (matchedSelectors[sel]) {
                    matchedHandlers.push(handleObj);
                  }
                }
                if (matchedHandlers.length) {
                  handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                }
              }
            }
          }
          cur = this;
          if (delegateCount < handlers.length) {
            handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
          }
          return handlerQueue;
        },
        addProp: function(name, hook) {
          Object.defineProperty(jQuery.Event.prototype, name, {
            enumerable: true,
            configurable: true,
            get: isFunction(hook) ? function() {
              if (this.originalEvent) {
                return hook(this.originalEvent);
              }
            } : function() {
              if (this.originalEvent) {
                return this.originalEvent[name];
              }
            },
            set: function(value) {
              Object.defineProperty(this, name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value
              });
            }
          });
        },
        fix: function(originalEvent) {
          return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
          load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
          },
          click: {
            // Utilize native event to ensure correct state for checkable inputs
            setup: function(data2) {
              var el = this || data2;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click", true);
              }
              return false;
            },
            trigger: function(data2) {
              var el = this || data2;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click");
              }
              return true;
            },
            // For cross-browser consistency, suppress native .click() on links
            // Also prevent it if we're currently inside a leveraged native-event stack
            _default: function(event) {
              var target = event.target;
              return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
            }
          },
          beforeunload: {
            postDispatch: function(event) {
              if (event.result !== void 0 && event.originalEvent) {
                event.originalEvent.returnValue = event.result;
              }
            }
          }
        }
      };
      function leverageNative(el, type, isSetup) {
        if (!isSetup) {
          if (dataPriv.get(el, type) === void 0) {
            jQuery.event.add(el, type, returnTrue);
          }
          return;
        }
        dataPriv.set(el, type, false);
        jQuery.event.add(el, type, {
          namespace: false,
          handler: function(event) {
            var result, saved = dataPriv.get(this, type);
            if (event.isTrigger & 1 && this[type]) {
              if (!saved) {
                saved = slice.call(arguments);
                dataPriv.set(this, type, saved);
                this[type]();
                result = dataPriv.get(this, type);
                dataPriv.set(this, type, false);
                if (saved !== result) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  return result;
                }
              } else if ((jQuery.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }
            } else if (saved) {
              dataPriv.set(this, type, jQuery.event.trigger(
                saved[0],
                saved.slice(1),
                this
              ));
              event.stopPropagation();
              event.isImmediatePropagationStopped = returnTrue;
            }
          }
        });
      }
      jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(type, handle);
        }
      };
      jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
          return new jQuery.Event(src, props);
        }
        if (src && src.type) {
          this.originalEvent = src;
          this.type = src.type;
          this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
          src.returnValue === false ? returnTrue : returnFalse;
          this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
          this.currentTarget = src.currentTarget;
          this.relatedTarget = src.relatedTarget;
        } else {
          this.type = src;
        }
        if (props) {
          jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || Date.now();
        this[jQuery.expando] = true;
      };
      jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function() {
          var e = this.originalEvent;
          this.isDefaultPrevented = returnTrue;
          if (e && !this.isSimulated) {
            e.preventDefault();
          }
        },
        stopPropagation: function() {
          var e = this.originalEvent;
          this.isPropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopPropagation();
          }
        },
        stopImmediatePropagation: function() {
          var e = this.originalEvent;
          this.isImmediatePropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopImmediatePropagation();
          }
          this.stopPropagation();
        }
      };
      jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
      }, jQuery.event.addProp);
      jQuery.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
        function focusMappedHandler(nativeEvent) {
          if (document2.documentMode) {
            var handle = dataPriv.get(this, "handle"), event = jQuery.event.fix(nativeEvent);
            event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
            event.isSimulated = true;
            handle(nativeEvent);
            if (event.target === event.currentTarget) {
              handle(event);
            }
          } else {
            jQuery.event.simulate(
              delegateType,
              nativeEvent.target,
              jQuery.event.fix(nativeEvent)
            );
          }
        }
        jQuery.event.special[type] = {
          // Utilize native event if possible so blur/focus sequence is correct
          setup: function() {
            var attaches;
            leverageNative(this, type, true);
            if (document2.documentMode) {
              attaches = dataPriv.get(this, delegateType);
              if (!attaches) {
                this.addEventListener(delegateType, focusMappedHandler);
              }
              dataPriv.set(this, delegateType, (attaches || 0) + 1);
            } else {
              return false;
            }
          },
          trigger: function() {
            leverageNative(this, type);
            return true;
          },
          teardown: function() {
            var attaches;
            if (document2.documentMode) {
              attaches = dataPriv.get(this, delegateType) - 1;
              if (!attaches) {
                this.removeEventListener(delegateType, focusMappedHandler);
                dataPriv.remove(this, delegateType);
              } else {
                dataPriv.set(this, delegateType, attaches);
              }
            } else {
              return false;
            }
          },
          // Suppress native focus or blur if we're currently inside
          // a leveraged native-event stack
          _default: function(event) {
            return dataPriv.get(event.target, type);
          },
          delegateType
        };
        jQuery.event.special[delegateType] = {
          setup: function() {
            var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
            if (!attaches) {
              if (document2.documentMode) {
                this.addEventListener(delegateType, focusMappedHandler);
              } else {
                doc.addEventListener(type, focusMappedHandler, true);
              }
            }
            dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
          },
          teardown: function() {
            var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
            if (!attaches) {
              if (document2.documentMode) {
                this.removeEventListener(delegateType, focusMappedHandler);
              } else {
                doc.removeEventListener(type, focusMappedHandler, true);
              }
              dataPriv.remove(dataHolder, delegateType);
            } else {
              dataPriv.set(dataHolder, delegateType, attaches);
            }
          }
        };
      });
      jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function(orig, fix) {
        jQuery.event.special[orig] = {
          delegateType: fix,
          bindType: fix,
          handle: function(event) {
            var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
            if (!related || related !== target && !jQuery.contains(target, related)) {
              event.type = handleObj.origType;
              ret = handleObj.handler.apply(this, arguments);
              event.type = fix;
            }
            return ret;
          }
        };
      });
      jQuery.fn.extend({
        on: function(types, selector, data2, fn) {
          return on(this, types, selector, data2, fn);
        },
        one: function(types, selector, data2, fn) {
          return on(this, types, selector, data2, fn, 1);
        },
        off: function(types, selector, fn) {
          var handleObj, type;
          if (types && types.preventDefault && types.handleObj) {
            handleObj = types.handleObj;
            jQuery(types.delegateTarget).off(
              handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
              handleObj.selector,
              handleObj.handler
            );
            return this;
          }
          if (typeof types === "object") {
            for (type in types) {
              this.off(type, selector, types[type]);
            }
            return this;
          }
          if (selector === false || typeof selector === "function") {
            fn = selector;
            selector = void 0;
          }
          if (fn === false) {
            fn = returnFalse;
          }
          return this.each(function() {
            jQuery.event.remove(this, types, fn, selector);
          });
        }
      });
      var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
          return jQuery(elem).children("tbody")[0] || elem;
        }
        return elem;
      }
      function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
      }
      function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
          elem.type = elem.type.slice(5);
        } else {
          elem.removeAttribute("type");
        }
        return elem;
      }
      function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
          return;
        }
        if (dataPriv.hasData(src)) {
          pdataOld = dataPriv.get(src);
          events = pdataOld.events;
          if (events) {
            dataPriv.remove(dest, "handle events");
            for (type in events) {
              for (i = 0, l = events[type].length; i < l; i++) {
                jQuery.event.add(dest, type, events[type][i]);
              }
            }
          }
        }
        if (dataUser.hasData(src)) {
          udataOld = dataUser.access(src);
          udataCur = jQuery.extend({}, udataOld);
          dataUser.set(dest, udataCur);
        }
      }
      function fixInput(src, dest) {
        var nodeName2 = dest.nodeName.toLowerCase();
        if (nodeName2 === "input" && rcheckableType.test(src.type)) {
          dest.checked = src.checked;
        } else if (nodeName2 === "input" || nodeName2 === "textarea") {
          dest.defaultValue = src.defaultValue;
        }
      }
      function domManip(collection, args, callback, ignored) {
        args = flat(args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
        if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
          return collection.each(function(index) {
            var self2 = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self2.html());
            }
            domManip(self2, args, callback, ignored);
          });
        }
        if (l) {
          fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
          first = fragment.firstChild;
          if (fragment.childNodes.length === 1) {
            fragment = first;
          }
          if (first || ignored) {
            scripts = jQuery.map(getAll(fragment, "script"), disableScript);
            hasScripts = scripts.length;
            for (; i < l; i++) {
              node = fragment;
              if (i !== iNoClone) {
                node = jQuery.clone(node, true, true);
                if (hasScripts) {
                  jQuery.merge(scripts, getAll(node, "script"));
                }
              }
              callback.call(collection[i], node, i);
            }
            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;
              jQuery.map(scripts, restoreScript);
              for (i = 0; i < hasScripts; i++) {
                node = scripts[i];
                if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                  if (node.src && (node.type || "").toLowerCase() !== "module") {
                    if (jQuery._evalUrl && !node.noModule) {
                      jQuery._evalUrl(node.src, {
                        nonce: node.nonce || node.getAttribute("nonce")
                      }, doc);
                    }
                  } else {
                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                  }
                }
              }
            }
          }
        }
        return collection;
      }
      function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
        for (; (node = nodes[i]) != null; i++) {
          if (!keepData && node.nodeType === 1) {
            jQuery.cleanData(getAll(node));
          }
          if (node.parentNode) {
            if (keepData && isAttached(node)) {
              setGlobalEval(getAll(node, "script"));
            }
            node.parentNode.removeChild(node);
          }
        }
        return elem;
      }
      jQuery.extend({
        htmlPrefilter: function(html) {
          return html;
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
          var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
          if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
            destElements = getAll(clone);
            srcElements = getAll(elem);
            for (i = 0, l = srcElements.length; i < l; i++) {
              fixInput(srcElements[i], destElements[i]);
            }
          }
          if (dataAndEvents) {
            if (deepDataAndEvents) {
              srcElements = srcElements || getAll(elem);
              destElements = destElements || getAll(clone);
              for (i = 0, l = srcElements.length; i < l; i++) {
                cloneCopyEvent(srcElements[i], destElements[i]);
              }
            } else {
              cloneCopyEvent(elem, clone);
            }
          }
          destElements = getAll(clone, "script");
          if (destElements.length > 0) {
            setGlobalEval(destElements, !inPage && getAll(elem, "script"));
          }
          return clone;
        },
        cleanData: function(elems) {
          var data2, elem, type, special = jQuery.event.special, i = 0;
          for (; (elem = elems[i]) !== void 0; i++) {
            if (acceptData(elem)) {
              if (data2 = elem[dataPriv.expando]) {
                if (data2.events) {
                  for (type in data2.events) {
                    if (special[type]) {
                      jQuery.event.remove(elem, type);
                    } else {
                      jQuery.removeEvent(elem, type, data2.handle);
                    }
                  }
                }
                elem[dataPriv.expando] = void 0;
              }
              if (elem[dataUser.expando]) {
                elem[dataUser.expando] = void 0;
              }
            }
          }
        }
      });
      jQuery.fn.extend({
        detach: function(selector) {
          return remove(this, selector, true);
        },
        remove: function(selector) {
          return remove(this, selector);
        },
        text: function(value) {
          return access(this, function(value2) {
            return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value2;
              }
            });
          }, null, value, arguments.length);
        },
        append: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.appendChild(elem);
            }
          });
        },
        prepend: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.insertBefore(elem, target.firstChild);
            }
          });
        },
        before: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this);
            }
          });
        },
        after: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this.nextSibling);
            }
          });
        },
        empty: function() {
          var elem, i = 0;
          for (; (elem = this[i]) != null; i++) {
            if (elem.nodeType === 1) {
              jQuery.cleanData(getAll(elem, false));
              elem.textContent = "";
            }
          }
          return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
          dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
          deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
          return this.map(function() {
            return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
          });
        },
        html: function(value) {
          return access(this, function(value2) {
            var elem = this[0] || {}, i = 0, l = this.length;
            if (value2 === void 0 && elem.nodeType === 1) {
              return elem.innerHTML;
            }
            if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
              value2 = jQuery.htmlPrefilter(value2);
              try {
                for (; i < l; i++) {
                  elem = this[i] || {};
                  if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.innerHTML = value2;
                  }
                }
                elem = 0;
              } catch (e) {
              }
            }
            if (elem) {
              this.empty().append(value2);
            }
          }, null, value, arguments.length);
        },
        replaceWith: function() {
          var ignored = [];
          return domManip(this, arguments, function(elem) {
            var parent = this.parentNode;
            if (jQuery.inArray(this, ignored) < 0) {
              jQuery.cleanData(getAll(this));
              if (parent) {
                parent.replaceChild(elem, this);
              }
            }
          }, ignored);
        }
      });
      jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function(name, original) {
        jQuery.fn[name] = function(selector) {
          var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
          for (; i <= last; i++) {
            elems = i === last ? this : this.clone(true);
            jQuery(insert[i])[original](elems);
            push.apply(ret, elems.get());
          }
          return this.pushStack(ret);
        };
      });
      var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
      var rcustomProp = /^--/;
      var getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
          view = window2;
        }
        return view.getComputedStyle(elem);
      };
      var swap = function(elem, options, callback) {
        var ret, name, old = {};
        for (name in options) {
          old[name] = elem.style[name];
          elem.style[name] = options[name];
        }
        ret = callback.call(elem);
        for (name in options) {
          elem.style[name] = old[name];
        }
        return ret;
      };
      var rboxStyle = new RegExp(cssExpand.join("|"), "i");
      (function() {
        function computeStyleTests() {
          if (!div) {
            return;
          }
          container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
          div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
          documentElement.appendChild(container).appendChild(div);
          var divStyle = window2.getComputedStyle(div);
          pixelPositionVal = divStyle.top !== "1%";
          reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
          div.style.right = "60%";
          pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
          boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
          div.style.position = "absolute";
          scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
          documentElement.removeChild(container);
          div = null;
        }
        function roundPixelMeasures(measure) {
          return Math.round(parseFloat(measure));
        }
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
        if (!div.style) {
          return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery.extend(support, {
          boxSizingReliable: function() {
            computeStyleTests();
            return boxSizingReliableVal;
          },
          pixelBoxStyles: function() {
            computeStyleTests();
            return pixelBoxStylesVal;
          },
          pixelPosition: function() {
            computeStyleTests();
            return pixelPositionVal;
          },
          reliableMarginLeft: function() {
            computeStyleTests();
            return reliableMarginLeftVal;
          },
          scrollboxSize: function() {
            computeStyleTests();
            return scrollboxSizeVal;
          },
          // Support: IE 9 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Behavior in IE 9 is more subtle than in newer versions & it passes
          // some versions of this test; make sure not to make it pass there!
          //
          // Support: Firefox 70+
          // Only Firefox includes border widths
          // in computed dimensions. (gh-4529)
          reliableTrDimensions: function() {
            var table, tr, trChild, trStyle;
            if (reliableTrDimensionsVal == null) {
              table = document2.createElement("table");
              tr = document2.createElement("tr");
              trChild = document2.createElement("div");
              table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
              tr.style.cssText = "box-sizing:content-box;border:1px solid";
              tr.style.height = "1px";
              trChild.style.height = "9px";
              trChild.style.display = "block";
              documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
              trStyle = window2.getComputedStyle(tr);
              reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
              documentElement.removeChild(table);
            }
            return reliableTrDimensionsVal;
          }
        });
      })();
      function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
          ret = computed.getPropertyValue(name) || computed[name];
          if (isCustomProp && ret) {
            ret = ret.replace(rtrimCSS, "$1") || void 0;
          }
          if (ret === "" && !isAttached(elem)) {
            ret = jQuery.style(elem, name);
          }
          if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;
            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;
            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        return ret !== void 0 ? (
          // Support: IE <=9 - 11 only
          // IE returns zIndex value as an integer.
          ret + ""
        ) : ret;
      }
      function addGetHookIf(conditionFn, hookFn) {
        return {
          get: function() {
            if (conditionFn()) {
              delete this.get;
              return;
            }
            return (this.get = hookFn).apply(this, arguments);
          }
        };
      }
      var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
      function vendorPropName(name) {
        var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
        while (i--) {
          name = cssPrefixes[i] + capName;
          if (name in emptyStyle) {
            return name;
          }
        }
      }
      function finalPropName(name) {
        var final = jQuery.cssProps[name] || vendorProps[name];
        if (final) {
          return final;
        }
        if (name in emptyStyle) {
          return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
      }
      var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      };
      function setPositiveNumber(_elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? (
          // Guard against undefined "subtract", e.g., when used as in cssHooks
          Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
        ) : value;
      }
      function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
        if (box === (isBorderBox ? "border" : "content")) {
          return 0;
        }
        for (; i < 4; i += 2) {
          if (box === "margin") {
            marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
          }
          if (!isBorderBox) {
            delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
            if (box !== "padding") {
              delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            } else {
              extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
          } else {
            if (box === "content") {
              delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
            }
            if (box !== "margin") {
              delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
          }
        }
        if (!isBorderBox && computedVal >= 0) {
          delta += Math.max(0, Math.ceil(
            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
            // Use an explicit zero to avoid NaN (gh-3964)
          )) || 0;
        }
        return delta + marginDelta;
      }
      function getWidthOrHeight(elem, dimension, extra) {
        var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
        if (rnumnonpx.test(val)) {
          if (!extra) {
            return val;
          }
          val = "auto";
        }
        if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Interestingly, in some cases IE 9 doesn't suffer from this issue.
        !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        val === "auto" || // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
        elem.getClientRects().length) {
          isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
          valueIsBorderBox = offsetProp in elem;
          if (valueIsBorderBox) {
            val = elem[offsetProp];
          }
        }
        val = parseFloat(val) || 0;
        return val + boxModelAdjustment(
          elem,
          dimension,
          extra || (isBorderBox ? "border" : "content"),
          valueIsBorderBox,
          styles,
          // Provide the current computed size to request scroll gutter calculation (gh-3589)
          val
        ) + "px";
      }
      jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
          opacity: {
            get: function(elem, computed) {
              if (computed) {
                var ret = curCSS(elem, "opacity");
                return ret === "" ? "1" : ret;
              }
            }
          }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
          animationIterationCount: true,
          aspectRatio: true,
          borderImageSlice: true,
          columnCount: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          gridArea: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnStart: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowStart: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          scale: true,
          widows: true,
          zIndex: true,
          zoom: true,
          // SVG-related
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeMiterlimit: true,
          strokeOpacity: true
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {
          if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
          }
          var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
          if (value !== void 0) {
            type = typeof value;
            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
              value = adjustCSS(elem, name, ret);
              type = "number";
            }
            if (value == null || value !== value) {
              return;
            }
            if (type === "number" && !isCustomProp) {
              value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
            }
            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
              style[name] = "inherit";
            }
            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
              if (isCustomProp) {
                style.setProperty(name, value);
              } else {
                style[name] = value;
              }
            }
          } else {
            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
              return ret;
            }
            return style[name];
          }
        },
        css: function(elem, name, extra, styles) {
          var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
          if (hooks && "get" in hooks) {
            val = hooks.get(elem, true, extra);
          }
          if (val === void 0) {
            val = curCSS(elem, name, styles);
          }
          if (val === "normal" && name in cssNormalTransform) {
            val = cssNormalTransform[name];
          }
          if (extra === "" || extra) {
            num = parseFloat(val);
            return extra === true || isFinite(num) ? num || 0 : val;
          }
          return val;
        }
      });
      jQuery.each(["height", "width"], function(_i, dimension) {
        jQuery.cssHooks[dimension] = {
          get: function(elem, computed, extra) {
            if (computed) {
              return rdisplayswap.test(jQuery.css(elem, "display")) && // Support: Safari 8+
              // Table columns in Safari have non-zero offsetWidth & zero
              // getBoundingClientRect().width unless display is changed.
              // Support: IE <=11 only
              // Running getBoundingClientRect on a disconnected node
              // in IE throws an error.
              (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, dimension, extra);
              }) : getWidthOrHeight(elem, dimension, extra);
            }
          },
          set: function(elem, value, extra) {
            var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
              elem,
              dimension,
              extra,
              isBorderBox,
              styles
            ) : 0;
            if (isBorderBox && scrollboxSizeBuggy) {
              subtract -= Math.ceil(
                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
              );
            }
            if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
              elem.style[dimension] = value;
              value = jQuery.css(elem, dimension);
            }
            return setPositiveNumber(elem, value, subtract);
          }
        };
      });
      jQuery.cssHooks.marginLeft = addGetHookIf(
        support.reliableMarginLeft,
        function(elem, computed) {
          if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
              return elem.getBoundingClientRect().left;
            })) + "px";
          }
        }
      );
      jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
          expand: function(value) {
            var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
            for (; i < 4; i++) {
              expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
            }
            return expanded;
          }
        };
        if (prefix !== "margin") {
          jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
      });
      jQuery.fn.extend({
        css: function(name, value) {
          return access(this, function(elem, name2, value2) {
            var styles, len, map = {}, i = 0;
            if (Array.isArray(name2)) {
              styles = getStyles(elem);
              len = name2.length;
              for (; i < len; i++) {
                map[name2[i]] = jQuery.css(elem, name2[i], false, styles);
              }
              return map;
            }
            return value2 !== void 0 ? jQuery.style(elem, name2, value2) : jQuery.css(elem, name2);
          }, name, value, arguments.length > 1);
        }
      });
      function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
      }
      jQuery.Tween = Tween;
      Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
          this.elem = elem;
          this.prop = prop;
          this.easing = easing || jQuery.easing._default;
          this.options = options;
          this.start = this.now = this.cur();
          this.end = end;
          this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
          var hooks = Tween.propHooks[this.prop];
          return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
          var eased, hooks = Tween.propHooks[this.prop];
          if (this.options.duration) {
            this.pos = eased = jQuery.easing[this.easing](
              percent,
              this.options.duration * percent,
              0,
              1,
              this.options.duration
            );
          } else {
            this.pos = eased = percent;
          }
          this.now = (this.end - this.start) * eased + this.start;
          if (this.options.step) {
            this.options.step.call(this.elem, this.now, this);
          }
          if (hooks && hooks.set) {
            hooks.set(this);
          } else {
            Tween.propHooks._default.set(this);
          }
          return this;
        }
      };
      Tween.prototype.init.prototype = Tween.prototype;
      Tween.propHooks = {
        _default: {
          get: function(tween) {
            var result;
            if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
              return tween.elem[tween.prop];
            }
            result = jQuery.css(tween.elem, tween.prop, "");
            return !result || result === "auto" ? 0 : result;
          },
          set: function(tween) {
            if (jQuery.fx.step[tween.prop]) {
              jQuery.fx.step[tween.prop](tween);
            } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
              jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            } else {
              tween.elem[tween.prop] = tween.now;
            }
          }
        }
      };
      Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
          if (tween.elem.nodeType && tween.elem.parentNode) {
            tween.elem[tween.prop] = tween.now;
          }
        }
      };
      jQuery.easing = {
        linear: function(p) {
          return p;
        },
        swing: function(p) {
          return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
      };
      jQuery.fx = Tween.prototype.init;
      jQuery.fx.step = {};
      var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
      function schedule() {
        if (inProgress) {
          if (document2.hidden === false && window2.requestAnimationFrame) {
            window2.requestAnimationFrame(schedule);
          } else {
            window2.setTimeout(schedule, jQuery.fx.interval);
          }
          jQuery.fx.tick();
        }
      }
      function createFxNow() {
        window2.setTimeout(function() {
          fxNow = void 0;
        });
        return fxNow = Date.now();
      }
      function genFx(type, includeWidth) {
        var which, i = 0, attrs = { height: type };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
          which = cssExpand[i];
          attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
          attrs.opacity = attrs.width = type;
        }
        return attrs;
      }
      function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
        for (; index < length; index++) {
          if (tween = collection[index].call(animation, prop, value)) {
            return tween;
          }
        }
      }
      function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
          hooks = jQuery._queueHooks(elem, "fx");
          if (hooks.unqueued == null) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function() {
              if (!hooks.unqueued) {
                oldfire();
              }
            };
          }
          hooks.unqueued++;
          anim.always(function() {
            anim.always(function() {
              hooks.unqueued--;
              if (!jQuery.queue(elem, "fx").length) {
                hooks.empty.fire();
              }
            });
          });
        }
        for (prop in props) {
          value = props[prop];
          if (rfxtypes.test(value)) {
            delete props[prop];
            toggle = toggle || value === "toggle";
            if (value === (hidden ? "hide" : "show")) {
              if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                hidden = true;
              } else {
                continue;
              }
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
          }
        }
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
          return;
        }
        if (isBox && elem.nodeType === 1) {
          opts.overflow = [style.overflow, style.overflowX, style.overflowY];
          restoreDisplay = dataShow && dataShow.display;
          if (restoreDisplay == null) {
            restoreDisplay = dataPriv.get(elem, "display");
          }
          display = jQuery.css(elem, "display");
          if (display === "none") {
            if (restoreDisplay) {
              display = restoreDisplay;
            } else {
              showHide([elem], true);
              restoreDisplay = elem.style.display || restoreDisplay;
              display = jQuery.css(elem, "display");
              showHide([elem]);
            }
          }
          if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
            if (jQuery.css(elem, "float") === "none") {
              if (!propTween) {
                anim.done(function() {
                  style.display = restoreDisplay;
                });
                if (restoreDisplay == null) {
                  display = style.display;
                  restoreDisplay = display === "none" ? "" : display;
                }
              }
              style.display = "inline-block";
            }
          }
        }
        if (opts.overflow) {
          style.overflow = "hidden";
          anim.always(function() {
            style.overflow = opts.overflow[0];
            style.overflowX = opts.overflow[1];
            style.overflowY = opts.overflow[2];
          });
        }
        propTween = false;
        for (prop in orig) {
          if (!propTween) {
            if (dataShow) {
              if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
              }
            } else {
              dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
            }
            if (toggle) {
              dataShow.hidden = !hidden;
            }
            if (hidden) {
              showHide([elem], true);
            }
            anim.done(function() {
              if (!hidden) {
                showHide([elem]);
              }
              dataPriv.remove(elem, "fxshow");
              for (prop in orig) {
                jQuery.style(elem, prop, orig[prop]);
              }
            });
          }
          propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
          if (!(prop in dataShow)) {
            dataShow[prop] = propTween.start;
            if (hidden) {
              propTween.end = propTween.start;
              propTween.start = 0;
            }
          }
        }
      }
      function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
          name = camelCase(index);
          easing = specialEasing[name];
          value = props[index];
          if (Array.isArray(value)) {
            easing = value[1];
            value = props[index] = value[0];
          }
          if (index !== name) {
            props[name] = value;
            delete props[index];
          }
          hooks = jQuery.cssHooks[name];
          if (hooks && "expand" in hooks) {
            value = hooks.expand(value);
            delete props[name];
            for (index in value) {
              if (!(index in props)) {
                props[index] = value[index];
                specialEasing[index] = easing;
              }
            }
          } else {
            specialEasing[name] = easing;
          }
        }
      }
      function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }), tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length2) {
            return remaining;
          }
          if (!length2) {
            deferred.notifyWith(elem, [animation, 1, 0]);
          }
          deferred.resolveWith(elem, [animation]);
          return false;
        }, animation = deferred.promise({
          elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(
              elem,
              animation.opts,
              prop,
              end,
              animation.opts.specialEasing[prop] || animation.opts.easing
            );
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
          result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
          if (result) {
            if (isFunction(result.stop)) {
              jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
            }
            return result;
          }
        }
        jQuery.map(props, createTween, animation);
        if (isFunction(animation.opts.start)) {
          animation.opts.start.call(elem, animation);
        }
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        jQuery.fx.timer(
          jQuery.extend(tick, {
            elem,
            anim: animation,
            queue: animation.opts.queue
          })
        );
        return animation;
      }
      jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
          "*": [function(prop, value) {
            var tween = this.createTween(prop, value);
            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
            return tween;
          }]
        },
        tweener: function(props, callback) {
          if (isFunction(props)) {
            callback = props;
            props = ["*"];
          } else {
            props = props.match(rnothtmlwhite);
          }
          var prop, index = 0, length = props.length;
          for (; index < length; index++) {
            prop = props[index];
            Animation.tweeners[prop] = Animation.tweeners[prop] || [];
            Animation.tweeners[prop].unshift(callback);
          }
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
          if (prepend) {
            Animation.prefilters.unshift(callback);
          } else {
            Animation.prefilters.push(callback);
          }
        }
      });
      jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
          complete: fn || !fn && easing || isFunction(speed) && speed,
          duration: speed,
          easing: fn && easing || easing && !isFunction(easing) && easing
        };
        if (jQuery.fx.off) {
          opt.duration = 0;
        } else {
          if (typeof opt.duration !== "number") {
            if (opt.duration in jQuery.fx.speeds) {
              opt.duration = jQuery.fx.speeds[opt.duration];
            } else {
              opt.duration = jQuery.fx.speeds._default;
            }
          }
        }
        if (opt.queue == null || opt.queue === true) {
          opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
          if (isFunction(opt.old)) {
            opt.old.call(this);
          }
          if (opt.queue) {
            jQuery.dequeue(this, opt.queue);
          }
        };
        return opt;
      };
      jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
          return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
          var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
          doAnimation.finish = doAnimation;
          return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
          var stopQueue = function(hooks) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop(gotoEnd);
          };
          if (typeof type !== "string") {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = void 0;
          }
          if (clearQueue) {
            this.queue(type || "fx", []);
          }
          return this.each(function() {
            var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data2 = dataPriv.get(this);
            if (index) {
              if (data2[index] && data2[index].stop) {
                stopQueue(data2[index]);
              }
            } else {
              for (index in data2) {
                if (data2[index] && data2[index].stop && rrun.test(index)) {
                  stopQueue(data2[index]);
                }
              }
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                timers[index].anim.stop(gotoEnd);
                dequeue = false;
                timers.splice(index, 1);
              }
            }
            if (dequeue || !gotoEnd) {
              jQuery.dequeue(this, type);
            }
          });
        },
        finish: function(type) {
          if (type !== false) {
            type = type || "fx";
          }
          return this.each(function() {
            var index, data2 = dataPriv.get(this), queue = data2[type + "queue"], hooks = data2[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
            data2.finish = true;
            jQuery.queue(this, type, []);
            if (hooks && hooks.stop) {
              hooks.stop.call(this, true);
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && timers[index].queue === type) {
                timers[index].anim.stop(true);
                timers.splice(index, 1);
              }
            }
            for (index = 0; index < length; index++) {
              if (queue[index] && queue[index].finish) {
                queue[index].finish.call(this);
              }
            }
            delete data2.finish;
          });
        }
      });
      jQuery.each(["toggle", "show", "hide"], function(_i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
          return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
      });
      jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
      }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
          return this.animate(props, speed, easing, callback);
        };
      });
      jQuery.timers = [];
      jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = Date.now();
        for (; i < timers.length; i++) {
          timer = timers[i];
          if (!timer() && timers[i] === timer) {
            timers.splice(i--, 1);
          }
        }
        if (!timers.length) {
          jQuery.fx.stop();
        }
        fxNow = void 0;
      };
      jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
      };
      jQuery.fx.interval = 13;
      jQuery.fx.start = function() {
        if (inProgress) {
          return;
        }
        inProgress = true;
        schedule();
      };
      jQuery.fx.stop = function() {
        inProgress = null;
      };
      jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
      };
      jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
          var timeout = window2.setTimeout(next, time);
          hooks.stop = function() {
            window2.clearTimeout(timeout);
          };
        });
      };
      (function() {
        var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        input = document2.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
      })();
      var boolHook, attrHandle = jQuery.expr.attrHandle;
      jQuery.fn.extend({
        attr: function(name, value) {
          return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
          return this.each(function() {
            jQuery.removeAttr(this, name);
          });
        }
      });
      jQuery.extend({
        attr: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (typeof elem.getAttribute === "undefined") {
            return jQuery.prop(elem, name, value);
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0);
          }
          if (value !== void 0) {
            if (value === null) {
              jQuery.removeAttr(elem, name);
              return;
            }
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            elem.setAttribute(name, value + "");
            return value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          ret = jQuery.find.attr(elem, name);
          return ret == null ? void 0 : ret;
        },
        attrHooks: {
          type: {
            set: function(elem, value) {
              if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                var val = elem.value;
                elem.setAttribute("type", value);
                if (val) {
                  elem.value = val;
                }
                return value;
              }
            }
          }
        },
        removeAttr: function(elem, value) {
          var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
          if (attrNames && elem.nodeType === 1) {
            while (name = attrNames[i++]) {
              elem.removeAttribute(name);
            }
          }
        }
      });
      boolHook = {
        set: function(elem, value, name) {
          if (value === false) {
            jQuery.removeAttr(elem, name);
          } else {
            elem.setAttribute(name, name);
          }
          return name;
        }
      };
      jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name2, isXML) {
          var ret, handle, lowercaseName = name2.toLowerCase();
          if (!isXML) {
            handle = attrHandle[lowercaseName];
            attrHandle[lowercaseName] = ret;
            ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
            attrHandle[lowercaseName] = handle;
          }
          return ret;
        };
      });
      var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
      jQuery.fn.extend({
        prop: function(name, value) {
          return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
          return this.each(function() {
            delete this[jQuery.propFix[name] || name];
          });
        }
      });
      jQuery.extend({
        prop: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            name = jQuery.propFix[name] || name;
            hooks = jQuery.propHooks[name];
          }
          if (value !== void 0) {
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            return elem[name] = value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          return elem[name];
        },
        propHooks: {
          tabIndex: {
            get: function(elem) {
              var tabindex = jQuery.find.attr(elem, "tabindex");
              if (tabindex) {
                return parseInt(tabindex, 10);
              }
              if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                return 0;
              }
              return -1;
            }
          }
        },
        propFix: {
          "for": "htmlFor",
          "class": "className"
        }
      });
      if (!support.optSelected) {
        jQuery.propHooks.selected = {
          get: function(elem) {
            var parent = elem.parentNode;
            if (parent && parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
            return null;
          },
          set: function(elem) {
            var parent = elem.parentNode;
            if (parent) {
              parent.selectedIndex;
              if (parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
            }
          }
        };
      }
      jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
      ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
      });
      function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
      }
      function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
      }
      function classesToArray(value) {
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === "string") {
          return value.match(rnothtmlwhite) || [];
        }
        return [];
      }
      jQuery.fn.extend({
        addClass: function(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction(value)) {
            return this.each(function(j) {
              jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  if (cur.indexOf(" " + className + " ") < 0) {
                    cur += className + " ";
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        removeClass: function(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction(value)) {
            return this.each(function(j) {
              jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
          }
          if (!arguments.length) {
            return this.attr("class", "");
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  while (cur.indexOf(" " + className + " ") > -1) {
                    cur = cur.replace(" " + className + " ", " ");
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        toggleClass: function(value, stateVal) {
          var classNames, className, i, self2, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
          if (isFunction(value)) {
            return this.each(function(i2) {
              jQuery(this).toggleClass(
                value.call(this, i2, getClass(this), stateVal),
                stateVal
              );
            });
          }
          if (typeof stateVal === "boolean" && isValidValue) {
            return stateVal ? this.addClass(value) : this.removeClass(value);
          }
          classNames = classesToArray(value);
          return this.each(function() {
            if (isValidValue) {
              self2 = jQuery(this);
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];
                if (self2.hasClass(className)) {
                  self2.removeClass(className);
                } else {
                  self2.addClass(className);
                }
              }
            } else if (value === void 0 || type === "boolean") {
              className = getClass(this);
              if (className) {
                dataPriv.set(this, "__className__", className);
              }
              if (this.setAttribute) {
                this.setAttribute(
                  "class",
                  className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                );
              }
            }
          });
        },
        hasClass: function(selector) {
          var className, elem, i = 0;
          className = " " + selector + " ";
          while (elem = this[i++]) {
            if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
              return true;
            }
          }
          return false;
        }
      });
      var rreturn = /\r/g;
      jQuery.fn.extend({
        val: function(value) {
          var hooks, ret, valueIsFunction, elem = this[0];
          if (!arguments.length) {
            if (elem) {
              hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
              if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                return ret;
              }
              ret = elem.value;
              if (typeof ret === "string") {
                return ret.replace(rreturn, "");
              }
              return ret == null ? "" : ret;
            }
            return;
          }
          valueIsFunction = isFunction(value);
          return this.each(function(i) {
            var val;
            if (this.nodeType !== 1) {
              return;
            }
            if (valueIsFunction) {
              val = value.call(this, i, jQuery(this).val());
            } else {
              val = value;
            }
            if (val == null) {
              val = "";
            } else if (typeof val === "number") {
              val += "";
            } else if (Array.isArray(val)) {
              val = jQuery.map(val, function(value2) {
                return value2 == null ? "" : value2 + "";
              });
            }
            hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
            if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
              this.value = val;
            }
          });
        }
      });
      jQuery.extend({
        valHooks: {
          option: {
            get: function(elem) {
              var val = jQuery.find.attr(elem, "value");
              return val != null ? val : (
                // Support: IE <=10 - 11 only
                // option.text throws exceptions (trac-14686, trac-14858)
                // Strip and collapse whitespace
                // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                stripAndCollapse(jQuery.text(elem))
              );
            }
          },
          select: {
            get: function(elem) {
              var value, option2, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
              if (index < 0) {
                i = max;
              } else {
                i = one ? index : 0;
              }
              for (; i < max; i++) {
                option2 = options[i];
                if ((option2.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
                !option2.disabled && (!option2.parentNode.disabled || !nodeName(option2.parentNode, "optgroup"))) {
                  value = jQuery(option2).val();
                  if (one) {
                    return value;
                  }
                  values.push(value);
                }
              }
              return values;
            },
            set: function(elem, value) {
              var optionSet, option2, options = elem.options, values = jQuery.makeArray(value), i = options.length;
              while (i--) {
                option2 = options[i];
                if (option2.selected = jQuery.inArray(jQuery.valHooks.option.get(option2), values) > -1) {
                  optionSet = true;
                }
              }
              if (!optionSet) {
                elem.selectedIndex = -1;
              }
              return values;
            }
          }
        }
      });
      jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
          set: function(elem, value) {
            if (Array.isArray(value)) {
              return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
          }
        };
        if (!support.checkOn) {
          jQuery.valHooks[this].get = function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
          };
        }
      });
      var location2 = window2.location;
      var nonce = { guid: Date.now() };
      var rquery = /\?/;
      jQuery.parseXML = function(data2) {
        var xml, parserErrorElem;
        if (!data2 || typeof data2 !== "string") {
          return null;
        }
        try {
          xml = new window2.DOMParser().parseFromString(data2, "text/xml");
        } catch (e) {
        }
        parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
        if (!xml || parserErrorElem) {
          jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
            return el.textContent;
          }).join("\n") : data2));
        }
        return xml;
      };
      var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
        e.stopPropagation();
      };
      jQuery.extend(jQuery.event, {
        trigger: function(event, data2, elem, onlyHandlers) {
          var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
          cur = lastElement = tmp = elem = elem || document2;
          if (elem.nodeType === 3 || elem.nodeType === 8) {
            return;
          }
          if (rfocusMorph.test(type + jQuery.event.triggered)) {
            return;
          }
          if (type.indexOf(".") > -1) {
            namespaces = type.split(".");
            type = namespaces.shift();
            namespaces.sort();
          }
          ontype = type.indexOf(":") < 0 && "on" + type;
          event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
          event.isTrigger = onlyHandlers ? 2 : 3;
          event.namespace = namespaces.join(".");
          event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
          event.result = void 0;
          if (!event.target) {
            event.target = elem;
          }
          data2 = data2 == null ? [event] : jQuery.makeArray(data2, [event]);
          special = jQuery.event.special[type] || {};
          if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data2) === false) {
            return;
          }
          if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
            bubbleType = special.delegateType || type;
            if (!rfocusMorph.test(bubbleType + type)) {
              cur = cur.parentNode;
            }
            for (; cur; cur = cur.parentNode) {
              eventPath.push(cur);
              tmp = cur;
            }
            if (tmp === (elem.ownerDocument || document2)) {
              eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
            }
          }
          i = 0;
          while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
            lastElement = cur;
            event.type = i > 1 ? bubbleType : special.bindType || type;
            handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
            if (handle) {
              handle.apply(cur, data2);
            }
            handle = ontype && cur[ontype];
            if (handle && handle.apply && acceptData(cur)) {
              event.result = handle.apply(cur, data2);
              if (event.result === false) {
                event.preventDefault();
              }
            }
          }
          event.type = type;
          if (!onlyHandlers && !event.isDefaultPrevented()) {
            if ((!special._default || special._default.apply(eventPath.pop(), data2) === false) && acceptData(elem)) {
              if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                tmp = elem[ontype];
                if (tmp) {
                  elem[ontype] = null;
                }
                jQuery.event.triggered = type;
                if (event.isPropagationStopped()) {
                  lastElement.addEventListener(type, stopPropagationCallback);
                }
                elem[type]();
                if (event.isPropagationStopped()) {
                  lastElement.removeEventListener(type, stopPropagationCallback);
                }
                jQuery.event.triggered = void 0;
                if (tmp) {
                  elem[ontype] = tmp;
                }
              }
            }
          }
          return event.result;
        },
        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function(type, elem, event) {
          var e = jQuery.extend(
            new jQuery.Event(),
            event,
            {
              type,
              isSimulated: true
            }
          );
          jQuery.event.trigger(e, null, elem);
        }
      });
      jQuery.fn.extend({
        trigger: function(type, data2) {
          return this.each(function() {
            jQuery.event.trigger(type, data2, this);
          });
        },
        triggerHandler: function(type, data2) {
          var elem = this[0];
          if (elem) {
            return jQuery.event.trigger(type, data2, elem, true);
          }
        }
      });
      var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
      function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
          jQuery.each(obj, function(i, v) {
            if (traditional || rbracket.test(prefix)) {
              add(prefix, v);
            } else {
              buildParams(
                prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                v,
                traditional,
                add
              );
            }
          });
        } else if (!traditional && toType(obj) === "object") {
          for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
          }
        } else {
          add(prefix, obj);
        }
      }
      jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, valueOrFunction) {
          var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
        };
        if (a == null) {
          return "";
        }
        if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
          jQuery.each(a, function() {
            add(this.name, this.value);
          });
        } else {
          for (prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
          }
        }
        return s.join("&");
      };
      jQuery.fn.extend({
        serialize: function() {
          return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
          return this.map(function() {
            var elements = jQuery.prop(this, "elements");
            return elements ? jQuery.makeArray(elements) : this;
          }).filter(function() {
            var type = this.type;
            return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
          }).map(function(_i, elem) {
            var val = jQuery(this).val();
            if (val == null) {
              return null;
            }
            if (Array.isArray(val)) {
              return jQuery.map(val, function(val2) {
                return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
              });
            }
            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
          }).get();
        }
      });
      var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
      originAnchor.href = location2.href;
      function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
          if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
          }
          var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
          if (isFunction(func)) {
            while (dataType = dataTypes[i++]) {
              if (dataType[0] === "+") {
                dataType = dataType.slice(1) || "*";
                (structure[dataType] = structure[dataType] || []).unshift(func);
              } else {
                (structure[dataType] = structure[dataType] || []).push(func);
              }
            }
          }
        };
      }
      function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
          var selected;
          inspected[dataType] = true;
          jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
            var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
            if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
              options.dataTypes.unshift(dataTypeOrTransport);
              inspect(dataTypeOrTransport);
              return false;
            } else if (seekingTransport) {
              return !(selected = dataTypeOrTransport);
            }
          });
          return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
      }
      function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
          if (src[key] !== void 0) {
            (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
          }
        }
        if (deep) {
          jQuery.extend(true, target, deep);
        }
        return target;
      }
      function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
          dataTypes.shift();
          if (ct === void 0) {
            ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
          }
        }
        if (ct) {
          for (type in contents) {
            if (contents[type] && contents[type].test(ct)) {
              dataTypes.unshift(type);
              break;
            }
          }
        }
        if (dataTypes[0] in responses) {
          finalDataType = dataTypes[0];
        } else {
          for (type in responses) {
            if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
              finalDataType = type;
              break;
            }
            if (!firstDataType) {
              firstDataType = type;
            }
          }
          finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
          if (finalDataType !== dataTypes[0]) {
            dataTypes.unshift(finalDataType);
          }
          return responses[finalDataType];
        }
      }
      function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
          for (conv in s.converters) {
            converters[conv.toLowerCase()] = s.converters[conv];
          }
        }
        current = dataTypes.shift();
        while (current) {
          if (s.responseFields[current]) {
            jqXHR[s.responseFields[current]] = response;
          }
          if (!prev && isSuccess && s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
          }
          prev = current;
          current = dataTypes.shift();
          if (current) {
            if (current === "*") {
              current = prev;
            } else if (prev !== "*" && prev !== current) {
              conv = converters[prev + " " + current] || converters["* " + current];
              if (!conv) {
                for (conv2 in converters) {
                  tmp = conv2.split(" ");
                  if (tmp[1] === current) {
                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                    if (conv) {
                      if (conv === true) {
                        conv = converters[conv2];
                      } else if (converters[conv2] !== true) {
                        current = tmp[0];
                        dataTypes.unshift(tmp[1]);
                      }
                      break;
                    }
                  }
                }
              }
              if (conv !== true) {
                if (conv && s.throws) {
                  response = conv(response);
                } else {
                  try {
                    response = conv(response);
                  } catch (e) {
                    return {
                      state: "parsererror",
                      error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                  }
                }
              }
            }
          }
        }
        return { state: "success", data: response };
      }
      jQuery.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: location2.href,
          type: "GET",
          isLocal: rlocalProtocol.test(location2.protocol),
          global: true,
          processData: true,
          async: true,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          /*
          timeout: 0,
          data: null,
          dataType: null,
          username: null,
          password: null,
          cache: null,
          throws: false,
          traditional: false,
          headers: {},
          */
          accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          // Data converters
          // Keys separate source (or catchall "*") and destination types with a single space
          converters: {
            // Convert anything to text
            "* text": String,
            // Text to html (true = no transformation)
            "text html": true,
            // Evaluate text as a json expression
            "text json": JSON.parse,
            // Parse text as xml
            "text xml": jQuery.parseXML
          },
          // For options that shouldn't be deep extended:
          // you can add your own custom options here if
          // and when you create one that shouldn't be
          // deep extended (see ajaxExtend)
          flatOptions: {
            url: true,
            context: true
          }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
          return settings ? (
            // Building a settings object
            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
          ) : (
            // Extending ajaxSettings
            ajaxExtend(jQuery.ajaxSettings, target)
          );
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        // Main method
        ajax: function(url, options) {
          if (typeof url === "object") {
            options = url;
            url = void 0;
          }
          options = options || {};
          var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
            readyState: 0,
            // Builds headers hashtable if needed
            getResponseHeader: function(key) {
              var match;
              if (completed2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while (match = rheaders.exec(responseHeadersString)) {
                    responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                  }
                }
                match = responseHeaders[key.toLowerCase() + " "];
              }
              return match == null ? null : match.join(", ");
            },
            // Raw string
            getAllResponseHeaders: function() {
              return completed2 ? responseHeadersString : null;
            },
            // Caches the header
            setRequestHeader: function(name, value) {
              if (completed2 == null) {
                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            // Overrides response content-type header
            overrideMimeType: function(type) {
              if (completed2 == null) {
                s.mimeType = type;
              }
              return this;
            },
            // Status-dependent callbacks
            statusCode: function(map) {
              var code;
              if (map) {
                if (completed2) {
                  jqXHR.always(map[jqXHR.status]);
                } else {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                }
              }
              return this;
            },
            // Cancel the request
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
          deferred.promise(jqXHR);
          s.url = ((url || s.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
          s.type = options.method || options.type || s.method || s.type;
          s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
          if (s.crossDomain == null) {
            urlAnchor = document2.createElement("a");
            try {
              urlAnchor.href = s.url;
              urlAnchor.href = urlAnchor.href;
              s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
            } catch (e) {
              s.crossDomain = true;
            }
          }
          if (s.data && s.processData && typeof s.data !== "string") {
            s.data = jQuery.param(s.data, s.traditional);
          }
          inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
          if (completed2) {
            return jqXHR;
          }
          fireGlobals = jQuery.event && s.global;
          if (fireGlobals && jQuery.active++ === 0) {
            jQuery.event.trigger("ajaxStart");
          }
          s.type = s.type.toUpperCase();
          s.hasContent = !rnoContent.test(s.type);
          cacheURL = s.url.replace(rhash, "");
          if (!s.hasContent) {
            uncached = s.url.slice(cacheURL.length);
            if (s.data && (s.processData || typeof s.data === "string")) {
              cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
              delete s.data;
            }
            if (s.cache === false) {
              cacheURL = cacheURL.replace(rantiCache, "$1");
              uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
            }
            s.url = cacheURL + uncached;
          } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
            s.data = s.data.replace(r20, "+");
          }
          if (s.ifModified) {
            if (jQuery.lastModified[cacheURL]) {
              jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
            }
            if (jQuery.etag[cacheURL]) {
              jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
            }
          }
          if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
            jqXHR.setRequestHeader("Content-Type", s.contentType);
          }
          jqXHR.setRequestHeader(
            "Accept",
            s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
          );
          for (i in s.headers) {
            jqXHR.setRequestHeader(i, s.headers[i]);
          }
          if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
            return jqXHR.abort();
          }
          strAbort = "abort";
          completeDeferred.add(s.complete);
          jqXHR.done(s.success);
          jqXHR.fail(s.error);
          transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
          if (!transport) {
            done(-1, "No Transport");
          } else {
            jqXHR.readyState = 1;
            if (fireGlobals) {
              globalEventContext.trigger("ajaxSend", [jqXHR, s]);
            }
            if (completed2) {
              return jqXHR;
            }
            if (s.async && s.timeout > 0) {
              timeoutTimer = window2.setTimeout(function() {
                jqXHR.abort("timeout");
              }, s.timeout);
            }
            try {
              completed2 = false;
              transport.send(requestHeaders, done);
            } catch (e) {
              if (completed2) {
                throw e;
              }
              done(-1, e);
            }
          }
          function done(status, nativeStatusText, responses, headers) {
            var isSuccess, success, error, response, modified, statusText = nativeStatusText;
            if (completed2) {
              return;
            }
            completed2 = true;
            if (timeoutTimer) {
              window2.clearTimeout(timeoutTimer);
            }
            transport = void 0;
            responseHeadersString = headers || "";
            jqXHR.readyState = status > 0 ? 4 : 0;
            isSuccess = status >= 200 && status < 300 || status === 304;
            if (responses) {
              response = ajaxHandleResponses(s, jqXHR, responses);
            }
            if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
              s.converters["text script"] = function() {
              };
            }
            response = ajaxConvert(s, response, jqXHR, isSuccess);
            if (isSuccess) {
              if (s.ifModified) {
                modified = jqXHR.getResponseHeader("Last-Modified");
                if (modified) {
                  jQuery.lastModified[cacheURL] = modified;
                }
                modified = jqXHR.getResponseHeader("etag");
                if (modified) {
                  jQuery.etag[cacheURL] = modified;
                }
              }
              if (status === 204 || s.type === "HEAD") {
                statusText = "nocontent";
              } else if (status === 304) {
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                isSuccess = !error;
              }
            } else {
              error = statusText;
              if (status || !statusText) {
                statusText = "error";
                if (status < 0) {
                  status = 0;
                }
              }
            }
            jqXHR.status = status;
            jqXHR.statusText = (nativeStatusText || statusText) + "";
            if (isSuccess) {
              deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
            } else {
              deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
            }
            jqXHR.statusCode(statusCode);
            statusCode = void 0;
            if (fireGlobals) {
              globalEventContext.trigger(
                isSuccess ? "ajaxSuccess" : "ajaxError",
                [jqXHR, s, isSuccess ? success : error]
              );
            }
            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
            if (fireGlobals) {
              globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
              if (!--jQuery.active) {
                jQuery.event.trigger("ajaxStop");
              }
            }
          }
          return jqXHR;
        },
        getJSON: function(url, data2, callback) {
          return jQuery.get(url, data2, callback, "json");
        },
        getScript: function(url, callback) {
          return jQuery.get(url, void 0, callback, "script");
        }
      });
      jQuery.each(["get", "post"], function(_i, method) {
        jQuery[method] = function(url, data2, callback, type) {
          if (isFunction(data2)) {
            type = type || callback;
            callback = data2;
            data2 = void 0;
          }
          return jQuery.ajax(jQuery.extend({
            url,
            type: method,
            dataType: type,
            data: data2,
            success: callback
          }, jQuery.isPlainObject(url) && url));
        };
      });
      jQuery.ajaxPrefilter(function(s) {
        var i;
        for (i in s.headers) {
          if (i.toLowerCase() === "content-type") {
            s.contentType = s.headers[i] || "";
          }
        }
      });
      jQuery._evalUrl = function(url, options, doc) {
        return jQuery.ajax({
          url,
          // Make this explicit, since user can override this through ajaxSetup (trac-11264)
          type: "GET",
          dataType: "script",
          cache: true,
          async: false,
          global: false,
          // Only evaluate the response if it is successful (gh-4126)
          // dataFilter is not invoked for failure responses, so using it instead
          // of the default converter is kludgy but it works.
          converters: {
            "text script": function() {
            }
          },
          dataFilter: function(response) {
            jQuery.globalEval(response, options, doc);
          }
        });
      };
      jQuery.fn.extend({
        wrapAll: function(html) {
          var wrap;
          if (this[0]) {
            if (isFunction(html)) {
              html = html.call(this[0]);
            }
            wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
              wrap.insertBefore(this[0]);
            }
            wrap.map(function() {
              var elem = this;
              while (elem.firstElementChild) {
                elem = elem.firstElementChild;
              }
              return elem;
            }).append(this);
          }
          return this;
        },
        wrapInner: function(html) {
          if (isFunction(html)) {
            return this.each(function(i) {
              jQuery(this).wrapInner(html.call(this, i));
            });
          }
          return this.each(function() {
            var self2 = jQuery(this), contents = self2.contents();
            if (contents.length) {
              contents.wrapAll(html);
            } else {
              self2.append(html);
            }
          });
        },
        wrap: function(html) {
          var htmlIsFunction = isFunction(html);
          return this.each(function(i) {
            jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
          });
        },
        unwrap: function(selector) {
          this.parent(selector).not("body").each(function() {
            jQuery(this).replaceWith(this.childNodes);
          });
          return this;
        }
      });
      jQuery.expr.pseudos.hidden = function(elem) {
        return !jQuery.expr.pseudos.visible(elem);
      };
      jQuery.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      };
      jQuery.ajaxSettings.xhr = function() {
        try {
          return new window2.XMLHttpRequest();
        } catch (e) {
        }
      };
      var xhrSuccessStatus = {
        // File protocol always yields status code 0, assume 200
        0: 200,
        // Support: IE <=9 only
        // trac-1450: sometimes IE returns 1223 when it should be 204
        1223: 204
      }, xhrSupported = jQuery.ajaxSettings.xhr();
      support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
      support.ajax = xhrSupported = !!xhrSupported;
      jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
          return {
            send: function(headers, complete) {
              var i, xhr = options.xhr();
              xhr.open(
                options.type,
                options.url,
                options.async,
                options.username,
                options.password
              );
              if (options.xhrFields) {
                for (i in options.xhrFields) {
                  xhr[i] = options.xhrFields[i];
                }
              }
              if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
              }
              if (!options.crossDomain && !headers["X-Requested-With"]) {
                headers["X-Requested-With"] = "XMLHttpRequest";
              }
              for (i in headers) {
                xhr.setRequestHeader(i, headers[i]);
              }
              callback = function(type) {
                return function() {
                  if (callback) {
                    callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                    if (type === "abort") {
                      xhr.abort();
                    } else if (type === "error") {
                      if (typeof xhr.status !== "number") {
                        complete(0, "error");
                      } else {
                        complete(
                          // File: protocol always yields status 0; see trac-8605, trac-14207
                          xhr.status,
                          xhr.statusText
                        );
                      }
                    } else {
                      complete(
                        xhrSuccessStatus[xhr.status] || xhr.status,
                        xhr.statusText,
                        // Support: IE <=9 only
                        // IE9 has no XHR2 but throws on binary (trac-11426)
                        // For XHR2 non-text, let the caller handle it (gh-2498)
                        (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                        xhr.getAllResponseHeaders()
                      );
                    }
                  }
                };
              };
              xhr.onload = callback();
              errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
              if (xhr.onabort !== void 0) {
                xhr.onabort = errorCallback;
              } else {
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    window2.setTimeout(function() {
                      if (callback) {
                        errorCallback();
                      }
                    });
                  }
                };
              }
              callback = callback("abort");
              try {
                xhr.send(options.hasContent && options.data || null);
              } catch (e) {
                if (callback) {
                  throw e;
                }
              }
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      jQuery.ajaxPrefilter(function(s) {
        if (s.crossDomain) {
          s.contents.script = false;
        }
      });
      jQuery.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function(text) {
            jQuery.globalEval(text);
            return text;
          }
        }
      });
      jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === void 0) {
          s.cache = false;
        }
        if (s.crossDomain) {
          s.type = "GET";
        }
      });
      jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain || s.scriptAttrs) {
          var script, callback;
          return {
            send: function(_, complete) {
              script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                script.remove();
                callback = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              });
              document2.head.appendChild(script[0]);
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
      jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
          var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
          this[callback] = true;
          return callback;
        }
      });
      jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
          callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
          if (jsonProp) {
            s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
          } else if (s.jsonp !== false) {
            s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
          }
          s.converters["script json"] = function() {
            if (!responseContainer) {
              jQuery.error(callbackName + " was not called");
            }
            return responseContainer[0];
          };
          s.dataTypes[0] = "json";
          overwritten = window2[callbackName];
          window2[callbackName] = function() {
            responseContainer = arguments;
          };
          jqXHR.always(function() {
            if (overwritten === void 0) {
              jQuery(window2).removeProp(callbackName);
            } else {
              window2[callbackName] = overwritten;
            }
            if (s[callbackName]) {
              s.jsonpCallback = originalSettings.jsonpCallback;
              oldCallbacks.push(callbackName);
            }
            if (responseContainer && isFunction(overwritten)) {
              overwritten(responseContainer[0]);
            }
            responseContainer = overwritten = void 0;
          });
          return "script";
        }
      });
      support.createHTMLDocument = (function() {
        var body = document2.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
      })();
      jQuery.parseHTML = function(data2, context, keepScripts) {
        if (typeof data2 !== "string") {
          return [];
        }
        if (typeof context === "boolean") {
          keepScripts = context;
          context = false;
        }
        var base, parsed, scripts;
        if (!context) {
          if (support.createHTMLDocument) {
            context = document2.implementation.createHTMLDocument("");
            base = context.createElement("base");
            base.href = document2.location.href;
            context.head.appendChild(base);
          } else {
            context = document2;
          }
        }
        parsed = rsingleTag.exec(data2);
        scripts = !keepScripts && [];
        if (parsed) {
          return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data2], context, scripts);
        if (scripts && scripts.length) {
          jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
      };
      jQuery.fn.load = function(url, params, callback) {
        var selector, type, response, self2 = this, off = url.indexOf(" ");
        if (off > -1) {
          selector = stripAndCollapse(url.slice(off));
          url = url.slice(0, off);
        }
        if (isFunction(params)) {
          callback = params;
          params = void 0;
        } else if (params && typeof params === "object") {
          type = "POST";
        }
        if (self2.length > 0) {
          jQuery.ajax({
            url,
            // If "type" variable is undefined, then "GET" method will be used.
            // Make value of this field explicit since
            // user can override it through ajaxSetup method
            type: type || "GET",
            dataType: "html",
            data: params
          }).done(function(responseText) {
            response = arguments;
            self2.html(selector ? (
              // If a selector was specified, locate the right elements in a dummy div
              // Exclude scripts to avoid IE 'Permission Denied' errors
              jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
            ) : (
              // Otherwise use the full result
              responseText
            ));
          }).always(callback && function(jqXHR, status) {
            self2.each(function() {
              callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
            });
          });
        }
        return this;
      };
      jQuery.expr.pseudos.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
          return elem === fn.elem;
        }).length;
      };
      jQuery.offset = {
        setOffset: function(elem, options, i) {
          var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
          if (position === "static") {
            elem.style.position = "relative";
          }
          curOffset = curElem.offset();
          curCSSTop = jQuery.css(elem, "top");
          curCSSLeft = jQuery.css(elem, "left");
          calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
          if (calculatePosition) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
          } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
          }
          if (isFunction(options)) {
            options = options.call(elem, i, jQuery.extend({}, curOffset));
          }
          if (options.top != null) {
            props.top = options.top - curOffset.top + curTop;
          }
          if (options.left != null) {
            props.left = options.left - curOffset.left + curLeft;
          }
          if ("using" in options) {
            options.using.call(elem, props);
          } else {
            curElem.css(props);
          }
        }
      };
      jQuery.fn.extend({
        // offset() relates an element's border box to the document origin
        offset: function(options) {
          if (arguments.length) {
            return options === void 0 ? this : this.each(function(i) {
              jQuery.offset.setOffset(this, options, i);
            });
          }
          var rect, win, elem = this[0];
          if (!elem) {
            return;
          }
          if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
          }
          rect = elem.getBoundingClientRect();
          win = elem.ownerDocument.defaultView;
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        },
        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
          if (!this[0]) {
            return;
          }
          var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
          if (jQuery.css(elem, "position") === "fixed") {
            offset = elem.getBoundingClientRect();
          } else {
            offset = this.offset();
            doc = elem.ownerDocument;
            offsetParent = elem.offsetParent || doc.documentElement;
            while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
              parentOffset = jQuery(offsetParent).offset();
              parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
              parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
            }
          }
          return {
            top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
          };
        },
        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
          return this.map(function() {
            var offsetParent = this.offsetParent;
            while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || documentElement;
          });
        }
      });
      jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
          return access(this, function(elem, method2, val2) {
            var win;
            if (isWindow(elem)) {
              win = elem;
            } else if (elem.nodeType === 9) {
              win = elem.defaultView;
            }
            if (val2 === void 0) {
              return win ? win[prop] : elem[method2];
            }
            if (win) {
              win.scrollTo(
                !top ? val2 : win.pageXOffset,
                top ? val2 : win.pageYOffset
              );
            } else {
              elem[method2] = val2;
            }
          }, method, val, arguments.length);
        };
      });
      jQuery.each(["top", "left"], function(_i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(
          support.pixelPosition,
          function(elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
          }
        );
      });
      jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
        jQuery.each({
          padding: "inner" + name,
          content: type,
          "": "outer" + name
        }, function(defaultExtra, funcName) {
          jQuery.fn[funcName] = function(margin, value) {
            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
            return access(this, function(elem, type2, value2) {
              var doc;
              if (isWindow(elem)) {
                return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
              }
              if (elem.nodeType === 9) {
                doc = elem.documentElement;
                return Math.max(
                  elem.body["scroll" + name],
                  doc["scroll" + name],
                  elem.body["offset" + name],
                  doc["offset" + name],
                  doc["client" + name]
                );
              }
              return value2 === void 0 ? (
                // Get width or height on the element, requesting but not forcing parseFloat
                jQuery.css(elem, type2, extra)
              ) : (
                // Set width or height on the element
                jQuery.style(elem, type2, value2, extra)
              );
            }, type, chainable ? margin : void 0, chainable);
          };
        });
      });
      jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
      ], function(_i, type) {
        jQuery.fn[type] = function(fn) {
          return this.on(type, fn);
        };
      });
      jQuery.fn.extend({
        bind: function(types, data2, fn) {
          return this.on(types, null, data2, fn);
        },
        unbind: function(types, fn) {
          return this.off(types, null, fn);
        },
        delegate: function(selector, types, data2, fn) {
          return this.on(types, selector, data2, fn);
        },
        undelegate: function(selector, types, fn) {
          return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        hover: function(fnOver, fnOut) {
          return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
        }
      });
      jQuery.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
        function(_i, name) {
          jQuery.fn[name] = function(data2, fn) {
            return arguments.length > 0 ? this.on(name, null, data2, fn) : this.trigger(name);
          };
        }
      );
      var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      jQuery.proxy = function(fn, context) {
        var tmp, args, proxy;
        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }
        if (!isFunction(fn)) {
          return void 0;
        }
        args = slice.call(arguments, 2);
        proxy = function() {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        };
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
      };
      jQuery.holdReady = function(hold) {
        if (hold) {
          jQuery.readyWait++;
        } else {
          jQuery.ready(true);
        }
      };
      jQuery.isArray = Array.isArray;
      jQuery.parseJSON = JSON.parse;
      jQuery.nodeName = nodeName;
      jQuery.isFunction = isFunction;
      jQuery.isWindow = isWindow;
      jQuery.camelCase = camelCase;
      jQuery.type = toType;
      jQuery.now = Date.now;
      jQuery.isNumeric = function(obj) {
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        !isNaN(obj - parseFloat(obj));
      };
      jQuery.trim = function(text) {
        return text == null ? "" : (text + "").replace(rtrim, "$1");
      };
      if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
          return jQuery;
        });
      }
      var _jQuery = window2.jQuery, _$ = window2.$;
      jQuery.noConflict = function(deep) {
        if (window2.$ === jQuery) {
          window2.$ = _$;
        }
        if (deep && window2.jQuery === jQuery) {
          window2.jQuery = _jQuery;
        }
        return jQuery;
      };
      if (typeof noGlobal === "undefined") {
        window2.jQuery = window2.$ = jQuery;
      }
      return jQuery;
    });
  }
});

// node_modules/lightbox2/dist/js/lightbox.js
var require_lightbox = __commonJS({
  "node_modules/lightbox2/dist/js/lightbox.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
      } else if (typeof exports === "object") {
        module.exports = factory(require_jquery());
      } else {
        root.lightbox = factory(root.jQuery);
      }
    })(exports, function($) {
      function Lightbox(options) {
        this.album = [];
        this.currentImageIndex = void 0;
        this.init();
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);
      }
      Lightbox.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: false,
        fadeDuration: 600,
        fitImagesInViewport: true,
        imageFadeDuration: 600,
        // maxWidth: 800,
        // maxHeight: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: true,
        wrapAround: false,
        disableScrolling: false,
        /*
            Sanitize Title
            If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
            This will free you to add html tags, such as links, in the caption.
        
            If the caption data is user submitted or from some other untrusted source, then set this to true
            to prevent xss and other injection attacks.
             */
        sanitizeTitle: false
      };
      Lightbox.prototype.option = function(options) {
        $.extend(this.options, options);
      };
      Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
        return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
      };
      Lightbox.prototype.init = function() {
        var self2 = this;
        $(document).ready(function() {
          self2.enable();
          self2.build();
        });
      };
      Lightbox.prototype.enable = function() {
        var self2 = this;
        $("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(event) {
          self2.start($(event.currentTarget));
          return false;
        });
      };
      Lightbox.prototype.build = function() {
        if ($("#lightbox").length > 0) {
          return;
        }
        var self2 = this;
        $('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" role="button" tabindex="0" aria-label="Previous image" href="" ></a><a class="lb-next" role="button" tabindex="0" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel" role="button" tabindex="0"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close" role="button" tabindex="0"></a></div></div></div></div>').appendTo($("body"));
        this.$lightbox = $("#lightbox");
        this.$overlay = $("#lightboxOverlay");
        this.$outerContainer = this.$lightbox.find(".lb-outerContainer");
        this.$container = this.$lightbox.find(".lb-container");
        this.$image = this.$lightbox.find(".lb-image");
        this.$nav = this.$lightbox.find(".lb-nav");
        this.containerPadding = {
          top: parseInt(this.$container.css("padding-top"), 10),
          right: parseInt(this.$container.css("padding-right"), 10),
          bottom: parseInt(this.$container.css("padding-bottom"), 10),
          left: parseInt(this.$container.css("padding-left"), 10)
        };
        this.imageBorderWidth = {
          top: parseInt(this.$image.css("border-top-width"), 10),
          right: parseInt(this.$image.css("border-right-width"), 10),
          bottom: parseInt(this.$image.css("border-bottom-width"), 10),
          left: parseInt(this.$image.css("border-left-width"), 10)
        };
        this.$overlay.hide().on("click", function() {
          self2.end();
          return false;
        });
        this.$lightbox.hide().on("click", function(event) {
          if ($(event.target).attr("id") === "lightbox") {
            self2.end();
          }
        });
        this.$outerContainer.on("click", function(event) {
          if ($(event.target).attr("id") === "lightbox") {
            self2.end();
          }
          return false;
        });
        this.$lightbox.find(".lb-prev").on("click", function() {
          if (self2.currentImageIndex === 0) {
            self2.changeImage(self2.album.length - 1);
          } else {
            self2.changeImage(self2.currentImageIndex - 1);
          }
          return false;
        });
        this.$lightbox.find(".lb-next").on("click", function() {
          if (self2.currentImageIndex === self2.album.length - 1) {
            self2.changeImage(0);
          } else {
            self2.changeImage(self2.currentImageIndex + 1);
          }
          return false;
        });
        this.$nav.on("mousedown", function(event) {
          if (event.which === 3) {
            self2.$nav.css("pointer-events", "none");
            self2.$lightbox.one("contextmenu", function() {
              setTimeout(function() {
                this.$nav.css("pointer-events", "auto");
              }.bind(self2), 0);
            });
          }
        });
        this.$lightbox.find(".lb-loader, .lb-close").on("click keyup", function(e) {
          if (e.type === "click" || e.type === "keyup" && (e.which === 13 || e.which === 32)) {
            self2.end();
            return false;
          }
        });
      };
      Lightbox.prototype.start = function($link) {
        var self2 = this;
        var $window = $(window);
        $window.on("resize", $.proxy(this.sizeOverlay, this));
        this.sizeOverlay();
        this.album = [];
        var imageNumber = 0;
        function addToAlbum($link2) {
          self2.album.push({
            alt: $link2.attr("data-alt"),
            link: $link2.attr("href"),
            title: $link2.attr("data-title") || $link2.attr("title")
          });
        }
        var dataLightboxValue = $link.attr("data-lightbox");
        var $links;
        if (dataLightboxValue) {
          $links = $($link.prop("tagName") + '[data-lightbox="' + dataLightboxValue + '"]');
          for (var i = 0; i < $links.length; i = ++i) {
            addToAlbum($($links[i]));
            if ($links[i] === $link[0]) {
              imageNumber = i;
            }
          }
        } else {
          if ($link.attr("rel") === "lightbox") {
            addToAlbum($link);
          } else {
            $links = $($link.prop("tagName") + '[rel="' + $link.attr("rel") + '"]');
            for (var j = 0; j < $links.length; j = ++j) {
              addToAlbum($($links[j]));
              if ($links[j] === $link[0]) {
                imageNumber = j;
              }
            }
          }
        }
        var top = $window.scrollTop() + this.options.positionFromTop;
        var left = $window.scrollLeft();
        this.$lightbox.css({
          top: top + "px",
          left: left + "px"
        }).fadeIn(this.options.fadeDuration);
        if (this.options.disableScrolling) {
          $("body").addClass("lb-disable-scrolling");
        }
        this.changeImage(imageNumber);
      };
      Lightbox.prototype.changeImage = function(imageNumber) {
        var self2 = this;
        var filename = this.album[imageNumber].link;
        var filetype = filename.split(".").slice(-1)[0];
        var $image = this.$lightbox.find(".lb-image");
        this.disableKeyboardNav();
        this.$overlay.fadeIn(this.options.fadeDuration);
        $(".lb-loader").fadeIn("slow");
        this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide();
        this.$outerContainer.addClass("animating");
        var preloader = new Image();
        preloader.onload = function() {
          var $preloader;
          var imageHeight;
          var imageWidth;
          var maxImageHeight;
          var maxImageWidth;
          var windowHeight;
          var windowWidth;
          $image.attr({
            "alt": self2.album[imageNumber].alt,
            "src": filename
          });
          $preloader = $(preloader);
          $image.width(preloader.width);
          $image.height(preloader.height);
          var aspectRatio = preloader.width / preloader.height;
          windowWidth = $(window).width();
          windowHeight = $(window).height();
          maxImageWidth = windowWidth - self2.containerPadding.left - self2.containerPadding.right - self2.imageBorderWidth.left - self2.imageBorderWidth.right - 20;
          maxImageHeight = windowHeight - self2.containerPadding.top - self2.containerPadding.bottom - self2.imageBorderWidth.top - self2.imageBorderWidth.bottom - self2.options.positionFromTop - 70;
          if (filetype === "svg") {
            if (aspectRatio >= 1) {
              imageWidth = maxImageWidth;
              imageHeight = parseInt(maxImageWidth / aspectRatio, 10);
            } else {
              imageWidth = parseInt(maxImageHeight / aspectRatio, 10);
              imageHeight = maxImageHeight;
            }
            $image.width(imageWidth);
            $image.height(imageHeight);
          } else {
            if (self2.options.fitImagesInViewport) {
              if (self2.options.maxWidth && self2.options.maxWidth < maxImageWidth) {
                maxImageWidth = self2.options.maxWidth;
              }
              if (self2.options.maxHeight && self2.options.maxHeight < maxImageHeight) {
                maxImageHeight = self2.options.maxHeight;
              }
            } else {
              maxImageWidth = self2.options.maxWidth || preloader.width || maxImageWidth;
              maxImageHeight = self2.options.maxHeight || preloader.height || maxImageHeight;
            }
            if (preloader.width > maxImageWidth || preloader.height > maxImageHeight) {
              if (preloader.width / maxImageWidth > preloader.height / maxImageHeight) {
                imageWidth = maxImageWidth;
                imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                $image.width(imageWidth);
                $image.height(imageHeight);
              } else {
                imageHeight = maxImageHeight;
                imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                $image.width(imageWidth);
                $image.height(imageHeight);
              }
            }
          }
          self2.sizeContainer($image.width(), $image.height());
        };
        preloader.src = this.album[imageNumber].link;
        this.currentImageIndex = imageNumber;
      };
      Lightbox.prototype.sizeOverlay = function() {
        var self2 = this;
        setTimeout(function() {
          self2.$overlay.width($(document).width()).height($(document).height());
        }, 0);
      };
      Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
        var self2 = this;
        var oldWidth = this.$outerContainer.outerWidth();
        var oldHeight = this.$outerContainer.outerHeight();
        var newWidth = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
        var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
        function postResize() {
          self2.$lightbox.find(".lb-dataContainer").width(newWidth);
          self2.$lightbox.find(".lb-prevLink").height(newHeight);
          self2.$lightbox.find(".lb-nextLink").height(newHeight);
          self2.$overlay.trigger("focus");
          self2.showImage();
        }
        if (oldWidth !== newWidth || oldHeight !== newHeight) {
          this.$outerContainer.animate({
            width: newWidth,
            height: newHeight
          }, this.options.resizeDuration, "swing", function() {
            postResize();
          });
        } else {
          postResize();
        }
      };
      Lightbox.prototype.showImage = function() {
        this.$lightbox.find(".lb-loader").stop(true).hide();
        this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration);
        this.updateNav();
        this.updateDetails();
        this.preloadNeighboringImages();
        this.enableKeyboardNav();
      };
      Lightbox.prototype.updateNav = function() {
        var alwaysShowNav = false;
        try {
          document.createEvent("TouchEvent");
          alwaysShowNav = this.options.alwaysShowNavOnTouchDevices ? true : false;
        } catch (e) {
        }
        this.$lightbox.find(".lb-nav").show();
        if (this.album.length > 1) {
          if (this.options.wrapAround) {
            if (alwaysShowNav) {
              this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1");
            }
            this.$lightbox.find(".lb-prev, .lb-next").show();
          } else {
            if (this.currentImageIndex > 0) {
              this.$lightbox.find(".lb-prev").show();
              if (alwaysShowNav) {
                this.$lightbox.find(".lb-prev").css("opacity", "1");
              }
            }
            if (this.currentImageIndex < this.album.length - 1) {
              this.$lightbox.find(".lb-next").show();
              if (alwaysShowNav) {
                this.$lightbox.find(".lb-next").css("opacity", "1");
              }
            }
          }
        }
      };
      Lightbox.prototype.updateDetails = function() {
        var self2 = this;
        if (typeof this.album[this.currentImageIndex].title !== "undefined" && this.album[this.currentImageIndex].title !== "") {
          var $caption = this.$lightbox.find(".lb-caption");
          if (this.options.sanitizeTitle) {
            $caption.text(this.album[this.currentImageIndex].title);
          } else {
            $caption.html(this.album[this.currentImageIndex].title);
          }
          $caption.fadeIn("fast");
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
          var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
          this.$lightbox.find(".lb-number").text(labelText).fadeIn("fast");
        } else {
          this.$lightbox.find(".lb-number").hide();
        }
        this.$outerContainer.removeClass("animating");
        this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
          return self2.sizeOverlay();
        });
      };
      Lightbox.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
          var preloadNext = new Image();
          preloadNext.src = this.album[this.currentImageIndex + 1].link;
        }
        if (this.currentImageIndex > 0) {
          var preloadPrev = new Image();
          preloadPrev.src = this.album[this.currentImageIndex - 1].link;
        }
      };
      Lightbox.prototype.enableKeyboardNav = function() {
        this.$lightbox.on("keyup.keyboard", $.proxy(this.keyboardAction, this));
        this.$overlay.on("keyup.keyboard", $.proxy(this.keyboardAction, this));
      };
      Lightbox.prototype.disableKeyboardNav = function() {
        this.$lightbox.off(".keyboard");
        this.$overlay.off(".keyboard");
      };
      Lightbox.prototype.keyboardAction = function(event) {
        var KEYCODE_ESC = 27;
        var KEYCODE_LEFTARROW = 37;
        var KEYCODE_RIGHTARROW = 39;
        var keycode = event.keyCode;
        if (keycode === KEYCODE_ESC) {
          event.stopPropagation();
          this.end();
        } else if (keycode === KEYCODE_LEFTARROW) {
          if (this.currentImageIndex !== 0) {
            this.changeImage(this.currentImageIndex - 1);
          } else if (this.options.wrapAround && this.album.length > 1) {
            this.changeImage(this.album.length - 1);
          }
        } else if (keycode === KEYCODE_RIGHTARROW) {
          if (this.currentImageIndex !== this.album.length - 1) {
            this.changeImage(this.currentImageIndex + 1);
          } else if (this.options.wrapAround && this.album.length > 1) {
            this.changeImage(0);
          }
        }
      };
      Lightbox.prototype.end = function() {
        this.disableKeyboardNav();
        $(window).off("resize", this.sizeOverlay);
        this.$lightbox.fadeOut(this.options.fadeDuration);
        this.$overlay.fadeOut(this.options.fadeDuration);
        if (this.options.disableScrolling) {
          $("body").removeClass("lb-disable-scrolling");
        }
      };
      return new Lightbox();
    });
  }
});

// node_modules/filepond/dist/filepond.js
var require_filepond = __commonJS({
  "node_modules/filepond/dist/filepond.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.FilePond = {}));
    })(exports, function(exports2) {
      "use strict";
      var isNode = function isNode2(value) {
        return value instanceof HTMLElement;
      };
      var createStore = function createStore2(initialState) {
        var queries2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        var actions2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
        var state2 = Object.assign({}, initialState);
        var actionQueue = [];
        var dispatchQueue = [];
        var getState = function getState2() {
          return Object.assign({}, state2);
        };
        var processActionQueue = function processActionQueue2() {
          var queue = [].concat(actionQueue);
          actionQueue.length = 0;
          return queue;
        };
        var processDispatchQueue = function processDispatchQueue2() {
          var queue = [].concat(dispatchQueue);
          dispatchQueue.length = 0;
          queue.forEach(function(_ref) {
            var type = _ref.type, data3 = _ref.data;
            dispatch2(type, data3);
          });
        };
        var dispatch2 = function dispatch3(type, data3, isBlocking) {
          if (isBlocking && !document.hidden) {
            dispatchQueue.push({ type, data: data3 });
            return;
          }
          if (actionHandlers[type]) {
            actionHandlers[type](data3);
          }
          actionQueue.push({
            type,
            data: data3
          });
        };
        var query = function query2(str) {
          var _queryHandles;
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return queryHandles[str] ? (_queryHandles = queryHandles)[str].apply(_queryHandles, args) : null;
        };
        var api = {
          getState,
          processActionQueue,
          processDispatchQueue,
          dispatch: dispatch2,
          query
        };
        var queryHandles = {};
        queries2.forEach(function(query2) {
          queryHandles = Object.assign({}, query2(state2), {}, queryHandles);
        });
        var actionHandlers = {};
        actions2.forEach(function(action) {
          actionHandlers = Object.assign({}, action(dispatch2, query, state2), {}, actionHandlers);
        });
        return api;
      };
      var defineProperty = function defineProperty2(obj, property, definition) {
        if (typeof definition === "function") {
          obj[property] = definition;
          return;
        }
        Object.defineProperty(obj, property, Object.assign({}, definition));
      };
      var forin = function forin2(obj, cb) {
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue;
          }
          cb(key, obj[key]);
        }
      };
      var createObject = function createObject2(definition) {
        var obj = {};
        forin(definition, function(property) {
          defineProperty(obj, property, definition[property]);
        });
        return obj;
      };
      var attr = function attr2(node, name2) {
        var value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (value === null) {
          return node.getAttribute(name2) || node.hasAttribute(name2);
        }
        node.setAttribute(name2, value);
      };
      var ns = "http://www.w3.org/2000/svg";
      var svgElements = ["svg", "path"];
      var isSVGElement = function isSVGElement2(tag) {
        return svgElements.includes(tag);
      };
      var createElement = function createElement2(tag, className) {
        var attributes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (typeof className === "object") {
          attributes = className;
          className = null;
        }
        var element = isSVGElement(tag) ? document.createElementNS(ns, tag) : document.createElement(tag);
        if (className) {
          if (isSVGElement(tag)) {
            attr(element, "class", className);
          } else {
            element.className = className;
          }
        }
        forin(attributes, function(name2, value) {
          attr(element, name2, value);
        });
        return element;
      };
      var appendChild = function appendChild2(parent) {
        return function(child, index) {
          if (typeof index !== "undefined" && parent.children[index]) {
            parent.insertBefore(child, parent.children[index]);
          } else {
            parent.appendChild(child);
          }
        };
      };
      var appendChildView = function appendChildView2(parent, childViews) {
        return function(view, index) {
          if (typeof index !== "undefined") {
            childViews.splice(index, 0, view);
          } else {
            childViews.push(view);
          }
          return view;
        };
      };
      var removeChildView = function removeChildView2(parent, childViews) {
        return function(view) {
          childViews.splice(childViews.indexOf(view), 1);
          if (view.element.parentNode) {
            parent.removeChild(view.element);
          }
          return view;
        };
      };
      var IS_BROWSER = (function() {
        return typeof window !== "undefined" && typeof window.document !== "undefined";
      })();
      var isBrowser = function isBrowser2() {
        return IS_BROWSER;
      };
      var testElement = isBrowser() ? createElement("svg") : {};
      var getChildCount = "children" in testElement ? function(el) {
        return el.children.length;
      } : function(el) {
        return el.childNodes.length;
      };
      var getViewRect = function getViewRect2(elementRect, childViews, offset, scale) {
        var left = offset[0] || elementRect.left;
        var top = offset[1] || elementRect.top;
        var right = left + elementRect.width;
        var bottom = top + elementRect.height * (scale[1] || 1);
        var rect = {
          // the rectangle of the element itself
          element: Object.assign({}, elementRect),
          // the rectangle of the element expanded to contain its children, does not include any margins
          inner: {
            left: elementRect.left,
            top: elementRect.top,
            right: elementRect.right,
            bottom: elementRect.bottom
          },
          // the rectangle of the element expanded to contain its children including own margin and child margins
          // margins will be added after we've recalculated the size
          outer: {
            left,
            top,
            right,
            bottom
          }
        };
        childViews.filter(function(childView) {
          return !childView.isRectIgnored();
        }).map(function(childView) {
          return childView.rect;
        }).forEach(function(childViewRect) {
          expandRect(rect.inner, Object.assign({}, childViewRect.inner));
          expandRect(rect.outer, Object.assign({}, childViewRect.outer));
        });
        calculateRectSize(rect.inner);
        rect.outer.bottom += rect.element.marginBottom;
        rect.outer.right += rect.element.marginRight;
        calculateRectSize(rect.outer);
        return rect;
      };
      var expandRect = function expandRect2(parent, child) {
        child.top += parent.top;
        child.right += parent.left;
        child.bottom += parent.top;
        child.left += parent.left;
        if (child.bottom > parent.bottom) {
          parent.bottom = child.bottom;
        }
        if (child.right > parent.right) {
          parent.right = child.right;
        }
      };
      var calculateRectSize = function calculateRectSize2(rect) {
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
      };
      var isNumber = function isNumber2(value) {
        return typeof value === "number";
      };
      var thereYet = function thereYet2(position, destination, velocity) {
        var errorMargin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1e-3;
        return Math.abs(position - destination) < errorMargin && Math.abs(velocity) < errorMargin;
      };
      var spring = (
        // default options
        function spring2() {
          var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$stiffness = _ref.stiffness, stiffness = _ref$stiffness === void 0 ? 0.5 : _ref$stiffness, _ref$damping = _ref.damping, damping = _ref$damping === void 0 ? 0.75 : _ref$damping, _ref$mass = _ref.mass, mass = _ref$mass === void 0 ? 10 : _ref$mass;
          var target = null;
          var position = null;
          var velocity = 0;
          var resting = false;
          var interpolate = function interpolate2(ts, skipToEndState) {
            if (resting) return;
            if (!(isNumber(target) && isNumber(position))) {
              resting = true;
              velocity = 0;
              return;
            }
            var f = -(position - target) * stiffness;
            velocity += f / mass;
            position += velocity;
            velocity *= damping;
            if (thereYet(position, target, velocity) || skipToEndState) {
              position = target;
              velocity = 0;
              resting = true;
              api.onupdate(position);
              api.oncomplete(position);
            } else {
              api.onupdate(position);
            }
          };
          var setTarget = function setTarget2(value) {
            if (isNumber(value) && !isNumber(position)) {
              position = value;
            }
            if (target === null) {
              target = value;
              position = value;
            }
            target = value;
            if (position === target || typeof target === "undefined") {
              resting = true;
              velocity = 0;
              api.onupdate(position);
              api.oncomplete(position);
              return;
            }
            resting = false;
          };
          var api = createObject({
            interpolate,
            target: {
              set: setTarget,
              get: function get() {
                return target;
              }
            },
            resting: {
              get: function get() {
                return resting;
              }
            },
            onupdate: function onupdate(value) {
            },
            oncomplete: function oncomplete(value) {
            }
          });
          return api;
        }
      );
      var easeLinear = function easeLinear2(t) {
        return t;
      };
      var easeInOutQuad = function easeInOutQuad2(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      var tween = (
        // default values
        function tween2() {
          var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$duration = _ref.duration, duration = _ref$duration === void 0 ? 500 : _ref$duration, _ref$easing = _ref.easing, easing = _ref$easing === void 0 ? easeInOutQuad : _ref$easing, _ref$delay = _ref.delay, delay = _ref$delay === void 0 ? 0 : _ref$delay;
          var start = null;
          var t;
          var p;
          var resting = true;
          var reverse = false;
          var target = null;
          var interpolate = function interpolate2(ts, skipToEndState) {
            if (resting || target === null) return;
            if (start === null) {
              start = ts;
            }
            if (ts - start < delay) return;
            t = ts - start - delay;
            if (t >= duration || skipToEndState) {
              t = 1;
              p = reverse ? 0 : 1;
              api.onupdate(p * target);
              api.oncomplete(p * target);
              resting = true;
            } else {
              p = t / duration;
              api.onupdate((t >= 0 ? easing(reverse ? 1 - p : p) : 0) * target);
            }
          };
          var api = createObject({
            interpolate,
            target: {
              get: function get() {
                return reverse ? 0 : target;
              },
              set: function set2(value) {
                if (target === null) {
                  target = value;
                  api.onupdate(value);
                  api.oncomplete(value);
                  return;
                }
                if (value < target) {
                  target = 1;
                  reverse = true;
                } else {
                  reverse = false;
                  target = value;
                }
                resting = false;
                start = null;
              }
            },
            resting: {
              get: function get() {
                return resting;
              }
            },
            onupdate: function onupdate(value) {
            },
            oncomplete: function oncomplete(value) {
            }
          });
          return api;
        }
      );
      var animator = {
        spring,
        tween
      };
      var createAnimator = function createAnimator2(definition, category, property) {
        var def = definition[category] && typeof definition[category][property] === "object" ? definition[category][property] : definition[category] || definition;
        var type = typeof def === "string" ? def : def.type;
        var props = typeof def === "object" ? Object.assign({}, def) : {};
        return animator[type] ? animator[type](props) : null;
      };
      var addGetSet = function addGetSet2(keys, obj, props) {
        var overwrite = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        obj = Array.isArray(obj) ? obj : [obj];
        obj.forEach(function(o) {
          keys.forEach(function(key) {
            var name2 = key;
            var getter = function getter2() {
              return props[key];
            };
            var setter = function setter2(value) {
              return props[key] = value;
            };
            if (typeof key === "object") {
              name2 = key.key;
              getter = key.getter || getter;
              setter = key.setter || setter;
            }
            if (o[name2] && !overwrite) {
              return;
            }
            o[name2] = {
              get: getter,
              set: setter
            };
          });
        });
      };
      var animations = function animations2(_ref) {
        var mixinConfig = _ref.mixinConfig, viewProps = _ref.viewProps, viewInternalAPI = _ref.viewInternalAPI, viewExternalAPI = _ref.viewExternalAPI;
        var initialProps = Object.assign({}, viewProps);
        var animations3 = [];
        forin(mixinConfig, function(property, animation) {
          var animator2 = createAnimator(animation);
          if (!animator2) {
            return;
          }
          animator2.onupdate = function(value) {
            viewProps[property] = value;
          };
          animator2.target = initialProps[property];
          var prop = {
            key: property,
            setter: function setter(value) {
              if (animator2.target === value) {
                return;
              }
              animator2.target = value;
            },
            getter: function getter() {
              return viewProps[property];
            }
          };
          addGetSet([prop], [viewInternalAPI, viewExternalAPI], viewProps, true);
          animations3.push(animator2);
        });
        return {
          write: function write2(ts) {
            var skipToEndState = document.hidden;
            var resting = true;
            animations3.forEach(function(animation) {
              if (!animation.resting) resting = false;
              animation.interpolate(ts, skipToEndState);
            });
            return resting;
          },
          destroy: function destroy() {
          }
        };
      };
      var addEvent = function addEvent2(element) {
        return function(type, fn2) {
          element.addEventListener(type, fn2);
        };
      };
      var removeEvent = function removeEvent2(element) {
        return function(type, fn2) {
          element.removeEventListener(type, fn2);
        };
      };
      var listeners = function listeners2(_ref) {
        var mixinConfig = _ref.mixinConfig, viewProps = _ref.viewProps, viewInternalAPI = _ref.viewInternalAPI, viewExternalAPI = _ref.viewExternalAPI, viewState = _ref.viewState, view = _ref.view;
        var events = [];
        var add = addEvent(view.element);
        var remove = removeEvent(view.element);
        viewExternalAPI.on = function(type, fn2) {
          events.push({
            type,
            fn: fn2
          });
          add(type, fn2);
        };
        viewExternalAPI.off = function(type, fn2) {
          events.splice(
            events.findIndex(function(event) {
              return event.type === type && event.fn === fn2;
            }),
            1
          );
          remove(type, fn2);
        };
        return {
          write: function write2() {
            return true;
          },
          destroy: function destroy() {
            events.forEach(function(event) {
              remove(event.type, event.fn);
            });
          }
        };
      };
      var apis = function apis2(_ref) {
        var mixinConfig = _ref.mixinConfig, viewProps = _ref.viewProps, viewExternalAPI = _ref.viewExternalAPI;
        addGetSet(mixinConfig, viewExternalAPI, viewProps);
      };
      var isDefined = function isDefined2(value) {
        return value != null;
      };
      var defaults = {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        originX: 0,
        originY: 0
      };
      var styles = function styles2(_ref) {
        var mixinConfig = _ref.mixinConfig, viewProps = _ref.viewProps, viewInternalAPI = _ref.viewInternalAPI, viewExternalAPI = _ref.viewExternalAPI, view = _ref.view;
        var initialProps = Object.assign({}, viewProps);
        var currentProps = {};
        addGetSet(mixinConfig, [viewInternalAPI, viewExternalAPI], viewProps);
        var getOffset = function getOffset2() {
          return [viewProps["translateX"] || 0, viewProps["translateY"] || 0];
        };
        var getScale = function getScale2() {
          return [viewProps["scaleX"] || 0, viewProps["scaleY"] || 0];
        };
        var getRect = function getRect2() {
          return view.rect ? getViewRect(view.rect, view.childViews, getOffset(), getScale()) : null;
        };
        viewInternalAPI.rect = { get: getRect };
        viewExternalAPI.rect = { get: getRect };
        mixinConfig.forEach(function(key) {
          viewProps[key] = typeof initialProps[key] === "undefined" ? defaults[key] : initialProps[key];
        });
        return {
          write: function write2() {
            if (!propsHaveChanged(currentProps, viewProps)) {
              return;
            }
            applyStyles(view.element, viewProps);
            Object.assign(currentProps, Object.assign({}, viewProps));
            return true;
          },
          destroy: function destroy() {
          }
        };
      };
      var propsHaveChanged = function propsHaveChanged2(currentProps, newProps) {
        if (Object.keys(currentProps).length !== Object.keys(newProps).length) {
          return true;
        }
        for (var prop in newProps) {
          if (newProps[prop] !== currentProps[prop]) {
            return true;
          }
        }
        return false;
      };
      var applyStyles = function applyStyles2(element, _ref2) {
        var opacity = _ref2.opacity, perspective = _ref2.perspective, translateX = _ref2.translateX, translateY = _ref2.translateY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, rotateX = _ref2.rotateX, rotateY = _ref2.rotateY, rotateZ = _ref2.rotateZ, originX = _ref2.originX, originY = _ref2.originY, width = _ref2.width, height = _ref2.height;
        var transforms = "";
        var styles2 = "";
        if (isDefined(originX) || isDefined(originY)) {
          styles2 += "transform-origin: " + (originX || 0) + "px " + (originY || 0) + "px;";
        }
        if (isDefined(perspective)) {
          transforms += "perspective(" + perspective + "px) ";
        }
        if (isDefined(translateX) || isDefined(translateY)) {
          transforms += "translate3d(" + (translateX || 0) + "px, " + (translateY || 0) + "px, 0) ";
        }
        if (isDefined(scaleX) || isDefined(scaleY)) {
          transforms += "scale3d(" + (isDefined(scaleX) ? scaleX : 1) + ", " + (isDefined(scaleY) ? scaleY : 1) + ", 1) ";
        }
        if (isDefined(rotateZ)) {
          transforms += "rotateZ(" + rotateZ + "rad) ";
        }
        if (isDefined(rotateX)) {
          transforms += "rotateX(" + rotateX + "rad) ";
        }
        if (isDefined(rotateY)) {
          transforms += "rotateY(" + rotateY + "rad) ";
        }
        if (transforms.length) {
          styles2 += "transform:" + transforms + ";";
        }
        if (isDefined(opacity)) {
          styles2 += "opacity:" + opacity + ";";
          if (opacity === 0) {
            styles2 += "visibility:hidden;";
          }
          if (opacity < 1) {
            styles2 += "pointer-events:none;";
          }
        }
        if (isDefined(height)) {
          styles2 += "height:" + height + "px;";
        }
        if (isDefined(width)) {
          styles2 += "width:" + width + "px;";
        }
        var elementCurrentStyle = element.elementCurrentStyle || "";
        if (styles2.length !== elementCurrentStyle.length || styles2 !== elementCurrentStyle) {
          element.style.cssText = styles2;
          element.elementCurrentStyle = styles2;
        }
      };
      var Mixins = {
        styles,
        listeners,
        animations,
        apis
      };
      var updateRect = function updateRect2() {
        var rect = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var element = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var style = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (!element.layoutCalculated) {
          rect.paddingTop = parseInt(style.paddingTop, 10) || 0;
          rect.marginTop = parseInt(style.marginTop, 10) || 0;
          rect.marginRight = parseInt(style.marginRight, 10) || 0;
          rect.marginBottom = parseInt(style.marginBottom, 10) || 0;
          rect.marginLeft = parseInt(style.marginLeft, 10) || 0;
          element.layoutCalculated = true;
        }
        rect.left = element.offsetLeft || 0;
        rect.top = element.offsetTop || 0;
        rect.width = element.offsetWidth || 0;
        rect.height = element.offsetHeight || 0;
        rect.right = rect.left + rect.width;
        rect.bottom = rect.top + rect.height;
        rect.scrollTop = element.scrollTop;
        rect.hidden = element.offsetParent === null;
        return rect;
      };
      var createView = (
        // default view definition
        function createView2() {
          var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$tag = _ref.tag, tag = _ref$tag === void 0 ? "div" : _ref$tag, _ref$name = _ref.name, name2 = _ref$name === void 0 ? null : _ref$name, _ref$attributes = _ref.attributes, attributes = _ref$attributes === void 0 ? {} : _ref$attributes, _ref$read = _ref.read, read = _ref$read === void 0 ? function() {
          } : _ref$read, _ref$write = _ref.write, write2 = _ref$write === void 0 ? function() {
          } : _ref$write, _ref$create = _ref.create, create3 = _ref$create === void 0 ? function() {
          } : _ref$create, _ref$destroy = _ref.destroy, destroy = _ref$destroy === void 0 ? function() {
          } : _ref$destroy, _ref$filterFrameActio = _ref.filterFrameActionsForChild, filterFrameActionsForChild = _ref$filterFrameActio === void 0 ? function(child, actions2) {
            return actions2;
          } : _ref$filterFrameActio, _ref$didCreateView = _ref.didCreateView, didCreateView = _ref$didCreateView === void 0 ? function() {
          } : _ref$didCreateView, _ref$didWriteView = _ref.didWriteView, didWriteView = _ref$didWriteView === void 0 ? function() {
          } : _ref$didWriteView, _ref$ignoreRect = _ref.ignoreRect, ignoreRect = _ref$ignoreRect === void 0 ? false : _ref$ignoreRect, _ref$ignoreRectUpdate = _ref.ignoreRectUpdate, ignoreRectUpdate = _ref$ignoreRectUpdate === void 0 ? false : _ref$ignoreRectUpdate, _ref$mixins = _ref.mixins, mixins = _ref$mixins === void 0 ? [] : _ref$mixins;
          return function(store) {
            var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var element = createElement(tag, "filepond--" + name2, attributes);
            var style = window.getComputedStyle(element, null);
            var rect = updateRect();
            var frameRect = null;
            var isResting = false;
            var childViews = [];
            var activeMixins = [];
            var ref = {};
            var state2 = {};
            var writers = [
              write2
              // default writer
            ];
            var readers = [
              read
              // default reader
            ];
            var destroyers = [
              destroy
              // default destroy
            ];
            var getElement = function getElement2() {
              return element;
            };
            var getChildViews = function getChildViews2() {
              return childViews.concat();
            };
            var getReference = function getReference2() {
              return ref;
            };
            var createChildView = function createChildView2(store2) {
              return function(view, props2) {
                return view(store2, props2);
              };
            };
            var getRect = function getRect2() {
              if (frameRect) {
                return frameRect;
              }
              frameRect = getViewRect(rect, childViews, [0, 0], [1, 1]);
              return frameRect;
            };
            var getStyle = function getStyle2() {
              return style;
            };
            var _read = function _read2() {
              frameRect = null;
              childViews.forEach(function(child) {
                return child._read();
              });
              var shouldUpdate = !(ignoreRectUpdate && rect.width && rect.height);
              if (shouldUpdate) {
                updateRect(rect, element, style);
              }
              var api = { root: internalAPI, props, rect };
              readers.forEach(function(reader) {
                return reader(api);
              });
            };
            var _write = function _write2(ts, frameActions, shouldOptimize) {
              var resting = frameActions.length === 0;
              writers.forEach(function(writer) {
                var writerResting = writer({
                  props,
                  root: internalAPI,
                  actions: frameActions,
                  timestamp: ts,
                  shouldOptimize
                });
                if (writerResting === false) {
                  resting = false;
                }
              });
              activeMixins.forEach(function(mixin) {
                var mixinResting = mixin.write(ts);
                if (mixinResting === false) {
                  resting = false;
                }
              });
              childViews.filter(function(child) {
                return !!child.element.parentNode;
              }).forEach(function(child) {
                var childResting = child._write(
                  ts,
                  filterFrameActionsForChild(child, frameActions),
                  shouldOptimize
                );
                if (!childResting) {
                  resting = false;
                }
              });
              childViews.forEach(function(child, index) {
                if (child.element.parentNode) {
                  return;
                }
                internalAPI.appendChild(child.element, index);
                child._read();
                child._write(
                  ts,
                  filterFrameActionsForChild(child, frameActions),
                  shouldOptimize
                );
                resting = false;
              });
              isResting = resting;
              didWriteView({
                props,
                root: internalAPI,
                actions: frameActions,
                timestamp: ts
              });
              return resting;
            };
            var _destroy = function _destroy2() {
              activeMixins.forEach(function(mixin) {
                return mixin.destroy();
              });
              destroyers.forEach(function(destroyer) {
                destroyer({ root: internalAPI, props });
              });
              childViews.forEach(function(child) {
                return child._destroy();
              });
            };
            var sharedAPIDefinition = {
              element: {
                get: getElement
              },
              style: {
                get: getStyle
              },
              childViews: {
                get: getChildViews
              }
            };
            var internalAPIDefinition = Object.assign({}, sharedAPIDefinition, {
              rect: {
                get: getRect
              },
              // access to custom children references
              ref: {
                get: getReference
              },
              // dom modifiers
              is: function is(needle) {
                return name2 === needle;
              },
              appendChild: appendChild(element),
              createChildView: createChildView(store),
              linkView: function linkView(view) {
                childViews.push(view);
                return view;
              },
              unlinkView: function unlinkView(view) {
                childViews.splice(childViews.indexOf(view), 1);
              },
              appendChildView: appendChildView(element, childViews),
              removeChildView: removeChildView(element, childViews),
              registerWriter: function registerWriter(writer) {
                return writers.push(writer);
              },
              registerReader: function registerReader(reader) {
                return readers.push(reader);
              },
              registerDestroyer: function registerDestroyer(destroyer) {
                return destroyers.push(destroyer);
              },
              invalidateLayout: function invalidateLayout() {
                return element.layoutCalculated = false;
              },
              // access to data store
              dispatch: store.dispatch,
              query: store.query
            });
            var externalAPIDefinition = {
              element: {
                get: getElement
              },
              childViews: {
                get: getChildViews
              },
              rect: {
                get: getRect
              },
              resting: {
                get: function get() {
                  return isResting;
                }
              },
              isRectIgnored: function isRectIgnored() {
                return ignoreRect;
              },
              _read,
              _write,
              _destroy
            };
            var mixinAPIDefinition = Object.assign({}, sharedAPIDefinition, {
              rect: {
                get: function get() {
                  return rect;
                }
              }
            });
            Object.keys(mixins).sort(function(a, b) {
              if (a === "styles") {
                return 1;
              } else if (b === "styles") {
                return -1;
              }
              return 0;
            }).forEach(function(key) {
              var mixinAPI = Mixins[key]({
                mixinConfig: mixins[key],
                viewProps: props,
                viewState: state2,
                viewInternalAPI: internalAPIDefinition,
                viewExternalAPI: externalAPIDefinition,
                view: createObject(mixinAPIDefinition)
              });
              if (mixinAPI) {
                activeMixins.push(mixinAPI);
              }
            });
            var internalAPI = createObject(internalAPIDefinition);
            create3({
              root: internalAPI,
              props
            });
            var childCount = getChildCount(element);
            childViews.forEach(function(child, index) {
              internalAPI.appendChild(child.element, childCount + index);
            });
            didCreateView(internalAPI);
            return createObject(externalAPIDefinition);
          };
        }
      );
      var createPainter = function createPainter2(read, write2) {
        var fps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 60;
        var name2 = "__framePainter";
        if (window[name2]) {
          window[name2].readers.push(read);
          window[name2].writers.push(write2);
          return;
        }
        window[name2] = {
          readers: [read],
          writers: [write2]
        };
        var painter = window[name2];
        var interval = 1e3 / fps;
        var last = null;
        var id2 = null;
        var requestTick = null;
        var cancelTick = null;
        var setTimerType = function setTimerType2() {
          if (document.hidden) {
            requestTick = function requestTick2() {
              return window.setTimeout(function() {
                return tick(performance.now());
              }, interval);
            };
            cancelTick = function cancelTick2() {
              return window.clearTimeout(id2);
            };
          } else {
            requestTick = function requestTick2() {
              return window.requestAnimationFrame(tick);
            };
            cancelTick = function cancelTick2() {
              return window.cancelAnimationFrame(id2);
            };
          }
        };
        document.addEventListener("visibilitychange", function() {
          if (cancelTick) cancelTick();
          setTimerType();
          tick(performance.now());
        });
        var tick = function tick2(ts) {
          id2 = requestTick(tick2);
          if (!last) {
            last = ts;
          }
          var delta = ts - last;
          if (delta <= interval) {
            return;
          }
          last = ts - delta % interval;
          painter.readers.forEach(function(read2) {
            return read2();
          });
          painter.writers.forEach(function(write3) {
            return write3(ts);
          });
        };
        setTimerType();
        tick(performance.now());
        return {
          pause: function pause() {
            cancelTick(id2);
          }
        };
      };
      var createRoute = function createRoute2(routes, fn2) {
        return function(_ref) {
          var root2 = _ref.root, props = _ref.props, _ref$actions = _ref.actions, actions2 = _ref$actions === void 0 ? [] : _ref$actions, timestamp = _ref.timestamp, shouldOptimize = _ref.shouldOptimize;
          actions2.filter(function(action) {
            return routes[action.type];
          }).forEach(function(action) {
            return routes[action.type]({
              root: root2,
              props,
              action: action.data,
              timestamp,
              shouldOptimize
            });
          });
          if (fn2) {
            fn2({
              root: root2,
              props,
              actions: actions2,
              timestamp,
              shouldOptimize
            });
          }
        };
      };
      var insertBefore = function insertBefore2(newNode, referenceNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode);
      };
      var insertAfter = function insertAfter2(newNode, referenceNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      };
      var isArray = function isArray2(value) {
        return Array.isArray(value);
      };
      var isEmpty = function isEmpty2(value) {
        return value == null;
      };
      var trim = function trim2(str) {
        return str.trim();
      };
      var toString = function toString2(value) {
        return "" + value;
      };
      var toArray = function toArray2(value) {
        var splitter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
        if (isEmpty(value)) {
          return [];
        }
        if (isArray(value)) {
          return value;
        }
        return toString(value).split(splitter).map(trim).filter(function(str) {
          return str.length;
        });
      };
      var isBoolean = function isBoolean2(value) {
        return typeof value === "boolean";
      };
      var toBoolean = function toBoolean2(value) {
        return isBoolean(value) ? value : value === "true";
      };
      var isString = function isString2(value) {
        return typeof value === "string";
      };
      var toNumber = function toNumber2(value) {
        return isNumber(value) ? value : isString(value) ? toString(value).replace(/[a-z]+/gi, "") : 0;
      };
      var toInt = function toInt2(value) {
        return parseInt(toNumber(value), 10);
      };
      var toFloat = function toFloat2(value) {
        return parseFloat(toNumber(value));
      };
      var isInt = function isInt2(value) {
        return isNumber(value) && isFinite(value) && Math.floor(value) === value;
      };
      var toBytes = function toBytes2(value) {
        var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
        if (isInt(value)) {
          return value;
        }
        var naturalFileSize = toString(value).trim();
        if (/MB$/i.test(naturalFileSize)) {
          naturalFileSize = naturalFileSize.replace(/MB$i/, "").trim();
          return toInt(naturalFileSize) * base * base;
        }
        if (/KB/i.test(naturalFileSize)) {
          naturalFileSize = naturalFileSize.replace(/KB$i/, "").trim();
          return toInt(naturalFileSize) * base;
        }
        return toInt(naturalFileSize);
      };
      var isFunction = function isFunction2(value) {
        return typeof value === "function";
      };
      var toFunctionReference = function toFunctionReference2(string) {
        var ref = self;
        var levels = string.split(".");
        var level = null;
        while (level = levels.shift()) {
          ref = ref[level];
          if (!ref) {
            return null;
          }
        }
        return ref;
      };
      var methods = {
        process: "POST",
        patch: "PATCH",
        revert: "DELETE",
        fetch: "GET",
        restore: "GET",
        load: "GET"
      };
      var createServerAPI = function createServerAPI2(outline) {
        var api = {};
        api.url = isString(outline) ? outline : outline.url || "";
        api.timeout = outline.timeout ? parseInt(outline.timeout, 10) : 0;
        api.headers = outline.headers ? outline.headers : {};
        forin(methods, function(key) {
          api[key] = createAction(key, outline[key], methods[key], api.timeout, api.headers);
        });
        api.process = outline.process || isString(outline) || outline.url ? api.process : null;
        api.remove = outline.remove || null;
        delete api.headers;
        return api;
      };
      var createAction = function createAction2(name2, outline, method, timeout, headers) {
        if (outline === null) {
          return null;
        }
        if (typeof outline === "function") {
          return outline;
        }
        var action = {
          url: method === "GET" || method === "PATCH" ? "?" + name2 + "=" : "",
          method,
          headers,
          withCredentials: false,
          timeout,
          onload: null,
          ondata: null,
          onerror: null
        };
        if (isString(outline)) {
          action.url = outline;
          return action;
        }
        Object.assign(action, outline);
        if (isString(action.headers)) {
          var parts = action.headers.split(/:(.+)/);
          action.headers = {
            header: parts[0],
            value: parts[1]
          };
        }
        action.withCredentials = toBoolean(action.withCredentials);
        return action;
      };
      var toServerAPI = function toServerAPI2(value) {
        return createServerAPI(value);
      };
      var isNull = function isNull2(value) {
        return value === null;
      };
      var isObject = function isObject2(value) {
        return typeof value === "object" && value !== null;
      };
      var isAPI = function isAPI2(value) {
        return isObject(value) && isString(value.url) && isObject(value.process) && isObject(value.revert) && isObject(value.restore) && isObject(value.fetch);
      };
      var getType = function getType2(value) {
        if (isArray(value)) {
          return "array";
        }
        if (isNull(value)) {
          return "null";
        }
        if (isInt(value)) {
          return "int";
        }
        if (/^[0-9]+ ?(?:GB|MB|KB)$/gi.test(value)) {
          return "bytes";
        }
        if (isAPI(value)) {
          return "api";
        }
        return typeof value;
      };
      var replaceSingleQuotes = function replaceSingleQuotes2(str) {
        return str.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",');
      };
      var conversionTable = {
        array: toArray,
        boolean: toBoolean,
        int: function int(value) {
          return getType(value) === "bytes" ? toBytes(value) : toInt(value);
        },
        number: toFloat,
        float: toFloat,
        bytes: toBytes,
        string: function string(value) {
          return isFunction(value) ? value : toString(value);
        },
        function: function _function(value) {
          return toFunctionReference(value);
        },
        serverapi: toServerAPI,
        object: function object(value) {
          try {
            return JSON.parse(replaceSingleQuotes(value));
          } catch (e) {
            return null;
          }
        }
      };
      var convertTo = function convertTo2(value, type) {
        return conversionTable[type](value);
      };
      var getValueByType = function getValueByType2(newValue, defaultValue, valueType) {
        if (newValue === defaultValue) {
          return newValue;
        }
        var newValueType = getType(newValue);
        if (newValueType !== valueType) {
          var convertedValue = convertTo(newValue, valueType);
          newValueType = getType(convertedValue);
          if (convertedValue === null) {
            throw 'Trying to assign value with incorrect type to "' + option + '", allowed type: "' + valueType + '"';
          } else {
            newValue = convertedValue;
          }
        }
        return newValue;
      };
      var createOption = function createOption2(defaultValue, valueType) {
        var currentValue = defaultValue;
        return {
          enumerable: true,
          get: function get() {
            return currentValue;
          },
          set: function set2(newValue) {
            currentValue = getValueByType(newValue, defaultValue, valueType);
          }
        };
      };
      var createOptions = function createOptions2(options) {
        var obj = {};
        forin(options, function(prop) {
          var optionDefinition = options[prop];
          obj[prop] = createOption(optionDefinition[0], optionDefinition[1]);
        });
        return createObject(obj);
      };
      var createInitialState = function createInitialState2(options) {
        return {
          // model
          items: [],
          // timeout used for calling update items
          listUpdateTimeout: null,
          // timeout used for stacking metadata updates
          itemUpdateTimeout: null,
          // queue of items waiting to be processed
          processingQueue: [],
          // options
          options: createOptions(options)
        };
      };
      var fromCamels = function fromCamels2(string) {
        var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "-";
        return string.split(/(?=[A-Z])/).map(function(part) {
          return part.toLowerCase();
        }).join(separator);
      };
      var createOptionAPI = function createOptionAPI2(store, options) {
        var obj = {};
        forin(options, function(key) {
          obj[key] = {
            get: function get() {
              return store.getState().options[key];
            },
            set: function set2(value) {
              store.dispatch("SET_" + fromCamels(key, "_").toUpperCase(), {
                value
              });
            }
          };
        });
        return obj;
      };
      var createOptionActions = function createOptionActions2(options) {
        return function(dispatch2, query, state2) {
          var obj = {};
          forin(options, function(key) {
            var name2 = fromCamels(key, "_").toUpperCase();
            obj["SET_" + name2] = function(action) {
              try {
                state2.options[key] = action.value;
              } catch (e) {
              }
              dispatch2("DID_SET_" + name2, { value: state2.options[key] });
            };
          });
          return obj;
        };
      };
      var createOptionQueries = function createOptionQueries2(options) {
        return function(state2) {
          var obj = {};
          forin(options, function(key) {
            obj["GET_" + fromCamels(key, "_").toUpperCase()] = function(action) {
              return state2.options[key];
            };
          });
          return obj;
        };
      };
      var InteractionMethod = {
        API: 1,
        DROP: 2,
        BROWSE: 3,
        PASTE: 4,
        NONE: 5
      };
      var getUniqueId = function getUniqueId2() {
        return Math.random().toString(36).substring(2, 11);
      };
      function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var REACT_ELEMENT_TYPE;
      function _jsx(type, props, key, children) {
        if (!REACT_ELEMENT_TYPE) {
          REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;
        }
        var defaultProps = type && type.defaultProps;
        var childrenLength = arguments.length - 3;
        if (!props && childrenLength !== 0) {
          props = {
            children: void 0
          };
        }
        if (props && defaultProps) {
          for (var propName in defaultProps) {
            if (props[propName] === void 0) {
              props[propName] = defaultProps[propName];
            }
          }
        } else if (!props) {
          props = defaultProps || {};
        }
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = new Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 3];
          }
          props.children = childArray;
        }
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key: key === void 0 ? null : "" + key,
          ref: null,
          props,
          _owner: null
        };
      }
      function _asyncIterator(iterable) {
        var method;
        if (typeof Symbol !== "undefined") {
          if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
          }
          if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
          }
        }
        throw new TypeError("Object is not async iterable");
      }
      function _AwaitValue(value) {
        this.wrapped = value;
      }
      function _AsyncGenerator(gen) {
        var front, back;
        function send(key, arg) {
          return new Promise(function(resolve, reject) {
            var request = {
              key,
              arg,
              resolve,
              reject,
              next: null
            };
            if (back) {
              back = back.next = request;
            } else {
              front = back = request;
              resume(key, arg);
            }
          });
        }
        function resume(key, arg) {
          try {
            var result = gen[key](arg);
            var value = result.value;
            var wrappedAwait = value instanceof _AwaitValue;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(
              function(arg2) {
                if (wrappedAwait) {
                  resume("next", arg2);
                  return;
                }
                settle(result.done ? "return" : "normal", arg2);
              },
              function(err) {
                resume("throw", err);
              }
            );
          } catch (err) {
            settle("throw", err);
          }
        }
        function settle(type, value) {
          switch (type) {
            case "return":
              front.resolve({
                value,
                done: true
              });
              break;
            case "throw":
              front.reject(value);
              break;
            default:
              front.resolve({
                value,
                done: false
              });
              break;
          }
          front = front.next;
          if (front) {
            resume(front.key, front.arg);
          } else {
            back = null;
          }
        }
        this._invoke = send;
        if (typeof gen.return !== "function") {
          this.return = void 0;
        }
      }
      if (typeof Symbol === "function" && Symbol.asyncIterator) {
        _AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
          return this;
        };
      }
      _AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
      };
      _AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
      };
      _AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
      };
      function _wrapAsyncGenerator(fn2) {
        return function() {
          return new _AsyncGenerator(fn2.apply(this, arguments));
        };
      }
      function _awaitAsyncGenerator(value) {
        return new _AwaitValue(value);
      }
      function _asyncGeneratorDelegate(inner, awaitWrap) {
        var iter = {}, waiting = false;
        function pump(key, value) {
          waiting = true;
          value = new Promise(function(resolve) {
            resolve(inner[key](value));
          });
          return {
            done: false,
            value: awaitWrap(value)
          };
        }
        if (typeof Symbol === "function" && Symbol.iterator) {
          iter[Symbol.iterator] = function() {
            return this;
          };
        }
        iter.next = function(value) {
          if (waiting) {
            waiting = false;
            return value;
          }
          return pump("next", value);
        };
        if (typeof inner.throw === "function") {
          iter.throw = function(value) {
            if (waiting) {
              waiting = false;
              throw value;
            }
            return pump("throw", value);
          };
        }
        if (typeof inner.return === "function") {
          iter.return = function(value) {
            return pump("return", value);
          };
        }
        return iter;
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error2) {
          reject(error2);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn2) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn2.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _defineEnumerableProperties(obj, descs) {
        for (var key in descs) {
          var desc = descs[key];
          desc.configurable = desc.enumerable = true;
          if ("value" in desc) desc.writable = true;
          Object.defineProperty(obj, key, desc);
        }
        if (Object.getOwnPropertySymbols) {
          var objectSymbols = Object.getOwnPropertySymbols(descs);
          for (var i = 0; i < objectSymbols.length; i++) {
            var sym = objectSymbols[i];
            var desc = descs[sym];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, sym, desc);
          }
        }
        return obj;
      }
      function _defaults(obj, defaults2) {
        var keys = Object.getOwnPropertyNames(defaults2);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = Object.getOwnPropertyDescriptor(defaults2, key);
          if (value && value.configurable && obj[key] === void 0) {
            Object.defineProperty(obj, key, value);
          }
        }
        return obj;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys2 = Object.keys(source);
          if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys2 = ownKeys2.concat(
              Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
              })
            );
          }
          ownKeys2.forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        }
        return target;
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(source, true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(source).forEach(function(key) {
              Object.defineProperty(
                target,
                key,
                Object.getOwnPropertyDescriptor(source, key)
              );
            });
          }
        }
        return target;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn2) {
        return Function.toString.call(fn2).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _instanceof(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return !!right[Symbol.hasInstance](left);
        } else {
          return left instanceof right;
        }
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                if (desc.get || desc.set) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function _newArrowCheck(innerThis, boundThis) {
        if (innerThis !== boundThis) {
          throw new TypeError("Cannot instantiate an arrow function");
        }
      }
      function _objectDestructuringEmpty(obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }
        return target;
      }
      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key, i;
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }
        return target;
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }
        return object;
      }
      function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get;
        } else {
          _get = function _get2(target2, property2, receiver2) {
            var base = _superPropBase(target2, property2);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property2);
            if (desc.get) {
              return desc.get.call(receiver2);
            }
            return desc.value;
          };
        }
        return _get(target, property, receiver || target);
      }
      function set(target, property, value, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.set) {
          set = Reflect.set;
        } else {
          set = function set2(target2, property2, value2, receiver2) {
            var base = _superPropBase(target2, property2);
            var desc;
            if (base) {
              desc = Object.getOwnPropertyDescriptor(base, property2);
              if (desc.set) {
                desc.set.call(receiver2, value2);
                return true;
              } else if (!desc.writable) {
                return false;
              }
            }
            desc = Object.getOwnPropertyDescriptor(receiver2, property2);
            if (desc) {
              if (!desc.writable) {
                return false;
              }
              desc.value = value2;
              Object.defineProperty(receiver2, property2, desc);
            } else {
              _defineProperty(receiver2, property2, value2);
            }
            return true;
          };
        }
        return set(target, property, value, receiver);
      }
      function _set(target, property, value, receiver, isStrict) {
        var s = set(target, property, value, receiver || target);
        if (!s && isStrict) {
          throw new Error("failed to set property");
        }
        return value;
      }
      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        return Object.freeze(
          Object.defineProperties(strings, {
            raw: {
              value: Object.freeze(raw)
            }
          })
        );
      }
      function _taggedTemplateLiteralLoose(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        strings.raw = raw;
        return strings;
      }
      function _temporalRef(val, name2) {
        if (val === _temporalUndefined) {
          throw new ReferenceError(name2 + " is not defined - temporal dead zone");
        } else {
          return val;
        }
      }
      function _readOnlyError(name2) {
        throw new Error('"' + name2 + '" is read-only');
      }
      function _classNameTDZError(name2) {
        throw new Error('Class "' + name2 + '" cannot be referenced in computed property keys.');
      }
      var _temporalUndefined = {};
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
      }
      function _slicedToArrayLoose(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
      }
      function _toArray(arr) {
        return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        }
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
          return Array.from(iter);
      }
      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _iterableToArrayLimitLoose(arr, i) {
        var _arr = [];
        for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done; ) {
          _arr.push(_step.value);
          if (i && _arr.length === i) break;
        }
        return _arr;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _skipFirstGeneratorNext(fn2) {
        return function() {
          var it = fn2.apply(this, arguments);
          it.next();
          return it;
        };
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res2 = prim.call(input, hint || "default");
          if (typeof res2 !== "object") return res2;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _initializerWarningHelper(descriptor, context) {
        throw new Error(
          "Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2."
        );
      }
      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }
      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function(key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ("value" in desc || desc.initializer) {
          desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function(desc2, decorator) {
          return decorator(target, property, desc2) || desc2;
        }, desc);
        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = void 0;
        }
        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }
        return desc;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name2) {
        return "__private_" + id++ + "_" + name2;
      }
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      function _classPrivateFieldGet(receiver, privateMap) {
        var descriptor = privateMap.get(receiver);
        if (!descriptor) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      function _classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = privateMap.get(receiver);
        if (!descriptor) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        if (descriptor.set) {
          descriptor.set.call(receiver, value);
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }
          descriptor.value = value;
        }
        return value;
      }
      function _classPrivateFieldDestructureSet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.set) {
          if (!("__destrObj" in descriptor)) {
            descriptor.__destrObj = {
              set value(v) {
                descriptor.set.call(receiver, v);
              }
            };
          }
          return descriptor.__destrObj;
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }
          return descriptor;
        }
      }
      function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        return descriptor.value;
      }
      function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        if (!descriptor.writable) {
          throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
        return value;
      }
      function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        return method;
      }
      function _classStaticPrivateMethodSet() {
        throw new TypeError("attempted to set read only static private field");
      }
      function _decorate(decorators, factory, superClass, mixins) {
        var api = _getDecoratorsApi();
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            api = mixins[i](api);
          }
        }
        var r = factory(function initialize(O) {
          api.initializeInstanceElements(O, decorated.elements);
        }, superClass);
        var decorated = api.decorateClass(
          _coalesceClassElements(r.d.map(_createElementDescriptor)),
          decorators
        );
        api.initializeClassElements(r.F, decorated.elements);
        return api.runClassFinishers(r.F, decorated.finishers);
      }
      function _getDecoratorsApi() {
        _getDecoratorsApi = function() {
          return api;
        };
        var api = {
          elementsDefinitionOrder: [["method"], ["field"]],
          initializeInstanceElements: function(O, elements) {
            ["method", "field"].forEach(function(kind) {
              elements.forEach(function(element) {
                if (element.kind === kind && element.placement === "own") {
                  this.defineClassElement(O, element);
                }
              }, this);
            }, this);
          },
          initializeClassElements: function(F, elements) {
            var proto = F.prototype;
            ["method", "field"].forEach(function(kind) {
              elements.forEach(function(element) {
                var placement = element.placement;
                if (element.kind === kind && (placement === "static" || placement === "prototype")) {
                  var receiver = placement === "static" ? F : proto;
                  this.defineClassElement(receiver, element);
                }
              }, this);
            }, this);
          },
          defineClassElement: function(receiver, element) {
            var descriptor = element.descriptor;
            if (element.kind === "field") {
              var initializer = element.initializer;
              descriptor = {
                enumerable: descriptor.enumerable,
                writable: descriptor.writable,
                configurable: descriptor.configurable,
                value: initializer === void 0 ? void 0 : initializer.call(receiver)
              };
            }
            Object.defineProperty(receiver, element.key, descriptor);
          },
          decorateClass: function(elements, decorators) {
            var newElements = [];
            var finishers = [];
            var placements = {
              static: [],
              prototype: [],
              own: []
            };
            elements.forEach(function(element) {
              this.addElementPlacement(element, placements);
            }, this);
            elements.forEach(function(element) {
              if (!_hasDecorators(element)) return newElements.push(element);
              var elementFinishersExtras = this.decorateElement(element, placements);
              newElements.push(elementFinishersExtras.element);
              newElements.push.apply(newElements, elementFinishersExtras.extras);
              finishers.push.apply(finishers, elementFinishersExtras.finishers);
            }, this);
            if (!decorators) {
              return {
                elements: newElements,
                finishers
              };
            }
            var result = this.decorateConstructor(newElements, decorators);
            finishers.push.apply(finishers, result.finishers);
            result.finishers = finishers;
            return result;
          },
          addElementPlacement: function(element, placements, silent) {
            var keys = placements[element.placement];
            if (!silent && keys.indexOf(element.key) !== -1) {
              throw new TypeError("Duplicated element (" + element.key + ")");
            }
            keys.push(element.key);
          },
          decorateElement: function(element, placements) {
            var extras = [];
            var finishers = [];
            for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
              var keys = placements[element.placement];
              keys.splice(keys.indexOf(element.key), 1);
              var elementObject = this.fromElementDescriptor(element);
              var elementFinisherExtras = this.toElementFinisherExtras(
                (0, decorators[i])(elementObject) || elementObject
              );
              element = elementFinisherExtras.element;
              this.addElementPlacement(element, placements);
              if (elementFinisherExtras.finisher) {
                finishers.push(elementFinisherExtras.finisher);
              }
              var newExtras = elementFinisherExtras.extras;
              if (newExtras) {
                for (var j = 0; j < newExtras.length; j++) {
                  this.addElementPlacement(newExtras[j], placements);
                }
                extras.push.apply(extras, newExtras);
              }
            }
            return {
              element,
              finishers,
              extras
            };
          },
          decorateConstructor: function(elements, decorators) {
            var finishers = [];
            for (var i = decorators.length - 1; i >= 0; i--) {
              var obj = this.fromClassDescriptor(elements);
              var elementsAndFinisher = this.toClassDescriptor(
                (0, decorators[i])(obj) || obj
              );
              if (elementsAndFinisher.finisher !== void 0) {
                finishers.push(elementsAndFinisher.finisher);
              }
              if (elementsAndFinisher.elements !== void 0) {
                elements = elementsAndFinisher.elements;
                for (var j = 0; j < elements.length - 1; j++) {
                  for (var k = j + 1; k < elements.length; k++) {
                    if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                      throw new TypeError(
                        "Duplicated element (" + elements[j].key + ")"
                      );
                    }
                  }
                }
              }
            }
            return {
              elements,
              finishers
            };
          },
          fromElementDescriptor: function(element) {
            var obj = {
              kind: element.kind,
              key: element.key,
              placement: element.placement,
              descriptor: element.descriptor
            };
            var desc = {
              value: "Descriptor",
              configurable: true
            };
            Object.defineProperty(obj, Symbol.toStringTag, desc);
            if (element.kind === "field") obj.initializer = element.initializer;
            return obj;
          },
          toElementDescriptors: function(elementObjects) {
            if (elementObjects === void 0) return;
            return _toArray(elementObjects).map(function(elementObject) {
              var element = this.toElementDescriptor(elementObject);
              this.disallowProperty(elementObject, "finisher", "An element descriptor");
              this.disallowProperty(elementObject, "extras", "An element descriptor");
              return element;
            }, this);
          },
          toElementDescriptor: function(elementObject) {
            var kind = String(elementObject.kind);
            if (kind !== "method" && kind !== "field") {
              throw new TypeError(
                `An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "` + kind + '"'
              );
            }
            var key = _toPropertyKey(elementObject.key);
            var placement = String(elementObject.placement);
            if (placement !== "static" && placement !== "prototype" && placement !== "own") {
              throw new TypeError(
                `An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "` + placement + '"'
              );
            }
            var descriptor = elementObject.descriptor;
            this.disallowProperty(elementObject, "elements", "An element descriptor");
            var element = {
              kind,
              key,
              placement,
              descriptor: Object.assign({}, descriptor)
            };
            if (kind !== "field") {
              this.disallowProperty(elementObject, "initializer", "A method descriptor");
            } else {
              this.disallowProperty(
                descriptor,
                "get",
                "The property descriptor of a field descriptor"
              );
              this.disallowProperty(
                descriptor,
                "set",
                "The property descriptor of a field descriptor"
              );
              this.disallowProperty(
                descriptor,
                "value",
                "The property descriptor of a field descriptor"
              );
              element.initializer = elementObject.initializer;
            }
            return element;
          },
          toElementFinisherExtras: function(elementObject) {
            var element = this.toElementDescriptor(elementObject);
            var finisher = _optionalCallableProperty(elementObject, "finisher");
            var extras = this.toElementDescriptors(elementObject.extras);
            return {
              element,
              finisher,
              extras
            };
          },
          fromClassDescriptor: function(elements) {
            var obj = {
              kind: "class",
              elements: elements.map(this.fromElementDescriptor, this)
            };
            var desc = {
              value: "Descriptor",
              configurable: true
            };
            Object.defineProperty(obj, Symbol.toStringTag, desc);
            return obj;
          },
          toClassDescriptor: function(obj) {
            var kind = String(obj.kind);
            if (kind !== "class") {
              throw new TypeError(
                `A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "` + kind + '"'
              );
            }
            this.disallowProperty(obj, "key", "A class descriptor");
            this.disallowProperty(obj, "placement", "A class descriptor");
            this.disallowProperty(obj, "descriptor", "A class descriptor");
            this.disallowProperty(obj, "initializer", "A class descriptor");
            this.disallowProperty(obj, "extras", "A class descriptor");
            var finisher = _optionalCallableProperty(obj, "finisher");
            var elements = this.toElementDescriptors(obj.elements);
            return {
              elements,
              finisher
            };
          },
          runClassFinishers: function(constructor, finishers) {
            for (var i = 0; i < finishers.length; i++) {
              var newConstructor = (0, finishers[i])(constructor);
              if (newConstructor !== void 0) {
                if (typeof newConstructor !== "function") {
                  throw new TypeError("Finishers must return a constructor.");
                }
                constructor = newConstructor;
              }
            }
            return constructor;
          },
          disallowProperty: function(obj, name2, objectType) {
            if (obj[name2] !== void 0) {
              throw new TypeError(objectType + " can't have a ." + name2 + " property.");
            }
          }
        };
        return api;
      }
      function _createElementDescriptor(def) {
        var key = _toPropertyKey(def.key);
        var descriptor;
        if (def.kind === "method") {
          descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "get") {
          descriptor = {
            get: def.value,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "set") {
          descriptor = {
            set: def.value,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "field") {
          descriptor = {
            configurable: true,
            writable: true,
            enumerable: true
          };
        }
        var element = {
          kind: def.kind === "field" ? "field" : "method",
          key,
          placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
          descriptor
        };
        if (def.decorators) element.decorators = def.decorators;
        if (def.kind === "field") element.initializer = def.value;
        return element;
      }
      function _coalesceGetterSetter(element, other) {
        if (element.descriptor.get !== void 0) {
          other.descriptor.get = element.descriptor.get;
        } else {
          other.descriptor.set = element.descriptor.set;
        }
      }
      function _coalesceClassElements(elements) {
        var newElements = [];
        var isSameElement = function(other2) {
          return other2.kind === "method" && other2.key === element.key && other2.placement === element.placement;
        };
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var other;
          if (element.kind === "method" && (other = newElements.find(isSameElement))) {
            if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
              if (_hasDecorators(element) || _hasDecorators(other)) {
                throw new ReferenceError(
                  "Duplicated methods (" + element.key + ") can't be decorated."
                );
              }
              other.descriptor = element.descriptor;
            } else {
              if (_hasDecorators(element)) {
                if (_hasDecorators(other)) {
                  throw new ReferenceError(
                    "Decorators can't be placed on different accessors with for the same property (" + element.key + ")."
                  );
                }
                other.decorators = element.decorators;
              }
              _coalesceGetterSetter(element, other);
            }
          } else {
            newElements.push(element);
          }
        }
        return newElements;
      }
      function _hasDecorators(element) {
        return element.decorators && element.decorators.length;
      }
      function _isDataDescriptor(desc) {
        return desc !== void 0 && !(desc.value === void 0 && desc.writable === void 0);
      }
      function _optionalCallableProperty(obj, name2) {
        var value = obj[name2];
        if (value !== void 0 && typeof value !== "function") {
          throw new TypeError("Expected '" + name2 + "' to be a function");
        }
        return value;
      }
      function _classPrivateMethodGet(receiver, privateSet, fn2) {
        if (!privateSet.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return fn2;
      }
      function _classPrivateMethodSet() {
        throw new TypeError("attempted to reassign private method");
      }
      function _wrapRegExp(re, groups) {
        _wrapRegExp = function(re2, groups2) {
          return new BabelRegExp(re2, groups2);
        };
        var _RegExp = _wrapNativeSuper(RegExp);
        var _super = RegExp.prototype;
        var _groups = /* @__PURE__ */ new WeakMap();
        function BabelRegExp(re2, groups2) {
          var _this = _RegExp.call(this, re2);
          _groups.set(_this, groups2);
          return _this;
        }
        _inherits(BabelRegExp, _RegExp);
        BabelRegExp.prototype.exec = function(str) {
          var result = _super.exec.call(this, str);
          if (result) result.groups = buildGroups(result, this);
          return result;
        };
        BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
          if (typeof substitution === "string") {
            var groups2 = _groups.get(this);
            return _super[Symbol.replace].call(
              this,
              str,
              substitution.replace(/\$<([^>]+)>/g, function(_, name2) {
                return "$" + groups2[name2];
              })
            );
          } else if (typeof substitution === "function") {
            var _this = this;
            return _super[Symbol.replace].call(this, str, function() {
              var args = [];
              args.push.apply(args, arguments);
              if (typeof args[args.length - 1] !== "object") {
                args.push(buildGroups(args, _this));
              }
              return substitution.apply(this, args);
            });
          } else {
            return _super[Symbol.replace].call(this, str, substitution);
          }
        };
        function buildGroups(result, re2) {
          var g = _groups.get(re2);
          return Object.keys(g).reduce(function(groups2, name2) {
            groups2[name2] = result[g[name2]];
            return groups2;
          }, /* @__PURE__ */ Object.create(null));
        }
        return _wrapRegExp.apply(this, arguments);
      }
      var arrayRemove = function arrayRemove2(arr, index) {
        return arr.splice(index, 1);
      };
      var run = function run2(cb, sync) {
        if (sync) {
          cb();
        } else if (document.hidden) {
          Promise.resolve(1).then(cb);
        } else {
          setTimeout(cb, 0);
        }
      };
      var on = function on2() {
        var listeners2 = [];
        var off = function off2(event, cb) {
          arrayRemove(
            listeners2,
            listeners2.findIndex(function(listener) {
              return listener.event === event && (listener.cb === cb || !cb);
            })
          );
        };
        var _fire = function fire(event, args, sync) {
          listeners2.filter(function(listener) {
            return listener.event === event;
          }).map(function(listener) {
            return listener.cb;
          }).forEach(function(cb) {
            return run(function() {
              return cb.apply(void 0, _toConsumableArray(args));
            }, sync);
          });
        };
        return {
          fireSync: function fireSync(event) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            _fire(event, args, true);
          },
          fire: function fire(event) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            _fire(event, args, false);
          },
          on: function on3(event, cb) {
            listeners2.push({ event, cb });
          },
          onOnce: function onOnce(event, _cb) {
            listeners2.push({
              event,
              cb: function cb() {
                off(event, _cb);
                _cb.apply(void 0, arguments);
              }
            });
          },
          off
        };
      };
      var copyObjectPropertiesToObject = function copyObjectPropertiesToObject2(src, target, excluded) {
        Object.getOwnPropertyNames(src).filter(function(property) {
          return !excluded.includes(property);
        }).forEach(function(key) {
          return Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(src, key)
          );
        });
      };
      var PRIVATE = [
        "fire",
        "process",
        "revert",
        "load",
        "on",
        "off",
        "onOnce",
        "retryLoad",
        "extend",
        "archive",
        "archived",
        "release",
        "released",
        "requestProcessing",
        "freeze"
      ];
      var createItemAPI = function createItemAPI2(item2) {
        var api = {};
        copyObjectPropertiesToObject(item2, api, PRIVATE);
        return api;
      };
      var removeReleasedItems = function removeReleasedItems2(items) {
        items.forEach(function(item2, index) {
          if (item2.released) {
            arrayRemove(items, index);
          }
        });
      };
      var ItemStatus = {
        INIT: 1,
        IDLE: 2,
        PROCESSING_QUEUED: 9,
        PROCESSING: 3,
        PROCESSING_COMPLETE: 5,
        PROCESSING_ERROR: 6,
        PROCESSING_REVERT_ERROR: 10,
        LOADING: 7,
        LOAD_ERROR: 8
      };
      var FileOrigin = {
        INPUT: 1,
        LIMBO: 2,
        LOCAL: 3
      };
      var getNonNumeric = function getNonNumeric2(str) {
        return /[^0-9]+/.exec(str);
      };
      var getDecimalSeparator = function getDecimalSeparator2() {
        return getNonNumeric(1.1.toLocaleString())[0];
      };
      var getThousandsSeparator = function getThousandsSeparator2() {
        var decimalSeparator = getDecimalSeparator();
        var thousandsStringWithSeparator = 1e3.toLocaleString();
        var thousandsStringWithoutSeparator = 1e3.toString();
        if (thousandsStringWithSeparator !== thousandsStringWithoutSeparator) {
          return getNonNumeric(thousandsStringWithSeparator)[0];
        }
        return decimalSeparator === "." ? "," : ".";
      };
      var Type = {
        BOOLEAN: "boolean",
        INT: "int",
        NUMBER: "number",
        STRING: "string",
        ARRAY: "array",
        OBJECT: "object",
        FUNCTION: "function",
        ACTION: "action",
        SERVER_API: "serverapi",
        REGEX: "regex"
      };
      var filters = [];
      var applyFilterChain = function applyFilterChain2(key, value, utils) {
        return new Promise(function(resolve, reject) {
          var matchingFilters = filters.filter(function(f) {
            return f.key === key;
          }).map(function(f) {
            return f.cb;
          });
          if (matchingFilters.length === 0) {
            resolve(value);
            return;
          }
          var initialFilter = matchingFilters.shift();
          matchingFilters.reduce(
            // loop over promises passing value to next promise
            function(current, next) {
              return current.then(function(value2) {
                return next(value2, utils);
              });
            },
            // call initial filter, will return a promise
            initialFilter(value, utils)
            // all executed
          ).then(function(value2) {
            return resolve(value2);
          }).catch(function(error2) {
            return reject(error2);
          });
        });
      };
      var applyFilters = function applyFilters2(key, value, utils) {
        return filters.filter(function(f) {
          return f.key === key;
        }).map(function(f) {
          return f.cb(value, utils);
        });
      };
      var addFilter = function addFilter2(key, cb) {
        return filters.push({ key, cb });
      };
      var extendDefaultOptions = function extendDefaultOptions2(additionalOptions) {
        return Object.assign(defaultOptions, additionalOptions);
      };
      var getOptions = function getOptions2() {
        return Object.assign({}, defaultOptions);
      };
      var setOptions = function setOptions2(opts) {
        forin(opts, function(key, value) {
          if (!defaultOptions[key]) {
            return;
          }
          defaultOptions[key][0] = getValueByType(
            value,
            defaultOptions[key][0],
            defaultOptions[key][1]
          );
        });
      };
      var defaultOptions = {
        // the id to add to the root element
        id: [null, Type.STRING],
        // input field name to use
        name: ["filepond", Type.STRING],
        // disable the field
        disabled: [false, Type.BOOLEAN],
        // classname to put on wrapper
        className: [null, Type.STRING],
        // is the field required
        required: [false, Type.BOOLEAN],
        // Allow media capture when value is set
        captureMethod: [null, Type.STRING],
        // - "camera", "microphone" or "camcorder",
        // - Does not work with multiple on apple devices
        // - If set, acceptedFileTypes must be made to match with media wildcard "image/*", "audio/*" or "video/*"
        // sync `acceptedFileTypes` property with `accept` attribute
        allowSyncAcceptAttribute: [true, Type.BOOLEAN],
        // Feature toggles
        allowDrop: [true, Type.BOOLEAN],
        // Allow dropping of files
        allowBrowse: [true, Type.BOOLEAN],
        // Allow browsing the file system
        allowPaste: [true, Type.BOOLEAN],
        // Allow pasting files
        allowMultiple: [false, Type.BOOLEAN],
        // Allow multiple files (disabled by default, as multiple attribute is also required on input to allow multiple)
        allowReplace: [true, Type.BOOLEAN],
        // Allow dropping a file on other file to replace it (only works when multiple is set to false)
        allowRevert: [true, Type.BOOLEAN],
        // Allows user to revert file upload
        allowRemove: [true, Type.BOOLEAN],
        // Allow user to remove a file
        allowProcess: [true, Type.BOOLEAN],
        // Allows user to process a file, when set to false, this removes the file upload button
        allowReorder: [false, Type.BOOLEAN],
        // Allow reordering of files
        allowDirectoriesOnly: [false, Type.BOOLEAN],
        // Allow only selecting directories with browse (no support for filtering dnd at this point)
        // Try store file if `server` not set
        storeAsFile: [false, Type.BOOLEAN],
        // Revert mode
        forceRevert: [false, Type.BOOLEAN],
        // Set to 'force' to require the file to be reverted before removal
        // Input requirements
        maxFiles: [null, Type.INT],
        // Max number of files
        checkValidity: [false, Type.BOOLEAN],
        // Enables custom validity messages
        // Where to put file
        itemInsertLocationFreedom: [true, Type.BOOLEAN],
        // Set to false to always add items to begin or end of list
        itemInsertLocation: ["before", Type.STRING],
        // Default index in list to add items that have been dropped at the top of the list
        itemInsertInterval: [75, Type.INT],
        // Drag 'n Drop related
        dropOnPage: [false, Type.BOOLEAN],
        // Allow dropping of files anywhere on page (prevents browser from opening file if dropped outside of Up)
        dropOnElement: [true, Type.BOOLEAN],
        // Drop needs to happen on element (set to false to also load drops outside of Up)
        dropValidation: [false, Type.BOOLEAN],
        // Enable or disable validating files on drop
        ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], Type.ARRAY],
        // Upload related
        instantUpload: [true, Type.BOOLEAN],
        // Should upload files immediately on drop
        maxParallelUploads: [2, Type.INT],
        // Maximum files to upload in parallel
        allowMinimumUploadDuration: [true, Type.BOOLEAN],
        // if true uploads take at least 750 ms, this ensures the user sees the upload progress giving trust the upload actually happened
        // Chunks
        chunkUploads: [false, Type.BOOLEAN],
        // Enable chunked uploads
        chunkForce: [false, Type.BOOLEAN],
        // Force use of chunk uploads even for files smaller than chunk size
        chunkSize: [5e6, Type.INT],
        // Size of chunks (5MB default)
        chunkRetryDelays: [[500, 1e3, 3e3], Type.ARRAY],
        // Amount of times to retry upload of a chunk when it fails
        // The server api end points to use for uploading (see docs)
        server: [null, Type.SERVER_API],
        // File size calculations, can set to 1024, this is only used for display, properties use file size base 1000
        fileSizeBase: [1e3, Type.INT],
        // Labels and status messages
        labelFileSizeBytes: ["bytes", Type.STRING],
        labelFileSizeKilobytes: ["KB", Type.STRING],
        labelFileSizeMegabytes: ["MB", Type.STRING],
        labelFileSizeGigabytes: ["GB", Type.STRING],
        labelDecimalSeparator: [getDecimalSeparator(), Type.STRING],
        // Default is locale separator
        labelThousandsSeparator: [getThousandsSeparator(), Type.STRING],
        // Default is locale separator
        labelIdle: [
          'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
          Type.STRING
        ],
        labelInvalidField: ["Field contains invalid files", Type.STRING],
        labelFileWaitingForSize: ["Waiting for size", Type.STRING],
        labelFileSizeNotAvailable: ["Size not available", Type.STRING],
        labelFileCountSingular: ["file in list", Type.STRING],
        labelFileCountPlural: ["files in list", Type.STRING],
        labelFileLoading: ["Loading", Type.STRING],
        labelFileAdded: ["Added", Type.STRING],
        // assistive only
        labelFileLoadError: ["Error during load", Type.STRING],
        labelFileRemoved: ["Removed", Type.STRING],
        // assistive only
        labelFileRemoveError: ["Error during remove", Type.STRING],
        labelFileProcessing: ["Uploading", Type.STRING],
        labelFileProcessingComplete: ["Upload complete", Type.STRING],
        labelFileProcessingAborted: ["Upload cancelled", Type.STRING],
        labelFileProcessingError: ["Error during upload", Type.STRING],
        labelFileProcessingRevertError: ["Error during revert", Type.STRING],
        labelTapToCancel: ["tap to cancel", Type.STRING],
        labelTapToRetry: ["tap to retry", Type.STRING],
        labelTapToUndo: ["tap to undo", Type.STRING],
        labelButtonRemoveItem: ["Remove", Type.STRING],
        labelButtonAbortItemLoad: ["Abort", Type.STRING],
        labelButtonRetryItemLoad: ["Retry", Type.STRING],
        labelButtonAbortItemProcessing: ["Cancel", Type.STRING],
        labelButtonUndoItemProcessing: ["Undo", Type.STRING],
        labelButtonRetryItemProcessing: ["Retry", Type.STRING],
        labelButtonProcessItem: ["Upload", Type.STRING],
        // make sure width and height plus viewpox are even numbers so icons are nicely centered
        iconRemove: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
          Type.STRING
        ],
        iconProcess: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
          Type.STRING
        ],
        iconRetry: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
          Type.STRING
        ],
        iconUndo: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
          Type.STRING
        ],
        iconDone: [
          '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
          Type.STRING
        ],
        // event handlers
        oninit: [null, Type.FUNCTION],
        onwarning: [null, Type.FUNCTION],
        onerror: [null, Type.FUNCTION],
        onactivatefile: [null, Type.FUNCTION],
        oninitfile: [null, Type.FUNCTION],
        onaddfilestart: [null, Type.FUNCTION],
        onaddfileprogress: [null, Type.FUNCTION],
        onaddfile: [null, Type.FUNCTION],
        onprocessfilestart: [null, Type.FUNCTION],
        onprocessfileprogress: [null, Type.FUNCTION],
        onprocessfileabort: [null, Type.FUNCTION],
        onprocessfilerevert: [null, Type.FUNCTION],
        onprocessfile: [null, Type.FUNCTION],
        onprocessfiles: [null, Type.FUNCTION],
        onremovefile: [null, Type.FUNCTION],
        onpreparefile: [null, Type.FUNCTION],
        onupdatefiles: [null, Type.FUNCTION],
        onreorderfiles: [null, Type.FUNCTION],
        // hooks
        beforeDropFile: [null, Type.FUNCTION],
        beforeAddFile: [null, Type.FUNCTION],
        beforeRemoveFile: [null, Type.FUNCTION],
        beforePrepareFile: [null, Type.FUNCTION],
        // styles
        stylePanelLayout: [null, Type.STRING],
        // null 'integrated', 'compact', 'circle'
        stylePanelAspectRatio: [null, Type.STRING],
        // null or '3:2' or 1
        styleItemPanelAspectRatio: [null, Type.STRING],
        styleButtonRemoveItemPosition: ["left", Type.STRING],
        styleButtonProcessItemPosition: ["right", Type.STRING],
        styleLoadIndicatorPosition: ["right", Type.STRING],
        styleProgressIndicatorPosition: ["right", Type.STRING],
        styleButtonRemoveItemAlign: [false, Type.BOOLEAN],
        // custom initial files array
        files: [[], Type.ARRAY],
        // show support by displaying credits
        credits: [["https://pqina.nl/", "Powered by PQINA"], Type.ARRAY]
      };
      var getItemByQuery = function getItemByQuery2(items, query) {
        if (isEmpty(query)) {
          return items[0] || null;
        }
        if (isInt(query)) {
          return items[query] || null;
        }
        if (typeof query === "object") {
          query = query.id;
        }
        return items.find(function(item2) {
          return item2.id === query;
        }) || null;
      };
      var getNumericAspectRatioFromString = function getNumericAspectRatioFromString2(aspectRatio) {
        if (isEmpty(aspectRatio)) {
          return aspectRatio;
        }
        if (/:/.test(aspectRatio)) {
          var parts = aspectRatio.split(":");
          return parts[1] / parts[0];
        }
        return parseFloat(aspectRatio);
      };
      var getActiveItems = function getActiveItems2(items) {
        return items.filter(function(item2) {
          return !item2.archived;
        });
      };
      var Status = {
        EMPTY: 0,
        IDLE: 1,
        // waiting
        ERROR: 2,
        // a file is in error state
        BUSY: 3,
        // busy processing or loading
        READY: 4
        // all files uploaded
      };
      var res = null;
      var canUpdateFileInput = function canUpdateFileInput2() {
        if (res === null) {
          try {
            var dataTransfer = new DataTransfer();
            dataTransfer.items.add(new File(["hello world"], "This_Works.txt"));
            var el = document.createElement("input");
            el.setAttribute("type", "file");
            el.files = dataTransfer.files;
            res = el.files.length === 1;
          } catch (err) {
            res = false;
          }
        }
        return res;
      };
      var ITEM_ERROR = [
        ItemStatus.LOAD_ERROR,
        ItemStatus.PROCESSING_ERROR,
        ItemStatus.PROCESSING_REVERT_ERROR
      ];
      var ITEM_BUSY = [
        ItemStatus.LOADING,
        ItemStatus.PROCESSING,
        ItemStatus.PROCESSING_QUEUED,
        ItemStatus.INIT
      ];
      var ITEM_READY = [ItemStatus.PROCESSING_COMPLETE];
      var isItemInErrorState = function isItemInErrorState2(item2) {
        return ITEM_ERROR.includes(item2.status);
      };
      var isItemInBusyState = function isItemInBusyState2(item2) {
        return ITEM_BUSY.includes(item2.status);
      };
      var isItemInReadyState = function isItemInReadyState2(item2) {
        return ITEM_READY.includes(item2.status);
      };
      var isAsync = function isAsync2(state2) {
        return isObject(state2.options.server) && (isObject(state2.options.server.process) || isFunction(state2.options.server.process));
      };
      var queries = function queries2(state2) {
        return {
          GET_STATUS: function GET_STATUS() {
            var items = getActiveItems(state2.items);
            var EMPTY = Status.EMPTY, ERROR = Status.ERROR, BUSY = Status.BUSY, IDLE = Status.IDLE, READY = Status.READY;
            if (items.length === 0) return EMPTY;
            if (items.some(isItemInErrorState)) return ERROR;
            if (items.some(isItemInBusyState)) return BUSY;
            if (items.some(isItemInReadyState)) return READY;
            return IDLE;
          },
          GET_ITEM: function GET_ITEM(query) {
            return getItemByQuery(state2.items, query);
          },
          GET_ACTIVE_ITEM: function GET_ACTIVE_ITEM(query) {
            return getItemByQuery(getActiveItems(state2.items), query);
          },
          GET_ACTIVE_ITEMS: function GET_ACTIVE_ITEMS() {
            return getActiveItems(state2.items);
          },
          GET_ITEMS: function GET_ITEMS() {
            return state2.items;
          },
          GET_ITEM_NAME: function GET_ITEM_NAME(query) {
            var item2 = getItemByQuery(state2.items, query);
            return item2 ? item2.filename : null;
          },
          GET_ITEM_SIZE: function GET_ITEM_SIZE(query) {
            var item2 = getItemByQuery(state2.items, query);
            return item2 ? item2.fileSize : null;
          },
          GET_STYLES: function GET_STYLES() {
            return Object.keys(state2.options).filter(function(key) {
              return /^style/.test(key);
            }).map(function(option2) {
              return {
                name: option2,
                value: state2.options[option2]
              };
            });
          },
          GET_PANEL_ASPECT_RATIO: function GET_PANEL_ASPECT_RATIO() {
            var isShapeCircle = /circle/.test(state2.options.stylePanelLayout);
            var aspectRatio = isShapeCircle ? 1 : getNumericAspectRatioFromString(state2.options.stylePanelAspectRatio);
            return aspectRatio;
          },
          GET_ITEM_PANEL_ASPECT_RATIO: function GET_ITEM_PANEL_ASPECT_RATIO() {
            return state2.options.styleItemPanelAspectRatio;
          },
          GET_ITEMS_BY_STATUS: function GET_ITEMS_BY_STATUS(status) {
            return getActiveItems(state2.items).filter(function(item2) {
              return item2.status === status;
            });
          },
          GET_TOTAL_ITEMS: function GET_TOTAL_ITEMS() {
            return getActiveItems(state2.items).length;
          },
          SHOULD_UPDATE_FILE_INPUT: function SHOULD_UPDATE_FILE_INPUT() {
            return state2.options.storeAsFile && canUpdateFileInput() && !isAsync(state2);
          },
          IS_ASYNC: function IS_ASYNC() {
            return isAsync(state2);
          },
          GET_FILE_SIZE_LABELS: function GET_FILE_SIZE_LABELS(query) {
            return {
              labelBytes: query("GET_LABEL_FILE_SIZE_BYTES") || void 0,
              labelKilobytes: query("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
              labelMegabytes: query("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
              labelGigabytes: query("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0
            };
          }
        };
      };
      var hasRoomForItem = function hasRoomForItem2(state2) {
        var count = getActiveItems(state2.items).length;
        if (!state2.options.allowMultiple) {
          return count === 0;
        }
        var maxFileCount = state2.options.maxFiles;
        if (maxFileCount === null) {
          return true;
        }
        if (count < maxFileCount) {
          return true;
        }
        return false;
      };
      var limit = function limit2(value, min, max) {
        return Math.max(Math.min(max, value), min);
      };
      var arrayInsert = function arrayInsert2(arr, index, item2) {
        return arr.splice(index, 0, item2);
      };
      var insertItem = function insertItem2(items, item2, index) {
        if (isEmpty(item2)) {
          return null;
        }
        if (typeof index === "undefined") {
          items.push(item2);
          return item2;
        }
        index = limit(index, 0, items.length);
        arrayInsert(items, index, item2);
        return item2;
      };
      var isBase64DataURI = function isBase64DataURI2(str) {
        return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
          str
        );
      };
      var getFilenameFromURL = function getFilenameFromURL2(url) {
        return ("" + url).split("/").pop().split("?").shift();
      };
      var getExtensionFromFilename = function getExtensionFromFilename2(name2) {
        return name2.split(".").pop();
      };
      var guesstimateExtension = function guesstimateExtension2(type) {
        if (typeof type !== "string") {
          return "";
        }
        var subtype = type.split("/").pop();
        if (/svg/.test(subtype)) {
          return "svg";
        }
        if (/zip|compressed/.test(subtype)) {
          return "zip";
        }
        if (/plain/.test(subtype)) {
          return "txt";
        }
        if (/msword/.test(subtype)) {
          return "doc";
        }
        if (/[a-z]+/.test(subtype)) {
          if (subtype === "jpeg") {
            return "jpg";
          }
          return subtype;
        }
        return "";
      };
      var leftPad = function leftPad2(value) {
        var padding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        return (padding + value).slice(-padding.length);
      };
      var getDateString = function getDateString2() {
        var date = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
        return date.getFullYear() + "-" + leftPad(date.getMonth() + 1, "00") + "-" + leftPad(date.getDate(), "00") + "_" + leftPad(date.getHours(), "00") + "-" + leftPad(date.getMinutes(), "00") + "-" + leftPad(date.getSeconds(), "00");
      };
      var getFileFromBlob = function getFileFromBlob2(blob2, filename) {
        var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        var extension = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        var file2 = typeof type === "string" ? blob2.slice(0, blob2.size, type) : blob2.slice(0, blob2.size, blob2.type);
        file2.lastModifiedDate = /* @__PURE__ */ new Date();
        if (blob2._relativePath) file2._relativePath = blob2._relativePath;
        if (!isString(filename)) {
          filename = getDateString();
        }
        if (filename && extension === null && getExtensionFromFilename(filename)) {
          file2.name = filename;
        } else {
          extension = extension || guesstimateExtension(file2.type);
          file2.name = filename + (extension ? "." + extension : "");
        }
        return file2;
      };
      var getBlobBuilder = function getBlobBuilder2() {
        return window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      };
      var createBlob = function createBlob2(arrayBuffer, mimeType) {
        var BB = getBlobBuilder();
        if (BB) {
          var bb = new BB();
          bb.append(arrayBuffer);
          return bb.getBlob(mimeType);
        }
        return new Blob([arrayBuffer], {
          type: mimeType
        });
      };
      var getBlobFromByteStringWithMimeType = function getBlobFromByteStringWithMimeType2(byteString, mimeType) {
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return createBlob(ab, mimeType);
      };
      var getMimeTypeFromBase64DataURI = function getMimeTypeFromBase64DataURI2(dataURI) {
        return (/^data:(.+);/.exec(dataURI) || [])[1] || null;
      };
      var getBase64DataFromBase64DataURI = function getBase64DataFromBase64DataURI2(dataURI) {
        var data3 = dataURI.split(",")[1];
        return data3.replace(/\s/g, "");
      };
      var getByteStringFromBase64DataURI = function getByteStringFromBase64DataURI2(dataURI) {
        return atob(getBase64DataFromBase64DataURI(dataURI));
      };
      var getBlobFromBase64DataURI = function getBlobFromBase64DataURI2(dataURI) {
        var mimeType = getMimeTypeFromBase64DataURI(dataURI);
        var byteString = getByteStringFromBase64DataURI(dataURI);
        return getBlobFromByteStringWithMimeType(byteString, mimeType);
      };
      var getFileFromBase64DataURI = function getFileFromBase64DataURI2(dataURI, filename, extension) {
        return getFileFromBlob(getBlobFromBase64DataURI(dataURI), filename, null, extension);
      };
      var getFileNameFromHeader = function getFileNameFromHeader2(header) {
        if (!/^content-disposition:/i.test(header)) return null;
        var matches = header.split(/filename=|filename\*=.+''/).splice(1).map(function(name2) {
          return name2.trim().replace(/^["']|[;"']{0,2}$/g, "");
        }).filter(function(name2) {
          return name2.length;
        });
        return matches.length ? decodeURI(matches[matches.length - 1]) : null;
      };
      var getFileSizeFromHeader = function getFileSizeFromHeader2(header) {
        if (/content-length:/i.test(header)) {
          var size = header.match(/[0-9]+/)[0];
          return size ? parseInt(size, 10) : null;
        }
        return null;
      };
      var getTranfserIdFromHeader = function getTranfserIdFromHeader2(header) {
        if (/x-content-transfer-id:/i.test(header)) {
          var id2 = (header.split(":")[1] || "").trim();
          return id2 || null;
        }
        return null;
      };
      var getFileInfoFromHeaders = function getFileInfoFromHeaders2(headers) {
        var info = {
          source: null,
          name: null,
          size: null
        };
        var rows = headers.split("\n");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var header = _step.value;
            var name2 = getFileNameFromHeader(header);
            if (name2) {
              info.name = name2;
              continue;
            }
            var size = getFileSizeFromHeader(header);
            if (size) {
              info.size = size;
              continue;
            }
            var source = getTranfserIdFromHeader(header);
            if (source) {
              info.source = source;
              continue;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        return info;
      };
      var createFileLoader = function createFileLoader2(fetchFn) {
        var state2 = {
          source: null,
          complete: false,
          progress: 0,
          size: null,
          timestamp: null,
          duration: 0,
          request: null
        };
        var getProgress = function getProgress2() {
          return state2.progress;
        };
        var abort = function abort2() {
          if (state2.request && state2.request.abort) {
            state2.request.abort();
          }
        };
        var load = function load2() {
          var source = state2.source;
          api.fire("init", source);
          if (source instanceof File) {
            api.fire("load", source);
          } else if (source instanceof Blob) {
            api.fire("load", getFileFromBlob(source, source.name));
          } else if (isBase64DataURI(source)) {
            api.fire("load", getFileFromBase64DataURI(source));
          } else {
            loadURL(source);
          }
        };
        var loadURL = function loadURL2(url) {
          if (!fetchFn) {
            api.fire("error", {
              type: "error",
              body: "Can't load URL",
              code: 400
            });
            return;
          }
          state2.timestamp = Date.now();
          state2.request = fetchFn(
            url,
            function(response) {
              state2.duration = Date.now() - state2.timestamp;
              state2.complete = true;
              if (response instanceof Blob) {
                response = getFileFromBlob(
                  response,
                  response.name || getFilenameFromURL(url)
                );
              }
              api.fire(
                "load",
                // if has received blob, we go with blob, if no response, we return null
                response instanceof Blob ? response : response ? response.body : null
              );
            },
            function(error2) {
              api.fire(
                "error",
                typeof error2 === "string" ? {
                  type: "error",
                  code: 0,
                  body: error2
                } : error2
              );
            },
            function(computable, current, total) {
              if (total) {
                state2.size = total;
              }
              state2.duration = Date.now() - state2.timestamp;
              if (!computable) {
                state2.progress = null;
                return;
              }
              state2.progress = current / total;
              api.fire("progress", state2.progress);
            },
            function() {
              api.fire("abort");
            },
            function(response) {
              var fileinfo = getFileInfoFromHeaders(
                typeof response === "string" ? response : response.headers
              );
              api.fire("meta", {
                size: state2.size || fileinfo.size,
                filename: fileinfo.name,
                source: fileinfo.source
              });
            }
          );
        };
        var api = Object.assign({}, on(), {
          setSource: function setSource(source) {
            return state2.source = source;
          },
          getProgress,
          // file load progress
          abort,
          // abort file load
          load
          // start load
        });
        return api;
      };
      var isGet = function isGet2(method) {
        return /GET|HEAD/.test(method);
      };
      var sendRequest = function sendRequest2(data3, url, options) {
        var api = {
          onheaders: function onheaders() {
          },
          onprogress: function onprogress() {
          },
          onload: function onload() {
          },
          ontimeout: function ontimeout() {
          },
          onerror: function onerror() {
          },
          onabort: function onabort() {
          },
          abort: function abort() {
            aborted = true;
            xhr.abort();
          }
        };
        var aborted = false;
        var headersReceived = false;
        options = Object.assign(
          {
            method: "POST",
            headers: {},
            withCredentials: false
          },
          options
        );
        url = encodeURI(url);
        if (isGet(options.method) && data3) {
          url = "" + url + encodeURIComponent(typeof data3 === "string" ? data3 : JSON.stringify(data3));
        }
        var xhr = new XMLHttpRequest();
        var process = isGet(options.method) ? xhr : xhr.upload;
        process.onprogress = function(e) {
          if (aborted) {
            return;
          }
          api.onprogress(e.lengthComputable, e.loaded, e.total);
        };
        xhr.onreadystatechange = function() {
          if (xhr.readyState < 2) {
            return;
          }
          if (xhr.readyState === 4 && xhr.status === 0) {
            return;
          }
          if (headersReceived) {
            return;
          }
          headersReceived = true;
          api.onheaders(xhr);
        };
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            api.onload(xhr);
          } else {
            api.onerror(xhr);
          }
        };
        xhr.onerror = function() {
          return api.onerror(xhr);
        };
        xhr.onabort = function() {
          aborted = true;
          api.onabort();
        };
        xhr.ontimeout = function() {
          return api.ontimeout(xhr);
        };
        xhr.open(options.method, url, true);
        if (isInt(options.timeout)) {
          xhr.timeout = options.timeout;
        }
        Object.keys(options.headers).forEach(function(key) {
          var value = unescape(encodeURIComponent(options.headers[key]));
          xhr.setRequestHeader(key, value);
        });
        if (options.responseType) {
          xhr.responseType = options.responseType;
        }
        if (options.withCredentials) {
          xhr.withCredentials = true;
        }
        xhr.send(data3);
        return api;
      };
      var createResponse = function createResponse2(type, code, body, headers) {
        return {
          type,
          code,
          body,
          headers
        };
      };
      var createTimeoutResponse = function createTimeoutResponse2(cb) {
        return function(xhr) {
          cb(createResponse("error", 0, "Timeout", xhr.getAllResponseHeaders()));
        };
      };
      var hasQS = function hasQS2(str) {
        return /\?/.test(str);
      };
      var buildURL = function buildURL2() {
        var url = "";
        for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
          parts[_key] = arguments[_key];
        }
        parts.forEach(function(part) {
          url += hasQS(url) && hasQS(part) ? part.replace(/\?/, "&") : part;
        });
        return url;
      };
      var createFetchFunction = function createFetchFunction2() {
        var apiUrl = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var action = arguments.length > 1 ? arguments[1] : void 0;
        if (typeof action === "function") {
          return action;
        }
        if (!action || !isString(action.url)) {
          return null;
        }
        var onload = action.onload || function(res2) {
          return res2;
        };
        var onerror = action.onerror || function(res2) {
          return null;
        };
        return function(url, load, error2, progress, abort, headers) {
          var request = sendRequest(
            url,
            buildURL(apiUrl, action.url),
            Object.assign({}, action, {
              responseType: "blob"
            })
          );
          request.onload = function(xhr) {
            var headers2 = xhr.getAllResponseHeaders();
            var filename = getFileInfoFromHeaders(headers2).name || getFilenameFromURL(url);
            load(
              createResponse(
                "load",
                xhr.status,
                action.method === "HEAD" ? null : getFileFromBlob(onload(xhr.response), filename),
                headers2
              )
            );
          };
          request.onerror = function(xhr) {
            error2(
              createResponse(
                "error",
                xhr.status,
                onerror(xhr.response) || xhr.statusText,
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.onheaders = function(xhr) {
            headers(createResponse("headers", xhr.status, null, xhr.getAllResponseHeaders()));
          };
          request.ontimeout = createTimeoutResponse(error2);
          request.onprogress = progress;
          request.onabort = abort;
          return request;
        };
      };
      var ChunkStatus = {
        QUEUED: 0,
        COMPLETE: 1,
        PROCESSING: 2,
        ERROR: 3,
        WAITING: 4
      };
      var processFileChunked = function processFileChunked2(apiUrl, action, name2, file2, metadata, load, error2, progress, abort, transfer, options) {
        var chunks = [];
        var chunkTransferId = options.chunkTransferId, chunkServer = options.chunkServer, chunkSize = options.chunkSize, chunkRetryDelays = options.chunkRetryDelays;
        var state2 = {
          serverId: chunkTransferId,
          aborted: false
        };
        var ondata = action.ondata || function(fd) {
          return fd;
        };
        var onload = action.onload || function(xhr, method) {
          return method === "HEAD" ? xhr.getResponseHeader("Upload-Offset") : xhr.response;
        };
        var onerror = action.onerror || function(res2) {
          return null;
        };
        var requestTransferId = function requestTransferId2(cb) {
          var formData = new FormData();
          if (isObject(metadata)) formData.append(name2, JSON.stringify(metadata));
          var headers = typeof action.headers === "function" ? action.headers(file2, metadata) : Object.assign(
            {},
            action.headers,
            {
              "Upload-Length": file2.size
            }
          );
          var requestParams = Object.assign({}, action, {
            headers
          });
          var request = sendRequest(
            ondata(formData),
            buildURL(apiUrl, action.url),
            requestParams
          );
          request.onload = function(xhr) {
            return cb(onload(xhr, requestParams.method));
          };
          request.onerror = function(xhr) {
            return error2(
              createResponse(
                "error",
                xhr.status,
                onerror(xhr.response) || xhr.statusText,
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.ontimeout = createTimeoutResponse(error2);
        };
        var requestTransferOffset = function requestTransferOffset2(cb) {
          var requestUrl = buildURL(apiUrl, chunkServer.url, state2.serverId);
          var headers = typeof action.headers === "function" ? action.headers(state2.serverId) : Object.assign(
            {},
            action.headers
          );
          var requestParams = {
            headers,
            method: "HEAD"
          };
          var request = sendRequest(null, requestUrl, requestParams);
          request.onload = function(xhr) {
            return cb(onload(xhr, requestParams.method));
          };
          request.onerror = function(xhr) {
            return error2(
              createResponse(
                "error",
                xhr.status,
                onerror(xhr.response) || xhr.statusText,
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.ontimeout = createTimeoutResponse(error2);
        };
        var lastChunkIndex = Math.floor(file2.size / chunkSize);
        for (var i = 0; i <= lastChunkIndex; i++) {
          var offset = i * chunkSize;
          var data3 = file2.slice(offset, offset + chunkSize, "application/offset+octet-stream");
          chunks[i] = {
            index: i,
            size: data3.size,
            offset,
            data: data3,
            file: file2,
            progress: 0,
            retries: _toConsumableArray(chunkRetryDelays),
            status: ChunkStatus.QUEUED,
            error: null,
            request: null,
            timeout: null
          };
        }
        var completeProcessingChunks = function completeProcessingChunks2() {
          return load(state2.serverId);
        };
        var canProcessChunk = function canProcessChunk2(chunk) {
          return chunk.status === ChunkStatus.QUEUED || chunk.status === ChunkStatus.ERROR;
        };
        var processChunk = function processChunk2(chunk) {
          if (state2.aborted) return;
          chunk = chunk || chunks.find(canProcessChunk);
          if (!chunk) {
            if (chunks.every(function(chunk2) {
              return chunk2.status === ChunkStatus.COMPLETE;
            })) {
              completeProcessingChunks();
            }
            return;
          }
          chunk.status = ChunkStatus.PROCESSING;
          chunk.progress = null;
          var ondata2 = chunkServer.ondata || function(fd) {
            return fd;
          };
          var onerror2 = chunkServer.onerror || function(res2) {
            return null;
          };
          var onload2 = chunkServer.onload || function() {
          };
          var requestUrl = buildURL(apiUrl, chunkServer.url, state2.serverId);
          var headers = typeof chunkServer.headers === "function" ? chunkServer.headers(chunk) : Object.assign(
            {},
            chunkServer.headers,
            {
              "Content-Type": "application/offset+octet-stream",
              "Upload-Offset": chunk.offset,
              "Upload-Length": file2.size,
              "Upload-Name": file2.name
            }
          );
          var request = chunk.request = sendRequest(
            ondata2(chunk.data),
            requestUrl,
            Object.assign({}, chunkServer, {
              headers
            })
          );
          request.onload = function(xhr) {
            onload2(xhr, chunk.index, chunks.length);
            chunk.status = ChunkStatus.COMPLETE;
            chunk.request = null;
            processChunks();
          };
          request.onprogress = function(lengthComputable, loaded, total) {
            chunk.progress = lengthComputable ? loaded : null;
            updateTotalProgress();
          };
          request.onerror = function(xhr) {
            chunk.status = ChunkStatus.ERROR;
            chunk.request = null;
            chunk.error = onerror2(xhr.response) || xhr.statusText;
            if (!retryProcessChunk(chunk)) {
              error2(
                createResponse(
                  "error",
                  xhr.status,
                  onerror2(xhr.response) || xhr.statusText,
                  xhr.getAllResponseHeaders()
                )
              );
            }
          };
          request.ontimeout = function(xhr) {
            chunk.status = ChunkStatus.ERROR;
            chunk.request = null;
            if (!retryProcessChunk(chunk)) {
              createTimeoutResponse(error2)(xhr);
            }
          };
          request.onabort = function() {
            chunk.status = ChunkStatus.QUEUED;
            chunk.request = null;
            abort();
          };
        };
        var retryProcessChunk = function retryProcessChunk2(chunk) {
          if (chunk.retries.length === 0) return false;
          chunk.status = ChunkStatus.WAITING;
          clearTimeout(chunk.timeout);
          chunk.timeout = setTimeout(function() {
            processChunk(chunk);
          }, chunk.retries.shift());
          return true;
        };
        var updateTotalProgress = function updateTotalProgress2() {
          var totalBytesTransfered = chunks.reduce(function(p, chunk) {
            if (p === null || chunk.progress === null) return null;
            return p + chunk.progress;
          }, 0);
          if (totalBytesTransfered === null) return progress(false, 0, 0);
          var totalSize = chunks.reduce(function(total, chunk) {
            return total + chunk.size;
          }, 0);
          progress(true, totalBytesTransfered, totalSize);
        };
        var processChunks = function processChunks2() {
          var totalProcessing = chunks.filter(function(chunk) {
            return chunk.status === ChunkStatus.PROCESSING;
          }).length;
          if (totalProcessing >= 1) return;
          processChunk();
        };
        var abortChunks = function abortChunks2() {
          chunks.forEach(function(chunk) {
            clearTimeout(chunk.timeout);
            if (chunk.request) {
              chunk.request.abort();
            }
          });
        };
        if (!state2.serverId) {
          requestTransferId(function(serverId) {
            if (state2.aborted) return;
            transfer(serverId);
            state2.serverId = serverId;
            processChunks();
          });
        } else {
          requestTransferOffset(function(offset2) {
            if (state2.aborted) return;
            chunks.filter(function(chunk) {
              return chunk.offset < offset2;
            }).forEach(function(chunk) {
              chunk.status = ChunkStatus.COMPLETE;
              chunk.progress = chunk.size;
            });
            processChunks();
          });
        }
        return {
          abort: function abort2() {
            state2.aborted = true;
            abortChunks();
          }
        };
      };
      var createFileProcessorFunction = function createFileProcessorFunction2(apiUrl, action, name2, options) {
        return function(file2, metadata, load, error2, progress, abort, transfer) {
          if (!file2) return;
          var canChunkUpload = options.chunkUploads;
          var shouldChunkUpload = canChunkUpload && file2.size > options.chunkSize;
          var willChunkUpload = canChunkUpload && (shouldChunkUpload || options.chunkForce);
          if (file2 instanceof Blob && willChunkUpload)
            return processFileChunked(
              apiUrl,
              action,
              name2,
              file2,
              metadata,
              load,
              error2,
              progress,
              abort,
              transfer,
              options
            );
          var ondata = action.ondata || function(fd) {
            return fd;
          };
          var onload = action.onload || function(res2) {
            return res2;
          };
          var onerror = action.onerror || function(res2) {
            return null;
          };
          var headers = typeof action.headers === "function" ? action.headers(file2, metadata) || {} : Object.assign(
            {},
            action.headers
          );
          var requestParams = Object.assign({}, action, {
            headers
          });
          var formData = new FormData();
          if (isObject(metadata)) {
            formData.append(name2, JSON.stringify(metadata));
          }
          (file2 instanceof Blob ? [{ name: null, file: file2 }] : file2).forEach(function(item2) {
            formData.append(
              name2,
              item2.file,
              item2.name === null ? item2.file.name : "" + item2.name + item2.file.name
            );
          });
          var request = sendRequest(
            ondata(formData),
            buildURL(apiUrl, action.url),
            requestParams
          );
          request.onload = function(xhr) {
            load(
              createResponse(
                "load",
                xhr.status,
                onload(xhr.response),
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.onerror = function(xhr) {
            error2(
              createResponse(
                "error",
                xhr.status,
                onerror(xhr.response) || xhr.statusText,
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.ontimeout = createTimeoutResponse(error2);
          request.onprogress = progress;
          request.onabort = abort;
          return request;
        };
      };
      var createProcessorFunction = function createProcessorFunction2() {
        var apiUrl = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var action = arguments.length > 1 ? arguments[1] : void 0;
        var name2 = arguments.length > 2 ? arguments[2] : void 0;
        var options = arguments.length > 3 ? arguments[3] : void 0;
        if (typeof action === "function")
          return function() {
            for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
              params[_key] = arguments[_key];
            }
            return action.apply(void 0, [name2].concat(params, [options]));
          };
        if (!action || !isString(action.url)) return null;
        return createFileProcessorFunction(apiUrl, action, name2, options);
      };
      var createRevertFunction = function createRevertFunction2() {
        var apiUrl = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var action = arguments.length > 1 ? arguments[1] : void 0;
        if (typeof action === "function") {
          return action;
        }
        if (!action || !isString(action.url)) {
          return function(uniqueFileId, load) {
            return load();
          };
        }
        var onload = action.onload || function(res2) {
          return res2;
        };
        var onerror = action.onerror || function(res2) {
          return null;
        };
        return function(uniqueFileId, load, error2) {
          var request = sendRequest(
            uniqueFileId,
            apiUrl + action.url,
            action
            // contains method, headers and withCredentials properties
          );
          request.onload = function(xhr) {
            load(
              createResponse(
                "load",
                xhr.status,
                onload(xhr.response),
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.onerror = function(xhr) {
            error2(
              createResponse(
                "error",
                xhr.status,
                onerror(xhr.response) || xhr.statusText,
                xhr.getAllResponseHeaders()
              )
            );
          };
          request.ontimeout = createTimeoutResponse(error2);
          return request;
        };
      };
      var getRandomNumber = function getRandomNumber2() {
        var min = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        var max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        return min + Math.random() * (max - min);
      };
      var createPerceivedPerformanceUpdater = function createPerceivedPerformanceUpdater2(cb) {
        var duration = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
        var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        var tickMin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 25;
        var tickMax = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 250;
        var timeout = null;
        var start = Date.now();
        var tick = function tick2() {
          var runtime = Date.now() - start;
          var delay = getRandomNumber(tickMin, tickMax);
          if (runtime + delay > duration) {
            delay = runtime + delay - duration;
          }
          var progress = runtime / duration;
          if (progress >= 1 || document.hidden) {
            cb(1);
            return;
          }
          cb(progress);
          timeout = setTimeout(tick2, delay);
        };
        if (duration > 0) tick();
        return {
          clear: function clear2() {
            clearTimeout(timeout);
          }
        };
      };
      var createFileProcessor = function createFileProcessor2(processFn, options) {
        var state2 = {
          complete: false,
          perceivedProgress: 0,
          perceivedPerformanceUpdater: null,
          progress: null,
          timestamp: null,
          perceivedDuration: 0,
          duration: 0,
          request: null,
          response: null
        };
        var allowMinimumUploadDuration = options.allowMinimumUploadDuration;
        var process = function process2(file2, metadata) {
          var progressFn = function progressFn2() {
            if (state2.duration === 0 || state2.progress === null) return;
            api.fire("progress", api.getProgress());
          };
          var completeFn = function completeFn2() {
            state2.complete = true;
            api.fire("load-perceived", state2.response.body);
          };
          api.fire("start");
          state2.timestamp = Date.now();
          state2.perceivedPerformanceUpdater = createPerceivedPerformanceUpdater(
            function(progress) {
              state2.perceivedProgress = progress;
              state2.perceivedDuration = Date.now() - state2.timestamp;
              progressFn();
              if (state2.response && state2.perceivedProgress === 1 && !state2.complete) {
                completeFn();
              }
            },
            // random delay as in a list of files you start noticing
            // files uploading at the exact same speed
            allowMinimumUploadDuration ? getRandomNumber(750, 1500) : 0
          );
          state2.request = processFn(
            // the file to process
            file2,
            // the metadata to send along
            metadata,
            // callbacks (load, error, progress, abort, transfer)
            // load expects the body to be a server id if
            // you want to make use of revert
            function(response) {
              state2.response = isObject(response) ? response : {
                type: "load",
                code: 200,
                body: "" + response,
                headers: {}
              };
              state2.duration = Date.now() - state2.timestamp;
              state2.progress = 1;
              api.fire("load", state2.response.body);
              if (!allowMinimumUploadDuration || allowMinimumUploadDuration && state2.perceivedProgress === 1) {
                completeFn();
              }
            },
            // error is expected to be an object with type, code, body
            function(error2) {
              state2.perceivedPerformanceUpdater.clear();
              api.fire(
                "error",
                isObject(error2) ? error2 : {
                  type: "error",
                  code: 0,
                  body: "" + error2
                }
              );
            },
            // actual processing progress
            function(computable, current, total) {
              state2.duration = Date.now() - state2.timestamp;
              state2.progress = computable ? current / total : null;
              progressFn();
            },
            // abort does not expect a value
            function() {
              state2.perceivedPerformanceUpdater.clear();
              api.fire("abort", state2.response ? state2.response.body : null);
            },
            // register the id for this transfer
            function(transferId) {
              api.fire("transfer", transferId);
            }
          );
        };
        var abort = function abort2() {
          if (!state2.request) return;
          state2.perceivedPerformanceUpdater.clear();
          if (state2.request.abort) state2.request.abort();
          state2.complete = true;
        };
        var reset = function reset2() {
          abort();
          state2.complete = false;
          state2.perceivedProgress = 0;
          state2.progress = 0;
          state2.timestamp = null;
          state2.perceivedDuration = 0;
          state2.duration = 0;
          state2.request = null;
          state2.response = null;
        };
        var getProgress = allowMinimumUploadDuration ? function() {
          return state2.progress ? Math.min(state2.progress, state2.perceivedProgress) : null;
        } : function() {
          return state2.progress || null;
        };
        var getDuration = allowMinimumUploadDuration ? function() {
          return Math.min(state2.duration, state2.perceivedDuration);
        } : function() {
          return state2.duration;
        };
        var api = Object.assign({}, on(), {
          process,
          // start processing file
          abort,
          // abort active process request
          getProgress,
          getDuration,
          reset
        });
        return api;
      };
      var getFilenameWithoutExtension = function getFilenameWithoutExtension2(name2) {
        return name2.substring(0, name2.lastIndexOf(".")) || name2;
      };
      var createFileStub = function createFileStub2(source) {
        var data3 = [source.name, source.size, source.type];
        if (source instanceof Blob || isBase64DataURI(source)) {
          data3[0] = source.name || getDateString();
        } else if (isBase64DataURI(source)) {
          data3[1] = source.length;
          data3[2] = getMimeTypeFromBase64DataURI(source);
        } else if (isString(source)) {
          data3[0] = getFilenameFromURL(source);
          data3[1] = 0;
          data3[2] = "application/octet-stream";
        }
        return {
          name: data3[0],
          size: data3[1],
          type: data3[2]
        };
      };
      var isFile = function isFile2(value) {
        return !!(value instanceof File || value instanceof Blob && value.name);
      };
      var deepCloneObject = function deepCloneObject2(src) {
        if (!isObject(src)) return src;
        var target = isArray(src) ? [] : {};
        for (var key in src) {
          if (!src.hasOwnProperty(key)) continue;
          var v = src[key];
          target[key] = v && isObject(v) ? deepCloneObject2(v) : v;
        }
        return target;
      };
      var createItem = function createItem2() {
        var origin = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        var serverFileReference = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var file2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        var id2 = getUniqueId();
        var state2 = {
          // is archived
          archived: false,
          // if is frozen, no longer fires events
          frozen: false,
          // removed from view
          released: false,
          // original source
          source: null,
          // file model reference
          file: file2,
          // id of file on server
          serverFileReference,
          // id of file transfer on server
          transferId: null,
          // is aborted
          processingAborted: false,
          // current item status
          status: serverFileReference ? ItemStatus.PROCESSING_COMPLETE : ItemStatus.INIT,
          // active processes
          activeLoader: null,
          activeProcessor: null
        };
        var abortProcessingRequestComplete = null;
        var metadata = {};
        var setStatus = function setStatus2(status) {
          return state2.status = status;
        };
        var fire = function fire2(event) {
          if (state2.released || state2.frozen) return;
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }
          api.fire.apply(api, [event].concat(params));
        };
        var getFileExtension = function getFileExtension2() {
          return getExtensionFromFilename(state2.file.name);
        };
        var getFileType = function getFileType2() {
          return state2.file.type;
        };
        var getFileSize = function getFileSize2() {
          return state2.file.size;
        };
        var getFile = function getFile2() {
          return state2.file;
        };
        var load = function load2(source, loader, onload) {
          state2.source = source;
          api.fireSync("init");
          if (state2.file) {
            api.fireSync("load-skip");
            return;
          }
          state2.file = createFileStub(source);
          loader.on("init", function() {
            fire("load-init");
          });
          loader.on("meta", function(meta) {
            state2.file.size = meta.size;
            state2.file.filename = meta.filename;
            if (meta.source) {
              origin = FileOrigin.LIMBO;
              state2.serverFileReference = meta.source;
              state2.status = ItemStatus.PROCESSING_COMPLETE;
            }
            fire("load-meta");
          });
          loader.on("progress", function(progress) {
            setStatus(ItemStatus.LOADING);
            fire("load-progress", progress);
          });
          loader.on("error", function(error2) {
            setStatus(ItemStatus.LOAD_ERROR);
            fire("load-request-error", error2);
          });
          loader.on("abort", function() {
            setStatus(ItemStatus.INIT);
            fire("load-abort");
          });
          loader.on("load", function(file3) {
            state2.activeLoader = null;
            var success = function success2(result) {
              state2.file = isFile(result) ? result : state2.file;
              if (origin === FileOrigin.LIMBO && state2.serverFileReference) {
                setStatus(ItemStatus.PROCESSING_COMPLETE);
              } else {
                setStatus(ItemStatus.IDLE);
              }
              fire("load");
            };
            var error2 = function error3(result) {
              state2.file = file3;
              fire("load-meta");
              setStatus(ItemStatus.LOAD_ERROR);
              fire("load-file-error", result);
            };
            if (state2.serverFileReference) {
              success(file3);
              return;
            }
            onload(file3, success, error2);
          });
          loader.setSource(source);
          state2.activeLoader = loader;
          loader.load();
        };
        var retryLoad = function retryLoad2() {
          if (!state2.activeLoader) {
            return;
          }
          state2.activeLoader.load();
        };
        var abortLoad = function abortLoad2() {
          if (state2.activeLoader) {
            state2.activeLoader.abort();
            return;
          }
          setStatus(ItemStatus.INIT);
          fire("load-abort");
        };
        var process = function process2(processor, onprocess) {
          if (state2.processingAborted) {
            state2.processingAborted = false;
            return;
          }
          setStatus(ItemStatus.PROCESSING);
          abortProcessingRequestComplete = null;
          if (!(state2.file instanceof Blob)) {
            api.on("load", function() {
              process2(processor, onprocess);
            });
            return;
          }
          processor.on("load", function(serverFileReference2) {
            state2.transferId = null;
            state2.serverFileReference = serverFileReference2;
          });
          processor.on("transfer", function(transferId) {
            state2.transferId = transferId;
          });
          processor.on("load-perceived", function(serverFileReference2) {
            state2.activeProcessor = null;
            state2.transferId = null;
            state2.serverFileReference = serverFileReference2;
            setStatus(ItemStatus.PROCESSING_COMPLETE);
            fire("process-complete", serverFileReference2);
          });
          processor.on("start", function() {
            fire("process-start");
          });
          processor.on("error", function(error3) {
            state2.activeProcessor = null;
            setStatus(ItemStatus.PROCESSING_ERROR);
            fire("process-error", error3);
          });
          processor.on("abort", function(serverFileReference2) {
            state2.activeProcessor = null;
            state2.serverFileReference = serverFileReference2;
            setStatus(ItemStatus.IDLE);
            fire("process-abort");
            if (abortProcessingRequestComplete) {
              abortProcessingRequestComplete();
            }
          });
          processor.on("progress", function(progress) {
            fire("process-progress", progress);
          });
          var success = function success2(file3) {
            if (state2.archived) return;
            processor.process(file3, Object.assign({}, metadata));
          };
          var error2 = console.error;
          onprocess(state2.file, success, error2);
          state2.activeProcessor = processor;
        };
        var requestProcessing = function requestProcessing2() {
          state2.processingAborted = false;
          setStatus(ItemStatus.PROCESSING_QUEUED);
        };
        var abortProcessing = function abortProcessing2() {
          return new Promise(function(resolve) {
            if (!state2.activeProcessor) {
              state2.processingAborted = true;
              setStatus(ItemStatus.IDLE);
              fire("process-abort");
              resolve();
              return;
            }
            abortProcessingRequestComplete = function abortProcessingRequestComplete2() {
              resolve();
            };
            state2.activeProcessor.abort();
          });
        };
        var revert = function revert2(revertFileUpload, forceRevert) {
          return new Promise(function(resolve, reject) {
            var serverTransferId = state2.serverFileReference !== null ? state2.serverFileReference : state2.transferId;
            if (serverTransferId === null) {
              resolve();
              return;
            }
            revertFileUpload(
              serverTransferId,
              function() {
                state2.serverFileReference = null;
                state2.transferId = null;
                resolve();
              },
              function(error2) {
                if (!forceRevert) {
                  resolve();
                  return;
                }
                setStatus(ItemStatus.PROCESSING_REVERT_ERROR);
                fire("process-revert-error");
                reject(error2);
              }
            );
            setStatus(ItemStatus.IDLE);
            fire("process-revert");
          });
        };
        var _setMetadata = function setMetadata(key, value, silent) {
          var keys = key.split(".");
          var root2 = keys[0];
          var last = keys.pop();
          var data3 = metadata;
          keys.forEach(function(key2) {
            return data3 = data3[key2];
          });
          if (JSON.stringify(data3[last]) === JSON.stringify(value)) return;
          data3[last] = value;
          fire("metadata-update", {
            key: root2,
            value: metadata[root2],
            silent
          });
        };
        var getMetadata = function getMetadata2(key) {
          return deepCloneObject(key ? metadata[key] : metadata);
        };
        var api = Object.assign(
          {
            id: {
              get: function get() {
                return id2;
              }
            },
            origin: {
              get: function get() {
                return origin;
              },
              set: function set2(value) {
                return origin = value;
              }
            },
            serverId: {
              get: function get() {
                return state2.serverFileReference;
              }
            },
            transferId: {
              get: function get() {
                return state2.transferId;
              }
            },
            status: {
              get: function get() {
                return state2.status;
              }
            },
            filename: {
              get: function get() {
                return state2.file.name;
              }
            },
            filenameWithoutExtension: {
              get: function get() {
                return getFilenameWithoutExtension(state2.file.name);
              }
            },
            fileExtension: { get: getFileExtension },
            fileType: { get: getFileType },
            fileSize: { get: getFileSize },
            file: { get: getFile },
            relativePath: {
              get: function get() {
                return state2.file._relativePath;
              }
            },
            source: {
              get: function get() {
                return state2.source;
              }
            },
            getMetadata,
            setMetadata: function setMetadata(key, value, silent) {
              if (isObject(key)) {
                var data3 = key;
                Object.keys(data3).forEach(function(key2) {
                  _setMetadata(key2, data3[key2], value);
                });
                return key;
              }
              _setMetadata(key, value, silent);
              return value;
            },
            extend: function extend(name2, handler) {
              return itemAPI[name2] = handler;
            },
            abortLoad,
            retryLoad,
            requestProcessing,
            abortProcessing,
            load,
            process,
            revert
          },
          on(),
          {
            freeze: function freeze() {
              return state2.frozen = true;
            },
            release: function release() {
              return state2.released = true;
            },
            released: {
              get: function get() {
                return state2.released;
              }
            },
            archive: function archive() {
              return state2.archived = true;
            },
            archived: {
              get: function get() {
                return state2.archived;
              }
            },
            // replace source and file object
            setFile: function setFile(file3) {
              return state2.file = file3;
            }
          }
        );
        var itemAPI = createObject(api);
        return itemAPI;
      };
      var getItemIndexByQuery = function getItemIndexByQuery2(items, query) {
        if (isEmpty(query)) {
          return 0;
        }
        if (!isString(query)) {
          return -1;
        }
        return items.findIndex(function(item2) {
          return item2.id === query;
        });
      };
      var getItemById = function getItemById2(items, itemId) {
        var index = getItemIndexByQuery(items, itemId);
        if (index < 0) {
          return;
        }
        return items[index] || null;
      };
      var fetchBlob = function fetchBlob2(url, load, error2, progress, abort, headers) {
        var request = sendRequest(null, url, {
          method: "GET",
          responseType: "blob"
        });
        request.onload = function(xhr) {
          var headers2 = xhr.getAllResponseHeaders();
          var filename = getFileInfoFromHeaders(headers2).name || getFilenameFromURL(url);
          load(
            createResponse("load", xhr.status, getFileFromBlob(xhr.response, filename), headers2)
          );
        };
        request.onerror = function(xhr) {
          error2(createResponse("error", xhr.status, xhr.statusText, xhr.getAllResponseHeaders()));
        };
        request.onheaders = function(xhr) {
          headers(createResponse("headers", xhr.status, null, xhr.getAllResponseHeaders()));
        };
        request.ontimeout = createTimeoutResponse(error2);
        request.onprogress = progress;
        request.onabort = abort;
        return request;
      };
      var getDomainFromURL = function getDomainFromURL2(url) {
        if (url.indexOf("//") === 0) {
          url = location.protocol + url;
        }
        return url.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0];
      };
      var isExternalURL = function isExternalURL2(url) {
        return (url.indexOf(":") > -1 || url.indexOf("//") > -1) && getDomainFromURL(location.href) !== getDomainFromURL(url);
      };
      var dynamicLabel = function dynamicLabel2(label) {
        return function() {
          return isFunction(label) ? label.apply(void 0, arguments) : label;
        };
      };
      var isMockItem = function isMockItem2(item2) {
        return !isFile(item2.file);
      };
      var listUpdated = function listUpdated2(dispatch2, state2) {
        clearTimeout(state2.listUpdateTimeout);
        state2.listUpdateTimeout = setTimeout(function() {
          dispatch2("DID_UPDATE_ITEMS", { items: getActiveItems(state2.items) });
        }, 0);
      };
      var optionalPromise = function optionalPromise2(fn2) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }
        return new Promise(function(resolve) {
          if (!fn2) {
            return resolve(true);
          }
          var result = fn2.apply(void 0, params);
          if (result == null) {
            return resolve(true);
          }
          if (typeof result === "boolean") {
            return resolve(result);
          }
          if (typeof result.then === "function") {
            result.then(resolve);
          }
        });
      };
      var sortItems = function sortItems2(state2, compare) {
        state2.items.sort(function(a, b) {
          return compare(createItemAPI(a), createItemAPI(b));
        });
      };
      var getItemByQueryFromState = function getItemByQueryFromState2(state2, itemHandler) {
        return function() {
          var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var query = _ref.query, _ref$success = _ref.success, success = _ref$success === void 0 ? function() {
          } : _ref$success, _ref$failure = _ref.failure, failure = _ref$failure === void 0 ? function() {
          } : _ref$failure, options = _objectWithoutProperties(_ref, ["query", "success", "failure"]);
          var item2 = getItemByQuery(state2.items, query);
          if (!item2) {
            failure({
              error: createResponse("error", 0, "Item not found"),
              file: null
            });
            return;
          }
          itemHandler(item2, success, failure, options || {});
        };
      };
      var actions = function actions2(dispatch2, query, state2) {
        return {
          /**
           * Aborts all ongoing processes
           */
          ABORT_ALL: function ABORT_ALL() {
            getActiveItems(state2.items).forEach(function(item2) {
              item2.freeze();
              item2.abortLoad();
              item2.abortProcessing();
            });
          },
          /**
           * Sets initial files
           */
          DID_SET_FILES: function DID_SET_FILES(_ref2) {
            var _ref2$value = _ref2.value, value = _ref2$value === void 0 ? [] : _ref2$value;
            var files = value.map(function(file2) {
              return {
                source: file2.source ? file2.source : file2,
                options: file2.options
              };
            });
            var activeItems = getActiveItems(state2.items);
            activeItems.forEach(function(item2) {
              if (!files.find(function(file2) {
                return file2.source === item2.source || file2.source === item2.file;
              })) {
                dispatch2("REMOVE_ITEM", { query: item2, remove: false });
              }
            });
            activeItems = getActiveItems(state2.items);
            files.forEach(function(file2, index) {
              if (activeItems.find(function(item2) {
                return item2.source === file2.source || item2.file === file2.source;
              }))
                return;
              dispatch2(
                "ADD_ITEM",
                Object.assign({}, file2, {
                  interactionMethod: InteractionMethod.NONE,
                  index
                })
              );
            });
          },
          DID_UPDATE_ITEM_METADATA: function DID_UPDATE_ITEM_METADATA(_ref3) {
            var id2 = _ref3.id, action = _ref3.action, change = _ref3.change;
            if (change.silent) return;
            clearTimeout(state2.itemUpdateTimeout);
            state2.itemUpdateTimeout = setTimeout(function() {
              var item2 = getItemById(state2.items, id2);
              if (!query("IS_ASYNC")) {
                applyFilterChain("SHOULD_PREPARE_OUTPUT", false, {
                  item: item2,
                  query,
                  action,
                  change
                }).then(function(shouldPrepareOutput) {
                  var beforePrepareFile = query("GET_BEFORE_PREPARE_FILE");
                  if (beforePrepareFile)
                    shouldPrepareOutput = beforePrepareFile(item2, shouldPrepareOutput);
                  if (!shouldPrepareOutput) return;
                  dispatch2(
                    "REQUEST_PREPARE_OUTPUT",
                    {
                      query: id2,
                      item: item2,
                      success: function success(file2) {
                        dispatch2("DID_PREPARE_OUTPUT", { id: id2, file: file2 });
                      }
                    },
                    true
                  );
                });
                return;
              }
              if (item2.origin === FileOrigin.LOCAL) {
                dispatch2("DID_LOAD_ITEM", {
                  id: item2.id,
                  error: null,
                  serverFileReference: item2.source
                });
              }
              var upload = function upload2() {
                setTimeout(function() {
                  dispatch2("REQUEST_ITEM_PROCESSING", { query: id2 });
                }, 32);
              };
              var revert = function revert2(doUpload) {
                item2.revert(
                  createRevertFunction(
                    state2.options.server.url,
                    state2.options.server.revert
                  ),
                  query("GET_FORCE_REVERT")
                ).then(doUpload ? upload : function() {
                }).catch(function() {
                });
              };
              var abort = function abort2(doUpload) {
                item2.abortProcessing().then(doUpload ? upload : function() {
                });
              };
              if (item2.status === ItemStatus.PROCESSING_COMPLETE) {
                return revert(state2.options.instantUpload);
              }
              if (item2.status === ItemStatus.PROCESSING) {
                return abort(state2.options.instantUpload);
              }
              if (state2.options.instantUpload) {
                upload();
              }
            }, 0);
          },
          MOVE_ITEM: function MOVE_ITEM(_ref4) {
            var query2 = _ref4.query, index = _ref4.index;
            var item2 = getItemByQuery(state2.items, query2);
            if (!item2) return;
            var currentIndex = state2.items.indexOf(item2);
            index = limit(index, 0, state2.items.length - 1);
            if (currentIndex === index) return;
            state2.items.splice(index, 0, state2.items.splice(currentIndex, 1)[0]);
          },
          SORT: function SORT(_ref5) {
            var compare = _ref5.compare;
            sortItems(state2, compare);
            dispatch2("DID_SORT_ITEMS", {
              items: query("GET_ACTIVE_ITEMS")
            });
          },
          ADD_ITEMS: function ADD_ITEMS(_ref6) {
            var items = _ref6.items, index = _ref6.index, interactionMethod = _ref6.interactionMethod, _ref6$success = _ref6.success, success = _ref6$success === void 0 ? function() {
            } : _ref6$success, _ref6$failure = _ref6.failure, failure = _ref6$failure === void 0 ? function() {
            } : _ref6$failure;
            var currentIndex = index;
            if (index === -1 || typeof index === "undefined") {
              var insertLocation = query("GET_ITEM_INSERT_LOCATION");
              var totalItems = query("GET_TOTAL_ITEMS");
              currentIndex = insertLocation === "before" ? 0 : totalItems;
            }
            var ignoredFiles = query("GET_IGNORED_FILES");
            var isValidFile = function isValidFile2(source) {
              return isFile(source) ? !ignoredFiles.includes(source.name.toLowerCase()) : !isEmpty(source);
            };
            var validItems = items.filter(isValidFile);
            var promises = validItems.map(function(source) {
              return new Promise(function(resolve, reject) {
                dispatch2("ADD_ITEM", {
                  interactionMethod,
                  source: source.source || source,
                  success: resolve,
                  failure: reject,
                  index: currentIndex++,
                  options: source.options || {}
                });
              });
            });
            Promise.all(promises).then(success).catch(failure);
          },
          /**
           * @param source
           * @param index
           * @param interactionMethod
           */
          ADD_ITEM: function ADD_ITEM(_ref7) {
            var source = _ref7.source, _ref7$index = _ref7.index, index = _ref7$index === void 0 ? -1 : _ref7$index, interactionMethod = _ref7.interactionMethod, _ref7$success = _ref7.success, success = _ref7$success === void 0 ? function() {
            } : _ref7$success, _ref7$failure = _ref7.failure, failure = _ref7$failure === void 0 ? function() {
            } : _ref7$failure, _ref7$options = _ref7.options, options = _ref7$options === void 0 ? {} : _ref7$options;
            if (isEmpty(source)) {
              failure({
                error: createResponse("error", 0, "No source"),
                file: null
              });
              return;
            }
            if (isFile(source) && state2.options.ignoredFiles.includes(source.name.toLowerCase())) {
              return;
            }
            if (!hasRoomForItem(state2)) {
              if (state2.options.allowMultiple || !state2.options.allowMultiple && !state2.options.allowReplace) {
                var error2 = createResponse("warning", 0, "Max files");
                dispatch2("DID_THROW_MAX_FILES", {
                  source,
                  error: error2
                });
                failure({ error: error2, file: null });
                return;
              }
              var _item = getActiveItems(state2.items)[0];
              if (_item.status === ItemStatus.PROCESSING_COMPLETE || _item.status === ItemStatus.PROCESSING_REVERT_ERROR) {
                var forceRevert = query("GET_FORCE_REVERT");
                _item.revert(
                  createRevertFunction(
                    state2.options.server.url,
                    state2.options.server.revert
                  ),
                  forceRevert
                ).then(function() {
                  if (!forceRevert) return;
                  dispatch2("ADD_ITEM", {
                    source,
                    index,
                    interactionMethod,
                    success,
                    failure,
                    options
                  });
                }).catch(function() {
                });
                if (forceRevert) return;
              }
              dispatch2("REMOVE_ITEM", { query: _item.id });
            }
            var origin = options.type === "local" ? FileOrigin.LOCAL : options.type === "limbo" ? FileOrigin.LIMBO : FileOrigin.INPUT;
            var item2 = createItem(
              // where did this file come from
              origin,
              // an input file never has a server file reference
              origin === FileOrigin.INPUT ? null : source,
              // file mock data, if defined
              options.file
            );
            Object.keys(options.metadata || {}).forEach(function(key) {
              item2.setMetadata(key, options.metadata[key]);
            });
            applyFilters("DID_CREATE_ITEM", item2, { query, dispatch: dispatch2 });
            var itemInsertLocation = query("GET_ITEM_INSERT_LOCATION");
            if (!state2.options.itemInsertLocationFreedom) {
              index = itemInsertLocation === "before" ? -1 : state2.items.length;
            }
            insertItem(state2.items, item2, index);
            if (isFunction(itemInsertLocation) && source) {
              sortItems(state2, itemInsertLocation);
            }
            var id2 = item2.id;
            item2.on("init", function() {
              dispatch2("DID_INIT_ITEM", { id: id2 });
            });
            item2.on("load-init", function() {
              dispatch2("DID_START_ITEM_LOAD", { id: id2 });
            });
            item2.on("load-meta", function() {
              dispatch2("DID_UPDATE_ITEM_META", { id: id2 });
            });
            item2.on("load-progress", function(progress) {
              dispatch2("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: id2, progress });
            });
            item2.on("load-request-error", function(error3) {
              var mainStatus = dynamicLabel(state2.options.labelFileLoadError)(error3);
              if (error3.code >= 400 && error3.code < 500) {
                dispatch2("DID_THROW_ITEM_INVALID", {
                  id: id2,
                  error: error3,
                  status: {
                    main: mainStatus,
                    sub: error3.code + " (" + error3.body + ")"
                  }
                });
                failure({ error: error3, file: createItemAPI(item2) });
                return;
              }
              dispatch2("DID_THROW_ITEM_LOAD_ERROR", {
                id: id2,
                error: error3,
                status: {
                  main: mainStatus,
                  sub: state2.options.labelTapToRetry
                }
              });
            });
            item2.on("load-file-error", function(error3) {
              dispatch2("DID_THROW_ITEM_INVALID", {
                id: id2,
                error: error3.status,
                status: error3.status
              });
              failure({ error: error3.status, file: createItemAPI(item2) });
            });
            item2.on("load-abort", function() {
              dispatch2("REMOVE_ITEM", { query: id2 });
            });
            item2.on("load-skip", function() {
              item2.on("metadata-update", function(change) {
                if (!isFile(item2.file)) return;
                dispatch2("DID_UPDATE_ITEM_METADATA", { id: id2, change });
              });
              dispatch2("COMPLETE_LOAD_ITEM", {
                query: id2,
                item: item2,
                data: {
                  source,
                  success
                }
              });
            });
            item2.on("load", function() {
              var handleAdd = function handleAdd2(shouldAdd) {
                if (!shouldAdd) {
                  dispatch2("REMOVE_ITEM", {
                    query: id2
                  });
                  return;
                }
                item2.on("metadata-update", function(change) {
                  dispatch2("DID_UPDATE_ITEM_METADATA", { id: id2, change });
                });
                applyFilterChain("SHOULD_PREPARE_OUTPUT", false, {
                  item: item2,
                  query
                }).then(function(shouldPrepareOutput) {
                  var beforePrepareFile = query("GET_BEFORE_PREPARE_FILE");
                  if (beforePrepareFile)
                    shouldPrepareOutput = beforePrepareFile(item2, shouldPrepareOutput);
                  var loadComplete = function loadComplete2() {
                    dispatch2("COMPLETE_LOAD_ITEM", {
                      query: id2,
                      item: item2,
                      data: {
                        source,
                        success
                      }
                    });
                    listUpdated(dispatch2, state2);
                  };
                  if (shouldPrepareOutput) {
                    dispatch2(
                      "REQUEST_PREPARE_OUTPUT",
                      {
                        query: id2,
                        item: item2,
                        success: function success2(file2) {
                          dispatch2("DID_PREPARE_OUTPUT", { id: id2, file: file2 });
                          loadComplete();
                        }
                      },
                      true
                    );
                    return;
                  }
                  loadComplete();
                });
              };
              applyFilterChain("DID_LOAD_ITEM", item2, { query, dispatch: dispatch2 }).then(function() {
                optionalPromise(query("GET_BEFORE_ADD_FILE"), createItemAPI(item2)).then(
                  handleAdd
                );
              }).catch(function(e) {
                if (!e || !e.error || !e.status) return handleAdd(false);
                dispatch2("DID_THROW_ITEM_INVALID", {
                  id: id2,
                  error: e.error,
                  status: e.status
                });
              });
            });
            item2.on("process-start", function() {
              dispatch2("DID_START_ITEM_PROCESSING", { id: id2 });
            });
            item2.on("process-progress", function(progress) {
              dispatch2("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: id2, progress });
            });
            item2.on("process-error", function(error3) {
              dispatch2("DID_THROW_ITEM_PROCESSING_ERROR", {
                id: id2,
                error: error3,
                status: {
                  main: dynamicLabel(state2.options.labelFileProcessingError)(error3),
                  sub: state2.options.labelTapToRetry
                }
              });
            });
            item2.on("process-revert-error", function(error3) {
              dispatch2("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
                id: id2,
                error: error3,
                status: {
                  main: dynamicLabel(state2.options.labelFileProcessingRevertError)(error3),
                  sub: state2.options.labelTapToRetry
                }
              });
            });
            item2.on("process-complete", function(serverFileReference) {
              dispatch2("DID_COMPLETE_ITEM_PROCESSING", {
                id: id2,
                error: null,
                serverFileReference
              });
              dispatch2("DID_DEFINE_VALUE", { id: id2, value: serverFileReference });
            });
            item2.on("process-abort", function() {
              dispatch2("DID_ABORT_ITEM_PROCESSING", { id: id2 });
            });
            item2.on("process-revert", function() {
              dispatch2("DID_REVERT_ITEM_PROCESSING", { id: id2 });
              dispatch2("DID_DEFINE_VALUE", { id: id2, value: null });
            });
            dispatch2("DID_ADD_ITEM", {
              id: id2,
              index,
              interactionMethod
            });
            listUpdated(dispatch2, state2);
            var _ref8 = state2.options.server || {}, url = _ref8.url, load = _ref8.load, restore = _ref8.restore, fetch = _ref8.fetch;
            item2.load(
              source,
              // this creates a function that loads the file based on the type of file (string, base64, blob, file) and location of file (local, remote, limbo)
              createFileLoader(
                origin === FileOrigin.INPUT ? (
                  // input, if is remote, see if should use custom fetch, else use default fetchBlob
                  isString(source) && isExternalURL(source) ? fetch ? createFetchFunction(url, fetch) : fetchBlob : fetchBlob
                ) : (
                  // limbo or local
                  origin === FileOrigin.LIMBO ? createFetchFunction(url, restore) : createFetchFunction(url, load)
                )
                // local
              ),
              // called when the file is loaded so it can be piped through the filters
              function(file2, success2, error3) {
                applyFilterChain("LOAD_FILE", file2, { query }).then(success2).catch(error3);
              }
            );
          },
          REQUEST_PREPARE_OUTPUT: function REQUEST_PREPARE_OUTPUT(_ref9) {
            var item2 = _ref9.item, success = _ref9.success, _ref9$failure = _ref9.failure, failure = _ref9$failure === void 0 ? function() {
            } : _ref9$failure;
            var err = {
              error: createResponse("error", 0, "Item not found"),
              file: null
            };
            if (item2.archived) return failure(err);
            applyFilterChain("PREPARE_OUTPUT", item2.file, { query, item: item2 }).then(
              function(result) {
                applyFilterChain("COMPLETE_PREPARE_OUTPUT", result, {
                  query,
                  item: item2
                }).then(function(result2) {
                  if (item2.archived) return failure(err);
                  success(result2);
                });
              }
            );
          },
          COMPLETE_LOAD_ITEM: function COMPLETE_LOAD_ITEM(_ref10) {
            var item2 = _ref10.item, data3 = _ref10.data;
            var success = data3.success, source = data3.source;
            var itemInsertLocation = query("GET_ITEM_INSERT_LOCATION");
            if (isFunction(itemInsertLocation) && source) {
              sortItems(state2, itemInsertLocation);
            }
            dispatch2("DID_LOAD_ITEM", {
              id: item2.id,
              error: null,
              serverFileReference: item2.origin === FileOrigin.INPUT ? null : source
            });
            success(createItemAPI(item2));
            if (item2.origin === FileOrigin.LOCAL) {
              dispatch2("DID_LOAD_LOCAL_ITEM", { id: item2.id });
              return;
            }
            if (item2.origin === FileOrigin.LIMBO) {
              dispatch2("DID_COMPLETE_ITEM_PROCESSING", {
                id: item2.id,
                error: null,
                serverFileReference: source
              });
              dispatch2("DID_DEFINE_VALUE", {
                id: item2.id,
                value: item2.serverId || source
              });
              return;
            }
            if (query("IS_ASYNC") && state2.options.instantUpload) {
              dispatch2("REQUEST_ITEM_PROCESSING", { query: item2.id });
            }
          },
          RETRY_ITEM_LOAD: getItemByQueryFromState(state2, function(item2) {
            item2.retryLoad();
          }),
          REQUEST_ITEM_PREPARE: getItemByQueryFromState(state2, function(item2, _success, failure) {
            dispatch2(
              "REQUEST_PREPARE_OUTPUT",
              {
                query: item2.id,
                item: item2,
                success: function success(file2) {
                  dispatch2("DID_PREPARE_OUTPUT", { id: item2.id, file: file2 });
                  _success({
                    file: item2,
                    output: file2
                  });
                },
                failure
              },
              true
            );
          }),
          REQUEST_ITEM_PROCESSING: getItemByQueryFromState(state2, function(item2, success, failure) {
            var itemCanBeQueuedForProcessing = (
              // waiting for something
              item2.status === ItemStatus.IDLE || // processing went wrong earlier
              item2.status === ItemStatus.PROCESSING_ERROR
            );
            if (!itemCanBeQueuedForProcessing) {
              var processNow = function processNow2() {
                return dispatch2("REQUEST_ITEM_PROCESSING", {
                  query: item2,
                  success,
                  failure
                });
              };
              var process = function process2() {
                return document.hidden ? processNow() : setTimeout(processNow, 32);
              };
              if (item2.status === ItemStatus.PROCESSING_COMPLETE || item2.status === ItemStatus.PROCESSING_REVERT_ERROR) {
                item2.revert(
                  createRevertFunction(
                    state2.options.server.url,
                    state2.options.server.revert
                  ),
                  query("GET_FORCE_REVERT")
                ).then(process).catch(function() {
                });
              } else if (item2.status === ItemStatus.PROCESSING) {
                item2.abortProcessing().then(process);
              }
              return;
            }
            if (item2.status === ItemStatus.PROCESSING_QUEUED) return;
            item2.requestProcessing();
            dispatch2("DID_REQUEST_ITEM_PROCESSING", { id: item2.id });
            dispatch2("PROCESS_ITEM", { query: item2, success, failure }, true);
          }),
          PROCESS_ITEM: getItemByQueryFromState(state2, function(item2, success, failure) {
            var maxParallelUploads = query("GET_MAX_PARALLEL_UPLOADS");
            var totalCurrentUploads = query("GET_ITEMS_BY_STATUS", ItemStatus.PROCESSING).length;
            if (totalCurrentUploads === maxParallelUploads) {
              state2.processingQueue.push({
                id: item2.id,
                success,
                failure
              });
              return;
            }
            if (item2.status === ItemStatus.PROCESSING) return;
            var processNext = function processNext2() {
              var queueEntry = state2.processingQueue.shift();
              if (!queueEntry) return;
              var id2 = queueEntry.id, success2 = queueEntry.success, failure2 = queueEntry.failure;
              var itemReference = getItemByQuery(state2.items, id2);
              if (!itemReference || itemReference.archived) {
                processNext2();
                return;
              }
              dispatch2(
                "PROCESS_ITEM",
                { query: id2, success: success2, failure: failure2 },
                true
              );
            };
            item2.onOnce("process-complete", function() {
              success(createItemAPI(item2));
              processNext();
              var server = state2.options.server;
              var instantUpload = state2.options.instantUpload;
              if (instantUpload && item2.origin === FileOrigin.LOCAL && isFunction(server.remove)) {
                var noop = function noop2() {
                };
                item2.origin = FileOrigin.LIMBO;
                state2.options.server.remove(item2.source, noop, noop);
              }
              var allItemsProcessed = query("GET_ITEMS_BY_STATUS", ItemStatus.PROCESSING_COMPLETE).length === state2.items.length;
              if (allItemsProcessed) {
                dispatch2("DID_COMPLETE_ITEM_PROCESSING_ALL");
              }
            });
            item2.onOnce("process-error", function(error2) {
              failure({ error: error2, file: createItemAPI(item2) });
              processNext();
            });
            var options = state2.options;
            item2.process(
              createFileProcessor(
                createProcessorFunction(
                  options.server.url,
                  options.server.process,
                  options.name,
                  {
                    chunkTransferId: item2.transferId,
                    chunkServer: options.server.patch,
                    chunkUploads: options.chunkUploads,
                    chunkForce: options.chunkForce,
                    chunkSize: options.chunkSize,
                    chunkRetryDelays: options.chunkRetryDelays
                  }
                ),
                {
                  allowMinimumUploadDuration: query("GET_ALLOW_MINIMUM_UPLOAD_DURATION")
                }
              ),
              // called when the file is about to be processed so it can be piped through the transform filters
              function(file2, success2, error2) {
                applyFilterChain("PREPARE_OUTPUT", file2, { query, item: item2 }).then(function(file3) {
                  dispatch2("DID_PREPARE_OUTPUT", { id: item2.id, file: file3 });
                  success2(file3);
                }).catch(error2);
              }
            );
          }),
          RETRY_ITEM_PROCESSING: getItemByQueryFromState(state2, function(item2) {
            dispatch2("REQUEST_ITEM_PROCESSING", { query: item2 });
          }),
          REQUEST_REMOVE_ITEM: getItemByQueryFromState(state2, function(item2) {
            optionalPromise(query("GET_BEFORE_REMOVE_FILE"), createItemAPI(item2)).then(function(shouldRemove) {
              if (!shouldRemove) {
                return;
              }
              dispatch2("REMOVE_ITEM", { query: item2 });
            });
          }),
          RELEASE_ITEM: getItemByQueryFromState(state2, function(item2) {
            item2.release();
          }),
          REMOVE_ITEM: getItemByQueryFromState(state2, function(item2, success, failure, options) {
            var removeFromView = function removeFromView2() {
              var id2 = item2.id;
              getItemById(state2.items, id2).archive();
              dispatch2("DID_REMOVE_ITEM", { error: null, id: id2, item: item2 });
              listUpdated(dispatch2, state2);
              success(createItemAPI(item2));
            };
            var server = state2.options.server;
            if (item2.origin === FileOrigin.LOCAL && server && isFunction(server.remove) && options.remove !== false) {
              dispatch2("DID_START_ITEM_REMOVE", { id: item2.id });
              server.remove(
                item2.source,
                function() {
                  return removeFromView();
                },
                function(status) {
                  dispatch2("DID_THROW_ITEM_REMOVE_ERROR", {
                    id: item2.id,
                    error: createResponse("error", 0, status, null),
                    status: {
                      main: dynamicLabel(state2.options.labelFileRemoveError)(status),
                      sub: state2.options.labelTapToRetry
                    }
                  });
                }
              );
            } else {
              if (options.revert && item2.origin !== FileOrigin.LOCAL && item2.serverId !== null || // if chunked uploads are enabled and we're uploading in chunks for this specific file
              // or if the file isn't big enough for chunked uploads but chunkForce is set then call
              // revert before removing from the view...
              state2.options.chunkUploads && item2.file.size > state2.options.chunkSize || state2.options.chunkUploads && state2.options.chunkForce) {
                item2.revert(
                  createRevertFunction(
                    state2.options.server.url,
                    state2.options.server.revert
                  ),
                  query("GET_FORCE_REVERT")
                );
              }
              removeFromView();
            }
          }),
          ABORT_ITEM_LOAD: getItemByQueryFromState(state2, function(item2) {
            item2.abortLoad();
          }),
          ABORT_ITEM_PROCESSING: getItemByQueryFromState(state2, function(item2) {
            if (item2.serverId) {
              dispatch2("REVERT_ITEM_PROCESSING", { id: item2.id });
              return;
            }
            item2.abortProcessing().then(function() {
              var shouldRemove = state2.options.instantUpload;
              if (shouldRemove) {
                dispatch2("REMOVE_ITEM", { query: item2.id });
              }
            });
          }),
          REQUEST_REVERT_ITEM_PROCESSING: getItemByQueryFromState(state2, function(item2) {
            if (!state2.options.instantUpload) {
              dispatch2("REVERT_ITEM_PROCESSING", { query: item2 });
              return;
            }
            var handleRevert2 = function handleRevert3(shouldRevert) {
              if (!shouldRevert) return;
              dispatch2("REVERT_ITEM_PROCESSING", { query: item2 });
            };
            var fn2 = query("GET_BEFORE_REMOVE_FILE");
            if (!fn2) {
              return handleRevert2(true);
            }
            var requestRemoveResult = fn2(createItemAPI(item2));
            if (requestRemoveResult == null) {
              return handleRevert2(true);
            }
            if (typeof requestRemoveResult === "boolean") {
              return handleRevert2(requestRemoveResult);
            }
            if (typeof requestRemoveResult.then === "function") {
              requestRemoveResult.then(handleRevert2);
            }
          }),
          REVERT_ITEM_PROCESSING: getItemByQueryFromState(state2, function(item2) {
            item2.revert(
              createRevertFunction(state2.options.server.url, state2.options.server.revert),
              query("GET_FORCE_REVERT")
            ).then(function() {
              var shouldRemove = state2.options.instantUpload || isMockItem(item2);
              if (shouldRemove) {
                dispatch2("REMOVE_ITEM", { query: item2.id });
              }
            }).catch(function() {
            });
          }),
          SET_OPTIONS: function SET_OPTIONS(_ref11) {
            var options = _ref11.options;
            var optionKeys = Object.keys(options);
            var prioritizedOptionKeys = PrioritizedOptions.filter(function(key) {
              return optionKeys.includes(key);
            });
            var orderedOptionKeys = [].concat(
              _toConsumableArray(prioritizedOptionKeys),
              _toConsumableArray(
                Object.keys(options).filter(function(key) {
                  return !prioritizedOptionKeys.includes(key);
                })
              )
            );
            orderedOptionKeys.forEach(function(key) {
              dispatch2("SET_" + fromCamels(key, "_").toUpperCase(), {
                value: options[key]
              });
            });
          }
        };
      };
      var PrioritizedOptions = ["server"];
      var formatFilename = function formatFilename2(name2) {
        return name2;
      };
      var createElement$1 = function createElement2(tagName) {
        return document.createElement(tagName);
      };
      var text = function text2(node, value) {
        var textNode = node.childNodes[0];
        if (!textNode) {
          textNode = document.createTextNode(value);
          node.appendChild(textNode);
        } else if (value !== textNode.nodeValue) {
          textNode.nodeValue = value;
        }
      };
      var polarToCartesian = function polarToCartesian2(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees % 360 - 90) * Math.PI / 180;
        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians)
        };
      };
      var describeArc = function describeArc2(x, y, radius, startAngle, endAngle, arcSweep) {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);
        return ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y].join(" ");
      };
      var percentageArc = function percentageArc2(x, y, radius, from, to) {
        var arcSweep = 1;
        if (to > from && to - from <= 0.5) {
          arcSweep = 0;
        }
        if (from > to && from - to >= 0.5) {
          arcSweep = 0;
        }
        return describeArc(
          x,
          y,
          radius,
          Math.min(0.9999, from) * 360,
          Math.min(0.9999, to) * 360,
          arcSweep
        );
      };
      var create2 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        props.spin = false;
        props.progress = 0;
        props.opacity = 0;
        var svg = createElement("svg");
        root2.ref.path = createElement("path", {
          "stroke-width": 2,
          "stroke-linecap": "round"
        });
        svg.appendChild(root2.ref.path);
        root2.ref.svg = svg;
        root2.appendChild(svg);
      };
      var write = function write2(_ref2) {
        var root2 = _ref2.root, props = _ref2.props;
        if (props.opacity === 0) {
          return;
        }
        if (props.align) {
          root2.element.dataset.align = props.align;
        }
        var ringStrokeWidth = parseInt(attr(root2.ref.path, "stroke-width"), 10);
        var size = root2.rect.element.width * 0.5;
        var ringFrom = 0;
        var ringTo = 0;
        if (props.spin) {
          ringFrom = 0;
          ringTo = 0.5;
        } else {
          ringFrom = 0;
          ringTo = props.progress;
        }
        var coordinates = percentageArc(size, size, size - ringStrokeWidth, ringFrom, ringTo);
        attr(root2.ref.path, "d", coordinates);
        attr(root2.ref.path, "stroke-opacity", props.spin || props.progress > 0 ? 1 : 0);
      };
      var progressIndicator = createView({
        tag: "div",
        name: "progress-indicator",
        ignoreRectUpdate: true,
        ignoreRect: true,
        create: create2,
        write,
        mixins: {
          apis: ["progress", "spin", "align"],
          styles: ["opacity"],
          animations: {
            opacity: { type: "tween", duration: 500 },
            progress: {
              type: "spring",
              stiffness: 0.95,
              damping: 0.65,
              mass: 10
            }
          }
        }
      });
      var create$1 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        root2.element.innerHTML = (props.icon || "") + ("<span>" + props.label + "</span>");
        props.isDisabled = false;
      };
      var write$1 = function write2(_ref2) {
        var root2 = _ref2.root, props = _ref2.props;
        var isDisabled = props.isDisabled;
        var shouldDisable = root2.query("GET_DISABLED") || props.opacity === 0;
        if (shouldDisable && !isDisabled) {
          props.isDisabled = true;
          attr(root2.element, "disabled", "disabled");
        } else if (!shouldDisable && isDisabled) {
          props.isDisabled = false;
          root2.element.removeAttribute("disabled");
        }
      };
      var fileActionButton = createView({
        tag: "button",
        attributes: {
          type: "button"
        },
        ignoreRect: true,
        ignoreRectUpdate: true,
        name: "file-action-button",
        mixins: {
          apis: ["label"],
          styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: "spring",
            translateY: "spring",
            opacity: { type: "tween", duration: 250 }
          },
          listeners: true
        },
        create: create$1,
        write: write$1
      });
      var toNaturalFileSize = function toNaturalFileSize2(bytes) {
        var decimalSeparator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ".";
        var base = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e3;
        var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        var _options$labelBytes = options.labelBytes, labelBytes = _options$labelBytes === void 0 ? "bytes" : _options$labelBytes, _options$labelKilobyt = options.labelKilobytes, labelKilobytes = _options$labelKilobyt === void 0 ? "KB" : _options$labelKilobyt, _options$labelMegabyt = options.labelMegabytes, labelMegabytes = _options$labelMegabyt === void 0 ? "MB" : _options$labelMegabyt, _options$labelGigabyt = options.labelGigabytes, labelGigabytes = _options$labelGigabyt === void 0 ? "GB" : _options$labelGigabyt;
        bytes = Math.round(Math.abs(bytes));
        var KB = base;
        var MB = base * base;
        var GB = base * base * base;
        if (bytes < KB) {
          return bytes + " " + labelBytes;
        }
        if (bytes < MB) {
          return Math.floor(bytes / KB) + " " + labelKilobytes;
        }
        if (bytes < GB) {
          return removeDecimalsWhenZero(bytes / MB, 1, decimalSeparator) + " " + labelMegabytes;
        }
        return removeDecimalsWhenZero(bytes / GB, 2, decimalSeparator) + " " + labelGigabytes;
      };
      var removeDecimalsWhenZero = function removeDecimalsWhenZero2(value, decimalCount, separator) {
        return value.toFixed(decimalCount).split(".").filter(function(part) {
          return part !== "0";
        }).join(separator);
      };
      var create$2 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        var fileName = createElement$1("span");
        fileName.className = "filepond--file-info-main";
        attr(fileName, "aria-hidden", "true");
        root2.appendChild(fileName);
        root2.ref.fileName = fileName;
        var fileSize = createElement$1("span");
        fileSize.className = "filepond--file-info-sub";
        root2.appendChild(fileSize);
        root2.ref.fileSize = fileSize;
        text(fileSize, root2.query("GET_LABEL_FILE_WAITING_FOR_SIZE"));
        text(fileName, formatFilename(root2.query("GET_ITEM_NAME", props.id)));
      };
      var updateFile = function updateFile2(_ref2) {
        var root2 = _ref2.root, props = _ref2.props;
        text(
          root2.ref.fileSize,
          toNaturalFileSize(
            root2.query("GET_ITEM_SIZE", props.id),
            ".",
            root2.query("GET_FILE_SIZE_BASE"),
            root2.query("GET_FILE_SIZE_LABELS", root2.query)
          )
        );
        text(root2.ref.fileName, formatFilename(root2.query("GET_ITEM_NAME", props.id)));
      };
      var updateFileSizeOnError = function updateFileSizeOnError2(_ref3) {
        var root2 = _ref3.root, props = _ref3.props;
        if (isInt(root2.query("GET_ITEM_SIZE", props.id))) {
          updateFile({ root: root2, props });
          return;
        }
        text(root2.ref.fileSize, root2.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
      };
      var fileInfo = createView({
        name: "file-info",
        ignoreRect: true,
        ignoreRectUpdate: true,
        write: createRoute({
          DID_LOAD_ITEM: updateFile,
          DID_UPDATE_ITEM_META: updateFile,
          DID_THROW_ITEM_LOAD_ERROR: updateFileSizeOnError,
          DID_THROW_ITEM_INVALID: updateFileSizeOnError
        }),
        didCreateView: function didCreateView(root2) {
          applyFilters("CREATE_VIEW", Object.assign({}, root2, { view: root2 }));
        },
        create: create$2,
        mixins: {
          styles: ["translateX", "translateY"],
          animations: {
            translateX: "spring",
            translateY: "spring"
          }
        }
      });
      var toPercentage = function toPercentage2(value) {
        return Math.round(value * 100);
      };
      var create$3 = function create3(_ref) {
        var root2 = _ref.root;
        var main = createElement$1("span");
        main.className = "filepond--file-status-main";
        root2.appendChild(main);
        root2.ref.main = main;
        var sub = createElement$1("span");
        sub.className = "filepond--file-status-sub";
        root2.appendChild(sub);
        root2.ref.sub = sub;
        didSetItemLoadProgress({ root: root2, action: { progress: null } });
      };
      var didSetItemLoadProgress = function didSetItemLoadProgress2(_ref2) {
        var root2 = _ref2.root, action = _ref2.action;
        var title = action.progress === null ? root2.query("GET_LABEL_FILE_LOADING") : root2.query("GET_LABEL_FILE_LOADING") + " " + toPercentage(action.progress) + "%";
        text(root2.ref.main, title);
        text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_CANCEL"));
      };
      var didSetItemProcessProgress = function didSetItemProcessProgress2(_ref3) {
        var root2 = _ref3.root, action = _ref3.action;
        var title = action.progress === null ? root2.query("GET_LABEL_FILE_PROCESSING") : root2.query("GET_LABEL_FILE_PROCESSING") + " " + toPercentage(action.progress) + "%";
        text(root2.ref.main, title);
        text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_CANCEL"));
      };
      var didRequestItemProcessing = function didRequestItemProcessing2(_ref4) {
        var root2 = _ref4.root;
        text(root2.ref.main, root2.query("GET_LABEL_FILE_PROCESSING"));
        text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_CANCEL"));
      };
      var didAbortItemProcessing = function didAbortItemProcessing2(_ref5) {
        var root2 = _ref5.root;
        text(root2.ref.main, root2.query("GET_LABEL_FILE_PROCESSING_ABORTED"));
        text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_RETRY"));
      };
      var didCompleteItemProcessing = function didCompleteItemProcessing2(_ref6) {
        var root2 = _ref6.root;
        text(root2.ref.main, root2.query("GET_LABEL_FILE_PROCESSING_COMPLETE"));
        text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_UNDO"));
      };
      var clear = function clear2(_ref7) {
        var root2 = _ref7.root;
        text(root2.ref.main, "");
        text(root2.ref.sub, "");
      };
      var error = function error2(_ref8) {
        var root2 = _ref8.root, action = _ref8.action;
        text(root2.ref.main, action.status.main);
        text(root2.ref.sub, action.status.sub);
      };
      var fileStatus = createView({
        name: "file-status",
        ignoreRect: true,
        ignoreRectUpdate: true,
        write: createRoute({
          DID_LOAD_ITEM: clear,
          DID_REVERT_ITEM_PROCESSING: clear,
          DID_REQUEST_ITEM_PROCESSING: didRequestItemProcessing,
          DID_ABORT_ITEM_PROCESSING: didAbortItemProcessing,
          DID_COMPLETE_ITEM_PROCESSING: didCompleteItemProcessing,
          DID_UPDATE_ITEM_PROCESS_PROGRESS: didSetItemProcessProgress,
          DID_UPDATE_ITEM_LOAD_PROGRESS: didSetItemLoadProgress,
          DID_THROW_ITEM_LOAD_ERROR: error,
          DID_THROW_ITEM_INVALID: error,
          DID_THROW_ITEM_PROCESSING_ERROR: error,
          DID_THROW_ITEM_PROCESSING_REVERT_ERROR: error,
          DID_THROW_ITEM_REMOVE_ERROR: error
        }),
        didCreateView: function didCreateView(root2) {
          applyFilters("CREATE_VIEW", Object.assign({}, root2, { view: root2 }));
        },
        create: create$3,
        mixins: {
          styles: ["translateX", "translateY", "opacity"],
          animations: {
            opacity: { type: "tween", duration: 250 },
            translateX: "spring",
            translateY: "spring"
          }
        }
      });
      var Buttons = {
        AbortItemLoad: {
          label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
          action: "ABORT_ITEM_LOAD",
          className: "filepond--action-abort-item-load",
          align: "LOAD_INDICATOR_POSITION"
          // right
        },
        RetryItemLoad: {
          label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
          action: "RETRY_ITEM_LOAD",
          icon: "GET_ICON_RETRY",
          className: "filepond--action-retry-item-load",
          align: "BUTTON_PROCESS_ITEM_POSITION"
          // right
        },
        RemoveItem: {
          label: "GET_LABEL_BUTTON_REMOVE_ITEM",
          action: "REQUEST_REMOVE_ITEM",
          icon: "GET_ICON_REMOVE",
          className: "filepond--action-remove-item",
          align: "BUTTON_REMOVE_ITEM_POSITION"
          // left
        },
        ProcessItem: {
          label: "GET_LABEL_BUTTON_PROCESS_ITEM",
          action: "REQUEST_ITEM_PROCESSING",
          icon: "GET_ICON_PROCESS",
          className: "filepond--action-process-item",
          align: "BUTTON_PROCESS_ITEM_POSITION"
          // right
        },
        AbortItemProcessing: {
          label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
          action: "ABORT_ITEM_PROCESSING",
          className: "filepond--action-abort-item-processing",
          align: "BUTTON_PROCESS_ITEM_POSITION"
          // right
        },
        RetryItemProcessing: {
          label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
          action: "RETRY_ITEM_PROCESSING",
          icon: "GET_ICON_RETRY",
          className: "filepond--action-retry-item-processing",
          align: "BUTTON_PROCESS_ITEM_POSITION"
          // right
        },
        RevertItemProcessing: {
          label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
          action: "REQUEST_REVERT_ITEM_PROCESSING",
          icon: "GET_ICON_UNDO",
          className: "filepond--action-revert-item-processing",
          align: "BUTTON_PROCESS_ITEM_POSITION"
          // right
        }
      };
      var ButtonKeys = [];
      forin(Buttons, function(key) {
        ButtonKeys.push(key);
      });
      var calculateFileInfoOffset = function calculateFileInfoOffset2(root2) {
        if (getRemoveIndicatorAligment(root2) === "right") return 0;
        var buttonRect = root2.ref.buttonRemoveItem.rect.element;
        return buttonRect.hidden ? null : buttonRect.width + buttonRect.left;
      };
      var calculateButtonWidth = function calculateButtonWidth2(root2) {
        var buttonRect = root2.ref.buttonAbortItemLoad.rect.element;
        return buttonRect.width;
      };
      var calculateFileVerticalCenterOffset = function calculateFileVerticalCenterOffset2(root2) {
        return Math.floor(root2.ref.buttonRemoveItem.rect.element.height / 4);
      };
      var calculateFileHorizontalCenterOffset = function calculateFileHorizontalCenterOffset2(root2) {
        return Math.floor(root2.ref.buttonRemoveItem.rect.element.left / 2);
      };
      var getLoadIndicatorAlignment = function getLoadIndicatorAlignment2(root2) {
        return root2.query("GET_STYLE_LOAD_INDICATOR_POSITION");
      };
      var getProcessIndicatorAlignment = function getProcessIndicatorAlignment2(root2) {
        return root2.query("GET_STYLE_PROGRESS_INDICATOR_POSITION");
      };
      var getRemoveIndicatorAligment = function getRemoveIndicatorAligment2(root2) {
        return root2.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION");
      };
      var DefaultStyle = {
        buttonAbortItemLoad: { opacity: 0 },
        buttonRetryItemLoad: { opacity: 0 },
        buttonRemoveItem: { opacity: 0 },
        buttonProcessItem: { opacity: 0 },
        buttonAbortItemProcessing: { opacity: 0 },
        buttonRetryItemProcessing: { opacity: 0 },
        buttonRevertItemProcessing: { opacity: 0 },
        loadProgressIndicator: { opacity: 0, align: getLoadIndicatorAlignment },
        processProgressIndicator: { opacity: 0, align: getProcessIndicatorAlignment },
        processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
        info: { translateX: 0, translateY: 0, opacity: 0 },
        status: { translateX: 0, translateY: 0, opacity: 0 }
      };
      var IdleStyle = {
        buttonRemoveItem: { opacity: 1 },
        buttonProcessItem: { opacity: 1 },
        info: { translateX: calculateFileInfoOffset },
        status: { translateX: calculateFileInfoOffset }
      };
      var ProcessingStyle = {
        buttonAbortItemProcessing: { opacity: 1 },
        processProgressIndicator: { opacity: 1 },
        status: { opacity: 1 }
      };
      var StyleMap = {
        DID_THROW_ITEM_INVALID: {
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: calculateFileInfoOffset },
          status: { translateX: calculateFileInfoOffset, opacity: 1 }
        },
        DID_START_ITEM_LOAD: {
          buttonAbortItemLoad: { opacity: 1 },
          loadProgressIndicator: { opacity: 1 },
          status: { opacity: 1 }
        },
        DID_THROW_ITEM_LOAD_ERROR: {
          buttonRetryItemLoad: { opacity: 1 },
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: calculateFileInfoOffset },
          status: { opacity: 1 }
        },
        DID_START_ITEM_REMOVE: {
          processProgressIndicator: { opacity: 1, align: getRemoveIndicatorAligment },
          info: { translateX: calculateFileInfoOffset },
          status: { opacity: 0 }
        },
        DID_THROW_ITEM_REMOVE_ERROR: {
          processProgressIndicator: { opacity: 0, align: getRemoveIndicatorAligment },
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: calculateFileInfoOffset },
          status: { opacity: 1, translateX: calculateFileInfoOffset }
        },
        DID_LOAD_ITEM: IdleStyle,
        DID_LOAD_LOCAL_ITEM: {
          buttonRemoveItem: { opacity: 1 },
          info: { translateX: calculateFileInfoOffset },
          status: { translateX: calculateFileInfoOffset }
        },
        DID_START_ITEM_PROCESSING: ProcessingStyle,
        DID_REQUEST_ITEM_PROCESSING: ProcessingStyle,
        DID_UPDATE_ITEM_PROCESS_PROGRESS: ProcessingStyle,
        DID_COMPLETE_ITEM_PROCESSING: {
          buttonRevertItemProcessing: { opacity: 1 },
          info: { opacity: 1 },
          status: { opacity: 1 }
        },
        DID_THROW_ITEM_PROCESSING_ERROR: {
          buttonRemoveItem: { opacity: 1 },
          buttonRetryItemProcessing: { opacity: 1 },
          status: { opacity: 1 },
          info: { translateX: calculateFileInfoOffset }
        },
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
          buttonRevertItemProcessing: { opacity: 1 },
          status: { opacity: 1 },
          info: { opacity: 1 }
        },
        DID_ABORT_ITEM_PROCESSING: {
          buttonRemoveItem: { opacity: 1 },
          buttonProcessItem: { opacity: 1 },
          info: { translateX: calculateFileInfoOffset },
          status: { opacity: 1 }
        },
        DID_REVERT_ITEM_PROCESSING: IdleStyle
      };
      var processingCompleteIndicatorView = createView({
        create: function create3(_ref) {
          var root2 = _ref.root;
          root2.element.innerHTML = root2.query("GET_ICON_DONE");
        },
        name: "processing-complete-indicator",
        ignoreRect: true,
        mixins: {
          styles: ["scaleX", "scaleY", "opacity"],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            opacity: { type: "tween", duration: 250 }
          }
        }
      });
      var create$4 = function create3(_ref2) {
        var root2 = _ref2.root, props = _ref2.props;
        var LocalButtons = Object.keys(Buttons).reduce(function(prev, curr) {
          prev[curr] = Object.assign({}, Buttons[curr]);
          return prev;
        }, {});
        var id2 = props.id;
        var allowRevert = root2.query("GET_ALLOW_REVERT");
        var allowRemove = root2.query("GET_ALLOW_REMOVE");
        var allowProcess = root2.query("GET_ALLOW_PROCESS");
        var instantUpload = root2.query("GET_INSTANT_UPLOAD");
        var isAsync2 = root2.query("IS_ASYNC");
        var alignRemoveItemButton = root2.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
        var buttonFilter;
        if (isAsync2) {
          if (allowProcess && !allowRevert) {
            buttonFilter = function buttonFilter2(key) {
              return !/RevertItemProcessing/.test(key);
            };
          } else if (!allowProcess && allowRevert) {
            buttonFilter = function buttonFilter2(key) {
              return !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(key);
            };
          } else if (!allowProcess && !allowRevert) {
            buttonFilter = function buttonFilter2(key) {
              return !/Process/.test(key);
            };
          }
        } else {
          buttonFilter = function buttonFilter2(key) {
            return !/Process/.test(key);
          };
        }
        var enabledButtons = buttonFilter ? ButtonKeys.filter(buttonFilter) : ButtonKeys.concat();
        if (instantUpload && allowRevert) {
          LocalButtons["RevertItemProcessing"].label = "GET_LABEL_BUTTON_REMOVE_ITEM";
          LocalButtons["RevertItemProcessing"].icon = "GET_ICON_REMOVE";
        }
        if (isAsync2 && !allowRevert) {
          var map2 = StyleMap["DID_COMPLETE_ITEM_PROCESSING"];
          map2.info.translateX = calculateFileHorizontalCenterOffset;
          map2.info.translateY = calculateFileVerticalCenterOffset;
          map2.status.translateY = calculateFileVerticalCenterOffset;
          map2.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
        }
        if (isAsync2 && !allowProcess) {
          [
            "DID_START_ITEM_PROCESSING",
            "DID_REQUEST_ITEM_PROCESSING",
            "DID_UPDATE_ITEM_PROCESS_PROGRESS",
            "DID_THROW_ITEM_PROCESSING_ERROR"
          ].forEach(function(key) {
            StyleMap[key].status.translateY = calculateFileVerticalCenterOffset;
          });
          StyleMap["DID_THROW_ITEM_PROCESSING_ERROR"].status.translateX = calculateButtonWidth;
        }
        if (alignRemoveItemButton && allowRevert) {
          LocalButtons["RevertItemProcessing"].align = "BUTTON_REMOVE_ITEM_POSITION";
          var _map = StyleMap["DID_COMPLETE_ITEM_PROCESSING"];
          _map.info.translateX = calculateFileInfoOffset;
          _map.status.translateY = calculateFileVerticalCenterOffset;
          _map.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
        }
        if (!allowRemove) {
          LocalButtons["RemoveItem"].disabled = true;
        }
        forin(LocalButtons, function(key, definition) {
          var buttonView = root2.createChildView(fileActionButton, {
            label: root2.query(definition.label),
            icon: root2.query(definition.icon),
            opacity: 0
          });
          if (enabledButtons.includes(key)) {
            root2.appendChildView(buttonView);
          }
          if (definition.disabled) {
            buttonView.element.setAttribute("disabled", "disabled");
            buttonView.element.setAttribute("hidden", "hidden");
          }
          buttonView.element.dataset.align = root2.query("GET_STYLE_" + definition.align);
          buttonView.element.classList.add(definition.className);
          buttonView.on("click", function(e) {
            e.stopPropagation();
            if (definition.disabled) return;
            root2.dispatch(definition.action, { query: id2 });
          });
          root2.ref["button" + key] = buttonView;
        });
        root2.ref.processingCompleteIndicator = root2.appendChildView(
          root2.createChildView(processingCompleteIndicatorView)
        );
        root2.ref.processingCompleteIndicator.element.dataset.align = root2.query(
          "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"
        );
        root2.ref.info = root2.appendChildView(root2.createChildView(fileInfo, { id: id2 }));
        root2.ref.status = root2.appendChildView(root2.createChildView(fileStatus, { id: id2 }));
        var loadIndicatorView = root2.appendChildView(
          root2.createChildView(progressIndicator, {
            opacity: 0,
            align: root2.query("GET_STYLE_LOAD_INDICATOR_POSITION")
          })
        );
        loadIndicatorView.element.classList.add("filepond--load-indicator");
        root2.ref.loadProgressIndicator = loadIndicatorView;
        var progressIndicatorView = root2.appendChildView(
          root2.createChildView(progressIndicator, {
            opacity: 0,
            align: root2.query("GET_STYLE_PROGRESS_INDICATOR_POSITION")
          })
        );
        progressIndicatorView.element.classList.add("filepond--process-indicator");
        root2.ref.processProgressIndicator = progressIndicatorView;
        root2.ref.activeStyles = [];
      };
      var write$2 = function write2(_ref3) {
        var root2 = _ref3.root, actions2 = _ref3.actions, props = _ref3.props;
        route({ root: root2, actions: actions2, props });
        var action = actions2.concat().filter(function(action2) {
          return /^DID_/.test(action2.type);
        }).reverse().find(function(action2) {
          return StyleMap[action2.type];
        });
        if (action) {
          root2.ref.activeStyles = [];
          var stylesToApply = StyleMap[action.type];
          forin(DefaultStyle, function(name2, defaultStyles) {
            var control = root2.ref[name2];
            forin(defaultStyles, function(key, defaultValue) {
              var value = stylesToApply[name2] && typeof stylesToApply[name2][key] !== "undefined" ? stylesToApply[name2][key] : defaultValue;
              root2.ref.activeStyles.push({ control, key, value });
            });
          });
        }
        root2.ref.activeStyles.forEach(function(_ref4) {
          var control = _ref4.control, key = _ref4.key, value = _ref4.value;
          control[key] = typeof value === "function" ? value(root2) : value;
        });
      };
      var route = createRoute({
        DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: function DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING(_ref5) {
          var root2 = _ref5.root, action = _ref5.action;
          root2.ref.buttonAbortItemProcessing.label = action.value;
        },
        DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: function DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD(_ref6) {
          var root2 = _ref6.root, action = _ref6.action;
          root2.ref.buttonAbortItemLoad.label = action.value;
        },
        DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: function DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL(_ref7) {
          var root2 = _ref7.root, action = _ref7.action;
          root2.ref.buttonAbortItemRemoval.label = action.value;
        },
        DID_REQUEST_ITEM_PROCESSING: function DID_REQUEST_ITEM_PROCESSING(_ref8) {
          var root2 = _ref8.root;
          root2.ref.processProgressIndicator.spin = true;
          root2.ref.processProgressIndicator.progress = 0;
        },
        DID_START_ITEM_LOAD: function DID_START_ITEM_LOAD(_ref9) {
          var root2 = _ref9.root;
          root2.ref.loadProgressIndicator.spin = true;
          root2.ref.loadProgressIndicator.progress = 0;
        },
        DID_START_ITEM_REMOVE: function DID_START_ITEM_REMOVE(_ref10) {
          var root2 = _ref10.root;
          root2.ref.processProgressIndicator.spin = true;
          root2.ref.processProgressIndicator.progress = 0;
        },
        DID_UPDATE_ITEM_LOAD_PROGRESS: function DID_UPDATE_ITEM_LOAD_PROGRESS(_ref11) {
          var root2 = _ref11.root, action = _ref11.action;
          root2.ref.loadProgressIndicator.spin = false;
          root2.ref.loadProgressIndicator.progress = action.progress;
        },
        DID_UPDATE_ITEM_PROCESS_PROGRESS: function DID_UPDATE_ITEM_PROCESS_PROGRESS(_ref12) {
          var root2 = _ref12.root, action = _ref12.action;
          root2.ref.processProgressIndicator.spin = false;
          root2.ref.processProgressIndicator.progress = action.progress;
        }
      });
      var file = createView({
        create: create$4,
        write: write$2,
        didCreateView: function didCreateView(root2) {
          applyFilters("CREATE_VIEW", Object.assign({}, root2, { view: root2 }));
        },
        name: "file"
      });
      var create$5 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        root2.ref.fileName = createElement$1("legend");
        root2.appendChild(root2.ref.fileName);
        root2.ref.file = root2.appendChildView(root2.createChildView(file, { id: props.id }));
        root2.ref.data = false;
      };
      var didLoadItem = function didLoadItem2(_ref2) {
        var root2 = _ref2.root, props = _ref2.props;
        text(root2.ref.fileName, formatFilename(root2.query("GET_ITEM_NAME", props.id)));
      };
      var fileWrapper = createView({
        create: create$5,
        ignoreRect: true,
        write: createRoute({
          DID_LOAD_ITEM: didLoadItem
        }),
        didCreateView: function didCreateView(root2) {
          applyFilters("CREATE_VIEW", Object.assign({}, root2, { view: root2 }));
        },
        tag: "fieldset",
        name: "file-wrapper"
      });
      var PANEL_SPRING_PROPS = { type: "spring", damping: 0.6, mass: 7 };
      var create$6 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        [
          {
            name: "top"
          },
          {
            name: "center",
            props: {
              translateY: null,
              scaleY: null
            },
            mixins: {
              animations: {
                scaleY: PANEL_SPRING_PROPS
              },
              styles: ["translateY", "scaleY"]
            }
          },
          {
            name: "bottom",
            props: {
              translateY: null
            },
            mixins: {
              animations: {
                translateY: PANEL_SPRING_PROPS
              },
              styles: ["translateY"]
            }
          }
        ].forEach(function(section) {
          createSection(root2, section, props.name);
        });
        root2.element.classList.add("filepond--" + props.name);
        root2.ref.scalable = null;
      };
      var createSection = function createSection2(root2, section, className) {
        var viewConstructor = createView({
          name: "panel-" + section.name + " filepond--" + className,
          mixins: section.mixins,
          ignoreRectUpdate: true
        });
        var view = root2.createChildView(viewConstructor, section.props);
        root2.ref[section.name] = root2.appendChildView(view);
      };
      var write$3 = function write2(_ref2) {
        var root2 = _ref2.root, props = _ref2.props;
        if (root2.ref.scalable === null || props.scalable !== root2.ref.scalable) {
          root2.ref.scalable = isBoolean(props.scalable) ? props.scalable : true;
          root2.element.dataset.scalable = root2.ref.scalable;
        }
        if (!props.height) return;
        var topRect = root2.ref.top.rect.element;
        var bottomRect = root2.ref.bottom.rect.element;
        var height = Math.max(topRect.height + bottomRect.height, props.height);
        root2.ref.center.translateY = topRect.height;
        root2.ref.center.scaleY = (height - topRect.height - bottomRect.height) / 100;
        root2.ref.bottom.translateY = height - bottomRect.height;
      };
      var panel = createView({
        name: "panel",
        read: function read(_ref3) {
          var root2 = _ref3.root, props = _ref3.props;
          return props.heightCurrent = root2.ref.bottom.translateY;
        },
        write: write$3,
        create: create$6,
        ignoreRect: true,
        mixins: {
          apis: ["height", "heightCurrent", "scalable"]
        }
      });
      var createDragHelper = function createDragHelper2(items) {
        var itemIds = items.map(function(item2) {
          return item2.id;
        });
        var prevIndex = void 0;
        return {
          setIndex: function setIndex(index) {
            prevIndex = index;
          },
          getIndex: function getIndex() {
            return prevIndex;
          },
          getItemIndex: function getItemIndex(item2) {
            return itemIds.indexOf(item2.id);
          }
        };
      };
      var ITEM_TRANSLATE_SPRING = {
        type: "spring",
        stiffness: 0.75,
        damping: 0.45,
        mass: 10
      };
      var ITEM_SCALE_SPRING = "spring";
      var StateMap = {
        DID_START_ITEM_LOAD: "busy",
        DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
        DID_THROW_ITEM_INVALID: "load-invalid",
        DID_THROW_ITEM_LOAD_ERROR: "load-error",
        DID_LOAD_ITEM: "idle",
        DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
        DID_START_ITEM_REMOVE: "busy",
        DID_START_ITEM_PROCESSING: "busy processing",
        DID_REQUEST_ITEM_PROCESSING: "busy processing",
        DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
        DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
        DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
        DID_ABORT_ITEM_PROCESSING: "cancelled",
        DID_REVERT_ITEM_PROCESSING: "idle"
      };
      var create$7 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        root2.ref.handleClick = function(e) {
          return root2.dispatch("DID_ACTIVATE_ITEM", { id: props.id });
        };
        root2.element.id = "filepond--item-" + props.id;
        root2.element.addEventListener("click", root2.ref.handleClick);
        root2.ref.container = root2.appendChildView(
          root2.createChildView(fileWrapper, { id: props.id })
        );
        root2.ref.panel = root2.appendChildView(root2.createChildView(panel, { name: "item-panel" }));
        root2.ref.panel.height = null;
        props.markedForRemoval = false;
        if (!root2.query("GET_ALLOW_REORDER")) return;
        root2.element.dataset.dragState = "idle";
        var grab = function grab2(e) {
          if (!e.isPrimary) return;
          var removedActivateListener = false;
          var origin = {
            x: e.pageX,
            y: e.pageY
          };
          props.dragOrigin = {
            x: root2.translateX,
            y: root2.translateY
          };
          props.dragCenter = {
            x: e.offsetX,
            y: e.offsetY
          };
          var dragState = createDragHelper(root2.query("GET_ACTIVE_ITEMS"));
          root2.dispatch("DID_GRAB_ITEM", { id: props.id, dragState });
          var drag = function drag2(e2) {
            if (!e2.isPrimary) return;
            e2.stopPropagation();
            e2.preventDefault();
            props.dragOffset = {
              x: e2.pageX - origin.x,
              y: e2.pageY - origin.y
            };
            var dist = props.dragOffset.x * props.dragOffset.x + props.dragOffset.y * props.dragOffset.y;
            if (dist > 16 && !removedActivateListener) {
              removedActivateListener = true;
              root2.element.removeEventListener("click", root2.ref.handleClick);
            }
            root2.dispatch("DID_DRAG_ITEM", { id: props.id, dragState });
          };
          var drop2 = function drop3(e2) {
            if (!e2.isPrimary) return;
            props.dragOffset = {
              x: e2.pageX - origin.x,
              y: e2.pageY - origin.y
            };
            reset();
          };
          var cancel = function cancel2() {
            reset();
          };
          var reset = function reset2() {
            document.removeEventListener("pointercancel", cancel);
            document.removeEventListener("pointermove", drag);
            document.removeEventListener("pointerup", drop2);
            root2.dispatch("DID_DROP_ITEM", { id: props.id, dragState });
            if (removedActivateListener) {
              setTimeout(function() {
                return root2.element.addEventListener("click", root2.ref.handleClick);
              }, 0);
            }
          };
          document.addEventListener("pointercancel", cancel);
          document.addEventListener("pointermove", drag);
          document.addEventListener("pointerup", drop2);
        };
        root2.element.addEventListener("pointerdown", grab);
      };
      var route$1 = createRoute({
        DID_UPDATE_PANEL_HEIGHT: function DID_UPDATE_PANEL_HEIGHT(_ref2) {
          var root2 = _ref2.root, action = _ref2.action;
          root2.height = action.height;
        }
      });
      var write$4 = createRoute(
        {
          DID_GRAB_ITEM: function DID_GRAB_ITEM(_ref3) {
            var root2 = _ref3.root, props = _ref3.props;
            props.dragOrigin = {
              x: root2.translateX,
              y: root2.translateY
            };
          },
          DID_DRAG_ITEM: function DID_DRAG_ITEM(_ref4) {
            var root2 = _ref4.root;
            root2.element.dataset.dragState = "drag";
          },
          DID_DROP_ITEM: function DID_DROP_ITEM(_ref5) {
            var root2 = _ref5.root, props = _ref5.props;
            props.dragOffset = null;
            props.dragOrigin = null;
            root2.element.dataset.dragState = "drop";
          }
        },
        function(_ref6) {
          var root2 = _ref6.root, actions2 = _ref6.actions, props = _ref6.props, shouldOptimize = _ref6.shouldOptimize;
          if (root2.element.dataset.dragState === "drop") {
            if (root2.scaleX <= 1) {
              root2.element.dataset.dragState = "idle";
            }
          }
          var action = actions2.concat().filter(function(action2) {
            return /^DID_/.test(action2.type);
          }).reverse().find(function(action2) {
            return StateMap[action2.type];
          });
          if (action && action.type !== props.currentState) {
            props.currentState = action.type;
            root2.element.dataset.filepondItemState = StateMap[props.currentState] || "";
          }
          var aspectRatio = root2.query("GET_ITEM_PANEL_ASPECT_RATIO") || root2.query("GET_PANEL_ASPECT_RATIO");
          if (!aspectRatio) {
            route$1({ root: root2, actions: actions2, props });
            if (!root2.height && root2.ref.container.rect.element.height > 0) {
              root2.height = root2.ref.container.rect.element.height;
            }
          } else if (!shouldOptimize) {
            root2.height = root2.rect.element.width * aspectRatio;
          }
          if (shouldOptimize) {
            root2.ref.panel.height = null;
          }
          root2.ref.panel.height = root2.height;
        }
      );
      var item = createView({
        create: create$7,
        write: write$4,
        destroy: function destroy(_ref7) {
          var root2 = _ref7.root, props = _ref7.props;
          root2.element.removeEventListener("click", root2.ref.handleClick);
          root2.dispatch("RELEASE_ITEM", { query: props.id });
        },
        tag: "li",
        name: "item",
        mixins: {
          apis: [
            "id",
            "interactionMethod",
            "markedForRemoval",
            "spawnDate",
            "dragCenter",
            "dragOrigin",
            "dragOffset"
          ],
          styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"],
          animations: {
            scaleX: ITEM_SCALE_SPRING,
            scaleY: ITEM_SCALE_SPRING,
            translateX: ITEM_TRANSLATE_SPRING,
            translateY: ITEM_TRANSLATE_SPRING,
            opacity: { type: "tween", duration: 150 }
          }
        }
      });
      var getItemsPerRow = function(horizontalSpace, itemWidth) {
        return Math.max(1, Math.floor((horizontalSpace + 1) / itemWidth));
      };
      var getItemIndexByPosition = function getItemIndexByPosition2(view, children, positionInView) {
        if (!positionInView) return;
        var horizontalSpace = view.rect.element.width;
        var l = children.length;
        var last = null;
        if (l === 0 || positionInView.top < children[0].rect.element.top) return -1;
        var item2 = children[0];
        var itemRect = item2.rect.element;
        var itemHorizontalMargin = itemRect.marginLeft + itemRect.marginRight;
        var itemWidth = itemRect.width + itemHorizontalMargin;
        var itemsPerRow = getItemsPerRow(horizontalSpace, itemWidth);
        if (itemsPerRow === 1) {
          for (var index = 0; index < l; index++) {
            var child = children[index];
            var childMid = child.rect.outer.top + child.rect.element.height * 0.5;
            if (positionInView.top < childMid) {
              return index;
            }
          }
          return l;
        }
        var itemVerticalMargin = itemRect.marginTop + itemRect.marginBottom;
        var itemHeight = itemRect.height + itemVerticalMargin;
        for (var _index = 0; _index < l; _index++) {
          var indexX = _index % itemsPerRow;
          var indexY = Math.floor(_index / itemsPerRow);
          var offsetX = indexX * itemWidth;
          var offsetY = indexY * itemHeight;
          var itemTop = offsetY - itemRect.marginTop;
          var itemRight = offsetX + itemWidth;
          var itemBottom = offsetY + itemHeight + itemRect.marginBottom;
          if (positionInView.top < itemBottom && positionInView.top > itemTop) {
            if (positionInView.left < itemRight) {
              return _index;
            } else if (_index !== l - 1) {
              last = _index;
            } else {
              last = null;
            }
          }
        }
        if (last !== null) {
          return last;
        }
        return l;
      };
      var dropAreaDimensions = {
        height: 0,
        width: 0,
        get getHeight() {
          return this.height;
        },
        set setHeight(val) {
          if (this.height === 0 || val === 0) this.height = val;
        },
        get getWidth() {
          return this.width;
        },
        set setWidth(val) {
          if (this.width === 0 || val === 0) this.width = val;
        },
        setDimensions: function setDimensions(height, width) {
          if (this.height === 0 || height === 0) this.height = height;
          if (this.width === 0 || width === 0) this.width = width;
        }
      };
      var create$8 = function create3(_ref) {
        var root2 = _ref.root;
        attr(root2.element, "role", "list");
        root2.ref.lastItemSpanwDate = Date.now();
      };
      var addItemView = function addItemView2(_ref2) {
        var root2 = _ref2.root, action = _ref2.action;
        var id2 = action.id, index = action.index, interactionMethod = action.interactionMethod;
        root2.ref.addIndex = index;
        var now = Date.now();
        var spawnDate = now;
        var opacity = 1;
        if (interactionMethod !== InteractionMethod.NONE) {
          opacity = 0;
          var cooldown = root2.query("GET_ITEM_INSERT_INTERVAL");
          var dist = now - root2.ref.lastItemSpanwDate;
          spawnDate = dist < cooldown ? now + (cooldown - dist) : now;
        }
        root2.ref.lastItemSpanwDate = spawnDate;
        root2.appendChildView(
          root2.createChildView(
            // view type
            item,
            // props
            {
              spawnDate,
              id: id2,
              opacity,
              interactionMethod
            }
          ),
          index
        );
      };
      var moveItem = function moveItem2(item2, x, y) {
        var vx = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
        var vy = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
        if (item2.dragOffset) {
          item2.translateX = null;
          item2.translateY = null;
          item2.translateX = item2.dragOrigin.x + item2.dragOffset.x;
          item2.translateY = item2.dragOrigin.y + item2.dragOffset.y;
          item2.scaleX = 1.025;
          item2.scaleY = 1.025;
        } else {
          item2.translateX = x;
          item2.translateY = y;
          if (Date.now() > item2.spawnDate) {
            if (item2.opacity === 0) {
              introItemView(item2, x, y, vx, vy);
            }
            item2.scaleX = 1;
            item2.scaleY = 1;
            item2.opacity = 1;
          }
        }
      };
      var introItemView = function introItemView2(item2, x, y, vx, vy) {
        if (item2.interactionMethod === InteractionMethod.NONE) {
          item2.translateX = null;
          item2.translateX = x;
          item2.translateY = null;
          item2.translateY = y;
        } else if (item2.interactionMethod === InteractionMethod.DROP) {
          item2.translateX = null;
          item2.translateX = x - vx * 20;
          item2.translateY = null;
          item2.translateY = y - vy * 10;
          item2.scaleX = 0.8;
          item2.scaleY = 0.8;
        } else if (item2.interactionMethod === InteractionMethod.BROWSE) {
          item2.translateY = null;
          item2.translateY = y - 30;
        } else if (item2.interactionMethod === InteractionMethod.API) {
          item2.translateX = null;
          item2.translateX = x - 30;
          item2.translateY = null;
        }
      };
      var removeItemView = function removeItemView2(_ref3) {
        var root2 = _ref3.root, action = _ref3.action;
        var id2 = action.id;
        var view = root2.childViews.find(function(child) {
          return child.id === id2;
        });
        if (!view) {
          return;
        }
        view.scaleX = 0.9;
        view.scaleY = 0.9;
        view.opacity = 0;
        view.markedForRemoval = true;
      };
      var getItemHeight = function getItemHeight2(child) {
        return child.rect.element.height + child.rect.element.marginBottom + child.rect.element.marginTop;
      };
      var getItemWidth = function getItemWidth2(child) {
        return child.rect.element.width + child.rect.element.marginLeft * 0.5 + child.rect.element.marginRight * 0.5;
      };
      var dragItem = function dragItem2(_ref4) {
        var root2 = _ref4.root, action = _ref4.action;
        var id2 = action.id, dragState = action.dragState;
        var item2 = root2.query("GET_ITEM", { id: id2 });
        var view = root2.childViews.find(function(child) {
          return child.id === id2;
        });
        var numItems = root2.childViews.length;
        var oldIndex = dragState.getItemIndex(item2);
        if (!view) return;
        var dragPosition = {
          x: view.dragOrigin.x + view.dragOffset.x + view.dragCenter.x,
          y: view.dragOrigin.y + view.dragOffset.y + view.dragCenter.y
        };
        var dragHeight = getItemHeight(view);
        var dragWidth = getItemWidth(view);
        var cols = Math.floor(root2.rect.outer.width / dragWidth);
        if (cols > numItems) cols = numItems;
        var rows = Math.floor(numItems / cols + 1);
        dropAreaDimensions.setHeight = dragHeight * rows;
        dropAreaDimensions.setWidth = dragWidth * cols;
        var location2 = {
          y: Math.floor(dragPosition.y / dragHeight),
          x: Math.floor(dragPosition.x / dragWidth),
          getGridIndex: function getGridIndex() {
            if (dragPosition.y > dropAreaDimensions.getHeight || dragPosition.y < 0 || dragPosition.x > dropAreaDimensions.getWidth || dragPosition.x < 0)
              return oldIndex;
            return this.y * cols + this.x;
          },
          getColIndex: function getColIndex() {
            var items = root2.query("GET_ACTIVE_ITEMS");
            var visibleChildren = root2.childViews.filter(function(child) {
              return child.rect.element.height;
            });
            var children = items.map(function(item3) {
              return visibleChildren.find(function(childView) {
                return childView.id === item3.id;
              });
            });
            var currentIndex2 = children.findIndex(function(child) {
              return child === view;
            });
            var dragHeight2 = getItemHeight(view);
            var l = children.length;
            var idx = l;
            var childHeight = 0;
            var childBottom = 0;
            var childTop = 0;
            for (var i = 0; i < l; i++) {
              childHeight = getItemHeight(children[i]);
              childTop = childBottom;
              childBottom = childTop + childHeight;
              if (dragPosition.y < childBottom) {
                if (currentIndex2 > i) {
                  if (dragPosition.y < childTop + dragHeight2) {
                    idx = i;
                    break;
                  }
                  continue;
                }
                idx = i;
                break;
              }
            }
            return idx;
          }
        };
        var index = cols > 1 ? location2.getGridIndex() : location2.getColIndex();
        root2.dispatch("MOVE_ITEM", { query: view, index });
        var currentIndex = dragState.getIndex();
        if (currentIndex === void 0 || currentIndex !== index) {
          dragState.setIndex(index);
          if (currentIndex === void 0) return;
          root2.dispatch("DID_REORDER_ITEMS", {
            items: root2.query("GET_ACTIVE_ITEMS"),
            origin: oldIndex,
            target: index
          });
        }
      };
      var route$2 = createRoute({
        DID_ADD_ITEM: addItemView,
        DID_REMOVE_ITEM: removeItemView,
        DID_DRAG_ITEM: dragItem
      });
      var write$5 = function write2(_ref5) {
        var root2 = _ref5.root, props = _ref5.props, actions2 = _ref5.actions, shouldOptimize = _ref5.shouldOptimize;
        route$2({ root: root2, props, actions: actions2 });
        var dragCoordinates = props.dragCoordinates;
        var horizontalSpace = root2.rect.element.width;
        var visibleChildren = root2.childViews.filter(function(child) {
          return child.rect.element.height;
        });
        var children = root2.query("GET_ACTIVE_ITEMS").map(function(item2) {
          return visibleChildren.find(function(child) {
            return child.id === item2.id;
          });
        }).filter(function(item2) {
          return item2;
        });
        var dragIndex = dragCoordinates ? getItemIndexByPosition(root2, children, dragCoordinates) : null;
        var addIndex = root2.ref.addIndex || null;
        root2.ref.addIndex = null;
        var dragIndexOffset = 0;
        var removeIndexOffset = 0;
        var addIndexOffset = 0;
        if (children.length === 0) return;
        var childRect = children[0].rect.element;
        var itemVerticalMargin = childRect.marginTop + childRect.marginBottom;
        var itemHorizontalMargin = childRect.marginLeft + childRect.marginRight;
        var itemWidth = childRect.width + itemHorizontalMargin;
        var itemHeight = childRect.height + itemVerticalMargin;
        var itemsPerRow = getItemsPerRow(horizontalSpace, itemWidth);
        if (itemsPerRow === 1) {
          var offsetY = 0;
          var dragOffset = 0;
          children.forEach(function(child, index) {
            if (dragIndex) {
              var dist = index - dragIndex;
              if (dist === -2) {
                dragOffset = -itemVerticalMargin * 0.25;
              } else if (dist === -1) {
                dragOffset = -itemVerticalMargin * 0.75;
              } else if (dist === 0) {
                dragOffset = itemVerticalMargin * 0.75;
              } else if (dist === 1) {
                dragOffset = itemVerticalMargin * 0.25;
              } else {
                dragOffset = 0;
              }
            }
            if (shouldOptimize) {
              child.translateX = null;
              child.translateY = null;
            }
            if (!child.markedForRemoval) {
              moveItem(child, 0, offsetY + dragOffset);
            }
            var itemHeight2 = child.rect.element.height + itemVerticalMargin;
            var visualHeight = itemHeight2 * (child.markedForRemoval ? child.opacity : 1);
            offsetY += visualHeight;
          });
        } else {
          var prevX = 0;
          var prevY = 0;
          children.forEach(function(child, index) {
            if (index === dragIndex) {
              dragIndexOffset = 1;
            }
            if (index === addIndex) {
              addIndexOffset += 1;
            }
            if (child.markedForRemoval && child.opacity < 0.5) {
              removeIndexOffset -= 1;
            }
            var visualIndex = index + addIndexOffset + dragIndexOffset + removeIndexOffset;
            var indexX = visualIndex % itemsPerRow;
            var indexY = Math.floor(visualIndex / itemsPerRow);
            var offsetX = indexX * itemWidth;
            var offsetY2 = indexY * itemHeight;
            var vectorX = Math.sign(offsetX - prevX);
            var vectorY = Math.sign(offsetY2 - prevY);
            prevX = offsetX;
            prevY = offsetY2;
            if (child.markedForRemoval) return;
            if (shouldOptimize) {
              child.translateX = null;
              child.translateY = null;
            }
            moveItem(child, offsetX, offsetY2, vectorX, vectorY);
          });
        }
      };
      var filterSetItemActions = function filterSetItemActions2(child, actions2) {
        return actions2.filter(function(action) {
          if (action.data && action.data.id) {
            return child.id === action.data.id;
          }
          return true;
        });
      };
      var list = createView({
        create: create$8,
        write: write$5,
        tag: "ul",
        name: "list",
        didWriteView: function didWriteView(_ref6) {
          var root2 = _ref6.root;
          root2.childViews.filter(function(view) {
            return view.markedForRemoval && view.opacity === 0 && view.resting;
          }).forEach(function(view) {
            view._destroy();
            root2.removeChildView(view);
          });
        },
        filterFrameActionsForChild: filterSetItemActions,
        mixins: {
          apis: ["dragCoordinates"]
        }
      });
      var create$9 = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        root2.ref.list = root2.appendChildView(root2.createChildView(list));
        props.dragCoordinates = null;
        props.overflowing = false;
      };
      var storeDragCoordinates = function storeDragCoordinates2(_ref2) {
        var root2 = _ref2.root, props = _ref2.props, action = _ref2.action;
        if (!root2.query("GET_ITEM_INSERT_LOCATION_FREEDOM")) return;
        props.dragCoordinates = {
          left: action.position.scopeLeft - root2.ref.list.rect.element.left,
          top: action.position.scopeTop - (root2.rect.outer.top + root2.rect.element.marginTop + root2.rect.element.scrollTop)
        };
      };
      var clearDragCoordinates = function clearDragCoordinates2(_ref3) {
        var props = _ref3.props;
        props.dragCoordinates = null;
      };
      var route$3 = createRoute({
        DID_DRAG: storeDragCoordinates,
        DID_END_DRAG: clearDragCoordinates
      });
      var write$6 = function write2(_ref4) {
        var root2 = _ref4.root, props = _ref4.props, actions2 = _ref4.actions;
        route$3({ root: root2, props, actions: actions2 });
        root2.ref.list.dragCoordinates = props.dragCoordinates;
        if (props.overflowing && !props.overflow) {
          props.overflowing = false;
          root2.element.dataset.state = "";
          root2.height = null;
        }
        if (props.overflow) {
          var newHeight = Math.round(props.overflow);
          if (newHeight !== root2.height) {
            props.overflowing = true;
            root2.element.dataset.state = "overflow";
            root2.height = newHeight;
          }
        }
      };
      var listScroller = createView({
        create: create$9,
        write: write$6,
        name: "list-scroller",
        mixins: {
          apis: ["overflow", "dragCoordinates"],
          styles: ["height", "translateY"],
          animations: {
            translateY: "spring"
          }
        }
      });
      var attrToggle = function attrToggle2(element, name2, state2) {
        var enabledValue = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
        if (state2) {
          attr(element, name2, enabledValue);
        } else {
          element.removeAttribute(name2);
        }
      };
      var resetFileInput = function resetFileInput2(input) {
        if (!input || input.value === "") {
          return;
        }
        try {
          input.value = "";
        } catch (err) {
        }
        if (input.value) {
          var form = createElement$1("form");
          var parentNode = input.parentNode;
          var ref = input.nextSibling;
          form.appendChild(input);
          form.reset();
          if (ref) {
            parentNode.insertBefore(input, ref);
          } else {
            parentNode.appendChild(input);
          }
        }
      };
      var create$a = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        root2.element.id = "filepond--browser-" + props.id;
        attr(root2.element, "name", root2.query("GET_NAME"));
        attr(root2.element, "aria-controls", "filepond--assistant-" + props.id);
        attr(root2.element, "aria-labelledby", "filepond--drop-label-" + props.id);
        setAcceptedFileTypes({
          root: root2,
          action: { value: root2.query("GET_ACCEPTED_FILE_TYPES") }
        });
        toggleAllowMultiple({ root: root2, action: { value: root2.query("GET_ALLOW_MULTIPLE") } });
        toggleDirectoryFilter({
          root: root2,
          action: { value: root2.query("GET_ALLOW_DIRECTORIES_ONLY") }
        });
        toggleDisabled({ root: root2 });
        toggleRequired({ root: root2, action: { value: root2.query("GET_REQUIRED") } });
        setCaptureMethod({ root: root2, action: { value: root2.query("GET_CAPTURE_METHOD") } });
        root2.ref.handleChange = function(e) {
          if (!root2.element.value) {
            return;
          }
          var files = Array.from(root2.element.files).map(function(file2) {
            file2._relativePath = file2.webkitRelativePath;
            return file2;
          });
          setTimeout(function() {
            props.onload(files);
            resetFileInput(root2.element);
          }, 250);
        };
        root2.element.addEventListener("change", root2.ref.handleChange);
      };
      var setAcceptedFileTypes = function setAcceptedFileTypes2(_ref2) {
        var root2 = _ref2.root, action = _ref2.action;
        if (!root2.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE")) return;
        attrToggle(
          root2.element,
          "accept",
          !!action.value,
          action.value ? action.value.join(",") : ""
        );
      };
      var toggleAllowMultiple = function toggleAllowMultiple2(_ref3) {
        var root2 = _ref3.root, action = _ref3.action;
        attrToggle(root2.element, "multiple", action.value);
      };
      var toggleDirectoryFilter = function toggleDirectoryFilter2(_ref4) {
        var root2 = _ref4.root, action = _ref4.action;
        attrToggle(root2.element, "webkitdirectory", action.value);
      };
      var toggleDisabled = function toggleDisabled2(_ref5) {
        var root2 = _ref5.root;
        var isDisabled = root2.query("GET_DISABLED");
        var doesAllowBrowse = root2.query("GET_ALLOW_BROWSE");
        var disableField = isDisabled || !doesAllowBrowse;
        attrToggle(root2.element, "disabled", disableField);
      };
      var toggleRequired = function toggleRequired2(_ref6) {
        var root2 = _ref6.root, action = _ref6.action;
        if (!action.value) {
          attrToggle(root2.element, "required", false);
        } else if (root2.query("GET_TOTAL_ITEMS") === 0) {
          attrToggle(root2.element, "required", true);
        }
      };
      var setCaptureMethod = function setCaptureMethod2(_ref7) {
        var root2 = _ref7.root, action = _ref7.action;
        attrToggle(
          root2.element,
          "capture",
          !!action.value,
          action.value === true ? "" : action.value
        );
      };
      var updateRequiredStatus = function updateRequiredStatus2(_ref8) {
        var root2 = _ref8.root;
        var element = root2.element;
        if (root2.query("GET_TOTAL_ITEMS") > 0) {
          attrToggle(element, "required", false);
          attrToggle(element, "name", false);
          var activeItems = root2.query("GET_ACTIVE_ITEMS");
          var hasInvalidField = false;
          for (var i = 0; i < activeItems.length; i++) {
            if (activeItems[i].status === ItemStatus.LOAD_ERROR) {
              hasInvalidField = true;
            }
          }
          root2.element.setCustomValidity(
            hasInvalidField ? root2.query("GET_LABEL_INVALID_FIELD") : ""
          );
        } else {
          attrToggle(element, "name", true, root2.query("GET_NAME"));
          var shouldCheckValidity = root2.query("GET_CHECK_VALIDITY");
          if (shouldCheckValidity) {
            element.setCustomValidity("");
          }
          if (root2.query("GET_REQUIRED")) {
            attrToggle(element, "required", true);
          }
        }
      };
      var updateFieldValidityStatus = function updateFieldValidityStatus2(_ref9) {
        var root2 = _ref9.root;
        var shouldCheckValidity = root2.query("GET_CHECK_VALIDITY");
        if (!shouldCheckValidity) return;
        root2.element.setCustomValidity(root2.query("GET_LABEL_INVALID_FIELD"));
      };
      var browser = createView({
        tag: "input",
        name: "browser",
        ignoreRect: true,
        ignoreRectUpdate: true,
        attributes: {
          type: "file"
        },
        create: create$a,
        destroy: function destroy(_ref10) {
          var root2 = _ref10.root;
          root2.element.removeEventListener("change", root2.ref.handleChange);
        },
        write: createRoute({
          DID_LOAD_ITEM: updateRequiredStatus,
          DID_REMOVE_ITEM: updateRequiredStatus,
          DID_THROW_ITEM_INVALID: updateFieldValidityStatus,
          DID_SET_DISABLED: toggleDisabled,
          DID_SET_ALLOW_BROWSE: toggleDisabled,
          DID_SET_ALLOW_DIRECTORIES_ONLY: toggleDirectoryFilter,
          DID_SET_ALLOW_MULTIPLE: toggleAllowMultiple,
          DID_SET_ACCEPTED_FILE_TYPES: setAcceptedFileTypes,
          DID_SET_CAPTURE_METHOD: setCaptureMethod,
          DID_SET_REQUIRED: toggleRequired
        })
      });
      var Key = {
        ENTER: 13,
        SPACE: 32
      };
      var create$b = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        var label = createElement$1("label");
        attr(label, "for", "filepond--browser-" + props.id);
        attr(label, "id", "filepond--drop-label-" + props.id);
        root2.ref.handleKeyDown = function(e) {
          var isActivationKey = e.keyCode === Key.ENTER || e.keyCode === Key.SPACE;
          if (!isActivationKey) return;
          e.preventDefault();
          root2.ref.label.click();
        };
        root2.ref.handleClick = function(e) {
          var isLabelClick = e.target === label || label.contains(e.target);
          if (isLabelClick) return;
          root2.ref.label.click();
        };
        label.addEventListener("keydown", root2.ref.handleKeyDown);
        root2.element.addEventListener("click", root2.ref.handleClick);
        updateLabelValue(label, props.caption);
        root2.appendChild(label);
        root2.ref.label = label;
      };
      var updateLabelValue = function updateLabelValue2(label, value) {
        label.innerHTML = value;
        var clickable = label.querySelector(".filepond--label-action");
        if (clickable) {
          attr(clickable, "tabindex", "0");
        }
        return value;
      };
      var dropLabel = createView({
        name: "drop-label",
        ignoreRect: true,
        create: create$b,
        destroy: function destroy(_ref2) {
          var root2 = _ref2.root;
          root2.ref.label.addEventListener("keydown", root2.ref.handleKeyDown);
          root2.element.removeEventListener("click", root2.ref.handleClick);
        },
        write: createRoute({
          DID_SET_LABEL_IDLE: function DID_SET_LABEL_IDLE(_ref3) {
            var root2 = _ref3.root, action = _ref3.action;
            updateLabelValue(root2.ref.label, action.value);
          }
        }),
        mixins: {
          styles: ["opacity", "translateX", "translateY"],
          animations: {
            opacity: { type: "tween", duration: 150 },
            translateX: "spring",
            translateY: "spring"
          }
        }
      });
      var blob = createView({
        name: "drip-blob",
        ignoreRect: true,
        mixins: {
          styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
          animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: "spring",
            translateY: "spring",
            opacity: { type: "tween", duration: 250 }
          }
        }
      });
      var addBlob = function addBlob2(_ref) {
        var root2 = _ref.root;
        var centerX = root2.rect.element.width * 0.5;
        var centerY = root2.rect.element.height * 0.5;
        root2.ref.blob = root2.appendChildView(
          root2.createChildView(blob, {
            opacity: 0,
            scaleX: 2.5,
            scaleY: 2.5,
            translateX: centerX,
            translateY: centerY
          })
        );
      };
      var moveBlob = function moveBlob2(_ref2) {
        var root2 = _ref2.root, action = _ref2.action;
        if (!root2.ref.blob) {
          addBlob({ root: root2 });
          return;
        }
        root2.ref.blob.translateX = action.position.scopeLeft;
        root2.ref.blob.translateY = action.position.scopeTop;
        root2.ref.blob.scaleX = 1;
        root2.ref.blob.scaleY = 1;
        root2.ref.blob.opacity = 1;
      };
      var hideBlob = function hideBlob2(_ref3) {
        var root2 = _ref3.root;
        if (!root2.ref.blob) {
          return;
        }
        root2.ref.blob.opacity = 0;
      };
      var explodeBlob = function explodeBlob2(_ref4) {
        var root2 = _ref4.root;
        if (!root2.ref.blob) {
          return;
        }
        root2.ref.blob.scaleX = 2.5;
        root2.ref.blob.scaleY = 2.5;
        root2.ref.blob.opacity = 0;
      };
      var write$7 = function write2(_ref5) {
        var root2 = _ref5.root, props = _ref5.props, actions2 = _ref5.actions;
        route$4({ root: root2, props, actions: actions2 });
        var blob2 = root2.ref.blob;
        if (actions2.length === 0 && blob2 && blob2.opacity === 0) {
          root2.removeChildView(blob2);
          root2.ref.blob = null;
        }
      };
      var route$4 = createRoute({
        DID_DRAG: moveBlob,
        DID_DROP: explodeBlob,
        DID_END_DRAG: hideBlob
      });
      var drip = createView({
        ignoreRect: true,
        ignoreRectUpdate: true,
        name: "drip",
        write: write$7
      });
      var setInputFiles = function setInputFiles2(element, files) {
        try {
          var dataTransfer = new DataTransfer();
          files.forEach(function(file2) {
            if (file2 instanceof File) {
              dataTransfer.items.add(file2);
            } else {
              dataTransfer.items.add(
                new File([file2], file2.name, {
                  type: file2.type
                })
              );
            }
          });
          element.files = dataTransfer.files;
        } catch (err) {
          return false;
        }
        return true;
      };
      var create$c = function create3(_ref) {
        var root2 = _ref.root;
        root2.ref.fields = {};
        var legend = document.createElement("legend");
        legend.textContent = "Files";
        root2.element.appendChild(legend);
      };
      var getField = function getField2(root2, id2) {
        return root2.ref.fields[id2];
      };
      var syncFieldPositionsWithItems = function syncFieldPositionsWithItems2(root2) {
        root2.query("GET_ACTIVE_ITEMS").forEach(function(item2) {
          if (!root2.ref.fields[item2.id]) return;
          root2.element.appendChild(root2.ref.fields[item2.id]);
        });
      };
      var didReorderItems = function didReorderItems2(_ref2) {
        var root2 = _ref2.root;
        return syncFieldPositionsWithItems(root2);
      };
      var didAddItem = function didAddItem2(_ref3) {
        var root2 = _ref3.root, action = _ref3.action;
        var fileItem = root2.query("GET_ITEM", action.id);
        var isLocalFile = fileItem.origin === FileOrigin.LOCAL;
        var shouldUseFileInput = !isLocalFile && root2.query("SHOULD_UPDATE_FILE_INPUT");
        var dataContainer = createElement$1("input");
        dataContainer.type = shouldUseFileInput ? "file" : "hidden";
        dataContainer.name = root2.query("GET_NAME");
        root2.ref.fields[action.id] = dataContainer;
        syncFieldPositionsWithItems(root2);
      };
      var didLoadItem$1 = function didLoadItem2(_ref4) {
        var root2 = _ref4.root, action = _ref4.action;
        var field = getField(root2, action.id);
        if (!field) return;
        if (action.serverFileReference !== null) field.value = action.serverFileReference;
        if (!root2.query("SHOULD_UPDATE_FILE_INPUT")) return;
        var fileItem = root2.query("GET_ITEM", action.id);
        setInputFiles(field, [fileItem.file]);
      };
      var didPrepareOutput = function didPrepareOutput2(_ref5) {
        var root2 = _ref5.root, action = _ref5.action;
        if (!root2.query("SHOULD_UPDATE_FILE_INPUT")) return;
        setTimeout(function() {
          var field = getField(root2, action.id);
          if (!field) return;
          setInputFiles(field, [action.file]);
        }, 0);
      };
      var didSetDisabled = function didSetDisabled2(_ref6) {
        var root2 = _ref6.root;
        root2.element.disabled = root2.query("GET_DISABLED");
      };
      var didRemoveItem = function didRemoveItem2(_ref7) {
        var root2 = _ref7.root, action = _ref7.action;
        var field = getField(root2, action.id);
        if (!field) return;
        if (field.parentNode) field.parentNode.removeChild(field);
        delete root2.ref.fields[action.id];
      };
      var didDefineValue = function didDefineValue2(_ref8) {
        var root2 = _ref8.root, action = _ref8.action;
        var field = getField(root2, action.id);
        if (!field) return;
        if (action.value === null) {
          field.removeAttribute("value");
        } else {
          if (field.type != "file") {
            field.value = action.value;
          }
        }
        syncFieldPositionsWithItems(root2);
      };
      var write$8 = createRoute({
        DID_SET_DISABLED: didSetDisabled,
        DID_ADD_ITEM: didAddItem,
        DID_LOAD_ITEM: didLoadItem$1,
        DID_REMOVE_ITEM: didRemoveItem,
        DID_DEFINE_VALUE: didDefineValue,
        DID_PREPARE_OUTPUT: didPrepareOutput,
        DID_REORDER_ITEMS: didReorderItems,
        DID_SORT_ITEMS: didReorderItems
      });
      var data2 = createView({
        tag: "fieldset",
        name: "data",
        create: create$c,
        write: write$8,
        ignoreRect: true
      });
      var getRootNode = function getRootNode2(element) {
        return "getRootNode" in element ? element.getRootNode() : document;
      };
      var images = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"];
      var text$1 = ["css", "csv", "html", "txt"];
      var map = {
        zip: "zip|compressed",
        epub: "application/epub+zip"
      };
      var guesstimateMimeType = function guesstimateMimeType2() {
        var extension = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        extension = extension.toLowerCase();
        if (images.includes(extension)) {
          return "image/" + (extension === "jpg" ? "jpeg" : extension === "svg" ? "svg+xml" : extension);
        }
        if (text$1.includes(extension)) {
          return "text/" + extension;
        }
        return map[extension] || "";
      };
      var requestDataTransferItems = function requestDataTransferItems2(dataTransfer) {
        return new Promise(function(resolve, reject) {
          var links = getLinks(dataTransfer);
          if (links.length && !hasFiles(dataTransfer)) {
            return resolve(links);
          }
          getFiles(dataTransfer).then(resolve);
        });
      };
      var hasFiles = function hasFiles2(dataTransfer) {
        if (dataTransfer.files) return dataTransfer.files.length > 0;
        return false;
      };
      var getFiles = function getFiles2(dataTransfer) {
        return new Promise(function(resolve, reject) {
          var promisedFiles = (dataTransfer.items ? Array.from(dataTransfer.items) : []).filter(function(item2) {
            return isFileSystemItem(item2);
          }).map(function(item2) {
            return getFilesFromItem(item2);
          });
          if (!promisedFiles.length) {
            resolve(dataTransfer.files ? Array.from(dataTransfer.files) : []);
            return;
          }
          Promise.all(promisedFiles).then(function(returnedFileGroups) {
            var files = [];
            returnedFileGroups.forEach(function(group) {
              files.push.apply(files, group);
            });
            resolve(
              files.filter(function(file2) {
                return file2;
              }).map(function(file2) {
                if (!file2._relativePath)
                  file2._relativePath = file2.webkitRelativePath;
                return file2;
              })
            );
          }).catch(console.error);
        });
      };
      var isFileSystemItem = function isFileSystemItem2(item2) {
        if (isEntry(item2)) {
          var entry = getAsEntry(item2);
          if (entry) {
            return entry.isFile || entry.isDirectory;
          }
        }
        return item2.kind === "file";
      };
      var getFilesFromItem = function getFilesFromItem2(item2) {
        return new Promise(function(resolve, reject) {
          if (isDirectoryEntry(item2)) {
            getFilesInDirectory(getAsEntry(item2)).then(resolve).catch(reject);
            return;
          }
          resolve([item2.getAsFile()]);
        });
      };
      var getFilesInDirectory = function getFilesInDirectory2(entry) {
        return new Promise(function(resolve, reject) {
          var files = [];
          var dirCounter = 0;
          var fileCounter = 0;
          var resolveIfDone = function resolveIfDone2() {
            if (fileCounter === 0 && dirCounter === 0) {
              resolve(files);
            }
          };
          var readEntries = function readEntries2(dirEntry) {
            dirCounter++;
            var directoryReader = dirEntry.createReader();
            var readBatch = function readBatch2() {
              directoryReader.readEntries(function(entries) {
                if (entries.length === 0) {
                  dirCounter--;
                  resolveIfDone();
                  return;
                }
                entries.forEach(function(entry2) {
                  if (entry2.isDirectory) {
                    readEntries2(entry2);
                  } else {
                    fileCounter++;
                    entry2.file(function(file2) {
                      var correctedFile = correctMissingFileType(file2);
                      if (entry2.fullPath)
                        correctedFile._relativePath = entry2.fullPath;
                      files.push(correctedFile);
                      fileCounter--;
                      resolveIfDone();
                    });
                  }
                });
                readBatch2();
              }, reject);
            };
            readBatch();
          };
          readEntries(entry);
        });
      };
      var correctMissingFileType = function correctMissingFileType2(file2) {
        if (file2.type.length) return file2;
        var date = file2.lastModifiedDate;
        var name2 = file2.name;
        var type = guesstimateMimeType(getExtensionFromFilename(file2.name));
        if (!type.length) return file2;
        file2 = file2.slice(0, file2.size, type);
        file2.name = name2;
        file2.lastModifiedDate = date;
        return file2;
      };
      var isDirectoryEntry = function isDirectoryEntry2(item2) {
        return isEntry(item2) && (getAsEntry(item2) || {}).isDirectory;
      };
      var isEntry = function isEntry2(item2) {
        return "webkitGetAsEntry" in item2;
      };
      var getAsEntry = function getAsEntry2(item2) {
        return item2.webkitGetAsEntry();
      };
      var getLinks = function getLinks2(dataTransfer) {
        var links = [];
        try {
          links = getLinksFromTransferMetaData(dataTransfer);
          if (links.length) {
            return links;
          }
          links = getLinksFromTransferURLData(dataTransfer);
        } catch (e) {
        }
        return links;
      };
      var getLinksFromTransferURLData = function getLinksFromTransferURLData2(dataTransfer) {
        var data3 = dataTransfer.getData("url");
        if (typeof data3 === "string" && data3.length) {
          return [data3];
        }
        return [];
      };
      var getLinksFromTransferMetaData = function getLinksFromTransferMetaData2(dataTransfer) {
        var data3 = dataTransfer.getData("text/html");
        if (typeof data3 === "string" && data3.length) {
          var matches = data3.match(/src\s*=\s*"(.+?)"/);
          if (matches) {
            return [matches[1]];
          }
        }
        return [];
      };
      var dragNDropObservers = [];
      var eventPosition = function eventPosition2(e) {
        return {
          pageLeft: e.pageX,
          pageTop: e.pageY,
          scopeLeft: e.offsetX || e.layerX,
          scopeTop: e.offsetY || e.layerY
        };
      };
      var createDragNDropClient = function createDragNDropClient2(element, scopeToObserve, filterElement) {
        var observer = getDragNDropObserver(scopeToObserve);
        var client = {
          element,
          filterElement,
          state: null,
          ondrop: function ondrop() {
          },
          onenter: function onenter() {
          },
          ondrag: function ondrag() {
          },
          onexit: function onexit() {
          },
          onload: function onload() {
          },
          allowdrop: function allowdrop() {
          }
        };
        client.destroy = observer.addListener(client);
        return client;
      };
      var getDragNDropObserver = function getDragNDropObserver2(element) {
        var observer = dragNDropObservers.find(function(item2) {
          return item2.element === element;
        });
        if (observer) {
          return observer;
        }
        var newObserver = createDragNDropObserver(element);
        dragNDropObservers.push(newObserver);
        return newObserver;
      };
      var createDragNDropObserver = function createDragNDropObserver2(element) {
        var clients = [];
        var routes = {
          dragenter,
          dragover,
          dragleave,
          drop
        };
        var handlers = {};
        forin(routes, function(event, createHandler) {
          handlers[event] = createHandler(element, clients);
          element.addEventListener(event, handlers[event], false);
        });
        var observer = {
          element,
          addListener: function addListener(client) {
            clients.push(client);
            return function() {
              clients.splice(clients.indexOf(client), 1);
              if (clients.length === 0) {
                dragNDropObservers.splice(dragNDropObservers.indexOf(observer), 1);
                forin(routes, function(event) {
                  element.removeEventListener(event, handlers[event], false);
                });
              }
            };
          }
        };
        return observer;
      };
      var elementFromPoint = function elementFromPoint2(root2, point) {
        if (!("elementFromPoint" in root2)) {
          root2 = document;
        }
        return root2.elementFromPoint(point.x, point.y);
      };
      var isEventTarget = function isEventTarget2(e, target) {
        var root2 = getRootNode(target);
        var elementAtPosition = elementFromPoint(root2, {
          x: e.pageX - window.pageXOffset,
          y: e.pageY - window.pageYOffset
        });
        return elementAtPosition === target || target.contains(elementAtPosition);
      };
      var initialTarget = null;
      var setDropEffect = function setDropEffect2(dataTransfer, effect) {
        try {
          dataTransfer.dropEffect = effect;
        } catch (e) {
        }
      };
      var dragenter = function dragenter2(root2, clients) {
        return function(e) {
          e.preventDefault();
          initialTarget = e.target;
          clients.forEach(function(client) {
            var element = client.element, onenter = client.onenter;
            if (isEventTarget(e, element)) {
              client.state = "enter";
              onenter(eventPosition(e));
            }
          });
        };
      };
      var dragover = function dragover2(root2, clients) {
        return function(e) {
          e.preventDefault();
          var dataTransfer = e.dataTransfer;
          requestDataTransferItems(dataTransfer).then(function(items) {
            var overDropTarget = false;
            clients.some(function(client) {
              var filterElement = client.filterElement, element = client.element, onenter = client.onenter, onexit = client.onexit, ondrag = client.ondrag, allowdrop = client.allowdrop;
              setDropEffect(dataTransfer, "copy");
              var allowsTransfer = allowdrop(items);
              if (!allowsTransfer) {
                setDropEffect(dataTransfer, "none");
                return;
              }
              if (isEventTarget(e, element)) {
                overDropTarget = true;
                if (client.state === null) {
                  client.state = "enter";
                  onenter(eventPosition(e));
                  return;
                }
                client.state = "over";
                if (filterElement && !allowsTransfer) {
                  setDropEffect(dataTransfer, "none");
                  return;
                }
                ondrag(eventPosition(e));
              } else {
                if (filterElement && !overDropTarget) {
                  setDropEffect(dataTransfer, "none");
                }
                if (client.state) {
                  client.state = null;
                  onexit(eventPosition(e));
                }
              }
            });
          });
        };
      };
      var drop = function drop2(root2, clients) {
        return function(e) {
          e.preventDefault();
          var dataTransfer = e.dataTransfer;
          requestDataTransferItems(dataTransfer).then(function(items) {
            clients.forEach(function(client) {
              var filterElement = client.filterElement, element = client.element, ondrop = client.ondrop, onexit = client.onexit, allowdrop = client.allowdrop;
              client.state = null;
              if (filterElement && !isEventTarget(e, element)) return;
              if (!allowdrop(items)) return onexit(eventPosition(e));
              ondrop(eventPosition(e), items);
            });
          });
        };
      };
      var dragleave = function dragleave2(root2, clients) {
        return function(e) {
          if (initialTarget !== e.target) {
            return;
          }
          clients.forEach(function(client) {
            var onexit = client.onexit;
            client.state = null;
            onexit(eventPosition(e));
          });
        };
      };
      var createHopper = function createHopper2(scope, validateItems, options) {
        scope.classList.add("filepond--hopper");
        var catchesDropsOnPage = options.catchesDropsOnPage, requiresDropOnElement = options.requiresDropOnElement, _options$filterItems = options.filterItems, filterItems = _options$filterItems === void 0 ? function(items) {
          return items;
        } : _options$filterItems;
        var client = createDragNDropClient(
          scope,
          catchesDropsOnPage ? document.documentElement : scope,
          requiresDropOnElement
        );
        var lastState = "";
        var currentState = "";
        client.allowdrop = function(items) {
          return validateItems(filterItems(items));
        };
        client.ondrop = function(position, items) {
          var filteredItems = filterItems(items);
          if (!validateItems(filteredItems)) {
            api.ondragend(position);
            return;
          }
          currentState = "drag-drop";
          api.onload(filteredItems, position);
        };
        client.ondrag = function(position) {
          api.ondrag(position);
        };
        client.onenter = function(position) {
          currentState = "drag-over";
          api.ondragstart(position);
        };
        client.onexit = function(position) {
          currentState = "drag-exit";
          api.ondragend(position);
        };
        var api = {
          updateHopperState: function updateHopperState() {
            if (lastState !== currentState) {
              scope.dataset.hopperState = currentState;
              lastState = currentState;
            }
          },
          onload: function onload() {
          },
          ondragstart: function ondragstart() {
          },
          ondrag: function ondrag() {
          },
          ondragend: function ondragend() {
          },
          destroy: function destroy() {
            client.destroy();
          }
        };
        return api;
      };
      var listening = false;
      var listeners$1 = [];
      var handlePaste = function handlePaste2(e) {
        var activeEl = document.activeElement;
        var isActiveElementEditable = activeEl && (/textarea|input/i.test(activeEl.nodeName) || activeEl.getAttribute("contenteditable") === "true" || activeEl.getAttribute("contenteditable") === "");
        if (isActiveElementEditable) {
          var inScope = false;
          var element = activeEl;
          while (element !== document.body) {
            if (element.classList.contains("filepond--root")) {
              inScope = true;
              break;
            }
            element = element.parentNode;
          }
          if (!inScope) return;
        }
        requestDataTransferItems(e.clipboardData).then(function(files) {
          if (!files.length) {
            return;
          }
          listeners$1.forEach(function(listener) {
            return listener(files);
          });
        });
      };
      var listen = function listen2(cb) {
        if (listeners$1.includes(cb)) {
          return;
        }
        listeners$1.push(cb);
        if (listening) {
          return;
        }
        listening = true;
        document.addEventListener("paste", handlePaste);
      };
      var unlisten = function unlisten2(listener) {
        arrayRemove(listeners$1, listeners$1.indexOf(listener));
        if (listeners$1.length === 0) {
          document.removeEventListener("paste", handlePaste);
          listening = false;
        }
      };
      var createPaster = function createPaster2() {
        var cb = function cb2(files) {
          api.onload(files);
        };
        var api = {
          destroy: function destroy() {
            unlisten(cb);
          },
          onload: function onload() {
          }
        };
        listen(cb);
        return api;
      };
      var create$d = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        root2.element.id = "filepond--assistant-" + props.id;
        attr(root2.element, "role", "alert");
        attr(root2.element, "aria-live", "polite");
        attr(root2.element, "aria-relevant", "additions");
      };
      var addFilesNotificationTimeout = null;
      var notificationClearTimeout = null;
      var filenames = [];
      var assist = function assist2(root2, message) {
        root2.element.textContent = message;
      };
      var clear$1 = function clear2(root2) {
        root2.element.textContent = "";
      };
      var listModified = function listModified2(root2, filename, label) {
        var total = root2.query("GET_TOTAL_ITEMS");
        assist(
          root2,
          label + " " + filename + ", " + total + " " + (total === 1 ? root2.query("GET_LABEL_FILE_COUNT_SINGULAR") : root2.query("GET_LABEL_FILE_COUNT_PLURAL"))
        );
        clearTimeout(notificationClearTimeout);
        notificationClearTimeout = setTimeout(function() {
          clear$1(root2);
        }, 1500);
      };
      var isUsingFilePond = function isUsingFilePond2(root2) {
        return root2.element.parentNode.contains(document.activeElement);
      };
      var itemAdded = function itemAdded2(_ref2) {
        var root2 = _ref2.root, action = _ref2.action;
        if (!isUsingFilePond(root2)) {
          return;
        }
        root2.element.textContent = "";
        var item2 = root2.query("GET_ITEM", action.id);
        filenames.push(item2.filename);
        clearTimeout(addFilesNotificationTimeout);
        addFilesNotificationTimeout = setTimeout(function() {
          listModified(root2, filenames.join(", "), root2.query("GET_LABEL_FILE_ADDED"));
          filenames.length = 0;
        }, 750);
      };
      var itemRemoved = function itemRemoved2(_ref3) {
        var root2 = _ref3.root, action = _ref3.action;
        if (!isUsingFilePond(root2)) {
          return;
        }
        var item2 = action.item;
        listModified(root2, item2.filename, root2.query("GET_LABEL_FILE_REMOVED"));
      };
      var itemProcessed = function itemProcessed2(_ref4) {
        var root2 = _ref4.root, action = _ref4.action;
        var item2 = root2.query("GET_ITEM", action.id);
        var filename = item2.filename;
        var label = root2.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
        assist(root2, filename + " " + label);
      };
      var itemProcessedUndo = function itemProcessedUndo2(_ref5) {
        var root2 = _ref5.root, action = _ref5.action;
        var item2 = root2.query("GET_ITEM", action.id);
        var filename = item2.filename;
        var label = root2.query("GET_LABEL_FILE_PROCESSING_ABORTED");
        assist(root2, filename + " " + label);
      };
      var itemError = function itemError2(_ref6) {
        var root2 = _ref6.root, action = _ref6.action;
        var item2 = root2.query("GET_ITEM", action.id);
        var filename = item2.filename;
        assist(root2, action.status.main + " " + filename + " " + action.status.sub);
      };
      var assistant = createView({
        create: create$d,
        ignoreRect: true,
        ignoreRectUpdate: true,
        write: createRoute({
          DID_LOAD_ITEM: itemAdded,
          DID_REMOVE_ITEM: itemRemoved,
          DID_COMPLETE_ITEM_PROCESSING: itemProcessed,
          DID_ABORT_ITEM_PROCESSING: itemProcessedUndo,
          DID_REVERT_ITEM_PROCESSING: itemProcessedUndo,
          DID_THROW_ITEM_REMOVE_ERROR: itemError,
          DID_THROW_ITEM_LOAD_ERROR: itemError,
          DID_THROW_ITEM_INVALID: itemError,
          DID_THROW_ITEM_PROCESSING_ERROR: itemError
        }),
        tag: "span",
        name: "assistant"
      });
      var toCamels = function toCamels2(string) {
        var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "-";
        return string.replace(new RegExp(separator + ".", "g"), function(sub) {
          return sub.charAt(1).toUpperCase();
        });
      };
      var debounce = function debounce2(func) {
        var interval = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16;
        var immidiateOnly = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        var last = Date.now();
        var timeout = null;
        return function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          clearTimeout(timeout);
          var dist = Date.now() - last;
          var fn2 = function fn3() {
            last = Date.now();
            func.apply(void 0, args);
          };
          if (dist < interval) {
            if (!immidiateOnly) {
              timeout = setTimeout(fn2, interval - dist);
            }
          } else {
            fn2();
          }
        };
      };
      var MAX_FILES_LIMIT = 1e6;
      var prevent = function prevent2(e) {
        return e.preventDefault();
      };
      var create$e = function create3(_ref) {
        var root2 = _ref.root, props = _ref.props;
        var id2 = root2.query("GET_ID");
        if (id2) {
          root2.element.id = id2;
        }
        var className = root2.query("GET_CLASS_NAME");
        if (className) {
          className.split(" ").filter(function(name2) {
            return name2.length;
          }).forEach(function(name2) {
            root2.element.classList.add(name2);
          });
        }
        root2.ref.label = root2.appendChildView(
          root2.createChildView(
            dropLabel,
            Object.assign({}, props, {
              translateY: null,
              caption: root2.query("GET_LABEL_IDLE")
            })
          )
        );
        root2.ref.list = root2.appendChildView(
          root2.createChildView(listScroller, { translateY: null })
        );
        root2.ref.panel = root2.appendChildView(root2.createChildView(panel, { name: "panel-root" }));
        root2.ref.assistant = root2.appendChildView(
          root2.createChildView(assistant, Object.assign({}, props))
        );
        root2.ref.data = root2.appendChildView(root2.createChildView(data2, Object.assign({}, props)));
        root2.ref.measure = createElement$1("div");
        root2.ref.measure.style.height = "100%";
        root2.element.appendChild(root2.ref.measure);
        root2.ref.bounds = null;
        root2.query("GET_STYLES").filter(function(style) {
          return !isEmpty(style.value);
        }).map(function(_ref2) {
          var name2 = _ref2.name, value = _ref2.value;
          root2.element.dataset[name2] = value;
        });
        root2.ref.widthPrevious = null;
        root2.ref.widthUpdated = debounce(function() {
          root2.ref.updateHistory = [];
          root2.dispatch("DID_RESIZE_ROOT");
        }, 250);
        root2.ref.previousAspectRatio = null;
        root2.ref.updateHistory = [];
        var canHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
        var hasPointerEvents = "PointerEvent" in window;
        if (root2.query("GET_ALLOW_REORDER") && hasPointerEvents && !canHover) {
          root2.element.addEventListener("touchmove", prevent, { passive: false });
          root2.element.addEventListener("gesturestart", prevent);
        }
        var credits = root2.query("GET_CREDITS");
        var hasCredits = credits.length === 2;
        if (hasCredits) {
          var frag = document.createElement("a");
          frag.className = "filepond--credits";
          frag.href = credits[0];
          frag.tabIndex = -1;
          frag.target = "_blank";
          frag.rel = "noopener noreferrer nofollow";
          frag.textContent = credits[1];
          root2.element.appendChild(frag);
          root2.ref.credits = frag;
        }
      };
      var write$9 = function write2(_ref3) {
        var root2 = _ref3.root, props = _ref3.props, actions2 = _ref3.actions;
        route$5({ root: root2, props, actions: actions2 });
        actions2.filter(function(action) {
          return /^DID_SET_STYLE_/.test(action.type);
        }).filter(function(action) {
          return !isEmpty(action.data.value);
        }).map(function(_ref4) {
          var type = _ref4.type, data3 = _ref4.data;
          var name2 = toCamels(type.substring(8).toLowerCase(), "_");
          root2.element.dataset[name2] = data3.value;
          root2.invalidateLayout();
        });
        if (root2.rect.element.hidden) return;
        if (root2.rect.element.width !== root2.ref.widthPrevious) {
          root2.ref.widthPrevious = root2.rect.element.width;
          root2.ref.widthUpdated();
        }
        var bounds = root2.ref.bounds;
        if (!bounds) {
          bounds = root2.ref.bounds = calculateRootBoundingBoxHeight(root2);
          root2.element.removeChild(root2.ref.measure);
          root2.ref.measure = null;
        }
        var _root$ref = root2.ref, hopper = _root$ref.hopper, label = _root$ref.label, list2 = _root$ref.list, panel2 = _root$ref.panel;
        if (hopper) {
          hopper.updateHopperState();
        }
        var aspectRatio = root2.query("GET_PANEL_ASPECT_RATIO");
        var isMultiItem = root2.query("GET_ALLOW_MULTIPLE");
        var totalItems = root2.query("GET_TOTAL_ITEMS");
        var maxItems = isMultiItem ? root2.query("GET_MAX_FILES") || MAX_FILES_LIMIT : 1;
        var atMaxCapacity = totalItems === maxItems;
        var addAction = actions2.find(function(action) {
          return action.type === "DID_ADD_ITEM";
        });
        if (atMaxCapacity && addAction) {
          var interactionMethod = addAction.data.interactionMethod;
          label.opacity = 0;
          if (isMultiItem) {
            label.translateY = -40;
          } else {
            if (interactionMethod === InteractionMethod.API) {
              label.translateX = 40;
            } else if (interactionMethod === InteractionMethod.BROWSE) {
              label.translateY = 40;
            } else {
              label.translateY = 30;
            }
          }
        } else if (!atMaxCapacity) {
          label.opacity = 1;
          label.translateX = 0;
          label.translateY = 0;
        }
        var listItemMargin = calculateListItemMargin(root2);
        var listHeight = calculateListHeight(root2);
        var labelHeight = label.rect.element.height;
        var currentLabelHeight = !isMultiItem || atMaxCapacity ? 0 : labelHeight;
        var listMarginTop = atMaxCapacity ? list2.rect.element.marginTop : 0;
        var listMarginBottom = totalItems === 0 ? 0 : list2.rect.element.marginBottom;
        var visualHeight = currentLabelHeight + listMarginTop + listHeight.visual + listMarginBottom;
        var boundsHeight = currentLabelHeight + listMarginTop + listHeight.bounds + listMarginBottom;
        list2.translateY = Math.max(0, currentLabelHeight - list2.rect.element.marginTop) - listItemMargin.top;
        if (aspectRatio) {
          var width = root2.rect.element.width;
          var height = width * aspectRatio;
          if (aspectRatio !== root2.ref.previousAspectRatio) {
            root2.ref.previousAspectRatio = aspectRatio;
            root2.ref.updateHistory = [];
          }
          var history = root2.ref.updateHistory;
          history.push(width);
          var MAX_BOUNCES = 2;
          if (history.length > MAX_BOUNCES * 2) {
            var l = history.length;
            var bottom = l - 10;
            var bounces = 0;
            for (var i = l; i >= bottom; i--) {
              if (history[i] === history[i - 2]) {
                bounces++;
              }
              if (bounces >= MAX_BOUNCES) {
                return;
              }
            }
          }
          panel2.scalable = false;
          panel2.height = height;
          var listAvailableHeight = (
            // the height of the panel minus the label height
            height - currentLabelHeight - // the room we leave open between the end of the list and the panel bottom
            (listMarginBottom - listItemMargin.bottom) - // if we're full we need to leave some room between the top of the panel and the list
            (atMaxCapacity ? listMarginTop : 0)
          );
          if (listHeight.visual > listAvailableHeight) {
            list2.overflow = listAvailableHeight;
          } else {
            list2.overflow = null;
          }
          root2.height = height;
        } else if (bounds.fixedHeight) {
          panel2.scalable = false;
          var _listAvailableHeight = (
            // the height of the panel minus the label height
            bounds.fixedHeight - currentLabelHeight - // the room we leave open between the end of the list and the panel bottom
            (listMarginBottom - listItemMargin.bottom) - // if we're full we need to leave some room between the top of the panel and the list
            (atMaxCapacity ? listMarginTop : 0)
          );
          if (listHeight.visual > _listAvailableHeight) {
            list2.overflow = _listAvailableHeight;
          } else {
            list2.overflow = null;
          }
        } else if (bounds.cappedHeight) {
          var isCappedHeight = visualHeight >= bounds.cappedHeight;
          var panelHeight = Math.min(bounds.cappedHeight, visualHeight);
          panel2.scalable = true;
          panel2.height = isCappedHeight ? panelHeight : panelHeight - listItemMargin.top - listItemMargin.bottom;
          var _listAvailableHeight2 = (
            // the height of the panel minus the label height
            panelHeight - currentLabelHeight - // the room we leave open between the end of the list and the panel bottom
            (listMarginBottom - listItemMargin.bottom) - // if we're full we need to leave some room between the top of the panel and the list
            (atMaxCapacity ? listMarginTop : 0)
          );
          if (visualHeight > bounds.cappedHeight && listHeight.visual > _listAvailableHeight2) {
            list2.overflow = _listAvailableHeight2;
          } else {
            list2.overflow = null;
          }
          root2.height = Math.min(
            bounds.cappedHeight,
            boundsHeight - listItemMargin.top - listItemMargin.bottom
          );
        } else {
          var itemMargin = totalItems > 0 ? listItemMargin.top + listItemMargin.bottom : 0;
          panel2.scalable = true;
          panel2.height = Math.max(labelHeight, visualHeight - itemMargin);
          root2.height = Math.max(labelHeight, boundsHeight - itemMargin);
        }
        if (root2.ref.credits && panel2.heightCurrent)
          root2.ref.credits.style.transform = "translateY(" + panel2.heightCurrent + "px)";
      };
      var calculateListItemMargin = function calculateListItemMargin2(root2) {
        var item2 = root2.ref.list.childViews[0].childViews[0];
        return item2 ? {
          top: item2.rect.element.marginTop,
          bottom: item2.rect.element.marginBottom
        } : {
          top: 0,
          bottom: 0
        };
      };
      var calculateListHeight = function calculateListHeight2(root2) {
        var visual = 0;
        var bounds = 0;
        var scrollList = root2.ref.list;
        var itemList = scrollList.childViews[0];
        var visibleChildren = itemList.childViews.filter(function(child) {
          return child.rect.element.height;
        });
        var children = root2.query("GET_ACTIVE_ITEMS").map(function(item2) {
          return visibleChildren.find(function(child) {
            return child.id === item2.id;
          });
        }).filter(function(item2) {
          return item2;
        });
        if (children.length === 0) return { visual, bounds };
        var horizontalSpace = itemList.rect.element.width;
        var dragIndex = getItemIndexByPosition(itemList, children, scrollList.dragCoordinates);
        var childRect = children[0].rect.element;
        var itemVerticalMargin = childRect.marginTop + childRect.marginBottom;
        var itemHorizontalMargin = childRect.marginLeft + childRect.marginRight;
        var itemWidth = childRect.width + itemHorizontalMargin;
        var itemHeight = childRect.height + itemVerticalMargin;
        var newItem = typeof dragIndex !== "undefined" && dragIndex >= 0 ? 1 : 0;
        var removedItem = children.find(function(child) {
          return child.markedForRemoval && child.opacity < 0.45;
        }) ? -1 : 0;
        var verticalItemCount = children.length + newItem + removedItem;
        var itemsPerRow = getItemsPerRow(horizontalSpace, itemWidth);
        if (itemsPerRow === 1) {
          children.forEach(function(item2) {
            var height = item2.rect.element.height + itemVerticalMargin;
            bounds += height;
            visual += height * item2.opacity;
          });
        } else {
          bounds = Math.ceil(verticalItemCount / itemsPerRow) * itemHeight;
          visual = bounds;
        }
        return { visual, bounds };
      };
      var calculateRootBoundingBoxHeight = function calculateRootBoundingBoxHeight2(root2) {
        var height = root2.ref.measureHeight || null;
        var cappedHeight = parseInt(root2.style.maxHeight, 10) || null;
        var fixedHeight = height === 0 ? null : height;
        return {
          cappedHeight,
          fixedHeight
        };
      };
      var exceedsMaxFiles = function exceedsMaxFiles2(root2, items) {
        var allowReplace = root2.query("GET_ALLOW_REPLACE");
        var allowMultiple = root2.query("GET_ALLOW_MULTIPLE");
        var totalItems = root2.query("GET_TOTAL_ITEMS");
        var maxItems = root2.query("GET_MAX_FILES");
        var totalBrowseItems = items.length;
        if (!allowMultiple && totalBrowseItems > 1) {
          root2.dispatch("DID_THROW_MAX_FILES", {
            source: items,
            error: createResponse("warning", 0, "Max files")
          });
          return true;
        }
        maxItems = allowMultiple ? maxItems : 1;
        if (!allowMultiple && allowReplace) {
          return false;
        }
        var hasMaxItems = isInt(maxItems);
        if (hasMaxItems && totalItems + totalBrowseItems > maxItems) {
          root2.dispatch("DID_THROW_MAX_FILES", {
            source: items,
            error: createResponse("warning", 0, "Max files")
          });
          return true;
        }
        return false;
      };
      var getDragIndex = function getDragIndex2(list2, children, position) {
        var itemList = list2.childViews[0];
        return getItemIndexByPosition(itemList, children, {
          left: position.scopeLeft - itemList.rect.element.left,
          top: position.scopeTop - (list2.rect.outer.top + list2.rect.element.marginTop + list2.rect.element.scrollTop)
        });
      };
      var toggleDrop = function toggleDrop2(root2) {
        var isAllowed = root2.query("GET_ALLOW_DROP");
        var isDisabled = root2.query("GET_DISABLED");
        var enabled = isAllowed && !isDisabled;
        if (enabled && !root2.ref.hopper) {
          var hopper = createHopper(
            root2.element,
            function(items) {
              var beforeDropFile = root2.query("GET_BEFORE_DROP_FILE") || function() {
                return true;
              };
              var dropValidation = root2.query("GET_DROP_VALIDATION");
              return dropValidation ? items.every(function(item2) {
                return applyFilters("ALLOW_HOPPER_ITEM", item2, {
                  query: root2.query
                }).every(function(result) {
                  return result === true;
                }) && beforeDropFile(item2);
              }) : true;
            },
            {
              filterItems: function filterItems(items) {
                var ignoredFiles = root2.query("GET_IGNORED_FILES");
                return items.filter(function(item2) {
                  if (isFile(item2)) {
                    return !ignoredFiles.includes(item2.name.toLowerCase());
                  }
                  return true;
                });
              },
              catchesDropsOnPage: root2.query("GET_DROP_ON_PAGE"),
              requiresDropOnElement: root2.query("GET_DROP_ON_ELEMENT")
            }
          );
          hopper.onload = function(items, position) {
            var list2 = root2.ref.list.childViews[0];
            var visibleChildren = list2.childViews.filter(function(child) {
              return child.rect.element.height;
            });
            var children = root2.query("GET_ACTIVE_ITEMS").map(function(item2) {
              return visibleChildren.find(function(child) {
                return child.id === item2.id;
              });
            }).filter(function(item2) {
              return item2;
            });
            applyFilterChain("ADD_ITEMS", items, { dispatch: root2.dispatch }).then(function(queue) {
              if (exceedsMaxFiles(root2, queue)) return false;
              root2.dispatch("ADD_ITEMS", {
                items: queue,
                index: getDragIndex(root2.ref.list, children, position),
                interactionMethod: InteractionMethod.DROP
              });
            });
            root2.dispatch("DID_DROP", { position });
            root2.dispatch("DID_END_DRAG", { position });
          };
          hopper.ondragstart = function(position) {
            root2.dispatch("DID_START_DRAG", { position });
          };
          hopper.ondrag = debounce(function(position) {
            root2.dispatch("DID_DRAG", { position });
          });
          hopper.ondragend = function(position) {
            root2.dispatch("DID_END_DRAG", { position });
          };
          root2.ref.hopper = hopper;
          root2.ref.drip = root2.appendChildView(root2.createChildView(drip));
        } else if (!enabled && root2.ref.hopper) {
          root2.ref.hopper.destroy();
          root2.ref.hopper = null;
          root2.removeChildView(root2.ref.drip);
        }
      };
      var toggleBrowse = function toggleBrowse2(root2, props) {
        var isAllowed = root2.query("GET_ALLOW_BROWSE");
        var isDisabled = root2.query("GET_DISABLED");
        var enabled = isAllowed && !isDisabled;
        if (enabled && !root2.ref.browser) {
          root2.ref.browser = root2.appendChildView(
            root2.createChildView(
              browser,
              Object.assign({}, props, {
                onload: function onload(items) {
                  applyFilterChain("ADD_ITEMS", items, {
                    dispatch: root2.dispatch
                  }).then(function(queue) {
                    if (exceedsMaxFiles(root2, queue)) return false;
                    root2.dispatch("ADD_ITEMS", {
                      items: queue,
                      index: -1,
                      interactionMethod: InteractionMethod.BROWSE
                    });
                  });
                }
              })
            ),
            0
          );
        } else if (!enabled && root2.ref.browser) {
          root2.removeChildView(root2.ref.browser);
          root2.ref.browser = null;
        }
      };
      var togglePaste = function togglePaste2(root2) {
        var isAllowed = root2.query("GET_ALLOW_PASTE");
        var isDisabled = root2.query("GET_DISABLED");
        var enabled = isAllowed && !isDisabled;
        if (enabled && !root2.ref.paster) {
          root2.ref.paster = createPaster();
          root2.ref.paster.onload = function(items) {
            applyFilterChain("ADD_ITEMS", items, { dispatch: root2.dispatch }).then(function(queue) {
              if (exceedsMaxFiles(root2, queue)) return false;
              root2.dispatch("ADD_ITEMS", {
                items: queue,
                index: -1,
                interactionMethod: InteractionMethod.PASTE
              });
            });
          };
        } else if (!enabled && root2.ref.paster) {
          root2.ref.paster.destroy();
          root2.ref.paster = null;
        }
      };
      var route$5 = createRoute({
        DID_SET_ALLOW_BROWSE: function DID_SET_ALLOW_BROWSE(_ref5) {
          var root2 = _ref5.root, props = _ref5.props;
          toggleBrowse(root2, props);
        },
        DID_SET_ALLOW_DROP: function DID_SET_ALLOW_DROP(_ref6) {
          var root2 = _ref6.root;
          toggleDrop(root2);
        },
        DID_SET_ALLOW_PASTE: function DID_SET_ALLOW_PASTE(_ref7) {
          var root2 = _ref7.root;
          togglePaste(root2);
        },
        DID_SET_DISABLED: function DID_SET_DISABLED(_ref8) {
          var root2 = _ref8.root, props = _ref8.props;
          toggleDrop(root2);
          togglePaste(root2);
          toggleBrowse(root2, props);
          var isDisabled = root2.query("GET_DISABLED");
          if (isDisabled) {
            root2.element.dataset.disabled = "disabled";
          } else {
            root2.element.removeAttribute("data-disabled");
          }
        }
      });
      var root = createView({
        name: "root",
        read: function read(_ref9) {
          var root2 = _ref9.root;
          if (root2.ref.measure) {
            root2.ref.measureHeight = root2.ref.measure.offsetHeight;
          }
        },
        create: create$e,
        write: write$9,
        destroy: function destroy(_ref10) {
          var root2 = _ref10.root;
          if (root2.ref.paster) {
            root2.ref.paster.destroy();
          }
          if (root2.ref.hopper) {
            root2.ref.hopper.destroy();
          }
          root2.element.removeEventListener("touchmove", prevent);
          root2.element.removeEventListener("gesturestart", prevent);
        },
        mixins: {
          styles: ["height"]
        }
      });
      var createApp = function createApp2() {
        var initialOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var originalElement = null;
        var defaultOptions2 = getOptions();
        var store = createStore(
          // initial state (should be serializable)
          createInitialState(defaultOptions2),
          // queries
          [queries, createOptionQueries(defaultOptions2)],
          // action handlers
          [actions, createOptionActions(defaultOptions2)]
        );
        store.dispatch("SET_OPTIONS", { options: initialOptions });
        var visibilityHandler = function visibilityHandler2() {
          if (document.hidden) return;
          store.dispatch("KICK");
        };
        document.addEventListener("visibilitychange", visibilityHandler);
        var resizeDoneTimer = null;
        var isResizing = false;
        var isResizingHorizontally = false;
        var initialWindowWidth = null;
        var currentWindowWidth = null;
        var resizeHandler = function resizeHandler2() {
          if (!isResizing) {
            isResizing = true;
          }
          clearTimeout(resizeDoneTimer);
          resizeDoneTimer = setTimeout(function() {
            isResizing = false;
            initialWindowWidth = null;
            currentWindowWidth = null;
            if (isResizingHorizontally) {
              isResizingHorizontally = false;
              store.dispatch("DID_STOP_RESIZE");
            }
          }, 500);
        };
        window.addEventListener("resize", resizeHandler);
        var view = root(store, { id: getUniqueId() });
        var isResting = false;
        var isHidden = false;
        var readWriteApi = {
          // necessary for update loop
          /**
           * Reads from dom (never call manually)
           * @private
           */
          _read: function _read() {
            if (isResizing) {
              currentWindowWidth = window.innerWidth;
              if (!initialWindowWidth) {
                initialWindowWidth = currentWindowWidth;
              }
              if (!isResizingHorizontally && currentWindowWidth !== initialWindowWidth) {
                store.dispatch("DID_START_RESIZE");
                isResizingHorizontally = true;
              }
            }
            if (isHidden && isResting) {
              isResting = view.element.offsetParent === null;
            }
            if (isResting) return;
            view._read();
            isHidden = view.rect.element.hidden;
          },
          /**
           * Writes to dom (never call manually)
           * @private
           */
          _write: function _write(ts) {
            var actions2 = store.processActionQueue().filter(function(action) {
              return !/^SET_/.test(action.type);
            });
            if (isResting && !actions2.length) return;
            routeActionsToEvents(actions2);
            isResting = view._write(ts, actions2, isResizingHorizontally);
            removeReleasedItems(store.query("GET_ITEMS"));
            if (isResting) {
              store.processDispatchQueue();
            }
          }
        };
        var createEvent = function createEvent2(name2) {
          return function(data3) {
            var event = {
              type: name2
            };
            if (!data3) {
              return event;
            }
            if (data3.hasOwnProperty("error")) {
              event.error = data3.error ? Object.assign({}, data3.error) : null;
            }
            if (data3.status) {
              event.status = Object.assign({}, data3.status);
            }
            if (data3.file) {
              event.output = data3.file;
            }
            if (data3.source) {
              event.file = data3.source;
            } else if (data3.item || data3.id) {
              var item2 = data3.item ? data3.item : store.query("GET_ITEM", data3.id);
              event.file = item2 ? createItemAPI(item2) : null;
            }
            if (data3.items) {
              event.items = data3.items.map(createItemAPI);
            }
            if (/progress/.test(name2)) {
              event.progress = data3.progress;
            }
            if (data3.hasOwnProperty("origin") && data3.hasOwnProperty("target")) {
              event.origin = data3.origin;
              event.target = data3.target;
            }
            return event;
          };
        };
        var eventRoutes = {
          DID_DESTROY: createEvent("destroy"),
          DID_INIT: createEvent("init"),
          DID_THROW_MAX_FILES: createEvent("warning"),
          DID_INIT_ITEM: createEvent("initfile"),
          DID_START_ITEM_LOAD: createEvent("addfilestart"),
          DID_UPDATE_ITEM_LOAD_PROGRESS: createEvent("addfileprogress"),
          DID_LOAD_ITEM: createEvent("addfile"),
          DID_THROW_ITEM_INVALID: [createEvent("error"), createEvent("addfile")],
          DID_THROW_ITEM_LOAD_ERROR: [createEvent("error"), createEvent("addfile")],
          DID_THROW_ITEM_REMOVE_ERROR: [createEvent("error"), createEvent("removefile")],
          DID_PREPARE_OUTPUT: createEvent("preparefile"),
          DID_START_ITEM_PROCESSING: createEvent("processfilestart"),
          DID_UPDATE_ITEM_PROCESS_PROGRESS: createEvent("processfileprogress"),
          DID_ABORT_ITEM_PROCESSING: createEvent("processfileabort"),
          DID_COMPLETE_ITEM_PROCESSING: createEvent("processfile"),
          DID_COMPLETE_ITEM_PROCESSING_ALL: createEvent("processfiles"),
          DID_REVERT_ITEM_PROCESSING: createEvent("processfilerevert"),
          DID_THROW_ITEM_PROCESSING_ERROR: [createEvent("error"), createEvent("processfile")],
          DID_REMOVE_ITEM: createEvent("removefile"),
          DID_UPDATE_ITEMS: createEvent("updatefiles"),
          DID_ACTIVATE_ITEM: createEvent("activatefile"),
          DID_REORDER_ITEMS: createEvent("reorderfiles")
        };
        var exposeEvent = function exposeEvent2(event) {
          var detail = Object.assign({ pond: exports3 }, event);
          delete detail.type;
          view.element.dispatchEvent(
            new CustomEvent("FilePond:" + event.type, {
              // event info
              detail,
              // event behaviour
              bubbles: true,
              cancelable: true,
              composed: true
              // triggers listeners outside of shadow root
            })
          );
          var params = [];
          if (event.hasOwnProperty("error")) {
            params.push(event.error);
          }
          if (event.hasOwnProperty("file")) {
            params.push(event.file);
          }
          var filtered = ["type", "error", "file"];
          Object.keys(event).filter(function(key) {
            return !filtered.includes(key);
          }).forEach(function(key) {
            return params.push(event[key]);
          });
          exports3.fire.apply(exports3, [event.type].concat(params));
          var handler = store.query("GET_ON" + event.type.toUpperCase());
          if (handler) {
            handler.apply(void 0, params);
          }
        };
        var routeActionsToEvents = function routeActionsToEvents2(actions2) {
          if (!actions2.length) return;
          actions2.filter(function(action) {
            return eventRoutes[action.type];
          }).forEach(function(action) {
            var routes = eventRoutes[action.type];
            (Array.isArray(routes) ? routes : [routes]).forEach(function(route2) {
              if (action.type === "DID_INIT_ITEM") {
                exposeEvent(route2(action.data));
              } else {
                setTimeout(function() {
                  exposeEvent(route2(action.data));
                }, 0);
              }
            });
          });
        };
        var setOptions2 = function setOptions3(options) {
          return store.dispatch("SET_OPTIONS", { options });
        };
        var getFile = function getFile2(query) {
          return store.query("GET_ACTIVE_ITEM", query);
        };
        var prepareFile = function prepareFile2(query) {
          return new Promise(function(resolve, reject) {
            store.dispatch("REQUEST_ITEM_PREPARE", {
              query,
              success: function success(item2) {
                resolve(item2);
              },
              failure: function failure(error2) {
                reject(error2);
              }
            });
          });
        };
        var addFile = function addFile2(source) {
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return new Promise(function(resolve, reject) {
            addFiles([{ source, options }], { index: options.index }).then(function(items) {
              return resolve(items && items[0]);
            }).catch(reject);
          });
        };
        var isFilePondFile = function isFilePondFile2(obj) {
          return obj.file && obj.id;
        };
        var removeFile = function removeFile2(query, options) {
          if (typeof query === "object" && !isFilePondFile(query) && !options) {
            options = query;
            query = void 0;
          }
          store.dispatch("REMOVE_ITEM", Object.assign({}, options, { query }));
          return store.query("GET_ACTIVE_ITEM", query) === null;
        };
        var addFiles = function addFiles2() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return new Promise(function(resolve, reject) {
            var sources = [];
            var options = {};
            if (isArray(args[0])) {
              sources.push.apply(sources, args[0]);
              Object.assign(options, args[1] || {});
            } else {
              var lastArgument = args[args.length - 1];
              if (typeof lastArgument === "object" && !(lastArgument instanceof Blob)) {
                Object.assign(options, args.pop());
              }
              sources.push.apply(sources, args);
            }
            store.dispatch("ADD_ITEMS", {
              items: sources,
              index: options.index,
              interactionMethod: InteractionMethod.API,
              success: resolve,
              failure: reject
            });
          });
        };
        var getFiles2 = function getFiles3() {
          return store.query("GET_ACTIVE_ITEMS");
        };
        var processFile = function processFile2(query) {
          return new Promise(function(resolve, reject) {
            store.dispatch("REQUEST_ITEM_PROCESSING", {
              query,
              success: function success(item2) {
                resolve(item2);
              },
              failure: function failure(error2) {
                reject(error2);
              }
            });
          });
        };
        var prepareFiles = function prepareFiles2() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          var queries2 = Array.isArray(args[0]) ? args[0] : args;
          var items = queries2.length ? queries2 : getFiles2();
          return Promise.all(items.map(prepareFile));
        };
        var processFiles = function processFiles2() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          var queries2 = Array.isArray(args[0]) ? args[0] : args;
          if (!queries2.length) {
            var files = getFiles2().filter(function(item2) {
              return !(item2.status === ItemStatus.IDLE && item2.origin === FileOrigin.LOCAL) && item2.status !== ItemStatus.PROCESSING && item2.status !== ItemStatus.PROCESSING_COMPLETE && item2.status !== ItemStatus.PROCESSING_REVERT_ERROR;
            });
            return Promise.all(files.map(processFile));
          }
          return Promise.all(queries2.map(processFile));
        };
        var removeFiles = function removeFiles2() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          var queries2 = Array.isArray(args[0]) ? args[0] : args;
          var options;
          if (typeof queries2[queries2.length - 1] === "object") {
            options = queries2.pop();
          } else if (Array.isArray(args[0])) {
            options = args[1];
          }
          var files = getFiles2();
          if (!queries2.length)
            return Promise.all(
              files.map(function(file2) {
                return removeFile(file2, options);
              })
            );
          var mappedQueries = queries2.map(function(query) {
            return isNumber(query) ? files[query] ? files[query].id : null : query;
          }).filter(function(query) {
            return query;
          });
          return mappedQueries.map(function(q) {
            return removeFile(q, options);
          });
        };
        var exports3 = Object.assign(
          {},
          on(),
          {},
          readWriteApi,
          {},
          createOptionAPI(store, defaultOptions2),
          {
            /**
             * Override options defined in options object
             * @param options
             */
            setOptions: setOptions2,
            /**
             * Load the given file
             * @param source - the source of the file (either a File, base64 data uri or url)
             * @param options - object, { index: 0 }
             */
            addFile,
            /**
             * Load the given files
             * @param sources - the sources of the files to load
             * @param options - object, { index: 0 }
             */
            addFiles,
            /**
             * Returns the file objects matching the given query
             * @param query { string, number, null }
             */
            getFile,
            /**
             * Upload file with given name
             * @param query { string, number, null  }
             */
            processFile,
            /**
             * Request prepare output for file with given name
             * @param query { string, number, null  }
             */
            prepareFile,
            /**
             * Removes a file by its name
             * @param query { string, number, null  }
             */
            removeFile,
            /**
             * Moves a file to a new location in the files list
             */
            moveFile: function moveFile(query, index) {
              return store.dispatch("MOVE_ITEM", { query, index });
            },
            /**
             * Returns all files (wrapped in public api)
             */
            getFiles: getFiles2,
            /**
             * Starts uploading all files
             */
            processFiles,
            /**
             * Clears all files from the files list
             */
            removeFiles,
            /**
             * Starts preparing output of all files
             */
            prepareFiles,
            /**
             * Sort list of files
             */
            sort: function sort(compare) {
              return store.dispatch("SORT", { compare });
            },
            /**
             * Browse the file system for a file
             */
            browse: function browse() {
              var input = view.element.querySelector("input[type=file]");
              if (input) {
                input.click();
              }
            },
            /**
             * Destroys the app
             */
            destroy: function destroy() {
              exports3.fire("destroy", view.element);
              store.dispatch("ABORT_ALL");
              view._destroy();
              window.removeEventListener("resize", resizeHandler);
              document.removeEventListener("visibilitychange", visibilityHandler);
              store.dispatch("DID_DESTROY");
            },
            /**
             * Inserts the plugin before the target element
             */
            insertBefore: function insertBefore$1(element) {
              return insertBefore(view.element, element);
            },
            /**
             * Inserts the plugin after the target element
             */
            insertAfter: function insertAfter$1(element) {
              return insertAfter(view.element, element);
            },
            /**
             * Appends the plugin to the target element
             */
            appendTo: function appendTo(element) {
              return element.appendChild(view.element);
            },
            /**
             * Replaces an element with the app
             */
            replaceElement: function replaceElement(element) {
              insertBefore(view.element, element);
              element.parentNode.removeChild(element);
              originalElement = element;
            },
            /**
             * Restores the original element
             */
            restoreElement: function restoreElement() {
              if (!originalElement) {
                return;
              }
              insertAfter(originalElement, view.element);
              view.element.parentNode.removeChild(view.element);
              originalElement = null;
            },
            /**
             * Returns true if the app root is attached to given element
             * @param element
             */
            isAttachedTo: function isAttachedTo(element) {
              return view.element === element || originalElement === element;
            },
            /**
             * Returns the root element
             */
            element: {
              get: function get() {
                return view.element;
              }
            },
            /**
             * Returns the current pond status
             */
            status: {
              get: function get() {
                return store.query("GET_STATUS");
              }
            }
          }
        );
        store.dispatch("DID_INIT");
        return createObject(exports3);
      };
      var createAppObject = function createAppObject2() {
        var customOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var defaultOptions2 = {};
        forin(getOptions(), function(key, value) {
          defaultOptions2[key] = value[0];
        });
        var app = createApp(
          Object.assign(
            {},
            defaultOptions2,
            {},
            customOptions
          )
        );
        return app;
      };
      var lowerCaseFirstLetter = function lowerCaseFirstLetter2(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
      };
      var attributeNameToPropertyName = function attributeNameToPropertyName2(attributeName) {
        return toCamels(attributeName.replace(/^data-/, ""));
      };
      var mapObject = function mapObject2(object, propertyMap) {
        forin(propertyMap, function(selector, mapping) {
          forin(object, function(property, value) {
            var selectorRegExp = new RegExp(selector);
            var matches = selectorRegExp.test(property);
            if (!matches) {
              return;
            }
            delete object[property];
            if (mapping === false) {
              return;
            }
            if (isString(mapping)) {
              object[mapping] = value;
              return;
            }
            var group = mapping.group;
            if (isObject(mapping) && !object[group]) {
              object[group] = {};
            }
            object[group][lowerCaseFirstLetter(property.replace(selectorRegExp, ""))] = value;
          });
          if (mapping.mapping) {
            mapObject2(object[mapping.group], mapping.mapping);
          }
        });
      };
      var getAttributesAsObject = function getAttributesAsObject2(node) {
        var attributeMapping = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var attributes = [];
        forin(node.attributes, function(index) {
          attributes.push(node.attributes[index]);
        });
        var output = attributes.filter(function(attribute) {
          return attribute.name;
        }).reduce(function(obj, attribute) {
          var value = attr(node, attribute.name);
          obj[attributeNameToPropertyName(attribute.name)] = value === attribute.name ? true : value;
          return obj;
        }, {});
        mapObject(output, attributeMapping);
        return output;
      };
      var createAppAtElement = function createAppAtElement2(element) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var attributeMapping = {
          // translate to other name
          "^class$": "className",
          "^multiple$": "allowMultiple",
          "^capture$": "captureMethod",
          "^webkitdirectory$": "allowDirectoriesOnly",
          // group under single property
          "^server": {
            group: "server",
            mapping: {
              "^process": {
                group: "process"
              },
              "^revert": {
                group: "revert"
              },
              "^fetch": {
                group: "fetch"
              },
              "^restore": {
                group: "restore"
              },
              "^load": {
                group: "load"
              }
            }
          },
          // don't include in object
          "^type$": false,
          "^files$": false
        };
        applyFilters("SET_ATTRIBUTE_TO_OPTION_MAP", attributeMapping);
        var mergedOptions = Object.assign({}, options);
        var attributeOptions = getAttributesAsObject(
          element.nodeName === "FIELDSET" ? element.querySelector("input[type=file]") : element,
          attributeMapping
        );
        Object.keys(attributeOptions).forEach(function(key) {
          if (isObject(attributeOptions[key])) {
            if (!isObject(mergedOptions[key])) {
              mergedOptions[key] = {};
            }
            Object.assign(mergedOptions[key], attributeOptions[key]);
          } else {
            mergedOptions[key] = attributeOptions[key];
          }
        });
        mergedOptions.files = (options.files || []).concat(
          Array.from(element.querySelectorAll("input:not([type=file])")).map(function(input) {
            return {
              source: input.value,
              options: {
                type: input.dataset.type
              }
            };
          })
        );
        var app = createAppObject(mergedOptions);
        if (element.files) {
          Array.from(element.files).forEach(function(file2) {
            app.addFile(file2);
          });
        }
        app.replaceElement(element);
        return app;
      };
      var createApp$1 = function createApp2() {
        return isNode(arguments.length <= 0 ? void 0 : arguments[0]) ? createAppAtElement.apply(void 0, arguments) : createAppObject.apply(void 0, arguments);
      };
      var PRIVATE_METHODS = ["fire", "_read", "_write"];
      var createAppAPI = function createAppAPI2(app) {
        var api = {};
        copyObjectPropertiesToObject(app, api, PRIVATE_METHODS);
        return api;
      };
      var replaceInString = function replaceInString2(string, replacements) {
        return string.replace(/(?:{([a-zA-Z]+)})/g, function(match, group) {
          return replacements[group];
        });
      };
      var createWorker = function createWorker2(fn2) {
        var workerBlob = new Blob(["(", fn2.toString(), ")()"], {
          type: "application/javascript"
        });
        var workerURL = URL.createObjectURL(workerBlob);
        var worker = new Worker(workerURL);
        return {
          transfer: function transfer(message, cb) {
          },
          post: function post(message, cb, transferList) {
            var id2 = getUniqueId();
            worker.onmessage = function(e) {
              if (e.data.id === id2) {
                cb(e.data.message);
              }
            };
            worker.postMessage(
              {
                id: id2,
                message
              },
              transferList
            );
          },
          terminate: function terminate() {
            worker.terminate();
            URL.revokeObjectURL(workerURL);
          }
        };
      };
      var loadImage = function loadImage2(url) {
        return new Promise(function(resolve, reject) {
          var img = new Image();
          img.onload = function() {
            resolve(img);
          };
          img.onerror = function(e) {
            reject(e);
          };
          img.src = url;
        });
      };
      var renameFile = function renameFile2(file2, name2) {
        var renamedFile = file2.slice(0, file2.size, file2.type);
        renamedFile.lastModifiedDate = file2.lastModifiedDate;
        renamedFile.name = name2;
        return renamedFile;
      };
      var copyFile = function copyFile2(file2) {
        return renameFile(file2, file2.name);
      };
      var registeredPlugins = [];
      var createAppPlugin = function createAppPlugin2(plugin) {
        if (registeredPlugins.includes(plugin)) {
          return;
        }
        registeredPlugins.push(plugin);
        var pluginOutline = plugin({
          addFilter,
          utils: {
            Type,
            forin,
            isString,
            isFile,
            toNaturalFileSize,
            replaceInString,
            getExtensionFromFilename,
            getFilenameWithoutExtension,
            guesstimateMimeType,
            getFileFromBlob,
            getFilenameFromURL,
            createRoute,
            createWorker,
            createView,
            createItemAPI,
            loadImage,
            copyFile,
            renameFile,
            createBlob,
            applyFilterChain,
            text,
            getNumericAspectRatioFromString
          },
          views: {
            fileActionButton
          }
        });
        extendDefaultOptions(pluginOutline.options);
      };
      var isOperaMini = function isOperaMini2() {
        return Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
      };
      var hasPromises = function hasPromises2() {
        return "Promise" in window;
      };
      var hasBlobSlice = function hasBlobSlice2() {
        return "slice" in Blob.prototype;
      };
      var hasCreateObjectURL = function hasCreateObjectURL2() {
        return "URL" in window && "createObjectURL" in window.URL;
      };
      var hasVisibility = function hasVisibility2() {
        return "visibilityState" in document;
      };
      var hasTiming = function hasTiming2() {
        return "performance" in window;
      };
      var hasCSSSupports = function hasCSSSupports2() {
        return "supports" in (window.CSS || {});
      };
      var isIE11 = function isIE112() {
        return /MSIE|Trident/.test(window.navigator.userAgent);
      };
      var supported = (function() {
        var isSupported = (
          // Has to be a browser
          isBrowser() && // Can't run on Opera Mini due to lack of everything
          !isOperaMini() && // Require these APIs to feature detect a modern browser
          hasVisibility() && hasPromises() && hasBlobSlice() && hasCreateObjectURL() && hasTiming() && // doesn't need CSSSupports but is a good way to detect Safari 9+ (we do want to support IE11 though)
          (hasCSSSupports() || isIE11())
        );
        return function() {
          return isSupported;
        };
      })();
      var state = {
        // active app instances, used to redraw the apps and to find the later
        apps: []
      };
      var name = "filepond";
      var fn = function fn2() {
      };
      exports2.Status = {};
      exports2.FileStatus = {};
      exports2.FileOrigin = {};
      exports2.OptionTypes = {};
      exports2.create = fn;
      exports2.destroy = fn;
      exports2.parse = fn;
      exports2.find = fn;
      exports2.registerPlugin = fn;
      exports2.getOptions = fn;
      exports2.setOptions = fn;
      if (supported()) {
        createPainter(
          function() {
            state.apps.forEach(function(app) {
              return app._read();
            });
          },
          function(ts) {
            state.apps.forEach(function(app) {
              return app._write(ts);
            });
          }
        );
        var dispatch = function dispatch2() {
          document.dispatchEvent(
            new CustomEvent("FilePond:loaded", {
              detail: {
                supported,
                create: exports2.create,
                destroy: exports2.destroy,
                parse: exports2.parse,
                find: exports2.find,
                registerPlugin: exports2.registerPlugin,
                setOptions: exports2.setOptions
              }
            })
          );
          document.removeEventListener("DOMContentLoaded", dispatch2);
        };
        if (document.readyState !== "loading") {
          setTimeout(function() {
            return dispatch();
          }, 0);
        } else {
          document.addEventListener("DOMContentLoaded", dispatch);
        }
        var updateOptionTypes = function updateOptionTypes2() {
          return forin(getOptions(), function(key, value) {
            exports2.OptionTypes[key] = value[1];
          });
        };
        exports2.Status = Object.assign({}, Status);
        exports2.FileOrigin = Object.assign({}, FileOrigin);
        exports2.FileStatus = Object.assign({}, ItemStatus);
        exports2.OptionTypes = {};
        updateOptionTypes();
        exports2.create = function create3() {
          var app = createApp$1.apply(void 0, arguments);
          app.on("destroy", exports2.destroy);
          state.apps.push(app);
          return createAppAPI(app);
        };
        exports2.destroy = function destroy(hook) {
          var indexToRemove = state.apps.findIndex(function(app2) {
            return app2.isAttachedTo(hook);
          });
          if (indexToRemove >= 0) {
            var app = state.apps.splice(indexToRemove, 1)[0];
            app.restoreElement();
            return true;
          }
          return false;
        };
        exports2.parse = function parse(context) {
          var matchedHooks = Array.from(context.querySelectorAll("." + name));
          var newHooks = matchedHooks.filter(function(newHook) {
            return !state.apps.find(function(app) {
              return app.isAttachedTo(newHook);
            });
          });
          return newHooks.map(function(hook) {
            return exports2.create(hook);
          });
        };
        exports2.find = function find(hook) {
          var app = state.apps.find(function(app2) {
            return app2.isAttachedTo(hook);
          });
          if (!app) {
            return null;
          }
          return createAppAPI(app);
        };
        exports2.registerPlugin = function registerPlugin2() {
          for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
            plugins[_key] = arguments[_key];
          }
          plugins.forEach(createAppPlugin);
          updateOptionTypes();
        };
        exports2.getOptions = function getOptions$1() {
          var opts = {};
          forin(getOptions(), function(key, value) {
            opts[key] = value[0];
          });
          return opts;
        };
        exports2.setOptions = function setOptions$1(opts) {
          if (isObject(opts)) {
            state.apps.forEach(function(app) {
              app.setOptions(opts);
            });
            setOptions(opts);
          }
          return exports2.getOptions();
        };
      }
      exports2.supported = supported;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js
var require_filepond_plugin_file_validate_size = __commonJS({
  "node_modules/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginFileValidateSize = factory());
    })(exports, function() {
      "use strict";
      var plugin = function plugin2(_ref) {
        var addFilter = _ref.addFilter, utils = _ref.utils;
        var Type = utils.Type, replaceInString = utils.replaceInString, toNaturalFileSize = utils.toNaturalFileSize;
        addFilter("ALLOW_HOPPER_ITEM", function(file, _ref2) {
          var query = _ref2.query;
          if (!query("GET_ALLOW_FILE_SIZE_VALIDATION")) {
            return true;
          }
          var sizeMax = query("GET_MAX_FILE_SIZE");
          if (sizeMax !== null && file.size > sizeMax) {
            return false;
          }
          var sizeMin = query("GET_MIN_FILE_SIZE");
          if (sizeMin !== null && file.size < sizeMin) {
            return false;
          }
          return true;
        });
        addFilter("LOAD_FILE", function(file, _ref3) {
          var query = _ref3.query;
          return new Promise(function(resolve, reject) {
            if (!query("GET_ALLOW_FILE_SIZE_VALIDATION")) {
              return resolve(file);
            }
            var fileFilter = query("GET_FILE_VALIDATE_SIZE_FILTER");
            if (fileFilter && !fileFilter(file)) {
              return resolve(file);
            }
            var sizeMax = query("GET_MAX_FILE_SIZE");
            if (sizeMax !== null && file.size > sizeMax) {
              reject({
                status: {
                  main: query("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
                  sub: replaceInString(query("GET_LABEL_MAX_FILE_SIZE"), {
                    filesize: toNaturalFileSize(
                      sizeMax,
                      ".",
                      query("GET_FILE_SIZE_BASE"),
                      query("GET_FILE_SIZE_LABELS", query)
                    )
                  })
                }
              });
              return;
            }
            var sizeMin = query("GET_MIN_FILE_SIZE");
            if (sizeMin !== null && file.size < sizeMin) {
              reject({
                status: {
                  main: query("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
                  sub: replaceInString(query("GET_LABEL_MIN_FILE_SIZE"), {
                    filesize: toNaturalFileSize(
                      sizeMin,
                      ".",
                      query("GET_FILE_SIZE_BASE"),
                      query("GET_FILE_SIZE_LABELS", query)
                    )
                  })
                }
              });
              return;
            }
            var totalSizeMax = query("GET_MAX_TOTAL_FILE_SIZE");
            if (totalSizeMax !== null) {
              var currentTotalSize = query("GET_ACTIVE_ITEMS").reduce(function(total, item) {
                return total + item.fileSize;
              }, 0);
              if (currentTotalSize > totalSizeMax) {
                reject({
                  status: {
                    main: query("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"),
                    sub: replaceInString(query("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
                      filesize: toNaturalFileSize(
                        totalSizeMax,
                        ".",
                        query("GET_FILE_SIZE_BASE"),
                        query("GET_FILE_SIZE_LABELS", query)
                      )
                    })
                  }
                });
                return;
              }
            }
            resolve(file);
          });
        });
        return {
          options: {
            // Enable or disable file type validation
            allowFileSizeValidation: [true, Type.BOOLEAN],
            // Max individual file size in bytes
            maxFileSize: [null, Type.INT],
            // Min individual file size in bytes
            minFileSize: [null, Type.INT],
            // Max total file size in bytes
            maxTotalFileSize: [null, Type.INT],
            // Filter the files that need to be validated for size
            fileValidateSizeFilter: [null, Type.FUNCTION],
            // error labels
            labelMinFileSizeExceeded: ["File is too small", Type.STRING],
            labelMinFileSize: ["Minimum file size is {filesize}", Type.STRING],
            labelMaxFileSizeExceeded: ["File is too large", Type.STRING],
            labelMaxFileSize: ["Maximum file size is {filesize}", Type.STRING],
            labelMaxTotalFileSizeExceeded: ["Maximum total size exceeded", Type.STRING],
            labelMaxTotalFileSize: ["Maximum total file size is {filesize}", Type.STRING]
          }
        };
      };
      var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
      if (isBrowser) {
        document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin }));
      }
      return plugin;
    });
  }
});

// node_modules/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.js
var require_filepond_plugin_image_exif_orientation = __commonJS({
  "node_modules/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginImageExifOrientation = factory());
    })(exports, function() {
      "use strict";
      var isJPEG = function isJPEG2(file) {
        return /^image\/jpeg/.test(file.type);
      };
      var Marker = {
        JPEG: 65496,
        APP1: 65505,
        EXIF: 1165519206,
        TIFF: 18761,
        Orientation: 274,
        Unknown: 65280
      };
      var getUint16 = function getUint162(view, offset) {
        var little = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        return view.getUint16(offset, little);
      };
      var getUint32 = function getUint322(view, offset) {
        var little = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        return view.getUint32(offset, little);
      };
      var getImageOrientation = function getImageOrientation2(file) {
        return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var view = new DataView(e.target.result);
            if (getUint16(view, 0) !== Marker.JPEG) {
              resolve(-1);
              return;
            }
            var length = view.byteLength;
            var offset = 2;
            while (offset < length) {
              var marker = getUint16(view, offset);
              offset += 2;
              if (marker === Marker.APP1) {
                if (getUint32(view, offset += 2) !== Marker.EXIF) {
                  break;
                }
                var little = getUint16(view, offset += 6) === Marker.TIFF;
                offset += getUint32(view, offset + 4, little);
                var tags = getUint16(view, offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++) {
                  if (getUint16(view, offset + i * 12, little) === Marker.Orientation) {
                    resolve(getUint16(view, offset + i * 12 + 8, little));
                    return;
                  }
                }
              } else if ((marker & Marker.Unknown) !== Marker.Unknown) {
                break;
              } else {
                offset += getUint16(view, offset);
              }
            }
            resolve(-1);
          };
          reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
        });
      };
      var IS_BROWSER = (function() {
        return typeof window !== "undefined" && typeof window.document !== "undefined";
      })();
      var isBrowser = function isBrowser2() {
        return IS_BROWSER;
      };
      var testSrc = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=";
      var shouldCorrect = void 0;
      var testImage = isBrowser() ? new Image() : {};
      testImage.onload = function() {
        return shouldCorrect = testImage.naturalWidth > testImage.naturalHeight;
      };
      testImage.src = testSrc;
      var shouldCorrectImageExifOrientation = function shouldCorrectImageExifOrientation2() {
        return shouldCorrect;
      };
      var plugin = function plugin2(_ref) {
        var addFilter = _ref.addFilter, utils = _ref.utils;
        var Type = utils.Type, isFile = utils.isFile;
        addFilter("DID_LOAD_ITEM", function(item, _ref2) {
          var query = _ref2.query;
          return new Promise(function(resolve, reject) {
            var file = item.file;
            if (!isFile(file) || !isJPEG(file) || !query("GET_ALLOW_IMAGE_EXIF_ORIENTATION") || !shouldCorrectImageExifOrientation()) {
              return resolve(item);
            }
            getImageOrientation(file).then(function(orientation) {
              item.setMetadata("exif", { orientation });
              resolve(item);
            });
          });
        });
        return {
          options: {
            // Enable or disable image orientation reading
            allowImageExifOrientation: [true, Type.BOOLEAN]
          }
        };
      };
      var isBrowser$1 = typeof window !== "undefined" && typeof window.document !== "undefined";
      if (isBrowser$1) {
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: plugin })
        );
      }
      return plugin;
    });
  }
});

// node_modules/filepond-plugin-image-validate-size/dist/filepond-plugin-image-validate-size.js
var require_filepond_plugin_image_validate_size = __commonJS({
  "node_modules/filepond-plugin-image-validate-size/dist/filepond-plugin-image-validate-size.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginImageValidateSize = factory());
    })(exports, function() {
      "use strict";
      var isImage = function isImage2(file) {
        return /^image/.test(file.type);
      };
      var getImageSize = function getImageSize2(file) {
        return new Promise(function(resolve, reject) {
          var image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.onerror = function(err) {
            clearInterval(intervalId);
            reject(err);
          };
          var intervalId = setInterval(function() {
            if (image.naturalWidth && image.naturalHeight) {
              clearInterval(intervalId);
              URL.revokeObjectURL(image.src);
              resolve({
                width: image.naturalWidth,
                height: image.naturalHeight
              });
            }
          }, 1);
        });
      };
      var plugin = function plugin2(_ref) {
        var addFilter = _ref.addFilter, utils = _ref.utils;
        var Type = utils.Type, replaceInString = utils.replaceInString, isFile = utils.isFile;
        var validateFile = function validateFile2(file, bounds, measure) {
          return new Promise(function(resolve, reject) {
            var onReceiveSize = function onReceiveSize2(_ref2) {
              var width = _ref2.width, height = _ref2.height;
              var minWidth = bounds.minWidth, minHeight = bounds.minHeight, maxWidth = bounds.maxWidth, maxHeight = bounds.maxHeight, minResolution = bounds.minResolution, maxResolution = bounds.maxResolution;
              var resolution = width * height;
              if (width < minWidth || height < minHeight) {
                reject("TOO_SMALL");
              } else if (width > maxWidth || height > maxHeight) {
                reject("TOO_BIG");
              } else if (minResolution !== null && resolution < minResolution) {
                reject("TOO_LOW_RES");
              } else if (maxResolution !== null && resolution > maxResolution) {
                reject("TOO_HIGH_RES");
              }
              resolve();
            };
            getImageSize(file).then(onReceiveSize).catch(function() {
              if (!measure) {
                reject();
                return;
              }
              measure(file, bounds).then(onReceiveSize).catch(function() {
                return reject();
              });
            });
          });
        };
        addFilter("LOAD_FILE", function(file, _ref3) {
          var query = _ref3.query;
          return new Promise(function(resolve, reject) {
            if (!isFile(file) || !isImage(file) || !query("GET_ALLOW_IMAGE_VALIDATE_SIZE")) {
              resolve(file);
              return;
            }
            var bounds = {
              minWidth: query("GET_IMAGE_VALIDATE_SIZE_MIN_WIDTH"),
              minHeight: query("GET_IMAGE_VALIDATE_SIZE_MIN_HEIGHT"),
              maxWidth: query("GET_IMAGE_VALIDATE_SIZE_MAX_WIDTH"),
              maxHeight: query("GET_IMAGE_VALIDATE_SIZE_MAX_HEIGHT"),
              minResolution: query("GET_IMAGE_VALIDATE_SIZE_MIN_RESOLUTION"),
              maxResolution: query("GET_IMAGE_VALIDATE_SIZE_MAX_RESOLUTION")
            };
            var measure = query("GET_IMAGE_VALIDATE_SIZE_MEASURE");
            validateFile(file, bounds, measure).then(function() {
              resolve(file);
            }).catch(function(error) {
              var status = error ? {
                TOO_SMALL: {
                  label: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_IMAGE_SIZE_TOO_SMALL"
                  ),
                  details: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_EXPECTED_MIN_SIZE"
                  )
                },
                TOO_BIG: {
                  label: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_IMAGE_SIZE_TOO_BIG"
                  ),
                  details: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_EXPECTED_MAX_SIZE"
                  )
                },
                TOO_LOW_RES: {
                  label: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_IMAGE_RESOLUTION_TOO_LOW"
                  ),
                  details: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_EXPECTED_MIN_RESOLUTION"
                  )
                },
                TOO_HIGH_RES: {
                  label: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_IMAGE_RESOLUTION_TOO_HIGH"
                  ),
                  details: query(
                    "GET_IMAGE_VALIDATE_SIZE_LABEL_EXPECTED_MAX_RESOLUTION"
                  )
                }
              }[error] : {
                label: query("GET_IMAGE_VALIDATE_SIZE_LABEL_FORMAT_ERROR"),
                details: file.type
              };
              reject({
                status: {
                  main: status.label,
                  sub: error ? replaceInString(status.details, bounds) : status.details
                }
              });
            });
          });
        });
        return {
          // default options
          options: {
            // Enable or disable file type validation
            allowImageValidateSize: [true, Type.BOOLEAN],
            // Error thrown when image can not be loaded
            imageValidateSizeLabelFormatError: [
              "Image type not supported",
              Type.STRING
            ],
            // Custom function to use as image measure
            imageValidateSizeMeasure: [null, Type.FUNCTION],
            // Required amount of pixels in the image
            imageValidateSizeMinResolution: [null, Type.INT],
            imageValidateSizeMaxResolution: [null, Type.INT],
            imageValidateSizeLabelImageResolutionTooLow: [
              "Resolution is too low",
              Type.STRING
            ],
            imageValidateSizeLabelImageResolutionTooHigh: [
              "Resolution is too high",
              Type.STRING
            ],
            imageValidateSizeLabelExpectedMinResolution: [
              "Minimum resolution is {minResolution}",
              Type.STRING
            ],
            imageValidateSizeLabelExpectedMaxResolution: [
              "Maximum resolution is {maxResolution}",
              Type.STRING
            ],
            // Required dimensions
            imageValidateSizeMinWidth: [1, Type.INT],
            // needs to be at least one pixel
            imageValidateSizeMinHeight: [1, Type.INT],
            imageValidateSizeMaxWidth: [65535, Type.INT],
            // maximum size of JPEG, fine for now I guess
            imageValidateSizeMaxHeight: [65535, Type.INT],
            // Label to show when an image is too small or image is too big
            imageValidateSizeLabelImageSizeTooSmall: [
              "Image is too small",
              Type.STRING
            ],
            imageValidateSizeLabelImageSizeTooBig: [
              "Image is too big",
              Type.STRING
            ],
            imageValidateSizeLabelExpectedMinSize: [
              "Minimum size is {minWidth} \xD7 {minHeight}",
              Type.STRING
            ],
            imageValidateSizeLabelExpectedMaxSize: [
              "Maximum size is {maxWidth} \xD7 {maxHeight}",
              Type.STRING
            ]
          }
        };
      };
      var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
      if (isBrowser) {
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: plugin })
        );
      }
      return plugin;
    });
  }
});

// node_modules/filepond-plugin-image-crop/dist/filepond-plugin-image-crop.js
var require_filepond_plugin_image_crop = __commonJS({
  "node_modules/filepond-plugin-image-crop/dist/filepond-plugin-image-crop.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginImageCrop = factory());
    })(exports, function() {
      "use strict";
      var isImage = function isImage2(file) {
        return /^image/.test(file.type);
      };
      var plugin = function plugin2(_ref) {
        var addFilter = _ref.addFilter, utils = _ref.utils;
        var Type = utils.Type, isFile = utils.isFile, getNumericAspectRatioFromString = utils.getNumericAspectRatioFromString;
        var allowCrop = function allowCrop2(item, query) {
          return !(!isImage(item.file) || !query("GET_ALLOW_IMAGE_CROP"));
        };
        var isObject = function isObject2(value) {
          return typeof value === "object";
        };
        var isNumber = function isNumber2(value) {
          return typeof value === "number";
        };
        var updateCrop = function updateCrop2(item, obj) {
          return item.setMetadata(
            "crop",
            Object.assign({}, item.getMetadata("crop"), obj)
          );
        };
        addFilter("DID_CREATE_ITEM", function(item, _ref2) {
          var query = _ref2.query;
          item.extend("setImageCrop", function(crop) {
            if (!allowCrop(item, query) || !isObject(center)) return;
            item.setMetadata("crop", crop);
            return crop;
          });
          item.extend("setImageCropCenter", function(center2) {
            if (!allowCrop(item, query) || !isObject(center2)) return;
            return updateCrop(item, { center: center2 });
          });
          item.extend("setImageCropZoom", function(zoom) {
            if (!allowCrop(item, query) || !isNumber(zoom)) return;
            return updateCrop(item, { zoom: Math.max(1, zoom) });
          });
          item.extend("setImageCropRotation", function(rotation) {
            if (!allowCrop(item, query) || !isNumber(rotation)) return;
            return updateCrop(item, { rotation });
          });
          item.extend("setImageCropFlip", function(flip) {
            if (!allowCrop(item, query) || !isObject(flip)) return;
            return updateCrop(item, { flip });
          });
          item.extend("setImageCropAspectRatio", function(newAspectRatio) {
            if (!allowCrop(item, query) || typeof newAspectRatio === "undefined")
              return;
            var currentCrop = item.getMetadata("crop");
            var aspectRatio = getNumericAspectRatioFromString(newAspectRatio);
            var newCrop = {
              center: {
                x: 0.5,
                y: 0.5
              },
              flip: currentCrop ? Object.assign({}, currentCrop.flip) : {
                horizontal: false,
                vertical: false
              },
              rotation: 0,
              zoom: 1,
              aspectRatio
            };
            item.setMetadata("crop", newCrop);
            return newCrop;
          });
        });
        addFilter("DID_LOAD_ITEM", function(item, _ref3) {
          var query = _ref3.query;
          return new Promise(function(resolve, reject) {
            var file = item.file;
            if (!isFile(file) || !isImage(file) || !query("GET_ALLOW_IMAGE_CROP")) {
              return resolve(item);
            }
            var crop = item.getMetadata("crop");
            if (crop) {
              return resolve(item);
            }
            var humanAspectRatio = query("GET_IMAGE_CROP_ASPECT_RATIO");
            item.setMetadata("crop", {
              center: {
                x: 0.5,
                y: 0.5
              },
              flip: {
                horizontal: false,
                vertical: false
              },
              rotation: 0,
              zoom: 1,
              aspectRatio: humanAspectRatio ? getNumericAspectRatioFromString(humanAspectRatio) : null
            });
            resolve(item);
          });
        });
        return {
          options: {
            // enable or disable image cropping
            allowImageCrop: [true, Type.BOOLEAN],
            // the aspect ratio of the crop ('1:1', '16:9', etc)
            imageCropAspectRatio: [null, Type.STRING]
          }
        };
      };
      var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
      if (isBrowser) {
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: plugin })
        );
      }
      return plugin;
    });
  }
});

// node_modules/filepond-plugin-image-edit/dist/filepond-plugin-image-edit.js
var require_filepond_plugin_image_edit = __commonJS({
  "node_modules/filepond-plugin-image-edit/dist/filepond-plugin-image-edit.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginImageEdit = factory());
    })(exports, function() {
      "use strict";
      var isPreviewableImage = function isPreviewableImage2(file) {
        return /^image/.test(file.type);
      };
      var plugin = function plugin2(_) {
        var addFilter = _.addFilter, utils = _.utils, views = _.views;
        var Type = utils.Type, createRoute = utils.createRoute, _utils$createItemAPI = utils.createItemAPI, createItemAPI = _utils$createItemAPI === void 0 ? function(item) {
          return item;
        } : _utils$createItemAPI;
        var fileActionButton = views.fileActionButton;
        addFilter("SHOULD_REMOVE_ON_REVERT", function(shouldRemove, _ref) {
          var item = _ref.item, query = _ref.query;
          return new Promise(function(resolve) {
            var file = item.file;
            var canEdit = query("GET_ALLOW_IMAGE_EDIT") && query("GET_IMAGE_EDIT_ALLOW_EDIT") && isPreviewableImage(file);
            resolve(!canEdit);
          });
        });
        addFilter("DID_LOAD_ITEM", function(item, _ref2) {
          var query = _ref2.query, dispatch = _ref2.dispatch;
          return new Promise(function(resolve, reject) {
            if (item.origin > 1) {
              resolve(item);
              return;
            }
            var file = item.file;
            if (!query("GET_ALLOW_IMAGE_EDIT") || !query("GET_IMAGE_EDIT_INSTANT_EDIT")) {
              resolve(item);
              return;
            }
            if (!isPreviewableImage(file)) {
              resolve(item);
              return;
            }
            var createEditorResponseHandler = function createEditorResponseHandler2(item2, resolve2, reject2) {
              return function(userDidConfirm) {
                editRequestQueue.shift();
                if (userDidConfirm) {
                  resolve2(item2);
                } else {
                  reject2(item2);
                }
                dispatch("KICK");
                requestEdit();
              };
            };
            var requestEdit = function requestEdit2() {
              if (!editRequestQueue.length) return;
              var _editRequestQueue$ = editRequestQueue[0], item2 = _editRequestQueue$.item, resolve2 = _editRequestQueue$.resolve, reject2 = _editRequestQueue$.reject;
              dispatch("EDIT_ITEM", {
                id: item2.id,
                handleEditorResponse: createEditorResponseHandler(
                  item2,
                  resolve2,
                  reject2
                )
              });
            };
            queueEditRequest({ item, resolve, reject });
            if (editRequestQueue.length === 1) {
              requestEdit();
            }
          });
        });
        addFilter("DID_CREATE_ITEM", function(item, _ref3) {
          var query = _ref3.query, dispatch = _ref3.dispatch;
          item.extend("edit", function() {
            dispatch("EDIT_ITEM", { id: item.id });
          });
        });
        var editRequestQueue = [];
        var queueEditRequest = function queueEditRequest2(editRequest) {
          editRequestQueue.push(editRequest);
          return editRequest;
        };
        addFilter("CREATE_VIEW", function(viewAPI) {
          var is = viewAPI.is, view = viewAPI.view, query = viewAPI.query;
          if (!query("GET_ALLOW_IMAGE_EDIT")) return;
          var canShowImagePreview = query("GET_ALLOW_IMAGE_PREVIEW");
          var shouldExtendView = is("file-info") && !canShowImagePreview || is("file") && canShowImagePreview;
          if (!shouldExtendView) return;
          var editor = query("GET_IMAGE_EDIT_EDITOR");
          if (!editor) return;
          if (!editor.filepondCallbackBridge) {
            editor.outputData = true;
            editor.outputFile = false;
            editor.filepondCallbackBridge = {
              onconfirm: editor.onconfirm || function() {
              },
              oncancel: editor.oncancel || function() {
              }
            };
          }
          var openEditor = function openEditor2(_ref4) {
            var root = _ref4.root, props = _ref4.props, action = _ref4.action;
            var id = props.id;
            var handleEditorResponse = action.handleEditorResponse;
            editor.cropAspectRatio = root.query("GET_IMAGE_CROP_ASPECT_RATIO") || editor.cropAspectRatio;
            editor.outputCanvasBackgroundColor = root.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR") || editor.outputCanvasBackgroundColor;
            var item = root.query("GET_ITEM", id);
            if (!item) return;
            var file = item.file;
            var crop = item.getMetadata("crop");
            var cropDefault = {
              center: {
                x: 0.5,
                y: 0.5
              },
              flip: {
                horizontal: false,
                vertical: false
              },
              zoom: 1,
              rotation: 0,
              aspectRatio: null
            };
            var resize = item.getMetadata("resize");
            var filter = item.getMetadata("filter") || null;
            var filters = item.getMetadata("filters") || null;
            var colors = item.getMetadata("colors") || null;
            var markup = item.getMetadata("markup") || null;
            var imageParameters = {
              crop: crop || cropDefault,
              size: resize ? {
                upscale: resize.upscale,
                mode: resize.mode,
                width: resize.size.width,
                height: resize.size.height
              } : null,
              filter: filters ? filters.id || filters.matrix : root.query("GET_ALLOW_IMAGE_FILTER") && root.query("GET_IMAGE_FILTER_COLOR_MATRIX") && !colors ? filter : null,
              color: colors,
              markup
            };
            editor.onconfirm = function(_ref5) {
              var data2 = _ref5.data;
              var crop2 = data2.crop, size = data2.size, filter2 = data2.filter, color = data2.color, colorMatrix = data2.colorMatrix, markup2 = data2.markup;
              var metadata = {};
              if (crop2) {
                metadata.crop = crop2;
              }
              if (size) {
                var initialSize = (item.getMetadata("resize") || {}).size;
                var targetSize = {
                  width: size.width,
                  height: size.height
                };
                if (!(targetSize.width && targetSize.height) && initialSize) {
                  targetSize.width = initialSize.width;
                  targetSize.height = initialSize.height;
                }
                if (targetSize.width || targetSize.height) {
                  metadata.resize = {
                    upscale: size.upscale,
                    mode: size.mode,
                    size: targetSize
                  };
                }
              }
              if (markup2) {
                metadata.markup = markup2;
              }
              metadata.colors = color;
              metadata.filters = filter2;
              metadata.filter = colorMatrix;
              item.setMetadata(metadata);
              editor.filepondCallbackBridge.onconfirm(data2, createItemAPI(item));
              if (!handleEditorResponse) return;
              editor.onclose = function() {
                handleEditorResponse(true);
                editor.onclose = null;
              };
            };
            editor.oncancel = function() {
              editor.filepondCallbackBridge.oncancel(createItemAPI(item));
              if (!handleEditorResponse) return;
              editor.onclose = function() {
                handleEditorResponse(false);
                editor.onclose = null;
              };
            };
            editor.open(file, imageParameters);
          };
          var didLoadItem = function didLoadItem2(_ref6) {
            var root = _ref6.root, props = _ref6.props;
            if (!query("GET_IMAGE_EDIT_ALLOW_EDIT")) return;
            var id = props.id;
            var item = query("GET_ITEM", id);
            if (!item) return;
            var file = item.file;
            if (!isPreviewableImage(file)) return;
            root.ref.handleEdit = function(e) {
              e.stopPropagation();
              root.dispatch("EDIT_ITEM", { id });
            };
            if (canShowImagePreview) {
              var buttonView = view.createChildView(fileActionButton, {
                label: "edit",
                icon: query("GET_IMAGE_EDIT_ICON_EDIT"),
                opacity: 0
              });
              buttonView.element.classList.add("filepond--action-edit-item");
              buttonView.element.dataset.align = query(
                "GET_STYLE_IMAGE_EDIT_BUTTON_EDIT_ITEM_POSITION"
              );
              buttonView.on("click", root.ref.handleEdit);
              root.ref.buttonEditItem = view.appendChildView(buttonView);
            } else {
              var filenameElement = view.element.querySelector(
                ".filepond--file-info-main"
              );
              var editButton = document.createElement("button");
              editButton.className = "filepond--action-edit-item-alt";
              editButton.innerHTML = query("GET_IMAGE_EDIT_ICON_EDIT") + "<span>edit</span>";
              editButton.addEventListener("click", root.ref.handleEdit);
              filenameElement.appendChild(editButton);
              root.ref.editButton = editButton;
            }
          };
          view.registerDestroyer(function(_ref7) {
            var root = _ref7.root;
            if (root.ref.buttonEditItem) {
              root.ref.buttonEditItem.off("click", root.ref.handleEdit);
            }
            if (root.ref.editButton) {
              root.ref.editButton.removeEventListener("click", root.ref.handleEdit);
            }
          });
          var routes = {
            EDIT_ITEM: openEditor,
            DID_LOAD_ITEM: didLoadItem
          };
          if (canShowImagePreview) {
            var didPreviewUpdate = function didPreviewUpdate2(_ref8) {
              var root = _ref8.root;
              if (!root.ref.buttonEditItem) return;
              root.ref.buttonEditItem.opacity = 1;
            };
            routes.DID_IMAGE_PREVIEW_SHOW = didPreviewUpdate;
          } else {
          }
          view.registerWriter(createRoute(routes));
        });
        return {
          options: {
            // enable or disable image editing
            allowImageEdit: [true, Type.BOOLEAN],
            // location of processing button
            styleImageEditButtonEditItemPosition: ["bottom center", Type.STRING],
            // open editor when image is dropped
            imageEditInstantEdit: [false, Type.BOOLEAN],
            // allow editing
            imageEditAllowEdit: [true, Type.BOOLEAN],
            // the icon to use for the edit button
            imageEditIconEdit: [
              '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z" fill="currentColor" fill-rule="nonzero"/></svg>',
              Type.STRING
            ],
            // editor object
            imageEditEditor: [null, Type.OBJECT]
          }
        };
      };
      var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
      if (isBrowser) {
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: plugin })
        );
      }
      return plugin;
    });
  }
});

// node_modules/filepond-plugin-image-transform/dist/filepond-plugin-image-transform.js
var require_filepond_plugin_image_transform = __commonJS({
  "node_modules/filepond-plugin-image-transform/dist/filepond-plugin-image-transform.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginImageTransform = factory());
    })(exports, function() {
      "use strict";
      var isImage = function isImage2(file) {
        return /^image/.test(file.type);
      };
      var getFilenameWithoutExtension = function getFilenameWithoutExtension2(name) {
        return name.substr(0, name.lastIndexOf(".")) || name;
      };
      var ExtensionMap = {
        jpeg: "jpg",
        "svg+xml": "svg"
      };
      var renameFileToMatchMimeType = function renameFileToMatchMimeType2(filename, mimeType) {
        var name = getFilenameWithoutExtension(filename);
        var type = mimeType.split("/")[1];
        var extension = ExtensionMap[type] || type;
        return "".concat(name, ".").concat(extension);
      };
      var getValidOutputMimeType = function getValidOutputMimeType2(type) {
        return /jpeg|png|svg\+xml/.test(type) ? type : "image/jpeg";
      };
      var isImage$1 = function isImage2(file) {
        return /^image/.test(file.type);
      };
      var MATRICES = {
        1: function _() {
          return [1, 0, 0, 1, 0, 0];
        },
        2: function _(width) {
          return [-1, 0, 0, 1, width, 0];
        },
        3: function _(width, height) {
          return [-1, 0, 0, -1, width, height];
        },
        4: function _(width, height) {
          return [1, 0, 0, -1, 0, height];
        },
        5: function _() {
          return [0, 1, 1, 0, 0, 0];
        },
        6: function _(width, height) {
          return [0, 1, -1, 0, height, 0];
        },
        7: function _(width, height) {
          return [0, -1, -1, 0, height, width];
        },
        8: function _(width) {
          return [0, -1, 1, 0, 0, width];
        }
      };
      var getImageOrientationMatrix = function getImageOrientationMatrix2(width, height, orientation) {
        if (orientation === -1) {
          orientation = 1;
        }
        return MATRICES[orientation](width, height);
      };
      var createVector = function createVector2(x, y) {
        return { x, y };
      };
      var vectorDot = function vectorDot2(a, b) {
        return a.x * b.x + a.y * b.y;
      };
      var vectorSubtract = function vectorSubtract2(a, b) {
        return createVector(a.x - b.x, a.y - b.y);
      };
      var vectorDistanceSquared = function vectorDistanceSquared2(a, b) {
        return vectorDot(vectorSubtract(a, b), vectorSubtract(a, b));
      };
      var vectorDistance = function vectorDistance2(a, b) {
        return Math.sqrt(vectorDistanceSquared(a, b));
      };
      var getOffsetPointOnEdge = function getOffsetPointOnEdge2(length, rotation) {
        var a = length;
        var A = 1.5707963267948966;
        var B = rotation;
        var C = 1.5707963267948966 - rotation;
        var sinA = Math.sin(A);
        var sinB = Math.sin(B);
        var sinC = Math.sin(C);
        var cosC = Math.cos(C);
        var ratio = a / sinA;
        var b = ratio * sinB;
        var c = ratio * sinC;
        return createVector(cosC * b, cosC * c);
      };
      var getRotatedRectSize = function getRotatedRectSize2(rect, rotation) {
        var w = rect.width;
        var h = rect.height;
        var hor = getOffsetPointOnEdge(w, rotation);
        var ver = getOffsetPointOnEdge(h, rotation);
        var tl = createVector(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));
        var tr = createVector(rect.x + rect.width + Math.abs(ver.y), rect.y + Math.abs(ver.x));
        var bl = createVector(rect.x - Math.abs(ver.y), rect.y + rect.height - Math.abs(ver.x));
        return {
          width: vectorDistance(tl, tr),
          height: vectorDistance(tl, bl)
        };
      };
      var getImageRectZoomFactor = function getImageRectZoomFactor2(imageRect, cropRect) {
        var rotation = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        var center2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : { x: 0.5, y: 0.5 };
        var cx = center2.x > 0.5 ? 1 - center2.x : center2.x;
        var cy = center2.y > 0.5 ? 1 - center2.y : center2.y;
        var imageWidth = cx * 2 * imageRect.width;
        var imageHeight = cy * 2 * imageRect.height;
        var rotatedCropSize = getRotatedRectSize(cropRect, rotation);
        return Math.max(rotatedCropSize.width / imageWidth, rotatedCropSize.height / imageHeight);
      };
      var getCenteredCropRect = function getCenteredCropRect2(container, aspectRatio) {
        var width = container.width;
        var height = width * aspectRatio;
        if (height > container.height) {
          height = container.height;
          width = height / aspectRatio;
        }
        var x = (container.width - width) * 0.5;
        var y = (container.height - height) * 0.5;
        return {
          x,
          y,
          width,
          height
        };
      };
      var calculateCanvasSize = function calculateCanvasSize2(image, canvasAspectRatio) {
        var zoom = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var imageAspectRatio = image.height / image.width;
        var canvasWidth = 1;
        var canvasHeight = canvasAspectRatio;
        var imgWidth = 1;
        var imgHeight = imageAspectRatio;
        if (imgHeight > canvasHeight) {
          imgHeight = canvasHeight;
          imgWidth = imgHeight / imageAspectRatio;
        }
        var scalar = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        var width = image.width / (zoom * scalar * imgWidth);
        var height = width * canvasAspectRatio;
        return {
          width,
          height
        };
      };
      var canvasRelease = function canvasRelease2(canvas) {
        canvas.width = 1;
        canvas.height = 1;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 1, 1);
      };
      var isFlipped = function isFlipped2(flip) {
        return flip && (flip.horizontal || flip.vertical);
      };
      var getBitmap = function getBitmap2(image, orientation, flip) {
        if (orientation <= 1 && !isFlipped(flip)) {
          image.width = image.naturalWidth;
          image.height = image.naturalHeight;
          return image;
        }
        var canvas = document.createElement("canvas");
        var width = image.naturalWidth;
        var height = image.naturalHeight;
        var swapped = orientation >= 5 && orientation <= 8;
        if (swapped) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        var ctx = canvas.getContext("2d");
        if (orientation) {
          ctx.transform.apply(ctx, getImageOrientationMatrix(width, height, orientation));
        }
        if (isFlipped(flip)) {
          var matrix = [1, 0, 0, 1, 0, 0];
          if (!swapped && flip.horizontal || swapped & flip.vertical) {
            matrix[0] = -1;
            matrix[4] = width;
          }
          if (!swapped && flip.vertical || swapped && flip.horizontal) {
            matrix[3] = -1;
            matrix[5] = height;
          }
          ctx.transform.apply(ctx, matrix);
        }
        ctx.drawImage(image, 0, 0, width, height);
        return canvas;
      };
      var imageToImageData = function imageToImageData2(imageElement, orientation) {
        var crop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        var canvasMemoryLimit = options.canvasMemoryLimit, _options$background = options.background, background = _options$background === void 0 ? null : _options$background;
        var zoom = crop.zoom || 1;
        var bitmap = getBitmap(imageElement, orientation, crop.flip);
        var imageSize = {
          width: bitmap.width,
          height: bitmap.height
        };
        var aspectRatio = crop.aspectRatio || imageSize.height / imageSize.width;
        var canvasSize = calculateCanvasSize(imageSize, aspectRatio, zoom);
        if (canvasMemoryLimit) {
          var requiredMemory = canvasSize.width * canvasSize.height;
          if (requiredMemory > canvasMemoryLimit) {
            var scalar = Math.sqrt(canvasMemoryLimit) / Math.sqrt(requiredMemory);
            imageSize.width = Math.floor(imageSize.width * scalar);
            imageSize.height = Math.floor(imageSize.height * scalar);
            canvasSize = calculateCanvasSize(imageSize, aspectRatio, zoom);
          }
        }
        var canvas = document.createElement("canvas");
        var canvasCenter = {
          x: canvasSize.width * 0.5,
          y: canvasSize.height * 0.5
        };
        var stage = {
          x: 0,
          y: 0,
          width: canvasSize.width,
          height: canvasSize.height,
          center: canvasCenter
        };
        var shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
        var scale = zoom * getImageRectZoomFactor(
          imageSize,
          getCenteredCropRect(stage, aspectRatio),
          crop.rotation,
          shouldLimit ? crop.center : { x: 0.5, y: 0.5 }
        );
        canvas.width = Math.round(canvasSize.width / scale);
        canvas.height = Math.round(canvasSize.height / scale);
        canvasCenter.x /= scale;
        canvasCenter.y /= scale;
        var imageOffset = {
          x: canvasCenter.x - imageSize.width * (crop.center ? crop.center.x : 0.5),
          y: canvasCenter.y - imageSize.height * (crop.center ? crop.center.y : 0.5)
        };
        var ctx = canvas.getContext("2d");
        if (background) {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.translate(canvasCenter.x, canvasCenter.y);
        ctx.rotate(crop.rotation || 0);
        ctx.drawImage(
          bitmap,
          imageOffset.x - canvasCenter.x,
          imageOffset.y - canvasCenter.y,
          imageSize.width,
          imageSize.height
        );
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvasRelease(canvas);
        return imageData;
      };
      var IS_BROWSER = (function() {
        return typeof window !== "undefined" && typeof window.document !== "undefined";
      })();
      if (IS_BROWSER) {
        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function value(callback, type, quality) {
              var dataURL = this.toDataURL(type, quality).split(",")[1];
              setTimeout(function() {
                var binStr = atob(dataURL);
                var len = binStr.length;
                var arr = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                  arr[i] = binStr.charCodeAt(i);
                }
                callback(new Blob([arr], { type: type || "image/png" }));
              });
            }
          });
        }
      }
      var canvasToBlob = function canvasToBlob2(canvas, options) {
        var beforeCreateBlob = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        return new Promise(function(resolve) {
          var promisedImage = beforeCreateBlob ? beforeCreateBlob(canvas) : canvas;
          Promise.resolve(promisedImage).then(function(canvas2) {
            canvas2.toBlob(resolve, options.type, options.quality);
          });
        });
      };
      var vectorMultiply = function vectorMultiply2(v, amount) {
        return createVector$1(v.x * amount, v.y * amount);
      };
      var vectorAdd = function vectorAdd2(a, b) {
        return createVector$1(a.x + b.x, a.y + b.y);
      };
      var vectorNormalize = function vectorNormalize2(v) {
        var l = Math.sqrt(v.x * v.x + v.y * v.y);
        if (l === 0) {
          return {
            x: 0,
            y: 0
          };
        }
        return createVector$1(v.x / l, v.y / l);
      };
      var vectorRotate = function vectorRotate2(v, radians, origin) {
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var t = createVector$1(v.x - origin.x, v.y - origin.y);
        return createVector$1(origin.x + cos * t.x - sin * t.y, origin.y + sin * t.x + cos * t.y);
      };
      var createVector$1 = function createVector2() {
        var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        return { x, y };
      };
      var getMarkupValue = function getMarkupValue2(value, size) {
        var scalar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var axis = arguments.length > 3 ? arguments[3] : void 0;
        if (typeof value === "string") {
          return parseFloat(value) * scalar;
        }
        if (typeof value === "number") {
          return value * (axis ? size[axis] : Math.min(size.width, size.height));
        }
        return;
      };
      var getMarkupStyles = function getMarkupStyles2(markup, size, scale) {
        var lineStyle = markup.borderStyle || markup.lineStyle || "solid";
        var fill = markup.backgroundColor || markup.fontColor || "transparent";
        var stroke = markup.borderColor || markup.lineColor || "transparent";
        var strokeWidth = getMarkupValue(markup.borderWidth || markup.lineWidth, size, scale);
        var lineCap = markup.lineCap || "round";
        var lineJoin = markup.lineJoin || "round";
        var dashes = typeof lineStyle === "string" ? "" : lineStyle.map(function(v) {
          return getMarkupValue(v, size, scale);
        }).join(",");
        var opacity = markup.opacity || 1;
        return {
          "stroke-linecap": lineCap,
          "stroke-linejoin": lineJoin,
          "stroke-width": strokeWidth || 0,
          "stroke-dasharray": dashes,
          stroke,
          fill,
          opacity
        };
      };
      var isDefined = function isDefined2(value) {
        return value != null;
      };
      var getMarkupRect = function getMarkupRect2(rect, size) {
        var scalar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var left = getMarkupValue(rect.x, size, scalar, "width") || getMarkupValue(rect.left, size, scalar, "width");
        var top = getMarkupValue(rect.y, size, scalar, "height") || getMarkupValue(rect.top, size, scalar, "height");
        var width = getMarkupValue(rect.width, size, scalar, "width");
        var height = getMarkupValue(rect.height, size, scalar, "height");
        var right = getMarkupValue(rect.right, size, scalar, "width");
        var bottom = getMarkupValue(rect.bottom, size, scalar, "height");
        if (!isDefined(top)) {
          if (isDefined(height) && isDefined(bottom)) {
            top = size.height - height - bottom;
          } else {
            top = bottom;
          }
        }
        if (!isDefined(left)) {
          if (isDefined(width) && isDefined(right)) {
            left = size.width - width - right;
          } else {
            left = right;
          }
        }
        if (!isDefined(width)) {
          if (isDefined(left) && isDefined(right)) {
            width = size.width - left - right;
          } else {
            width = 0;
          }
        }
        if (!isDefined(height)) {
          if (isDefined(top) && isDefined(bottom)) {
            height = size.height - top - bottom;
          } else {
            height = 0;
          }
        }
        return {
          x: left || 0,
          y: top || 0,
          width: width || 0,
          height: height || 0
        };
      };
      var pointsToPathShape = function pointsToPathShape2(points) {
        return points.map(function(point, index) {
          return "".concat(index === 0 ? "M" : "L", " ").concat(point.x, " ").concat(point.y);
        }).join(" ");
      };
      var setAttributes = function setAttributes2(element, attr) {
        return Object.keys(attr).forEach(function(key) {
          return element.setAttribute(key, attr[key]);
        });
      };
      var ns = "http://www.w3.org/2000/svg";
      var svg = function svg2(tag, attr) {
        var element = document.createElementNS(ns, tag);
        if (attr) {
          setAttributes(element, attr);
        }
        return element;
      };
      var updateRect = function updateRect2(element) {
        return setAttributes(element, Object.assign({}, element.rect, element.styles));
      };
      var updateEllipse = function updateEllipse2(element) {
        var cx = element.rect.x + element.rect.width * 0.5;
        var cy = element.rect.y + element.rect.height * 0.5;
        var rx = element.rect.width * 0.5;
        var ry = element.rect.height * 0.5;
        return setAttributes(
          element,
          Object.assign(
            {
              cx,
              cy,
              rx,
              ry
            },
            element.styles
          )
        );
      };
      var IMAGE_FIT_STYLE = {
        contain: "xMidYMid meet",
        cover: "xMidYMid slice"
      };
      var updateImage = function updateImage2(element, markup) {
        setAttributes(
          element,
          Object.assign({}, element.rect, element.styles, {
            preserveAspectRatio: IMAGE_FIT_STYLE[markup.fit] || "none"
          })
        );
      };
      var TEXT_ANCHOR = {
        left: "start",
        center: "middle",
        right: "end"
      };
      var updateText = function updateText2(element, markup, size, scale) {
        var fontSize = getMarkupValue(markup.fontSize, size, scale);
        var fontFamily = markup.fontFamily || "sans-serif";
        var fontWeight = markup.fontWeight || "normal";
        var textAlign = TEXT_ANCHOR[markup.textAlign] || "start";
        setAttributes(
          element,
          Object.assign({}, element.rect, element.styles, {
            "stroke-width": 0,
            "font-weight": fontWeight,
            "font-size": fontSize,
            "font-family": fontFamily,
            "text-anchor": textAlign
          })
        );
        if (element.text !== markup.text) {
          element.text = markup.text;
          element.textContent = markup.text.length ? markup.text : " ";
        }
      };
      var updateLine = function updateLine2(element, markup, size, scale) {
        setAttributes(
          element,
          Object.assign({}, element.rect, element.styles, {
            fill: "none"
          })
        );
        var line = element.childNodes[0];
        var begin = element.childNodes[1];
        var end = element.childNodes[2];
        var origin = element.rect;
        var target = {
          x: element.rect.x + element.rect.width,
          y: element.rect.y + element.rect.height
        };
        setAttributes(line, {
          x1: origin.x,
          y1: origin.y,
          x2: target.x,
          y2: target.y
        });
        if (!markup.lineDecoration) return;
        begin.style.display = "none";
        end.style.display = "none";
        var v = vectorNormalize({
          x: target.x - origin.x,
          y: target.y - origin.y
        });
        var l = getMarkupValue(0.05, size, scale);
        if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
          var arrowBeginRotationPoint = vectorMultiply(v, l);
          var arrowBeginCenter = vectorAdd(origin, arrowBeginRotationPoint);
          var arrowBeginA = vectorRotate(origin, 2, arrowBeginCenter);
          var arrowBeginB = vectorRotate(origin, -2, arrowBeginCenter);
          setAttributes(begin, {
            style: "display:block;",
            d: "M".concat(arrowBeginA.x, ",").concat(arrowBeginA.y, " L").concat(origin.x, ",").concat(origin.y, " L").concat(arrowBeginB.x, ",").concat(arrowBeginB.y)
          });
        }
        if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
          var arrowEndRotationPoint = vectorMultiply(v, -l);
          var arrowEndCenter = vectorAdd(target, arrowEndRotationPoint);
          var arrowEndA = vectorRotate(target, 2, arrowEndCenter);
          var arrowEndB = vectorRotate(target, -2, arrowEndCenter);
          setAttributes(end, {
            style: "display:block;",
            d: "M".concat(arrowEndA.x, ",").concat(arrowEndA.y, " L").concat(target.x, ",").concat(target.y, " L").concat(arrowEndB.x, ",").concat(arrowEndB.y)
          });
        }
      };
      var updatePath = function updatePath2(element, markup, size, scale) {
        setAttributes(
          element,
          Object.assign({}, element.styles, {
            fill: "none",
            d: pointsToPathShape(
              markup.points.map(function(point) {
                return {
                  x: getMarkupValue(point.x, size, scale, "width"),
                  y: getMarkupValue(point.y, size, scale, "height")
                };
              })
            )
          })
        );
      };
      var createShape = function createShape2(node) {
        return function(markup) {
          return svg(node, { id: markup.id });
        };
      };
      var createImage = function createImage2(markup) {
        var shape = svg("image", {
          id: markup.id,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: "0"
        });
        shape.onload = function() {
          shape.setAttribute("opacity", markup.opacity || 1);
        };
        shape.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", markup.src);
        return shape;
      };
      var createLine = function createLine2(markup) {
        var shape = svg("g", {
          id: markup.id,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        });
        var line = svg("line");
        shape.appendChild(line);
        var begin = svg("path");
        shape.appendChild(begin);
        var end = svg("path");
        shape.appendChild(end);
        return shape;
      };
      var CREATE_TYPE_ROUTES = {
        image: createImage,
        rect: createShape("rect"),
        ellipse: createShape("ellipse"),
        text: createShape("text"),
        path: createShape("path"),
        line: createLine
      };
      var UPDATE_TYPE_ROUTES = {
        rect: updateRect,
        ellipse: updateEllipse,
        image: updateImage,
        text: updateText,
        path: updatePath,
        line: updateLine
      };
      var createMarkupByType = function createMarkupByType2(type, markup) {
        return CREATE_TYPE_ROUTES[type](markup);
      };
      var updateMarkupByType = function updateMarkupByType2(element, type, markup, size, scale) {
        if (type !== "path") {
          element.rect = getMarkupRect(markup, size, scale);
        }
        element.styles = getMarkupStyles(markup, size, scale);
        UPDATE_TYPE_ROUTES[type](element, markup, size, scale);
      };
      var sortMarkupByZIndex = function sortMarkupByZIndex2(a, b) {
        if (a[1].zIndex > b[1].zIndex) {
          return 1;
        }
        if (a[1].zIndex < b[1].zIndex) {
          return -1;
        }
        return 0;
      };
      var cropSVG = function cropSVG2(blob) {
        var crop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var markup = arguments.length > 2 ? arguments[2] : void 0;
        var options = arguments.length > 3 ? arguments[3] : void 0;
        return new Promise(function(resolve) {
          var _options$background = options.background, background = _options$background === void 0 ? null : _options$background;
          var fr = new FileReader();
          fr.onloadend = function() {
            var text = fr.result;
            var original = document.createElement("div");
            original.style.cssText = "position:absolute;pointer-events:none;width:0;height:0;visibility:hidden;";
            original.innerHTML = text;
            var originalNode = original.querySelector("svg");
            document.body.appendChild(original);
            var bBox = originalNode.getBBox();
            original.parentNode.removeChild(original);
            var titleNode = original.querySelector("title");
            var viewBoxAttribute = originalNode.getAttribute("viewBox") || "";
            var widthAttribute = originalNode.getAttribute("width") || "";
            var heightAttribute = originalNode.getAttribute("height") || "";
            var width = parseFloat(widthAttribute) || null;
            var height = parseFloat(heightAttribute) || null;
            var widthUnits = (widthAttribute.match(/[a-z]+/) || [])[0] || "";
            var heightUnits = (heightAttribute.match(/[a-z]+/) || [])[0] || "";
            var viewBoxList = viewBoxAttribute.split(" ").map(parseFloat);
            var viewBox = viewBoxList.length ? {
              x: viewBoxList[0],
              y: viewBoxList[1],
              width: viewBoxList[2],
              height: viewBoxList[3]
            } : bBox;
            var imageWidth = width != null ? width : viewBox.width;
            var imageHeight = height != null ? height : viewBox.height;
            originalNode.style.overflow = "visible";
            originalNode.setAttribute("width", imageWidth);
            originalNode.setAttribute("height", imageHeight);
            var markupSVG = "";
            if (markup && markup.length) {
              var size = {
                width: imageWidth,
                height: imageHeight
              };
              markupSVG = markup.sort(sortMarkupByZIndex).reduce(function(prev, shape) {
                var el = createMarkupByType(shape[0], shape[1]);
                updateMarkupByType(el, shape[0], shape[1], size);
                el.removeAttribute("id");
                if (el.getAttribute("opacity") === 1) {
                  el.removeAttribute("opacity");
                }
                return prev + "\n" + el.outerHTML + "\n";
              }, "");
              markupSVG = "\n\n<g>".concat(markupSVG.replace(/&nbsp;/g, " "), "</g>\n\n");
            }
            var aspectRatio = crop.aspectRatio || imageHeight / imageWidth;
            var canvasWidth = imageWidth;
            var canvasHeight = canvasWidth * aspectRatio;
            var shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
            var cropCenterX = crop.center ? crop.center.x : 0.5;
            var cropCenterY = crop.center ? crop.center.y : 0.5;
            var canvasZoomFactor = getImageRectZoomFactor(
              {
                width: imageWidth,
                height: imageHeight
              },
              getCenteredCropRect(
                {
                  width: canvasWidth,
                  height: canvasHeight
                },
                aspectRatio
              ),
              crop.rotation,
              shouldLimit ? { x: cropCenterX, y: cropCenterY } : {
                x: 0.5,
                y: 0.5
              }
            );
            var scale = crop.zoom * canvasZoomFactor;
            var rotation = crop.rotation * (180 / Math.PI);
            var canvasCenter = {
              x: canvasWidth * 0.5,
              y: canvasHeight * 0.5
            };
            var imageOffset = {
              x: canvasCenter.x - imageWidth * cropCenterX,
              y: canvasCenter.y - imageHeight * cropCenterY
            };
            var cropTransforms = [
              // rotate
              "rotate(".concat(rotation, " ").concat(canvasCenter.x, " ").concat(canvasCenter.y, ")"),
              // scale
              "translate(".concat(canvasCenter.x, " ").concat(canvasCenter.y, ")"),
              "scale(".concat(scale, ")"),
              "translate(".concat(-canvasCenter.x, " ").concat(-canvasCenter.y, ")"),
              // offset
              "translate(".concat(imageOffset.x, " ").concat(imageOffset.y, ")")
            ];
            var cropFlipHorizontal = crop.flip && crop.flip.horizontal;
            var cropFlipVertical = crop.flip && crop.flip.vertical;
            var flipTransforms = [
              "scale(".concat(cropFlipHorizontal ? -1 : 1, " ").concat(cropFlipVertical ? -1 : 1, ")"),
              "translate(".concat(cropFlipHorizontal ? -imageWidth : 0, " ").concat(cropFlipVertical ? -imageHeight : 0, ")")
            ];
            var transformed = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="'.concat(canvasWidth).concat(widthUnits, '" height="').concat(canvasHeight).concat(heightUnits, '" \nviewBox="0 0 ').concat(canvasWidth, " ").concat(canvasHeight, '" ').concat(
              background ? 'style="background:' + background + '" ' : "",
              '\npreserveAspectRatio="xMinYMin"\nxmlns:xlink="http://www.w3.org/1999/xlink"\nxmlns="http://www.w3.org/2000/svg">\n<!-- Generated by PQINA - https://pqina.nl/ -->\n<title>'
            ).concat(titleNode ? titleNode.textContent : "", '</title>\n<g transform="').concat(cropTransforms.join(" "), '">\n<g transform="').concat(flipTransforms.join(" "), '">\n').concat(originalNode.outerHTML).concat(markupSVG, "\n</g>\n</g>\n</svg>");
            resolve(transformed);
          };
          fr.readAsText(blob);
        });
      };
      var objectToImageData = function objectToImageData2(obj) {
        var imageData;
        try {
          imageData = new ImageData(obj.width, obj.height);
        } catch (e) {
          var canvas = document.createElement("canvas");
          imageData = canvas.getContext("2d").createImageData(obj.width, obj.height);
        }
        imageData.data.set(obj.data);
        return imageData;
      };
      var TransformWorker = function TransformWorker2() {
        var TRANSFORMS = { resize, filter };
        var applyTransforms = function applyTransforms2(transforms, imageData) {
          transforms.forEach(function(transform2) {
            imageData = TRANSFORMS[transform2.type](imageData, transform2.data);
          });
          return imageData;
        };
        var transform = function transform2(data2, cb) {
          var transforms = data2.transforms;
          var filterTransform = null;
          transforms.forEach(function(transform3) {
            if (transform3.type === "filter") {
              filterTransform = transform3;
            }
          });
          if (filterTransform) {
            var resizeTransform = null;
            transforms.forEach(function(transform3) {
              if (transform3.type === "resize") {
                resizeTransform = transform3;
              }
            });
            if (resizeTransform) {
              resizeTransform.data.matrix = filterTransform.data;
              transforms = transforms.filter(function(transform3) {
                return transform3.type !== "filter";
              });
            }
          }
          cb(applyTransforms(transforms, data2.imageData));
        };
        self.onmessage = function(e) {
          transform(e.data.message, function(response) {
            self.postMessage({ id: e.data.id, message: response }, [response.data.buffer]);
          });
        };
        var br = 1;
        var bg = 1;
        var bb = 1;
        function applyFilterMatrix(index, data2, m) {
          var ir = data2[index] / 255;
          var ig = data2[index + 1] / 255;
          var ib = data2[index + 2] / 255;
          var ia = data2[index + 3] / 255;
          var mr = ir * m[0] + ig * m[1] + ib * m[2] + ia * m[3] + m[4];
          var mg = ir * m[5] + ig * m[6] + ib * m[7] + ia * m[8] + m[9];
          var mb = ir * m[10] + ig * m[11] + ib * m[12] + ia * m[13] + m[14];
          var ma = ir * m[15] + ig * m[16] + ib * m[17] + ia * m[18] + m[19];
          var or = Math.max(0, mr * ma) + br * (1 - ma);
          var og = Math.max(0, mg * ma) + bg * (1 - ma);
          var ob = Math.max(0, mb * ma) + bb * (1 - ma);
          data2[index] = Math.max(0, Math.min(1, or)) * 255;
          data2[index + 1] = Math.max(0, Math.min(1, og)) * 255;
          data2[index + 2] = Math.max(0, Math.min(1, ob)) * 255;
        }
        var identityMatrix = self.JSON.stringify([
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ]);
        function isIdentityMatrix(filter2) {
          return self.JSON.stringify(filter2 || []) === identityMatrix;
        }
        function filter(imageData, matrix) {
          if (!matrix || isIdentityMatrix(matrix)) return imageData;
          var data2 = imageData.data;
          var l = data2.length;
          var m11 = matrix[0];
          var m12 = matrix[1];
          var m13 = matrix[2];
          var m14 = matrix[3];
          var m15 = matrix[4];
          var m21 = matrix[5];
          var m22 = matrix[6];
          var m23 = matrix[7];
          var m24 = matrix[8];
          var m25 = matrix[9];
          var m31 = matrix[10];
          var m32 = matrix[11];
          var m33 = matrix[12];
          var m34 = matrix[13];
          var m35 = matrix[14];
          var m41 = matrix[15];
          var m42 = matrix[16];
          var m43 = matrix[17];
          var m44 = matrix[18];
          var m45 = matrix[19];
          var index = 0, r = 0, g = 0, b = 0, a = 0, mr = 0, mg = 0, mb = 0, ma = 0, or = 0, og = 0, ob = 0;
          for (; index < l; index += 4) {
            r = data2[index] / 255;
            g = data2[index + 1] / 255;
            b = data2[index + 2] / 255;
            a = data2[index + 3] / 255;
            mr = r * m11 + g * m12 + b * m13 + a * m14 + m15;
            mg = r * m21 + g * m22 + b * m23 + a * m24 + m25;
            mb = r * m31 + g * m32 + b * m33 + a * m34 + m35;
            ma = r * m41 + g * m42 + b * m43 + a * m44 + m45;
            or = Math.max(0, mr * ma) + br * (1 - ma);
            og = Math.max(0, mg * ma) + bg * (1 - ma);
            ob = Math.max(0, mb * ma) + bb * (1 - ma);
            data2[index] = Math.max(0, Math.min(1, or)) * 255;
            data2[index + 1] = Math.max(0, Math.min(1, og)) * 255;
            data2[index + 2] = Math.max(0, Math.min(1, ob)) * 255;
          }
          return imageData;
        }
        function resize(imageData, data2) {
          var _data$mode = data2.mode, mode = _data$mode === void 0 ? "contain" : _data$mode, _data$upscale = data2.upscale, upscale = _data$upscale === void 0 ? false : _data$upscale, width = data2.width, height = data2.height, matrix = data2.matrix;
          matrix = !matrix || isIdentityMatrix(matrix) ? null : matrix;
          if (!width && !height) {
            return filter(imageData, matrix);
          }
          if (width === null) {
            width = height;
          } else if (height === null) {
            height = width;
          }
          if (mode !== "force") {
            var scalarWidth = width / imageData.width;
            var scalarHeight = height / imageData.height;
            var scalar = 1;
            if (mode === "cover") {
              scalar = Math.max(scalarWidth, scalarHeight);
            } else if (mode === "contain") {
              scalar = Math.min(scalarWidth, scalarHeight);
            }
            if (scalar > 1 && upscale === false) {
              return filter(imageData, matrix);
            }
            width = imageData.width * scalar;
            height = imageData.height * scalar;
          }
          var originWidth = imageData.width;
          var originHeight = imageData.height;
          var targetWidth = Math.round(width);
          var targetHeight = Math.round(height);
          var inputData = imageData.data;
          var outputData = new Uint8ClampedArray(targetWidth * targetHeight * 4);
          var ratioWidth = originWidth / targetWidth;
          var ratioHeight = originHeight / targetHeight;
          var ratioWidthHalf = Math.ceil(ratioWidth * 0.5);
          var ratioHeightHalf = Math.ceil(ratioHeight * 0.5);
          for (var j = 0; j < targetHeight; j++) {
            for (var i = 0; i < targetWidth; i++) {
              var x2 = (i + j * targetWidth) * 4;
              var weight = 0;
              var weights = 0;
              var weightsAlpha = 0;
              var r = 0;
              var g = 0;
              var b = 0;
              var a = 0;
              var centerY = (j + 0.5) * ratioHeight;
              for (var yy = Math.floor(j * ratioHeight); yy < (j + 1) * ratioHeight; yy++) {
                var dy = Math.abs(centerY - (yy + 0.5)) / ratioHeightHalf;
                var centerX = (i + 0.5) * ratioWidth;
                var w0 = dy * dy;
                for (var xx = Math.floor(i * ratioWidth); xx < (i + 1) * ratioWidth; xx++) {
                  var dx = Math.abs(centerX - (xx + 0.5)) / ratioWidthHalf;
                  var w = Math.sqrt(w0 + dx * dx);
                  if (w >= -1 && w <= 1) {
                    weight = 2 * w * w * w - 3 * w * w + 1;
                    if (weight > 0) {
                      dx = 4 * (xx + yy * originWidth);
                      var ref = inputData[dx + 3];
                      a += weight * ref;
                      weightsAlpha += weight;
                      if (ref < 255) {
                        weight = weight * ref / 250;
                      }
                      r += weight * inputData[dx];
                      g += weight * inputData[dx + 1];
                      b += weight * inputData[dx + 2];
                      weights += weight;
                    }
                  }
                }
              }
              outputData[x2] = r / weights;
              outputData[x2 + 1] = g / weights;
              outputData[x2 + 2] = b / weights;
              outputData[x2 + 3] = a / weightsAlpha;
              matrix && applyFilterMatrix(x2, outputData, matrix);
            }
          }
          return {
            data: outputData,
            width: targetWidth,
            height: targetHeight
          };
        }
      };
      var correctOrientation = function correctOrientation2(view, offset) {
        if (view.getUint32(offset + 4, false) !== 1165519206) return;
        offset += 4;
        var intelByteAligned = view.getUint16(offset += 6, false) === 18761;
        offset += view.getUint32(offset + 4, intelByteAligned);
        var tags = view.getUint16(offset, intelByteAligned);
        offset += 2;
        for (var i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, intelByteAligned) === 274) {
            view.setUint16(offset + i * 12 + 8, 1, intelByteAligned);
            return true;
          }
        }
        return false;
      };
      var readData = function readData2(data2) {
        var view = new DataView(data2);
        if (view.getUint16(0) !== 65496) return null;
        var offset = 2;
        var marker;
        var markerLength;
        var orientationCorrected = false;
        while (offset < view.byteLength) {
          marker = view.getUint16(offset, false);
          markerLength = view.getUint16(offset + 2, false) + 2;
          var isData = marker >= 65504 && marker <= 65519 || marker === 65534;
          if (!isData) {
            break;
          }
          if (!orientationCorrected) {
            orientationCorrected = correctOrientation(view, offset, markerLength);
          }
          if (offset + markerLength > view.byteLength) {
            break;
          }
          offset += markerLength;
        }
        return data2.slice(0, offset);
      };
      var getImageHead = function getImageHead2(file) {
        return new Promise(function(resolve) {
          var reader = new FileReader();
          reader.onload = function() {
            return resolve(readData(reader.result) || null);
          };
          reader.readAsArrayBuffer(file.slice(0, 256 * 1024));
        });
      };
      var getBlobBuilder = function getBlobBuilder2() {
        return window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      };
      var createBlob = function createBlob2(arrayBuffer, mimeType) {
        var BB = getBlobBuilder();
        if (BB) {
          var bb = new BB();
          bb.append(arrayBuffer);
          return bb.getBlob(mimeType);
        }
        return new Blob([arrayBuffer], {
          type: mimeType
        });
      };
      var getUniqueId = function getUniqueId2() {
        return Math.random().toString(36).substr(2, 9);
      };
      var createWorker = function createWorker2(fn) {
        var workerBlob = new Blob(["(", fn.toString(), ")()"], { type: "application/javascript" });
        var workerURL = URL.createObjectURL(workerBlob);
        var worker = new Worker(workerURL);
        var trips = [];
        return {
          transfer: function transfer() {
          },
          // (message, cb) => {}
          post: function post(message, cb, transferList) {
            var id2 = getUniqueId();
            trips[id2] = cb;
            worker.onmessage = function(e) {
              var cb2 = trips[e.data.id];
              if (!cb2) return;
              cb2(e.data.message);
              delete trips[e.data.id];
            };
            worker.postMessage(
              {
                id: id2,
                message
              },
              transferList
            );
          },
          terminate: function terminate() {
            worker.terminate();
            URL.revokeObjectURL(workerURL);
          }
        };
      };
      var loadImage = function loadImage2(url) {
        return new Promise(function(resolve, reject) {
          var img = new Image();
          img.onload = function() {
            resolve(img);
          };
          img.onerror = function(e) {
            reject(e);
          };
          img.src = url;
        });
      };
      var chain = function chain2(funcs) {
        return funcs.reduce(function(promise, func) {
          return promise.then(function(result) {
            return func().then(Array.prototype.concat.bind(result));
          });
        }, Promise.resolve([]));
      };
      var canvasApplyMarkup = function canvasApplyMarkup2(canvas, markup) {
        return new Promise(function(resolve) {
          var size = {
            width: canvas.width,
            height: canvas.height
          };
          var ctx = canvas.getContext("2d");
          var drawers = markup.sort(sortMarkupByZIndex).map(function(item) {
            return function() {
              return new Promise(function(resolve2) {
                var result = TYPE_DRAW_ROUTES[item[0]](ctx, size, item[1], resolve2);
                if (result) resolve2();
              });
            };
          });
          chain(drawers).then(function() {
            return resolve(canvas);
          });
        });
      };
      var applyMarkupStyles = function applyMarkupStyles2(ctx, styles) {
        ctx.beginPath();
        ctx.lineCap = styles["stroke-linecap"];
        ctx.lineJoin = styles["stroke-linejoin"];
        ctx.lineWidth = styles["stroke-width"];
        if (styles["stroke-dasharray"].length) {
          ctx.setLineDash(styles["stroke-dasharray"].split(","));
        }
        ctx.fillStyle = styles["fill"];
        ctx.strokeStyle = styles["stroke"];
        ctx.globalAlpha = styles.opacity || 1;
      };
      var drawMarkupStyles = function drawMarkupStyles2(ctx) {
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
      };
      var drawRect = function drawRect2(ctx, size, markup) {
        var rect = getMarkupRect(markup, size);
        var styles = getMarkupStyles(markup, size);
        applyMarkupStyles(ctx, styles);
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        drawMarkupStyles(ctx, styles);
        return true;
      };
      var drawEllipse = function drawEllipse2(ctx, size, markup) {
        var rect = getMarkupRect(markup, size);
        var styles = getMarkupStyles(markup, size);
        applyMarkupStyles(ctx, styles);
        var x = rect.x, y = rect.y, w = rect.width, h = rect.height, kappa = 0.5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        drawMarkupStyles(ctx, styles);
        return true;
      };
      var drawImage = function drawImage2(ctx, size, markup, done) {
        var rect = getMarkupRect(markup, size);
        var styles = getMarkupStyles(markup, size);
        applyMarkupStyles(ctx, styles);
        var image = new Image();
        var isCrossOriginImage = new URL(markup.src, window.location.href).origin !== window.location.origin;
        if (isCrossOriginImage) image.crossOrigin = "";
        image.onload = function() {
          if (markup.fit === "cover") {
            var ar = rect.width / rect.height;
            var width = ar > 1 ? image.width : image.height * ar;
            var height = ar > 1 ? image.width / ar : image.height;
            var x = image.width * 0.5 - width * 0.5;
            var y = image.height * 0.5 - height * 0.5;
            ctx.drawImage(image, x, y, width, height, rect.x, rect.y, rect.width, rect.height);
          } else if (markup.fit === "contain") {
            var scalar = Math.min(rect.width / image.width, rect.height / image.height);
            var _width = scalar * image.width;
            var _height = scalar * image.height;
            var _x = rect.x + rect.width * 0.5 - _width * 0.5;
            var _y = rect.y + rect.height * 0.5 - _height * 0.5;
            ctx.drawImage(image, 0, 0, image.width, image.height, _x, _y, _width, _height);
          } else {
            ctx.drawImage(
              image,
              0,
              0,
              image.width,
              image.height,
              rect.x,
              rect.y,
              rect.width,
              rect.height
            );
          }
          drawMarkupStyles(ctx, styles);
          done();
        };
        image.src = markup.src;
      };
      var drawText = function drawText2(ctx, size, markup) {
        var rect = getMarkupRect(markup, size);
        var styles = getMarkupStyles(markup, size);
        applyMarkupStyles(ctx, styles);
        var fontSize = getMarkupValue(markup.fontSize, size);
        var fontFamily = markup.fontFamily || "sans-serif";
        var fontWeight = markup.fontWeight || "normal";
        var textAlign = markup.textAlign || "left";
        ctx.font = "".concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
        ctx.textAlign = textAlign;
        ctx.fillText(markup.text, rect.x, rect.y);
        drawMarkupStyles(ctx, styles);
        return true;
      };
      var drawPath = function drawPath2(ctx, size, markup) {
        var styles = getMarkupStyles(markup, size);
        applyMarkupStyles(ctx, styles);
        ctx.beginPath();
        var points = markup.points.map(function(point) {
          return {
            x: getMarkupValue(point.x, size, 1, "width"),
            y: getMarkupValue(point.y, size, 1, "height")
          };
        });
        ctx.moveTo(points[0].x, points[0].y);
        var l = points.length;
        for (var i = 1; i < l; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        drawMarkupStyles(ctx, styles);
        return true;
      };
      var drawLine = function drawLine2(ctx, size, markup) {
        var rect = getMarkupRect(markup, size);
        var styles = getMarkupStyles(markup, size);
        applyMarkupStyles(ctx, styles);
        ctx.beginPath();
        var origin = {
          x: rect.x,
          y: rect.y
        };
        var target = {
          x: rect.x + rect.width,
          y: rect.y + rect.height
        };
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(target.x, target.y);
        var v = vectorNormalize({
          x: target.x - origin.x,
          y: target.y - origin.y
        });
        var l = 0.04 * Math.min(size.width, size.height);
        if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
          var arrowBeginRotationPoint = vectorMultiply(v, l);
          var arrowBeginCenter = vectorAdd(origin, arrowBeginRotationPoint);
          var arrowBeginA = vectorRotate(origin, 2, arrowBeginCenter);
          var arrowBeginB = vectorRotate(origin, -2, arrowBeginCenter);
          ctx.moveTo(arrowBeginA.x, arrowBeginA.y);
          ctx.lineTo(origin.x, origin.y);
          ctx.lineTo(arrowBeginB.x, arrowBeginB.y);
        }
        if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
          var arrowEndRotationPoint = vectorMultiply(v, -l);
          var arrowEndCenter = vectorAdd(target, arrowEndRotationPoint);
          var arrowEndA = vectorRotate(target, 2, arrowEndCenter);
          var arrowEndB = vectorRotate(target, -2, arrowEndCenter);
          ctx.moveTo(arrowEndA.x, arrowEndA.y);
          ctx.lineTo(target.x, target.y);
          ctx.lineTo(arrowEndB.x, arrowEndB.y);
        }
        drawMarkupStyles(ctx, styles);
        return true;
      };
      var TYPE_DRAW_ROUTES = {
        rect: drawRect,
        ellipse: drawEllipse,
        image: drawImage,
        text: drawText,
        line: drawLine,
        path: drawPath
      };
      var imageDataToCanvas = function imageDataToCanvas2(imageData) {
        var image = document.createElement("canvas");
        image.width = imageData.width;
        image.height = imageData.height;
        var ctx = image.getContext("2d");
        ctx.putImageData(imageData, 0, 0);
        return image;
      };
      var transformImage = function transformImage2(file, instructions) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return new Promise(function(resolve, reject) {
          if (!file || !isImage$1(file))
            return reject({ status: "not an image file", file });
          var stripImageHead = options.stripImageHead, beforeCreateBlob = options.beforeCreateBlob, afterCreateBlob = options.afterCreateBlob, canvasMemoryLimit = options.canvasMemoryLimit;
          var crop = instructions.crop, size = instructions.size, filter = instructions.filter, markup = instructions.markup, output = instructions.output;
          var orientation = instructions.image && instructions.image.orientation ? Math.max(1, Math.min(8, instructions.image.orientation)) : null;
          var qualityAsPercentage = output && output.quality;
          var quality = qualityAsPercentage === null ? null : qualityAsPercentage / 100;
          var type = output && output.type || null;
          var background = output && output.background || null;
          var transforms = [];
          if (size && (typeof size.width === "number" || typeof size.height === "number")) {
            transforms.push({ type: "resize", data: size });
          }
          if (filter && filter.length === 20) {
            transforms.push({ type: "filter", data: filter });
          }
          var resolveWithBlob = function resolveWithBlob2(blob) {
            var promisedBlob = afterCreateBlob ? afterCreateBlob(blob) : blob;
            Promise.resolve(promisedBlob).then(resolve);
          };
          var toBlob = function toBlob2(imageData, options2) {
            var canvas = imageDataToCanvas(imageData);
            var promisedCanvas = markup.length ? canvasApplyMarkup(canvas, markup) : canvas;
            Promise.resolve(promisedCanvas).then(function(canvas2) {
              canvasToBlob(canvas2, options2, beforeCreateBlob).then(function(blob) {
                canvasRelease(canvas2);
                if (stripImageHead) return resolveWithBlob(blob);
                getImageHead(file).then(function(imageHead) {
                  if (imageHead !== null) {
                    blob = new Blob([imageHead, blob.slice(20)], {
                      type: blob.type
                    });
                  }
                  resolveWithBlob(blob);
                });
              }).catch(reject);
            });
          };
          if (/svg/.test(file.type) && type === null) {
            return cropSVG(file, crop, markup, { background }).then(function(text) {
              resolve(createBlob(text, "image/svg+xml"));
            });
          }
          var url = URL.createObjectURL(file);
          loadImage(url).then(function(image) {
            URL.revokeObjectURL(url);
            var imageData = imageToImageData(image, orientation, crop, {
              canvasMemoryLimit,
              background
            });
            var outputFormat = {
              quality,
              type: type || file.type
            };
            if (!transforms.length) {
              return toBlob(imageData, outputFormat);
            }
            var worker = createWorker(TransformWorker);
            worker.post(
              {
                transforms,
                imageData
              },
              function(response) {
                toBlob(objectToImageData(response), outputFormat);
                worker.terminate();
              },
              [imageData.data.buffer]
            );
          }).catch(reject);
        });
      };
      function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var REACT_ELEMENT_TYPE;
      function _jsx(type, props, key, children) {
        if (!REACT_ELEMENT_TYPE) {
          REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
        }
        var defaultProps = type && type.defaultProps;
        var childrenLength = arguments.length - 3;
        if (!props && childrenLength !== 0) {
          props = {
            children: void 0
          };
        }
        if (props && defaultProps) {
          for (var propName in defaultProps) {
            if (props[propName] === void 0) {
              props[propName] = defaultProps[propName];
            }
          }
        } else if (!props) {
          props = defaultProps || {};
        }
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = new Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 3];
          }
          props.children = childArray;
        }
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key: key === void 0 ? null : "" + key,
          ref: null,
          props,
          _owner: null
        };
      }
      function _asyncIterator(iterable) {
        var method;
        if (typeof Symbol === "function") {
          if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
          }
          if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
          }
        }
        throw new TypeError("Object is not async iterable");
      }
      function _AwaitValue(value) {
        this.wrapped = value;
      }
      function _AsyncGenerator(gen) {
        var front, back;
        function send(key, arg) {
          return new Promise(function(resolve, reject) {
            var request = {
              key,
              arg,
              resolve,
              reject,
              next: null
            };
            if (back) {
              back = back.next = request;
            } else {
              front = back = request;
              resume(key, arg);
            }
          });
        }
        function resume(key, arg) {
          try {
            var result = gen[key](arg);
            var value = result.value;
            var wrappedAwait = value instanceof _AwaitValue;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(
              function(arg2) {
                if (wrappedAwait) {
                  resume("next", arg2);
                  return;
                }
                settle(result.done ? "return" : "normal", arg2);
              },
              function(err) {
                resume("throw", err);
              }
            );
          } catch (err) {
            settle("throw", err);
          }
        }
        function settle(type, value) {
          switch (type) {
            case "return":
              front.resolve({
                value,
                done: true
              });
              break;
            case "throw":
              front.reject(value);
              break;
            default:
              front.resolve({
                value,
                done: false
              });
              break;
          }
          front = front.next;
          if (front) {
            resume(front.key, front.arg);
          } else {
            back = null;
          }
        }
        this._invoke = send;
        if (typeof gen.return !== "function") {
          this.return = void 0;
        }
      }
      if (typeof Symbol === "function" && Symbol.asyncIterator) {
        _AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
          return this;
        };
      }
      _AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
      };
      _AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
      };
      _AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
      };
      function _wrapAsyncGenerator(fn) {
        return function() {
          return new _AsyncGenerator(fn.apply(this, arguments));
        };
      }
      function _awaitAsyncGenerator(value) {
        return new _AwaitValue(value);
      }
      function _asyncGeneratorDelegate(inner, awaitWrap) {
        var iter = {}, waiting = false;
        function pump(key, value) {
          waiting = true;
          value = new Promise(function(resolve) {
            resolve(inner[key](value));
          });
          return {
            done: false,
            value: awaitWrap(value)
          };
        }
        if (typeof Symbol === "function" && Symbol.iterator) {
          iter[Symbol.iterator] = function() {
            return this;
          };
        }
        iter.next = function(value) {
          if (waiting) {
            waiting = false;
            return value;
          }
          return pump("next", value);
        };
        if (typeof inner.throw === "function") {
          iter.throw = function(value) {
            if (waiting) {
              waiting = false;
              throw value;
            }
            return pump("throw", value);
          };
        }
        if (typeof inner.return === "function") {
          iter.return = function(value) {
            return pump("return", value);
          };
        }
        return iter;
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
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _defineEnumerableProperties(obj, descs) {
        for (var key in descs) {
          var desc = descs[key];
          desc.configurable = desc.enumerable = true;
          if ("value" in desc) desc.writable = true;
          Object.defineProperty(obj, key, desc);
        }
        if (Object.getOwnPropertySymbols) {
          var objectSymbols = Object.getOwnPropertySymbols(descs);
          for (var i = 0; i < objectSymbols.length; i++) {
            var sym = objectSymbols[i];
            var desc = descs[sym];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, sym, desc);
          }
        }
        return obj;
      }
      function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = Object.getOwnPropertyDescriptor(defaults, key);
          if (value && value.configurable && obj[key] === void 0) {
            Object.defineProperty(obj, key, value);
          }
        }
        return obj;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);
          if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
              Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
              })
            );
          }
          ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        }
        return target;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _instanceof(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return right[Symbol.hasInstance](left);
        } else {
          return left instanceof right;
        }
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                if (desc.get || desc.set) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function _newArrowCheck(innerThis, boundThis) {
        if (innerThis !== boundThis) {
          throw new TypeError("Cannot instantiate an arrow function");
        }
      }
      function _objectDestructuringEmpty(obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }
        return target;
      }
      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key, i;
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }
        return target;
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }
        return object;
      }
      function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get;
        } else {
          _get = function _get2(target2, property2, receiver2) {
            var base = _superPropBase(target2, property2);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property2);
            if (desc.get) {
              return desc.get.call(receiver2);
            }
            return desc.value;
          };
        }
        return _get(target, property, receiver || target);
      }
      function set(target, property, value, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.set) {
          set = Reflect.set;
        } else {
          set = function set2(target2, property2, value2, receiver2) {
            var base = _superPropBase(target2, property2);
            var desc;
            if (base) {
              desc = Object.getOwnPropertyDescriptor(base, property2);
              if (desc.set) {
                desc.set.call(receiver2, value2);
                return true;
              } else if (!desc.writable) {
                return false;
              }
            }
            desc = Object.getOwnPropertyDescriptor(receiver2, property2);
            if (desc) {
              if (!desc.writable) {
                return false;
              }
              desc.value = value2;
              Object.defineProperty(receiver2, property2, desc);
            } else {
              _defineProperty(receiver2, property2, value2);
            }
            return true;
          };
        }
        return set(target, property, value, receiver);
      }
      function _set(target, property, value, receiver, isStrict) {
        var s = set(target, property, value, receiver || target);
        if (!s && isStrict) {
          throw new Error("failed to set property");
        }
        return value;
      }
      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        return Object.freeze(
          Object.defineProperties(strings, {
            raw: {
              value: Object.freeze(raw)
            }
          })
        );
      }
      function _taggedTemplateLiteralLoose(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        strings.raw = raw;
        return strings;
      }
      function _temporalRef(val, name) {
        if (val === _temporalUndefined) {
          throw new ReferenceError(name + " is not defined - temporal dead zone");
        } else {
          return val;
        }
      }
      function _readOnlyError(name) {
        throw new Error('"' + name + '" is read-only');
      }
      function _classNameTDZError(name) {
        throw new Error('Class "' + name + '" cannot be referenced in computed property keys.');
      }
      var _temporalUndefined = {};
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
      }
      function _slicedToArrayLoose(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
      }
      function _toArray(arr) {
        return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        }
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
          return Array.from(iter);
      }
      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _iterableToArrayLimitLoose(arr, i) {
        var _arr = [];
        for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done; ) {
          _arr.push(_step.value);
          if (i && _arr.length === i) break;
        }
        return _arr;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _skipFirstGeneratorNext(fn) {
        return function() {
          var it = fn.apply(this, arguments);
          it.next();
          return it;
        };
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _initializerWarningHelper(descriptor, context) {
        throw new Error(
          "Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2."
        );
      }
      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }
      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function(key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ("value" in desc || desc.initializer) {
          desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function(desc2, decorator) {
          return decorator(target, property, desc2) || desc2;
        }, desc);
        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = void 0;
        }
        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }
        return desc;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      function _classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      function _classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.set) {
          descriptor.set.call(receiver, value);
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }
          descriptor.value = value;
        }
        return value;
      }
      function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        return descriptor.value;
      }
      function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        if (!descriptor.writable) {
          throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
        return value;
      }
      function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        return method;
      }
      function _classStaticPrivateMethodSet() {
        throw new TypeError("attempted to set read only static private field");
      }
      function _decorate(decorators, factory, superClass, mixins) {
        var api = _getDecoratorsApi();
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            api = mixins[i](api);
          }
        }
        var r = factory(function initialize(O) {
          api.initializeInstanceElements(O, decorated.elements);
        }, superClass);
        var decorated = api.decorateClass(
          _coalesceClassElements(r.d.map(_createElementDescriptor)),
          decorators
        );
        api.initializeClassElements(r.F, decorated.elements);
        return api.runClassFinishers(r.F, decorated.finishers);
      }
      function _getDecoratorsApi() {
        _getDecoratorsApi = function() {
          return api;
        };
        var api = {
          elementsDefinitionOrder: [["method"], ["field"]],
          initializeInstanceElements: function(O, elements) {
            ["method", "field"].forEach(function(kind) {
              elements.forEach(function(element) {
                if (element.kind === kind && element.placement === "own") {
                  this.defineClassElement(O, element);
                }
              }, this);
            }, this);
          },
          initializeClassElements: function(F, elements) {
            var proto = F.prototype;
            ["method", "field"].forEach(function(kind) {
              elements.forEach(function(element) {
                var placement = element.placement;
                if (element.kind === kind && (placement === "static" || placement === "prototype")) {
                  var receiver = placement === "static" ? F : proto;
                  this.defineClassElement(receiver, element);
                }
              }, this);
            }, this);
          },
          defineClassElement: function(receiver, element) {
            var descriptor = element.descriptor;
            if (element.kind === "field") {
              var initializer = element.initializer;
              descriptor = {
                enumerable: descriptor.enumerable,
                writable: descriptor.writable,
                configurable: descriptor.configurable,
                value: initializer === void 0 ? void 0 : initializer.call(receiver)
              };
            }
            Object.defineProperty(receiver, element.key, descriptor);
          },
          decorateClass: function(elements, decorators) {
            var newElements = [];
            var finishers = [];
            var placements = {
              static: [],
              prototype: [],
              own: []
            };
            elements.forEach(function(element) {
              this.addElementPlacement(element, placements);
            }, this);
            elements.forEach(function(element) {
              if (!_hasDecorators(element)) return newElements.push(element);
              var elementFinishersExtras = this.decorateElement(element, placements);
              newElements.push(elementFinishersExtras.element);
              newElements.push.apply(newElements, elementFinishersExtras.extras);
              finishers.push.apply(finishers, elementFinishersExtras.finishers);
            }, this);
            if (!decorators) {
              return {
                elements: newElements,
                finishers
              };
            }
            var result = this.decorateConstructor(newElements, decorators);
            finishers.push.apply(finishers, result.finishers);
            result.finishers = finishers;
            return result;
          },
          addElementPlacement: function(element, placements, silent) {
            var keys = placements[element.placement];
            if (!silent && keys.indexOf(element.key) !== -1) {
              throw new TypeError("Duplicated element (" + element.key + ")");
            }
            keys.push(element.key);
          },
          decorateElement: function(element, placements) {
            var extras = [];
            var finishers = [];
            for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
              var keys = placements[element.placement];
              keys.splice(keys.indexOf(element.key), 1);
              var elementObject = this.fromElementDescriptor(element);
              var elementFinisherExtras = this.toElementFinisherExtras(
                (0, decorators[i])(elementObject) || elementObject
              );
              element = elementFinisherExtras.element;
              this.addElementPlacement(element, placements);
              if (elementFinisherExtras.finisher) {
                finishers.push(elementFinisherExtras.finisher);
              }
              var newExtras = elementFinisherExtras.extras;
              if (newExtras) {
                for (var j = 0; j < newExtras.length; j++) {
                  this.addElementPlacement(newExtras[j], placements);
                }
                extras.push.apply(extras, newExtras);
              }
            }
            return {
              element,
              finishers,
              extras
            };
          },
          decorateConstructor: function(elements, decorators) {
            var finishers = [];
            for (var i = decorators.length - 1; i >= 0; i--) {
              var obj = this.fromClassDescriptor(elements);
              var elementsAndFinisher = this.toClassDescriptor(
                (0, decorators[i])(obj) || obj
              );
              if (elementsAndFinisher.finisher !== void 0) {
                finishers.push(elementsAndFinisher.finisher);
              }
              if (elementsAndFinisher.elements !== void 0) {
                elements = elementsAndFinisher.elements;
                for (var j = 0; j < elements.length - 1; j++) {
                  for (var k = j + 1; k < elements.length; k++) {
                    if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                      throw new TypeError(
                        "Duplicated element (" + elements[j].key + ")"
                      );
                    }
                  }
                }
              }
            }
            return {
              elements,
              finishers
            };
          },
          fromElementDescriptor: function(element) {
            var obj = {
              kind: element.kind,
              key: element.key,
              placement: element.placement,
              descriptor: element.descriptor
            };
            var desc = {
              value: "Descriptor",
              configurable: true
            };
            Object.defineProperty(obj, Symbol.toStringTag, desc);
            if (element.kind === "field") obj.initializer = element.initializer;
            return obj;
          },
          toElementDescriptors: function(elementObjects) {
            if (elementObjects === void 0) return;
            return _toArray(elementObjects).map(function(elementObject) {
              var element = this.toElementDescriptor(elementObject);
              this.disallowProperty(elementObject, "finisher", "An element descriptor");
              this.disallowProperty(elementObject, "extras", "An element descriptor");
              return element;
            }, this);
          },
          toElementDescriptor: function(elementObject) {
            var kind = String(elementObject.kind);
            if (kind !== "method" && kind !== "field") {
              throw new TypeError(
                `An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "` + kind + '"'
              );
            }
            var key = _toPropertyKey(elementObject.key);
            var placement = String(elementObject.placement);
            if (placement !== "static" && placement !== "prototype" && placement !== "own") {
              throw new TypeError(
                `An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "` + placement + '"'
              );
            }
            var descriptor = elementObject.descriptor;
            this.disallowProperty(elementObject, "elements", "An element descriptor");
            var element = {
              kind,
              key,
              placement,
              descriptor: Object.assign({}, descriptor)
            };
            if (kind !== "field") {
              this.disallowProperty(elementObject, "initializer", "A method descriptor");
            } else {
              this.disallowProperty(
                descriptor,
                "get",
                "The property descriptor of a field descriptor"
              );
              this.disallowProperty(
                descriptor,
                "set",
                "The property descriptor of a field descriptor"
              );
              this.disallowProperty(
                descriptor,
                "value",
                "The property descriptor of a field descriptor"
              );
              element.initializer = elementObject.initializer;
            }
            return element;
          },
          toElementFinisherExtras: function(elementObject) {
            var element = this.toElementDescriptor(elementObject);
            var finisher = _optionalCallableProperty(elementObject, "finisher");
            var extras = this.toElementDescriptors(elementObject.extras);
            return {
              element,
              finisher,
              extras
            };
          },
          fromClassDescriptor: function(elements) {
            var obj = {
              kind: "class",
              elements: elements.map(this.fromElementDescriptor, this)
            };
            var desc = {
              value: "Descriptor",
              configurable: true
            };
            Object.defineProperty(obj, Symbol.toStringTag, desc);
            return obj;
          },
          toClassDescriptor: function(obj) {
            var kind = String(obj.kind);
            if (kind !== "class") {
              throw new TypeError(
                `A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "` + kind + '"'
              );
            }
            this.disallowProperty(obj, "key", "A class descriptor");
            this.disallowProperty(obj, "placement", "A class descriptor");
            this.disallowProperty(obj, "descriptor", "A class descriptor");
            this.disallowProperty(obj, "initializer", "A class descriptor");
            this.disallowProperty(obj, "extras", "A class descriptor");
            var finisher = _optionalCallableProperty(obj, "finisher");
            var elements = this.toElementDescriptors(obj.elements);
            return {
              elements,
              finisher
            };
          },
          runClassFinishers: function(constructor, finishers) {
            for (var i = 0; i < finishers.length; i++) {
              var newConstructor = (0, finishers[i])(constructor);
              if (newConstructor !== void 0) {
                if (typeof newConstructor !== "function") {
                  throw new TypeError("Finishers must return a constructor.");
                }
                constructor = newConstructor;
              }
            }
            return constructor;
          },
          disallowProperty: function(obj, name, objectType) {
            if (obj[name] !== void 0) {
              throw new TypeError(objectType + " can't have a ." + name + " property.");
            }
          }
        };
        return api;
      }
      function _createElementDescriptor(def) {
        var key = _toPropertyKey(def.key);
        var descriptor;
        if (def.kind === "method") {
          descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "get") {
          descriptor = {
            get: def.value,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "set") {
          descriptor = {
            set: def.value,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "field") {
          descriptor = {
            configurable: true,
            writable: true,
            enumerable: true
          };
        }
        var element = {
          kind: def.kind === "field" ? "field" : "method",
          key,
          placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
          descriptor
        };
        if (def.decorators) element.decorators = def.decorators;
        if (def.kind === "field") element.initializer = def.value;
        return element;
      }
      function _coalesceGetterSetter(element, other) {
        if (element.descriptor.get !== void 0) {
          other.descriptor.get = element.descriptor.get;
        } else {
          other.descriptor.set = element.descriptor.set;
        }
      }
      function _coalesceClassElements(elements) {
        var newElements = [];
        var isSameElement = function(other2) {
          return other2.kind === "method" && other2.key === element.key && other2.placement === element.placement;
        };
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var other;
          if (element.kind === "method" && (other = newElements.find(isSameElement))) {
            if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
              if (_hasDecorators(element) || _hasDecorators(other)) {
                throw new ReferenceError(
                  "Duplicated methods (" + element.key + ") can't be decorated."
                );
              }
              other.descriptor = element.descriptor;
            } else {
              if (_hasDecorators(element)) {
                if (_hasDecorators(other)) {
                  throw new ReferenceError(
                    "Decorators can't be placed on different accessors with for the same property (" + element.key + ")."
                  );
                }
                other.decorators = element.decorators;
              }
              _coalesceGetterSetter(element, other);
            }
          } else {
            newElements.push(element);
          }
        }
        return newElements;
      }
      function _hasDecorators(element) {
        return element.decorators && element.decorators.length;
      }
      function _isDataDescriptor(desc) {
        return desc !== void 0 && !(desc.value === void 0 && desc.writable === void 0);
      }
      function _optionalCallableProperty(obj, name) {
        var value = obj[name];
        if (value !== void 0 && typeof value !== "function") {
          throw new TypeError("Expected '" + name + "' to be a function");
        }
        return value;
      }
      function _classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
      }
      function _classPrivateMethodSet() {
        throw new TypeError("attempted to reassign private method");
      }
      function _wrapRegExp(re, groups) {
        _wrapRegExp = function(re2, groups2) {
          return new BabelRegExp(re2, groups2);
        };
        var _RegExp = _wrapNativeSuper(RegExp);
        var _super = RegExp.prototype;
        var _groups = /* @__PURE__ */ new WeakMap();
        function BabelRegExp(re2, groups2) {
          var _this = _RegExp.call(this, re2);
          _groups.set(_this, groups2);
          return _this;
        }
        _inherits(BabelRegExp, _RegExp);
        BabelRegExp.prototype.exec = function(str) {
          var result = _super.exec.call(this, str);
          if (result) result.groups = buildGroups(result, this);
          return result;
        };
        BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
          if (typeof substitution === "string") {
            var groups2 = _groups.get(this);
            return _super[Symbol.replace].call(
              this,
              str,
              substitution.replace(/\$<([^>]+)>/g, function(_, name) {
                return "$" + groups2[name];
              })
            );
          } else if (typeof substitution === "function") {
            var _this = this;
            return _super[Symbol.replace].call(this, str, function() {
              var args = [];
              args.push.apply(args, arguments);
              if (typeof args[args.length - 1] !== "object") {
                args.push(buildGroups(args, _this));
              }
              return substitution.apply(this, args);
            });
          } else {
            return _super[Symbol.replace].call(this, str, substitution);
          }
        };
        function buildGroups(result, re2) {
          var g = _groups.get(re2);
          return Object.keys(g).reduce(function(groups2, name) {
            groups2[name] = result[g[name]];
            return groups2;
          }, /* @__PURE__ */ Object.create(null));
        }
        return _wrapRegExp.apply(this, arguments);
      }
      var MARKUP_RECT = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
      var toOptionalFraction = function toOptionalFraction2(value) {
        return typeof value === "string" && /%/.test(value) ? parseFloat(value) / 100 : value;
      };
      var prepareMarkup = function prepareMarkup2(markup) {
        var _markup = _slicedToArray(markup, 2), type = _markup[0], props = _markup[1];
        var rect = props.points ? {} : MARKUP_RECT.reduce(function(prev, curr) {
          prev[curr] = toOptionalFraction(props[curr]);
          return prev;
        }, {});
        return [
          type,
          Object.assign(
            {
              zIndex: 0
            },
            props,
            rect
          )
        ];
      };
      var getImageSize = function getImageSize2(file) {
        return new Promise(function(resolve, reject) {
          var imageElement = new Image();
          imageElement.src = URL.createObjectURL(file);
          var measure = function measure2() {
            var width = imageElement.naturalWidth;
            var height = imageElement.naturalHeight;
            var hasSize = width && height;
            if (!hasSize) return;
            URL.revokeObjectURL(imageElement.src);
            clearInterval(intervalId);
            resolve({ width, height });
          };
          imageElement.onerror = function(err) {
            URL.revokeObjectURL(imageElement.src);
            clearInterval(intervalId);
            reject(err);
          };
          var intervalId = setInterval(measure, 1);
          measure();
        });
      };
      if (typeof window !== "undefined" && typeof window.document !== "undefined") {
        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function value(cb, type, quality) {
              var canvas = this;
              setTimeout(function() {
                var dataURL = canvas.toDataURL(type, quality).split(",")[1];
                var binStr = atob(dataURL);
                var index = binStr.length;
                var data2 = new Uint8Array(index);
                while (index--) {
                  data2[index] = binStr.charCodeAt(index);
                }
                cb(new Blob([data2], { type: type || "image/png" }));
              });
            }
          });
        }
      }
      var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
      var isIOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var plugin = function plugin2(_ref) {
        var addFilter = _ref.addFilter, utils = _ref.utils;
        var Type = utils.Type, forin = utils.forin, getFileFromBlob = utils.getFileFromBlob, isFile = utils.isFile;
        var TRANSFORM_LIST = ["crop", "resize", "filter", "markup", "output"];
        var createVariantCreator = function createVariantCreator2(updateMetadata) {
          return function(transform, file, metadata) {
            return transform(file, updateMetadata ? updateMetadata(metadata) : metadata);
          };
        };
        var isDefaultCrop = function isDefaultCrop2(crop) {
          return crop.aspectRatio === null && crop.rotation === 0 && crop.zoom === 1 && crop.center && crop.center.x === 0.5 && crop.center.y === 0.5 && crop.flip && crop.flip.horizontal === false && crop.flip.vertical === false;
        };
        addFilter("SHOULD_PREPARE_OUTPUT", function(shouldPrepareOutput, _ref2) {
          var query = _ref2.query;
          return new Promise(function(resolve) {
            resolve(!query("IS_ASYNC"));
          });
        });
        var shouldTransformFile = function shouldTransformFile2(query, file, item) {
          return new Promise(function(resolve) {
            if (!query("GET_ALLOW_IMAGE_TRANSFORM") || item.archived || !isFile(file) || !isImage(file)) {
              return resolve(false);
            }
            getImageSize(file).then(function() {
              var fn = query("GET_IMAGE_TRANSFORM_IMAGE_FILTER");
              if (fn) {
                var filterResult = fn(file);
                if (filterResult == null) {
                  return handleRevert(true);
                }
                if (typeof filterResult === "boolean") {
                  return resolve(filterResult);
                }
                if (typeof filterResult.then === "function") {
                  return filterResult.then(resolve);
                }
              }
              resolve(true);
            }).catch(function(err) {
              resolve(false);
            });
          });
        };
        addFilter("DID_CREATE_ITEM", function(item, _ref3) {
          var query = _ref3.query, dispatch = _ref3.dispatch;
          if (!query("GET_ALLOW_IMAGE_TRANSFORM")) return;
          item.extend("requestPrepare", function() {
            return new Promise(function(resolve, reject) {
              dispatch(
                "REQUEST_PREPARE_OUTPUT",
                {
                  query: item.id,
                  item,
                  success: resolve,
                  failure: reject
                },
                true
              );
            });
          });
        });
        addFilter("PREPARE_OUTPUT", function(file, _ref4) {
          var query = _ref4.query, item = _ref4.item;
          return new Promise(function(resolve) {
            shouldTransformFile(query, file, item).then(function(shouldTransform) {
              if (!shouldTransform) return resolve(file);
              var variants = [];
              if (query("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_ORIGINAL")) {
                variants.push(function() {
                  return new Promise(function(resolve2) {
                    resolve2({
                      name: query("GET_IMAGE_TRANSFORM_VARIANTS_ORIGINAL_NAME"),
                      file
                    });
                  });
                });
              }
              if (query("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_DEFAULT")) {
                variants.push(function(transform2, file2, metadata) {
                  return new Promise(function(resolve2) {
                    transform2(file2, metadata).then(function(file3) {
                      return resolve2({
                        name: query("GET_IMAGE_TRANSFORM_VARIANTS_DEFAULT_NAME"),
                        file: file3
                      });
                    });
                  });
                });
              }
              var variantsDefinition = query("GET_IMAGE_TRANSFORM_VARIANTS") || {};
              forin(variantsDefinition, function(key, fn) {
                var createVariant = createVariantCreator(fn);
                variants.push(function(transform2, file2, metadata) {
                  return new Promise(function(resolve2) {
                    createVariant(transform2, file2, metadata).then(function(file3) {
                      return resolve2({ name: key, file: file3 });
                    });
                  });
                });
              });
              var qualityAsPercentage = query("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY");
              var qualityMode = query("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY_MODE");
              var quality = qualityAsPercentage === null ? null : qualityAsPercentage / 100;
              var type = query("GET_IMAGE_TRANSFORM_OUTPUT_MIME_TYPE");
              var clientTransforms = query("GET_IMAGE_TRANSFORM_CLIENT_TRANSFORMS") || TRANSFORM_LIST;
              item.setMetadata(
                "output",
                {
                  type,
                  quality,
                  client: clientTransforms
                },
                true
              );
              var transform = function transform2(file2, metadata) {
                return new Promise(function(resolve2, reject) {
                  var filteredMetadata = Object.assign({}, metadata);
                  Object.keys(filteredMetadata).filter(function(instruction) {
                    return instruction !== "exif";
                  }).forEach(function(instruction) {
                    if (clientTransforms.indexOf(instruction) === -1) {
                      delete filteredMetadata[instruction];
                    }
                  });
                  var resize = filteredMetadata.resize, exif = filteredMetadata.exif, output = filteredMetadata.output, crop = filteredMetadata.crop, filter = filteredMetadata.filter, markup = filteredMetadata.markup;
                  var instructions = {
                    image: {
                      orientation: exif ? exif.orientation : null
                    },
                    output: output && (output.type || typeof output.quality === "number" || output.background) ? {
                      type: output.type,
                      quality: typeof output.quality === "number" ? output.quality * 100 : null,
                      background: output.background || query(
                        "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
                      ) || null
                    } : void 0,
                    size: resize && (resize.size.width || resize.size.height) ? Object.assign(
                      {
                        mode: resize.mode,
                        upscale: resize.upscale
                      },
                      resize.size
                    ) : void 0,
                    crop: crop && !isDefaultCrop(crop) ? Object.assign(
                      {},
                      crop
                    ) : void 0,
                    markup: markup && markup.length ? markup.map(prepareMarkup) : [],
                    filter
                  };
                  if (instructions.output) {
                    var willChangeType = output.type ? (
                      // type set
                      output.type !== file2.type
                    ) : (
                      // type not set
                      false
                    );
                    var canChangeQuality = /\/jpe?g$/.test(file2.type);
                    var willChangeQuality = output.quality !== null ? (
                      // quality set
                      canChangeQuality && qualityMode === "always"
                    ) : (
                      // quality not set
                      false
                    );
                    var willModifyImageData = !!(instructions.size || instructions.crop || instructions.filter || willChangeType || willChangeQuality);
                    if (!willModifyImageData) return resolve2(file2);
                  }
                  var options = {
                    beforeCreateBlob: query("GET_IMAGE_TRANSFORM_BEFORE_CREATE_BLOB"),
                    afterCreateBlob: query("GET_IMAGE_TRANSFORM_AFTER_CREATE_BLOB"),
                    canvasMemoryLimit: query("GET_IMAGE_TRANSFORM_CANVAS_MEMORY_LIMIT"),
                    stripImageHead: query(
                      "GET_IMAGE_TRANSFORM_OUTPUT_STRIP_IMAGE_HEAD"
                    )
                  };
                  transformImage(file2, instructions, options).then(function(blob) {
                    var out = getFileFromBlob(
                      blob,
                      // rename the original filename to match the mime type of the output image
                      renameFileToMatchMimeType(
                        file2.name,
                        getValidOutputMimeType(blob.type)
                      )
                    );
                    resolve2(out);
                  }).catch(reject);
                });
              };
              var variantPromises = variants.map(function(create2) {
                return create2(transform, file, item.getMetadata());
              });
              Promise.all(variantPromises).then(function(files) {
                resolve(
                  files.length === 1 && files[0].name === null ? (
                    // return the File object
                    files[0].file
                  ) : (
                    // return an array of files { name:'name', file:File }
                    files
                  )
                );
              });
            });
          });
        });
        return {
          options: {
            allowImageTransform: [true, Type.BOOLEAN],
            // filter images to transform
            imageTransformImageFilter: [null, Type.FUNCTION],
            // null, 'image/jpeg', 'image/png'
            imageTransformOutputMimeType: [null, Type.STRING],
            // null, 0 - 100
            imageTransformOutputQuality: [null, Type.INT],
            // set to false to copy image exif data to output
            imageTransformOutputStripImageHead: [true, Type.BOOLEAN],
            // only apply transforms in this list
            imageTransformClientTransforms: [null, Type.ARRAY],
            // only apply output quality when a transform is required
            imageTransformOutputQualityMode: ["always", Type.STRING],
            // 'always'
            // 'optional'
            // 'mismatch' (future feature, only applied if quality differs from input)
            // get image transform variants
            imageTransformVariants: [null, Type.OBJECT],
            // should we post the default transformed file
            imageTransformVariantsIncludeDefault: [true, Type.BOOLEAN],
            // which name to prefix the default transformed file with
            imageTransformVariantsDefaultName: [null, Type.STRING],
            // should we post the original file
            imageTransformVariantsIncludeOriginal: [false, Type.BOOLEAN],
            // which name to prefix the original file with
            imageTransformVariantsOriginalName: ["original_", Type.STRING],
            // called before creating the blob, receives canvas, expects promise resolve with canvas
            imageTransformBeforeCreateBlob: [null, Type.FUNCTION],
            // expects promise resolved with blob
            imageTransformAfterCreateBlob: [null, Type.FUNCTION],
            // canvas memory limit
            imageTransformCanvasMemoryLimit: [
              isBrowser && isIOS ? 4096 * 4096 : null,
              Type.INT
            ],
            // background image of the output canvas
            imageTransformCanvasBackgroundColor: [null, Type.STRING]
          }
        };
      };
      if (isBrowser) {
        document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin }));
      }
      return plugin;
    });
  }
});

// node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js
var require_filepond_plugin_image_preview = __commonJS({
  "node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.FilePondPluginImagePreview = factory());
    })(exports, function() {
      "use strict";
      var isPreviewableImage = function isPreviewableImage2(file) {
        return /^image/.test(file.type);
      };
      function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var REACT_ELEMENT_TYPE;
      function _jsx(type, props, key, children) {
        if (!REACT_ELEMENT_TYPE) {
          REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
        }
        var defaultProps = type && type.defaultProps;
        var childrenLength = arguments.length - 3;
        if (!props && childrenLength !== 0) {
          props = {
            children: void 0
          };
        }
        if (props && defaultProps) {
          for (var propName in defaultProps) {
            if (props[propName] === void 0) {
              props[propName] = defaultProps[propName];
            }
          }
        } else if (!props) {
          props = defaultProps || {};
        }
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = new Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 3];
          }
          props.children = childArray;
        }
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key: key === void 0 ? null : "" + key,
          ref: null,
          props,
          _owner: null
        };
      }
      function _asyncIterator(iterable) {
        var method;
        if (typeof Symbol === "function") {
          if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
          }
          if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
          }
        }
        throw new TypeError("Object is not async iterable");
      }
      function _AwaitValue(value) {
        this.wrapped = value;
      }
      function _AsyncGenerator(gen) {
        var front, back;
        function send(key, arg) {
          return new Promise(function(resolve, reject) {
            var request = {
              key,
              arg,
              resolve,
              reject,
              next: null
            };
            if (back) {
              back = back.next = request;
            } else {
              front = back = request;
              resume(key, arg);
            }
          });
        }
        function resume(key, arg) {
          try {
            var result = gen[key](arg);
            var value = result.value;
            var wrappedAwait = value instanceof _AwaitValue;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(
              function(arg2) {
                if (wrappedAwait) {
                  resume("next", arg2);
                  return;
                }
                settle(result.done ? "return" : "normal", arg2);
              },
              function(err) {
                resume("throw", err);
              }
            );
          } catch (err) {
            settle("throw", err);
          }
        }
        function settle(type, value) {
          switch (type) {
            case "return":
              front.resolve({
                value,
                done: true
              });
              break;
            case "throw":
              front.reject(value);
              break;
            default:
              front.resolve({
                value,
                done: false
              });
              break;
          }
          front = front.next;
          if (front) {
            resume(front.key, front.arg);
          } else {
            back = null;
          }
        }
        this._invoke = send;
        if (typeof gen.return !== "function") {
          this.return = void 0;
        }
      }
      if (typeof Symbol === "function" && Symbol.asyncIterator) {
        _AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
          return this;
        };
      }
      _AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
      };
      _AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
      };
      _AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
      };
      function _wrapAsyncGenerator(fn) {
        return function() {
          return new _AsyncGenerator(fn.apply(this, arguments));
        };
      }
      function _awaitAsyncGenerator(value) {
        return new _AwaitValue(value);
      }
      function _asyncGeneratorDelegate(inner, awaitWrap) {
        var iter = {}, waiting = false;
        function pump(key, value) {
          waiting = true;
          value = new Promise(function(resolve) {
            resolve(inner[key](value));
          });
          return {
            done: false,
            value: awaitWrap(value)
          };
        }
        if (typeof Symbol === "function" && Symbol.iterator) {
          iter[Symbol.iterator] = function() {
            return this;
          };
        }
        iter.next = function(value) {
          if (waiting) {
            waiting = false;
            return value;
          }
          return pump("next", value);
        };
        if (typeof inner.throw === "function") {
          iter.throw = function(value) {
            if (waiting) {
              waiting = false;
              throw value;
            }
            return pump("throw", value);
          };
        }
        if (typeof inner.return === "function") {
          iter.return = function(value) {
            return pump("return", value);
          };
        }
        return iter;
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
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "next",
                value
              );
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _defineEnumerableProperties(obj, descs) {
        for (var key in descs) {
          var desc = descs[key];
          desc.configurable = desc.enumerable = true;
          if ("value" in desc) desc.writable = true;
          Object.defineProperty(obj, key, desc);
        }
        if (Object.getOwnPropertySymbols) {
          var objectSymbols = Object.getOwnPropertySymbols(descs);
          for (var i = 0; i < objectSymbols.length; i++) {
            var sym = objectSymbols[i];
            var desc = descs[sym];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, sym, desc);
          }
        }
        return obj;
      }
      function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = Object.getOwnPropertyDescriptor(defaults, key);
          if (value && value.configurable && obj[key] === void 0) {
            Object.defineProperty(obj, key, value);
          }
        }
        return obj;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);
          if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
              Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
              })
            );
          }
          ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        }
        return target;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _instanceof(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return right[Symbol.hasInstance](left);
        } else {
          return left instanceof right;
        }
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                if (desc.get || desc.set) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function _newArrowCheck(innerThis, boundThis) {
        if (innerThis !== boundThis) {
          throw new TypeError("Cannot instantiate an arrow function");
        }
      }
      function _objectDestructuringEmpty(obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }
        return target;
      }
      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key, i;
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }
        return target;
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return self2;
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }
        return object;
      }
      function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get;
        } else {
          _get = function _get2(target2, property2, receiver2) {
            var base = _superPropBase(target2, property2);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property2);
            if (desc.get) {
              return desc.get.call(receiver2);
            }
            return desc.value;
          };
        }
        return _get(target, property, receiver || target);
      }
      function set(target, property, value, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.set) {
          set = Reflect.set;
        } else {
          set = function set2(target2, property2, value2, receiver2) {
            var base = _superPropBase(target2, property2);
            var desc;
            if (base) {
              desc = Object.getOwnPropertyDescriptor(base, property2);
              if (desc.set) {
                desc.set.call(receiver2, value2);
                return true;
              } else if (!desc.writable) {
                return false;
              }
            }
            desc = Object.getOwnPropertyDescriptor(receiver2, property2);
            if (desc) {
              if (!desc.writable) {
                return false;
              }
              desc.value = value2;
              Object.defineProperty(receiver2, property2, desc);
            } else {
              _defineProperty(receiver2, property2, value2);
            }
            return true;
          };
        }
        return set(target, property, value, receiver);
      }
      function _set(target, property, value, receiver, isStrict) {
        var s = set(target, property, value, receiver || target);
        if (!s && isStrict) {
          throw new Error("failed to set property");
        }
        return value;
      }
      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        return Object.freeze(
          Object.defineProperties(strings, {
            raw: {
              value: Object.freeze(raw)
            }
          })
        );
      }
      function _taggedTemplateLiteralLoose(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        strings.raw = raw;
        return strings;
      }
      function _temporalRef(val, name) {
        if (val === _temporalUndefined) {
          throw new ReferenceError(name + " is not defined - temporal dead zone");
        } else {
          return val;
        }
      }
      function _readOnlyError(name) {
        throw new Error('"' + name + '" is read-only');
      }
      function _classNameTDZError(name) {
        throw new Error(
          'Class "' + name + '" cannot be referenced in computed property keys.'
        );
      }
      var _temporalUndefined = {};
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
      }
      function _slicedToArrayLoose(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
      }
      function _toArray(arr) {
        return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        }
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
          return Array.from(iter);
      }
      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _iterableToArrayLimitLoose(arr, i) {
        var _arr = [];
        for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done; ) {
          _arr.push(_step.value);
          if (i && _arr.length === i) break;
        }
        return _arr;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _skipFirstGeneratorNext(fn) {
        return function() {
          var it = fn.apply(this, arguments);
          it.next();
          return it;
        };
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _initializerWarningHelper(descriptor, context) {
        throw new Error(
          "Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2."
        );
      }
      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }
      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function(key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ("value" in desc || desc.initializer) {
          desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function(desc2, decorator) {
          return decorator(target, property, desc2) || desc2;
        }, desc);
        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = void 0;
        }
        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }
        return desc;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      function _classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      function _classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        var descriptor = privateMap.get(receiver);
        if (descriptor.set) {
          descriptor.set.call(receiver, value);
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }
          descriptor.value = value;
        }
        return value;
      }
      function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        return descriptor.value;
      }
      function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        if (!descriptor.writable) {
          throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
        return value;
      }
      function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
        if (receiver !== classConstructor) {
          throw new TypeError("Private static access of wrong provenance");
        }
        return method;
      }
      function _classStaticPrivateMethodSet() {
        throw new TypeError("attempted to set read only static private field");
      }
      function _decorate(decorators, factory, superClass, mixins) {
        var api = _getDecoratorsApi();
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            api = mixins[i](api);
          }
        }
        var r = factory(function initialize(O) {
          api.initializeInstanceElements(O, decorated.elements);
        }, superClass);
        var decorated = api.decorateClass(
          _coalesceClassElements(r.d.map(_createElementDescriptor)),
          decorators
        );
        api.initializeClassElements(r.F, decorated.elements);
        return api.runClassFinishers(r.F, decorated.finishers);
      }
      function _getDecoratorsApi() {
        _getDecoratorsApi = function() {
          return api;
        };
        var api = {
          elementsDefinitionOrder: [["method"], ["field"]],
          initializeInstanceElements: function(O, elements) {
            ["method", "field"].forEach(function(kind) {
              elements.forEach(function(element) {
                if (element.kind === kind && element.placement === "own") {
                  this.defineClassElement(O, element);
                }
              }, this);
            }, this);
          },
          initializeClassElements: function(F, elements) {
            var proto = F.prototype;
            ["method", "field"].forEach(function(kind) {
              elements.forEach(function(element) {
                var placement = element.placement;
                if (element.kind === kind && (placement === "static" || placement === "prototype")) {
                  var receiver = placement === "static" ? F : proto;
                  this.defineClassElement(receiver, element);
                }
              }, this);
            }, this);
          },
          defineClassElement: function(receiver, element) {
            var descriptor = element.descriptor;
            if (element.kind === "field") {
              var initializer = element.initializer;
              descriptor = {
                enumerable: descriptor.enumerable,
                writable: descriptor.writable,
                configurable: descriptor.configurable,
                value: initializer === void 0 ? void 0 : initializer.call(receiver)
              };
            }
            Object.defineProperty(receiver, element.key, descriptor);
          },
          decorateClass: function(elements, decorators) {
            var newElements = [];
            var finishers = [];
            var placements = {
              static: [],
              prototype: [],
              own: []
            };
            elements.forEach(function(element) {
              this.addElementPlacement(element, placements);
            }, this);
            elements.forEach(function(element) {
              if (!_hasDecorators(element)) return newElements.push(element);
              var elementFinishersExtras = this.decorateElement(
                element,
                placements
              );
              newElements.push(elementFinishersExtras.element);
              newElements.push.apply(newElements, elementFinishersExtras.extras);
              finishers.push.apply(finishers, elementFinishersExtras.finishers);
            }, this);
            if (!decorators) {
              return {
                elements: newElements,
                finishers
              };
            }
            var result = this.decorateConstructor(newElements, decorators);
            finishers.push.apply(finishers, result.finishers);
            result.finishers = finishers;
            return result;
          },
          addElementPlacement: function(element, placements, silent) {
            var keys = placements[element.placement];
            if (!silent && keys.indexOf(element.key) !== -1) {
              throw new TypeError("Duplicated element (" + element.key + ")");
            }
            keys.push(element.key);
          },
          decorateElement: function(element, placements) {
            var extras = [];
            var finishers = [];
            for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
              var keys = placements[element.placement];
              keys.splice(keys.indexOf(element.key), 1);
              var elementObject = this.fromElementDescriptor(element);
              var elementFinisherExtras = this.toElementFinisherExtras(
                (0, decorators[i])(elementObject) || elementObject
              );
              element = elementFinisherExtras.element;
              this.addElementPlacement(element, placements);
              if (elementFinisherExtras.finisher) {
                finishers.push(elementFinisherExtras.finisher);
              }
              var newExtras = elementFinisherExtras.extras;
              if (newExtras) {
                for (var j = 0; j < newExtras.length; j++) {
                  this.addElementPlacement(newExtras[j], placements);
                }
                extras.push.apply(extras, newExtras);
              }
            }
            return {
              element,
              finishers,
              extras
            };
          },
          decorateConstructor: function(elements, decorators) {
            var finishers = [];
            for (var i = decorators.length - 1; i >= 0; i--) {
              var obj = this.fromClassDescriptor(elements);
              var elementsAndFinisher = this.toClassDescriptor(
                (0, decorators[i])(obj) || obj
              );
              if (elementsAndFinisher.finisher !== void 0) {
                finishers.push(elementsAndFinisher.finisher);
              }
              if (elementsAndFinisher.elements !== void 0) {
                elements = elementsAndFinisher.elements;
                for (var j = 0; j < elements.length - 1; j++) {
                  for (var k = j + 1; k < elements.length; k++) {
                    if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                      throw new TypeError(
                        "Duplicated element (" + elements[j].key + ")"
                      );
                    }
                  }
                }
              }
            }
            return {
              elements,
              finishers
            };
          },
          fromElementDescriptor: function(element) {
            var obj = {
              kind: element.kind,
              key: element.key,
              placement: element.placement,
              descriptor: element.descriptor
            };
            var desc = {
              value: "Descriptor",
              configurable: true
            };
            Object.defineProperty(obj, Symbol.toStringTag, desc);
            if (element.kind === "field") obj.initializer = element.initializer;
            return obj;
          },
          toElementDescriptors: function(elementObjects) {
            if (elementObjects === void 0) return;
            return _toArray(elementObjects).map(function(elementObject) {
              var element = this.toElementDescriptor(elementObject);
              this.disallowProperty(
                elementObject,
                "finisher",
                "An element descriptor"
              );
              this.disallowProperty(
                elementObject,
                "extras",
                "An element descriptor"
              );
              return element;
            }, this);
          },
          toElementDescriptor: function(elementObject) {
            var kind = String(elementObject.kind);
            if (kind !== "method" && kind !== "field") {
              throw new TypeError(
                `An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "` + kind + '"'
              );
            }
            var key = _toPropertyKey(elementObject.key);
            var placement = String(elementObject.placement);
            if (placement !== "static" && placement !== "prototype" && placement !== "own") {
              throw new TypeError(
                `An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "` + placement + '"'
              );
            }
            var descriptor = elementObject.descriptor;
            this.disallowProperty(
              elementObject,
              "elements",
              "An element descriptor"
            );
            var element = {
              kind,
              key,
              placement,
              descriptor: Object.assign({}, descriptor)
            };
            if (kind !== "field") {
              this.disallowProperty(
                elementObject,
                "initializer",
                "A method descriptor"
              );
            } else {
              this.disallowProperty(
                descriptor,
                "get",
                "The property descriptor of a field descriptor"
              );
              this.disallowProperty(
                descriptor,
                "set",
                "The property descriptor of a field descriptor"
              );
              this.disallowProperty(
                descriptor,
                "value",
                "The property descriptor of a field descriptor"
              );
              element.initializer = elementObject.initializer;
            }
            return element;
          },
          toElementFinisherExtras: function(elementObject) {
            var element = this.toElementDescriptor(elementObject);
            var finisher = _optionalCallableProperty(elementObject, "finisher");
            var extras = this.toElementDescriptors(elementObject.extras);
            return {
              element,
              finisher,
              extras
            };
          },
          fromClassDescriptor: function(elements) {
            var obj = {
              kind: "class",
              elements: elements.map(this.fromElementDescriptor, this)
            };
            var desc = {
              value: "Descriptor",
              configurable: true
            };
            Object.defineProperty(obj, Symbol.toStringTag, desc);
            return obj;
          },
          toClassDescriptor: function(obj) {
            var kind = String(obj.kind);
            if (kind !== "class") {
              throw new TypeError(
                `A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "` + kind + '"'
              );
            }
            this.disallowProperty(obj, "key", "A class descriptor");
            this.disallowProperty(obj, "placement", "A class descriptor");
            this.disallowProperty(obj, "descriptor", "A class descriptor");
            this.disallowProperty(obj, "initializer", "A class descriptor");
            this.disallowProperty(obj, "extras", "A class descriptor");
            var finisher = _optionalCallableProperty(obj, "finisher");
            var elements = this.toElementDescriptors(obj.elements);
            return {
              elements,
              finisher
            };
          },
          runClassFinishers: function(constructor, finishers) {
            for (var i = 0; i < finishers.length; i++) {
              var newConstructor = (0, finishers[i])(constructor);
              if (newConstructor !== void 0) {
                if (typeof newConstructor !== "function") {
                  throw new TypeError("Finishers must return a constructor.");
                }
                constructor = newConstructor;
              }
            }
            return constructor;
          },
          disallowProperty: function(obj, name, objectType) {
            if (obj[name] !== void 0) {
              throw new TypeError(
                objectType + " can't have a ." + name + " property."
              );
            }
          }
        };
        return api;
      }
      function _createElementDescriptor(def) {
        var key = _toPropertyKey(def.key);
        var descriptor;
        if (def.kind === "method") {
          descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "get") {
          descriptor = {
            get: def.value,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "set") {
          descriptor = {
            set: def.value,
            configurable: true,
            enumerable: false
          };
        } else if (def.kind === "field") {
          descriptor = {
            configurable: true,
            writable: true,
            enumerable: true
          };
        }
        var element = {
          kind: def.kind === "field" ? "field" : "method",
          key,
          placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
          descriptor
        };
        if (def.decorators) element.decorators = def.decorators;
        if (def.kind === "field") element.initializer = def.value;
        return element;
      }
      function _coalesceGetterSetter(element, other) {
        if (element.descriptor.get !== void 0) {
          other.descriptor.get = element.descriptor.get;
        } else {
          other.descriptor.set = element.descriptor.set;
        }
      }
      function _coalesceClassElements(elements) {
        var newElements = [];
        var isSameElement = function(other2) {
          return other2.kind === "method" && other2.key === element.key && other2.placement === element.placement;
        };
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var other;
          if (element.kind === "method" && (other = newElements.find(isSameElement))) {
            if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
              if (_hasDecorators(element) || _hasDecorators(other)) {
                throw new ReferenceError(
                  "Duplicated methods (" + element.key + ") can't be decorated."
                );
              }
              other.descriptor = element.descriptor;
            } else {
              if (_hasDecorators(element)) {
                if (_hasDecorators(other)) {
                  throw new ReferenceError(
                    "Decorators can't be placed on different accessors with for the same property (" + element.key + ")."
                  );
                }
                other.decorators = element.decorators;
              }
              _coalesceGetterSetter(element, other);
            }
          } else {
            newElements.push(element);
          }
        }
        return newElements;
      }
      function _hasDecorators(element) {
        return element.decorators && element.decorators.length;
      }
      function _isDataDescriptor(desc) {
        return desc !== void 0 && !(desc.value === void 0 && desc.writable === void 0);
      }
      function _optionalCallableProperty(obj, name) {
        var value = obj[name];
        if (value !== void 0 && typeof value !== "function") {
          throw new TypeError("Expected '" + name + "' to be a function");
        }
        return value;
      }
      function _classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
      }
      function _classPrivateMethodSet() {
        throw new TypeError("attempted to reassign private method");
      }
      function _wrapRegExp(re, groups) {
        _wrapRegExp = function(re2, groups2) {
          return new BabelRegExp(re2, groups2);
        };
        var _RegExp = _wrapNativeSuper(RegExp);
        var _super = RegExp.prototype;
        var _groups = /* @__PURE__ */ new WeakMap();
        function BabelRegExp(re2, groups2) {
          var _this = _RegExp.call(this, re2);
          _groups.set(_this, groups2);
          return _this;
        }
        _inherits(BabelRegExp, _RegExp);
        BabelRegExp.prototype.exec = function(str) {
          var result = _super.exec.call(this, str);
          if (result) result.groups = buildGroups(result, this);
          return result;
        };
        BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
          if (typeof substitution === "string") {
            var groups2 = _groups.get(this);
            return _super[Symbol.replace].call(
              this,
              str,
              substitution.replace(/\$<([^>]+)>/g, function(_, name) {
                return "$" + groups2[name];
              })
            );
          } else if (typeof substitution === "function") {
            var _this = this;
            return _super[Symbol.replace].call(this, str, function() {
              var args = [];
              args.push.apply(args, arguments);
              if (typeof args[args.length - 1] !== "object") {
                args.push(buildGroups(args, _this));
              }
              return substitution.apply(this, args);
            });
          } else {
            return _super[Symbol.replace].call(this, str, substitution);
          }
        };
        function buildGroups(result, re2) {
          var g = _groups.get(re2);
          return Object.keys(g).reduce(function(groups2, name) {
            groups2[name] = result[g[name]];
            return groups2;
          }, /* @__PURE__ */ Object.create(null));
        }
        return _wrapRegExp.apply(this, arguments);
      }
      var vectorMultiply = function vectorMultiply2(v, amount) {
        return createVector(v.x * amount, v.y * amount);
      };
      var vectorAdd = function vectorAdd2(a, b) {
        return createVector(a.x + b.x, a.y + b.y);
      };
      var vectorNormalize = function vectorNormalize2(v) {
        var l = Math.sqrt(v.x * v.x + v.y * v.y);
        if (l === 0) {
          return {
            x: 0,
            y: 0
          };
        }
        return createVector(v.x / l, v.y / l);
      };
      var vectorRotate = function vectorRotate2(v, radians, origin) {
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var t = createVector(v.x - origin.x, v.y - origin.y);
        return createVector(
          origin.x + cos * t.x - sin * t.y,
          origin.y + sin * t.x + cos * t.y
        );
      };
      var createVector = function createVector2() {
        var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        return { x, y };
      };
      var getMarkupValue = function getMarkupValue2(value, size) {
        var scalar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var axis = arguments.length > 3 ? arguments[3] : void 0;
        if (typeof value === "string") {
          return parseFloat(value) * scalar;
        }
        if (typeof value === "number") {
          return value * (axis ? size[axis] : Math.min(size.width, size.height));
        }
        return;
      };
      var getMarkupStyles = function getMarkupStyles2(markup, size, scale) {
        var lineStyle = markup.borderStyle || markup.lineStyle || "solid";
        var fill = markup.backgroundColor || markup.fontColor || "transparent";
        var stroke = markup.borderColor || markup.lineColor || "transparent";
        var strokeWidth = getMarkupValue(
          markup.borderWidth || markup.lineWidth,
          size,
          scale
        );
        var lineCap = markup.lineCap || "round";
        var lineJoin = markup.lineJoin || "round";
        var dashes = typeof lineStyle === "string" ? "" : lineStyle.map(function(v) {
          return getMarkupValue(v, size, scale);
        }).join(",");
        var opacity = markup.opacity || 1;
        return {
          "stroke-linecap": lineCap,
          "stroke-linejoin": lineJoin,
          "stroke-width": strokeWidth || 0,
          "stroke-dasharray": dashes,
          stroke,
          fill,
          opacity
        };
      };
      var isDefined = function isDefined2(value) {
        return value != null;
      };
      var getMarkupRect = function getMarkupRect2(rect, size) {
        var scalar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var left = getMarkupValue(rect.x, size, scalar, "width") || getMarkupValue(rect.left, size, scalar, "width");
        var top = getMarkupValue(rect.y, size, scalar, "height") || getMarkupValue(rect.top, size, scalar, "height");
        var width = getMarkupValue(rect.width, size, scalar, "width");
        var height = getMarkupValue(rect.height, size, scalar, "height");
        var right = getMarkupValue(rect.right, size, scalar, "width");
        var bottom = getMarkupValue(rect.bottom, size, scalar, "height");
        if (!isDefined(top)) {
          if (isDefined(height) && isDefined(bottom)) {
            top = size.height - height - bottom;
          } else {
            top = bottom;
          }
        }
        if (!isDefined(left)) {
          if (isDefined(width) && isDefined(right)) {
            left = size.width - width - right;
          } else {
            left = right;
          }
        }
        if (!isDefined(width)) {
          if (isDefined(left) && isDefined(right)) {
            width = size.width - left - right;
          } else {
            width = 0;
          }
        }
        if (!isDefined(height)) {
          if (isDefined(top) && isDefined(bottom)) {
            height = size.height - top - bottom;
          } else {
            height = 0;
          }
        }
        return {
          x: left || 0,
          y: top || 0,
          width: width || 0,
          height: height || 0
        };
      };
      var pointsToPathShape = function pointsToPathShape2(points) {
        return points.map(function(point, index) {
          return "".concat(index === 0 ? "M" : "L", " ").concat(point.x, " ").concat(point.y);
        }).join(" ");
      };
      var setAttributes = function setAttributes2(element, attr) {
        return Object.keys(attr).forEach(function(key) {
          return element.setAttribute(key, attr[key]);
        });
      };
      var ns = "http://www.w3.org/2000/svg";
      var svg = function svg2(tag, attr) {
        var element = document.createElementNS(ns, tag);
        if (attr) {
          setAttributes(element, attr);
        }
        return element;
      };
      var updateRect = function updateRect2(element) {
        return setAttributes(
          element,
          Object.assign({}, element.rect, element.styles)
        );
      };
      var updateEllipse = function updateEllipse2(element) {
        var cx = element.rect.x + element.rect.width * 0.5;
        var cy = element.rect.y + element.rect.height * 0.5;
        var rx = element.rect.width * 0.5;
        var ry = element.rect.height * 0.5;
        return setAttributes(
          element,
          Object.assign(
            {
              cx,
              cy,
              rx,
              ry
            },
            element.styles
          )
        );
      };
      var IMAGE_FIT_STYLE = {
        contain: "xMidYMid meet",
        cover: "xMidYMid slice"
      };
      var updateImage = function updateImage2(element, markup) {
        setAttributes(
          element,
          Object.assign({}, element.rect, element.styles, {
            preserveAspectRatio: IMAGE_FIT_STYLE[markup.fit] || "none"
          })
        );
      };
      var TEXT_ANCHOR = {
        left: "start",
        center: "middle",
        right: "end"
      };
      var updateText = function updateText2(element, markup, size, scale) {
        var fontSize = getMarkupValue(markup.fontSize, size, scale);
        var fontFamily = markup.fontFamily || "sans-serif";
        var fontWeight = markup.fontWeight || "normal";
        var textAlign = TEXT_ANCHOR[markup.textAlign] || "start";
        setAttributes(
          element,
          Object.assign({}, element.rect, element.styles, {
            "stroke-width": 0,
            "font-weight": fontWeight,
            "font-size": fontSize,
            "font-family": fontFamily,
            "text-anchor": textAlign
          })
        );
        if (element.text !== markup.text) {
          element.text = markup.text;
          element.textContent = markup.text.length ? markup.text : " ";
        }
      };
      var updateLine = function updateLine2(element, markup, size, scale) {
        setAttributes(
          element,
          Object.assign({}, element.rect, element.styles, {
            fill: "none"
          })
        );
        var line = element.childNodes[0];
        var begin = element.childNodes[1];
        var end = element.childNodes[2];
        var origin = element.rect;
        var target = {
          x: element.rect.x + element.rect.width,
          y: element.rect.y + element.rect.height
        };
        setAttributes(line, {
          x1: origin.x,
          y1: origin.y,
          x2: target.x,
          y2: target.y
        });
        if (!markup.lineDecoration) return;
        begin.style.display = "none";
        end.style.display = "none";
        var v = vectorNormalize({
          x: target.x - origin.x,
          y: target.y - origin.y
        });
        var l = getMarkupValue(0.05, size, scale);
        if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
          var arrowBeginRotationPoint = vectorMultiply(v, l);
          var arrowBeginCenter = vectorAdd(origin, arrowBeginRotationPoint);
          var arrowBeginA = vectorRotate(origin, 2, arrowBeginCenter);
          var arrowBeginB = vectorRotate(origin, -2, arrowBeginCenter);
          setAttributes(begin, {
            style: "display:block;",
            d: "M".concat(arrowBeginA.x, ",").concat(arrowBeginA.y, " L").concat(origin.x, ",").concat(origin.y, " L").concat(arrowBeginB.x, ",").concat(arrowBeginB.y)
          });
        }
        if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
          var arrowEndRotationPoint = vectorMultiply(v, -l);
          var arrowEndCenter = vectorAdd(target, arrowEndRotationPoint);
          var arrowEndA = vectorRotate(target, 2, arrowEndCenter);
          var arrowEndB = vectorRotate(target, -2, arrowEndCenter);
          setAttributes(end, {
            style: "display:block;",
            d: "M".concat(arrowEndA.x, ",").concat(arrowEndA.y, " L").concat(target.x, ",").concat(target.y, " L").concat(arrowEndB.x, ",").concat(arrowEndB.y)
          });
        }
      };
      var updatePath = function updatePath2(element, markup, size, scale) {
        setAttributes(
          element,
          Object.assign({}, element.styles, {
            fill: "none",
            d: pointsToPathShape(
              markup.points.map(function(point) {
                return {
                  x: getMarkupValue(point.x, size, scale, "width"),
                  y: getMarkupValue(point.y, size, scale, "height")
                };
              })
            )
          })
        );
      };
      var createShape = function createShape2(node) {
        return function(markup) {
          return svg(node, { id: markup.id });
        };
      };
      var createImage = function createImage2(markup) {
        var shape = svg("image", {
          id: markup.id,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: "0"
        });
        shape.onload = function() {
          shape.setAttribute("opacity", markup.opacity || 1);
        };
        shape.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          markup.src
        );
        return shape;
      };
      var createLine = function createLine2(markup) {
        var shape = svg("g", {
          id: markup.id,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        });
        var line = svg("line");
        shape.appendChild(line);
        var begin = svg("path");
        shape.appendChild(begin);
        var end = svg("path");
        shape.appendChild(end);
        return shape;
      };
      var CREATE_TYPE_ROUTES = {
        image: createImage,
        rect: createShape("rect"),
        ellipse: createShape("ellipse"),
        text: createShape("text"),
        path: createShape("path"),
        line: createLine
      };
      var UPDATE_TYPE_ROUTES = {
        rect: updateRect,
        ellipse: updateEllipse,
        image: updateImage,
        text: updateText,
        path: updatePath,
        line: updateLine
      };
      var createMarkupByType = function createMarkupByType2(type, markup) {
        return CREATE_TYPE_ROUTES[type](markup);
      };
      var updateMarkupByType = function updateMarkupByType2(element, type, markup, size, scale) {
        if (type !== "path") {
          element.rect = getMarkupRect(markup, size, scale);
        }
        element.styles = getMarkupStyles(markup, size, scale);
        UPDATE_TYPE_ROUTES[type](element, markup, size, scale);
      };
      var MARKUP_RECT = [
        "x",
        "y",
        "left",
        "top",
        "right",
        "bottom",
        "width",
        "height"
      ];
      var toOptionalFraction = function toOptionalFraction2(value) {
        return typeof value === "string" && /%/.test(value) ? parseFloat(value) / 100 : value;
      };
      var prepareMarkup = function prepareMarkup2(markup) {
        var _markup = _slicedToArray(markup, 2), type = _markup[0], props = _markup[1];
        var rect = props.points ? {} : MARKUP_RECT.reduce(function(prev, curr) {
          prev[curr] = toOptionalFraction(props[curr]);
          return prev;
        }, {});
        return [
          type,
          Object.assign(
            {
              zIndex: 0
            },
            props,
            rect
          )
        ];
      };
      var sortMarkupByZIndex = function sortMarkupByZIndex2(a, b) {
        if (a[1].zIndex > b[1].zIndex) {
          return 1;
        }
        if (a[1].zIndex < b[1].zIndex) {
          return -1;
        }
        return 0;
      };
      var createMarkupView = function createMarkupView2(_) {
        return _.utils.createView({
          name: "image-preview-markup",
          tag: "svg",
          ignoreRect: true,
          mixins: {
            apis: ["width", "height", "crop", "markup", "resize", "dirty"]
          },
          write: function write(_ref) {
            var root = _ref.root, props = _ref.props;
            if (!props.dirty) return;
            var crop = props.crop, resize = props.resize, markup = props.markup;
            var viewWidth = props.width;
            var viewHeight = props.height;
            var cropWidth = crop.width;
            var cropHeight = crop.height;
            if (resize) {
              var _size = resize.size;
              var outputWidth = _size && _size.width;
              var outputHeight = _size && _size.height;
              var outputFit = resize.mode;
              var outputUpscale = resize.upscale;
              if (outputWidth && !outputHeight) outputHeight = outputWidth;
              if (outputHeight && !outputWidth) outputWidth = outputHeight;
              var shouldUpscale = cropWidth < outputWidth && cropHeight < outputHeight;
              if (!shouldUpscale || shouldUpscale && outputUpscale) {
                var scalarWidth = outputWidth / cropWidth;
                var scalarHeight = outputHeight / cropHeight;
                if (outputFit === "force") {
                  cropWidth = outputWidth;
                  cropHeight = outputHeight;
                } else {
                  var scalar;
                  if (outputFit === "cover") {
                    scalar = Math.max(scalarWidth, scalarHeight);
                  } else if (outputFit === "contain") {
                    scalar = Math.min(scalarWidth, scalarHeight);
                  }
                  cropWidth = cropWidth * scalar;
                  cropHeight = cropHeight * scalar;
                }
              }
            }
            var size = {
              width: viewWidth,
              height: viewHeight
            };
            root.element.setAttribute("width", size.width);
            root.element.setAttribute("height", size.height);
            var scale = Math.min(viewWidth / cropWidth, viewHeight / cropHeight);
            root.element.innerHTML = "";
            var markupFilter = root.query("GET_IMAGE_PREVIEW_MARKUP_FILTER");
            markup.filter(markupFilter).map(prepareMarkup).sort(sortMarkupByZIndex).forEach(function(markup2) {
              var _markup = _slicedToArray(markup2, 2), type = _markup[0], settings = _markup[1];
              var element = createMarkupByType(type, settings);
              updateMarkupByType(element, type, settings, size, scale);
              root.element.appendChild(element);
            });
          }
        });
      };
      var createVector$1 = function createVector2(x, y) {
        return { x, y };
      };
      var vectorDot = function vectorDot2(a, b) {
        return a.x * b.x + a.y * b.y;
      };
      var vectorSubtract = function vectorSubtract2(a, b) {
        return createVector$1(a.x - b.x, a.y - b.y);
      };
      var vectorDistanceSquared = function vectorDistanceSquared2(a, b) {
        return vectorDot(vectorSubtract(a, b), vectorSubtract(a, b));
      };
      var vectorDistance = function vectorDistance2(a, b) {
        return Math.sqrt(vectorDistanceSquared(a, b));
      };
      var getOffsetPointOnEdge = function getOffsetPointOnEdge2(length, rotation) {
        var a = length;
        var A = 1.5707963267948966;
        var B = rotation;
        var C = 1.5707963267948966 - rotation;
        var sinA = Math.sin(A);
        var sinB = Math.sin(B);
        var sinC = Math.sin(C);
        var cosC = Math.cos(C);
        var ratio = a / sinA;
        var b = ratio * sinB;
        var c = ratio * sinC;
        return createVector$1(cosC * b, cosC * c);
      };
      var getRotatedRectSize = function getRotatedRectSize2(rect, rotation) {
        var w = rect.width;
        var h = rect.height;
        var hor = getOffsetPointOnEdge(w, rotation);
        var ver = getOffsetPointOnEdge(h, rotation);
        var tl = createVector$1(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));
        var tr = createVector$1(
          rect.x + rect.width + Math.abs(ver.y),
          rect.y + Math.abs(ver.x)
        );
        var bl = createVector$1(
          rect.x - Math.abs(ver.y),
          rect.y + rect.height - Math.abs(ver.x)
        );
        return {
          width: vectorDistance(tl, tr),
          height: vectorDistance(tl, bl)
        };
      };
      var calculateCanvasSize = function calculateCanvasSize2(image, canvasAspectRatio) {
        var zoom = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var imageAspectRatio = image.height / image.width;
        var canvasWidth = 1;
        var canvasHeight = canvasAspectRatio;
        var imgWidth = 1;
        var imgHeight = imageAspectRatio;
        if (imgHeight > canvasHeight) {
          imgHeight = canvasHeight;
          imgWidth = imgHeight / imageAspectRatio;
        }
        var scalar = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        var width = image.width / (zoom * scalar * imgWidth);
        var height = width * canvasAspectRatio;
        return {
          width,
          height
        };
      };
      var getImageRectZoomFactor = function getImageRectZoomFactor2(imageRect, cropRect, rotation, center2) {
        var cx = center2.x > 0.5 ? 1 - center2.x : center2.x;
        var cy = center2.y > 0.5 ? 1 - center2.y : center2.y;
        var imageWidth = cx * 2 * imageRect.width;
        var imageHeight = cy * 2 * imageRect.height;
        var rotatedCropSize = getRotatedRectSize(cropRect, rotation);
        return Math.max(
          rotatedCropSize.width / imageWidth,
          rotatedCropSize.height / imageHeight
        );
      };
      var getCenteredCropRect = function getCenteredCropRect2(container, aspectRatio) {
        var width = container.width;
        var height = width * aspectRatio;
        if (height > container.height) {
          height = container.height;
          width = height / aspectRatio;
        }
        var x = (container.width - width) * 0.5;
        var y = (container.height - height) * 0.5;
        return {
          x,
          y,
          width,
          height
        };
      };
      var getCurrentCropSize = function getCurrentCropSize2(imageSize) {
        var crop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var zoom = crop.zoom, rotation = crop.rotation, center2 = crop.center, aspectRatio = crop.aspectRatio;
        if (!aspectRatio) aspectRatio = imageSize.height / imageSize.width;
        var canvasSize = calculateCanvasSize(imageSize, aspectRatio, zoom);
        var canvasCenter = {
          x: canvasSize.width * 0.5,
          y: canvasSize.height * 0.5
        };
        var stage = {
          x: 0,
          y: 0,
          width: canvasSize.width,
          height: canvasSize.height,
          center: canvasCenter
        };
        var shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
        var stageZoomFactor = getImageRectZoomFactor(
          imageSize,
          getCenteredCropRect(stage, aspectRatio),
          rotation,
          shouldLimit ? center2 : { x: 0.5, y: 0.5 }
        );
        var scale = zoom * stageZoomFactor;
        return {
          widthFloat: canvasSize.width / scale,
          heightFloat: canvasSize.height / scale,
          width: Math.round(canvasSize.width / scale),
          height: Math.round(canvasSize.height / scale)
        };
      };
      var IMAGE_SCALE_SPRING_PROPS = {
        type: "spring",
        stiffness: 0.5,
        damping: 0.45,
        mass: 10
      };
      var createBitmapView = function createBitmapView2(_) {
        return _.utils.createView({
          name: "image-bitmap",
          ignoreRect: true,
          mixins: { styles: ["scaleX", "scaleY"] },
          create: function create2(_ref) {
            var root = _ref.root, props = _ref.props;
            root.appendChild(props.image);
          }
        });
      };
      var createImageCanvasWrapper = function createImageCanvasWrapper2(_) {
        return _.utils.createView({
          name: "image-canvas-wrapper",
          tag: "div",
          ignoreRect: true,
          mixins: {
            apis: ["crop", "width", "height"],
            styles: [
              "originX",
              "originY",
              "translateX",
              "translateY",
              "scaleX",
              "scaleY",
              "rotateZ"
            ],
            animations: {
              originX: IMAGE_SCALE_SPRING_PROPS,
              originY: IMAGE_SCALE_SPRING_PROPS,
              scaleX: IMAGE_SCALE_SPRING_PROPS,
              scaleY: IMAGE_SCALE_SPRING_PROPS,
              translateX: IMAGE_SCALE_SPRING_PROPS,
              translateY: IMAGE_SCALE_SPRING_PROPS,
              rotateZ: IMAGE_SCALE_SPRING_PROPS
            }
          },
          create: function create2(_ref2) {
            var root = _ref2.root, props = _ref2.props;
            props.width = props.image.width;
            props.height = props.image.height;
            root.ref.bitmap = root.appendChildView(
              root.createChildView(createBitmapView(_), { image: props.image })
            );
          },
          write: function write(_ref3) {
            var root = _ref3.root, props = _ref3.props;
            var flip = props.crop.flip;
            var bitmap = root.ref.bitmap;
            bitmap.scaleX = flip.horizontal ? -1 : 1;
            bitmap.scaleY = flip.vertical ? -1 : 1;
          }
        });
      };
      var createClipView = function createClipView2(_) {
        return _.utils.createView({
          name: "image-clip",
          tag: "div",
          ignoreRect: true,
          mixins: {
            apis: [
              "crop",
              "markup",
              "resize",
              "width",
              "height",
              "dirty",
              "background"
            ],
            styles: ["width", "height", "opacity"],
            animations: {
              opacity: { type: "tween", duration: 250 }
            }
          },
          didWriteView: function didWriteView(_ref4) {
            var root = _ref4.root, props = _ref4.props;
            if (!props.background) return;
            root.element.style.backgroundColor = props.background;
          },
          create: function create2(_ref5) {
            var root = _ref5.root, props = _ref5.props;
            root.ref.image = root.appendChildView(
              root.createChildView(
                createImageCanvasWrapper(_),
                Object.assign({}, props)
              )
            );
            root.ref.createMarkup = function() {
              if (root.ref.markup) return;
              root.ref.markup = root.appendChildView(
                root.createChildView(createMarkupView(_), Object.assign({}, props))
              );
            };
            root.ref.destroyMarkup = function() {
              if (!root.ref.markup) return;
              root.removeChildView(root.ref.markup);
              root.ref.markup = null;
            };
            var transparencyIndicator = root.query(
              "GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR"
            );
            if (transparencyIndicator === null) return;
            if (transparencyIndicator === "grid") {
              root.element.dataset.transparencyIndicator = transparencyIndicator;
            } else {
              root.element.dataset.transparencyIndicator = "color";
            }
          },
          write: function write(_ref6) {
            var root = _ref6.root, props = _ref6.props, shouldOptimize = _ref6.shouldOptimize;
            var crop = props.crop, markup = props.markup, resize = props.resize, dirty = props.dirty, width = props.width, height = props.height;
            root.ref.image.crop = crop;
            var stage = {
              x: 0,
              y: 0,
              width,
              height,
              center: {
                x: width * 0.5,
                y: height * 0.5
              }
            };
            var image = {
              width: root.ref.image.width,
              height: root.ref.image.height
            };
            var origin = {
              x: crop.center.x * image.width,
              y: crop.center.y * image.height
            };
            var translation = {
              x: stage.center.x - image.width * crop.center.x,
              y: stage.center.y - image.height * crop.center.y
            };
            var rotation = Math.PI * 2 + crop.rotation % (Math.PI * 2);
            var cropAspectRatio = crop.aspectRatio || image.height / image.width;
            var shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
            var stageZoomFactor = getImageRectZoomFactor(
              image,
              getCenteredCropRect(stage, cropAspectRatio),
              rotation,
              shouldLimit ? crop.center : { x: 0.5, y: 0.5 }
            );
            var scale = crop.zoom * stageZoomFactor;
            if (markup && markup.length) {
              root.ref.createMarkup();
              root.ref.markup.width = width;
              root.ref.markup.height = height;
              root.ref.markup.resize = resize;
              root.ref.markup.dirty = dirty;
              root.ref.markup.markup = markup;
              root.ref.markup.crop = getCurrentCropSize(image, crop);
            } else if (root.ref.markup) {
              root.ref.destroyMarkup();
            }
            var imageView = root.ref.image;
            if (shouldOptimize) {
              imageView.originX = null;
              imageView.originY = null;
              imageView.translateX = null;
              imageView.translateY = null;
              imageView.rotateZ = null;
              imageView.scaleX = null;
              imageView.scaleY = null;
              return;
            }
            imageView.originX = origin.x;
            imageView.originY = origin.y;
            imageView.translateX = translation.x;
            imageView.translateY = translation.y;
            imageView.rotateZ = rotation;
            imageView.scaleX = scale;
            imageView.scaleY = scale;
          }
        });
      };
      var createImageView = function createImageView2(_) {
        return _.utils.createView({
          name: "image-preview",
          tag: "div",
          ignoreRect: true,
          mixins: {
            apis: ["image", "crop", "markup", "resize", "dirty", "background"],
            styles: ["translateY", "scaleX", "scaleY", "opacity"],
            animations: {
              scaleX: IMAGE_SCALE_SPRING_PROPS,
              scaleY: IMAGE_SCALE_SPRING_PROPS,
              translateY: IMAGE_SCALE_SPRING_PROPS,
              opacity: { type: "tween", duration: 400 }
            }
          },
          create: function create2(_ref7) {
            var root = _ref7.root, props = _ref7.props;
            root.ref.clip = root.appendChildView(
              root.createChildView(createClipView(_), {
                id: props.id,
                image: props.image,
                crop: props.crop,
                markup: props.markup,
                resize: props.resize,
                dirty: props.dirty,
                background: props.background
              })
            );
          },
          write: function write(_ref8) {
            var root = _ref8.root, props = _ref8.props, shouldOptimize = _ref8.shouldOptimize;
            var clip = root.ref.clip;
            var image = props.image, crop = props.crop, markup = props.markup, resize = props.resize, dirty = props.dirty;
            clip.crop = crop;
            clip.markup = markup;
            clip.resize = resize;
            clip.dirty = dirty;
            clip.opacity = shouldOptimize ? 0 : 1;
            if (shouldOptimize || root.rect.element.hidden) return;
            var imageAspectRatio = image.height / image.width;
            var aspectRatio = crop.aspectRatio || imageAspectRatio;
            var containerWidth = root.rect.inner.width;
            var containerHeight = root.rect.inner.height;
            var fixedPreviewHeight = root.query("GET_IMAGE_PREVIEW_HEIGHT");
            var minPreviewHeight = root.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
            var maxPreviewHeight = root.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
            var panelAspectRatio = root.query("GET_PANEL_ASPECT_RATIO");
            var allowMultiple = root.query("GET_ALLOW_MULTIPLE");
            if (panelAspectRatio && !allowMultiple) {
              fixedPreviewHeight = containerWidth * panelAspectRatio;
              aspectRatio = panelAspectRatio;
            }
            var clipHeight = fixedPreviewHeight !== null ? fixedPreviewHeight : Math.max(
              minPreviewHeight,
              Math.min(containerWidth * aspectRatio, maxPreviewHeight)
            );
            var clipWidth = clipHeight / aspectRatio;
            if (clipWidth > containerWidth) {
              clipWidth = containerWidth;
              clipHeight = clipWidth * aspectRatio;
            }
            if (clipHeight > containerHeight) {
              clipHeight = containerHeight;
              clipWidth = containerHeight / aspectRatio;
            }
            clip.width = clipWidth;
            clip.height = clipHeight;
          }
        });
      };
      var SVG_MASK = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
    <defs>
        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">
            <stop offset='50%' stop-color='#000000'/>
            <stop offset='56%' stop-color='#0a0a0a'/>
            <stop offset='63%' stop-color='#262626'/>
            <stop offset='69%' stop-color='#4f4f4f'/>
            <stop offset='75%' stop-color='#808080'/>
            <stop offset='81%' stop-color='#b1b1b1'/>
            <stop offset='88%' stop-color='#dadada'/>
            <stop offset='94%' stop-color='#f6f6f6'/>
            <stop offset='100%' stop-color='#ffffff'/>
        </radialGradient>
        <mask id="mask-__UID__">
            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>
        </mask>
    </defs>
    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>
</svg>`;
      var SVGMaskUniqueId = 0;
      var createImageOverlayView = function createImageOverlayView2(fpAPI) {
        return fpAPI.utils.createView({
          name: "image-preview-overlay",
          tag: "div",
          ignoreRect: true,
          create: function create2(_ref) {
            var root = _ref.root, props = _ref.props;
            var mask = SVG_MASK;
            if (document.querySelector("base")) {
              var url = new URL(
                window.location.href.replace(window.location.hash, "")
              ).href;
              mask = mask.replace(/url\(\#/g, "url(" + url + "#");
            }
            SVGMaskUniqueId++;
            root.element.classList.add(
              "filepond--image-preview-overlay-".concat(props.status)
            );
            root.element.innerHTML = mask.replace(/__UID__/g, SVGMaskUniqueId);
          },
          mixins: {
            styles: ["opacity"],
            animations: {
              opacity: { type: "spring", mass: 25 }
            }
          }
        });
      };
      var BitmapWorker = function BitmapWorker2() {
        self.onmessage = function(e) {
          createImageBitmap(e.data.message.file).then(function(bitmap) {
            self.postMessage({ id: e.data.id, message: bitmap }, [bitmap]);
          });
        };
      };
      var ColorMatrixWorker = function ColorMatrixWorker2() {
        self.onmessage = function(e) {
          var imageData = e.data.message.imageData;
          var matrix = e.data.message.colorMatrix;
          var data2 = imageData.data;
          var l = data2.length;
          var m11 = matrix[0];
          var m12 = matrix[1];
          var m13 = matrix[2];
          var m14 = matrix[3];
          var m15 = matrix[4];
          var m21 = matrix[5];
          var m22 = matrix[6];
          var m23 = matrix[7];
          var m24 = matrix[8];
          var m25 = matrix[9];
          var m31 = matrix[10];
          var m32 = matrix[11];
          var m33 = matrix[12];
          var m34 = matrix[13];
          var m35 = matrix[14];
          var m41 = matrix[15];
          var m42 = matrix[16];
          var m43 = matrix[17];
          var m44 = matrix[18];
          var m45 = matrix[19];
          var index = 0, r = 0, g = 0, b = 0, a = 0;
          for (; index < l; index += 4) {
            r = data2[index] / 255;
            g = data2[index + 1] / 255;
            b = data2[index + 2] / 255;
            a = data2[index + 3] / 255;
            data2[index] = Math.max(
              0,
              Math.min((r * m11 + g * m12 + b * m13 + a * m14 + m15) * 255, 255)
            );
            data2[index + 1] = Math.max(
              0,
              Math.min((r * m21 + g * m22 + b * m23 + a * m24 + m25) * 255, 255)
            );
            data2[index + 2] = Math.max(
              0,
              Math.min((r * m31 + g * m32 + b * m33 + a * m34 + m35) * 255, 255)
            );
            data2[index + 3] = Math.max(
              0,
              Math.min((r * m41 + g * m42 + b * m43 + a * m44 + m45) * 255, 255)
            );
          }
          self.postMessage({ id: e.data.id, message: imageData }, [
            imageData.data.buffer
          ]);
        };
      };
      var getImageSize = function getImageSize2(url, cb) {
        var image = new Image();
        image.onload = function() {
          var width = image.naturalWidth;
          var height = image.naturalHeight;
          image = null;
          cb(width, height);
        };
        image.src = url;
      };
      var transforms = {
        1: function _() {
          return [1, 0, 0, 1, 0, 0];
        },
        2: function _(width) {
          return [-1, 0, 0, 1, width, 0];
        },
        3: function _(width, height) {
          return [-1, 0, 0, -1, width, height];
        },
        4: function _(width, height) {
          return [1, 0, 0, -1, 0, height];
        },
        5: function _() {
          return [0, 1, 1, 0, 0, 0];
        },
        6: function _(width, height) {
          return [0, 1, -1, 0, height, 0];
        },
        7: function _(width, height) {
          return [0, -1, -1, 0, height, width];
        },
        8: function _(width) {
          return [0, -1, 1, 0, 0, width];
        }
      };
      var fixImageOrientation = function fixImageOrientation2(ctx, width, height, orientation) {
        if (orientation === -1) {
          return;
        }
        ctx.transform.apply(ctx, transforms[orientation](width, height));
      };
      var createPreviewImage = function createPreviewImage2(data2, width, height, orientation) {
        width = Math.round(width);
        height = Math.round(height);
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        if (orientation >= 5 && orientation <= 8) {
          var _ref = [height, width];
          width = _ref[0];
          height = _ref[1];
        }
        fixImageOrientation(ctx, width, height, orientation);
        ctx.drawImage(data2, 0, 0, width, height);
        return canvas;
      };
      var isBitmap = function isBitmap2(file) {
        return /^image/.test(file.type) && !/svg/.test(file.type);
      };
      var MAX_WIDTH = 10;
      var MAX_HEIGHT = 10;
      var calculateAverageColor = function calculateAverageColor2(image) {
        var scalar = Math.min(MAX_WIDTH / image.width, MAX_HEIGHT / image.height);
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var width = canvas.width = Math.ceil(image.width * scalar);
        var height = canvas.height = Math.ceil(image.height * scalar);
        ctx.drawImage(image, 0, 0, width, height);
        var data2 = null;
        try {
          data2 = ctx.getImageData(0, 0, width, height).data;
        } catch (e) {
          return null;
        }
        var l = data2.length;
        var r = 0;
        var g = 0;
        var b = 0;
        var i = 0;
        for (; i < l; i += 4) {
          r += data2[i] * data2[i];
          g += data2[i + 1] * data2[i + 1];
          b += data2[i + 2] * data2[i + 2];
        }
        r = averageColor(r, l);
        g = averageColor(g, l);
        b = averageColor(b, l);
        return { r, g, b };
      };
      var averageColor = function averageColor2(c, l) {
        return Math.floor(Math.sqrt(c / (l / 4)));
      };
      var cloneCanvas = function cloneCanvas2(origin, target) {
        target = target || document.createElement("canvas");
        target.width = origin.width;
        target.height = origin.height;
        var ctx = target.getContext("2d");
        ctx.drawImage(origin, 0, 0);
        return target;
      };
      var cloneImageData = function cloneImageData2(imageData) {
        var id2;
        try {
          id2 = new ImageData(imageData.width, imageData.height);
        } catch (e) {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          id2 = ctx.createImageData(imageData.width, imageData.height);
        }
        id2.data.set(new Uint8ClampedArray(imageData.data));
        return id2;
      };
      var loadImage = function loadImage2(url) {
        return new Promise(function(resolve, reject) {
          var img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = function() {
            resolve(img);
          };
          img.onerror = function(e) {
            reject(e);
          };
          img.src = url;
        });
      };
      var createImageWrapperView = function createImageWrapperView2(_) {
        var OverlayView = createImageOverlayView(_);
        var ImageView = createImageView(_);
        var createWorker = _.utils.createWorker;
        var applyFilter = function applyFilter2(root, filter, target) {
          return new Promise(function(resolve) {
            if (!root.ref.imageData) {
              root.ref.imageData = target.getContext("2d").getImageData(0, 0, target.width, target.height);
            }
            var imageData = cloneImageData(root.ref.imageData);
            if (!filter || filter.length !== 20) {
              target.getContext("2d").putImageData(imageData, 0, 0);
              return resolve();
            }
            var worker = createWorker(ColorMatrixWorker);
            worker.post(
              {
                imageData,
                colorMatrix: filter
              },
              function(response) {
                target.getContext("2d").putImageData(response, 0, 0);
                worker.terminate();
                resolve();
              },
              [imageData.data.buffer]
            );
          });
        };
        var removeImageView = function removeImageView2(root, imageView) {
          root.removeChildView(imageView);
          imageView.image.width = 1;
          imageView.image.height = 1;
          imageView._destroy();
        };
        var shiftImage = function shiftImage2(_ref) {
          var root = _ref.root;
          var imageView = root.ref.images.shift();
          imageView.opacity = 0;
          imageView.translateY = -15;
          root.ref.imageViewBin.push(imageView);
          return imageView;
        };
        var pushImage = function pushImage2(_ref2) {
          var root = _ref2.root, props = _ref2.props, image = _ref2.image;
          var id2 = props.id;
          var item = root.query("GET_ITEM", { id: id2 });
          if (!item) return;
          var crop = item.getMetadata("crop") || {
            center: {
              x: 0.5,
              y: 0.5
            },
            flip: {
              horizontal: false,
              vertical: false
            },
            zoom: 1,
            rotation: 0,
            aspectRatio: null
          };
          var background = root.query(
            "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
          );
          var markup;
          var resize;
          var dirty = false;
          if (root.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
            markup = item.getMetadata("markup") || [];
            resize = item.getMetadata("resize");
            dirty = true;
          }
          var imageView = root.appendChildView(
            root.createChildView(ImageView, {
              id: id2,
              image,
              crop,
              resize,
              markup,
              dirty,
              background,
              opacity: 0,
              scaleX: 1.15,
              scaleY: 1.15,
              translateY: 15
            }),
            root.childViews.length
          );
          root.ref.images.push(imageView);
          imageView.opacity = 1;
          imageView.scaleX = 1;
          imageView.scaleY = 1;
          imageView.translateY = 0;
          setTimeout(function() {
            root.dispatch("DID_IMAGE_PREVIEW_SHOW", { id: id2 });
          }, 250);
        };
        var updateImage2 = function updateImage3(_ref3) {
          var root = _ref3.root, props = _ref3.props;
          var item = root.query("GET_ITEM", { id: props.id });
          if (!item) return;
          var imageView = root.ref.images[root.ref.images.length - 1];
          imageView.crop = item.getMetadata("crop");
          imageView.background = root.query(
            "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
          );
          if (root.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
            imageView.dirty = true;
            imageView.resize = item.getMetadata("resize");
            imageView.markup = item.getMetadata("markup");
          }
        };
        var didUpdateItemMetadata = function didUpdateItemMetadata2(_ref4) {
          var root = _ref4.root, props = _ref4.props, action = _ref4.action;
          if (!/crop|filter|markup|resize/.test(action.change.key)) return;
          if (!root.ref.images.length) return;
          var item = root.query("GET_ITEM", { id: props.id });
          if (!item) return;
          if (/filter/.test(action.change.key)) {
            var imageView = root.ref.images[root.ref.images.length - 1];
            applyFilter(root, action.change.value, imageView.image);
            return;
          }
          if (/crop|markup|resize/.test(action.change.key)) {
            var crop = item.getMetadata("crop");
            var image = root.ref.images[root.ref.images.length - 1];
            if (crop && crop.aspectRatio && image.crop && image.crop.aspectRatio && Math.abs(crop.aspectRatio - image.crop.aspectRatio) > 1e-5) {
              var _imageView = shiftImage({ root });
              pushImage({
                root,
                props,
                image: cloneCanvas(_imageView.image)
              });
            } else {
              updateImage2({ root, props });
            }
          }
        };
        var canCreateImageBitmap = function canCreateImageBitmap2(file) {
          var userAgent = window.navigator.userAgent;
          var isFirefox = userAgent.match(/Firefox\/([0-9]+)\./);
          var firefoxVersion = isFirefox ? parseInt(isFirefox[1]) : null;
          if (firefoxVersion !== null && firefoxVersion <= 58) return false;
          return "createImageBitmap" in window && isBitmap(file);
        };
        var didCreatePreviewContainer = function didCreatePreviewContainer2(_ref5) {
          var root = _ref5.root, props = _ref5.props;
          var id2 = props.id;
          var item = root.query("GET_ITEM", id2);
          if (!item) return;
          var fileURL = URL.createObjectURL(item.file);
          getImageSize(fileURL, function(width, height) {
            root.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
              id: id2,
              width,
              height
            });
          });
        };
        var drawPreview = function drawPreview2(_ref6) {
          var root = _ref6.root, props = _ref6.props;
          var id2 = props.id;
          var item = root.query("GET_ITEM", id2);
          if (!item) return;
          var fileURL = URL.createObjectURL(item.file);
          var loadPreviewFallback = function loadPreviewFallback2() {
            loadImage(fileURL).then(previewImageLoaded);
          };
          var previewImageLoaded = function previewImageLoaded2(imageData) {
            URL.revokeObjectURL(fileURL);
            var exif = item.getMetadata("exif") || {};
            var orientation = exif.orientation || -1;
            var width = imageData.width, height = imageData.height;
            if (!width || !height) return;
            if (orientation >= 5 && orientation <= 8) {
              var _ref7 = [height, width];
              width = _ref7[0];
              height = _ref7[1];
            }
            var pixelDensityFactor = Math.max(1, window.devicePixelRatio * 0.75);
            var zoomFactor = root.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR");
            var scaleFactor = zoomFactor * pixelDensityFactor;
            var previewImageRatio = height / width;
            var previewContainerWidth = root.rect.element.width;
            var previewContainerHeight = root.rect.element.height;
            var imageWidth = previewContainerWidth;
            var imageHeight = imageWidth * previewImageRatio;
            if (previewImageRatio > 1) {
              imageWidth = Math.min(width, previewContainerWidth * scaleFactor);
              imageHeight = imageWidth * previewImageRatio;
            } else {
              imageHeight = Math.min(height, previewContainerHeight * scaleFactor);
              imageWidth = imageHeight / previewImageRatio;
            }
            var previewImage = createPreviewImage(
              imageData,
              imageWidth,
              imageHeight,
              orientation
            );
            var done = function done2() {
              var averageColor2 = root.query(
                "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR"
              ) ? calculateAverageColor(data) : null;
              item.setMetadata("color", averageColor2, true);
              if ("close" in imageData) {
                imageData.close();
              }
              root.ref.overlayShadow.opacity = 1;
              pushImage({ root, props, image: previewImage });
            };
            var filter = item.getMetadata("filter");
            if (filter) {
              applyFilter(root, filter, previewImage).then(done);
            } else {
              done();
            }
          };
          if (canCreateImageBitmap(item.file)) {
            var worker = createWorker(BitmapWorker);
            worker.post(
              {
                file: item.file
              },
              function(imageBitmap) {
                worker.terminate();
                if (!imageBitmap) {
                  loadPreviewFallback();
                  return;
                }
                previewImageLoaded(imageBitmap);
              }
            );
          } else {
            loadPreviewFallback();
          }
        };
        var didDrawPreview = function didDrawPreview2(_ref8) {
          var root = _ref8.root;
          var image = root.ref.images[root.ref.images.length - 1];
          image.translateY = 0;
          image.scaleX = 1;
          image.scaleY = 1;
          image.opacity = 1;
        };
        var restoreOverlay = function restoreOverlay2(_ref9) {
          var root = _ref9.root;
          root.ref.overlayShadow.opacity = 1;
          root.ref.overlayError.opacity = 0;
          root.ref.overlaySuccess.opacity = 0;
        };
        var didThrowError = function didThrowError2(_ref10) {
          var root = _ref10.root;
          root.ref.overlayShadow.opacity = 0.25;
          root.ref.overlayError.opacity = 1;
        };
        var didCompleteProcessing = function didCompleteProcessing2(_ref11) {
          var root = _ref11.root;
          root.ref.overlayShadow.opacity = 0.25;
          root.ref.overlaySuccess.opacity = 1;
        };
        var create2 = function create3(_ref12) {
          var root = _ref12.root;
          root.ref.images = [];
          root.ref.imageData = null;
          root.ref.imageViewBin = [];
          root.ref.overlayShadow = root.appendChildView(
            root.createChildView(OverlayView, {
              opacity: 0,
              status: "idle"
            })
          );
          root.ref.overlaySuccess = root.appendChildView(
            root.createChildView(OverlayView, {
              opacity: 0,
              status: "success"
            })
          );
          root.ref.overlayError = root.appendChildView(
            root.createChildView(OverlayView, {
              opacity: 0,
              status: "failure"
            })
          );
        };
        return _.utils.createView({
          name: "image-preview-wrapper",
          create: create2,
          styles: ["height"],
          apis: ["height"],
          destroy: function destroy(_ref13) {
            var root = _ref13.root;
            root.ref.images.forEach(function(imageView) {
              imageView.image.width = 1;
              imageView.image.height = 1;
            });
          },
          didWriteView: function didWriteView(_ref14) {
            var root = _ref14.root;
            root.ref.images.forEach(function(imageView) {
              imageView.dirty = false;
            });
          },
          write: _.utils.createRoute(
            {
              // image preview stated
              DID_IMAGE_PREVIEW_DRAW: didDrawPreview,
              DID_IMAGE_PREVIEW_CONTAINER_CREATE: didCreatePreviewContainer,
              DID_FINISH_CALCULATE_PREVIEWSIZE: drawPreview,
              DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata,
              // file states
              DID_THROW_ITEM_LOAD_ERROR: didThrowError,
              DID_THROW_ITEM_PROCESSING_ERROR: didThrowError,
              DID_THROW_ITEM_INVALID: didThrowError,
              DID_COMPLETE_ITEM_PROCESSING: didCompleteProcessing,
              DID_START_ITEM_PROCESSING: restoreOverlay,
              DID_REVERT_ITEM_PROCESSING: restoreOverlay
            },
            function(_ref15) {
              var root = _ref15.root;
              var viewsToRemove = root.ref.imageViewBin.filter(function(imageView) {
                return imageView.opacity === 0;
              });
              root.ref.imageViewBin = root.ref.imageViewBin.filter(function(imageView) {
                return imageView.opacity > 0;
              });
              viewsToRemove.forEach(function(imageView) {
                return removeImageView(root, imageView);
              });
              viewsToRemove.length = 0;
            }
          )
        });
      };
      var plugin = function plugin2(fpAPI) {
        var addFilter = fpAPI.addFilter, utils = fpAPI.utils;
        var Type = utils.Type, createRoute = utils.createRoute, isFile = utils.isFile;
        var imagePreviewView = createImageWrapperView(fpAPI);
        addFilter("CREATE_VIEW", function(viewAPI) {
          var is = viewAPI.is, view = viewAPI.view, query = viewAPI.query;
          if (!is("file") || !query("GET_ALLOW_IMAGE_PREVIEW")) return;
          var didLoadItem = function didLoadItem2(_ref) {
            var root = _ref.root, props = _ref.props;
            var id2 = props.id;
            var item = query("GET_ITEM", id2);
            if (!item || !isFile(item.file) || item.archived) return;
            var file = item.file;
            if (!isPreviewableImage(file)) return;
            if (!query("GET_IMAGE_PREVIEW_FILTER_ITEM")(item)) return;
            var supportsCreateImageBitmap = "createImageBitmap" in (window || {});
            var maxPreviewFileSize = query("GET_IMAGE_PREVIEW_MAX_FILE_SIZE");
            if (!supportsCreateImageBitmap && maxPreviewFileSize && file.size > maxPreviewFileSize)
              return;
            root.ref.imagePreview = view.appendChildView(
              view.createChildView(imagePreviewView, { id: id2 })
            );
            var fixedPreviewHeight = root.query("GET_IMAGE_PREVIEW_HEIGHT");
            if (fixedPreviewHeight) {
              root.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                id: item.id,
                height: fixedPreviewHeight
              });
            }
            var queue = !supportsCreateImageBitmap && file.size > query("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE");
            root.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id: id2 }, queue);
          };
          var rescaleItem = function rescaleItem2(root, props) {
            if (!root.ref.imagePreview) return;
            var id2 = props.id;
            var item = root.query("GET_ITEM", { id: id2 });
            if (!item) return;
            var panelAspectRatio = root.query("GET_PANEL_ASPECT_RATIO");
            var itemPanelAspectRatio = root.query("GET_ITEM_PANEL_ASPECT_RATIO");
            var fixedHeight = root.query("GET_IMAGE_PREVIEW_HEIGHT");
            if (panelAspectRatio || itemPanelAspectRatio || fixedHeight) return;
            var _root$ref = root.ref, imageWidth = _root$ref.imageWidth, imageHeight = _root$ref.imageHeight;
            if (!imageWidth || !imageHeight) return;
            var minPreviewHeight = root.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
            var maxPreviewHeight = root.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
            var exif = item.getMetadata("exif") || {};
            var orientation = exif.orientation || -1;
            if (orientation >= 5 && orientation <= 8) {
              var _ref2 = [imageHeight, imageWidth];
              imageWidth = _ref2[0];
              imageHeight = _ref2[1];
            }
            if (!isBitmap(item.file) || root.query("GET_IMAGE_PREVIEW_UPSCALE")) {
              var scalar = 2048 / imageWidth;
              imageWidth *= scalar;
              imageHeight *= scalar;
            }
            var imageAspectRatio = imageHeight / imageWidth;
            var previewAspectRatio = (item.getMetadata("crop") || {}).aspectRatio || imageAspectRatio;
            var previewHeightMax = Math.max(
              minPreviewHeight,
              Math.min(imageHeight, maxPreviewHeight)
            );
            var itemWidth = root.rect.element.width;
            var previewHeight = Math.min(
              itemWidth * previewAspectRatio,
              previewHeightMax
            );
            root.dispatch("DID_UPDATE_PANEL_HEIGHT", {
              id: item.id,
              height: previewHeight
            });
          };
          var didResizeView = function didResizeView2(_ref3) {
            var root = _ref3.root;
            root.ref.shouldRescale = true;
          };
          var didUpdateItemMetadata = function didUpdateItemMetadata2(_ref4) {
            var root = _ref4.root, action = _ref4.action;
            if (action.change.key !== "crop") return;
            root.ref.shouldRescale = true;
          };
          var didCalculatePreviewSize = function didCalculatePreviewSize2(_ref5) {
            var root = _ref5.root, action = _ref5.action;
            root.ref.imageWidth = action.width;
            root.ref.imageHeight = action.height;
            root.ref.shouldRescale = true;
            root.ref.shouldDrawPreview = true;
            root.dispatch("KICK");
          };
          view.registerWriter(
            createRoute(
              {
                DID_RESIZE_ROOT: didResizeView,
                DID_STOP_RESIZE: didResizeView,
                DID_LOAD_ITEM: didLoadItem,
                DID_IMAGE_PREVIEW_CALCULATE_SIZE: didCalculatePreviewSize,
                DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata
              },
              function(_ref6) {
                var root = _ref6.root, props = _ref6.props;
                if (!root.ref.imagePreview) return;
                if (root.rect.element.hidden) return;
                if (root.ref.shouldRescale) {
                  rescaleItem(root, props);
                  root.ref.shouldRescale = false;
                }
                if (root.ref.shouldDrawPreview) {
                  requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                      root.dispatch("DID_FINISH_CALCULATE_PREVIEWSIZE", {
                        id: props.id
                      });
                    });
                  });
                  root.ref.shouldDrawPreview = false;
                }
              }
            )
          );
        });
        return {
          options: {
            // Enable or disable image preview
            allowImagePreview: [true, Type.BOOLEAN],
            // filters file items to determine which are shown as preview
            imagePreviewFilterItem: [
              function() {
                return true;
              },
              Type.FUNCTION
            ],
            // Fixed preview height
            imagePreviewHeight: [null, Type.INT],
            // Min image height
            imagePreviewMinHeight: [44, Type.INT],
            // Max image height
            imagePreviewMaxHeight: [256, Type.INT],
            // Max size of preview file for when createImageBitmap is not supported
            imagePreviewMaxFileSize: [null, Type.INT],
            // The amount of extra pixels added to the image preview to allow comfortable zooming
            imagePreviewZoomFactor: [2, Type.INT],
            // Should we upscale small images to fit the max bounding box of the preview area
            imagePreviewUpscale: [false, Type.BOOLEAN],
            // Max size of preview file that we allow to try to instant preview if createImageBitmap is not supported, else image is queued for loading
            imagePreviewMaxInstantPreviewFileSize: [1e6, Type.INT],
            // Style of the transparancy indicator used behind images
            imagePreviewTransparencyIndicator: [null, Type.STRING],
            // Enables or disables reading average image color
            imagePreviewCalculateAverageImageColor: [false, Type.BOOLEAN],
            // Enables or disables the previewing of markup
            imagePreviewMarkupShow: [true, Type.BOOLEAN],
            // Allows filtering of markup to only show certain shapes
            imagePreviewMarkupFilter: [
              function() {
                return true;
              },
              Type.FUNCTION
            ]
          }
        };
      };
      var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
      if (isBrowser) {
        document.dispatchEvent(
          new CustomEvent("FilePond:pluginloaded", { detail: plugin })
        );
      }
      return plugin;
    });
  }
});

// dom.ts
var QuerySelector = (sel, root = document) => root.querySelector(sel);
var MustQuerySelector = (sel, root = document) => {
  const v = QuerySelector(sel, root);
  if (!v) {
    throw new Error(`${sel} not found on ${root.nodeName}`);
  }
  return v;
};

// imageupload.ts
var import_lightbox2 = __toESM(require_lightbox(), 1);
var FilePond = __toESM(require_filepond(), 1);
var import_filepond_plugin_file_validate_size = __toESM(require_filepond_plugin_file_validate_size(), 1);
var import_filepond_plugin_image_exif_orientation = __toESM(require_filepond_plugin_image_exif_orientation(), 1);
var import_filepond_plugin_image_validate_size = __toESM(require_filepond_plugin_image_validate_size(), 1);
var import_filepond_plugin_image_crop = __toESM(require_filepond_plugin_image_crop(), 1);
var import_filepond_plugin_image_edit2 = __toESM(require_filepond_plugin_image_edit(), 1);
var import_filepond_plugin_image_transform = __toESM(require_filepond_plugin_image_transform(), 1);
var import_filepond_plugin_image_preview2 = __toESM(require_filepond_plugin_image_preview(), 1);
FilePond.registerPlugin(
  import_filepond_plugin_file_validate_size.default,
  import_filepond_plugin_image_exif_orientation.default,
  import_filepond_plugin_image_validate_size.default,
  import_filepond_plugin_image_crop.default,
  import_filepond_plugin_image_edit2.default,
  import_filepond_plugin_image_transform.default,
  import_filepond_plugin_image_preview2.default
);
var fileInput = MustQuerySelector("#general-file-uploader");
var fileSubmit = MustQuerySelector("#general-file-submit");
FilePond.create(fileInput, {
  server: "/file/filepond",
  instantUpload: true,
  maxFileSize: "50MB",
  onaddfilestart: (_) => {
    fileSubmit.disabled = true;
    fileSubmit.textContent = LN.FilesPleaseWait;
  },
  onprocessfiles: (_) => {
    fileSubmit.disabled = false;
    fileSubmit.textContent = LN.GenericSave;
  }
});
import_lightbox2.default.option({
  alwaysShowNavOnTouchDevices: true,
  disableScrolling: true,
  fadeDuration: 0,
  fitImagesInViewport: true,
  resizeDuration: 0,
  imageFadeDuration: 0
});
/*! Bundled license information:

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.7.1
   * https://jquery.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2023-08-28T13:37Z
   *)

lightbox2/dist/js/lightbox.js:
  (*!
   * Lightbox v2.11.5
   * by Lokesh Dhakar
   *
   * More info:
   * http://lokeshdhakar.com/projects/lightbox2/
   *
   * Copyright Lokesh Dhakar
   * Released under the MIT license
   * https://github.com/lokesh/lightbox2/blob/master/LICENSE
   *
   * @preserve
   *)

filepond/dist/filepond.js:
  (*!
   * FilePond 4.32.10
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js:
  (*!
   * FilePondPluginFileValidateSize 2.2.8
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.js:
  (*!
   * FilePondPluginImageExifOrientation 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-validate-size/dist/filepond-plugin-image-validate-size.js:
  (*!
   * FilePondPluginImageValidateSize 1.2.7
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-crop/dist/filepond-plugin-image-crop.js:
  (*!
   * FilePondPluginImageCrop 2.0.6
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-edit/dist/filepond-plugin-image-edit.js:
  (*!
   * FilePondPluginImageEdit 1.6.3
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-transform/dist/filepond-plugin-image-transform.js:
  (*!
   * FilePondPluginImageTransform 3.8.7
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js:
  (*!
   * FilePondPluginImagePreview 4.6.12
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)
*/
