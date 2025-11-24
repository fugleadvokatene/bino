// node_modules/@editorjs/editorjs/dist/editorjs.mjs
(function() {
  "use strict";
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode(".ce-hint--align-start{text-align:left}.ce-hint--align-center{text-align:center}.ce-hint__description{opacity:.6;margin-top:3px}")), document.head.appendChild(e);
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t);
  }
})();
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ke(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function Xn(n) {
  if (n.__esModule)
    return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function o2() {
      return this instanceof o2 ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: true }), Object.keys(n).forEach(function(o2) {
    var i = Object.getOwnPropertyDescriptor(n, o2);
    Object.defineProperty(t, o2, i.get ? i : {
      enumerable: true,
      get: function() {
        return n[o2];
      }
    });
  }), t;
}
function ot() {
}
Object.assign(ot, {
  default: ot,
  register: ot,
  revert: function() {
  },
  __esModule: true
});
Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(n) {
  const e = (this.document || this.ownerDocument).querySelectorAll(n);
  let t = e.length;
  for (; --t >= 0 && e.item(t) !== this; )
    ;
  return t > -1;
});
Element.prototype.closest || (Element.prototype.closest = function(n) {
  let e = this;
  if (!document.documentElement.contains(e))
    return null;
  do {
    if (e.matches(n))
      return e;
    e = e.parentElement || e.parentNode;
  } while (e !== null);
  return null;
});
Element.prototype.prepend || (Element.prototype.prepend = function(e) {
  const t = document.createDocumentFragment();
  Array.isArray(e) || (e = [e]), e.forEach((o2) => {
    const i = o2 instanceof Node;
    t.appendChild(i ? o2 : document.createTextNode(o2));
  }), this.insertBefore(t, this.firstChild);
});
Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(n) {
  n = arguments.length === 0 ? true : !!n;
  const e = this.parentNode, t = window.getComputedStyle(e, null), o2 = parseInt(t.getPropertyValue("border-top-width")), i = parseInt(t.getPropertyValue("border-left-width")), s2 = this.offsetTop - e.offsetTop < e.scrollTop, r = this.offsetTop - e.offsetTop + this.clientHeight - o2 > e.scrollTop + e.clientHeight, a3 = this.offsetLeft - e.offsetLeft < e.scrollLeft, l2 = this.offsetLeft - e.offsetLeft + this.clientWidth - i > e.scrollLeft + e.clientWidth, c3 = s2 && !r;
  (s2 || r) && n && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - o2 + this.clientHeight / 2), (a3 || l2) && n && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - i + this.clientWidth / 2), (s2 || r || a3 || l2) && !n && this.scrollIntoView(c3);
});
window.requestIdleCallback = window.requestIdleCallback || function(n) {
  const e = Date.now();
  return setTimeout(function() {
    n({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - e));
      }
    });
  }, 1);
};
window.cancelIdleCallback = window.cancelIdleCallback || function(n) {
  clearTimeout(n);
};
var Vn = (n = 21) => crypto.getRandomValues(new Uint8Array(n)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
var Lo = /* @__PURE__ */ ((n) => (n.VERBOSE = "VERBOSE", n.INFO = "INFO", n.WARN = "WARN", n.ERROR = "ERROR", n))(Lo || {});
var y = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
};
var qn = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
function Ie(n, e, t = "log", o2, i = "color: inherit") {
  if (!("console" in window) || !window.console[t])
    return;
  const s2 = ["info", "log", "warn", "error"].includes(t), r = [];
  switch (Ie.logLevel) {
    case "ERROR":
      if (t !== "error")
        return;
      break;
    case "WARN":
      if (!["error", "warn"].includes(t))
        return;
      break;
    case "INFO":
      if (!s2 || n)
        return;
      break;
  }
  o2 && r.push(o2);
  const a3 = "Editor.js 2.31.0", l2 = `line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`;
  n && (s2 ? (r.unshift(l2, i), e = `%c${a3}%c ${e}`) : e = `( ${a3} )${e}`);
  try {
    s2 ? o2 ? console[t](`${e} %o`, ...r) : console[t](e, ...r) : console[t](e);
  } catch {
  }
}
Ie.logLevel = "VERBOSE";
function Zn(n) {
  Ie.logLevel = n;
}
var S = Ie.bind(window, false);
var X = Ie.bind(window, true);
function le(n) {
  return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function A(n) {
  return le(n) === "function" || le(n) === "asyncfunction";
}
function D(n) {
  return le(n) === "object";
}
function te(n) {
  return le(n) === "string";
}
function Gn(n) {
  return le(n) === "boolean";
}
function yo(n) {
  return le(n) === "number";
}
function wo(n) {
  return le(n) === "undefined";
}
function V(n) {
  return n ? Object.keys(n).length === 0 && n.constructor === Object : true;
}
function Po(n) {
  return n > 47 && n < 58 || // number keys
  n === 32 || n === 13 || // Space bar & return key(s)
  n === 229 || // processing key input for certain languages — Chinese, Japanese, etc.
  n > 64 && n < 91 || // letter keys
  n > 95 && n < 112 || // Numpad keys
  n > 185 && n < 193 || // ;=,-./` (in order)
  n > 218 && n < 223;
}
async function Qn(n, e = () => {
}, t = () => {
}) {
  async function o2(i, s2, r) {
    try {
      await i.function(i.data), await s2(wo(i.data) ? {} : i.data);
    } catch {
      r(wo(i.data) ? {} : i.data);
    }
  }
  return n.reduce(async (i, s2) => (await i, o2(s2, e, t)), Promise.resolve());
}
function No(n) {
  return Array.prototype.slice.call(n);
}
function Fe(n, e) {
  return function() {
    const t = this, o2 = arguments;
    window.setTimeout(() => n.apply(t, o2), e);
  };
}
function Jn(n) {
  return n.name.split(".").pop();
}
function ei(n) {
  return /^[-\w]+\/([-+\w]+|\*)$/.test(n);
}
function Eo(n, e, t) {
  let o2;
  return (...i) => {
    const s2 = this, r = () => {
      o2 = null, t || n.apply(s2, i);
    }, a3 = t && !o2;
    window.clearTimeout(o2), o2 = window.setTimeout(r, e), a3 && n.apply(s2, i);
  };
}
function dt(n, e, t = void 0) {
  let o2, i, s2, r = null, a3 = 0;
  t || (t = {});
  const l2 = function() {
    a3 = t.leading === false ? 0 : Date.now(), r = null, s2 = n.apply(o2, i), r || (o2 = i = null);
  };
  return function() {
    const c3 = Date.now();
    !a3 && t.leading === false && (a3 = c3);
    const d2 = e - (c3 - a3);
    return o2 = this, i = arguments, d2 <= 0 || d2 > e ? (r && (clearTimeout(r), r = null), a3 = c3, s2 = n.apply(o2, i), r || (o2 = i = null)) : !r && t.trailing !== false && (r = setTimeout(l2, d2)), s2;
  };
}
function ti() {
  const n = {
    win: false,
    mac: false,
    x11: false,
    linux: false
  }, e = Object.keys(n).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e && (n[e] = true), n;
}
function je(n) {
  return n[0].toUpperCase() + n.slice(1);
}
function ut(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if (D(n) && D(t))
    for (const o2 in t)
      D(t[o2]) ? (n[o2] || Object.assign(n, { [o2]: {} }), ut(n[o2], t[o2])) : Object.assign(n, { [o2]: t[o2] });
  return ut(n, ...e);
}
function vt(n) {
  const e = ti();
  return n = n.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, " + "), e.mac ? n = n.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
}
function oi(n) {
  try {
    return new URL(n).href;
  } catch {
  }
  return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
}
function ni() {
  return Vn(10);
}
function ii(n) {
  window.open(n, "_blank");
}
function si(n = "") {
  return `${n}${Math.floor(Math.random() * 1e8).toString(16)}`;
}
function ht(n, e, t) {
  const o2 = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
  n && X(o2, "warn");
}
function me(n, e, t) {
  const o2 = t.value ? "value" : "get", i = t[o2], s2 = `#${e}Cache`;
  if (t[o2] = function(...r) {
    return this[s2] === void 0 && (this[s2] = i.apply(this, ...r)), this[s2];
  }, o2 === "get" && t.set) {
    const r = t.set;
    t.set = function(a3) {
      delete n[s2], r.apply(this, a3);
    };
  }
  return t;
}
var Ro = 650;
function be() {
  return window.matchMedia(`(max-width: ${Ro}px)`).matches;
}
var pt = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function ri(n, e) {
  const t = Array.isArray(n) || D(n), o2 = Array.isArray(e) || D(e);
  return t || o2 ? JSON.stringify(n) === JSON.stringify(e) : n === e;
}
var u = class _u {
  /**
   * Check if passed tag has no closed tag
   *
   * @param {HTMLElement} tag - element to check
   * @returns {boolean}
   */
  static isSingleTag(e) {
    return e.tagName && [
      "AREA",
      "BASE",
      "BR",
      "COL",
      "COMMAND",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "KEYGEN",
      "LINK",
      "META",
      "PARAM",
      "SOURCE",
      "TRACK",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Check if element is BR or WBR
   *
   * @param {HTMLElement} element - element to check
   * @returns {boolean}
   */
  static isLineBreakTag(e) {
    return e && e.tagName && [
      "BR",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Helper for making Elements with class name and attributes
   *
   * @param  {string} tagName - new Element tag name
   * @param  {string[]|string} [classNames] - list or name of CSS class name(s)
   * @param  {object} [attributes] - any attributes
   * @returns {HTMLElement}
   */
  static make(e, t = null, o2 = {}) {
    const i = document.createElement(e);
    if (Array.isArray(t)) {
      const s2 = t.filter((r) => r !== void 0);
      i.classList.add(...s2);
    } else
      t && i.classList.add(t);
    for (const s2 in o2)
      Object.prototype.hasOwnProperty.call(o2, s2) && (i[s2] = o2[s2]);
    return i;
  }
  /**
   * Creates Text Node with the passed content
   *
   * @param {string} content - text content
   * @returns {Text}
   */
  static text(e) {
    return document.createTextNode(e);
  }
  /**
   * Append one or several elements to the parent
   *
   * @param  {Element|DocumentFragment} parent - where to append
   * @param  {Element|Element[]|DocumentFragment|Text|Text[]} elements - element or elements list
   */
  static append(e, t) {
    Array.isArray(t) ? t.forEach((o2) => e.appendChild(o2)) : e.appendChild(t);
  }
  /**
   * Append element or a couple to the beginning of the parent elements
   *
   * @param {Element} parent - where to append
   * @param {Element|Element[]} elements - element or elements list
   */
  static prepend(e, t) {
    Array.isArray(t) ? (t = t.reverse(), t.forEach((o2) => e.prepend(o2))) : e.prepend(t);
  }
  /**
   * Swap two elements in parent
   *
   * @param {HTMLElement} el1 - from
   * @param {HTMLElement} el2 - to
   * @deprecated
   */
  static swap(e, t) {
    const o2 = document.createElement("div"), i = e.parentNode;
    i.insertBefore(o2, e), i.insertBefore(e, t), i.insertBefore(t, o2), i.removeChild(o2);
  }
  /**
   * Selector Decorator
   *
   * Returns first match
   *
   * @param {Element} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {Element}
   */
  static find(e = document, t) {
    return e.querySelector(t);
  }
  /**
   * Get Element by Id
   *
   * @param {string} id - id to find
   * @returns {HTMLElement | null}
   */
  static get(e) {
    return document.getElementById(e);
  }
  /**
   * Selector Decorator.
   *
   * Returns all matches
   *
   * @param {Element|Document} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {NodeList}
   */
  static findAll(e = document, t) {
    return e.querySelectorAll(t);
  }
  /**
   * Returns CSS selector for all text inputs
   */
  static get allInputsSelector() {
    return "[contenteditable=true], textarea, input:not([type]), " + ["text", "password", "email", "number", "search", "tel", "url"].map((t) => `input[type="${t}"]`).join(", ");
  }
  /**
   * Find all contenteditable, textarea and editable input elements passed holder contains
   *
   * @param holder - element where to find inputs
   */
  static findAllInputs(e) {
    return No(e.querySelectorAll(_u.allInputsSelector)).reduce((t, o2) => _u.isNativeInput(o2) || _u.containsOnlyInlineElements(o2) ? [...t, o2] : [...t, ..._u.getDeepestBlockElements(o2)], []);
  }
  /**
   * Search for deepest node which is Leaf.
   * Leaf is the vertex that doesn't have any child nodes
   *
   * @description Method recursively goes throw the all Node until it finds the Leaf
   * @param {Node} node - root Node. From this vertex we start Deep-first search
   *                      {@link https://en.wikipedia.org/wiki/Depth-first_search}
   * @param {boolean} [atLast] - find last text node
   * @returns - it can be text Node or Element Node, so that caret will able to work with it
   *            Can return null if node is Document or DocumentFragment, or node is not attached to the DOM
   */
  static getDeepestNode(e, t = false) {
    const o2 = t ? "lastChild" : "firstChild", i = t ? "previousSibling" : "nextSibling";
    if (e && e.nodeType === Node.ELEMENT_NODE && e[o2]) {
      let s2 = e[o2];
      if (_u.isSingleTag(s2) && !_u.isNativeInput(s2) && !_u.isLineBreakTag(s2))
        if (s2[i])
          s2 = s2[i];
        else if (s2.parentNode[i])
          s2 = s2.parentNode[i];
        else
          return s2.parentNode;
      return this.getDeepestNode(s2, t);
    }
    return e;
  }
  /**
   * Check if object is DOM node
   *
   * @param {*} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isElement(e) {
    return yo(e) ? false : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
  }
  /**
   * Check if object is DocumentFragment node
   *
   * @param {object} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isFragment(e) {
    return yo(e) ? false : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  /**
   * Check if passed element is contenteditable
   *
   * @param {HTMLElement} element - html element to check
   * @returns {boolean}
   */
  static isContentEditable(e) {
    return e.contentEditable === "true";
  }
  /**
   * Checks target if it is native input
   *
   * @param {*} target - HTML element or string
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isNativeInput(e) {
    const t = [
      "INPUT",
      "TEXTAREA"
    ];
    return e && e.tagName ? t.includes(e.tagName) : false;
  }
  /**
   * Checks if we can set caret
   *
   * @param {HTMLElement} target - target to check
   * @returns {boolean}
   */
  static canSetCaret(e) {
    let t = true;
    if (_u.isNativeInput(e))
      switch (e.type) {
        case "file":
        case "checkbox":
        case "radio":
        case "hidden":
        case "submit":
        case "button":
        case "image":
        case "reset":
          t = false;
          break;
      }
    else
      t = _u.isContentEditable(e);
    return t;
  }
  /**
   * Checks node if it is empty
   *
   * @description Method checks simple Node without any childs for emptiness
   * If you have Node with 2 or more children id depth, you better use {@link Dom#isEmpty} method
   * @param {Node} node - node to check
   * @param {string} [ignoreChars] - char or substring to treat as empty
   * @returns {boolean} true if it is empty
   */
  static isNodeEmpty(e, t) {
    let o2;
    return this.isSingleTag(e) && !this.isLineBreakTag(e) ? false : (this.isElement(e) && this.isNativeInput(e) ? o2 = e.value : o2 = e.textContent.replace("\u200B", ""), t && (o2 = o2.replace(new RegExp(t, "g"), "")), o2.length === 0);
  }
  /**
   * checks node if it is doesn't have any child nodes
   *
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isLeaf(e) {
    return e ? e.childNodes.length === 0 : false;
  }
  /**
   * breadth-first search (BFS)
   * {@link https://en.wikipedia.org/wiki/Breadth-first_search}
   *
   * @description Pushes to stack all DOM leafs and checks for emptiness
   * @param {Node} node - node to check
   * @param {string} [ignoreChars] - char or substring to treat as empty
   * @returns {boolean}
   */
  static isEmpty(e, t) {
    const o2 = [e];
    for (; o2.length > 0; )
      if (e = o2.shift(), !!e) {
        if (this.isLeaf(e) && !this.isNodeEmpty(e, t))
          return false;
        e.childNodes && o2.push(...Array.from(e.childNodes));
      }
    return true;
  }
  /**
   * Check if string contains html elements
   *
   * @param {string} str - string to check
   * @returns {boolean}
   */
  static isHTMLString(e) {
    const t = _u.make("div");
    return t.innerHTML = e, t.childElementCount > 0;
  }
  /**
   * Return length of node`s text content
   *
   * @param {Node} node - node with content
   * @returns {number}
   */
  static getContentLength(e) {
    return _u.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
  }
  /**
   * Return array of names of block html elements
   *
   * @returns {string[]}
   */
  static get blockElements() {
    return [
      "address",
      "article",
      "aside",
      "blockquote",
      "canvas",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "li",
      "main",
      "nav",
      "noscript",
      "ol",
      "output",
      "p",
      "pre",
      "ruby",
      "section",
      "table",
      "tbody",
      "thead",
      "tr",
      "tfoot",
      "ul",
      "video"
    ];
  }
  /**
   * Check if passed content includes only inline elements
   *
   * @param {string|HTMLElement} data - element or html string
   * @returns {boolean}
   */
  static containsOnlyInlineElements(e) {
    let t;
    te(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
    const o2 = (i) => !_u.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(o2);
    return Array.from(t.children).every(o2);
  }
  /**
   * Find and return all block elements in the passed parent (including subtree)
   *
   * @param {HTMLElement} parent - root element
   * @returns {HTMLElement[]}
   */
  static getDeepestBlockElements(e) {
    return _u.containsOnlyInlineElements(e) ? [e] : Array.from(e.children).reduce((t, o2) => [...t, ..._u.getDeepestBlockElements(o2)], []);
  }
  /**
   * Helper for get holder from {string} or return HTMLElement
   *
   * @param {string | HTMLElement} element - holder's id or holder's HTML Element
   * @returns {HTMLElement}
   */
  static getHolder(e) {
    return te(e) ? document.getElementById(e) : e;
  }
  /**
   * Returns true if element is anchor (is A tag)
   *
   * @param {Element} element - element to check
   * @returns {boolean}
   */
  static isAnchor(e) {
    return e.tagName.toLowerCase() === "a";
  }
  /**
   * Return element's offset related to the document
   *
   * @todo handle case when editor initialized in scrollable popup
   * @param el - element to compute offset
   */
  static offset(e) {
    const t = e.getBoundingClientRect(), o2 = window.pageXOffset || document.documentElement.scrollLeft, i = window.pageYOffset || document.documentElement.scrollTop, s2 = t.top + i, r = t.left + o2;
    return {
      top: s2,
      left: r,
      bottom: s2 + t.height,
      right: r + t.width
    };
  }
  /**
   * Find text node and offset by total content offset
   *
   * @param {Node} root - root node to start search from
   * @param {number} totalOffset - offset relative to the root node content
   * @returns {{node: Node | null, offset: number}} - node and offset inside node
   */
  static getNodeByOffset(e, t) {
    let o2 = 0, i = null;
    const s2 = document.createTreeWalker(
      e,
      NodeFilter.SHOW_TEXT,
      null
    );
    let r = s2.nextNode();
    for (; r; ) {
      const c3 = r.textContent, d2 = c3 === null ? 0 : c3.length;
      if (i = r, o2 + d2 >= t)
        break;
      o2 += d2, r = s2.nextNode();
    }
    if (!i)
      return {
        node: null,
        offset: 0
      };
    const a3 = i.textContent;
    if (a3 === null || a3.length === 0)
      return {
        node: null,
        offset: 0
      };
    const l2 = Math.min(t - o2, a3.length);
    return {
      node: i,
      offset: l2
    };
  }
};
function ai(n) {
  return !/[^\t\n\r ]/.test(n);
}
function li(n) {
  const e = window.getComputedStyle(n), t = parseFloat(e.fontSize), o2 = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), s2 = parseFloat(e.borderTopWidth), r = parseFloat(e.marginTop), a3 = t * 0.8, l2 = (o2 - t) / 2;
  return r + s2 + i + l2 + a3;
}
function Do(n) {
  n.dataset.empty = u.isEmpty(n) ? "true" : "false";
}
var ci = {
  blockTunes: {
    toggler: {
      "Click to tune": "",
      "or drag to move": ""
    }
  },
  inlineToolbar: {
    converter: {
      "Convert to": ""
    }
  },
  toolbar: {
    toolbox: {
      Add: ""
    }
  },
  popover: {
    Filter: "",
    "Nothing found": "",
    "Convert to": ""
  }
};
var di = {
  Text: "",
  Link: "",
  Bold: "",
  Italic: ""
};
var ui = {
  link: {
    "Add a link": ""
  },
  stub: {
    "The block can not be displayed correctly.": ""
  }
};
var hi = {
  delete: {
    Delete: "",
    "Click to delete": ""
  },
  moveUp: {
    "Move up": ""
  },
  moveDown: {
    "Move down": ""
  }
};
var Fo = {
  ui: ci,
  toolNames: di,
  tools: ui,
  blockTunes: hi
};
var jo = class he {
  /**
   * Type-safe translation for internal UI texts:
   * Perform translation of the string by namespace and a key
   *
   * @example I18n.ui(I18nInternalNS.ui.blockTunes.toggler, 'Click to tune')
   * @param internalNamespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static ui(e, t) {
    return he._t(e, t);
  }
  /**
   * Translate for external strings that is not presented in default dictionary.
   * For example, for user-specified tool names
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static t(e, t) {
    return he._t(e, t);
  }
  /**
   * Adjust module for using external dictionary
   *
   * @param dictionary - new messages list to override default
   */
  static setDictionary(e) {
    he.currentDictionary = e;
  }
  /**
   * Perform translation both for internal and external namespaces
   * If there is no translation found, returns passed key as a translated message
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static _t(e, t) {
    const o2 = he.getNamespace(e);
    return !o2 || !o2[t] ? t : o2[t];
  }
  /**
   * Find messages section by namespace path
   *
   * @param namespace - path to section
   */
  static getNamespace(e) {
    return e.split(".").reduce((o2, i) => !o2 || !Object.keys(o2).length ? {} : o2[i], he.currentDictionary);
  }
};
jo.currentDictionary = Fo;
var z = jo;
var Ho = class extends Error {
};
var Oe = class {
  constructor() {
    this.subscribers = {};
  }
  /**
   * Subscribe any event on callback
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  on(e, t) {
    e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
  }
  /**
   * Subscribe any event on callback. Callback will be called once and be removed from subscribers array after call.
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  once(e, t) {
    e in this.subscribers || (this.subscribers[e] = []);
    const o2 = (i) => {
      const s2 = t(i), r = this.subscribers[e].indexOf(o2);
      return r !== -1 && this.subscribers[e].splice(r, 1), s2;
    };
    this.subscribers[e].push(o2);
  }
  /**
   * Emit callbacks with passed data
   *
   * @param eventName - event name
   * @param data - subscribers get this data when they were fired
   */
  emit(e, t) {
    V(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce((o2, i) => {
      const s2 = i(o2);
      return s2 !== void 0 ? s2 : o2;
    }, t);
  }
  /**
   * Unsubscribe callback from event
   *
   * @param eventName - event name
   * @param callback - event handler
   */
  off(e, t) {
    if (this.subscribers[e] === void 0) {
      console.warn(`EventDispatcher .off(): there is no subscribers for event "${e.toString()}". Probably, .off() called before .on()`);
      return;
    }
    for (let o2 = 0; o2 < this.subscribers[e].length; o2++)
      if (this.subscribers[e][o2] === t) {
        delete this.subscribers[e][o2];
        break;
      }
  }
  /**
   * Destroyer
   * clears subscribers list
   */
  destroy() {
    this.subscribers = {};
  }
};
function J(n) {
  Object.setPrototypeOf(this, {
    /**
     * Block id
     *
     * @returns {string}
     */
    get id() {
      return n.id;
    },
    /**
     * Tool name
     *
     * @returns {string}
     */
    get name() {
      return n.name;
    },
    /**
     * Tool config passed on Editor's initialization
     *
     * @returns {ToolConfig}
     */
    get config() {
      return n.config;
    },
    /**
     * .ce-block element, that wraps plugin contents
     *
     * @returns {HTMLElement}
     */
    get holder() {
      return n.holder;
    },
    /**
     * True if Block content is empty
     *
     * @returns {boolean}
     */
    get isEmpty() {
      return n.isEmpty;
    },
    /**
     * True if Block is selected with Cross-Block selection
     *
     * @returns {boolean}
     */
    get selected() {
      return n.selected;
    },
    /**
     * Set Block's stretch state
     *
     * @param {boolean} state — state to set
     */
    set stretched(t) {
      n.stretched = t;
    },
    /**
     * True if Block is stretched
     *
     * @returns {boolean}
     */
    get stretched() {
      return n.stretched;
    },
    /**
     * True if Block has inputs to be focused
     */
    get focusable() {
      return n.focusable;
    },
    /**
     * Call Tool method with errors handler under-the-hood
     *
     * @param {string} methodName - method to call
     * @param {object} param - object with parameters
     * @returns {unknown}
     */
    call(t, o2) {
      return n.call(t, o2);
    },
    /**
     * Save Block content
     *
     * @returns {Promise<void|SavedData>}
     */
    save() {
      return n.save();
    },
    /**
     * Validate Block data
     *
     * @param {BlockToolData} data - data to validate
     * @returns {Promise<boolean>}
     */
    validate(t) {
      return n.validate(t);
    },
    /**
     * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
     * Can be useful for block changes invisible for editor core.
     */
    dispatchChange() {
      n.dispatchChange();
    },
    /**
     * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
     * This method returns the entry that is related to the Block (depended on the Block data)
     */
    getActiveToolboxEntry() {
      return n.getActiveToolboxEntry();
    }
  });
}
var _e = class {
  constructor() {
    this.allListeners = [];
  }
  /**
   * Assigns event listener on element and returns unique identifier
   *
   * @param {EventTarget} element - DOM element that needs to be listened
   * @param {string} eventType - event type
   * @param {Function} handler - method that will be fired on event
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  on(e, t, o2, i = false) {
    const s2 = si("l"), r = {
      id: s2,
      element: e,
      eventType: t,
      handler: o2,
      options: i
    };
    if (!this.findOne(e, t, o2))
      return this.allListeners.push(r), e.addEventListener(t, o2, i), s2;
  }
  /**
   * Removes event listener from element
   *
   * @param {EventTarget} element - DOM element that we removing listener
   * @param {string} eventType - event type
   * @param {Function} handler - remove handler, if element listens several handlers on the same event type
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  off(e, t, o2, i) {
    const s2 = this.findAll(e, t, o2);
    s2.forEach((r, a3) => {
      const l2 = this.allListeners.indexOf(s2[a3]);
      l2 > -1 && (this.allListeners.splice(l2, 1), r.element.removeEventListener(r.eventType, r.handler, r.options));
    });
  }
  /**
   * Removes listener by id
   *
   * @param {string} id - listener identifier
   */
  offById(e) {
    const t = this.findById(e);
    t && t.element.removeEventListener(t.eventType, t.handler, t.options);
  }
  /**
   * Finds and returns first listener by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} [eventType] - event type
   * @param {Function} [handler] - event handler
   * @returns {ListenerData|null}
   */
  findOne(e, t, o2) {
    const i = this.findAll(e, t, o2);
    return i.length > 0 ? i[0] : null;
  }
  /**
   * Return all stored listeners by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} eventType - event type
   * @param {Function} handler - event handler
   * @returns {ListenerData[]}
   */
  findAll(e, t, o2) {
    let i;
    const s2 = e ? this.findByEventTarget(e) : [];
    return e && t && o2 ? i = s2.filter((r) => r.eventType === t && r.handler === o2) : e && t ? i = s2.filter((r) => r.eventType === t) : i = s2, i;
  }
  /**
   * Removes all listeners
   */
  removeAll() {
    this.allListeners.map((e) => {
      e.element.removeEventListener(e.eventType, e.handler, e.options);
    }), this.allListeners = [];
  }
  /**
   * Module cleanup on destruction
   */
  destroy() {
    this.removeAll();
  }
  /**
   * Search method: looks for listener by passed element
   *
   * @param {EventTarget} element - searching element
   * @returns {Array} listeners that found on element
   */
  findByEventTarget(e) {
    return this.allListeners.filter((t) => {
      if (t.element === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed event type
   *
   * @param {string} eventType - event type
   * @returns {ListenerData[]} listeners that found on element
   */
  findByType(e) {
    return this.allListeners.filter((t) => {
      if (t.eventType === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed handler
   *
   * @param {Function} handler - event handler
   * @returns {ListenerData[]} listeners that found on element
   */
  findByHandler(e) {
    return this.allListeners.filter((t) => {
      if (t.handler === e)
        return t;
    });
  }
  /**
   * Returns listener data found by id
   *
   * @param {string} id - listener identifier
   * @returns {ListenerData}
   */
  findById(e) {
    return this.allListeners.find((t) => t.id === e);
  }
};
var E = class _E {
  /**
   * @class
   * @param options - Module options
   * @param options.config - Module config
   * @param options.eventsDispatcher - Common event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    if (this.nodes = {}, this.listeners = new _e(), this.readOnlyMutableListeners = {
      /**
       * Assigns event listener on DOM element and pushes into special array that might be removed
       *
       * @param {EventTarget} element - DOM Element
       * @param {string} eventType - Event name
       * @param {Function} handler - Event handler
       * @param {boolean|AddEventListenerOptions} options - Listening options
       */
      on: (o2, i, s2, r = false) => {
        this.mutableListenerIds.push(
          this.listeners.on(o2, i, s2, r)
        );
      },
      /**
       * Clears all mutable listeners
       */
      clearAll: () => {
        for (const o2 of this.mutableListenerIds)
          this.listeners.offById(o2);
        this.mutableListenerIds = [];
      }
    }, this.mutableListenerIds = [], new.target === _E)
      throw new TypeError("Constructors for abstract class Module are not allowed.");
    this.config = e, this.eventsDispatcher = t;
  }
  /**
   * Editor modules setter
   *
   * @param {EditorModules} Editor - Editor's Modules
   */
  set state(e) {
    this.Editor = e;
  }
  /**
   * Remove memorized nodes
   */
  removeAllNodes() {
    for (const e in this.nodes) {
      const t = this.nodes[e];
      t instanceof HTMLElement && t.remove();
    }
  }
  /**
   * Returns true if current direction is RTL (Right-To-Left)
   */
  get isRtl() {
    return this.config.i18n.direction === "rtl";
  }
};
var b = class _b {
  constructor() {
    this.instance = null, this.selection = null, this.savedSelectionRange = null, this.isFakeBackgroundEnabled = false, this.commandBackground = "backColor", this.commandRemoveFormat = "removeFormat";
  }
  /**
   * Editor styles
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  static get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorZone: "codex-editor__redactor"
    };
  }
  /**
   * Returns selected anchor
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorNode}
   *
   * @returns {Node|null}
   */
  static get anchorNode() {
    const e = window.getSelection();
    return e ? e.anchorNode : null;
  }
  /**
   * Returns selected anchor element
   *
   * @returns {Element|null}
   */
  static get anchorElement() {
    const e = window.getSelection();
    if (!e)
      return null;
    const t = e.anchorNode;
    return t ? u.isElement(t) ? t : t.parentElement : null;
  }
  /**
   * Returns selection offset according to the anchor node
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorOffset}
   *
   * @returns {number|null}
   */
  static get anchorOffset() {
    const e = window.getSelection();
    return e ? e.anchorOffset : null;
  }
  /**
   * Is current selection range collapsed
   *
   * @returns {boolean|null}
   */
  static get isCollapsed() {
    const e = window.getSelection();
    return e ? e.isCollapsed : null;
  }
  /**
   * Check current selection if it is at Editor's zone
   *
   * @returns {boolean}
   */
  static get isAtEditor() {
    return this.isSelectionAtEditor(_b.get());
  }
  /**
   * Check if passed selection is at Editor's zone
   *
   * @param selection - Selection object to check
   */
  static isSelectionAtEditor(e) {
    if (!e)
      return false;
    let t = e.anchorNode || e.focusNode;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let o2 = null;
    return t && t instanceof Element && (o2 = t.closest(`.${_b.CSS.editorZone}`)), o2 ? o2.nodeType === Node.ELEMENT_NODE : false;
  }
  /**
   * Check if passed range at Editor zone
   *
   * @param range - range to check
   */
  static isRangeAtEditor(e) {
    if (!e)
      return;
    let t = e.startContainer;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let o2 = null;
    return t && t instanceof Element && (o2 = t.closest(`.${_b.CSS.editorZone}`)), o2 ? o2.nodeType === Node.ELEMENT_NODE : false;
  }
  /**
   * Methods return boolean that true if selection exists on the page
   */
  static get isSelectionExists() {
    return !!_b.get().anchorNode;
  }
  /**
   * Return first range
   *
   * @returns {Range|null}
   */
  static get range() {
    return this.getRangeFromSelection(this.get());
  }
  /**
   * Returns range from passed Selection object
   *
   * @param selection - Selection object to get Range from
   */
  static getRangeFromSelection(e) {
    return e && e.rangeCount ? e.getRangeAt(0) : null;
  }
  /**
   * Calculates position and size of selected text
   *
   * @returns {DOMRect | ClientRect}
   */
  static get rect() {
    let e = document.selection, t, o2 = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    if (e && e.type !== "Control")
      return e = e, t = e.createRange(), o2.x = t.boundingLeft, o2.y = t.boundingTop, o2.width = t.boundingWidth, o2.height = t.boundingHeight, o2;
    if (!window.getSelection)
      return S("Method window.getSelection is not supported", "warn"), o2;
    if (e = window.getSelection(), e.rangeCount === null || isNaN(e.rangeCount))
      return S("Method SelectionUtils.rangeCount is not supported", "warn"), o2;
    if (e.rangeCount === 0)
      return o2;
    if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (o2 = t.getBoundingClientRect()), o2.x === 0 && o2.y === 0) {
      const i = document.createElement("span");
      if (i.getBoundingClientRect) {
        i.appendChild(document.createTextNode("\u200B")), t.insertNode(i), o2 = i.getBoundingClientRect();
        const s2 = i.parentNode;
        s2.removeChild(i), s2.normalize();
      }
    }
    return o2;
  }
  /**
   * Returns selected text as String
   *
   * @returns {string}
   */
  static get text() {
    return window.getSelection ? window.getSelection().toString() : "";
  }
  /**
   * Returns window SelectionUtils
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Window/getSelection}
   *
   * @returns {Selection}
   */
  static get() {
    return window.getSelection();
  }
  /**
   * Set focus to contenteditable or native input element
   *
   * @param element - element where to set focus
   * @param offset - offset of cursor
   */
  static setCursor(e, t = 0) {
    const o2 = document.createRange(), i = window.getSelection();
    return u.isNativeInput(e) ? u.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (o2.setStart(e, t), o2.setEnd(e, t), i.removeAllRanges(), i.addRange(o2), o2.getBoundingClientRect());
  }
  /**
   * Check if current range exists and belongs to container
   *
   * @param container - where range should be
   */
  static isRangeInsideContainer(e) {
    const t = _b.range;
    return t === null ? false : e.contains(t.startContainer);
  }
  /**
   * Adds fake cursor to the current range
   */
  static addFakeCursor() {
    const e = _b.range;
    if (e === null)
      return;
    const t = u.make("span", "codex-editor__fake-cursor");
    t.dataset.mutationFree = "true", e.collapse(), e.insertNode(t);
  }
  /**
   * Check if passed element contains a fake cursor
   *
   * @param el - where to check
   */
  static isFakeCursorInsideContainer(e) {
    return u.find(e, ".codex-editor__fake-cursor") !== null;
  }
  /**
   * Removes fake cursor from a container
   *
   * @param container - container to look for
   */
  static removeFakeCursor(e = document.body) {
    const t = u.find(e, ".codex-editor__fake-cursor");
    t && t.remove();
  }
  /**
   * Removes fake background
   */
  removeFakeBackground() {
    this.isFakeBackgroundEnabled && (this.isFakeBackgroundEnabled = false, document.execCommand(this.commandRemoveFormat));
  }
  /**
   * Sets fake background
   */
  setFakeBackground() {
    document.execCommand(this.commandBackground, false, "#a8d6ff"), this.isFakeBackgroundEnabled = true;
  }
  /**
   * Save SelectionUtils's range
   */
  save() {
    this.savedSelectionRange = _b.range;
  }
  /**
   * Restore saved SelectionUtils's range
   */
  restore() {
    if (!this.savedSelectionRange)
      return;
    const e = window.getSelection();
    e.removeAllRanges(), e.addRange(this.savedSelectionRange);
  }
  /**
   * Clears saved selection
   */
  clearSaved() {
    this.savedSelectionRange = null;
  }
  /**
   * Collapse current selection
   */
  collapseToEnd() {
    const e = window.getSelection(), t = document.createRange();
    t.selectNodeContents(e.focusNode), t.collapse(false), e.removeAllRanges(), e.addRange(t);
  }
  /**
   * Looks ahead to find passed tag from current selection
   *
   * @param  {string} tagName       - tag to found
   * @param  {string} [className]   - tag's class name
   * @param  {number} [searchDepth] - count of tags that can be included. For better performance.
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t, o2 = 10) {
    const i = window.getSelection();
    let s2 = null;
    return !i || !i.anchorNode || !i.focusNode ? null : ([
      /** the Node in which the selection begins */
      i.anchorNode,
      /** the Node in which the selection ends */
      i.focusNode
    ].forEach((a3) => {
      let l2 = o2;
      for (; l2 > 0 && a3.parentNode && !(a3.tagName === e && (s2 = a3, t && a3.classList && !a3.classList.contains(t) && (s2 = null), s2)); )
        a3 = a3.parentNode, l2--;
    }), s2);
  }
  /**
   * Expands selection range to the passed parent node
   *
   * @param {HTMLElement} element - element which contents should be selected
   */
  expandToTag(e) {
    const t = window.getSelection();
    t.removeAllRanges();
    const o2 = document.createRange();
    o2.selectNodeContents(e), t.addRange(o2);
  }
};
function pi(n, e) {
  const { type: t, target: o2, addedNodes: i, removedNodes: s2 } = n;
  return n.type === "attributes" && n.attributeName === "data-empty" ? false : !!(e.contains(o2) || t === "childList" && (Array.from(i).some((l2) => l2 === e) || Array.from(s2).some((l2) => l2 === e)));
}
var ft = "redactor dom changed";
var $o = "block changed";
var zo = "fake cursor is about to be toggled";
var Uo = "fake cursor have been set";
var Te = "editor mobile layout toggled";
function gt(n, e) {
  if (!n.conversionConfig)
    return false;
  const t = n.conversionConfig[e];
  return A(t) || te(t);
}
function He(n, e) {
  return gt(n.tool, e);
}
function Wo(n, e) {
  return Object.entries(n).some(([t, o2]) => e[t] && ri(e[t], o2));
}
async function Yo(n, e) {
  const o2 = (await n.save()).data, i = e.find((s2) => s2.name === n.name);
  return i !== void 0 && !gt(i, "export") ? [] : e.reduce((s2, r) => {
    if (!gt(r, "import") || r.toolbox === void 0)
      return s2;
    const a3 = r.toolbox.filter((l2) => {
      if (V(l2) || l2.icon === void 0)
        return false;
      if (l2.data !== void 0) {
        if (Wo(l2.data, o2))
          return false;
      } else if (r.name === n.name)
        return false;
      return true;
    });
    return s2.push({
      ...r,
      toolbox: a3
    }), s2;
  }, []);
}
function xo(n, e) {
  return n.mergeable ? n.name === e.name ? true : He(e, "export") && He(n, "import") : false;
}
function fi(n, e) {
  const t = e == null ? void 0 : e.export;
  return A(t) ? t(n) : te(t) ? n[t] : (t !== void 0 && S("Conversion \xABexport\xBB property must be a string or function. String means key of saved data object to export. Function should export processed string to export."), "");
}
function Bo(n, e, t) {
  const o2 = e == null ? void 0 : e.import;
  return A(o2) ? o2(n, t) : te(o2) ? {
    [o2]: n
  } : (o2 !== void 0 && S("Conversion \xABimport\xBB property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data."), {});
}
var _ = /* @__PURE__ */ ((n) => (n.Default = "default", n.Separator = "separator", n.Html = "html", n))(_ || {});
var ee = /* @__PURE__ */ ((n) => (n.APPEND_CALLBACK = "appendCallback", n.RENDERED = "rendered", n.MOVED = "moved", n.UPDATED = "updated", n.REMOVED = "removed", n.ON_PASTE = "onPaste", n))(ee || {});
var R = class _R extends Oe {
  /**
   * @param options - block constructor options
   * @param [options.id] - block's id. Will be generated if omitted.
   * @param options.data - Tool's initial data
   * @param options.tool — block's tool
   * @param options.api - Editor API module for pass it to the Block Tunes
   * @param options.readOnly - Read-Only flag
   * @param [eventBus] - Editor common event bus. Allows to subscribe on some Editor events. Could be omitted when "virtual" Block is created. See BlocksAPI@composeBlockData.
   */
  constructor({
    id: e = ni(),
    data: t,
    tool: o2,
    readOnly: i,
    tunesData: s2
  }, r) {
    super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
      this.dropInputsCache(), this.updateCurrentInput();
    }, this.didMutated = (a3 = void 0) => {
      const l2 = a3 === void 0, c3 = a3 instanceof InputEvent;
      !l2 && !c3 && this.detectToolRootChange(a3);
      let d2;
      l2 || c3 ? d2 = true : d2 = !(a3.length > 0 && a3.every((p) => {
        const { addedNodes: g3, removedNodes: f3, target: v4 } = p;
        return [
          ...Array.from(g3),
          ...Array.from(f3),
          v4
        ].some((T3) => (u.isElement(T3) || (T3 = T3.parentElement), T3 && T3.closest('[data-mutation-free="true"]') !== null));
      })), d2 && (this.dropInputsCache(), this.updateCurrentInput(), this.toggleInputsEmptyMark(), this.call(
        "updated"
        /* UPDATED */
      ), this.emit("didMutated", this));
    }, this.name = o2.name, this.id = e, this.settings = o2.settings, this.config = o2.settings.config || {}, this.editorEventBus = r || null, this.blockAPI = new J(this), this.tool = o2, this.toolInstance = o2.create(t, this.blockAPI, i), this.tunes = o2.tunes, this.composeTunes(s2), this.holder = this.compose(), window.requestIdleCallback(() => {
      this.watchBlockMutations(), this.addInputEvents(), this.toggleInputsEmptyMark();
    });
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      wrapper: "ce-block",
      wrapperStretched: "ce-block--stretched",
      content: "ce-block__content",
      selected: "ce-block--selected",
      dropTarget: "ce-block--drop-target"
    };
  }
  /**
   * Find and return all editable elements (contenteditable and native inputs) in the Tool HTML
   */
  get inputs() {
    if (this.cachedInputs.length !== 0)
      return this.cachedInputs;
    const e = u.findAllInputs(this.holder);
    return this.inputIndex > e.length - 1 && (this.inputIndex = e.length - 1), this.cachedInputs = e, e;
  }
  /**
   * Return current Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get currentInput() {
    return this.inputs[this.inputIndex];
  }
  /**
   * Set input index to the passed element
   *
   * @param element - HTML Element to set as current input
   */
  set currentInput(e) {
    const t = this.inputs.findIndex((o2) => o2 === e || o2.contains(e));
    t !== -1 && (this.inputIndex = t);
  }
  /**
   * Return first Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get firstInput() {
    return this.inputs[0];
  }
  /**
   * Return first Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get lastInput() {
    const e = this.inputs;
    return e[e.length - 1];
  }
  /**
   * Return next Tool`s input or undefined if it doesn't exist
   * If Block doesn't contain inputs, return undefined
   */
  get nextInput() {
    return this.inputs[this.inputIndex + 1];
  }
  /**
   * Return previous Tool`s input or undefined if it doesn't exist
   * If Block doesn't contain inputs, return undefined
   */
  get previousInput() {
    return this.inputs[this.inputIndex - 1];
  }
  /**
   * Get Block's JSON data
   *
   * @returns {object}
   */
  get data() {
    return this.save().then((e) => e && !V(e.data) ? e.data : {});
  }
  /**
   * Returns tool's sanitizer config
   *
   * @returns {object}
   */
  get sanitize() {
    return this.tool.sanitizeConfig;
  }
  /**
   * is block mergeable
   * We plugin have merge function then we call it mergeable
   *
   * @returns {boolean}
   */
  get mergeable() {
    return A(this.toolInstance.merge);
  }
  /**
   * If Block contains inputs, it is focusable
   */
  get focusable() {
    return this.inputs.length !== 0;
  }
  /**
   * Check block for emptiness
   *
   * @returns {boolean}
   */
  get isEmpty() {
    const e = u.isEmpty(this.pluginsContent, "/"), t = !this.hasMedia;
    return e && t;
  }
  /**
   * Check if block has a media content such as images, iframe and other
   *
   * @returns {boolean}
   */
  get hasMedia() {
    const e = [
      "img",
      "iframe",
      "video",
      "audio",
      "source",
      "input",
      "textarea",
      "twitterwidget"
    ];
    return !!this.holder.querySelector(e.join(","));
  }
  /**
   * Set selected state
   * We don't need to mark Block as Selected when it is empty
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set selected(e) {
    var i, s2;
    this.holder.classList.toggle(_R.CSS.selected, e);
    const t = e === true && b.isRangeInsideContainer(this.holder), o2 = e === false && b.isFakeCursorInsideContainer(this.holder);
    (t || o2) && ((i = this.editorEventBus) == null || i.emit(zo, { state: e }), t ? b.addFakeCursor() : b.removeFakeCursor(this.holder), (s2 = this.editorEventBus) == null || s2.emit(Uo, { state: e }));
  }
  /**
   * Returns True if it is Selected
   *
   * @returns {boolean}
   */
  get selected() {
    return this.holder.classList.contains(_R.CSS.selected);
  }
  /**
   * Set stretched state
   *
   * @param {boolean} state - 'true' to enable, 'false' to disable stretched state
   */
  set stretched(e) {
    this.holder.classList.toggle(_R.CSS.wrapperStretched, e);
  }
  /**
   * Return Block's stretched state
   *
   * @returns {boolean}
   */
  get stretched() {
    return this.holder.classList.contains(_R.CSS.wrapperStretched);
  }
  /**
   * Toggle drop target state
   *
   * @param {boolean} state - 'true' if block is drop target, false otherwise
   */
  set dropTarget(e) {
    this.holder.classList.toggle(_R.CSS.dropTarget, e);
  }
  /**
   * Returns Plugins content
   *
   * @returns {HTMLElement}
   */
  get pluginsContent() {
    return this.toolRenderedElement;
  }
  /**
   * Calls Tool's method
   *
   * Method checks tool property {MethodName}. Fires method with passes params If it is instance of Function
   *
   * @param {string} methodName - method to call
   * @param {object} params - method argument
   */
  call(e, t) {
    if (A(this.toolInstance[e])) {
      e === "appendCallback" && S(
        "`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead",
        "warn"
      );
      try {
        this.toolInstance[e].call(this.toolInstance, t);
      } catch (o2) {
        S(`Error during '${e}' call: ${o2.message}`, "error");
      }
    }
  }
  /**
   * Call plugins merge method
   *
   * @param {BlockToolData} data - data to merge
   */
  async mergeWith(e) {
    await this.toolInstance.merge(e);
  }
  /**
   * Extracts data from Block
   * Groups Tool's save processing time
   *
   * @returns {object}
   */
  async save() {
    const e = await this.toolInstance.save(this.pluginsContent), t = this.unavailableTunesData;
    [
      ...this.tunesInstances.entries(),
      ...this.defaultTunesInstances.entries()
    ].forEach(([s2, r]) => {
      if (A(r.save))
        try {
          t[s2] = r.save();
        } catch (a3) {
          S(`Tune ${r.constructor.name} save method throws an Error %o`, "warn", a3);
        }
    });
    const o2 = window.performance.now();
    let i;
    return Promise.resolve(e).then((s2) => (i = window.performance.now(), {
      id: this.id,
      tool: this.name,
      data: s2,
      tunes: t,
      time: i - o2
    })).catch((s2) => {
      S(`Saving process for ${this.name} tool failed due to the ${s2}`, "log", "red");
    });
  }
  /**
   * Uses Tool's validation method to check the correctness of output data
   * Tool's validation method is optional
   *
   * @description Method returns true|false whether data passed the validation or not
   * @param {BlockToolData} data - data to validate
   * @returns {Promise<boolean>} valid
   */
  async validate(e) {
    let t = true;
    return this.toolInstance.validate instanceof Function && (t = await this.toolInstance.validate(e)), t;
  }
  /**
   * Returns data to render in Block Tunes menu.
   * Splits block tunes into 2 groups: block specific tunes and common tunes
   */
  getTunes() {
    const e = [], t = [], o2 = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [];
    return u.isElement(o2) ? e.push({
      type: _.Html,
      element: o2
    }) : Array.isArray(o2) ? e.push(...o2) : e.push(o2), [
      ...this.tunesInstances.values(),
      ...this.defaultTunesInstances.values()
    ].map((s2) => s2.render()).forEach((s2) => {
      u.isElement(s2) ? t.push({
        type: _.Html,
        element: s2
      }) : Array.isArray(s2) ? t.push(...s2) : t.push(s2);
    }), {
      toolTunes: e,
      commonTunes: t
    };
  }
  /**
   * Update current input index with selection anchor node
   */
  updateCurrentInput() {
    this.currentInput = u.isNativeInput(document.activeElement) || !b.anchorNode ? document.activeElement : b.anchorNode;
  }
  /**
   * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
   * Can be useful for block changes invisible for editor core.
   */
  dispatchChange() {
    this.didMutated();
  }
  /**
   * Call Tool instance destroy method
   */
  destroy() {
    this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), A(this.toolInstance.destroy) && this.toolInstance.destroy();
  }
  /**
   * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
   * This method returns the entry that is related to the Block (depended on the Block data)
   */
  async getActiveToolboxEntry() {
    const e = this.tool.toolbox;
    if (e.length === 1)
      return Promise.resolve(this.tool.toolbox[0]);
    const t = await this.data, o2 = e;
    return o2 == null ? void 0 : o2.find((i) => Wo(i.data, t));
  }
  /**
   * Exports Block data as string using conversion config
   */
  async exportDataAsString() {
    const e = await this.data;
    return fi(e, this.tool.conversionConfig);
  }
  /**
   * Make default Block wrappers and put Tool`s content there
   *
   * @returns {HTMLDivElement}
   */
  compose() {
    const e = u.make("div", _R.CSS.wrapper), t = u.make("div", _R.CSS.content), o2 = this.toolInstance.render();
    e.dataset.id = this.id, this.toolRenderedElement = o2, t.appendChild(this.toolRenderedElement);
    let i = t;
    return [...this.tunesInstances.values(), ...this.defaultTunesInstances.values()].forEach((s2) => {
      if (A(s2.wrap))
        try {
          i = s2.wrap(i);
        } catch (r) {
          S(`Tune ${s2.constructor.name} wrap method throws an Error %o`, "warn", r);
        }
    }), e.appendChild(i), e;
  }
  /**
   * Instantiate Block Tunes
   *
   * @param tunesData - current Block tunes data
   * @private
   */
  composeTunes(e) {
    Array.from(this.tunes.values()).forEach((t) => {
      (t.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(t.name, t.create(e[t.name], this.blockAPI));
    }), Object.entries(e).forEach(([t, o2]) => {
      this.tunesInstances.has(t) || (this.unavailableTunesData[t] = o2);
    });
  }
  /**
   * Adds focus event listeners to all inputs and contenteditable
   */
  addInputEvents() {
    this.inputs.forEach((e) => {
      e.addEventListener("focus", this.handleFocus), u.isNativeInput(e) && e.addEventListener("input", this.didMutated);
    });
  }
  /**
   * removes focus event listeners from all inputs and contenteditable
   */
  removeInputEvents() {
    this.inputs.forEach((e) => {
      e.removeEventListener("focus", this.handleFocus), u.isNativeInput(e) && e.removeEventListener("input", this.didMutated);
    });
  }
  /**
   * Listen common editor Dom Changed event and detect mutations related to the  Block
   */
  watchBlockMutations() {
    var e;
    this.redactorDomChangedCallback = (t) => {
      const { mutations: o2 } = t;
      o2.some((s2) => pi(s2, this.toolRenderedElement)) && this.didMutated(o2);
    }, (e = this.editorEventBus) == null || e.on(ft, this.redactorDomChangedCallback);
  }
  /**
   * Remove redactor dom change event listener
   */
  unwatchBlockMutations() {
    var e;
    (e = this.editorEventBus) == null || e.off(ft, this.redactorDomChangedCallback);
  }
  /**
   * Sometimes Tool can replace own main element, for example H2 -> H4 or UL -> OL
   * We need to detect such changes and update a link to tools main element with the new one
   *
   * @param mutations - records of block content mutations
   */
  detectToolRootChange(e) {
    e.forEach((t) => {
      if (Array.from(t.removedNodes).includes(this.toolRenderedElement)) {
        const i = t.addedNodes[t.addedNodes.length - 1];
        this.toolRenderedElement = i;
      }
    });
  }
  /**
   * Clears inputs cached value
   */
  dropInputsCache() {
    this.cachedInputs = [];
  }
  /**
   * Mark inputs with 'data-empty' attribute with the empty state
   */
  toggleInputsEmptyMark() {
    this.inputs.forEach(Do);
  }
};
var gi = class extends E {
  constructor() {
    super(...arguments), this.insert = (e = this.config.defaultBlock, t = {}, o2 = {}, i, s2, r, a3) => {
      const l2 = this.Editor.BlockManager.insert({
        id: a3,
        tool: e,
        data: t,
        index: i,
        needToFocus: s2,
        replace: r
      });
      return new J(l2);
    }, this.composeBlockData = async (e) => {
      const t = this.Editor.Tools.blockTools.get(e);
      return new R({
        tool: t,
        api: this.Editor.API,
        readOnly: true,
        data: {},
        tunesData: {}
      }).data;
    }, this.update = async (e, t, o2) => {
      const { BlockManager: i } = this.Editor, s2 = i.getBlockById(e);
      if (s2 === void 0)
        throw new Error(`Block with id "${e}" not found`);
      const r = await i.update(s2, t, o2);
      return new J(r);
    }, this.convert = async (e, t, o2) => {
      var h3, p;
      const { BlockManager: i, Tools: s2 } = this.Editor, r = i.getBlockById(e);
      if (!r)
        throw new Error(`Block with id "${e}" not found`);
      const a3 = s2.blockTools.get(r.name), l2 = s2.blockTools.get(t);
      if (!l2)
        throw new Error(`Block Tool with type "${t}" not found`);
      const c3 = ((h3 = a3 == null ? void 0 : a3.conversionConfig) == null ? void 0 : h3.export) !== void 0, d2 = ((p = l2.conversionConfig) == null ? void 0 : p.import) !== void 0;
      if (c3 && d2) {
        const g3 = await i.convert(r, t, o2);
        return new J(g3);
      } else {
        const g3 = [
          c3 ? false : je(r.name),
          d2 ? false : je(t)
        ].filter(Boolean).join(" and ");
        throw new Error(`Conversion from "${r.name}" to "${t}" is not possible. ${g3} tool(s) should provide a "conversionConfig"`);
      }
    }, this.insertMany = (e, t = this.Editor.BlockManager.blocks.length - 1) => {
      this.validateIndex(t);
      const o2 = e.map(({ id: i, type: s2, data: r }) => this.Editor.BlockManager.composeBlock({
        id: i,
        tool: s2 || this.config.defaultBlock,
        data: r
      }));
      return this.Editor.BlockManager.insertMany(o2, t), o2.map((i) => new J(i));
    };
  }
  /**
   * Available methods
   *
   * @returns {Blocks}
   */
  get methods() {
    return {
      clear: () => this.clear(),
      render: (e) => this.render(e),
      renderFromHTML: (e) => this.renderFromHTML(e),
      delete: (e) => this.delete(e),
      swap: (e, t) => this.swap(e, t),
      move: (e, t) => this.move(e, t),
      getBlockByIndex: (e) => this.getBlockByIndex(e),
      getById: (e) => this.getById(e),
      getCurrentBlockIndex: () => this.getCurrentBlockIndex(),
      getBlockIndex: (e) => this.getBlockIndex(e),
      getBlocksCount: () => this.getBlocksCount(),
      getBlockByElement: (e) => this.getBlockByElement(e),
      stretchBlock: (e, t = true) => this.stretchBlock(e, t),
      insertNewBlock: () => this.insertNewBlock(),
      insert: this.insert,
      insertMany: this.insertMany,
      update: this.update,
      composeBlockData: this.composeBlockData,
      convert: this.convert
    };
  }
  /**
   * Returns Blocks count
   *
   * @returns {number}
   */
  getBlocksCount() {
    return this.Editor.BlockManager.blocks.length;
  }
  /**
   * Returns current block index
   *
   * @returns {number}
   */
  getCurrentBlockIndex() {
    return this.Editor.BlockManager.currentBlockIndex;
  }
  /**
   * Returns the index of Block by id;
   *
   * @param id - block id
   */
  getBlockIndex(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    if (!t) {
      X("There is no block with id `" + e + "`", "warn");
      return;
    }
    return this.Editor.BlockManager.getBlockIndex(t);
  }
  /**
   * Returns BlockAPI object by Block index
   *
   * @param {number} index - index to get
   */
  getBlockByIndex(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(e);
    if (t === void 0) {
      X("There is no block at index `" + e + "`", "warn");
      return;
    }
    return new J(t);
  }
  /**
   * Returns BlockAPI object by Block id
   *
   * @param id - id of block to get
   */
  getById(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    return t === void 0 ? (X("There is no block with id `" + e + "`", "warn"), null) : new J(t);
  }
  /**
   * Get Block API object by any child html element
   *
   * @param element - html element to get Block by
   */
  getBlockByElement(e) {
    const t = this.Editor.BlockManager.getBlock(e);
    if (t === void 0) {
      X("There is no block corresponding to element `" + e + "`", "warn");
      return;
    }
    return new J(t);
  }
  /**
   * Call Block Manager method that swap Blocks
   *
   * @param {number} fromIndex - position of first Block
   * @param {number} toIndex - position of second Block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    S(
      "`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead",
      "info"
    ), this.Editor.BlockManager.swap(e, t);
  }
  /**
   * Move block from one index to another
   *
   * @param {number} toIndex - index to move to
   * @param {number} fromIndex - index to move from
   */
  move(e, t) {
    this.Editor.BlockManager.move(e, t);
  }
  /**
   * Deletes Block
   *
   * @param {number} blockIndex - index of Block to delete
   */
  delete(e = this.Editor.BlockManager.currentBlockIndex) {
    try {
      const t = this.Editor.BlockManager.getBlockByIndex(e);
      this.Editor.BlockManager.removeBlock(t);
    } catch (t) {
      X(t, "warn");
      return;
    }
    this.Editor.BlockManager.blocks.length === 0 && this.Editor.BlockManager.insert(), this.Editor.BlockManager.currentBlock && this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END), this.Editor.Toolbar.close();
  }
  /**
   * Clear Editor's area
   */
  async clear() {
    await this.Editor.BlockManager.clear(true), this.Editor.InlineToolbar.close();
  }
  /**
   * Fills Editor with Blocks data
   *
   * @param {OutputData} data — Saved Editor data
   */
  async render(e) {
    if (e === void 0 || e.blocks === void 0)
      throw new Error("Incorrect data passed to the render() method");
    this.Editor.ModificationsObserver.disable(), await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(e.blocks), this.Editor.ModificationsObserver.enable();
  }
  /**
   * Render passed HTML string
   *
   * @param {string} data - HTML string to render
   * @returns {Promise<void>}
   */
  async renderFromHTML(e) {
    return await this.Editor.BlockManager.clear(), this.Editor.Paste.processText(e, true);
  }
  /**
   * Stretch Block's content
   *
   * @param {number} index - index of Block to stretch
   * @param {boolean} status - true to enable, false to disable
   * @deprecated Use BlockAPI interface to stretch Blocks
   */
  stretchBlock(e, t = true) {
    ht(
      true,
      "blocks.stretchBlock()",
      "BlockAPI"
    );
    const o2 = this.Editor.BlockManager.getBlockByIndex(e);
    o2 && (o2.stretched = t);
  }
  /**
   * Insert new Block
   * After set caret to this Block
   *
   * @todo remove in 3.0.0
   * @deprecated with insert() method
   */
  insertNewBlock() {
    S("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
  }
  /**
   * Validated block index and throws an error if it's invalid
   *
   * @param index - index to validate
   */
  validateIndex(e) {
    if (typeof e != "number")
      throw new Error("Index should be a number");
    if (e < 0)
      throw new Error("Index should be greater than or equal to 0");
    if (e === null)
      throw new Error("Index should be greater than or equal to 0");
  }
};
function mi(n, e) {
  return typeof n == "number" ? e.BlockManager.getBlockByIndex(n) : typeof n == "string" ? e.BlockManager.getBlockById(n) : e.BlockManager.getBlockById(n.id);
}
var bi = class extends E {
  constructor() {
    super(...arguments), this.setToFirstBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, e, t), true) : false, this.setToLastBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, e, t), true) : false, this.setToPreviousBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, e, t), true) : false, this.setToNextBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, e, t), true) : false, this.setToBlock = (e, t = this.Editor.Caret.positions.DEFAULT, o2 = 0) => {
      const i = mi(e, this.Editor);
      return i === void 0 ? false : (this.Editor.Caret.setToBlock(i, t, o2), true);
    }, this.focus = (e = false) => e ? this.setToLastBlock(this.Editor.Caret.positions.END) : this.setToFirstBlock(this.Editor.Caret.positions.START);
  }
  /**
   * Available methods
   *
   * @returns {Caret}
   */
  get methods() {
    return {
      setToFirstBlock: this.setToFirstBlock,
      setToLastBlock: this.setToLastBlock,
      setToPreviousBlock: this.setToPreviousBlock,
      setToNextBlock: this.setToNextBlock,
      setToBlock: this.setToBlock,
      focus: this.focus
    };
  }
};
var vi = class extends E {
  /**
   * Available methods
   *
   * @returns {Events}
   */
  get methods() {
    return {
      emit: (e, t) => this.emit(e, t),
      off: (e, t) => this.off(e, t),
      on: (e, t) => this.on(e, t)
    };
  }
  /**
   * Subscribe on Events
   *
   * @param {string} eventName - event name to subscribe
   * @param {Function} callback - event handler
   */
  on(e, t) {
    this.eventsDispatcher.on(e, t);
  }
  /**
   * Emit event with data
   *
   * @param {string} eventName - event to emit
   * @param {object} data - event's data
   */
  emit(e, t) {
    this.eventsDispatcher.emit(e, t);
  }
  /**
   * Unsubscribe from Event
   *
   * @param {string} eventName - event to unsubscribe
   * @param {Function} callback - event handler
   */
  off(e, t) {
    this.eventsDispatcher.off(e, t);
  }
};
var kt = class _kt extends E {
  /**
   * Return namespace section for tool or block tune
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  static getNamespace(e, t) {
    return t ? `blockTunes.${e}` : `tools.${e}`;
  }
  /**
   * Return I18n API methods with global dictionary access
   */
  get methods() {
    return {
      t: () => {
        X("I18n.t() method can be accessed only from Tools", "warn");
      }
    };
  }
  /**
   * Return I18n API methods with tool namespaced dictionary
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  getMethodsForTool(e, t) {
    return Object.assign(
      this.methods,
      {
        t: (o2) => z.t(_kt.getNamespace(e, t), o2)
      }
    );
  }
};
var ki = class extends E {
  /**
   * Editor.js Core API modules
   */
  get methods() {
    return {
      blocks: this.Editor.BlocksAPI.methods,
      caret: this.Editor.CaretAPI.methods,
      tools: this.Editor.ToolsAPI.methods,
      events: this.Editor.EventsAPI.methods,
      listeners: this.Editor.ListenersAPI.methods,
      notifier: this.Editor.NotifierAPI.methods,
      sanitizer: this.Editor.SanitizerAPI.methods,
      saver: this.Editor.SaverAPI.methods,
      selection: this.Editor.SelectionAPI.methods,
      styles: this.Editor.StylesAPI.classes,
      toolbar: this.Editor.ToolbarAPI.methods,
      inlineToolbar: this.Editor.InlineToolbarAPI.methods,
      tooltip: this.Editor.TooltipAPI.methods,
      i18n: this.Editor.I18nAPI.methods,
      readOnly: this.Editor.ReadOnlyAPI.methods,
      ui: this.Editor.UiAPI.methods
    };
  }
  /**
   * Returns Editor.js Core API methods for passed tool
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  getMethodsForTool(e, t) {
    return Object.assign(
      this.methods,
      {
        i18n: this.Editor.I18nAPI.getMethodsForTool(e, t)
      }
    );
  }
};
var yi = class extends E {
  /**
   * Available methods
   *
   * @returns {InlineToolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open()
    };
  }
  /**
   * Open Inline Toolbar
   */
  open() {
    this.Editor.InlineToolbar.tryToShow();
  }
  /**
   * Close Inline Toolbar
   */
  close() {
    this.Editor.InlineToolbar.close();
  }
};
var wi = class extends E {
  /**
   * Available methods
   *
   * @returns {Listeners}
   */
  get methods() {
    return {
      on: (e, t, o2, i) => this.on(e, t, o2, i),
      off: (e, t, o2, i) => this.off(e, t, o2, i),
      offById: (e) => this.offById(e)
    };
  }
  /**
   * Ads a DOM event listener. Return it's id.
   *
   * @param {HTMLElement} element - Element to set handler to
   * @param {string} eventType - event type
   * @param {() => void} handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  on(e, t, o2, i) {
    return this.listeners.on(e, t, o2, i);
  }
  /**
   * Removes DOM listener from element
   *
   * @param {Element} element - Element to remove handler from
   * @param eventType - event type
   * @param handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  off(e, t, o2, i) {
    this.listeners.off(e, t, o2, i);
  }
  /**
   * Removes DOM listener by the listener id
   *
   * @param id - id of the listener to remove
   */
  offById(e) {
    this.listeners.offById(e);
  }
};
var Ko = { exports: {} };
(function(n, e) {
  (function(t, o2) {
    n.exports = o2();
  })(window, function() {
    return (function(t) {
      var o2 = {};
      function i(s2) {
        if (o2[s2])
          return o2[s2].exports;
        var r = o2[s2] = { i: s2, l: false, exports: {} };
        return t[s2].call(r.exports, r, r.exports, i), r.l = true, r.exports;
      }
      return i.m = t, i.c = o2, i.d = function(s2, r, a3) {
        i.o(s2, r) || Object.defineProperty(s2, r, { enumerable: true, get: a3 });
      }, i.r = function(s2) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s2, "__esModule", { value: true });
      }, i.t = function(s2, r) {
        if (1 & r && (s2 = i(s2)), 8 & r || 4 & r && typeof s2 == "object" && s2 && s2.__esModule)
          return s2;
        var a3 = /* @__PURE__ */ Object.create(null);
        if (i.r(a3), Object.defineProperty(a3, "default", { enumerable: true, value: s2 }), 2 & r && typeof s2 != "string")
          for (var l2 in s2)
            i.d(a3, l2, (function(c3) {
              return s2[c3];
            }).bind(null, l2));
        return a3;
      }, i.n = function(s2) {
        var r = s2 && s2.__esModule ? function() {
          return s2.default;
        } : function() {
          return s2;
        };
        return i.d(r, "a", r), r;
      }, i.o = function(s2, r) {
        return Object.prototype.hasOwnProperty.call(s2, r);
      }, i.p = "/", i(i.s = 0);
    })([function(t, o2, i) {
      i(1), /*!
      * Codex JavaScript Notification module
      * https://github.com/codex-team/js-notifier
      */
      t.exports = (function() {
        var s2 = i(6), r = "cdx-notify--bounce-in", a3 = null;
        return { show: function(l2) {
          if (l2.message) {
            (function() {
              if (a3)
                return true;
              a3 = s2.getWrapper(), document.body.appendChild(a3);
            })();
            var c3 = null, d2 = l2.time || 8e3;
            switch (l2.type) {
              case "confirm":
                c3 = s2.confirm(l2);
                break;
              case "prompt":
                c3 = s2.prompt(l2);
                break;
              default:
                c3 = s2.alert(l2), window.setTimeout(function() {
                  c3.remove();
                }, d2);
            }
            a3.appendChild(c3), c3.classList.add(r);
          }
        } };
      })();
    }, function(t, o2, i) {
      var s2 = i(2);
      typeof s2 == "string" && (s2 = [[t.i, s2, ""]]);
      var r = { hmr: true, transform: void 0, insertInto: void 0 };
      i(4)(s2, r), s2.locals && (t.exports = s2.locals);
    }, function(t, o2, i) {
      (t.exports = i(3)(false)).push([t.i, `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`, ""]);
    }, function(t, o2) {
      t.exports = function(i) {
        var s2 = [];
        return s2.toString = function() {
          return this.map(function(r) {
            var a3 = (function(l2, c3) {
              var d2 = l2[1] || "", h3 = l2[3];
              if (!h3)
                return d2;
              if (c3 && typeof btoa == "function") {
                var p = (f3 = h3, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(f3)))) + " */"), g3 = h3.sources.map(function(v4) {
                  return "/*# sourceURL=" + h3.sourceRoot + v4 + " */";
                });
                return [d2].concat(g3).concat([p]).join(`
`);
              }
              var f3;
              return [d2].join(`
`);
            })(r, i);
            return r[2] ? "@media " + r[2] + "{" + a3 + "}" : a3;
          }).join("");
        }, s2.i = function(r, a3) {
          typeof r == "string" && (r = [[null, r, ""]]);
          for (var l2 = {}, c3 = 0; c3 < this.length; c3++) {
            var d2 = this[c3][0];
            typeof d2 == "number" && (l2[d2] = true);
          }
          for (c3 = 0; c3 < r.length; c3++) {
            var h3 = r[c3];
            typeof h3[0] == "number" && l2[h3[0]] || (a3 && !h3[2] ? h3[2] = a3 : a3 && (h3[2] = "(" + h3[2] + ") and (" + a3 + ")"), s2.push(h3));
          }
        }, s2;
      };
    }, function(t, o2, i) {
      var s2, r, a3 = {}, l2 = (s2 = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return r === void 0 && (r = s2.apply(this, arguments)), r;
      }), c3 = /* @__PURE__ */ (function(k3) {
        var m3 = {};
        return function(w2) {
          if (typeof w2 == "function")
            return w2();
          if (m3[w2] === void 0) {
            var x4 = (function(I3) {
              return document.querySelector(I3);
            }).call(this, w2);
            if (window.HTMLIFrameElement && x4 instanceof window.HTMLIFrameElement)
              try {
                x4 = x4.contentDocument.head;
              } catch {
                x4 = null;
              }
            m3[w2] = x4;
          }
          return m3[w2];
        };
      })(), d2 = null, h3 = 0, p = [], g3 = i(5);
      function f3(k3, m3) {
        for (var w2 = 0; w2 < k3.length; w2++) {
          var x4 = k3[w2], I3 = a3[x4.id];
          if (I3) {
            I3.refs++;
            for (var C3 = 0; C3 < I3.parts.length; C3++)
              I3.parts[C3](x4.parts[C3]);
            for (; C3 < x4.parts.length; C3++)
              I3.parts.push(F3(x4.parts[C3], m3));
          } else {
            var N2 = [];
            for (C3 = 0; C3 < x4.parts.length; C3++)
              N2.push(F3(x4.parts[C3], m3));
            a3[x4.id] = { id: x4.id, refs: 1, parts: N2 };
          }
        }
      }
      function v4(k3, m3) {
        for (var w2 = [], x4 = {}, I3 = 0; I3 < k3.length; I3++) {
          var C3 = k3[I3], N2 = m3.base ? C3[0] + m3.base : C3[0], B4 = { css: C3[1], media: C3[2], sourceMap: C3[3] };
          x4[N2] ? x4[N2].parts.push(B4) : w2.push(x4[N2] = { id: N2, parts: [B4] });
        }
        return w2;
      }
      function O4(k3, m3) {
        var w2 = c3(k3.insertInto);
        if (!w2)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var x4 = p[p.length - 1];
        if (k3.insertAt === "top")
          x4 ? x4.nextSibling ? w2.insertBefore(m3, x4.nextSibling) : w2.appendChild(m3) : w2.insertBefore(m3, w2.firstChild), p.push(m3);
        else if (k3.insertAt === "bottom")
          w2.appendChild(m3);
        else {
          if (typeof k3.insertAt != "object" || !k3.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var I3 = c3(k3.insertInto + " " + k3.insertAt.before);
          w2.insertBefore(m3, I3);
        }
      }
      function T3(k3) {
        if (k3.parentNode === null)
          return false;
        k3.parentNode.removeChild(k3);
        var m3 = p.indexOf(k3);
        m3 >= 0 && p.splice(m3, 1);
      }
      function M3(k3) {
        var m3 = document.createElement("style");
        return k3.attrs.type === void 0 && (k3.attrs.type = "text/css"), q3(m3, k3.attrs), O4(k3, m3), m3;
      }
      function q3(k3, m3) {
        Object.keys(m3).forEach(function(w2) {
          k3.setAttribute(w2, m3[w2]);
        });
      }
      function F3(k3, m3) {
        var w2, x4, I3, C3;
        if (m3.transform && k3.css) {
          if (!(C3 = m3.transform(k3.css)))
            return function() {
            };
          k3.css = C3;
        }
        if (m3.singleton) {
          var N2 = h3++;
          w2 = d2 || (d2 = M3(m3)), x4 = ie2.bind(null, w2, N2, false), I3 = ie2.bind(null, w2, N2, true);
        } else
          k3.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (w2 = (function(B4) {
            var W2 = document.createElement("link");
            return B4.attrs.type === void 0 && (B4.attrs.type = "text/css"), B4.attrs.rel = "stylesheet", q3(W2, B4.attrs), O4(B4, W2), W2;
          })(m3), x4 = (function(B4, W2, ve2) {
            var se2 = ve2.css, tt2 = ve2.sourceMap, Yn2 = W2.convertToAbsoluteUrls === void 0 && tt2;
            (W2.convertToAbsoluteUrls || Yn2) && (se2 = g3(se2)), tt2 && (se2 += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(tt2)))) + " */");
            var Kn2 = new Blob([se2], { type: "text/css" }), ko = B4.href;
            B4.href = URL.createObjectURL(Kn2), ko && URL.revokeObjectURL(ko);
          }).bind(null, w2, m3), I3 = function() {
            T3(w2), w2.href && URL.revokeObjectURL(w2.href);
          }) : (w2 = M3(m3), x4 = (function(B4, W2) {
            var ve2 = W2.css, se2 = W2.media;
            if (se2 && B4.setAttribute("media", se2), B4.styleSheet)
              B4.styleSheet.cssText = ve2;
            else {
              for (; B4.firstChild; )
                B4.removeChild(B4.firstChild);
              B4.appendChild(document.createTextNode(ve2));
            }
          }).bind(null, w2), I3 = function() {
            T3(w2);
          });
        return x4(k3), function(B4) {
          if (B4) {
            if (B4.css === k3.css && B4.media === k3.media && B4.sourceMap === k3.sourceMap)
              return;
            x4(k3 = B4);
          } else
            I3();
        };
      }
      t.exports = function(k3, m3) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (m3 = m3 || {}).attrs = typeof m3.attrs == "object" ? m3.attrs : {}, m3.singleton || typeof m3.singleton == "boolean" || (m3.singleton = l2()), m3.insertInto || (m3.insertInto = "head"), m3.insertAt || (m3.insertAt = "bottom");
        var w2 = v4(k3, m3);
        return f3(w2, m3), function(x4) {
          for (var I3 = [], C3 = 0; C3 < w2.length; C3++) {
            var N2 = w2[C3];
            (B4 = a3[N2.id]).refs--, I3.push(B4);
          }
          for (x4 && f3(v4(x4, m3), m3), C3 = 0; C3 < I3.length; C3++) {
            var B4;
            if ((B4 = I3[C3]).refs === 0) {
              for (var W2 = 0; W2 < B4.parts.length; W2++)
                B4.parts[W2]();
              delete a3[B4.id];
            }
          }
        };
      };
      var H4, Q2 = (H4 = [], function(k3, m3) {
        return H4[k3] = m3, H4.filter(Boolean).join(`
`);
      });
      function ie2(k3, m3, w2, x4) {
        var I3 = w2 ? "" : x4.css;
        if (k3.styleSheet)
          k3.styleSheet.cssText = Q2(m3, I3);
        else {
          var C3 = document.createTextNode(I3), N2 = k3.childNodes;
          N2[m3] && k3.removeChild(N2[m3]), N2.length ? k3.insertBefore(C3, N2[m3]) : k3.appendChild(C3);
        }
      }
    }, function(t, o2) {
      t.exports = function(i) {
        var s2 = typeof window < "u" && window.location;
        if (!s2)
          throw new Error("fixUrls requires window.location");
        if (!i || typeof i != "string")
          return i;
        var r = s2.protocol + "//" + s2.host, a3 = r + s2.pathname.replace(/\/[^\/]*$/, "/");
        return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l2, c3) {
          var d2, h3 = c3.trim().replace(/^"(.*)"$/, function(p, g3) {
            return g3;
          }).replace(/^'(.*)'$/, function(p, g3) {
            return g3;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(h3) ? l2 : (d2 = h3.indexOf("//") === 0 ? h3 : h3.indexOf("/") === 0 ? r + h3 : a3 + h3.replace(/^\.\//, ""), "url(" + JSON.stringify(d2) + ")");
        });
      };
    }, function(t, o2, i) {
      var s2, r, a3, l2, c3, d2, h3, p, g3;
      t.exports = (s2 = "cdx-notifies", r = "cdx-notify", a3 = "cdx-notify__cross", l2 = "cdx-notify__button--confirm", c3 = "cdx-notify__button--cancel", d2 = "cdx-notify__input", h3 = "cdx-notify__button", p = "cdx-notify__btns-wrapper", { alert: g3 = function(f3) {
        var v4 = document.createElement("DIV"), O4 = document.createElement("DIV"), T3 = f3.message, M3 = f3.style;
        return v4.classList.add(r), M3 && v4.classList.add(r + "--" + M3), v4.innerHTML = T3, O4.classList.add(a3), O4.addEventListener("click", v4.remove.bind(v4)), v4.appendChild(O4), v4;
      }, confirm: function(f3) {
        var v4 = g3(f3), O4 = document.createElement("div"), T3 = document.createElement("button"), M3 = document.createElement("button"), q3 = v4.querySelector("." + a3), F3 = f3.cancelHandler, H4 = f3.okHandler;
        return O4.classList.add(p), T3.innerHTML = f3.okText || "Confirm", M3.innerHTML = f3.cancelText || "Cancel", T3.classList.add(h3), M3.classList.add(h3), T3.classList.add(l2), M3.classList.add(c3), F3 && typeof F3 == "function" && (M3.addEventListener("click", F3), q3.addEventListener("click", F3)), H4 && typeof H4 == "function" && T3.addEventListener("click", H4), T3.addEventListener("click", v4.remove.bind(v4)), M3.addEventListener("click", v4.remove.bind(v4)), O4.appendChild(T3), O4.appendChild(M3), v4.appendChild(O4), v4;
      }, prompt: function(f3) {
        var v4 = g3(f3), O4 = document.createElement("div"), T3 = document.createElement("button"), M3 = document.createElement("input"), q3 = v4.querySelector("." + a3), F3 = f3.cancelHandler, H4 = f3.okHandler;
        return O4.classList.add(p), T3.innerHTML = f3.okText || "Ok", T3.classList.add(h3), T3.classList.add(l2), M3.classList.add(d2), f3.placeholder && M3.setAttribute("placeholder", f3.placeholder), f3.default && (M3.value = f3.default), f3.inputType && (M3.type = f3.inputType), F3 && typeof F3 == "function" && q3.addEventListener("click", F3), H4 && typeof H4 == "function" && T3.addEventListener("click", function() {
          H4(M3.value);
        }), T3.addEventListener("click", v4.remove.bind(v4)), O4.appendChild(M3), O4.appendChild(T3), v4.appendChild(O4), v4;
      }, getWrapper: function() {
        var f3 = document.createElement("DIV");
        return f3.classList.add(s2), f3;
      } });
    }]);
  });
})(Ko);
var Ei = Ko.exports;
var xi = /* @__PURE__ */ Ke(Ei);
var Bi = class {
  /**
   * Show web notification
   *
   * @param {NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions} options - notification options
   */
  show(e) {
    xi.show(e);
  }
};
var Ci = class extends E {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.notifier = new Bi();
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e) => this.show(e)
    };
  }
  /**
   * Show notification
   *
   * @param {NotifierOptions} options - message option
   */
  show(e) {
    return this.notifier.show(e);
  }
};
var Ti = class extends E {
  /**
   * Available methods
   */
  get methods() {
    const e = () => this.isEnabled;
    return {
      toggle: (t) => this.toggle(t),
      get isEnabled() {
        return e();
      }
    };
  }
  /**
   * Set or toggle read-only state
   *
   * @param {boolean|undefined} state - set or toggle state
   * @returns {boolean} current value
   */
  toggle(e) {
    return this.Editor.ReadOnly.toggle(e);
  }
  /**
   * Returns current read-only state
   */
  get isEnabled() {
    return this.Editor.ReadOnly.isEnabled;
  }
};
var Xo = { exports: {} };
(function(n, e) {
  (function(t, o2) {
    n.exports = o2();
  })(Ce, function() {
    function t(h3) {
      var p = h3.tags, g3 = Object.keys(p), f3 = g3.map(function(v4) {
        return typeof p[v4];
      }).every(function(v4) {
        return v4 === "object" || v4 === "boolean" || v4 === "function";
      });
      if (!f3)
        throw new Error("The configuration was invalid");
      this.config = h3;
    }
    var o2 = ["P", "LI", "TD", "TH", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"];
    function i(h3) {
      return o2.indexOf(h3.nodeName) !== -1;
    }
    var s2 = ["A", "B", "STRONG", "I", "EM", "SUB", "SUP", "U", "STRIKE"];
    function r(h3) {
      return s2.indexOf(h3.nodeName) !== -1;
    }
    t.prototype.clean = function(h3) {
      const p = document.implementation.createHTMLDocument(), g3 = p.createElement("div");
      return g3.innerHTML = h3, this._sanitize(p, g3), g3.innerHTML;
    }, t.prototype._sanitize = function(h3, p) {
      var g3 = a3(h3, p), f3 = g3.firstChild();
      if (f3)
        do {
          if (f3.nodeType === Node.TEXT_NODE)
            if (f3.data.trim() === "" && (f3.previousElementSibling && i(f3.previousElementSibling) || f3.nextElementSibling && i(f3.nextElementSibling))) {
              p.removeChild(f3), this._sanitize(h3, p);
              break;
            } else
              continue;
          if (f3.nodeType === Node.COMMENT_NODE) {
            p.removeChild(f3), this._sanitize(h3, p);
            break;
          }
          var v4 = r(f3), O4;
          v4 && (O4 = Array.prototype.some.call(f3.childNodes, i));
          var T3 = !!p.parentNode, M3 = i(p) && i(f3) && T3, q3 = f3.nodeName.toLowerCase(), F3 = l2(this.config, q3, f3), H4 = v4 && O4;
          if (H4 || c3(f3, F3) || !this.config.keepNestedBlockElements && M3) {
            if (!(f3.nodeName === "SCRIPT" || f3.nodeName === "STYLE"))
              for (; f3.childNodes.length > 0; )
                p.insertBefore(f3.childNodes[0], f3);
            p.removeChild(f3), this._sanitize(h3, p);
            break;
          }
          for (var Q2 = 0; Q2 < f3.attributes.length; Q2 += 1) {
            var ie2 = f3.attributes[Q2];
            d2(ie2, F3, f3) && (f3.removeAttribute(ie2.name), Q2 = Q2 - 1);
          }
          this._sanitize(h3, f3);
        } while (f3 = g3.nextSibling());
    };
    function a3(h3, p) {
      return h3.createTreeWalker(
        p,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        null,
        false
      );
    }
    function l2(h3, p, g3) {
      return typeof h3.tags[p] == "function" ? h3.tags[p](g3) : h3.tags[p];
    }
    function c3(h3, p) {
      return typeof p > "u" ? true : typeof p == "boolean" ? !p : false;
    }
    function d2(h3, p, g3) {
      var f3 = h3.name.toLowerCase();
      return p === true ? false : typeof p[f3] == "function" ? !p[f3](h3.value, g3) : typeof p[f3] > "u" || p[f3] === false ? true : typeof p[f3] == "string" ? p[f3] !== h3.value : false;
    }
    return t;
  });
})(Xo);
var Si = Xo.exports;
var Ii = /* @__PURE__ */ Ke(Si);
function yt(n, e) {
  return n.map((t) => {
    const o2 = A(e) ? e(t.tool) : e;
    return V(o2) || (t.data = wt(t.data, o2)), t;
  });
}
function Z(n, e = {}) {
  const t = {
    tags: e
  };
  return new Ii(t).clean(n);
}
function wt(n, e) {
  return Array.isArray(n) ? Oi(n, e) : D(n) ? _i(n, e) : te(n) ? Mi(n, e) : n;
}
function Oi(n, e) {
  return n.map((t) => wt(t, e));
}
function _i(n, e) {
  const t = {};
  for (const o2 in n) {
    if (!Object.prototype.hasOwnProperty.call(n, o2))
      continue;
    const i = n[o2], s2 = Ai(e[o2]) ? e[o2] : e;
    t[o2] = wt(i, s2);
  }
  return t;
}
function Mi(n, e) {
  return D(e) ? Z(n, e) : e === false ? Z(n, {}) : n;
}
function Ai(n) {
  return D(n) || Gn(n) || A(n);
}
var Li = class extends E {
  /**
   * Available methods
   *
   * @returns {SanitizerConfig}
   */
  get methods() {
    return {
      clean: (e, t) => this.clean(e, t)
    };
  }
  /**
   * Perform sanitizing of a string
   *
   * @param {string} taintString - what to sanitize
   * @param {SanitizerConfig} config - sanitizer config
   * @returns {string}
   */
  clean(e, t) {
    return Z(e, t);
  }
};
var Pi = class extends E {
  /**
   * Available methods
   *
   * @returns {Saver}
   */
  get methods() {
    return {
      save: () => this.save()
    };
  }
  /**
   * Return Editor's data
   *
   * @returns {OutputData}
   */
  save() {
    const e = "Editor's content can not be saved in read-only mode";
    return this.Editor.ReadOnly.isEnabled ? (X(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
  }
};
var Ni = class extends E {
  constructor() {
    super(...arguments), this.selectionUtils = new b();
  }
  /**
   * Available methods
   *
   * @returns {SelectionAPIInterface}
   */
  get methods() {
    return {
      findParentTag: (e, t) => this.findParentTag(e, t),
      expandToTag: (e) => this.expandToTag(e),
      save: () => this.selectionUtils.save(),
      restore: () => this.selectionUtils.restore(),
      setFakeBackground: () => this.selectionUtils.setFakeBackground(),
      removeFakeBackground: () => this.selectionUtils.removeFakeBackground()
    };
  }
  /**
   * Looks ahead from selection and find passed tag with class name
   *
   * @param {string} tagName - tag to find
   * @param {string} className - tag's class name
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t) {
    return this.selectionUtils.findParentTag(e, t);
  }
  /**
   * Expand selection to passed tag
   *
   * @param {HTMLElement} node - tag that should contain selection
   */
  expandToTag(e) {
    this.selectionUtils.expandToTag(e);
  }
};
var Ri = class extends E {
  /**
   * Available methods
   */
  get methods() {
    return {
      getBlockTools: () => Array.from(this.Editor.Tools.blockTools.values())
    };
  }
};
var Di = class extends E {
  /**
   * Exported classes
   */
  get classes() {
    return {
      /**
       * Base Block styles
       */
      block: "cdx-block",
      /**
       * Inline Tools styles
       */
      inlineToolButton: "ce-inline-tool",
      inlineToolButtonActive: "ce-inline-tool--active",
      /**
       * UI elements
       */
      input: "cdx-input",
      loader: "cdx-loader",
      button: "cdx-button",
      /**
       * Settings styles
       */
      settingsButton: "cdx-settings-button",
      settingsButtonActive: "cdx-settings-button--active"
    };
  }
};
var Fi = class extends E {
  /**
   * Available methods
   *
   * @returns {Toolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open(),
      toggleBlockSettings: (e) => this.toggleBlockSettings(e),
      toggleToolbox: (e) => this.toggleToolbox(e)
    };
  }
  /**
   * Open toolbar
   */
  open() {
    this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * Close toolbar and all included elements
   */
  close() {
    this.Editor.Toolbar.close();
  }
  /**
   * Toggles Block Setting of the current block
   *
   * @param {boolean} openingState —  opening state of Block Setting
   */
  toggleBlockSettings(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      X("Could't toggle the Toolbar because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
  }
  /**
   * Open toolbox
   *
   * @param {boolean} openingState - Opening state of toolbox
   */
  toggleToolbox(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      X("Could't toggle the Toolbox because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
  }
};
var Vo = { exports: {} };
(function(n, e) {
  (function(t, o2) {
    n.exports = o2();
  })(window, function() {
    return (function(t) {
      var o2 = {};
      function i(s2) {
        if (o2[s2])
          return o2[s2].exports;
        var r = o2[s2] = { i: s2, l: false, exports: {} };
        return t[s2].call(r.exports, r, r.exports, i), r.l = true, r.exports;
      }
      return i.m = t, i.c = o2, i.d = function(s2, r, a3) {
        i.o(s2, r) || Object.defineProperty(s2, r, { enumerable: true, get: a3 });
      }, i.r = function(s2) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s2, "__esModule", { value: true });
      }, i.t = function(s2, r) {
        if (1 & r && (s2 = i(s2)), 8 & r || 4 & r && typeof s2 == "object" && s2 && s2.__esModule)
          return s2;
        var a3 = /* @__PURE__ */ Object.create(null);
        if (i.r(a3), Object.defineProperty(a3, "default", { enumerable: true, value: s2 }), 2 & r && typeof s2 != "string")
          for (var l2 in s2)
            i.d(a3, l2, (function(c3) {
              return s2[c3];
            }).bind(null, l2));
        return a3;
      }, i.n = function(s2) {
        var r = s2 && s2.__esModule ? function() {
          return s2.default;
        } : function() {
          return s2;
        };
        return i.d(r, "a", r), r;
      }, i.o = function(s2, r) {
        return Object.prototype.hasOwnProperty.call(s2, r);
      }, i.p = "", i(i.s = 0);
    })([function(t, o2, i) {
      t.exports = i(1);
    }, function(t, o2, i) {
      i.r(o2), i.d(o2, "default", function() {
        return s2;
      });
      class s2 {
        constructor() {
          this.nodes = { wrapper: null, content: null }, this.showed = false, this.offsetTop = 10, this.offsetLeft = 10, this.offsetRight = 10, this.hidingDelay = 0, this.handleWindowScroll = () => {
            this.showed && this.hide(true);
          }, this.loadStyles(), this.prepare(), window.addEventListener("scroll", this.handleWindowScroll, { passive: true });
        }
        get CSS() {
          return { tooltip: "ct", tooltipContent: "ct__content", tooltipShown: "ct--shown", placement: { left: "ct--left", bottom: "ct--bottom", right: "ct--right", top: "ct--top" } };
        }
        show(a3, l2, c3) {
          this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
          const d2 = Object.assign({ placement: "bottom", marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, delay: 70, hidingDelay: 0 }, c3);
          if (d2.hidingDelay && (this.hidingDelay = d2.hidingDelay), this.nodes.content.innerHTML = "", typeof l2 == "string")
            this.nodes.content.appendChild(document.createTextNode(l2));
          else {
            if (!(l2 instanceof Node))
              throw Error("[CodeX Tooltip] Wrong type of \xABcontent\xBB passed. It should be an instance of Node or String. But " + typeof l2 + " given.");
            this.nodes.content.appendChild(l2);
          }
          switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), d2.placement) {
            case "top":
              this.placeTop(a3, d2);
              break;
            case "left":
              this.placeLeft(a3, d2);
              break;
            case "right":
              this.placeRight(a3, d2);
              break;
            case "bottom":
            default:
              this.placeBottom(a3, d2);
          }
          d2 && d2.delay ? this.showingTimeout = setTimeout(() => {
            this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = true;
          }, d2.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = true);
        }
        hide(a3 = false) {
          if (this.hidingDelay && !a3)
            return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(() => {
              this.hide(true);
            }, this.hidingDelay));
          this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = false, this.showingTimeout && clearTimeout(this.showingTimeout);
        }
        onHover(a3, l2, c3) {
          a3.addEventListener("mouseenter", () => {
            this.show(a3, l2, c3);
          }), a3.addEventListener("mouseleave", () => {
            this.hide();
          });
        }
        destroy() {
          this.nodes.wrapper.remove(), window.removeEventListener("scroll", this.handleWindowScroll);
        }
        prepare() {
          this.nodes.wrapper = this.make("div", this.CSS.tooltip), this.nodes.content = this.make("div", this.CSS.tooltipContent), this.append(this.nodes.wrapper, this.nodes.content), this.append(document.body, this.nodes.wrapper);
        }
        loadStyles() {
          const a3 = "codex-tooltips-style";
          if (document.getElementById(a3))
            return;
          const l2 = i(2), c3 = this.make("style", null, { textContent: l2.toString(), id: a3 });
          this.prepend(document.head, c3);
        }
        placeBottom(a3, l2) {
          const c3 = a3.getBoundingClientRect(), d2 = c3.left + a3.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, h3 = c3.bottom + window.pageYOffset + this.offsetTop + l2.marginTop;
          this.applyPlacement("bottom", d2, h3);
        }
        placeTop(a3, l2) {
          const c3 = a3.getBoundingClientRect(), d2 = c3.left + a3.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, h3 = c3.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
          this.applyPlacement("top", d2, h3);
        }
        placeLeft(a3, l2) {
          const c3 = a3.getBoundingClientRect(), d2 = c3.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - l2.marginLeft, h3 = c3.top + window.pageYOffset + a3.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("left", d2, h3);
        }
        placeRight(a3, l2) {
          const c3 = a3.getBoundingClientRect(), d2 = c3.right + this.offsetRight + l2.marginRight, h3 = c3.top + window.pageYOffset + a3.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("right", d2, h3);
        }
        applyPlacement(a3, l2, c3) {
          this.nodes.wrapper.classList.add(this.CSS.placement[a3]), this.nodes.wrapper.style.left = l2 + "px", this.nodes.wrapper.style.top = c3 + "px";
        }
        make(a3, l2 = null, c3 = {}) {
          const d2 = document.createElement(a3);
          Array.isArray(l2) ? d2.classList.add(...l2) : l2 && d2.classList.add(l2);
          for (const h3 in c3)
            c3.hasOwnProperty(h3) && (d2[h3] = c3[h3]);
          return d2;
        }
        append(a3, l2) {
          Array.isArray(l2) ? l2.forEach((c3) => a3.appendChild(c3)) : a3.appendChild(l2);
        }
        prepend(a3, l2) {
          Array.isArray(l2) ? (l2 = l2.reverse()).forEach((c3) => a3.prepend(c3)) : a3.prepend(l2);
        }
      }
    }, function(t, o2) {
      t.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
    }]).default;
  });
})(Vo);
var ji = Vo.exports;
var Hi = /* @__PURE__ */ Ke(ji);
var U = null;
function Et() {
  U || (U = new Hi());
}
function $i(n, e, t) {
  Et(), U == null || U.show(n, e, t);
}
function $e(n = false) {
  Et(), U == null || U.hide(n);
}
function ze(n, e, t) {
  Et(), U == null || U.onHover(n, e, t);
}
function zi() {
  U == null || U.destroy(), U = null;
}
var Ui = class extends E {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    });
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e, t, o2) => this.show(e, t, o2),
      hide: () => this.hide(),
      onHover: (e, t, o2) => this.onHover(e, t, o2)
    };
  }
  /**
   * Method show tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  show(e, t, o2) {
    $i(e, t, o2);
  }
  /**
   * Method hides tooltip on HTML page
   */
  hide() {
    $e();
  }
  /**
   * Decorator for showing Tooltip by mouseenter/mouseleave
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  onHover(e, t, o2) {
    ze(e, t, o2);
  }
};
var Wi = class extends E {
  /**
   * Available methods / getters
   */
  get methods() {
    return {
      nodes: this.editorNodes
      /**
       * There can be added some UI methods, like toggleThinMode() etc
       */
    };
  }
  /**
   * Exported classes
   */
  get editorNodes() {
    return {
      /**
       * Top-level editor instance wrapper
       */
      wrapper: this.Editor.UI.nodes.wrapper,
      /**
       * Element that holds all the Blocks
       */
      redactor: this.Editor.UI.nodes.redactor
    };
  }
};
function qo(n, e) {
  const t = {};
  return Object.entries(n).forEach(([o2, i]) => {
    if (D(i)) {
      const s2 = e ? `${e}.${o2}` : o2;
      Object.values(i).every((a3) => te(a3)) ? t[o2] = s2 : t[o2] = qo(i, s2);
      return;
    }
    t[o2] = i;
  }), t;
}
var K = qo(Fo);
function Yi(n, e) {
  const t = {};
  return Object.keys(n).forEach((o2) => {
    const i = e[o2];
    i !== void 0 ? t[i] = n[o2] : t[o2] = n[o2];
  }), t;
}
var Zo = class Ee {
  /**
   * @param {HTMLElement[]} nodeList — the list of iterable HTML-items
   * @param {string} focusedCssClass - user-provided CSS-class that will be set in flipping process
   */
  constructor(e, t) {
    this.cursor = -1, this.items = [], this.items = e || [], this.focusedCssClass = t;
  }
  /**
   * Returns Focused button Node
   *
   * @returns {HTMLElement}
   */
  get currentItem() {
    return this.cursor === -1 ? null : this.items[this.cursor];
  }
  /**
   * Sets cursor to specified position
   *
   * @param cursorPosition - new cursor position
   */
  setCursor(e) {
    e < this.items.length && e >= -1 && (this.dropCursor(), this.cursor = e, this.items[this.cursor].classList.add(this.focusedCssClass));
  }
  /**
   * Sets items. Can be used when iterable items changed dynamically
   *
   * @param {HTMLElement[]} nodeList - nodes to iterate
   */
  setItems(e) {
    this.items = e;
  }
  /**
   * Sets cursor next to the current
   */
  next() {
    this.cursor = this.leafNodesAndReturnIndex(Ee.directions.RIGHT);
  }
  /**
   * Sets cursor before current
   */
  previous() {
    this.cursor = this.leafNodesAndReturnIndex(Ee.directions.LEFT);
  }
  /**
   * Sets cursor to the default position and removes CSS-class from previously focused item
   */
  dropCursor() {
    this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
  }
  /**
   * Leafs nodes inside the target list from active element
   *
   * @param {string} direction - leaf direction. Can be 'left' or 'right'
   * @returns {number} index of focused node
   */
  leafNodesAndReturnIndex(e) {
    if (this.items.length === 0)
      return this.cursor;
    let t = this.cursor;
    return t === -1 ? t = e === Ee.directions.RIGHT ? -1 : 0 : this.items[t].classList.remove(this.focusedCssClass), e === Ee.directions.RIGHT ? t = (t + 1) % this.items.length : t = (this.items.length + t - 1) % this.items.length, u.canSetCaret(this.items[t]) && Fe(() => b.setCursor(this.items[t]), 50)(), this.items[t].classList.add(this.focusedCssClass), t;
  }
};
Zo.directions = {
  RIGHT: "right",
  LEFT: "left"
};
var ke = Zo;
var ce = class _ce {
  /**
   * @param options - different constructing settings
   */
  constructor(e) {
    this.iterator = null, this.activated = false, this.flipCallbacks = [], this.onKeyDown = (t) => {
      if (!(!this.isEventReadyForHandling(t) || t.shiftKey === true))
        switch (_ce.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case y.TAB:
            this.handleTabPress(t);
            break;
          case y.LEFT:
          case y.UP:
            this.flipLeft();
            break;
          case y.RIGHT:
          case y.DOWN:
            this.flipRight();
            break;
          case y.ENTER:
            this.handleEnterPress(t);
            break;
        }
    }, this.iterator = new ke(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || _ce.usedKeys;
  }
  /**
   * True if flipper is currently activated
   */
  get isActivated() {
    return this.activated;
  }
  /**
   * Array of keys (codes) that is handled by Flipper
   * Used to:
   *  - preventDefault only for this keys, not all keydowns (@see constructor)
   *  - to skip external behaviours only for these keys, when filler is activated (@see BlockEvents@arrowRightAndDown)
   */
  static get usedKeys() {
    return [
      y.TAB,
      y.LEFT,
      y.RIGHT,
      y.ENTER,
      y.UP,
      y.DOWN
    ];
  }
  /**
   * Active tab/arrows handling by flipper
   *
   * @param items - Some modules (like, InlineToolbar, BlockSettings) might refresh buttons dynamically
   * @param cursorPosition - index of the item that should be focused once flipper is activated
   */
  activate(e, t) {
    this.activated = true, e && this.iterator.setItems(e), t !== void 0 && this.iterator.setCursor(t), document.addEventListener("keydown", this.onKeyDown, true);
  }
  /**
   * Disable tab/arrows handling by flipper
   */
  deactivate() {
    this.activated = false, this.dropCursor(), document.removeEventListener("keydown", this.onKeyDown);
  }
  /**
   * Focus first item
   */
  focusFirst() {
    this.dropCursor(), this.flipRight();
  }
  /**
   * Focuses previous flipper iterator item
   */
  flipLeft() {
    this.iterator.previous(), this.flipCallback();
  }
  /**
   * Focuses next flipper iterator item
   */
  flipRight() {
    this.iterator.next(), this.flipCallback();
  }
  /**
   * Return true if some button is focused
   */
  hasFocus() {
    return !!this.iterator.currentItem;
  }
  /**
   * Registeres function that should be executed on each navigation action
   *
   * @param cb - function to execute
   */
  onFlip(e) {
    this.flipCallbacks.push(e);
  }
  /**
   * Unregisteres function that is executed on each navigation action
   *
   * @param cb - function to stop executing
   */
  removeOnFlip(e) {
    this.flipCallbacks = this.flipCallbacks.filter((t) => t !== e);
  }
  /**
   * Drops flipper's iterator cursor
   *
   * @see DomIterator#dropCursor
   */
  dropCursor() {
    this.iterator.dropCursor();
  }
  /**
   * This function is fired before handling flipper keycodes
   * The result of this function defines if it is need to be handled or not
   *
   * @param {KeyboardEvent} event - keydown keyboard event
   * @returns {boolean}
   */
  isEventReadyForHandling(e) {
    return this.activated && this.allowedKeys.includes(e.keyCode);
  }
  /**
   * When flipper is activated tab press will leaf the items
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  handleTabPress(e) {
    switch (e.shiftKey ? ke.directions.LEFT : ke.directions.RIGHT) {
      case ke.directions.RIGHT:
        this.flipRight();
        break;
      case ke.directions.LEFT:
        this.flipLeft();
        break;
    }
  }
  /**
   * Enter press will click current item if flipper is activated
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  handleEnterPress(e) {
    this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), A(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
  }
  /**
   * Fired after flipping in any direction
   */
  flipCallback() {
    this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((e) => e());
  }
};
var Ki = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>';
var Xi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>';
var Vi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.5 17.5L9.64142 12.6414C9.56331 12.5633 9.56331 12.4367 9.64142 12.3586L14.5 7.5"/></svg>';
var qi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.58284 17.5L14.4414 12.6414C14.5195 12.5633 14.5195 12.4367 14.4414 12.3586L9.58284 7.5"/></svg>';
var Zi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>';
var Gi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>';
var Qi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>';
var Ji = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>';
var Co = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>';
var es = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>';
var ts = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>';
var Go = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11.5 17.5L5 11M5 11V15.5M5 11H9.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12.5 6.5L19 13M19 13V8.5M19 13H14.5"/></svg>';
var os = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';
var ns = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';
var is = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><line x1="12" x2="12" y1="9" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 15.02V15.01"/></svg>';
var ss = "__";
var rs = "--";
function ne(n) {
  return (e, t) => [[n, e].filter((i) => !!i).join(ss), t].filter((i) => !!i).join(rs);
}
var ye = ne("ce-hint");
var we = {
  root: ye(),
  alignedStart: ye(null, "align-left"),
  alignedCenter: ye(null, "align-center"),
  title: ye("title"),
  description: ye("description")
};
var as = class {
  /**
   * Constructs the hint content instance
   *
   * @param params - hint content parameters
   */
  constructor(e) {
    this.nodes = {
      root: u.make("div", [we.root, e.alignment === "center" ? we.alignedCenter : we.alignedStart]),
      title: u.make("div", we.title, { textContent: e.title })
    }, this.nodes.root.appendChild(this.nodes.title), e.description !== void 0 && (this.nodes.description = u.make("div", we.description, { textContent: e.description }), this.nodes.root.appendChild(this.nodes.description));
  }
  /**
   * Returns the root element of the hint content
   */
  getElement() {
    return this.nodes.root;
  }
};
var xt = class {
  /**
   * Constructs the instance
   *
   * @param params - instance parameters
   */
  constructor(e) {
    this.params = e;
  }
  /**
   * Item name if exists
   */
  get name() {
    if (this.params !== void 0 && "name" in this.params)
      return this.params.name;
  }
  /**
   * Destroys the instance
   */
  destroy() {
    $e();
  }
  /**
   * Called when children popover is opened (if exists)
   */
  onChildrenOpen() {
    var e;
    this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onOpen) == "function" && this.params.children.onOpen();
  }
  /**
   * Called when children popover is closed (if exists)
   */
  onChildrenClose() {
    var e;
    this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onClose) == "function" && this.params.children.onClose();
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    var e, t;
    this.params !== void 0 && "onActivate" in this.params && ((t = (e = this.params).onActivate) == null || t.call(e, this.params));
  }
  /**
   * Adds hint to the item element if hint data is provided
   *
   * @param itemElement - popover item root element to add hint to
   * @param hintData - hint data
   */
  addHint(e, t) {
    const o2 = new as(t);
    ze(e, o2.getElement(), {
      placement: t.position,
      hidingDelay: 100
    });
  }
  /**
   * Returns item children that are represented as popover items
   */
  get children() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.items) !== void 0 ? this.params.children.items : [];
  }
  /**
   * Returns true if item has any type of children
   */
  get hasChildren() {
    return this.children.length > 0;
  }
  /**
   * Returns true if item children should be open instantly after popover is opened and not on item click/hover
   */
  get isChildrenOpen() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.isOpen) === true;
  }
  /**
   * True if item children items should be navigatable via keyboard
   */
  get isChildrenFlippable() {
    var e;
    return !(this.params === void 0 || !("children" in this.params) || ((e = this.params.children) == null ? void 0 : e.isFlippable) === false);
  }
  /**
   * Returns true if item has children that should be searchable
   */
  get isChildrenSearchable() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.searchable) === true;
  }
  /**
   * True if popover should close once item is activated
   */
  get closeOnActivate() {
    return this.params !== void 0 && "closeOnActivate" in this.params && this.params.closeOnActivate;
  }
  /**
   * True if item is active
   */
  get isActive() {
    return this.params === void 0 || !("isActive" in this.params) ? false : typeof this.params.isActive == "function" ? this.params.isActive() : this.params.isActive === true;
  }
};
var Y = ne("ce-popover-item");
var L = {
  container: Y(),
  active: Y(null, "active"),
  disabled: Y(null, "disabled"),
  focused: Y(null, "focused"),
  hidden: Y(null, "hidden"),
  confirmationState: Y(null, "confirmation"),
  noHover: Y(null, "no-hover"),
  noFocus: Y(null, "no-focus"),
  title: Y("title"),
  secondaryTitle: Y("secondary-title"),
  icon: Y("icon"),
  iconTool: Y("icon", "tool"),
  iconChevronRight: Y("icon", "chevron-right"),
  wobbleAnimation: ne("wobble")()
};
var re = class extends xt {
  /**
   * Constructs popover item instance
   *
   * @param params - popover item construction params
   * @param renderParams - popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    super(e), this.params = e, this.nodes = {
      root: null,
      icon: null
    }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
      var o2;
      (o2 = this.nodes.root) == null || o2.classList.remove(L.noFocus);
    }, this.removeSpecialHoverBehavior = () => {
      var o2;
      (o2 = this.nodes.root) == null || o2.classList.remove(L.noHover);
    }, this.onErrorAnimationEnd = () => {
      var o2, i;
      (o2 = this.nodes.icon) == null || o2.classList.remove(L.wobbleAnimation), (i = this.nodes.icon) == null || i.removeEventListener("animationend", this.onErrorAnimationEnd);
    }, this.nodes.root = this.make(e, t);
  }
  /**
   * True if item is disabled and hence not clickable
   */
  get isDisabled() {
    return this.params.isDisabled === true;
  }
  /**
   * Exposes popover item toggle parameter
   */
  get toggle() {
    return this.params.toggle;
  }
  /**
   * Item title
   */
  get title() {
    return this.params.title;
  }
  /**
   * True if confirmation state is enabled for popover item
   */
  get isConfirmationStateEnabled() {
    return this.confirmationState !== null;
  }
  /**
   * True if item is focused in keyboard navigation process
   */
  get isFocused() {
    return this.nodes.root === null ? false : this.nodes.root.classList.contains(L.focused);
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    if (this.isConfirmationStateEnabled && this.confirmationState !== null) {
      this.activateOrEnableConfirmationMode(this.confirmationState);
      return;
    }
    this.activateOrEnableConfirmationMode(this.params);
  }
  /**
   * Toggles item active state
   *
   * @param isActive - true if item should strictly should become active
   */
  toggleActive(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(L.active, e);
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(L.hidden, e);
  }
  /**
   * Resets popover item to its original state
   */
  reset() {
    this.isConfirmationStateEnabled && this.disableConfirmationMode();
  }
  /**
   * Method called once item becomes focused during keyboard navigation
   */
  onFocus() {
    this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Constructs HTML element corresponding to popover item params
   *
   * @param params - item construction params
   * @param renderParams - popover item render params
   */
  make(e, t) {
    var s2, r;
    const o2 = (t == null ? void 0 : t.wrapperTag) || "div", i = u.make(o2, L.container, {
      type: o2 === "button" ? "button" : void 0
    });
    return e.name && (i.dataset.itemName = e.name), this.nodes.icon = u.make("div", [L.icon, L.iconTool], {
      innerHTML: e.icon || Qi
    }), i.appendChild(this.nodes.icon), e.title !== void 0 && i.appendChild(u.make("div", L.title, {
      innerHTML: e.title || ""
    })), e.secondaryLabel && i.appendChild(u.make("div", L.secondaryTitle, {
      textContent: e.secondaryLabel
    })), this.hasChildren && i.appendChild(u.make("div", [L.icon, L.iconChevronRight], {
      innerHTML: qi
    })), this.isActive && i.classList.add(L.active), e.isDisabled && i.classList.add(L.disabled), e.hint !== void 0 && ((s2 = t == null ? void 0 : t.hint) == null ? void 0 : s2.enabled) !== false && this.addHint(i, {
      ...e.hint,
      position: ((r = t == null ? void 0 : t.hint) == null ? void 0 : r.position) || "right"
    }), i;
  }
  /**
   * Activates confirmation mode for the item.
   *
   * @param newState - new popover item params that should be applied
   */
  enableConfirmationMode(e) {
    if (this.nodes.root === null)
      return;
    const t = {
      ...this.params,
      ...e,
      confirmation: "confirmation" in e ? e.confirmation : void 0
    }, o2 = this.make(t);
    this.nodes.root.innerHTML = o2.innerHTML, this.nodes.root.classList.add(L.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
  }
  /**
   * Returns item to its original state
   */
  disableConfirmationMode() {
    if (this.nodes.root === null)
      return;
    const e = this.make(this.params);
    this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(L.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Enables special focus and hover behavior for item in confirmation state.
   * This is needed to prevent item from being highlighted as hovered/focused just after click.
   */
  enableSpecialHoverAndFocusBehavior() {
    var e, t, o2;
    (e = this.nodes.root) == null || e.classList.add(L.noHover), (t = this.nodes.root) == null || t.classList.add(L.noFocus), (o2 = this.nodes.root) == null || o2.addEventListener("mouseleave", this.removeSpecialHoverBehavior, { once: true });
  }
  /**
   * Disables special focus and hover behavior
   */
  disableSpecialHoverAndFocusBehavior() {
    var e;
    this.removeSpecialFocusBehavior(), this.removeSpecialHoverBehavior(), (e = this.nodes.root) == null || e.removeEventListener("mouseleave", this.removeSpecialHoverBehavior);
  }
  /**
   * Executes item's onActivate callback if the item has no confirmation configured
   *
   * @param item - item to activate or bring to confirmation mode
   */
  activateOrEnableConfirmationMode(e) {
    var t;
    if (!("confirmation" in e) || e.confirmation === void 0)
      try {
        (t = e.onActivate) == null || t.call(e, e), this.disableConfirmationMode();
      } catch {
        this.animateError();
      }
    else
      this.enableConfirmationMode(e.confirmation);
  }
  /**
   * Animates item which symbolizes that error occured while executing 'onActivate()' callback
   */
  animateError() {
    var e, t, o2;
    (e = this.nodes.icon) != null && e.classList.contains(L.wobbleAnimation) || ((t = this.nodes.icon) == null || t.classList.add(L.wobbleAnimation), (o2 = this.nodes.icon) == null || o2.addEventListener("animationend", this.onErrorAnimationEnd));
  }
};
var nt = ne("ce-popover-item-separator");
var it = {
  container: nt(),
  line: nt("line"),
  hidden: nt(null, "hidden")
};
var Qo = class extends xt {
  /**
   * Constructs the instance
   */
  constructor() {
    super(), this.nodes = {
      root: u.make("div", it.container),
      line: u.make("div", it.line)
    }, this.nodes.root.appendChild(this.nodes.line);
  }
  /**
   * Returns popover separator root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(it.hidden, e);
  }
};
var G = /* @__PURE__ */ ((n) => (n.Closed = "closed", n.ClosedOnActivate = "closed-on-activate", n))(G || {});
var $ = ne("ce-popover");
var P = {
  popover: $(),
  popoverContainer: $("container"),
  popoverOpenTop: $(null, "open-top"),
  popoverOpenLeft: $(null, "open-left"),
  popoverOpened: $(null, "opened"),
  search: $("search"),
  nothingFoundMessage: $("nothing-found-message"),
  nothingFoundMessageDisplayed: $("nothing-found-message", "displayed"),
  items: $("items"),
  overlay: $("overlay"),
  overlayHidden: $("overlay", "hidden"),
  popoverNested: $(null, "nested"),
  getPopoverNestedClass: (n) => $(null, `nested-level-${n.toString()}`),
  popoverInline: $(null, "inline"),
  popoverHeader: $("header")
};
var fe = /* @__PURE__ */ ((n) => (n.NestingLevel = "--nesting-level", n.PopoverHeight = "--popover-height", n.InlinePopoverWidth = "--inline-popover-width", n.TriggerItemLeft = "--trigger-item-left", n.TriggerItemTop = "--trigger-item-top", n))(fe || {});
var To = ne("ce-popover-item-html");
var So = {
  root: To(),
  hidden: To(null, "hidden")
};
var Se = class extends xt {
  /**
   * Constructs the instance
   *
   * @param params – instance parameters
   * @param renderParams – popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    var o2, i;
    super(e), this.nodes = {
      root: u.make("div", So.root)
    }, this.nodes.root.appendChild(e.element), e.name && (this.nodes.root.dataset.itemName = e.name), e.hint !== void 0 && ((o2 = t == null ? void 0 : t.hint) == null ? void 0 : o2.enabled) !== false && this.addHint(this.nodes.root, {
      ...e.hint,
      position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
    });
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(So.hidden, e);
  }
  /**
   * Returns list of buttons and inputs inside custom content
   */
  getControls() {
    const e = this.nodes.root.querySelectorAll(
      `button, ${u.allInputsSelector}`
    );
    return Array.from(e);
  }
};
var Jo = class extends Oe {
  /**
   * Constructs the instance
   *
   * @param params - popover construction params
   * @param itemsRenderParams - popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t = {}) {
    super(), this.params = e, this.itemsRenderParams = t, this.listeners = new _e(), this.messages = {
      nothingFound: "Nothing found",
      search: "Search"
    }, this.items = this.buildItems(e.items), e.messages && (this.messages = {
      ...this.messages,
      ...e.messages
    }), this.nodes = {}, this.nodes.popoverContainer = u.make("div", [P.popoverContainer]), this.nodes.nothingFoundMessage = u.make("div", [P.nothingFoundMessage], {
      textContent: this.messages.nothingFound
    }), this.nodes.popoverContainer.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = u.make("div", [P.items]), this.items.forEach((o2) => {
      const i = o2.getElement();
      i !== null && this.nodes.items.appendChild(i);
    }), this.nodes.popoverContainer.appendChild(this.nodes.items), this.listeners.on(this.nodes.popoverContainer, "click", (o2) => this.handleClick(o2)), this.nodes.popover = u.make("div", [
      P.popover,
      this.params.class
    ]), this.nodes.popover.appendChild(this.nodes.popoverContainer);
  }
  /**
   * List of default popover items that are searchable and may have confirmation state
   */
  get itemsDefault() {
    return this.items.filter((e) => e instanceof re);
  }
  /**
   * Returns HTML element corresponding to the popover
   */
  getElement() {
    return this.nodes.popover;
  }
  /**
   * Open popover
   */
  show() {
    this.nodes.popover.classList.add(P.popoverOpened), this.search !== void 0 && this.search.focus();
  }
  /**
   * Closes popover
   */
  hide() {
    this.nodes.popover.classList.remove(P.popoverOpened), this.nodes.popover.classList.remove(P.popoverOpenTop), this.itemsDefault.forEach((e) => e.reset()), this.search !== void 0 && this.search.clear(), this.emit(G.Closed);
  }
  /**
   * Clears memory
   */
  destroy() {
    var e;
    this.items.forEach((t) => t.destroy()), this.nodes.popover.remove(), this.listeners.removeAll(), (e = this.search) == null || e.destroy();
  }
  /**
   * Looks for the item by name and imitates click on it
   *
   * @param name - name of the item to activate
   */
  activateItemByName(e) {
    const t = this.items.find((o2) => o2.name === e);
    this.handleItemClick(t);
  }
  /**
   * Factory method for creating popover items
   *
   * @param items - list of items params
   */
  buildItems(e) {
    return e.map((t) => {
      switch (t.type) {
        case _.Separator:
          return new Qo();
        case _.Html:
          return new Se(t, this.itemsRenderParams[_.Html]);
        default:
          return new re(t, this.itemsRenderParams[_.Default]);
      }
    });
  }
  /**
   * Retrieves popover item that is the target of the specified event
   *
   * @param event - event to retrieve popover item from
   */
  getTargetItem(e) {
    return this.items.filter((t) => t instanceof re || t instanceof Se).find((t) => {
      const o2 = t.getElement();
      return o2 === null ? false : e.composedPath().includes(o2);
    });
  }
  /**
   * Handles popover item click
   *
   * @param item - item to handle click of
   */
  handleItemClick(e) {
    if (!("isDisabled" in e && e.isDisabled)) {
      if (e.hasChildren) {
        this.showNestedItems(e), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick();
        return;
      }
      this.itemsDefault.filter((t) => t !== e).forEach((t) => t.reset()), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick(), this.toggleItemActivenessIfNeeded(e), e.closeOnActivate && (this.hide(), this.emit(G.ClosedOnActivate));
    }
  }
  /**
   * Handles clicks inside popover
   *
   * @param event - item to handle click of
   */
  handleClick(e) {
    const t = this.getTargetItem(e);
    t !== void 0 && this.handleItemClick(t);
  }
  /**
   * - Toggles item active state, if clicked popover item has property 'toggle' set to true.
   *
   * - Performs radiobutton-like behavior if the item has property 'toggle' set to string key.
   * (All the other items with the same key get inactive, and the item gets active)
   *
   * @param clickedItem - popover item that was clicked
   */
  toggleItemActivenessIfNeeded(e) {
    if (e instanceof re && (e.toggle === true && e.toggleActive(), typeof e.toggle == "string")) {
      const t = this.itemsDefault.filter((o2) => o2.toggle === e.toggle);
      if (t.length === 1) {
        e.toggleActive();
        return;
      }
      t.forEach((o2) => {
        o2.toggleActive(o2 === e);
      });
    }
  }
};
var Ue = /* @__PURE__ */ ((n) => (n.Search = "search", n))(Ue || {});
var st = ne("cdx-search-field");
var rt = {
  wrapper: st(),
  icon: st("icon"),
  input: st("input")
};
var ls = class extends Oe {
  /**
   * @param options - available config
   * @param options.items - searchable items list
   * @param options.placeholder - input placeholder
   */
  constructor({ items: e, placeholder: t }) {
    super(), this.listeners = new _e(), this.items = e, this.wrapper = u.make("div", rt.wrapper);
    const o2 = u.make("div", rt.icon, {
      innerHTML: os
    });
    this.input = u.make("input", rt.input, {
      placeholder: t,
      /**
       * Used to prevent focusing on the input by Tab key
       * (Popover in the Toolbar lays below the blocks,
       * so Tab in the last block will focus this hidden input if this property is not set)
       */
      tabIndex: -1
    }), this.wrapper.appendChild(o2), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
      this.searchQuery = this.input.value, this.emit(Ue.Search, {
        query: this.searchQuery,
        items: this.foundItems
      });
    });
  }
  /**
   * Returns search field element
   */
  getElement() {
    return this.wrapper;
  }
  /**
   * Sets focus to the input
   */
  focus() {
    this.input.focus();
  }
  /**
   * Clears search query and results
   */
  clear() {
    this.input.value = "", this.searchQuery = "", this.emit(Ue.Search, {
      query: "",
      items: this.foundItems
    });
  }
  /**
   * Clears memory
   */
  destroy() {
    this.listeners.removeAll();
  }
  /**
   * Returns list of found items for the current search query
   */
  get foundItems() {
    return this.items.filter((e) => this.checkItem(e));
  }
  /**
   * Contains logic for checking whether passed item conforms the search query
   *
   * @param item - item to be checked
   */
  checkItem(e) {
    var i, s2;
    const t = ((i = e.title) == null ? void 0 : i.toLowerCase()) || "", o2 = (s2 = this.searchQuery) == null ? void 0 : s2.toLowerCase();
    return o2 !== void 0 ? t.includes(o2) : false;
  }
};
var cs = Object.defineProperty;
var ds = Object.getOwnPropertyDescriptor;
var us = (n, e, t, o2) => {
  for (var i = o2 > 1 ? void 0 : o2 ? ds(e, t) : e, s2 = n.length - 1, r; s2 >= 0; s2--)
    (r = n[s2]) && (i = (o2 ? r(e, t, i) : r(i)) || i);
  return o2 && i && cs(e, t, i), i;
};
var en = class tn extends Jo {
  /**
   * Construct the instance
   *
   * @param params - popover params
   * @param itemsRenderParams – popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    super(e, t), this.nestingLevel = 0, this.nestedPopoverTriggerItem = null, this.previouslyHoveredItem = null, this.scopeElement = document.body, this.hide = () => {
      var o2;
      super.hide(), this.destroyNestedPopoverIfExists(), (o2 = this.flipper) == null || o2.deactivate(), this.previouslyHoveredItem = null;
    }, this.onFlip = () => {
      const o2 = this.itemsDefault.find((i) => i.isFocused);
      o2 == null || o2.onFocus();
    }, this.onSearch = (o2) => {
      var a3;
      const i = o2.query === "", s2 = o2.items.length === 0;
      this.items.forEach((l2) => {
        let c3 = false;
        l2 instanceof re ? c3 = !o2.items.includes(l2) : (l2 instanceof Qo || l2 instanceof Se) && (c3 = s2 || !i), l2.toggleHidden(c3);
      }), this.toggleNothingFoundMessage(s2);
      const r = o2.query === "" ? this.flippableElements : o2.items.map((l2) => l2.getElement());
      (a3 = this.flipper) != null && a3.isActivated && (this.flipper.deactivate(), this.flipper.activate(r));
    }, e.nestingLevel !== void 0 && (this.nestingLevel = e.nestingLevel), this.nestingLevel > 0 && this.nodes.popover.classList.add(P.popoverNested), e.scopeElement !== void 0 && (this.scopeElement = e.scopeElement), this.nodes.popoverContainer !== null && this.listeners.on(this.nodes.popoverContainer, "mouseover", (o2) => this.handleHover(o2)), e.searchable && this.addSearch(), e.flippable !== false && (this.flipper = new ce({
      items: this.flippableElements,
      focusedItemClass: L.focused,
      allowedKeys: [
        y.TAB,
        y.UP,
        y.DOWN,
        y.ENTER
      ]
    }), this.flipper.onFlip(this.onFlip));
  }
  /**
   * Returns true if some item inside popover is focused
   */
  hasFocus() {
    return this.flipper === void 0 ? false : this.flipper.hasFocus();
  }
  /**
   * Scroll position inside items container of the popover
   */
  get scrollTop() {
    return this.nodes.items === null ? 0 : this.nodes.items.scrollTop;
  }
  /**
   * Returns visible element offset top
   */
  get offsetTop() {
    return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetTop;
  }
  /**
   * Open popover
   */
  show() {
    var e;
    this.nodes.popover.style.setProperty(fe.PopoverHeight, this.size.height + "px"), this.shouldOpenBottom || this.nodes.popover.classList.add(P.popoverOpenTop), this.shouldOpenRight || this.nodes.popover.classList.add(P.popoverOpenLeft), super.show(), (e = this.flipper) == null || e.activate(this.flippableElements);
  }
  /**
   * Clears memory
   */
  destroy() {
    this.hide(), super.destroy();
  }
  /**
   * Handles displaying nested items for the item.
   *
   * @param item – item to show nested popover for
   */
  showNestedItems(e) {
    this.nestedPopover !== null && this.nestedPopover !== void 0 || (this.nestedPopoverTriggerItem = e, this.showNestedPopoverForItem(e));
  }
  /**
   * Handles hover events inside popover items container
   *
   * @param event - hover event data
   */
  handleHover(e) {
    const t = this.getTargetItem(e);
    t !== void 0 && this.previouslyHoveredItem !== t && (this.destroyNestedPopoverIfExists(), this.previouslyHoveredItem = t, t.hasChildren && this.showNestedPopoverForItem(t));
  }
  /**
   * Sets CSS variable with position of item near which nested popover should be displayed.
   * Is used for correct positioning of the nested popover
   *
   * @param nestedPopoverEl - nested popover element
   * @param item – item near which nested popover should be displayed
   */
  setTriggerItemPosition(e, t) {
    const o2 = t.getElement(), i = (o2 ? o2.offsetTop : 0) - this.scrollTop, s2 = this.offsetTop + i;
    e.style.setProperty(fe.TriggerItemTop, s2 + "px");
  }
  /**
   * Destroys existing nested popover
   */
  destroyNestedPopoverIfExists() {
    var e, t;
    this.nestedPopover === void 0 || this.nestedPopover === null || (this.nestedPopover.off(G.ClosedOnActivate, this.hide), this.nestedPopover.hide(), this.nestedPopover.destroy(), this.nestedPopover.getElement().remove(), this.nestedPopover = null, (e = this.flipper) == null || e.activate(this.flippableElements), (t = this.nestedPopoverTriggerItem) == null || t.onChildrenClose());
  }
  /**
   * Creates and displays nested popover for specified item.
   * Is used only on desktop
   *
   * @param item - item to display nested popover by
   */
  showNestedPopoverForItem(e) {
    var o2;
    this.nestedPopover = new tn({
      searchable: e.isChildrenSearchable,
      items: e.children,
      nestingLevel: this.nestingLevel + 1,
      flippable: e.isChildrenFlippable,
      messages: this.messages
    }), e.onChildrenOpen(), this.nestedPopover.on(G.ClosedOnActivate, this.hide);
    const t = this.nestedPopover.getElement();
    return this.nodes.popover.appendChild(t), this.setTriggerItemPosition(t, e), t.style.setProperty(fe.NestingLevel, this.nestedPopover.nestingLevel.toString()), this.nestedPopover.show(), (o2 = this.flipper) == null || o2.deactivate(), this.nestedPopover;
  }
  /**
   * Checks if popover should be opened bottom.
   * It should happen when there is enough space below or not enough space above
   */
  get shouldOpenBottom() {
    if (this.nodes.popover === void 0 || this.nodes.popover === null)
      return false;
    const e = this.nodes.popoverContainer.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), o2 = this.size.height, i = e.top + o2, s2 = e.top - o2, r = Math.min(window.innerHeight, t.bottom);
    return s2 < t.top || i <= r;
  }
  /**
   * Checks if popover should be opened left.
   * It should happen when there is enough space in the right or not enough space in the left
   */
  get shouldOpenRight() {
    if (this.nodes.popover === void 0 || this.nodes.popover === null)
      return false;
    const e = this.nodes.popover.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), o2 = this.size.width, i = e.right + o2, s2 = e.left - o2, r = Math.min(window.innerWidth, t.right);
    return s2 < t.left || i <= r;
  }
  get size() {
    var i;
    const e = {
      height: 0,
      width: 0
    };
    if (this.nodes.popover === null)
      return e;
    const t = this.nodes.popover.cloneNode(true);
    t.style.visibility = "hidden", t.style.position = "absolute", t.style.top = "-1000px", t.classList.add(P.popoverOpened), (i = t.querySelector("." + P.popoverNested)) == null || i.remove(), document.body.appendChild(t);
    const o2 = t.querySelector("." + P.popoverContainer);
    return e.height = o2.offsetHeight, e.width = o2.offsetWidth, t.remove(), e;
  }
  /**
   * Returns list of elements available for keyboard navigation.
   */
  get flippableElements() {
    return this.items.map((t) => {
      if (t instanceof re)
        return t.getElement();
      if (t instanceof Se)
        return t.getControls();
    }).flat().filter((t) => t != null);
  }
  /**
   * Adds search to the popover
   */
  addSearch() {
    this.search = new ls({
      items: this.itemsDefault,
      placeholder: this.messages.search
    }), this.search.on(Ue.Search, this.onSearch);
    const e = this.search.getElement();
    e.classList.add(P.search), this.nodes.popoverContainer.insertBefore(e, this.nodes.popoverContainer.firstChild);
  }
  /**
   * Toggles nothing found message visibility
   *
   * @param isDisplayed - true if the message should be displayed
   */
  toggleNothingFoundMessage(e) {
    this.nodes.nothingFoundMessage.classList.toggle(P.nothingFoundMessageDisplayed, e);
  }
};
us([
  me
], en.prototype, "size", 1);
var Bt = en;
var hs = class extends Bt {
  /**
   * Constructs the instance
   *
   * @param params - instance parameters
   */
  constructor(e) {
    const t = !be();
    super(
      {
        ...e,
        class: P.popoverInline
      },
      {
        [_.Default]: {
          /**
           * We use button instead of div here to fix bug associated with focus loss (which leads to selection change) on click in safari
           *
           * @todo figure out better way to solve the issue
           */
          wrapperTag: "button",
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        },
        [_.Html]: {
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        }
      }
    ), this.items.forEach((o2) => {
      !(o2 instanceof re) && !(o2 instanceof Se) || o2.hasChildren && o2.isChildrenOpen && this.showNestedItems(o2);
    });
  }
  /**
   * Returns visible element offset top
   */
  get offsetLeft() {
    return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetLeft;
  }
  /**
   * Open popover
   */
  show() {
    this.nestingLevel === 0 && this.nodes.popover.style.setProperty(
      fe.InlinePopoverWidth,
      this.size.width + "px"
    ), super.show();
  }
  /**
   * Disable hover event handling.
   * Overrides parent's class behavior
   */
  handleHover() {
  }
  /**
   * Sets CSS variable with position of item near which nested popover should be displayed.
   * Is used to position nested popover right below clicked item
   *
   * @param nestedPopoverEl - nested popover element
   * @param item – item near which nested popover should be displayed
   */
  setTriggerItemPosition(e, t) {
    const o2 = t.getElement(), i = o2 ? o2.offsetLeft : 0, s2 = this.offsetLeft + i;
    e.style.setProperty(
      fe.TriggerItemLeft,
      s2 + "px"
    );
  }
  /**
   * Handles displaying nested items for the item.
   * Overriding in order to add toggling behaviour
   *
   * @param item – item to toggle nested popover for
   */
  showNestedItems(e) {
    if (this.nestedPopoverTriggerItem === e) {
      this.destroyNestedPopoverIfExists(), this.nestedPopoverTriggerItem = null;
      return;
    }
    super.showNestedItems(e);
  }
  /**
   * Creates and displays nested popover for specified item.
   * Is used only on desktop
   *
   * @param item - item to display nested popover by
   */
  showNestedPopoverForItem(e) {
    const t = super.showNestedPopoverForItem(e);
    return t.getElement().classList.add(P.getPopoverNestedClass(t.nestingLevel)), t;
  }
  /**
   * Overrides default item click handling.
   * Helps to close nested popover once other item is clicked.
   *
   * @param item - clicked item
   */
  handleItemClick(e) {
    var t;
    e !== this.nestedPopoverTriggerItem && ((t = this.nestedPopoverTriggerItem) == null || t.handleClick(), super.destroyNestedPopoverIfExists()), super.handleItemClick(e);
  }
};
var on = class xe {
  constructor() {
    this.scrollPosition = null;
  }
  /**
   * Locks body element scroll
   */
  lock() {
    pt ? this.lockHard() : document.body.classList.add(xe.CSS.scrollLocked);
  }
  /**
   * Unlocks body element scroll
   */
  unlock() {
    pt ? this.unlockHard() : document.body.classList.remove(xe.CSS.scrollLocked);
  }
  /**
   * Locks scroll in a hard way (via setting fixed position to body element)
   */
  lockHard() {
    this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty(
      "--window-scroll-offset",
      `${this.scrollPosition}px`
    ), document.body.classList.add(xe.CSS.scrollLockedHard);
  }
  /**
   * Unlocks hard scroll lock
   */
  unlockHard() {
    document.body.classList.remove(xe.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
  }
};
on.CSS = {
  scrollLocked: "ce-scroll-locked",
  scrollLockedHard: "ce-scroll-locked--hard"
};
var ps = on;
var at = ne("ce-popover-header");
var lt = {
  root: at(),
  text: at("text"),
  backButton: at("back-button")
};
var fs = class {
  /**
   * Constructs the instance
   *
   * @param params - popover header params
   */
  constructor({ text: e, onBackButtonClick: t }) {
    this.listeners = new _e(), this.text = e, this.onBackButtonClick = t, this.nodes = {
      root: u.make("div", [lt.root]),
      backButton: u.make("button", [lt.backButton]),
      text: u.make("div", [lt.text])
    }, this.nodes.backButton.innerHTML = Vi, this.nodes.root.appendChild(this.nodes.backButton), this.listeners.on(this.nodes.backButton, "click", this.onBackButtonClick), this.nodes.text.innerText = this.text, this.nodes.root.appendChild(this.nodes.text);
  }
  /**
   * Returns popover header root html element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Destroys the instance
   */
  destroy() {
    this.nodes.root.remove(), this.listeners.destroy();
  }
};
var gs = class {
  constructor() {
    this.history = [];
  }
  /**
   * Push new popover state
   *
   * @param state - new state
   */
  push(e) {
    this.history.push(e);
  }
  /**
   * Pop last popover state
   */
  pop() {
    return this.history.pop();
  }
  /**
   * Title retrieved from the current state
   */
  get currentTitle() {
    return this.history.length === 0 ? "" : this.history[this.history.length - 1].title;
  }
  /**
   * Items list retrieved from the current state
   */
  get currentItems() {
    return this.history.length === 0 ? [] : this.history[this.history.length - 1].items;
  }
  /**
   * Returns history to initial popover state
   */
  reset() {
    for (; this.history.length > 1; )
      this.pop();
  }
};
var nn = class extends Jo {
  /**
   * Construct the instance
   *
   * @param params - popover params
   */
  constructor(e) {
    super(e, {
      [_.Default]: {
        hint: {
          enabled: false
        }
      },
      [_.Html]: {
        hint: {
          enabled: false
        }
      }
    }), this.scrollLocker = new ps(), this.history = new gs(), this.isHidden = true, this.nodes.overlay = u.make("div", [P.overlay, P.overlayHidden]), this.nodes.popover.insertBefore(this.nodes.overlay, this.nodes.popover.firstChild), this.listeners.on(this.nodes.overlay, "click", () => {
      this.hide();
    }), this.history.push({ items: e.items });
  }
  /**
   * Open popover
   */
  show() {
    this.nodes.overlay.classList.remove(P.overlayHidden), super.show(), this.scrollLocker.lock(), this.isHidden = false;
  }
  /**
   * Closes popover
   */
  hide() {
    this.isHidden || (super.hide(), this.nodes.overlay.classList.add(P.overlayHidden), this.scrollLocker.unlock(), this.history.reset(), this.isHidden = true);
  }
  /**
   * Clears memory
   */
  destroy() {
    super.destroy(), this.scrollLocker.unlock();
  }
  /**
   * Handles displaying nested items for the item
   *
   * @param item – item to show nested popover for
   */
  showNestedItems(e) {
    this.updateItemsAndHeader(e.children, e.title), this.history.push({
      title: e.title,
      items: e.children
    });
  }
  /**
   * Removes rendered popover items and header and displays new ones
   *
   * @param items - new popover items
   * @param title - new popover header text
   */
  updateItemsAndHeader(e, t) {
    if (this.header !== null && this.header !== void 0 && (this.header.destroy(), this.header = null), t !== void 0) {
      this.header = new fs({
        text: t,
        onBackButtonClick: () => {
          this.history.pop(), this.updateItemsAndHeader(this.history.currentItems, this.history.currentTitle);
        }
      });
      const o2 = this.header.getElement();
      o2 !== null && this.nodes.popoverContainer.insertBefore(o2, this.nodes.popoverContainer.firstChild);
    }
    this.items.forEach((o2) => {
      var i;
      return (i = o2.getElement()) == null ? void 0 : i.remove();
    }), this.items = this.buildItems(e), this.items.forEach((o2) => {
      var s2;
      const i = o2.getElement();
      i !== null && ((s2 = this.nodes.items) == null || s2.appendChild(i));
    });
  }
};
var ms = class extends E {
  constructor() {
    super(...arguments), this.opened = false, this.selection = new b(), this.popover = null, this.close = () => {
      this.opened && (this.opened = false, b.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && this.Editor.BlockSelection.unselectBlock(this.Editor.BlockManager.currentBlock), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(G.Closed, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null));
    }, this.onPopoverClose = () => {
      this.close();
    };
  }
  /**
   * Module Events
   */
  get events() {
    return {
      opened: "block-settings-opened",
      closed: "block-settings-closed"
    };
  }
  /**
   * Block Settings CSS
   */
  get CSS() {
    return {
      settings: "ce-settings"
    };
  }
  /**
   * Getter for inner popover's flipper instance
   *
   * @todo remove once BlockSettings becomes standalone non-module class
   */
  get flipper() {
    var e;
    if (this.popover !== null)
      return "flipper" in this.popover ? (e = this.popover) == null ? void 0 : e.flipper : void 0;
  }
  /**
   * Panel with block settings with 2 sections:
   *  - Tool's Settings
   *  - Default Settings [Move, Remove, etc]
   */
  make() {
    this.nodes.wrapper = u.make("div", [this.CSS.settings]), this.eventsDispatcher.on(Te, this.close);
  }
  /**
   * Destroys module
   */
  destroy() {
    this.removeAllNodes(), this.listeners.destroy(), this.eventsDispatcher.off(Te, this.close);
  }
  /**
   * Open Block Settings pane
   *
   * @param targetBlock - near which Block we should open BlockSettings
   */
  async open(e = this.Editor.BlockManager.currentBlock) {
    var s2;
    this.opened = true, this.selection.save(), this.Editor.BlockSelection.selectBlock(e), this.Editor.BlockSelection.clearCache();
    const { toolTunes: t, commonTunes: o2 } = e.getTunes();
    this.eventsDispatcher.emit(this.events.opened);
    const i = be() ? nn : Bt;
    this.popover = new i({
      searchable: true,
      items: await this.getTunesItems(e, o2, t),
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: z.ui(K.ui.popover, "Nothing found"),
        search: z.ui(K.ui.popover, "Filter")
      }
    }), this.popover.on(G.Closed, this.onPopoverClose), (s2 = this.nodes.wrapper) == null || s2.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.wrapper;
  }
  /**
   * Returns list of items to be displayed in block tunes menu.
   * Merges tool specific tunes, conversion menu and common tunes in one list in predefined order
   *
   * @param currentBlock –  block we are about to open block tunes for
   * @param commonTunes – common tunes
   * @param toolTunes - tool specific tunes
   */
  async getTunesItems(e, t, o2) {
    const i = [];
    o2 !== void 0 && o2.length > 0 && (i.push(...o2), i.push({
      type: _.Separator
    }));
    const s2 = Array.from(this.Editor.Tools.blockTools.values()), a3 = (await Yo(e, s2)).reduce((l2, c3) => (c3.toolbox.forEach((d2) => {
      l2.push({
        icon: d2.icon,
        title: z.t(K.toolNames, d2.title),
        name: c3.name,
        closeOnActivate: true,
        onActivate: async () => {
          const { BlockManager: h3, Caret: p, Toolbar: g3 } = this.Editor, f3 = await h3.convert(e, c3.name, d2.data);
          g3.close(), p.setToBlock(f3, p.positions.END);
        }
      });
    }), l2), []);
    return a3.length > 0 && (i.push({
      icon: Go,
      name: "convert-to",
      title: z.ui(K.ui.popover, "Convert to"),
      children: {
        searchable: true,
        items: a3
      }
    }), i.push({
      type: _.Separator
    })), i.push(...t), i.map((l2) => this.resolveTuneAliases(l2));
  }
  /**
   * Resolves aliases in tunes menu items
   *
   * @param item - item with resolved aliases
   */
  resolveTuneAliases(e) {
    if (e.type === _.Separator || e.type === _.Html)
      return e;
    const t = Yi(e, { label: "title" });
    return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
  }
};
var sn = { exports: {} };
(function(n, e) {
  (function(t, o2) {
    n.exports = o2();
  })(window, function() {
    return (function(t) {
      var o2 = {};
      function i(s2) {
        if (o2[s2])
          return o2[s2].exports;
        var r = o2[s2] = { i: s2, l: false, exports: {} };
        return t[s2].call(r.exports, r, r.exports, i), r.l = true, r.exports;
      }
      return i.m = t, i.c = o2, i.d = function(s2, r, a3) {
        i.o(s2, r) || Object.defineProperty(s2, r, { enumerable: true, get: a3 });
      }, i.r = function(s2) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s2, "__esModule", { value: true });
      }, i.t = function(s2, r) {
        if (1 & r && (s2 = i(s2)), 8 & r || 4 & r && typeof s2 == "object" && s2 && s2.__esModule)
          return s2;
        var a3 = /* @__PURE__ */ Object.create(null);
        if (i.r(a3), Object.defineProperty(a3, "default", { enumerable: true, value: s2 }), 2 & r && typeof s2 != "string")
          for (var l2 in s2)
            i.d(a3, l2, (function(c3) {
              return s2[c3];
            }).bind(null, l2));
        return a3;
      }, i.n = function(s2) {
        var r = s2 && s2.__esModule ? function() {
          return s2.default;
        } : function() {
          return s2;
        };
        return i.d(r, "a", r), r;
      }, i.o = function(s2, r) {
        return Object.prototype.hasOwnProperty.call(s2, r);
      }, i.p = "", i(i.s = 0);
    })([function(t, o2, i) {
      function s2(l2, c3) {
        for (var d2 = 0; d2 < c3.length; d2++) {
          var h3 = c3[d2];
          h3.enumerable = h3.enumerable || false, h3.configurable = true, "value" in h3 && (h3.writable = true), Object.defineProperty(l2, h3.key, h3);
        }
      }
      function r(l2, c3, d2) {
        return c3 && s2(l2.prototype, c3), d2 && s2(l2, d2), l2;
      }
      i.r(o2);
      var a3 = (function() {
        function l2(c3) {
          var d2 = this;
          (function(h3, p) {
            if (!(h3 instanceof p))
              throw new TypeError("Cannot call a class as a function");
          })(this, l2), this.commands = {}, this.keys = {}, this.name = c3.name, this.parseShortcutName(c3.name), this.element = c3.on, this.callback = c3.callback, this.executeShortcut = function(h3) {
            d2.execute(h3);
          }, this.element.addEventListener("keydown", this.executeShortcut, false);
        }
        return r(l2, null, [{ key: "supportedCommands", get: function() {
          return { SHIFT: ["SHIFT"], CMD: ["CMD", "CONTROL", "COMMAND", "WINDOWS", "CTRL"], ALT: ["ALT", "OPTION"] };
        } }, { key: "keyCodes", get: function() {
          return { 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, BACKSPACE: 8, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, ".": 190 };
        } }]), r(l2, [{ key: "parseShortcutName", value: function(c3) {
          c3 = c3.split("+");
          for (var d2 = 0; d2 < c3.length; d2++) {
            c3[d2] = c3[d2].toUpperCase();
            var h3 = false;
            for (var p in l2.supportedCommands)
              if (l2.supportedCommands[p].includes(c3[d2])) {
                h3 = this.commands[p] = true;
                break;
              }
            h3 || (this.keys[c3[d2]] = true);
          }
          for (var g3 in l2.supportedCommands)
            this.commands[g3] || (this.commands[g3] = false);
        } }, { key: "execute", value: function(c3) {
          var d2, h3 = { CMD: c3.ctrlKey || c3.metaKey, SHIFT: c3.shiftKey, ALT: c3.altKey }, p = true;
          for (d2 in this.commands)
            this.commands[d2] !== h3[d2] && (p = false);
          var g3, f3 = true;
          for (g3 in this.keys)
            f3 = f3 && c3.keyCode === l2.keyCodes[g3];
          p && f3 && this.callback(c3);
        } }, { key: "remove", value: function() {
          this.element.removeEventListener("keydown", this.executeShortcut);
        } }]), l2;
      })();
      o2.default = a3;
    }]).default;
  });
})(sn);
var bs = sn.exports;
var vs = /* @__PURE__ */ Ke(bs);
var ks = class {
  constructor() {
    this.registeredShortcuts = /* @__PURE__ */ new Map();
  }
  /**
   * Register shortcut
   *
   * @param shortcut - shortcut options
   */
  add(e) {
    if (this.findShortcut(e.on, e.name))
      throw Error(
        `Shortcut ${e.name} is already registered for ${e.on}. Please remove it before add a new handler.`
      );
    const o2 = new vs({
      name: e.name,
      on: e.on,
      callback: e.handler
    }), i = this.registeredShortcuts.get(e.on) || [];
    this.registeredShortcuts.set(e.on, [...i, o2]);
  }
  /**
   * Remove shortcut
   *
   * @param element - Element shortcut is set for
   * @param name - shortcut name
   */
  remove(e, t) {
    const o2 = this.findShortcut(e, t);
    if (!o2)
      return;
    o2.remove();
    const s2 = this.registeredShortcuts.get(e).filter((r) => r !== o2);
    if (s2.length === 0) {
      this.registeredShortcuts.delete(e);
      return;
    }
    this.registeredShortcuts.set(e, s2);
  }
  /**
   * Get Shortcut instance if exist
   *
   * @param element - Element shorcut is set for
   * @param shortcut - shortcut name
   * @returns {number} index - shortcut index if exist
   */
  findShortcut(e, t) {
    return (this.registeredShortcuts.get(e) || []).find(({ name: i }) => i === t);
  }
};
var ge = new ks();
var ys = Object.defineProperty;
var ws = Object.getOwnPropertyDescriptor;
var rn = (n, e, t, o2) => {
  for (var i = o2 > 1 ? void 0 : o2 ? ws(e, t) : e, s2 = n.length - 1, r; s2 >= 0; s2--)
    (r = n[s2]) && (i = (o2 ? r(e, t, i) : r(i)) || i);
  return o2 && i && ys(e, t, i), i;
};
var Le = /* @__PURE__ */ ((n) => (n.Opened = "toolbox-opened", n.Closed = "toolbox-closed", n.BlockAdded = "toolbox-block-added", n))(Le || {});
var Ct = class an extends Oe {
  /**
   * Toolbox constructor
   *
   * @param options - available parameters
   * @param options.api - Editor API methods
   * @param options.tools - Tools available to check whether some of them should be displayed at the Toolbox or not
   */
  constructor({ api: e, tools: t, i18nLabels: o2 }) {
    super(), this.opened = false, this.listeners = new _e(), this.popover = null, this.handleMobileLayoutToggle = () => {
      this.destroyPopover(), this.initPopover();
    }, this.onPopoverClose = () => {
      this.opened = false, this.emit(
        "toolbox-closed"
        /* Closed */
      );
    }, this.api = e, this.tools = t, this.i18nLabels = o2, this.enableShortcuts(), this.nodes = {
      toolbox: u.make("div", an.CSS.toolbox)
    }, this.initPopover(), this.api.events.on(Te, this.handleMobileLayoutToggle);
  }
  /**
   * Returns True if Toolbox is Empty and nothing to show
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return this.toolsToBeDisplayed.length === 0;
  }
  /**
   * CSS styles
   */
  static get CSS() {
    return {
      toolbox: "ce-toolbox"
    };
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.toolbox;
  }
  /**
   * Returns true if the Toolbox has the Flipper activated and the Flipper has selected button
   */
  hasFocus() {
    if (this.popover !== null)
      return "hasFocus" in this.popover ? this.popover.hasFocus() : void 0;
  }
  /**
   * Destroy Module
   */
  destroy() {
    var e;
    super.destroy(), this.nodes && this.nodes.toolbox && this.nodes.toolbox.remove(), this.removeAllShortcuts(), (e = this.popover) == null || e.off(G.Closed, this.onPopoverClose), this.listeners.destroy(), this.api.events.off(Te, this.handleMobileLayoutToggle);
  }
  /**
   * Toolbox Tool's button click handler
   *
   * @param toolName - tool type to be activated
   * @param blockDataOverrides - Block data predefined by the activated Toolbox item
   */
  toolButtonActivated(e, t) {
    this.insertNewBlock(e, t);
  }
  /**
   * Open Toolbox with Tools
   */
  open() {
    var e;
    this.isEmpty || ((e = this.popover) == null || e.show(), this.opened = true, this.emit(
      "toolbox-opened"
      /* Opened */
    ));
  }
  /**
   * Close Toolbox
   */
  close() {
    var e;
    (e = this.popover) == null || e.hide(), this.opened = false, this.emit(
      "toolbox-closed"
      /* Closed */
    );
  }
  /**
   * Close Toolbox
   */
  toggle() {
    this.opened ? this.close() : this.open();
  }
  /**
   * Creates toolbox popover and appends it inside wrapper element
   */
  initPopover() {
    var t;
    const e = be() ? nn : Bt;
    this.popover = new e({
      scopeElement: this.api.ui.nodes.redactor,
      searchable: true,
      messages: {
        nothingFound: this.i18nLabels.nothingFound,
        search: this.i18nLabels.filter
      },
      items: this.toolboxItemsToBeDisplayed
    }), this.popover.on(G.Closed, this.onPopoverClose), (t = this.nodes.toolbox) == null || t.append(this.popover.getElement());
  }
  /**
   * Destroys popover instance and removes it from DOM
   */
  destroyPopover() {
    this.popover !== null && (this.popover.hide(), this.popover.off(G.Closed, this.onPopoverClose), this.popover.destroy(), this.popover = null), this.nodes.toolbox !== null && (this.nodes.toolbox.innerHTML = "");
  }
  get toolsToBeDisplayed() {
    const e = [];
    return this.tools.forEach((t) => {
      t.toolbox && e.push(t);
    }), e;
  }
  get toolboxItemsToBeDisplayed() {
    const e = (t, o2, i = true) => ({
      icon: t.icon,
      title: z.t(K.toolNames, t.title || je(o2.name)),
      name: o2.name,
      onActivate: () => {
        this.toolButtonActivated(o2.name, t.data);
      },
      secondaryLabel: o2.shortcut && i ? vt(o2.shortcut) : ""
    });
    return this.toolsToBeDisplayed.reduce((t, o2) => (Array.isArray(o2.toolbox) ? o2.toolbox.forEach((i, s2) => {
      t.push(e(i, o2, s2 === 0));
    }) : o2.toolbox !== void 0 && t.push(e(o2.toolbox, o2)), t), []);
  }
  /**
   * Iterate all tools and enable theirs shortcuts if specified
   */
  enableShortcuts() {
    this.toolsToBeDisplayed.forEach((e) => {
      const t = e.shortcut;
      t && this.enableShortcutForTool(e.name, t);
    });
  }
  /**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcutForTool(e, t) {
    ge.add({
      name: t,
      on: this.api.ui.nodes.redactor,
      handler: async (o2) => {
        o2.preventDefault();
        const i = this.api.blocks.getCurrentBlockIndex(), s2 = this.api.blocks.getBlockByIndex(i);
        if (s2)
          try {
            const r = await this.api.blocks.convert(s2.id, e);
            this.api.caret.setToBlock(r, "end");
            return;
          } catch {
          }
        this.insertNewBlock(e);
      }
    });
  }
  /**
   * Removes all added shortcuts
   * Fired when the Read-Only mode is activated
   */
  removeAllShortcuts() {
    this.toolsToBeDisplayed.forEach((e) => {
      const t = e.shortcut;
      t && ge.remove(this.api.ui.nodes.redactor, t);
    });
  }
  /**
   * Inserts new block
   * Can be called when button clicked on Toolbox or by ShortcutData
   *
   * @param {string} toolName - Tool name
   * @param blockDataOverrides - predefined Block data
   */
  async insertNewBlock(e, t) {
    const o2 = this.api.blocks.getCurrentBlockIndex(), i = this.api.blocks.getBlockByIndex(o2);
    if (!i)
      return;
    const s2 = i.isEmpty ? o2 : o2 + 1;
    let r;
    if (t) {
      const l2 = await this.api.blocks.composeBlockData(e);
      r = Object.assign(l2, t);
    }
    const a3 = this.api.blocks.insert(
      e,
      r,
      void 0,
      s2,
      void 0,
      i.isEmpty
    );
    a3.call(ee.APPEND_CALLBACK), this.api.caret.setToBlock(s2), this.emit("toolbox-block-added", {
      block: a3
    }), this.api.toolbar.close();
  }
};
rn([
  me
], Ct.prototype, "toolsToBeDisplayed", 1);
rn([
  me
], Ct.prototype, "toolboxItemsToBeDisplayed", 1);
var Es = Ct;
var ln = "block hovered";
async function xs(n, e) {
  const t = navigator.keyboard;
  if (!t)
    return e;
  try {
    return (await t.getLayoutMap()).get(n) || e;
  } catch (o2) {
    return console.error(o2), e;
  }
}
var Bs = class extends E {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.toolboxInstance = null;
  }
  /**
   * CSS styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      toolbar: "ce-toolbar",
      content: "ce-toolbar__content",
      actions: "ce-toolbar__actions",
      actionsOpened: "ce-toolbar__actions--opened",
      toolbarOpened: "ce-toolbar--opened",
      openedToolboxHolderModifier: "codex-editor--toolbox-opened",
      plusButton: "ce-toolbar__plus",
      plusButtonShortcut: "ce-toolbar__plus-shortcut",
      settingsToggler: "ce-toolbar__settings-btn",
      settingsTogglerHidden: "ce-toolbar__settings-btn--hidden"
    };
  }
  /**
   * Returns the Toolbar opening state
   *
   * @returns {boolean}
   */
  get opened() {
    return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened);
  }
  /**
   * Public interface for accessing the Toolbox
   */
  get toolbox() {
    var e;
    return {
      opened: (e = this.toolboxInstance) == null ? void 0 : e.opened,
      close: () => {
        var t;
        (t = this.toolboxInstance) == null || t.close();
      },
      open: () => {
        if (this.toolboxInstance === null) {
          S("toolbox.open() called before initialization is finished", "warn");
          return;
        }
        this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.open();
      },
      toggle: () => {
        if (this.toolboxInstance === null) {
          S("toolbox.toggle() called before initialization is finished", "warn");
          return;
        }
        this.toolboxInstance.toggle();
      },
      hasFocus: () => {
        var t;
        return (t = this.toolboxInstance) == null ? void 0 : t.hasFocus();
      }
    };
  }
  /**
   * Block actions appearance manipulations
   */
  get blockActions() {
    return {
      hide: () => {
        this.nodes.actions.classList.remove(this.CSS.actionsOpened);
      },
      show: () => {
        this.nodes.actions.classList.add(this.CSS.actionsOpened);
      }
    };
  }
  /**
   * Methods for working with Block Tunes toggler
   */
  get blockTunesToggler() {
    return {
      hide: () => this.nodes.settingsToggler.classList.add(this.CSS.settingsTogglerHidden),
      show: () => this.nodes.settingsToggler.classList.remove(this.CSS.settingsTogglerHidden)
    };
  }
  /**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */
  toggleReadOnly(e) {
    e ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : window.requestIdleCallback(() => {
      this.drawUI(), this.enableModuleBindings();
    }, { timeout: 2e3 });
  }
  /**
   * Move Toolbar to the passed (or current) Block
   *
   * @param block - block to move Toolbar near it
   */
  moveAndOpen(e = this.Editor.BlockManager.currentBlock) {
    if (this.toolboxInstance === null) {
      S("Can't open Toolbar since Editor initialization is not finished yet", "warn");
      return;
    }
    if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e)
      return;
    this.hoveredBlock = e;
    const t = e.holder, { isMobile: o2 } = this.Editor.UI;
    let i;
    const s2 = 20, r = e.firstInput, a3 = t.getBoundingClientRect(), l2 = r !== void 0 ? r.getBoundingClientRect() : null, c3 = l2 !== null ? l2.top - a3.top : null, d2 = c3 !== null ? c3 > s2 : void 0;
    if (o2)
      i = t.offsetTop + t.offsetHeight;
    else if (r === void 0 || d2) {
      const h3 = parseInt(window.getComputedStyle(e.pluginsContent).paddingTop);
      i = t.offsetTop + h3;
    } else {
      const h3 = li(r), p = parseInt(window.getComputedStyle(this.nodes.plusButton).height, 10), g3 = 8;
      i = t.offsetTop + h3 - p + g3 + c3;
    }
    this.nodes.wrapper.style.top = `${Math.floor(i)}px`, this.Editor.BlockManager.blocks.length === 1 && e.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
  }
  /**
   * Close the Toolbar
   */
  close() {
    var e, t;
    this.Editor.ReadOnly.isEnabled || ((e = this.nodes.wrapper) == null || e.classList.remove(this.CSS.toolbarOpened), this.blockActions.hide(), (t = this.toolboxInstance) == null || t.close(), this.Editor.BlockSettings.close(), this.reset());
  }
  /**
   * Reset the Toolbar position to prevent DOM height growth, for example after blocks deletion
   */
  reset() {
    this.nodes.wrapper.style.top = "unset";
  }
  /**
   * Open Toolbar with Plus Button and Actions
   *
   * @param {boolean} withBlockActions - by default, Toolbar opens with Block Actions.
   *                                     This flag allows to open Toolbar without Actions.
   */
  open(e = true) {
    this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), e ? this.blockActions.show() : this.blockActions.hide();
  }
  /**
   * Draws Toolbar elements
   */
  async make() {
    this.nodes.wrapper = u.make("div", this.CSS.toolbar), ["content", "actions"].forEach((s2) => {
      this.nodes[s2] = u.make("div", this.CSS[s2]);
    }), u.append(this.nodes.wrapper, this.nodes.content), u.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = u.make("div", this.CSS.plusButton, {
      innerHTML: ts
    }), u.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
      $e(true), this.plusButtonClicked();
    }, false);
    const e = u.make("div");
    e.appendChild(document.createTextNode(z.ui(K.ui.toolbar.toolbox, "Add"))), e.appendChild(u.make("div", this.CSS.plusButtonShortcut, {
      textContent: "/"
    })), ze(this.nodes.plusButton, e, {
      hidingDelay: 400
    }), this.nodes.settingsToggler = u.make("span", this.CSS.settingsToggler, {
      innerHTML: es
    }), u.append(this.nodes.actions, this.nodes.settingsToggler);
    const t = u.make("div"), o2 = u.text(z.ui(K.ui.blockTunes.toggler, "Click to tune")), i = await xs("Slash", "/");
    t.appendChild(o2), t.appendChild(u.make("div", this.CSS.plusButtonShortcut, {
      textContent: vt(`CMD + ${i}`)
    })), ze(this.nodes.settingsToggler, t, {
      hidingDelay: 400
    }), u.append(this.nodes.actions, this.makeToolbox()), u.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), u.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Creates the Toolbox instance and return it's rendered element
   */
  makeToolbox() {
    return this.toolboxInstance = new Es({
      api: this.Editor.API.methods,
      tools: this.Editor.Tools.blockTools,
      i18nLabels: {
        filter: z.ui(K.ui.popover, "Filter"),
        nothingFound: z.ui(K.ui.popover, "Nothing found")
      }
    }), this.toolboxInstance.on(Le.Opened, () => {
      this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(Le.Closed, () => {
      this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(Le.BlockAdded, ({ block: e }) => {
      const { BlockManager: t, Caret: o2 } = this.Editor, i = t.getBlockById(e.id);
      i.inputs.length === 0 && (i === t.lastBlock ? (t.insertAtEnd(), o2.setToBlock(t.lastBlock)) : o2.setToBlock(t.nextBlock));
    }), this.toolboxInstance.getElement();
  }
  /**
   * Handler for Plus Button
   */
  plusButtonClicked() {
    var e;
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, (e = this.toolboxInstance) == null || e.toggle();
  }
  /**
   * Enable bindings
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (e) => {
      var t;
      e.stopPropagation(), this.settingsTogglerClicked(), (t = this.toolboxInstance) != null && t.opened && this.toolboxInstance.close(), $e(true);
    }, true), be() || this.eventsDispatcher.on(ln, (e) => {
      var t;
      this.Editor.BlockSettings.opened || (t = this.toolboxInstance) != null && t.opened || this.moveAndOpen(e.block);
    });
  }
  /**
   * Disable bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Clicks on the Block Settings toggler
   */
  settingsTogglerClicked() {
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.BlockSettings.open(this.hoveredBlock);
  }
  /**
   * Draws Toolbar UI
   *
   * Toolbar contains BlockSettings and Toolbox.
   * That's why at first we draw its components and then Toolbar itself
   *
   * Steps:
   *  - Make Toolbar dependent components like BlockSettings, Toolbox and so on
   *  - Make itself and append dependent nodes to itself
   *
   */
  drawUI() {
    this.Editor.BlockSettings.make(), this.make();
  }
  /**
   * Removes all created and saved HTMLElements
   * It is used in Read-Only mode
   */
  destroy() {
    this.removeAllNodes(), this.toolboxInstance && this.toolboxInstance.destroy();
  }
};
var ae = /* @__PURE__ */ ((n) => (n[n.Block = 0] = "Block", n[n.Inline = 1] = "Inline", n[n.Tune = 2] = "Tune", n))(ae || {});
var Pe = /* @__PURE__ */ ((n) => (n.Shortcut = "shortcut", n.Toolbox = "toolbox", n.EnabledInlineTools = "inlineToolbar", n.EnabledBlockTunes = "tunes", n.Config = "config", n))(Pe || {});
var cn = /* @__PURE__ */ ((n) => (n.Shortcut = "shortcut", n.SanitizeConfig = "sanitize", n))(cn || {});
var pe = /* @__PURE__ */ ((n) => (n.IsEnabledLineBreaks = "enableLineBreaks", n.Toolbox = "toolbox", n.ConversionConfig = "conversionConfig", n.IsReadOnlySupported = "isReadOnlySupported", n.PasteConfig = "pasteConfig", n))(pe || {});
var We = /* @__PURE__ */ ((n) => (n.IsInline = "isInline", n.Title = "title", n.IsReadOnlySupported = "isReadOnlySupported", n))(We || {});
var mt = /* @__PURE__ */ ((n) => (n.IsTune = "isTune", n))(mt || {});
var Tt = class {
  /**
   * @class
   * @param {ConstructorOptions} options - Constructor options
   */
  constructor({
    name: e,
    constructable: t,
    config: o2,
    api: i,
    isDefault: s2,
    isInternal: r = false,
    defaultPlaceholder: a3
  }) {
    this.api = i, this.name = e, this.constructable = t, this.config = o2, this.isDefault = s2, this.isInternal = r, this.defaultPlaceholder = a3;
  }
  /**
   * Returns Tool user configuration
   */
  get settings() {
    const e = this.config.config || {};
    return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
  }
  /**
   * Calls Tool's reset method
   */
  reset() {
    if (A(this.constructable.reset))
      return this.constructable.reset();
  }
  /**
   * Calls Tool's prepare method
   */
  prepare() {
    if (A(this.constructable.prepare))
      return this.constructable.prepare({
        toolName: this.name,
        config: this.settings
      });
  }
  /**
   * Returns shortcut for Tool (internal or specified by user)
   */
  get shortcut() {
    const e = this.constructable.shortcut;
    return this.config.shortcut || e;
  }
  /**
   * Returns Tool's sanitizer configuration
   */
  get sanitizeConfig() {
    return this.constructable.sanitize || {};
  }
  /**
   * Returns true if Tools is inline
   */
  isInline() {
    return this.type === ae.Inline;
  }
  /**
   * Returns true if Tools is block
   */
  isBlock() {
    return this.type === ae.Block;
  }
  /**
   * Returns true if Tools is tune
   */
  isTune() {
    return this.type === ae.Tune;
  }
};
var Cs = class extends E {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.CSS = {
      inlineToolbar: "ce-inline-toolbar"
    }, this.opened = false, this.popover = null, this.toolbarVerticalMargin = be() ? 20 : 6, this.tools = /* @__PURE__ */ new Map(), window.requestIdleCallback(() => {
      this.make();
    }, { timeout: 2e3 });
  }
  /**
   *  Moving / appearance
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Shows Inline Toolbar if something is selected
   *
   * @param [needToClose] - pass true to close toolbar if it is not allowed.
   *                                  Avoid to use it just for closing IT, better call .close() clearly.
   */
  async tryToShow(e = false) {
    e && this.close(), this.allowedToShow() && (await this.open(), this.Editor.Toolbar.close());
  }
  /**
   * Hides Inline Toolbar
   */
  close() {
    var e, t;
    if (this.opened) {
      for (const [o2, i] of this.tools) {
        const s2 = this.getToolShortcut(o2.name);
        s2 !== void 0 && ge.remove(this.Editor.UI.nodes.redactor, s2), A(i.clear) && i.clear();
      }
      this.tools = /* @__PURE__ */ new Map(), this.reset(), this.opened = false, (e = this.popover) == null || e.hide(), (t = this.popover) == null || t.destroy(), this.popover = null;
    }
  }
  /**
   * Check if node is contained by Inline Toolbar
   *
   * @param {Node} node — node to check
   */
  containsNode(e) {
    return this.nodes.wrapper === void 0 ? false : this.nodes.wrapper.contains(e);
  }
  /**
   * Removes UI and its components
   */
  destroy() {
    var e;
    this.removeAllNodes(), (e = this.popover) == null || e.destroy(), this.popover = null;
  }
  /**
   * Making DOM
   */
  make() {
    this.nodes.wrapper = u.make("div", [
      this.CSS.inlineToolbar,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), u.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Shows Inline Toolbar
   */
  async open() {
    var t;
    if (this.opened)
      return;
    this.opened = true, this.popover !== null && this.popover.destroy(), this.createToolsInstances();
    const e = await this.getPopoverItems();
    this.popover = new hs({
      items: e,
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: z.ui(K.ui.popover, "Nothing found"),
        search: z.ui(K.ui.popover, "Filter")
      }
    }), this.move(this.popover.size.width), (t = this.nodes.wrapper) == null || t.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Move Toolbar to the selected text
   *
   * @param popoverWidth - width of the toolbar popover
   */
  move(e) {
    const t = b.rect, o2 = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), i = {
      x: t.x - o2.x,
      y: t.y + t.height - // + window.scrollY
      o2.top + this.toolbarVerticalMargin
    };
    i.x + e + o2.x > this.Editor.UI.contentRect.right && (i.x = this.Editor.UI.contentRect.right - e - o2.x), this.nodes.wrapper.style.left = Math.floor(i.x) + "px", this.nodes.wrapper.style.top = Math.floor(i.y) + "px";
  }
  /**
   * Clear orientation classes and reset position
   */
  reset() {
    this.nodes.wrapper.style.left = "0", this.nodes.wrapper.style.top = "0";
  }
  /**
   * Need to show Inline Toolbar or not
   */
  allowedToShow() {
    const e = ["IMG", "INPUT"], t = b.get(), o2 = b.text;
    if (!t || !t.anchorNode || t.isCollapsed || o2.length < 1)
      return false;
    const i = u.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
    if (i === null || t !== null && e.includes(i.tagName))
      return false;
    const s2 = this.Editor.BlockManager.getBlock(t.anchorNode);
    return !s2 || this.getTools().some((c3) => s2.tool.inlineTools.has(c3.name)) === false ? false : i.closest("[contenteditable]") !== null;
  }
  /**
   *  Working with Tools
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Returns tools that are available for current block
   *
   * Used to check if Inline Toolbar could be shown
   * and to render tools in the Inline Toolbar
   */
  getTools() {
    const e = this.Editor.BlockManager.currentBlock;
    return e ? Array.from(e.tool.inlineTools.values()).filter((o2) => !(this.Editor.ReadOnly.isEnabled && o2.isReadOnlySupported !== true)) : [];
  }
  /**
   * Constructs tools instances and saves them to this.tools
   */
  createToolsInstances() {
    this.tools = /* @__PURE__ */ new Map(), this.getTools().forEach((t) => {
      const o2 = t.create();
      this.tools.set(t, o2);
    });
  }
  /**
   * Returns Popover Items for tools segregated by their appearance type: regular items and custom html elements.
   */
  async getPopoverItems() {
    const e = [];
    let t = 0;
    for (const [o2, i] of this.tools) {
      const s2 = await i.render(), r = this.getToolShortcut(o2.name);
      if (r !== void 0)
        try {
          this.enableShortcuts(o2.name, r);
        } catch {
        }
      const a3 = r !== void 0 ? vt(r) : void 0, l2 = z.t(
        K.toolNames,
        o2.title || je(o2.name)
      );
      [s2].flat().forEach((c3) => {
        var h3, p;
        const d2 = {
          name: o2.name,
          onActivate: () => {
            this.toolClicked(i);
          },
          hint: {
            title: l2,
            description: a3
          }
        };
        if (u.isElement(c3)) {
          const g3 = {
            ...d2,
            element: c3,
            type: _.Html
          };
          if (A(i.renderActions)) {
            const f3 = i.renderActions();
            g3.children = {
              isOpen: (h3 = i.checkState) == null ? void 0 : h3.call(i, b.get()),
              /** Disable keyboard navigation in actions, as it might conflict with enter press handling */
              isFlippable: false,
              items: [
                {
                  type: _.Html,
                  element: f3
                }
              ]
            };
          } else
            (p = i.checkState) == null || p.call(i, b.get());
          e.push(g3);
        } else if (c3.type === _.Html)
          e.push({
            ...d2,
            ...c3,
            type: _.Html
          });
        else if (c3.type === _.Separator)
          e.push({
            type: _.Separator
          });
        else {
          const g3 = {
            ...d2,
            ...c3,
            type: _.Default
          };
          "children" in g3 && t !== 0 && e.push({
            type: _.Separator
          }), e.push(g3), "children" in g3 && t < this.tools.size - 1 && e.push({
            type: _.Separator
          });
        }
      }), t++;
    }
    return e;
  }
  /**
   * Get shortcut name for tool
   *
   * @param toolName — Tool name
   */
  getToolShortcut(e) {
    const { Tools: t } = this.Editor, o2 = t.inlineTools.get(e), i = t.internal.inlineTools;
    return Array.from(i.keys()).includes(e) ? this.inlineTools[e][cn.Shortcut] : o2 == null ? void 0 : o2.shortcut;
  }
  /**
   * Enable Tool shortcut with Editor Shortcuts Module
   *
   * @param toolName - tool name
   * @param shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcuts(e, t) {
    ge.add({
      name: t,
      handler: (o2) => {
        var s2;
        const { currentBlock: i } = this.Editor.BlockManager;
        i && i.tool.enabledInlineTools && (o2.preventDefault(), (s2 = this.popover) == null || s2.activateItemByName(e));
      },
      /**
       * We need to bind shortcut to the document to make it work in read-only mode
       */
      on: document
    });
  }
  /**
   * Inline Tool button clicks
   *
   * @param tool - Tool's instance
   */
  toolClicked(e) {
    var o2;
    const t = b.range;
    (o2 = e.surround) == null || o2.call(e, t), this.checkToolsState();
  }
  /**
   * Check Tools` state by selection
   */
  checkToolsState() {
    var e;
    (e = this.tools) == null || e.forEach((t) => {
      var o2;
      (o2 = t.checkState) == null || o2.call(t, b.get());
    });
  }
  /**
   * Get inline tools tools
   * Tools that has isInline is true
   */
  get inlineTools() {
    const e = {};
    return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([t, o2]) => {
      e[t] = o2.create();
    }), e;
  }
};
function dn() {
  const n = window.getSelection();
  if (n === null)
    return [null, 0];
  let e = n.focusNode, t = n.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], t = e.textContent.length)), [e, t]);
}
function un(n, e, t, o2) {
  const i = document.createRange();
  o2 === "left" ? (i.setStart(n, 0), i.setEnd(e, t)) : (i.setStart(e, t), i.setEnd(n, n.childNodes.length));
  const s2 = i.cloneContents(), r = document.createElement("div");
  r.appendChild(s2);
  const a3 = r.textContent || "";
  return ai(a3);
}
function Ne(n) {
  const e = u.getDeepestNode(n);
  if (e === null || u.isEmpty(n))
    return true;
  if (u.isNativeInput(e))
    return e.selectionEnd === 0;
  if (u.isEmpty(n))
    return true;
  const [t, o2] = dn();
  return t === null ? false : un(n, t, o2, "left");
}
function Re(n) {
  const e = u.getDeepestNode(n, true);
  if (e === null)
    return true;
  if (u.isNativeInput(e))
    return e.selectionEnd === e.value.length;
  const [t, o2] = dn();
  return t === null ? false : un(n, t, o2, "right");
}
var hn = {};
var St = {};
var Xe = {};
var de = {};
var It = {};
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: true });
Ot.allInputsSelector = Ts;
function Ts() {
  var n = ["text", "password", "email", "number", "search", "tel", "url"];
  return "[contenteditable=true], textarea, input:not([type]), " + n.map(function(e) {
    return 'input[type="'.concat(e, '"]');
  }).join(", ");
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.allInputsSelector = void 0;
  var e = Ot;
  Object.defineProperty(n, "allInputsSelector", { enumerable: true, get: function() {
    return e.allInputsSelector;
  } });
})(It);
var ue = {};
var _t = {};
Object.defineProperty(_t, "__esModule", { value: true });
_t.isNativeInput = Ss;
function Ss(n) {
  var e = [
    "INPUT",
    "TEXTAREA"
  ];
  return n && n.tagName ? e.includes(n.tagName) : false;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isNativeInput = void 0;
  var e = _t;
  Object.defineProperty(n, "isNativeInput", { enumerable: true, get: function() {
    return e.isNativeInput;
  } });
})(ue);
var pn = {};
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: true });
Mt.append = Is;
function Is(n, e) {
  Array.isArray(e) ? e.forEach(function(t) {
    n.appendChild(t);
  }) : n.appendChild(e);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.append = void 0;
  var e = Mt;
  Object.defineProperty(n, "append", { enumerable: true, get: function() {
    return e.append;
  } });
})(pn);
var At = {};
var Lt = {};
Object.defineProperty(Lt, "__esModule", { value: true });
Lt.blockElements = Os;
function Os() {
  return [
    "address",
    "article",
    "aside",
    "blockquote",
    "canvas",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "noscript",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "table",
    "tbody",
    "thead",
    "tr",
    "tfoot",
    "ul",
    "video"
  ];
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.blockElements = void 0;
  var e = Lt;
  Object.defineProperty(n, "blockElements", { enumerable: true, get: function() {
    return e.blockElements;
  } });
})(At);
var fn = {};
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: true });
Pt.calculateBaseline = _s;
function _s(n) {
  var e = window.getComputedStyle(n), t = parseFloat(e.fontSize), o2 = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), s2 = parseFloat(e.borderTopWidth), r = parseFloat(e.marginTop), a3 = t * 0.8, l2 = (o2 - t) / 2, c3 = r + s2 + i + l2 + a3;
  return c3;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.calculateBaseline = void 0;
  var e = Pt;
  Object.defineProperty(n, "calculateBaseline", { enumerable: true, get: function() {
    return e.calculateBaseline;
  } });
})(fn);
var gn = {};
var Nt = {};
var Rt = {};
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: true });
Dt.isContentEditable = Ms;
function Ms(n) {
  return n.contentEditable === "true";
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isContentEditable = void 0;
  var e = Dt;
  Object.defineProperty(n, "isContentEditable", { enumerable: true, get: function() {
    return e.isContentEditable;
  } });
})(Rt);
Object.defineProperty(Nt, "__esModule", { value: true });
Nt.canSetCaret = Ps;
var As = ue;
var Ls = Rt;
function Ps(n) {
  var e = true;
  if ((0, As.isNativeInput)(n))
    switch (n.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        e = false;
        break;
    }
  else
    e = (0, Ls.isContentEditable)(n);
  return e;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.canSetCaret = void 0;
  var e = Nt;
  Object.defineProperty(n, "canSetCaret", { enumerable: true, get: function() {
    return e.canSetCaret;
  } });
})(gn);
var Ve = {};
var Ft = {};
function Ns(n, e, t) {
  const o2 = t.value !== void 0 ? "value" : "get", i = t[o2], s2 = `#${e}Cache`;
  if (t[o2] = function(...r) {
    return this[s2] === void 0 && (this[s2] = i.apply(this, r)), this[s2];
  }, o2 === "get" && t.set) {
    const r = t.set;
    t.set = function(a3) {
      delete n[s2], r.apply(this, a3);
    };
  }
  return t;
}
function mn() {
  const n = {
    win: false,
    mac: false,
    x11: false,
    linux: false
  }, e = Object.keys(n).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e !== void 0 && (n[e] = true), n;
}
function jt(n) {
  return n != null && n !== "" && (typeof n != "object" || Object.keys(n).length > 0);
}
function Rs(n) {
  return !jt(n);
}
var Ds = () => typeof window < "u" && window.navigator !== null && jt(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function Fs(n) {
  const e = mn();
  return n = n.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, "+"), e.mac ? n = n.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
}
function js(n) {
  return n[0].toUpperCase() + n.slice(1);
}
function Hs(n) {
  const e = document.createElement("div");
  e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = n, document.body.appendChild(e);
  const t = window.getSelection(), o2 = document.createRange();
  if (o2.selectNode(e), t === null)
    throw new Error("Cannot copy text to clipboard");
  t.removeAllRanges(), t.addRange(o2), document.execCommand("copy"), document.body.removeChild(e);
}
function $s(n, e, t) {
  let o2;
  return (...i) => {
    const s2 = this, r = () => {
      o2 = void 0, t !== true && n.apply(s2, i);
    }, a3 = t === true && o2 !== void 0;
    window.clearTimeout(o2), o2 = window.setTimeout(r, e), a3 && n.apply(s2, i);
  };
}
function oe(n) {
  return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function zs(n) {
  return oe(n) === "boolean";
}
function bn(n) {
  return oe(n) === "function" || oe(n) === "asyncfunction";
}
function Us(n) {
  return bn(n) && /^\s*class\s+/.test(n.toString());
}
function Ws(n) {
  return oe(n) === "number";
}
function De(n) {
  return oe(n) === "object";
}
function Ys(n) {
  return Promise.resolve(n) === n;
}
function Ks(n) {
  return oe(n) === "string";
}
function Xs(n) {
  return oe(n) === "undefined";
}
function bt(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if (De(n) && De(t))
    for (const o2 in t)
      De(t[o2]) ? (n[o2] === void 0 && Object.assign(n, { [o2]: {} }), bt(n[o2], t[o2])) : Object.assign(n, { [o2]: t[o2] });
  return bt(n, ...e);
}
function Vs(n, e, t) {
  const o2 = `\xAB${e}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${t}\xBB instead.`;
  n && console.warn(o2);
}
function qs(n) {
  try {
    return new URL(n).href;
  } catch {
  }
  return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
}
function Zs(n) {
  return n > 47 && n < 58 || n === 32 || n === 13 || n === 229 || n > 64 && n < 91 || n > 95 && n < 112 || n > 185 && n < 193 || n > 218 && n < 223;
}
var Gs = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
};
var Qs = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
var Js = class {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, o2) => {
      this.completed = this.completed.then(e).then(t).catch(o2);
    });
  }
};
function er(n, e, t = void 0) {
  let o2, i, s2, r = null, a3 = 0;
  t || (t = {});
  const l2 = function() {
    a3 = t.leading === false ? 0 : Date.now(), r = null, s2 = n.apply(o2, i), r === null && (o2 = i = null);
  };
  return function() {
    const c3 = Date.now();
    !a3 && t.leading === false && (a3 = c3);
    const d2 = e - (c3 - a3);
    return o2 = this, i = arguments, d2 <= 0 || d2 > e ? (r && (clearTimeout(r), r = null), a3 = c3, s2 = n.apply(o2, i), r === null && (o2 = i = null)) : !r && t.trailing !== false && (r = setTimeout(l2, d2)), s2;
  };
}
var tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PromiseQueue: Js,
  beautifyShortcut: Fs,
  cacheable: Ns,
  capitalize: js,
  copyTextToClipboard: Hs,
  debounce: $s,
  deepMerge: bt,
  deprecationAssert: Vs,
  getUserOS: mn,
  getValidUrl: qs,
  isBoolean: zs,
  isClass: Us,
  isEmpty: Rs,
  isFunction: bn,
  isIosDevice: Ds,
  isNumber: Ws,
  isObject: De,
  isPrintableKey: Zs,
  isPromise: Ys,
  isString: Ks,
  isUndefined: Xs,
  keyCodes: Gs,
  mouseButtons: Qs,
  notEmpty: jt,
  throttle: er,
  typeOf: oe
}, Symbol.toStringTag, { value: "Module" }));
var Ht = /* @__PURE__ */ Xn(tr);
Object.defineProperty(Ft, "__esModule", { value: true });
Ft.containsOnlyInlineElements = ir;
var or = Ht;
var nr = At;
function ir(n) {
  var e;
  (0, or.isString)(n) ? (e = document.createElement("div"), e.innerHTML = n) : e = n;
  var t = function(o2) {
    return !(0, nr.blockElements)().includes(o2.tagName.toLowerCase()) && Array.from(o2.children).every(t);
  };
  return Array.from(e.children).every(t);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.containsOnlyInlineElements = void 0;
  var e = Ft;
  Object.defineProperty(n, "containsOnlyInlineElements", { enumerable: true, get: function() {
    return e.containsOnlyInlineElements;
  } });
})(Ve);
var vn = {};
var $t = {};
var qe = {};
var zt = {};
Object.defineProperty(zt, "__esModule", { value: true });
zt.make = sr;
function sr(n, e, t) {
  var o2;
  e === void 0 && (e = null), t === void 0 && (t = {});
  var i = document.createElement(n);
  if (Array.isArray(e)) {
    var s2 = e.filter(function(a3) {
      return a3 !== void 0;
    });
    (o2 = i.classList).add.apply(o2, s2);
  } else
    e !== null && i.classList.add(e);
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r]);
  return i;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.make = void 0;
  var e = zt;
  Object.defineProperty(n, "make", { enumerable: true, get: function() {
    return e.make;
  } });
})(qe);
Object.defineProperty($t, "__esModule", { value: true });
$t.fragmentToString = ar;
var rr = qe;
function ar(n) {
  var e = (0, rr.make)("div");
  return e.appendChild(n), e.innerHTML;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.fragmentToString = void 0;
  var e = $t;
  Object.defineProperty(n, "fragmentToString", { enumerable: true, get: function() {
    return e.fragmentToString;
  } });
})(vn);
var kn = {};
var Ut = {};
Object.defineProperty(Ut, "__esModule", { value: true });
Ut.getContentLength = cr;
var lr = ue;
function cr(n) {
  var e, t;
  return (0, lr.isNativeInput)(n) ? n.value.length : n.nodeType === Node.TEXT_NODE ? n.length : (t = (e = n.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.getContentLength = void 0;
  var e = Ut;
  Object.defineProperty(n, "getContentLength", { enumerable: true, get: function() {
    return e.getContentLength;
  } });
})(kn);
var Wt = {};
var Yt = {};
var Io = Ce && Ce.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2)
    for (var o2 = 0, i = e.length, s2; o2 < i; o2++)
      (s2 || !(o2 in e)) && (s2 || (s2 = Array.prototype.slice.call(e, 0, o2)), s2[o2] = e[o2]);
  return n.concat(s2 || Array.prototype.slice.call(e));
};
Object.defineProperty(Yt, "__esModule", { value: true });
Yt.getDeepestBlockElements = yn;
var dr = Ve;
function yn(n) {
  return (0, dr.containsOnlyInlineElements)(n) ? [n] : Array.from(n.children).reduce(function(e, t) {
    return Io(Io([], e, true), yn(t), true);
  }, []);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.getDeepestBlockElements = void 0;
  var e = Yt;
  Object.defineProperty(n, "getDeepestBlockElements", { enumerable: true, get: function() {
    return e.getDeepestBlockElements;
  } });
})(Wt);
var wn = {};
var Kt = {};
var Ze = {};
var Xt = {};
Object.defineProperty(Xt, "__esModule", { value: true });
Xt.isLineBreakTag = ur;
function ur(n) {
  return [
    "BR",
    "WBR"
  ].includes(n.tagName);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isLineBreakTag = void 0;
  var e = Xt;
  Object.defineProperty(n, "isLineBreakTag", { enumerable: true, get: function() {
    return e.isLineBreakTag;
  } });
})(Ze);
var Ge = {};
var Vt = {};
Object.defineProperty(Vt, "__esModule", { value: true });
Vt.isSingleTag = hr;
function hr(n) {
  return [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ].includes(n.tagName);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isSingleTag = void 0;
  var e = Vt;
  Object.defineProperty(n, "isSingleTag", { enumerable: true, get: function() {
    return e.isSingleTag;
  } });
})(Ge);
Object.defineProperty(Kt, "__esModule", { value: true });
Kt.getDeepestNode = En;
var pr = ue;
var fr = Ze;
var gr = Ge;
function En(n, e) {
  e === void 0 && (e = false);
  var t = e ? "lastChild" : "firstChild", o2 = e ? "previousSibling" : "nextSibling";
  if (n.nodeType === Node.ELEMENT_NODE && n[t]) {
    var i = n[t];
    if ((0, gr.isSingleTag)(i) && !(0, pr.isNativeInput)(i) && !(0, fr.isLineBreakTag)(i))
      if (i[o2])
        i = i[o2];
      else if (i.parentNode !== null && i.parentNode[o2])
        i = i.parentNode[o2];
      else
        return i.parentNode;
    return En(i, e);
  }
  return n;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.getDeepestNode = void 0;
  var e = Kt;
  Object.defineProperty(n, "getDeepestNode", { enumerable: true, get: function() {
    return e.getDeepestNode;
  } });
})(wn);
var xn = {};
var qt = {};
var Me = Ce && Ce.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2)
    for (var o2 = 0, i = e.length, s2; o2 < i; o2++)
      (s2 || !(o2 in e)) && (s2 || (s2 = Array.prototype.slice.call(e, 0, o2)), s2[o2] = e[o2]);
  return n.concat(s2 || Array.prototype.slice.call(e));
};
Object.defineProperty(qt, "__esModule", { value: true });
qt.findAllInputs = yr;
var mr = Ve;
var br = Wt;
var vr = It;
var kr = ue;
function yr(n) {
  return Array.from(n.querySelectorAll((0, vr.allInputsSelector)())).reduce(function(e, t) {
    return (0, kr.isNativeInput)(t) || (0, mr.containsOnlyInlineElements)(t) ? Me(Me([], e, true), [t], false) : Me(Me([], e, true), (0, br.getDeepestBlockElements)(t), true);
  }, []);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.findAllInputs = void 0;
  var e = qt;
  Object.defineProperty(n, "findAllInputs", { enumerable: true, get: function() {
    return e.findAllInputs;
  } });
})(xn);
var Bn = {};
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: true });
Zt.isCollapsedWhitespaces = wr;
function wr(n) {
  return !/[^\t\n\r ]/.test(n);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isCollapsedWhitespaces = void 0;
  var e = Zt;
  Object.defineProperty(n, "isCollapsedWhitespaces", { enumerable: true, get: function() {
    return e.isCollapsedWhitespaces;
  } });
})(Bn);
var Gt = {};
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: true });
Qt.isElement = xr;
var Er = Ht;
function xr(n) {
  return (0, Er.isNumber)(n) ? false : !!n && !!n.nodeType && n.nodeType === Node.ELEMENT_NODE;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isElement = void 0;
  var e = Qt;
  Object.defineProperty(n, "isElement", { enumerable: true, get: function() {
    return e.isElement;
  } });
})(Gt);
var Cn = {};
var Jt = {};
var eo = {};
var to = {};
Object.defineProperty(to, "__esModule", { value: true });
to.isLeaf = Br;
function Br(n) {
  return n === null ? false : n.childNodes.length === 0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isLeaf = void 0;
  var e = to;
  Object.defineProperty(n, "isLeaf", { enumerable: true, get: function() {
    return e.isLeaf;
  } });
})(eo);
var oo = {};
var no = {};
Object.defineProperty(no, "__esModule", { value: true });
no.isNodeEmpty = Or;
var Cr = Ze;
var Tr = Gt;
var Sr = ue;
var Ir = Ge;
function Or(n, e) {
  var t = "";
  return (0, Ir.isSingleTag)(n) && !(0, Cr.isLineBreakTag)(n) ? false : ((0, Tr.isElement)(n) && (0, Sr.isNativeInput)(n) ? t = n.value : n.textContent !== null && (t = n.textContent.replace("\u200B", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isNodeEmpty = void 0;
  var e = no;
  Object.defineProperty(n, "isNodeEmpty", { enumerable: true, get: function() {
    return e.isNodeEmpty;
  } });
})(oo);
Object.defineProperty(Jt, "__esModule", { value: true });
Jt.isEmpty = Ar;
var _r = eo;
var Mr = oo;
function Ar(n, e) {
  n.normalize();
  for (var t = [n]; t.length > 0; ) {
    var o2 = t.shift();
    if (o2) {
      if (n = o2, (0, _r.isLeaf)(n) && !(0, Mr.isNodeEmpty)(n, e))
        return false;
      t.push.apply(t, Array.from(n.childNodes));
    }
  }
  return true;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isEmpty = void 0;
  var e = Jt;
  Object.defineProperty(n, "isEmpty", { enumerable: true, get: function() {
    return e.isEmpty;
  } });
})(Cn);
var Tn = {};
var io = {};
Object.defineProperty(io, "__esModule", { value: true });
io.isFragment = Pr;
var Lr = Ht;
function Pr(n) {
  return (0, Lr.isNumber)(n) ? false : !!n && !!n.nodeType && n.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isFragment = void 0;
  var e = io;
  Object.defineProperty(n, "isFragment", { enumerable: true, get: function() {
    return e.isFragment;
  } });
})(Tn);
var Sn = {};
var so = {};
Object.defineProperty(so, "__esModule", { value: true });
so.isHTMLString = Rr;
var Nr = qe;
function Rr(n) {
  var e = (0, Nr.make)("div");
  return e.innerHTML = n, e.childElementCount > 0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isHTMLString = void 0;
  var e = so;
  Object.defineProperty(n, "isHTMLString", { enumerable: true, get: function() {
    return e.isHTMLString;
  } });
})(Sn);
var In = {};
var ro = {};
Object.defineProperty(ro, "__esModule", { value: true });
ro.offset = Dr;
function Dr(n) {
  var e = n.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, o2 = window.pageYOffset || document.documentElement.scrollTop, i = e.top + o2, s2 = e.left + t;
  return {
    top: i,
    left: s2,
    bottom: i + e.height,
    right: s2 + e.width
  };
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.offset = void 0;
  var e = ro;
  Object.defineProperty(n, "offset", { enumerable: true, get: function() {
    return e.offset;
  } });
})(In);
var On = {};
var ao = {};
Object.defineProperty(ao, "__esModule", { value: true });
ao.prepend = Fr;
function Fr(n, e) {
  Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
    return n.prepend(t);
  })) : n.prepend(e);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.prepend = void 0;
  var e = ao;
  Object.defineProperty(n, "prepend", { enumerable: true, get: function() {
    return e.prepend;
  } });
})(On);
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.prepend = n.offset = n.make = n.isLineBreakTag = n.isSingleTag = n.isNodeEmpty = n.isLeaf = n.isHTMLString = n.isFragment = n.isEmpty = n.isElement = n.isContentEditable = n.isCollapsedWhitespaces = n.findAllInputs = n.isNativeInput = n.allInputsSelector = n.getDeepestNode = n.getDeepestBlockElements = n.getContentLength = n.fragmentToString = n.containsOnlyInlineElements = n.canSetCaret = n.calculateBaseline = n.blockElements = n.append = void 0;
  var e = It;
  Object.defineProperty(n, "allInputsSelector", { enumerable: true, get: function() {
    return e.allInputsSelector;
  } });
  var t = ue;
  Object.defineProperty(n, "isNativeInput", { enumerable: true, get: function() {
    return t.isNativeInput;
  } });
  var o2 = pn;
  Object.defineProperty(n, "append", { enumerable: true, get: function() {
    return o2.append;
  } });
  var i = At;
  Object.defineProperty(n, "blockElements", { enumerable: true, get: function() {
    return i.blockElements;
  } });
  var s2 = fn;
  Object.defineProperty(n, "calculateBaseline", { enumerable: true, get: function() {
    return s2.calculateBaseline;
  } });
  var r = gn;
  Object.defineProperty(n, "canSetCaret", { enumerable: true, get: function() {
    return r.canSetCaret;
  } });
  var a3 = Ve;
  Object.defineProperty(n, "containsOnlyInlineElements", { enumerable: true, get: function() {
    return a3.containsOnlyInlineElements;
  } });
  var l2 = vn;
  Object.defineProperty(n, "fragmentToString", { enumerable: true, get: function() {
    return l2.fragmentToString;
  } });
  var c3 = kn;
  Object.defineProperty(n, "getContentLength", { enumerable: true, get: function() {
    return c3.getContentLength;
  } });
  var d2 = Wt;
  Object.defineProperty(n, "getDeepestBlockElements", { enumerable: true, get: function() {
    return d2.getDeepestBlockElements;
  } });
  var h3 = wn;
  Object.defineProperty(n, "getDeepestNode", { enumerable: true, get: function() {
    return h3.getDeepestNode;
  } });
  var p = xn;
  Object.defineProperty(n, "findAllInputs", { enumerable: true, get: function() {
    return p.findAllInputs;
  } });
  var g3 = Bn;
  Object.defineProperty(n, "isCollapsedWhitespaces", { enumerable: true, get: function() {
    return g3.isCollapsedWhitespaces;
  } });
  var f3 = Rt;
  Object.defineProperty(n, "isContentEditable", { enumerable: true, get: function() {
    return f3.isContentEditable;
  } });
  var v4 = Gt;
  Object.defineProperty(n, "isElement", { enumerable: true, get: function() {
    return v4.isElement;
  } });
  var O4 = Cn;
  Object.defineProperty(n, "isEmpty", { enumerable: true, get: function() {
    return O4.isEmpty;
  } });
  var T3 = Tn;
  Object.defineProperty(n, "isFragment", { enumerable: true, get: function() {
    return T3.isFragment;
  } });
  var M3 = Sn;
  Object.defineProperty(n, "isHTMLString", { enumerable: true, get: function() {
    return M3.isHTMLString;
  } });
  var q3 = eo;
  Object.defineProperty(n, "isLeaf", { enumerable: true, get: function() {
    return q3.isLeaf;
  } });
  var F3 = oo;
  Object.defineProperty(n, "isNodeEmpty", { enumerable: true, get: function() {
    return F3.isNodeEmpty;
  } });
  var H4 = Ze;
  Object.defineProperty(n, "isLineBreakTag", { enumerable: true, get: function() {
    return H4.isLineBreakTag;
  } });
  var Q2 = Ge;
  Object.defineProperty(n, "isSingleTag", { enumerable: true, get: function() {
    return Q2.isSingleTag;
  } });
  var ie2 = qe;
  Object.defineProperty(n, "make", { enumerable: true, get: function() {
    return ie2.make;
  } });
  var k3 = In;
  Object.defineProperty(n, "offset", { enumerable: true, get: function() {
    return k3.offset;
  } });
  var m3 = On;
  Object.defineProperty(n, "prepend", { enumerable: true, get: function() {
    return m3.prepend;
  } });
})(de);
var Qe = {};
Object.defineProperty(Qe, "__esModule", { value: true });
Qe.getContenteditableSlice = Hr;
var jr = de;
function Hr(n, e, t, o2, i) {
  var s2;
  i === void 0 && (i = false);
  var r = document.createRange();
  if (o2 === "left" ? (r.setStart(n, 0), r.setEnd(e, t)) : (r.setStart(e, t), r.setEnd(n, n.childNodes.length)), i === true) {
    var a3 = r.extractContents();
    return (0, jr.fragmentToString)(a3);
  }
  var l2 = r.cloneContents(), c3 = document.createElement("div");
  c3.appendChild(l2);
  var d2 = (s2 = c3.textContent) !== null && s2 !== void 0 ? s2 : "";
  return d2;
}
Object.defineProperty(Xe, "__esModule", { value: true });
Xe.checkContenteditableSliceForEmptiness = Ur;
var $r = de;
var zr = Qe;
function Ur(n, e, t, o2) {
  var i = (0, zr.getContenteditableSlice)(n, e, t, o2);
  return (0, $r.isCollapsedWhitespaces)(i);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.checkContenteditableSliceForEmptiness = void 0;
  var e = Xe;
  Object.defineProperty(n, "checkContenteditableSliceForEmptiness", { enumerable: true, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
})(St);
var _n = {};
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.getContenteditableSlice = void 0;
  var e = Qe;
  Object.defineProperty(n, "getContenteditableSlice", { enumerable: true, get: function() {
    return e.getContenteditableSlice;
  } });
})(_n);
var Mn = {};
var lo = {};
Object.defineProperty(lo, "__esModule", { value: true });
lo.focus = Yr;
var Wr = de;
function Yr(n, e) {
  var t, o2;
  if (e === void 0 && (e = true), (0, Wr.isNativeInput)(n)) {
    n.focus();
    var i = e ? 0 : n.value.length;
    n.setSelectionRange(i, i);
  } else {
    var s2 = document.createRange(), r = window.getSelection();
    if (!r)
      return;
    var a3 = function(p) {
      var g3 = document.createTextNode("");
      p.appendChild(g3), s2.setStart(g3, 0), s2.setEnd(g3, 0);
    }, l2 = function(p) {
      return p != null;
    }, c3 = n.childNodes, d2 = e ? c3[0] : c3[c3.length - 1];
    if (l2(d2)) {
      for (; l2(d2) && d2.nodeType !== Node.TEXT_NODE; )
        d2 = e ? d2.firstChild : d2.lastChild;
      if (l2(d2) && d2.nodeType === Node.TEXT_NODE) {
        var h3 = (o2 = (t = d2.textContent) === null || t === void 0 ? void 0 : t.length) !== null && o2 !== void 0 ? o2 : 0, i = e ? 0 : h3;
        s2.setStart(d2, i), s2.setEnd(d2, i);
      } else
        a3(n);
    } else
      a3(n);
    r.removeAllRanges(), r.addRange(s2);
  }
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.focus = void 0;
  var e = lo;
  Object.defineProperty(n, "focus", { enumerable: true, get: function() {
    return e.focus;
  } });
})(Mn);
var co = {};
var Je = {};
Object.defineProperty(Je, "__esModule", { value: true });
Je.getCaretNodeAndOffset = Kr;
function Kr() {
  var n = window.getSelection();
  if (n === null)
    return [null, 0];
  var e = n.focusNode, t = n.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [e, t]);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.getCaretNodeAndOffset = void 0;
  var e = Je;
  Object.defineProperty(n, "getCaretNodeAndOffset", { enumerable: true, get: function() {
    return e.getCaretNodeAndOffset;
  } });
})(co);
var An = {};
var et = {};
Object.defineProperty(et, "__esModule", { value: true });
et.getRange = Xr;
function Xr() {
  var n = window.getSelection();
  return n && n.rangeCount ? n.getRangeAt(0) : null;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.getRange = void 0;
  var e = et;
  Object.defineProperty(n, "getRange", { enumerable: true, get: function() {
    return e.getRange;
  } });
})(An);
var Ln = {};
var uo = {};
Object.defineProperty(uo, "__esModule", { value: true });
uo.isCaretAtEndOfInput = Zr;
var Oo = de;
var Vr = co;
var qr = St;
function Zr(n) {
  var e = (0, Oo.getDeepestNode)(n, true);
  if (e === null)
    return true;
  if ((0, Oo.isNativeInput)(e))
    return e.selectionEnd === e.value.length;
  var t = (0, Vr.getCaretNodeAndOffset)(), o2 = t[0], i = t[1];
  return o2 === null ? false : (0, qr.checkContenteditableSliceForEmptiness)(n, o2, i, "right");
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isCaretAtEndOfInput = void 0;
  var e = uo;
  Object.defineProperty(n, "isCaretAtEndOfInput", { enumerable: true, get: function() {
    return e.isCaretAtEndOfInput;
  } });
})(Ln);
var Pn = {};
var ho = {};
Object.defineProperty(ho, "__esModule", { value: true });
ho.isCaretAtStartOfInput = Jr;
var Ae = de;
var Gr = Je;
var Qr = Xe;
function Jr(n) {
  var e = (0, Ae.getDeepestNode)(n);
  if (e === null || (0, Ae.isEmpty)(n))
    return true;
  if ((0, Ae.isNativeInput)(e))
    return e.selectionEnd === 0;
  if ((0, Ae.isEmpty)(n))
    return true;
  var t = (0, Gr.getCaretNodeAndOffset)(), o2 = t[0], i = t[1];
  return o2 === null ? false : (0, Qr.checkContenteditableSliceForEmptiness)(n, o2, i, "left");
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.isCaretAtStartOfInput = void 0;
  var e = ho;
  Object.defineProperty(n, "isCaretAtStartOfInput", { enumerable: true, get: function() {
    return e.isCaretAtStartOfInput;
  } });
})(Pn);
var Nn = {};
var po = {};
Object.defineProperty(po, "__esModule", { value: true });
po.save = oa;
var ea = de;
var ta = et;
function oa() {
  var n = (0, ta.getRange)(), e = (0, ea.make)("span");
  if (e.id = "cursor", e.hidden = true, !!n)
    return n.insertNode(e), function() {
      var o2 = window.getSelection();
      o2 && (n.setStartAfter(e), n.setEndAfter(e), o2.removeAllRanges(), o2.addRange(n), setTimeout(function() {
        e.remove();
      }, 150));
    };
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.save = void 0;
  var e = po;
  Object.defineProperty(n, "save", { enumerable: true, get: function() {
    return e.save;
  } });
})(Nn);
(function(n) {
  Object.defineProperty(n, "__esModule", { value: true }), n.save = n.isCaretAtStartOfInput = n.isCaretAtEndOfInput = n.getRange = n.getCaretNodeAndOffset = n.focus = n.getContenteditableSlice = n.checkContenteditableSliceForEmptiness = void 0;
  var e = St;
  Object.defineProperty(n, "checkContenteditableSliceForEmptiness", { enumerable: true, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
  var t = _n;
  Object.defineProperty(n, "getContenteditableSlice", { enumerable: true, get: function() {
    return t.getContenteditableSlice;
  } });
  var o2 = Mn;
  Object.defineProperty(n, "focus", { enumerable: true, get: function() {
    return o2.focus;
  } });
  var i = co;
  Object.defineProperty(n, "getCaretNodeAndOffset", { enumerable: true, get: function() {
    return i.getCaretNodeAndOffset;
  } });
  var s2 = An;
  Object.defineProperty(n, "getRange", { enumerable: true, get: function() {
    return s2.getRange;
  } });
  var r = Ln;
  Object.defineProperty(n, "isCaretAtEndOfInput", { enumerable: true, get: function() {
    return r.isCaretAtEndOfInput;
  } });
  var a3 = Pn;
  Object.defineProperty(n, "isCaretAtStartOfInput", { enumerable: true, get: function() {
    return a3.isCaretAtStartOfInput;
  } });
  var l2 = Nn;
  Object.defineProperty(n, "save", { enumerable: true, get: function() {
    return l2.save;
  } });
})(hn);
var na = class extends E {
  /**
   * All keydowns on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  keydown(e) {
    switch (this.beforeKeydownProcessing(e), e.keyCode) {
      case y.BACKSPACE:
        this.backspace(e);
        break;
      case y.DELETE:
        this.delete(e);
        break;
      case y.ENTER:
        this.enter(e);
        break;
      case y.DOWN:
      case y.RIGHT:
        this.arrowRightAndDown(e);
        break;
      case y.UP:
      case y.LEFT:
        this.arrowLeftAndUp(e);
        break;
      case y.TAB:
        this.tabPressed(e);
        break;
    }
    e.key === "/" && !e.ctrlKey && !e.metaKey && this.slashPressed(e), e.code === "Slash" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.commandSlashPressed());
  }
  /**
   * Fires on keydown before event processing
   *
   * @param {KeyboardEvent} event - keydown
   */
  beforeKeydownProcessing(e) {
    this.needToolbarClosing(e) && Po(e.keyCode) && (this.Editor.Toolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.Editor.BlockSelection.clearSelection(e));
  }
  /**
   * Key up on Block:
   * - shows Inline Toolbar if something selected
   * - shows conversion toolbar with 85% of block selection
   *
   * @param {KeyboardEvent} event - keyup event
   */
  keyup(e) {
    e.shiftKey || this.Editor.UI.checkEmptiness();
  }
  /**
   * Add drop target styles
   *
   * @param {DragEvent} event - drag over event
   */
  dragOver(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = true;
  }
  /**
   * Remove drop target style
   *
   * @param {DragEvent} event - drag leave event
   */
  dragLeave(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = false;
  }
  /**
   * Copying selected blocks
   * Before putting to the clipboard we sanitize all blocks and then copy to the clipboard
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandC(e) {
    const { BlockSelection: t } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e);
  }
  /**
   * Copy and Delete selected Blocks
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandX(e) {
    const { BlockSelection: t, BlockManager: o2, Caret: i } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e).then(() => {
      const s2 = o2.removeSelectedBlocks(), r = o2.insertDefaultBlockAtIndex(s2, true);
      i.setToBlock(r, i.positions.START), t.clearSelection(e);
    });
  }
  /**
   * Tab pressed inside a Block.
   *
   * @param {KeyboardEvent} event - keydown
   */
  tabPressed(e) {
    const { InlineToolbar: t, Caret: o2 } = this.Editor;
    if (t.opened)
      return;
    (e.shiftKey ? o2.navigatePrevious(true) : o2.navigateNext(true)) && e.preventDefault();
  }
  /**
   * '/' + 'command' keydown inside a Block
   */
  commandSlashPressed() {
    this.Editor.BlockSelection.selectedBlocks.length > 1 || this.activateBlockSettings();
  }
  /**
   * '/' keydown inside a Block
   *
   * @param event - keydown
   */
  slashPressed(e) {
    !this.Editor.UI.nodes.wrapper.contains(e.target) || !this.Editor.BlockManager.currentBlock.isEmpty || (e.preventDefault(), this.Editor.Caret.insertContentAtCaretPosition("/"), this.activateToolbox());
  }
  /**
   * ENTER pressed on block
   *
   * @param {KeyboardEvent} event - keydown
   */
  enter(e) {
    const { BlockManager: t, UI: o2 } = this.Editor, i = t.currentBlock;
    if (i === void 0 || i.tool.isLineBreaksEnabled || o2.someToolbarOpened && o2.someFlipperButtonFocused || e.shiftKey && !pt)
      return;
    let s2 = i;
    i.currentInput !== void 0 && Ne(i.currentInput) && !i.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : i.currentInput && Re(i.currentInput) ? s2 = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : s2 = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(s2), this.Editor.Toolbar.moveAndOpen(s2), e.preventDefault();
  }
  /**
   * Handle backspace keydown on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(e) {
    const { BlockManager: t, Caret: o2 } = this.Editor, { currentBlock: i, previousBlock: s2 } = t;
    if (i === void 0 || !b.isCollapsed || !i.currentInput || !Ne(i.currentInput))
      return;
    if (e.preventDefault(), this.Editor.Toolbar.close(), !(i.currentInput === i.firstInput)) {
      o2.navigatePrevious();
      return;
    }
    if (s2 === null)
      return;
    if (s2.isEmpty) {
      t.removeBlock(s2);
      return;
    }
    if (i.isEmpty) {
      t.removeBlock(i);
      const l2 = t.currentBlock;
      o2.setToBlock(l2, o2.positions.END);
      return;
    }
    xo(s2, i) ? this.mergeBlocks(s2, i) : o2.setToBlock(s2, o2.positions.END);
  }
  /**
   * Handles delete keydown on Block
   * Removes char after the caret.
   * If caret is at the end of the block, merge next block with current
   *
   * @param {KeyboardEvent} event - keydown
   */
  delete(e) {
    const { BlockManager: t, Caret: o2 } = this.Editor, { currentBlock: i, nextBlock: s2 } = t;
    if (!b.isCollapsed || !Re(i.currentInput))
      return;
    if (e.preventDefault(), this.Editor.Toolbar.close(), !(i.currentInput === i.lastInput)) {
      o2.navigateNext();
      return;
    }
    if (s2 === null)
      return;
    if (s2.isEmpty) {
      t.removeBlock(s2);
      return;
    }
    if (i.isEmpty) {
      t.removeBlock(i), o2.setToBlock(s2, o2.positions.START);
      return;
    }
    xo(i, s2) ? this.mergeBlocks(i, s2) : o2.setToBlock(s2, o2.positions.START);
  }
  /**
   * Merge passed Blocks
   *
   * @param targetBlock - to which Block we want to merge
   * @param blockToMerge - what Block we want to merge
   */
  mergeBlocks(e, t) {
    const { BlockManager: o2, Toolbar: i } = this.Editor;
    e.lastInput !== void 0 && (hn.focus(e.lastInput, false), o2.mergeBlocks(e, t).then(() => {
      i.close();
    }));
  }
  /**
   * Handle right and down keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowRightAndDown(e) {
    const t = ce.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === y.TAB);
    if (this.Editor.UI.someToolbarOpened && t)
      return;
    this.Editor.Toolbar.close();
    const { currentBlock: o2 } = this.Editor.BlockManager, s2 = ((o2 == null ? void 0 : o2.currentInput) !== void 0 ? Re(o2.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === y.DOWN && s2) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState();
      return;
    }
    if (e.keyCode === y.DOWN || e.keyCode === y.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) {
      e.preventDefault();
      return;
    }
    Fe(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Handle left and up keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowLeftAndUp(e) {
    if (this.Editor.UI.someToolbarOpened) {
      if (ce.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === y.TAB))
        return;
      this.Editor.UI.closeAllToolbars();
    }
    this.Editor.Toolbar.close();
    const { currentBlock: t } = this.Editor.BlockManager, i = ((t == null ? void 0 : t.currentInput) !== void 0 ? Ne(t.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === y.UP && i) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState(false);
      return;
    }
    if (e.keyCode === y.UP || e.keyCode === y.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) {
      e.preventDefault();
      return;
    }
    Fe(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Cases when we need to close Toolbar
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  needToolbarClosing(e) {
    const t = e.keyCode === y.ENTER && this.Editor.Toolbar.toolbox.opened, o2 = e.keyCode === y.ENTER && this.Editor.BlockSettings.opened, i = e.keyCode === y.ENTER && this.Editor.InlineToolbar.opened, s2 = e.keyCode === y.TAB;
    return !(e.shiftKey || s2 || t || o2 || i);
  }
  /**
   * If Toolbox is not open, then just open it and show plus button
   */
  activateToolbox() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
  }
  /**
   * Open Toolbar and show BlockSettings before flipping Tools
   */
  activateBlockSettings() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
  }
};
var ct = class {
  /**
   * @class
   * @param {HTMLElement} workingArea — editor`s working node
   */
  constructor(e) {
    this.blocks = [], this.workingArea = e;
  }
  /**
   * Get length of Block instances array
   *
   * @returns {number}
   */
  get length() {
    return this.blocks.length;
  }
  /**
   * Get Block instances array
   *
   * @returns {Block[]}
   */
  get array() {
    return this.blocks;
  }
  /**
   * Get blocks html elements array
   *
   * @returns {HTMLElement[]}
   */
  get nodes() {
    return No(this.workingArea.children);
  }
  /**
   * Proxy trap to implement array-like setter
   *
   * @example
   * blocks[0] = new Block(...)
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — block index or any Blocks class property key to set
   * @param {Block} value — value to set
   * @returns {boolean}
   */
  static set(e, t, o2) {
    return isNaN(Number(t)) ? (Reflect.set(e, t, o2), true) : (e.insert(+t, o2), true);
  }
  /**
   * Proxy trap to implement array-like getter
   *
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — Blocks class property key
   * @returns {Block|*}
   */
  static get(e, t) {
    return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
  }
  /**
   * Push new Block to the blocks array and append it to working area
   *
   * @param {Block} block - Block to add
   */
  push(e) {
    this.blocks.push(e), this.insertToDOM(e);
  }
  /**
   * Swaps blocks with indexes first and second
   *
   * @param {number} first - first block index
   * @param {number} second - second block index
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    const o2 = this.blocks[t];
    u.swap(this.blocks[e].holder, o2.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = o2;
  }
  /**
   * Move a block from one to another index
   *
   * @param {number} toIndex - new index of the block
   * @param {number} fromIndex - block to move
   */
  move(e, t) {
    const o2 = this.blocks.splice(t, 1)[0], i = e - 1, s2 = Math.max(0, i), r = this.blocks[s2];
    e > 0 ? this.insertToDOM(o2, "afterend", r) : this.insertToDOM(o2, "beforebegin", r), this.blocks.splice(e, 0, o2);
    const a3 = this.composeBlockEvent("move", {
      fromIndex: t,
      toIndex: e
    });
    o2.call(ee.MOVED, a3);
  }
  /**
   * Insert new Block at passed index
   *
   * @param {number} index — index to insert Block
   * @param {Block} block — Block to insert
   * @param {boolean} replace — it true, replace block on given index
   */
  insert(e, t, o2 = false) {
    if (!this.length) {
      this.push(t);
      return;
    }
    e > this.length && (e = this.length), o2 && (this.blocks[e].holder.remove(), this.blocks[e].call(ee.REMOVED));
    const i = o2 ? 1 : 0;
    if (this.blocks.splice(e, i, t), e > 0) {
      const s2 = this.blocks[e - 1];
      this.insertToDOM(t, "afterend", s2);
    } else {
      const s2 = this.blocks[e + 1];
      s2 ? this.insertToDOM(t, "beforebegin", s2) : this.insertToDOM(t);
    }
  }
  /**
   * Replaces block under passed index with passed block
   *
   * @param index - index of existed block
   * @param block - new block
   */
  replace(e, t) {
    if (this.blocks[e] === void 0)
      throw Error("Incorrect index");
    this.blocks[e].holder.replaceWith(t.holder), this.blocks[e] = t;
  }
  /**
   * Inserts several blocks at once
   *
   * @param blocks - blocks to insert
   * @param index - index to insert blocks at
   */
  insertMany(e, t) {
    const o2 = new DocumentFragment();
    for (const i of e)
      o2.appendChild(i.holder);
    if (this.length > 0) {
      if (t > 0) {
        const i = Math.min(t - 1, this.length - 1);
        this.blocks[i].holder.after(o2);
      } else
        t === 0 && this.workingArea.prepend(o2);
      this.blocks.splice(t, 0, ...e);
    } else
      this.blocks.push(...e), this.workingArea.appendChild(o2);
    e.forEach((i) => i.call(ee.RENDERED));
  }
  /**
   * Remove block
   *
   * @param {number} index - index of Block to remove
   */
  remove(e) {
    isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(ee.REMOVED), this.blocks.splice(e, 1);
  }
  /**
   * Remove all blocks
   */
  removeAll() {
    this.workingArea.innerHTML = "", this.blocks.forEach((e) => e.call(ee.REMOVED)), this.blocks.length = 0;
  }
  /**
   * Insert Block after passed target
   *
   * @todo decide if this method is necessary
   * @param {Block} targetBlock — target after which Block should be inserted
   * @param {Block} newBlock — Block to insert
   */
  insertAfter(e, t) {
    const o2 = this.blocks.indexOf(e);
    this.insert(o2 + 1, t);
  }
  /**
   * Get Block by index
   *
   * @param {number} index — Block index
   * @returns {Block}
   */
  get(e) {
    return this.blocks[e];
  }
  /**
   * Return index of passed Block
   *
   * @param {Block} block - Block to find
   * @returns {number}
   */
  indexOf(e) {
    return this.blocks.indexOf(e);
  }
  /**
   * Insert new Block into DOM
   *
   * @param {Block} block - Block to insert
   * @param {InsertPosition} position — insert position (if set, will use insertAdjacentElement)
   * @param {Block} target — Block related to position
   */
  insertToDOM(e, t, o2) {
    t ? o2.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(ee.RENDERED);
  }
  /**
   * Composes Block event with passed type and details
   *
   * @param {string} type - event type
   * @param {object} detail - event detail
   */
  composeBlockEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
};
var _o = "block-removed";
var Mo = "block-added";
var ia = "block-moved";
var Ao = "block-changed";
var sa = class {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   *
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, o2) => {
      this.completed = this.completed.then(e).then(t).catch(o2);
    });
  }
};
var ra = class extends E {
  constructor() {
    super(...arguments), this._currentBlockIndex = -1, this._blocks = null;
  }
  /**
   * Returns current Block index
   *
   * @returns {number}
   */
  get currentBlockIndex() {
    return this._currentBlockIndex;
  }
  /**
   * Set current Block index and fire Block lifecycle callbacks
   *
   * @param {number} newIndex - index of Block to set as current
   */
  set currentBlockIndex(e) {
    this._currentBlockIndex = e;
  }
  /**
   * returns first Block
   *
   * @returns {Block}
   */
  get firstBlock() {
    return this._blocks[0];
  }
  /**
   * returns last Block
   *
   * @returns {Block}
   */
  get lastBlock() {
    return this._blocks[this._blocks.length - 1];
  }
  /**
   * Get current Block instance
   *
   * @returns {Block}
   */
  get currentBlock() {
    return this._blocks[this.currentBlockIndex];
  }
  /**
   * Set passed Block as a current
   *
   * @param block - block to set as a current
   */
  set currentBlock(e) {
    this.currentBlockIndex = this.getBlockIndex(e);
  }
  /**
   * Returns next Block instance
   *
   * @returns {Block|null}
   */
  get nextBlock() {
    return this.currentBlockIndex === this._blocks.length - 1 ? null : this._blocks[this.currentBlockIndex + 1];
  }
  /**
   * Return first Block with inputs after current Block
   *
   * @returns {Block | undefined}
   */
  get nextContentfulBlock() {
    return this.blocks.slice(this.currentBlockIndex + 1).find((t) => !!t.inputs.length);
  }
  /**
   * Return first Block with inputs before current Block
   *
   * @returns {Block | undefined}
   */
  get previousContentfulBlock() {
    return this.blocks.slice(0, this.currentBlockIndex).reverse().find((t) => !!t.inputs.length);
  }
  /**
   * Returns previous Block instance
   *
   * @returns {Block|null}
   */
  get previousBlock() {
    return this.currentBlockIndex === 0 ? null : this._blocks[this.currentBlockIndex - 1];
  }
  /**
   * Get array of Block instances
   *
   * @returns {Block[]} {@link Blocks#array}
   */
  get blocks() {
    return this._blocks.array;
  }
  /**
   * Check if each Block is empty
   *
   * @returns {boolean}
   */
  get isEditorEmpty() {
    return this.blocks.every((e) => e.isEmpty);
  }
  /**
   * Should be called after Editor.UI preparation
   * Define this._blocks property
   */
  prepare() {
    const e = new ct(this.Editor.UI.nodes.redactor);
    this._blocks = new Proxy(e, {
      set: ct.set,
      get: ct.get
    }), this.listeners.on(
      document,
      "copy",
      (t) => this.Editor.BlockEvents.handleCommandC(t)
    );
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - Unbind event handlers from created Blocks
   *
   * if readOnly is false:
   *  - Bind event handlers to all existing Blocks
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Creates Block instance by tool name
   *
   * @param {object} options - block creation options
   * @param {string} options.tool - tools passed in editor config {@link EditorConfig#tools}
   * @param {string} [options.id] - unique id for this block
   * @param {BlockToolData} [options.data] - constructor params
   * @returns {Block}
   */
  composeBlock({
    tool: e,
    data: t = {},
    id: o2 = void 0,
    tunes: i = {}
  }) {
    const s2 = this.Editor.ReadOnly.isEnabled, r = this.Editor.Tools.blockTools.get(e), a3 = new R({
      id: o2,
      data: t,
      tool: r,
      api: this.Editor.API,
      readOnly: s2,
      tunesData: i
    }, this.eventsDispatcher);
    return s2 || window.requestIdleCallback(() => {
      this.bindBlockEvents(a3);
    }, { timeout: 2e3 }), a3;
  }
  /**
   * Insert new block into _blocks
   *
   * @param {object} options - insert options
   * @param {string} [options.id] - block's unique id
   * @param {string} [options.tool] - plugin name, by default method inserts the default block type
   * @param {object} [options.data] - plugin data
   * @param {number} [options.index] - index where to insert new Block
   * @param {boolean} [options.needToFocus] - flag shows if needed to update current Block index
   * @param {boolean} [options.replace] - flag shows if block by passed index should be replaced with inserted one
   * @returns {Block}
   */
  insert({
    id: e = void 0,
    tool: t = this.config.defaultBlock,
    data: o2 = {},
    index: i,
    needToFocus: s2 = true,
    replace: r = false,
    tunes: a3 = {}
  } = {}) {
    let l2 = i;
    l2 === void 0 && (l2 = this.currentBlockIndex + (r ? 0 : 1));
    const c3 = this.composeBlock({
      id: e,
      tool: t,
      data: o2,
      tunes: a3
    });
    return r && this.blockDidMutated(_o, this.getBlockByIndex(l2), {
      index: l2
    }), this._blocks.insert(l2, c3, r), this.blockDidMutated(Mo, c3, {
      index: l2
    }), s2 ? this.currentBlockIndex = l2 : l2 <= this.currentBlockIndex && this.currentBlockIndex++, c3;
  }
  /**
   * Inserts several blocks at once
   *
   * @param blocks - blocks to insert
   * @param index - index where to insert
   */
  insertMany(e, t = 0) {
    this._blocks.insertMany(e, t);
  }
  /**
   * Update Block data.
   *
   * Currently we don't have an 'update' method in the Tools API, so we just create a new block with the same id and type
   * Should not trigger 'block-removed' or 'block-added' events.
   *
   * If neither data nor tunes is provided, return the provided block instead.
   *
   * @param block - block to update
   * @param data - (optional) new data
   * @param tunes - (optional) tune data
   */
  async update(e, t, o2) {
    if (!t && !o2)
      return e;
    const i = await e.data, s2 = this.composeBlock({
      id: e.id,
      tool: e.name,
      data: Object.assign({}, i, t ?? {}),
      tunes: o2 ?? e.tunes
    }), r = this.getBlockIndex(e);
    return this._blocks.replace(r, s2), this.blockDidMutated(Ao, s2, {
      index: r
    }), s2;
  }
  /**
   * Replace passed Block with the new one with specified Tool and data
   *
   * @param block - block to replace
   * @param newTool - new Tool name
   * @param data - new Tool data
   */
  replace(e, t, o2) {
    const i = this.getBlockIndex(e);
    return this.insert({
      tool: t,
      data: o2,
      index: i,
      replace: true
    });
  }
  /**
   * Insert pasted content. Call onPaste callback after insert.
   *
   * @param {string} toolName - name of Tool to insert
   * @param {PasteEvent} pasteEvent - pasted data
   * @param {boolean} replace - should replace current block
   */
  paste(e, t, o2 = false) {
    const i = this.insert({
      tool: e,
      replace: o2
    });
    try {
      window.requestIdleCallback(() => {
        i.call(ee.ON_PASTE, t);
      });
    } catch (s2) {
      S(`${e}: onPaste callback call is failed`, "error", s2);
    }
    return i;
  }
  /**
   * Insert new default block at passed index
   *
   * @param {number} index - index where Block should be inserted
   * @param {boolean} needToFocus - if true, updates current Block index
   *
   * TODO: Remove method and use insert() with index instead (?)
   * @returns {Block} inserted Block
   */
  insertDefaultBlockAtIndex(e, t = false) {
    const o2 = this.composeBlock({ tool: this.config.defaultBlock });
    return this._blocks[e] = o2, this.blockDidMutated(Mo, o2, {
      index: e
    }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, o2;
  }
  /**
   * Always inserts at the end
   *
   * @returns {Block}
   */
  insertAtEnd() {
    return this.currentBlockIndex = this.blocks.length - 1, this.insert();
  }
  /**
   * Merge two blocks
   *
   * @param {Block} targetBlock - previous block will be append to this block
   * @param {Block} blockToMerge - block that will be merged with target block
   * @returns {Promise} - the sequence that can be continued
   */
  async mergeBlocks(e, t) {
    let o2;
    if (e.name === t.name && e.mergeable) {
      const i = await t.data;
      if (V(i)) {
        console.error("Could not merge Block. Failed to extract original Block data.");
        return;
      }
      const [s2] = yt([i], e.tool.sanitizeConfig);
      o2 = s2;
    } else if (e.mergeable && He(t, "export") && He(e, "import")) {
      const i = await t.exportDataAsString(), s2 = Z(i, e.tool.sanitizeConfig);
      o2 = Bo(s2, e.tool.conversionConfig);
    }
    o2 !== void 0 && (await e.mergeWith(o2), this.removeBlock(t), this.currentBlockIndex = this._blocks.indexOf(e));
  }
  /**
   * Remove passed Block
   *
   * @param block - Block to remove
   * @param addLastBlock - if true, adds new default block at the end. @todo remove this logic and use event-bus instead
   */
  removeBlock(e, t = true) {
    return new Promise((o2) => {
      const i = this._blocks.indexOf(e);
      if (!this.validateIndex(i))
        throw new Error("Can't find a Block to remove");
      this._blocks.remove(i), e.destroy(), this.blockDidMutated(_o, e, {
        index: i
      }), this.currentBlockIndex >= i && this.currentBlockIndex--, this.blocks.length ? i === 0 && (this.currentBlockIndex = 0) : (this.unsetCurrentBlock(), t && this.insert()), o2();
    });
  }
  /**
   * Remove only selected Blocks
   * and returns first Block index where started removing...
   *
   * @returns {number|undefined}
   */
  removeSelectedBlocks() {
    let e;
    for (let t = this.blocks.length - 1; t >= 0; t--)
      this.blocks[t].selected && (this.removeBlock(this.blocks[t]), e = t);
    return e;
  }
  /**
   * Attention!
   * After removing insert the new default typed Block and focus on it
   * Removes all blocks
   */
  removeAllBlocks() {
    for (let e = this.blocks.length - 1; e >= 0; e--)
      this._blocks.remove(e);
    this.unsetCurrentBlock(), this.insert(), this.currentBlock.firstInput.focus();
  }
  /**
   * Split current Block
   * 1. Extract content from Caret position to the Block`s end
   * 2. Insert a new Block below current one with extracted content
   *
   * @returns {Block}
   */
  split() {
    const e = this.Editor.Caret.extractFragmentFromCaretPosition(), t = u.make("div");
    t.appendChild(e);
    const o2 = {
      text: u.isEmpty(t) ? "" : t.innerHTML
    };
    return this.insert({ data: o2 });
  }
  /**
   * Returns Block by passed index
   *
   * @param {number} index - index to get. -1 to get last
   * @returns {Block}
   */
  getBlockByIndex(e) {
    return e === -1 && (e = this._blocks.length - 1), this._blocks[e];
  }
  /**
   * Returns an index for passed Block
   *
   * @param block - block to find index
   */
  getBlockIndex(e) {
    return this._blocks.indexOf(e);
  }
  /**
   * Returns the Block by passed id
   *
   * @param id - id of block to get
   * @returns {Block}
   */
  getBlockById(e) {
    return this._blocks.array.find((t) => t.id === e);
  }
  /**
   * Get Block instance by html element
   *
   * @param {Node} element - html element to get Block by
   */
  getBlock(e) {
    u.isElement(e) || (e = e.parentNode);
    const t = this._blocks.nodes, o2 = e.closest(`.${R.CSS.wrapper}`), i = t.indexOf(o2);
    if (i >= 0)
      return this._blocks[i];
  }
  /**
   * 1) Find first-level Block from passed child Node
   * 2) Mark it as current
   *
   * @param {Node} childNode - look ahead from this node.
   * @returns {Block | undefined} can return undefined in case when the passed child note is not a part of the current editor instance
   */
  setCurrentBlockByChildNode(e) {
    u.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${R.CSS.wrapper}`);
    if (!t)
      return;
    const o2 = t.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
    if (o2 != null && o2.isEqualNode(this.Editor.UI.nodes.wrapper))
      return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
  }
  /**
   * Return block which contents passed node
   *
   * @param {Node} childNode - node to get Block by
   * @returns {Block}
   */
  getBlockByChildNode(e) {
    if (!e || !(e instanceof Node))
      return;
    u.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${R.CSS.wrapper}`);
    return this.blocks.find((o2) => o2.holder === t);
  }
  /**
   * Swap Blocks Position
   *
   * @param {number} fromIndex - index of first block
   * @param {number} toIndex - index of second block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    this._blocks.swap(e, t), this.currentBlockIndex = t;
  }
  /**
   * Move a block to a new index
   *
   * @param {number} toIndex - index where to move Block
   * @param {number} fromIndex - index of Block to move
   */
  move(e, t = this.currentBlockIndex) {
    if (isNaN(e) || isNaN(t)) {
      S("Warning during 'move' call: incorrect indices provided.", "warn");
      return;
    }
    if (!this.validateIndex(e) || !this.validateIndex(t)) {
      S("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
      return;
    }
    this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(ia, this.currentBlock, {
      fromIndex: t,
      toIndex: e
    });
  }
  /**
   * Converts passed Block to the new Tool
   * Uses Conversion Config
   *
   * @param blockToConvert - Block that should be converted
   * @param targetToolName - name of the Tool to convert to
   * @param blockDataOverrides - optional new Block data overrides
   */
  async convert(e, t, o2) {
    if (!await e.save())
      throw new Error("Could not convert Block. Failed to extract original Block data.");
    const s2 = this.Editor.Tools.blockTools.get(t);
    if (!s2)
      throw new Error(`Could not convert Block. Tool \xAB${t}\xBB not found.`);
    const r = await e.exportDataAsString(), a3 = Z(
      r,
      s2.sanitizeConfig
    );
    let l2 = Bo(a3, s2.conversionConfig, s2.settings);
    return o2 && (l2 = Object.assign(l2, o2)), this.replace(e, s2.name, l2);
  }
  /**
   * Sets current Block Index -1 which means unknown
   * and clear highlights
   */
  unsetCurrentBlock() {
    this.currentBlockIndex = -1;
  }
  /**
   * Clears Editor
   *
   * @param {boolean} needToAddDefaultBlock - 1) in internal calls (for example, in api.blocks.render)
   *                                             we don't need to add an empty default block
   *                                        2) in api.blocks.clear we should add empty block
   */
  async clear(e = false) {
    const t = new sa();
    [...this.blocks].forEach((i) => {
      t.add(async () => {
        await this.removeBlock(i, false);
      });
    }), await t.completed, this.unsetCurrentBlock(), e && this.insert(), this.Editor.UI.checkEmptiness();
  }
  /**
   * Cleans up all the block tools' resources
   * This is called when editor is destroyed
   */
  async destroy() {
    await Promise.all(this.blocks.map((e) => e.destroy()));
  }
  /**
   * Bind Block events
   *
   * @param {Block} block - Block to which event should be bound
   */
  bindBlockEvents(e) {
    const { BlockEvents: t } = this.Editor;
    this.readOnlyMutableListeners.on(e.holder, "keydown", (o2) => {
      t.keydown(o2);
    }), this.readOnlyMutableListeners.on(e.holder, "keyup", (o2) => {
      t.keyup(o2);
    }), this.readOnlyMutableListeners.on(e.holder, "dragover", (o2) => {
      t.dragOver(o2);
    }), this.readOnlyMutableListeners.on(e.holder, "dragleave", (o2) => {
      t.dragLeave(o2);
    }), e.on("didMutated", (o2) => this.blockDidMutated(Ao, o2, {
      index: this.getBlockIndex(o2)
    }));
  }
  /**
   * Disable mutable handlers and bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Enables all module handlers and bindings for all Blocks
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(
      document,
      "cut",
      (e) => this.Editor.BlockEvents.handleCommandX(e)
    ), this.blocks.forEach((e) => {
      this.bindBlockEvents(e);
    });
  }
  /**
   * Validates that the given index is not lower than 0 or higher than the amount of blocks
   *
   * @param {number} index - index of blocks array to validate
   * @returns {boolean}
   */
  validateIndex(e) {
    return !(e < 0 || e >= this._blocks.length);
  }
  /**
   * Block mutation callback
   *
   * @param mutationType - what happened with block
   * @param block - mutated block
   * @param detailData - additional data to pass with change event
   */
  blockDidMutated(e, t, o2) {
    const i = new CustomEvent(e, {
      detail: {
        target: new J(t),
        ...o2
      }
    });
    return this.eventsDispatcher.emit($o, {
      event: i
    }), t;
  }
};
var aa = class extends E {
  constructor() {
    super(...arguments), this.anyBlockSelectedCache = null, this.needToSelectAll = false, this.nativeInputSelected = false, this.readyToBlockSelection = false;
  }
  /**
   * Sanitizer Config
   *
   * @returns {SanitizerConfig}
   */
  get sanitizerConfig() {
    return {
      p: {},
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      ol: {},
      ul: {},
      li: {},
      br: true,
      img: {
        src: true,
        width: true,
        height: true
      },
      a: {
        href: true
      },
      b: {},
      i: {},
      u: {}
    };
  }
  /**
   * Flag that identifies all Blocks selection
   *
   * @returns {boolean}
   */
  get allBlocksSelected() {
    const { BlockManager: e } = this.Editor;
    return e.blocks.every((t) => t.selected === true);
  }
  /**
   * Set selected all blocks
   *
   * @param {boolean} state - state to set
   */
  set allBlocksSelected(e) {
    const { BlockManager: t } = this.Editor;
    t.blocks.forEach((o2) => {
      o2.selected = e;
    }), this.clearCache();
  }
  /**
   * Flag that identifies any Block selection
   *
   * @returns {boolean}
   */
  get anyBlockSelected() {
    const { BlockManager: e } = this.Editor;
    return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = e.blocks.some((t) => t.selected === true)), this.anyBlockSelectedCache;
  }
  /**
   * Return selected Blocks array
   *
   * @returns {Block[]}
   */
  get selectedBlocks() {
    return this.Editor.BlockManager.blocks.filter((e) => e.selected);
  }
  /**
   * Module Preparation
   * Registers Shortcuts CMD+A and CMD+C
   * to select all and copy them
   */
  prepare() {
    this.selection = new b(), ge.add({
      name: "CMD+A",
      handler: (e) => {
        const { BlockManager: t, ReadOnly: o2 } = this.Editor;
        if (o2.isEnabled) {
          e.preventDefault(), this.selectAllBlocks();
          return;
        }
        t.currentBlock && this.handleCommandA(e);
      },
      on: this.Editor.UI.nodes.redactor
    });
  }
  /**
   * Toggle read-only state
   *
   *  - Remove all ranges
   *  - Unselect all Blocks
   */
  toggleReadOnly() {
    b.get().removeAllRanges(), this.allBlocksSelected = false;
  }
  /**
   * Remove selection of Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  unSelectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor;
    let o2;
    isNaN(e) ? o2 = t.currentBlock : o2 = t.getBlockByIndex(e), o2.selected = false, this.clearCache();
  }
  /**
   * Clear selection from Blocks
   *
   * @param {Event} reason - event caused clear of selection
   * @param {boolean} restoreSelection - if true, restore saved selection
   */
  clearSelection(e, t = false) {
    const { BlockManager: o2, Caret: i, RectangleSelection: s2 } = this.Editor;
    this.needToSelectAll = false, this.nativeInputSelected = false, this.readyToBlockSelection = false;
    const r = e && e instanceof KeyboardEvent, a3 = r && Po(e.keyCode);
    if (this.anyBlockSelected && r && a3 && !b.isSelectionExists) {
      const l2 = o2.removeSelectedBlocks();
      o2.insertDefaultBlockAtIndex(l2, true), i.setToBlock(o2.currentBlock), Fe(() => {
        const c3 = e.key;
        i.insertContentAtCaretPosition(c3.length > 1 ? "" : c3);
      }, 20)();
    }
    if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || s2.isRectActivated()) {
      this.Editor.RectangleSelection.clearSelection();
      return;
    }
    t && this.selection.restore(), this.allBlocksSelected = false;
  }
  /**
   * Reduce each Block and copy its content
   *
   * @param {ClipboardEvent} e - copy/cut event
   * @returns {Promise<void>}
   */
  copySelectedBlocks(e) {
    e.preventDefault();
    const t = u.make("div");
    this.selectedBlocks.forEach((s2) => {
      const r = Z(s2.holder.innerHTML, this.sanitizerConfig), a3 = u.make("p");
      a3.innerHTML = r, t.appendChild(a3);
    });
    const o2 = Array.from(t.childNodes).map((s2) => s2.textContent).join(`

`), i = t.innerHTML;
    return e.clipboardData.setData("text/plain", o2), e.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map((s2) => s2.save())).then((s2) => {
      try {
        e.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(s2));
      } catch {
      }
    });
  }
  /**
   * Select Block by its index
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  selectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor, o2 = t.getBlockByIndex(e);
    o2 !== void 0 && this.selectBlock(o2);
  }
  /**
   * Select passed Block
   *
   * @param {Block} block - Block to select
   */
  selectBlock(e) {
    this.selection.save(), b.get().removeAllRanges(), e.selected = true, this.clearCache(), this.Editor.InlineToolbar.close();
  }
  /**
   * Remove selection from passed Block
   *
   * @param {Block} block - Block to unselect
   */
  unselectBlock(e) {
    e.selected = false, this.clearCache();
  }
  /**
   * Clear anyBlockSelected cache
   */
  clearCache() {
    this.anyBlockSelectedCache = null;
  }
  /**
   * Module destruction
   * De-registers Shortcut CMD+A
   */
  destroy() {
    ge.remove(this.Editor.UI.nodes.redactor, "CMD+A");
  }
  /**
   * First CMD+A selects all input content by native behaviour,
   * next CMD+A keypress selects all blocks
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  handleCommandA(e) {
    if (this.Editor.RectangleSelection.clearSelection(), u.isNativeInput(e.target) && !this.readyToBlockSelection) {
      this.readyToBlockSelection = true;
      return;
    }
    const t = this.Editor.BlockManager.getBlock(e.target), o2 = t.inputs;
    if (o2.length > 1 && !this.readyToBlockSelection) {
      this.readyToBlockSelection = true;
      return;
    }
    if (o2.length === 1 && !this.needToSelectAll) {
      this.needToSelectAll = true;
      return;
    }
    this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = false, this.readyToBlockSelection = false) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlock(t), this.needToSelectAll = true);
  }
  /**
   * Select All Blocks
   * Each Block has selected setter that makes Block copyable
   */
  selectAllBlocks() {
    this.selection.save(), b.get().removeAllRanges(), this.allBlocksSelected = true, this.Editor.InlineToolbar.close();
  }
};
var Ye = class _Ye extends E {
  /**
   * Allowed caret positions in input
   *
   * @static
   * @returns {{START: string, END: string, DEFAULT: string}}
   */
  get positions() {
    return {
      START: "start",
      END: "end",
      DEFAULT: "default"
    };
  }
  /**
   * Elements styles that can be useful for Caret Module
   */
  static get CSS() {
    return {
      shadowCaret: "cdx-shadow-caret"
    };
  }
  /**
   * Method gets Block instance and puts caret to the text node with offset
   * There two ways that method applies caret position:
   *   - first found text node: sets at the beginning, but you can pass an offset
   *   - last found text node: sets at the end of the node. Also, you can customize the behaviour
   *
   * @param {Block} block - Block class
   * @param {string} position - position where to set caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the block content
   */
  setToBlock(e, t = this.positions.DEFAULT, o2 = 0) {
    var c3;
    const { BlockManager: i, BlockSelection: s2 } = this.Editor;
    if (s2.clearSelection(), !e.focusable) {
      (c3 = window.getSelection()) == null || c3.removeAllRanges(), s2.selectBlock(e), i.currentBlock = e;
      return;
    }
    let r;
    switch (t) {
      case this.positions.START:
        r = e.firstInput;
        break;
      case this.positions.END:
        r = e.lastInput;
        break;
      default:
        r = e.currentInput;
    }
    if (!r)
      return;
    let a3, l2 = o2;
    if (t === this.positions.START)
      a3 = u.getDeepestNode(r, false), l2 = 0;
    else if (t === this.positions.END)
      a3 = u.getDeepestNode(r, true), l2 = u.getContentLength(a3);
    else {
      const { node: d2, offset: h3 } = u.getNodeByOffset(r, o2);
      d2 ? (a3 = d2, l2 = h3) : (a3 = u.getDeepestNode(r, false), l2 = 0);
    }
    this.set(a3, l2), i.setCurrentBlockByChildNode(e.holder), i.currentBlock.currentInput = r;
  }
  /**
   * Set caret to the current input of current Block.
   *
   * @param {HTMLElement} input - input where caret should be set
   * @param {string} position - position of the caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */
  setToInput(e, t = this.positions.DEFAULT, o2 = 0) {
    const { currentBlock: i } = this.Editor.BlockManager, s2 = u.getDeepestNode(e);
    switch (t) {
      case this.positions.START:
        this.set(s2, 0);
        break;
      case this.positions.END:
        this.set(s2, u.getContentLength(s2));
        break;
      default:
        o2 && this.set(s2, o2);
    }
    i.currentInput = e;
  }
  /**
   * Creates Document Range and sets caret to the element with offset
   *
   * @param {HTMLElement} element - target node.
   * @param {number} offset - offset
   */
  set(e, t = 0) {
    const { top: i, bottom: s2 } = b.setCursor(e, t), { innerHeight: r } = window;
    i < 0 ? window.scrollBy(0, i - 30) : s2 > r && window.scrollBy(0, s2 - r + 30);
  }
  /**
   * Set Caret to the last Block
   * If last block is not empty, append another empty block
   */
  setToTheLastBlock() {
    const e = this.Editor.BlockManager.lastBlock;
    if (e)
      if (e.tool.isDefault && e.isEmpty)
        this.setToBlock(e);
      else {
        const t = this.Editor.BlockManager.insertAtEnd();
        this.setToBlock(t);
      }
  }
  /**
   * Extract content fragment of current Block from Caret position to the end of the Block
   */
  extractFragmentFromCaretPosition() {
    const e = b.get();
    if (e.rangeCount) {
      const t = e.getRangeAt(0), o2 = this.Editor.BlockManager.currentBlock.currentInput;
      if (t.deleteContents(), o2)
        if (u.isNativeInput(o2)) {
          const i = o2, s2 = document.createDocumentFragment(), r = i.value.substring(0, i.selectionStart), a3 = i.value.substring(i.selectionStart);
          return s2.textContent = a3, i.value = r, s2;
        } else {
          const i = t.cloneRange();
          return i.selectNodeContents(o2), i.setStart(t.endContainer, t.endOffset), i.extractContents();
        }
    }
  }
  /**
   * Set's caret to the next Block or Tool`s input
   * Before moving caret, we should check if caret position is at the end of Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @param {boolean} force - pass true to skip check for caret position
   */
  navigateNext(e = false) {
    const { BlockManager: t } = this.Editor, { currentBlock: o2, nextBlock: i } = t;
    if (o2 === void 0)
      return false;
    const { nextInput: s2, currentInput: r } = o2, a3 = r !== void 0 ? Re(r) : void 0;
    let l2 = i;
    const c3 = e || a3 || !o2.focusable;
    if (s2 && c3)
      return this.setToInput(s2, this.positions.START), true;
    if (l2 === null) {
      if (o2.tool.isDefault || !c3)
        return false;
      l2 = t.insertAtEnd();
    }
    return c3 ? (this.setToBlock(l2, this.positions.START), true) : false;
  }
  /**
   * Set's caret to the previous Tool`s input or Block
   * Before moving caret, we should check if caret position is start of the Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @param {boolean} force - pass true to skip check for caret position
   */
  navigatePrevious(e = false) {
    const { currentBlock: t, previousBlock: o2 } = this.Editor.BlockManager;
    if (!t)
      return false;
    const { previousInput: i, currentInput: s2 } = t, r = s2 !== void 0 ? Ne(s2) : void 0, a3 = e || r || !t.focusable;
    return i && a3 ? (this.setToInput(i, this.positions.END), true) : o2 !== null && a3 ? (this.setToBlock(o2, this.positions.END), true) : false;
  }
  /**
   * Inserts shadow element after passed element where caret can be placed
   *
   * @param {Element} element - element after which shadow caret should be inserted
   */
  createShadow(e) {
    const t = document.createElement("span");
    t.classList.add(_Ye.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
  }
  /**
   * Restores caret position
   *
   * @param {HTMLElement} element - element where caret should be restored
   */
  restoreCaret(e) {
    const t = e.querySelector(`.${_Ye.CSS.shadowCaret}`);
    if (!t)
      return;
    new b().expandToTag(t);
    const i = document.createRange();
    i.selectNode(t), i.extractContents();
  }
  /**
   * Inserts passed content at caret position
   *
   * @param {string} content - content to insert
   */
  insertContentAtCaretPosition(e) {
    const t = document.createDocumentFragment(), o2 = document.createElement("div"), i = b.get(), s2 = b.range;
    o2.innerHTML = e, Array.from(o2.childNodes).forEach((c3) => t.appendChild(c3)), t.childNodes.length === 0 && t.appendChild(new Text());
    const r = t.lastChild;
    s2.deleteContents(), s2.insertNode(t);
    const a3 = document.createRange(), l2 = r.nodeType === Node.TEXT_NODE ? r : r.firstChild;
    l2 !== null && l2.textContent !== null && a3.setStart(l2, l2.textContent.length), i.removeAllRanges(), i.addRange(a3);
  }
};
var la = class extends E {
  constructor() {
    super(...arguments), this.onMouseUp = () => {
      this.listeners.off(document, "mouseover", this.onMouseOver), this.listeners.off(document, "mouseup", this.onMouseUp);
    }, this.onMouseOver = (e) => {
      const { BlockManager: t, BlockSelection: o2 } = this.Editor;
      if (e.relatedTarget === null && e.target === null)
        return;
      const i = t.getBlockByChildNode(e.relatedTarget) || this.lastSelectedBlock, s2 = t.getBlockByChildNode(e.target);
      if (!(!i || !s2) && s2 !== i) {
        if (i === this.firstSelectedBlock) {
          b.get().removeAllRanges(), i.selected = true, s2.selected = true, o2.clearCache();
          return;
        }
        if (s2 === this.firstSelectedBlock) {
          i.selected = false, s2.selected = false, o2.clearCache();
          return;
        }
        this.Editor.InlineToolbar.close(), this.toggleBlocksSelectedState(i, s2), this.lastSelectedBlock = s2;
      }
    };
  }
  /**
   * Module preparation
   *
   * @returns {Promise}
   */
  async prepare() {
    this.listeners.on(document, "mousedown", (e) => {
      this.enableCrossBlockSelection(e);
    });
  }
  /**
   * Sets up listeners
   *
   * @param {MouseEvent} event - mouse down event
   */
  watchSelection(e) {
    if (e.button !== qn.LEFT)
      return;
    const { BlockManager: t } = this.Editor;
    this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
  }
  /**
   * Return boolean is cross block selection started:
   * there should be at least 2 selected blocks
   */
  get isCrossBlockSelectionStarted() {
    return !!this.firstSelectedBlock && !!this.lastSelectedBlock && this.firstSelectedBlock !== this.lastSelectedBlock;
  }
  /**
   * Change selection state of the next Block
   * Used for CBS via Shift + arrow keys
   *
   * @param {boolean} next - if true, toggle next block. Previous otherwise
   */
  toggleBlockSelectedState(e = true) {
    const { BlockManager: t, BlockSelection: o2 } = this.Editor;
    this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = true, o2.clearCache(), b.get().removeAllRanges());
    const i = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1), s2 = t.blocks[i];
    s2 && (this.lastSelectedBlock.selected !== s2.selected ? (s2.selected = true, o2.clearCache()) : (this.lastSelectedBlock.selected = false, o2.clearCache()), this.lastSelectedBlock = s2, this.Editor.InlineToolbar.close(), s2.holder.scrollIntoView({
      block: "nearest"
    }));
  }
  /**
   * Clear saved state
   *
   * @param {Event} reason - event caused clear of selection
   */
  clear(e) {
    const { BlockManager: t, BlockSelection: o2, Caret: i } = this.Editor, s2 = t.blocks.indexOf(this.firstSelectedBlock), r = t.blocks.indexOf(this.lastSelectedBlock);
    if (o2.anyBlockSelected && s2 > -1 && r > -1 && e && e instanceof KeyboardEvent)
      switch (e.keyCode) {
        case y.DOWN:
        case y.RIGHT:
          i.setToBlock(t.blocks[Math.max(s2, r)], i.positions.END);
          break;
        case y.UP:
        case y.LEFT:
          i.setToBlock(t.blocks[Math.min(s2, r)], i.positions.START);
          break;
        default:
          i.setToBlock(t.blocks[Math.max(s2, r)], i.positions.END);
      }
    this.firstSelectedBlock = this.lastSelectedBlock = null;
  }
  /**
   * Enables Cross Block Selection
   *
   * @param {MouseEvent} event - mouse down event
   */
  enableCrossBlockSelection(e) {
    const { UI: t } = this.Editor;
    b.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Change blocks selection state between passed two blocks.
   *
   * @param {Block} firstBlock - first block in range
   * @param {Block} lastBlock - last block in range
   */
  toggleBlocksSelectedState(e, t) {
    const { BlockManager: o2, BlockSelection: i } = this.Editor, s2 = o2.blocks.indexOf(e), r = o2.blocks.indexOf(t), a3 = e.selected !== t.selected;
    for (let l2 = Math.min(s2, r); l2 <= Math.max(s2, r); l2++) {
      const c3 = o2.blocks[l2];
      c3 !== this.firstSelectedBlock && c3 !== (a3 ? e : t) && (o2.blocks[l2].selected = !o2.blocks[l2].selected, i.clearCache());
    }
  }
};
var ca = class extends E {
  constructor() {
    super(...arguments), this.isStartedAtEditor = false;
  }
  /**
   * Toggle read-only state
   *
   * if state is true:
   *  - disable all drag-n-drop event handlers
   *
   * if state is false:
   *  - restore drag-n-drop event handlers
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Add drag events listeners to editor zone
   */
  enableModuleBindings() {
    const { UI: e } = this.Editor;
    this.readOnlyMutableListeners.on(e.nodes.holder, "drop", async (t) => {
      await this.processDrop(t);
    }, true), this.readOnlyMutableListeners.on(e.nodes.holder, "dragstart", () => {
      this.processDragStart();
    }), this.readOnlyMutableListeners.on(e.nodes.holder, "dragover", (t) => {
      this.processDragOver(t);
    }, true);
  }
  /**
   * Unbind drag-n-drop event handlers
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Handle drop event
   *
   * @param {DragEvent} dropEvent - drop event
   */
  async processDrop(e) {
    const {
      BlockManager: t,
      Paste: o2,
      Caret: i
    } = this.Editor;
    e.preventDefault(), t.blocks.forEach((r) => {
      r.dropTarget = false;
    }), b.isAtEditor && !b.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = false;
    const s2 = t.setCurrentBlockByChildNode(e.target);
    if (s2)
      this.Editor.Caret.setToBlock(s2, i.positions.END);
    else {
      const r = t.setCurrentBlockByChildNode(t.lastBlock.holder);
      this.Editor.Caret.setToBlock(r, i.positions.END);
    }
    await o2.processDataTransfer(e.dataTransfer, true);
  }
  /**
   * Handle drag start event
   */
  processDragStart() {
    b.isAtEditor && !b.isCollapsed && (this.isStartedAtEditor = true), this.Editor.InlineToolbar.close();
  }
  /**
   * @param {DragEvent} dragEvent - drag event
   */
  processDragOver(e) {
    e.preventDefault();
  }
};
var da = 180;
var ua = 400;
var ha = class extends E {
  /**
   * Prepare the module
   *
   * @param options - options used by the modification observer module
   * @param options.config - Editor configuration object
   * @param options.eventsDispatcher - common Editor event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.disabled = false, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = ua, this.mutationObserver = new MutationObserver((o2) => {
      this.redactorChanged(o2);
    }), this.eventsDispatcher.on($o, (o2) => {
      this.particularBlockChanged(o2.event);
    }), this.eventsDispatcher.on(zo, () => {
      this.disable();
    }), this.eventsDispatcher.on(Uo, () => {
      this.enable();
    });
  }
  /**
   * Enables onChange event
   */
  enable() {
    this.mutationObserver.observe(
      this.Editor.UI.nodes.redactor,
      {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      }
    ), this.disabled = false;
  }
  /**
   * Disables onChange event
   */
  disable() {
    this.mutationObserver.disconnect(), this.disabled = true;
  }
  /**
   * Call onChange event passed to Editor.js configuration
   *
   * @param event - some of our custom change events
   */
  particularBlockChanged(e) {
    this.disabled || !A(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${e.detail.target.id}:event:${e.type}`, e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
      let t;
      this.batchingOnChangeQueue.size === 1 ? t = this.batchingOnChangeQueue.values().next().value : t = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, t), this.batchingOnChangeQueue.clear();
    }, this.batchTime));
  }
  /**
   * Fired on every blocks wrapper dom change
   *
   * @param mutations - mutations happened
   */
  redactorChanged(e) {
    this.eventsDispatcher.emit(ft, {
      mutations: e
    });
  }
};
var Rn = class Dn extends E {
  constructor() {
    super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (e) => {
      try {
        const t = e.create({}, {}, false);
        if (e.pasteConfig === false) {
          this.exceptionList.push(e.name);
          return;
        }
        if (!A(t.onPaste))
          return;
        this.getTagsConfig(e), this.getFilesConfig(e), this.getPatternsConfig(e);
      } catch (t) {
        S(
          `Paste handling for \xAB${e.name}\xBB Tool hasn't been set up because of the error`,
          "warn",
          t
        );
      }
    }, this.handlePasteEvent = async (e) => {
      const { BlockManager: t, Toolbar: o2 } = this.Editor, i = t.setCurrentBlockByChildNode(e.target);
      !i || this.isNativeBehaviour(e.target) && !e.clipboardData.types.includes("Files") || i && this.exceptionList.includes(i.name) || (e.preventDefault(), this.processDataTransfer(e.clipboardData), o2.close());
    };
  }
  /**
   * Set onPaste callback and collect tools` paste configurations
   */
  async prepare() {
    this.processTools();
  }
  /**
   * Set read-only state
   *
   * @param {boolean} readOnlyEnabled - read only flag value
   */
  toggleReadOnly(e) {
    e ? this.unsetCallback() : this.setCallback();
  }
  /**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */
  async processDataTransfer(e, t = false) {
    const { Tools: o2 } = this.Editor, i = e.types;
    if ((i.includes ? i.includes("Files") : i.contains("Files")) && !V(this.toolsFiles)) {
      await this.processFiles(e.files);
      return;
    }
    const r = e.getData(this.MIME_TYPE), a3 = e.getData("text/plain");
    let l2 = e.getData("text/html");
    if (r)
      try {
        this.insertEditorJSData(JSON.parse(r));
        return;
      } catch {
      }
    t && a3.trim() && l2.trim() && (l2 = "<p>" + (l2.trim() ? l2 : a3) + "</p>");
    const c3 = Object.keys(this.toolsTags).reduce((p, g3) => (p[g3.toLowerCase()] = this.toolsTags[g3].sanitizationConfig ?? {}, p), {}), d2 = Object.assign({}, c3, o2.getAllInlineToolsSanitizeConfig(), { br: {} }), h3 = Z(l2, d2);
    !h3.trim() || h3.trim() === a3 || !u.isHTMLString(h3) ? await this.processText(a3) : await this.processText(h3, true);
  }
  /**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */
  async processText(e, t = false) {
    const { Caret: o2, BlockManager: i } = this.Editor, s2 = t ? this.processHTML(e) : this.processPlain(e);
    if (!s2.length)
      return;
    if (s2.length === 1) {
      s2[0].isBlock ? this.processSingleBlock(s2.pop()) : this.processInlinePaste(s2.pop());
      return;
    }
    const a3 = i.currentBlock && i.currentBlock.tool.isDefault && i.currentBlock.isEmpty;
    s2.map(
      async (l2, c3) => this.insertBlock(l2, c3 === 0 && a3)
    ), i.currentBlock && o2.setToBlock(i.currentBlock, o2.positions.END);
  }
  /**
   * Set onPaste callback handler
   */
  setCallback() {
    this.listeners.on(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Unset onPaste callback handler
   */
  unsetCallback() {
    this.listeners.off(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Get and process tool`s paste configs
   */
  processTools() {
    const e = this.Editor.Tools.blockTools;
    Array.from(e.values()).forEach(this.processTool);
  }
  /**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */
  collectTagNames(e) {
    return te(e) ? [e] : D(e) ? Object.keys(e) : [];
  }
  /**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getTagsConfig(e) {
    if (e.pasteConfig === false)
      return;
    const t = e.pasteConfig.tags || [], o2 = [];
    t.forEach((i) => {
      const s2 = this.collectTagNames(i);
      o2.push(...s2), s2.forEach((r) => {
        if (Object.prototype.hasOwnProperty.call(this.toolsTags, r)) {
          S(
            `Paste handler for \xAB${e.name}\xBB Tool on \xAB${r}\xBB tag is skipped because it is already used by \xAB${this.toolsTags[r].tool.name}\xBB Tool.`,
            "warn"
          );
          return;
        }
        const a3 = D(i) ? i[r] : null;
        this.toolsTags[r.toUpperCase()] = {
          tool: e,
          sanitizationConfig: a3
        };
      });
    }), this.tagsByTool[e.name] = o2.map((i) => i.toUpperCase());
  }
  /**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getFilesConfig(e) {
    if (e.pasteConfig === false)
      return;
    const { files: t = {} } = e.pasteConfig;
    let { extensions: o2, mimeTypes: i } = t;
    !o2 && !i || (o2 && !Array.isArray(o2) && (S(`\xABextensions\xBB property of the onDrop config for \xAB${e.name}\xBB Tool should be an array`), o2 = []), i && !Array.isArray(i) && (S(`\xABmimeTypes\xBB property of the onDrop config for \xAB${e.name}\xBB Tool should be an array`), i = []), i && (i = i.filter((s2) => ei(s2) ? true : (S(`MIME type value \xAB${s2}\xBB for the \xAB${e.name}\xBB Tool is not a valid MIME type`, "warn"), false))), this.toolsFiles[e.name] = {
      extensions: o2 || [],
      mimeTypes: i || []
    });
  }
  /**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getPatternsConfig(e) {
    e.pasteConfig === false || !e.pasteConfig.patterns || V(e.pasteConfig.patterns) || Object.entries(e.pasteConfig.patterns).forEach(([t, o2]) => {
      o2 instanceof RegExp || S(
        `Pattern ${o2} for \xAB${e.name}\xBB Tool is skipped because it should be a Regexp instance.`,
        "warn"
      ), this.toolsPatterns.push({
        key: t,
        pattern: o2,
        tool: e
      });
    });
  }
  /**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */
  isNativeBehaviour(e) {
    return u.isNativeInput(e);
  }
  /**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */
  async processFiles(e) {
    const { BlockManager: t } = this.Editor;
    let o2;
    o2 = await Promise.all(
      Array.from(e).map((r) => this.processFile(r))
    ), o2 = o2.filter((r) => !!r);
    const s2 = t.currentBlock.tool.isDefault && t.currentBlock.isEmpty;
    o2.forEach(
      (r, a3) => {
        t.paste(r.type, r.event, a3 === 0 && s2);
      }
    );
  }
  /**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */
  async processFile(e) {
    const t = Jn(e), o2 = Object.entries(this.toolsFiles).find(([r, { mimeTypes: a3, extensions: l2 }]) => {
      const [c3, d2] = e.type.split("/"), h3 = l2.find((g3) => g3.toLowerCase() === t.toLowerCase()), p = a3.find((g3) => {
        const [f3, v4] = g3.split("/");
        return f3 === c3 && (v4 === d2 || v4 === "*");
      });
      return !!h3 || !!p;
    });
    if (!o2)
      return;
    const [i] = o2;
    return {
      event: this.composePasteEvent("file", {
        file: e
      }),
      type: i
    };
  }
  /**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */
  processHTML(e) {
    const { Tools: t } = this.Editor, o2 = u.make("DIV");
    return o2.innerHTML = e, this.getNodes(o2).map((s2) => {
      let r, a3 = t.defaultTool, l2 = false;
      switch (s2.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE:
          r = u.make("div"), r.appendChild(s2);
          break;
        case Node.ELEMENT_NODE:
          r = s2, l2 = true, this.toolsTags[r.tagName] && (a3 = this.toolsTags[r.tagName].tool);
          break;
      }
      const { tags: c3 } = a3.pasteConfig || { tags: [] }, d2 = c3.reduce((g3, f3) => (this.collectTagNames(f3).forEach((O4) => {
        const T3 = D(f3) ? f3[O4] : null;
        g3[O4.toLowerCase()] = T3 || {};
      }), g3), {}), h3 = Object.assign({}, d2, a3.baseSanitizeConfig);
      if (r.tagName.toLowerCase() === "table") {
        const g3 = Z(r.outerHTML, h3);
        r = u.make("div", void 0, {
          innerHTML: g3
        }).firstChild;
      } else
        r.innerHTML = Z(r.innerHTML, h3);
      const p = this.composePasteEvent("tag", {
        data: r
      });
      return {
        content: r,
        isBlock: l2,
        tool: a3.name,
        event: p
      };
    }).filter((s2) => {
      const r = u.isEmpty(s2.content), a3 = u.isSingleTag(s2.content);
      return !r || a3;
    });
  }
  /**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */
  processPlain(e) {
    const { defaultBlock: t } = this.config;
    if (!e)
      return [];
    const o2 = t;
    return e.split(/\r?\n/).filter((i) => i.trim()).map((i) => {
      const s2 = u.make("div");
      s2.textContent = i;
      const r = this.composePasteEvent("tag", {
        data: s2
      });
      return {
        content: s2,
        tool: o2,
        isBlock: false,
        event: r
      };
    });
  }
  /**
   * Process paste of single Block tool content
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processSingleBlock(e) {
    const { Caret: t, BlockManager: o2 } = this.Editor, { currentBlock: i } = o2;
    if (!i || e.tool !== i.name || !u.containsOnlyInlineElements(e.content.innerHTML)) {
      this.insertBlock(e, (i == null ? void 0 : i.tool.isDefault) && i.isEmpty);
      return;
    }
    t.insertContentAtCaretPosition(e.content.innerHTML);
  }
  /**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processInlinePaste(e) {
    const { BlockManager: t, Caret: o2 } = this.Editor, { content: i } = e;
    if (t.currentBlock && t.currentBlock.tool.isDefault && i.textContent.length < Dn.PATTERN_PROCESSING_MAX_LENGTH) {
      const r = await this.processPattern(i.textContent);
      if (r) {
        const a3 = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty, l2 = t.paste(r.tool, r.event, a3);
        o2.setToBlock(l2, o2.positions.END);
        return;
      }
    }
    if (t.currentBlock && t.currentBlock.currentInput) {
      const r = t.currentBlock.tool.baseSanitizeConfig;
      document.execCommand(
        "insertHTML",
        false,
        Z(i.innerHTML, r)
      );
    } else
      this.insertBlock(e);
  }
  /**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */
  async processPattern(e) {
    const t = this.toolsPatterns.find((i) => {
      const s2 = i.pattern.exec(e);
      return s2 ? e === s2.shift() : false;
    });
    return t ? {
      event: this.composePasteEvent("pattern", {
        key: t.key,
        data: e
      }),
      tool: t.tool.name
    } : void 0;
  }
  /**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */
  insertBlock(e, t = false) {
    const { BlockManager: o2, Caret: i } = this.Editor, { currentBlock: s2 } = o2;
    let r;
    if (t && s2 && s2.isEmpty) {
      r = o2.paste(e.tool, e.event, true), i.setToBlock(r, i.positions.END);
      return;
    }
    r = o2.paste(e.tool, e.event), i.setToBlock(r, i.positions.END);
  }
  /**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */
  insertEditorJSData(e) {
    const { BlockManager: t, Caret: o2, Tools: i } = this.Editor;
    yt(
      e,
      (r) => i.blockTools.get(r).sanitizeConfig
    ).forEach(({ tool: r, data: a3 }, l2) => {
      let c3 = false;
      l2 === 0 && (c3 = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty);
      const d2 = t.insert({
        tool: r,
        data: a3,
        replace: c3
      });
      o2.setToBlock(d2, o2.positions.END);
    });
  }
  /**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */
  processElementNode(e, t, o2) {
    const i = Object.keys(this.toolsTags), s2 = e, { tool: r } = this.toolsTags[s2.tagName] || {}, a3 = this.tagsByTool[r == null ? void 0 : r.name] || [], l2 = i.includes(s2.tagName), c3 = u.blockElements.includes(s2.tagName.toLowerCase()), d2 = Array.from(s2.children).some(
      ({ tagName: p }) => i.includes(p) && !a3.includes(p)
    ), h3 = Array.from(s2.children).some(
      ({ tagName: p }) => u.blockElements.includes(p.toLowerCase())
    );
    if (!c3 && !l2 && !d2)
      return o2.appendChild(s2), [...t, o2];
    if (l2 && !d2 || c3 && !h3 && !d2)
      return [...t, o2, s2];
  }
  /**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */
  getNodes(e) {
    const t = Array.from(e.childNodes);
    let o2;
    const i = (s2, r) => {
      if (u.isEmpty(r) && !u.isSingleTag(r))
        return s2;
      const a3 = s2[s2.length - 1];
      let l2 = new DocumentFragment();
      switch (a3 && u.isFragment(a3) && (l2 = s2.pop()), r.nodeType) {
        case Node.ELEMENT_NODE:
          if (o2 = this.processElementNode(r, s2, l2), o2)
            return o2;
          break;
        case Node.TEXT_NODE:
          return l2.appendChild(r), [...s2, l2];
        default:
          return [...s2, l2];
      }
      return [...s2, ...Array.from(r.childNodes).reduce(i, [])];
    };
    return t.reduce(i, []);
  }
  /**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */
  composePasteEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
};
Rn.PATTERN_PROCESSING_MAX_LENGTH = 450;
var pa = Rn;
var fa = class extends E {
  constructor() {
    super(...arguments), this.toolsDontSupportReadOnly = [], this.readOnlyEnabled = false;
  }
  /**
   * Returns state of read only mode
   */
  get isEnabled() {
    return this.readOnlyEnabled;
  }
  /**
   * Set initial state
   */
  async prepare() {
    const { Tools: e } = this.Editor, { blockTools: t } = e, o2 = [];
    Array.from(t.entries()).forEach(([i, s2]) => {
      s2.isReadOnlySupported || o2.push(i);
    }), this.toolsDontSupportReadOnly = o2, this.config.readOnly && o2.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly, true);
  }
  /**
   * Set read-only mode or toggle current state
   * Call all Modules `toggleReadOnly` method and re-render Editor
   *
   * @param state - (optional) read-only state or toggle
   * @param isInitial - (optional) true when editor is initializing
   */
  async toggle(e = !this.readOnlyEnabled, t = false) {
    e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
    const o2 = this.readOnlyEnabled;
    this.readOnlyEnabled = e;
    for (const s2 in this.Editor)
      this.Editor[s2].toggleReadOnly && this.Editor[s2].toggleReadOnly(e);
    if (o2 === e)
      return this.readOnlyEnabled;
    if (t)
      return this.readOnlyEnabled;
    this.Editor.ModificationsObserver.disable();
    const i = await this.Editor.Saver.save();
    return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(i.blocks), this.Editor.ModificationsObserver.enable(), this.readOnlyEnabled;
  }
  /**
   * Throws an error about tools which don't support read-only mode
   */
  throwCriticalError() {
    throw new Ho(
      `To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`
    );
  }
};
var Be = class _Be extends E {
  constructor() {
    super(...arguments), this.isRectSelectionActivated = false, this.SCROLL_SPEED = 3, this.HEIGHT_OF_SCROLL_ZONE = 40, this.BOTTOM_SCROLL_ZONE = 1, this.TOP_SCROLL_ZONE = 2, this.MAIN_MOUSE_BUTTON = 0, this.mousedown = false, this.isScrolling = false, this.inScrollZone = null, this.startX = 0, this.startY = 0, this.mouseX = 0, this.mouseY = 0, this.stackOfSelected = [], this.listenerIds = [];
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      overlay: "codex-editor-overlay",
      overlayContainer: "codex-editor-overlay__container",
      rect: "codex-editor-overlay__rectangle",
      topScrollZone: "codex-editor-overlay__scroll-zone--top",
      bottomScrollZone: "codex-editor-overlay__scroll-zone--bottom"
    };
  }
  /**
   * Module Preparation
   * Creating rect and hang handlers
   */
  prepare() {
    this.enableModuleBindings();
  }
  /**
   * Init rect params
   *
   * @param {number} pageX - X coord of mouse
   * @param {number} pageY - Y coord of mouse
   */
  startSelection(e, t) {
    const o2 = document.elementFromPoint(e - window.pageXOffset, t - window.pageYOffset);
    o2.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = false, this.clearSelection(), this.stackOfSelected = []);
    const s2 = [
      `.${R.CSS.content}`,
      `.${this.Editor.Toolbar.CSS.toolbar}`,
      `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
    ], r = o2.closest("." + this.Editor.UI.CSS.editorWrapper), a3 = s2.some((l2) => !!o2.closest(l2));
    !r || a3 || (this.mousedown = true, this.startX = e, this.startY = t);
  }
  /**
   * Clear all params to end selection
   */
  endSelection() {
    this.mousedown = false, this.startX = 0, this.startY = 0, this.overlayRectangle.style.display = "none";
  }
  /**
   * is RectSelection Activated
   */
  isRectActivated() {
    return this.isRectSelectionActivated;
  }
  /**
   * Mark that selection is end
   */
  clearSelection() {
    this.isRectSelectionActivated = false;
  }
  /**
   * Sets Module necessary event handlers
   */
  enableModuleBindings() {
    const { container: e } = this.genHTML();
    this.listeners.on(e, "mousedown", (t) => {
      this.processMouseDown(t);
    }, false), this.listeners.on(document.body, "mousemove", dt((t) => {
      this.processMouseMove(t);
    }, 10), {
      passive: true
    }), this.listeners.on(document.body, "mouseleave", () => {
      this.processMouseLeave();
    }), this.listeners.on(window, "scroll", dt((t) => {
      this.processScroll(t);
    }, 10), {
      passive: true
    }), this.listeners.on(document.body, "mouseup", () => {
      this.processMouseUp();
    }, false);
  }
  /**
   * Handle mouse down events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseDown(e) {
    if (e.button !== this.MAIN_MOUSE_BUTTON)
      return;
    e.target.closest(u.allInputsSelector) !== null || this.startSelection(e.pageX, e.pageY);
  }
  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseMove(e) {
    this.changingRectangle(e), this.scrollByZones(e.clientY);
  }
  /**
   * Handle mouse leave
   */
  processMouseLeave() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processScroll(e) {
    this.changingRectangle(e);
  }
  /**
   * Handle mouse up
   */
  processMouseUp() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * Scroll If mouse in scroll zone
   *
   * @param {number} clientY - Y coord of mouse
   */
  scrollByZones(e) {
    if (this.inScrollZone = null, e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
      this.isScrolling = false;
      return;
    }
    this.isScrolling || (this.scrollVertical(this.inScrollZone === this.TOP_SCROLL_ZONE ? -this.SCROLL_SPEED : this.SCROLL_SPEED), this.isScrolling = true);
  }
  /**
   * Generates required HTML elements
   *
   * @returns {Object<string, Element>}
   */
  genHTML() {
    const { UI: e } = this.Editor, t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper), o2 = u.make("div", _Be.CSS.overlay, {}), i = u.make("div", _Be.CSS.overlayContainer, {}), s2 = u.make("div", _Be.CSS.rect, {});
    return i.appendChild(s2), o2.appendChild(i), t.appendChild(o2), this.overlayRectangle = s2, {
      container: t,
      overlay: o2
    };
  }
  /**
   * Activates scrolling if blockSelection is active and mouse is in scroll zone
   *
   * @param {number} speed - speed of scrolling
   */
  scrollVertical(e) {
    if (!(this.inScrollZone && this.mousedown))
      return;
    const t = window.pageYOffset;
    window.scrollBy(0, e), this.mouseY += window.pageYOffset - t, setTimeout(() => {
      this.scrollVertical(e);
    }, 0);
  }
  /**
   * Handles the change in the rectangle and its effect
   *
   * @param {MouseEvent} event - mouse event
   */
  changingRectangle(e) {
    if (!this.mousedown)
      return;
    e.pageY !== void 0 && (this.mouseX = e.pageX, this.mouseY = e.pageY);
    const { rightPos: t, leftPos: o2, index: i } = this.genInfoForMouseSelection(), s2 = this.startX > t && this.mouseX > t, r = this.startX < o2 && this.mouseX < o2;
    this.rectCrossesBlocks = !(s2 || r), this.isRectSelectionActivated || (this.rectCrossesBlocks = false, this.isRectSelectionActivated = true, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), b.get().removeAllRanges());
  }
  /**
   * Shrink rect to singular point
   */
  shrinkRectangleToPoint() {
    this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`;
  }
  /**
   * Select or unselect all of blocks in array if rect is out or in selectable area
   */
  inverseSelection() {
    const t = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
    if (this.rectCrossesBlocks && !t)
      for (const o2 of this.stackOfSelected)
        this.Editor.BlockSelection.selectBlockByIndex(o2);
    if (!this.rectCrossesBlocks && t)
      for (const o2 of this.stackOfSelected)
        this.Editor.BlockSelection.unSelectBlockByIndex(o2);
  }
  /**
   * Updates size of rectangle
   */
  updateRectangleSize() {
    this.mouseY >= this.startY ? (this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.mouseY - window.pageYOffset}px`) : (this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.top = `${this.mouseY - window.pageYOffset}px`), this.mouseX >= this.startX ? (this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.mouseX - window.pageXOffset}px`) : (this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.left = `${this.mouseX - window.pageXOffset}px`);
  }
  /**
   * Collects information needed to determine the behavior of the rectangle
   *
   * @returns {object} index - index next Block, leftPos - start of left border of Block, rightPos - right border
   */
  genInfoForMouseSelection() {
    const t = document.body.offsetWidth / 2, o2 = this.mouseY - window.pageYOffset, i = document.elementFromPoint(t, o2), s2 = this.Editor.BlockManager.getBlockByChildNode(i);
    let r;
    s2 !== void 0 && (r = this.Editor.BlockManager.blocks.findIndex((h3) => h3.holder === s2.holder));
    const a3 = this.Editor.BlockManager.lastBlock.holder.querySelector("." + R.CSS.content), l2 = Number.parseInt(window.getComputedStyle(a3).width, 10) / 2, c3 = t - l2, d2 = t + l2;
    return {
      index: r,
      leftPos: c3,
      rightPos: d2
    };
  }
  /**
   * Select block with index index
   *
   * @param index - index of block in redactor
   */
  addBlockInSelection(e) {
    this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
  }
  /**
   * Adds a block to the selection and determines which blocks should be selected
   *
   * @param {object} index - index of new block in the reactor
   */
  trySelectNextBlock(e) {
    const t = this.stackOfSelected[this.stackOfSelected.length - 1] === e, o2 = this.stackOfSelected.length, i = 1, s2 = -1, r = 0;
    if (t)
      return;
    const a3 = this.stackOfSelected[o2 - 1] - this.stackOfSelected[o2 - 2] > 0;
    let l2 = r;
    o2 > 1 && (l2 = a3 ? i : s2);
    const c3 = e > this.stackOfSelected[o2 - 1] && l2 === i, d2 = e < this.stackOfSelected[o2 - 1] && l2 === s2, p = !(c3 || d2 || l2 === r);
    if (!p && (e > this.stackOfSelected[o2 - 1] || this.stackOfSelected[o2 - 1] === void 0)) {
      let v4 = this.stackOfSelected[o2 - 1] + 1 || e;
      for (v4; v4 <= e; v4++)
        this.addBlockInSelection(v4);
      return;
    }
    if (!p && e < this.stackOfSelected[o2 - 1]) {
      for (let v4 = this.stackOfSelected[o2 - 1] - 1; v4 >= e; v4--)
        this.addBlockInSelection(v4);
      return;
    }
    if (!p)
      return;
    let g3 = o2 - 1, f3;
    for (e > this.stackOfSelected[o2 - 1] ? f3 = () => e > this.stackOfSelected[g3] : f3 = () => e < this.stackOfSelected[g3]; f3(); )
      this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[g3]), this.stackOfSelected.pop(), g3--;
  }
};
var ga = class extends E {
  /**
   * Renders passed blocks as one batch
   *
   * @param blocksData - blocks to render
   */
  async render(e) {
    return new Promise((t) => {
      const { Tools: o2, BlockManager: i } = this.Editor;
      if (e.length === 0)
        i.insert();
      else {
        const s2 = e.map(({ type: r, data: a3, tunes: l2, id: c3 }) => {
          o2.available.has(r) === false && (X(`Tool \xAB${r}\xBB is not found. Check 'tools' property at the Editor.js config.`, "warn"), a3 = this.composeStubDataForTool(r, a3, c3), r = o2.stubTool);
          let d2;
          try {
            d2 = i.composeBlock({
              id: c3,
              tool: r,
              data: a3,
              tunes: l2
            });
          } catch (h3) {
            S(`Block \xAB${r}\xBB skipped because of plugins error`, "error", {
              data: a3,
              error: h3
            }), a3 = this.composeStubDataForTool(r, a3, c3), r = o2.stubTool, d2 = i.composeBlock({
              id: c3,
              tool: r,
              data: a3,
              tunes: l2
            });
          }
          return d2;
        });
        i.insertMany(s2);
      }
      window.requestIdleCallback(() => {
        t();
      }, { timeout: 2e3 });
    });
  }
  /**
   * Create data for the Stub Tool that will be used instead of unavailable tool
   *
   * @param tool - unavailable tool name to stub
   * @param data - data of unavailable block
   * @param [id] - id of unavailable block
   */
  composeStubDataForTool(e, t, o2) {
    const { Tools: i } = this.Editor;
    let s2 = e;
    if (i.unavailable.has(e)) {
      const r = i.unavailable.get(e).toolbox;
      r !== void 0 && r[0].title !== void 0 && (s2 = r[0].title);
    }
    return {
      savedData: {
        id: o2,
        type: e,
        data: t
      },
      title: s2
    };
  }
};
var ma = class extends E {
  /**
   * Composes new chain of Promises to fire them alternatelly
   *
   * @returns {OutputData}
   */
  async save() {
    const { BlockManager: e, Tools: t } = this.Editor, o2 = e.blocks, i = [];
    try {
      o2.forEach((a3) => {
        i.push(this.getSavedData(a3));
      });
      const s2 = await Promise.all(i), r = await yt(s2, (a3) => t.blockTools.get(a3).sanitizeConfig);
      return this.makeOutput(r);
    } catch (s2) {
      X("Saving failed due to the Error %o", "error", s2);
    }
  }
  /**
   * Saves and validates
   *
   * @param {Block} block - Editor's Tool
   * @returns {ValidatedData} - Tool's validated data
   */
  async getSavedData(e) {
    const t = await e.save(), o2 = t && await e.validate(t.data);
    return {
      ...t,
      isValid: o2
    };
  }
  /**
   * Creates output object with saved data, time and version of editor
   *
   * @param {ValidatedData} allExtractedData - data extracted from Blocks
   * @returns {OutputData}
   */
  makeOutput(e) {
    const t = [];
    return e.forEach(({ id: o2, tool: i, data: s2, tunes: r, isValid: a3 }) => {
      if (!a3) {
        S(`Block \xAB${i}\xBB skipped because saved data is invalid`);
        return;
      }
      if (i === this.Editor.Tools.stubTool) {
        t.push(s2);
        return;
      }
      const l2 = {
        id: o2,
        type: i,
        data: s2,
        ...!V(r) && {
          tunes: r
        }
      };
      t.push(l2);
    }), {
      time: +/* @__PURE__ */ new Date(),
      blocks: t,
      version: "2.31.0"
    };
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-block:only-of-type .ce-paragraph[data-placeholder-active]:empty:before,.ce-block:only-of-type .ce-paragraph[data-placeholder-active][data-empty=true]:before{content:attr(data-placeholder-active)}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
var ba = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
function va(n) {
  const e = document.createElement("div");
  e.innerHTML = n.trim();
  const t = document.createDocumentFragment();
  return t.append(...Array.from(e.childNodes)), t;
}
var fo = class _fo {
  /**
   * Default placeholder for Paragraph Tool
   *
   * @returns {string}
   * @class
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {ParagraphData} params.data - previously saved data
   * @param {ParagraphConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   * @param {boolean} readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: o2, readOnly: i }) {
    this.api = o2, this.readOnly = i, this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph"
    }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : _fo.DEFAULT_PLACEHOLDER, this._data = e ?? {}, this._element = null, this._preserveBlank = t.preserveBlank ?? false;
  }
  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    if (e.code !== "Backspace" && e.code !== "Delete" || !this._element)
      return;
    const { textContent: t } = this._element;
    t === "" && (this._element.innerHTML = "");
  }
  /**
   * Create Tool's view
   *
   * @returns {HTMLDivElement}
   * @private
   */
  drawView() {
    const e = document.createElement("DIV");
    return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = "false", e.dataset.placeholderActive = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = "true", e.addEventListener("keyup", this.onKeyUp)), e;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this._element = this.drawView(), this._element;
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {ParagraphData} data
   * @public
   */
  merge(e) {
    if (!this._element)
      return;
    this._data.text += e.text;
    const t = va(e.text);
    this._element.appendChild(t), this._element.normalize();
  }
  /**
   * Validate Paragraph block data:
   * - check for emptiness
   *
   * @param {ParagraphData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return !(e.text.trim() === "" && !this._preserveBlank);
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {ParagraphData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML
    };
  }
  /**
   * On paste callback fired from Editor.
   *
   * @param {HTMLPasteEvent} event - event with pasted data
   */
  onPaste(e) {
    const t = {
      text: e.detail.data.innerHTML
    };
    this._data = t, window.requestAnimationFrame(() => {
      this._element && (this._element.innerHTML = this._data.text || "");
    });
  }
  /**
   * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
   * @returns {ConversionConfig}
   */
  static get conversionConfig() {
    return {
      export: "text",
      // to convert Paragraph to other block, use 'text' property of saved data
      import: "text"
      // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }
  /**
   * Sanitizer rules
   * @returns {SanitizerConfig} - Edtior.js sanitizer config
   */
  static get sanitize() {
    return {
      text: {
        br: true
      }
    };
  }
  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }
  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {PasteConfig} - Paragraph Paste Setting
   */
  static get pasteConfig() {
    return {
      tags: ["P"]
    };
  }
  /**
   * Icon and title for displaying at the Toolbox
   *
   * @returns {ToolboxConfig} - Paragraph Toolbox Setting
   */
  static get toolbox() {
    return {
      icon: ba,
      title: "Text"
    };
  }
};
var go = class {
  constructor() {
    this.commandName = "bold";
  }
  /**
   * Sanitizer Rule
   * Leave <b> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      b: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return {
      icon: Ki,
      name: "bold",
      onActivate: () => {
        document.execCommand(this.commandName);
      },
      isActive: () => document.queryCommandState(this.commandName)
    };
  }
  /**
   * Set a shortcut
   *
   * @returns {boolean}
   */
  get shortcut() {
    return "CMD+B";
  }
};
go.isInline = true;
go.title = "Bold";
var mo = class {
  constructor() {
    this.commandName = "italic", this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--italic"
    }, this.nodes = {
      button: null
    };
  }
  /**
   * Sanitizer Rule
   * Leave <i> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      i: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Ji, this.nodes.button;
  }
  /**
   * Wrap range with <i> tag
   */
  surround() {
    document.execCommand(this.commandName);
  }
  /**
   * Check selection and set activated state to button if there are <i> tag
   */
  checkState() {
    const e = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+I";
  }
};
mo.isInline = true;
mo.title = "Italic";
var bo = class {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.commandLink = "createLink", this.commandUnlink = "unlink", this.ENTER_KEY = 13, this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--link",
      buttonUnlink: "ce-inline-tool--unlink",
      input: "ce-inline-tool-input",
      inputShowed: "ce-inline-tool-input--showed"
    }, this.nodes = {
      button: null,
      input: null
    }, this.inputOpened = false, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new b();
  }
  /**
   * Sanitizer Rule
   * Leave <a> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      a: {
        href: true,
        target: "_blank",
        rel: "nofollow"
      }
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Co, this.nodes.button;
  }
  /**
   * Input for the link
   */
  renderActions() {
    return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.enterKeyHint = "done", this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", (e) => {
      e.keyCode === this.ENTER_KEY && this.enterPressed(e);
    }), this.nodes.input;
  }
  /**
   * Handle clicks on the Inline Toolbar icon
   *
   * @param {Range} range - range to wrap with link
   */
  surround(e) {
    if (e) {
      this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
      const t = this.selection.findParentTag("A");
      if (t) {
        this.selection.expandToTag(t), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close();
        return;
      }
    }
    this.toggleActions();
  }
  /**
   * Check selection and set activated state to button if there are <a> tag
   */
  checkState() {
    const e = this.selection.findParentTag("A");
    if (e) {
      this.nodes.button.innerHTML = ns, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
      const t = e.getAttribute("href");
      this.nodes.input.value = t !== "null" ? t : "", this.selection.save();
    } else
      this.nodes.button.innerHTML = Co, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
    return !!e;
  }
  /**
   * Function called with Inline Toolbar closing
   */
  clear() {
    this.closeActions();
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+K";
  }
  /**
   * Show/close link input
   */
  toggleActions() {
    this.inputOpened ? this.closeActions(false) : this.openActions(true);
  }
  /**
   * @param {boolean} needFocus - on link creation we need to focus input. On editing - nope.
   */
  openActions(e = false) {
    this.nodes.input.classList.add(this.CSS.inputShowed), e && this.nodes.input.focus(), this.inputOpened = true;
  }
  /**
   * Close input
   *
   * @param {boolean} clearSavedSelection — we don't need to clear saved selection
   *                                        on toggle-clicks on the icon of opened Toolbar
   */
  closeActions(e = true) {
    if (this.selection.isFakeBackgroundEnabled) {
      const t = new b();
      t.save(), this.selection.restore(), this.selection.removeFakeBackground(), t.restore();
    }
    this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", e && this.selection.clearSaved(), this.inputOpened = false;
  }
  /**
   * Enter pressed on input
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  enterPressed(e) {
    let t = this.nodes.input.value || "";
    if (!t.trim()) {
      this.selection.restore(), this.unlink(), e.preventDefault(), this.closeActions();
      return;
    }
    if (!this.validateURL(t)) {
      this.notifier.show({
        message: "Pasted link is not valid.",
        style: "error"
      }), S("Incorrect Link pasted", "warn", t);
      return;
    }
    t = this.prepareLink(t), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(t), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
  }
  /**
   * Detects if passed string is URL
   *
   * @param {string} str - string to validate
   * @returns {boolean}
   */
  validateURL(e) {
    return !/\s/.test(e);
  }
  /**
   * Process link before injection
   * - sanitize
   * - add protocol for links like 'google.com'
   *
   * @param {string} link - raw user input
   */
  prepareLink(e) {
    return e = e.trim(), e = this.addProtocol(e), e;
  }
  /**
   * Add 'http' protocol to the links like 'vc.ru', 'google.com'
   *
   * @param {string} link - string to process
   */
  addProtocol(e) {
    if (/^(\w+):(\/\/)?/.test(e))
      return e;
    const t = /^\/[^/\s]/.test(e), o2 = e.substring(0, 1) === "#", i = /^\/\/[^/\s]/.test(e);
    return !t && !o2 && !i && (e = "http://" + e), e;
  }
  /**
   * Inserts <a> tag with "href"
   *
   * @param {string} link - "href" value
   */
  insertLink(e) {
    const t = this.selection.findParentTag("A");
    t && this.selection.expandToTag(t), document.execCommand(this.commandLink, false, e);
  }
  /**
   * Removes <a> tag
   */
  unlink() {
    document.execCommand(this.commandUnlink);
  }
};
bo.isInline = true;
bo.title = "Link";
var Fn = class {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.i18nAPI = e.i18n, this.blocksAPI = e.blocks, this.selectionAPI = e.selection, this.toolsAPI = e.tools, this.caretAPI = e.caret;
  }
  /**
   * Returns tool's UI config
   */
  async render() {
    const e = b.get(), t = this.blocksAPI.getBlockByElement(e.anchorNode);
    if (t === void 0)
      return [];
    const o2 = this.toolsAPI.getBlockTools(), i = await Yo(t, o2);
    if (i.length === 0)
      return [];
    const s2 = i.reduce((c3, d2) => {
      var h3;
      return (h3 = d2.toolbox) == null || h3.forEach((p) => {
        c3.push({
          icon: p.icon,
          title: z.t(K.toolNames, p.title),
          name: d2.name,
          closeOnActivate: true,
          onActivate: async () => {
            const g3 = await this.blocksAPI.convert(t.id, d2.name, p.data);
            this.caretAPI.setToBlock(g3, "end");
          }
        });
      }), c3;
    }, []), r = await t.getActiveToolboxEntry(), a3 = r !== void 0 ? r.icon : Go, l2 = !be();
    return {
      icon: a3,
      name: "convert-to",
      hint: {
        title: this.i18nAPI.t("Convert to")
      },
      children: {
        searchable: l2,
        items: s2,
        onOpen: () => {
          l2 && (this.selectionAPI.setFakeBackground(), this.selectionAPI.save());
        },
        onClose: () => {
          l2 && (this.selectionAPI.restore(), this.selectionAPI.removeFakeBackground());
        }
      }
    };
  }
};
Fn.isInline = true;
var jn = class {
  /**
   * @param options - constructor options
   * @param options.data - stub tool data
   * @param options.api - Editor.js API
   */
  constructor({ data: e, api: t }) {
    this.CSS = {
      wrapper: "ce-stub",
      info: "ce-stub__info",
      title: "ce-stub__title",
      subtitle: "ce-stub__subtitle"
    }, this.api = t, this.title = e.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = e.savedData, this.wrapper = this.make();
  }
  /**
   * Returns stub holder
   *
   * @returns {HTMLElement}
   */
  render() {
    return this.wrapper;
  }
  /**
   * Return original Tool data
   *
   * @returns {BlockToolData}
   */
  save() {
    return this.savedData;
  }
  /**
   * Create Tool html markup
   *
   * @returns {HTMLElement}
   */
  make() {
    const e = u.make("div", this.CSS.wrapper), t = is, o2 = u.make("div", this.CSS.info), i = u.make("div", this.CSS.title, {
      textContent: this.title
    }), s2 = u.make("div", this.CSS.subtitle, {
      textContent: this.subtitle
    });
    return e.innerHTML = t, o2.appendChild(i), o2.appendChild(s2), e.appendChild(o2), e;
  }
};
jn.isReadOnlySupported = true;
var ka = class extends Tt {
  constructor() {
    super(...arguments), this.type = ae.Inline;
  }
  /**
   * Returns title for Inline Tool if specified by user
   */
  get title() {
    return this.constructable[We.Title];
  }
  /**
   * Constructs new InlineTool instance from constructable
   */
  create() {
    return new this.constructable({
      api: this.api,
      config: this.settings
    });
  }
  /**
   * Allows inline tool to be available in read-only mode
   * Can be used, for example, by comments tool
   */
  get isReadOnlySupported() {
    return this.constructable[We.IsReadOnlySupported] ?? false;
  }
};
var ya = class extends Tt {
  constructor() {
    super(...arguments), this.type = ae.Tune;
  }
  /**
   * Constructs new BlockTune instance from constructable
   *
   * @param data - Tune data
   * @param block - Block API object
   */
  create(e, t) {
    return new this.constructable({
      api: this.api,
      config: this.settings,
      block: t,
      data: e
    });
  }
};
var j = class _j extends Map {
  /**
   * Returns Block Tools collection
   */
  get blockTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isBlock());
    return new _j(e);
  }
  /**
   * Returns Inline Tools collection
   */
  get inlineTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInline());
    return new _j(e);
  }
  /**
   * Returns Block Tunes collection
   */
  get blockTunes() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isTune());
    return new _j(e);
  }
  /**
   * Returns internal Tools collection
   */
  get internalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInternal);
    return new _j(e);
  }
  /**
   * Returns Tools collection provided by user
   */
  get externalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => !t.isInternal);
    return new _j(e);
  }
};
var wa = Object.defineProperty;
var Ea = Object.getOwnPropertyDescriptor;
var Hn = (n, e, t, o2) => {
  for (var i = o2 > 1 ? void 0 : o2 ? Ea(e, t) : e, s2 = n.length - 1, r; s2 >= 0; s2--)
    (r = n[s2]) && (i = (o2 ? r(e, t, i) : r(i)) || i);
  return o2 && i && wa(e, t, i), i;
};
var vo = class extends Tt {
  constructor() {
    super(...arguments), this.type = ae.Block, this.inlineTools = new j(), this.tunes = new j();
  }
  /**
   * Creates new Tool instance
   *
   * @param data - Tool data
   * @param block - BlockAPI for current Block
   * @param readOnly - True if Editor is in read-only mode
   */
  create(e, t, o2) {
    return new this.constructable({
      data: e,
      block: t,
      readOnly: o2,
      api: this.api,
      config: this.settings
    });
  }
  /**
   * Returns true if read-only mode is supported by Tool
   */
  get isReadOnlySupported() {
    return this.constructable[pe.IsReadOnlySupported] === true;
  }
  /**
   * Returns true if Tool supports linebreaks
   */
  get isLineBreaksEnabled() {
    return this.constructable[pe.IsEnabledLineBreaks];
  }
  /**
   * Returns Tool toolbox configuration (internal or user-specified).
   *
   * Merges internal and user-defined toolbox configs based on the following rules:
   *
   * - If both internal and user-defined toolbox configs are arrays their items are merged.
   * Length of the second one is kept.
   *
   * - If both are objects their properties are merged.
   *
   * - If one is an object and another is an array than internal config is replaced with user-defined
   * config. This is made to allow user to override default tool's toolbox representation (single/multiple entries)
   */
  get toolbox() {
    const e = this.constructable[pe.Toolbox], t = this.config[Pe.Toolbox];
    if (!V(e) && t !== false)
      return t ? Array.isArray(e) ? Array.isArray(t) ? t.map((o2, i) => {
        const s2 = e[i];
        return s2 ? {
          ...s2,
          ...o2
        } : o2;
      }) : [t] : Array.isArray(t) ? t : [
        {
          ...e,
          ...t
        }
      ] : Array.isArray(e) ? e : [e];
  }
  /**
   * Returns Tool conversion configuration
   */
  get conversionConfig() {
    return this.constructable[pe.ConversionConfig];
  }
  /**
   * Returns enabled inline tools for Tool
   */
  get enabledInlineTools() {
    return this.config[Pe.EnabledInlineTools] || false;
  }
  /**
   * Returns enabled tunes for Tool
   */
  get enabledBlockTunes() {
    return this.config[Pe.EnabledBlockTunes];
  }
  /**
   * Returns Tool paste configuration
   */
  get pasteConfig() {
    return this.constructable[pe.PasteConfig] ?? {};
  }
  get sanitizeConfig() {
    const e = super.sanitizeConfig, t = this.baseSanitizeConfig;
    if (V(e))
      return t;
    const o2 = {};
    for (const i in e)
      if (Object.prototype.hasOwnProperty.call(e, i)) {
        const s2 = e[i];
        D(s2) ? o2[i] = Object.assign({}, t, s2) : o2[i] = s2;
      }
    return o2;
  }
  get baseSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), Array.from(this.tunes.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), e;
  }
};
Hn([
  me
], vo.prototype, "sanitizeConfig", 1);
Hn([
  me
], vo.prototype, "baseSanitizeConfig", 1);
var xa = class {
  /**
   * @class
   * @param config - tools config
   * @param editorConfig - EditorJS config
   * @param api - EditorJS API module
   */
  constructor(e, t, o2) {
    this.api = o2, this.config = e, this.editorConfig = t;
  }
  /**
   * Returns Tool object based on it's type
   *
   * @param name - tool name
   */
  get(e) {
    const { class: t, isInternal: o2 = false, ...i } = this.config[e], s2 = this.getConstructor(t), r = t[mt.IsTune];
    return new s2({
      name: e,
      constructable: t,
      config: i,
      api: this.api.getMethodsForTool(e, r),
      isDefault: e === this.editorConfig.defaultBlock,
      defaultPlaceholder: this.editorConfig.placeholder,
      isInternal: o2
    });
  }
  /**
   * Find appropriate Tool object constructor for Tool constructable
   *
   * @param constructable - Tools constructable
   */
  getConstructor(e) {
    switch (true) {
      case e[We.IsInline]:
        return ka;
      case e[mt.IsTune]:
        return ya;
      default:
        return vo;
    }
  }
};
var $n = class {
  /**
   * MoveDownTune constructor
   *
   * @param {API} api — Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Xi,
      title: this.api.i18n.t("Move down"),
      onActivate: () => this.handleClick(),
      name: "move-down"
    };
  }
  /**
   * Handle clicks on 'move down' button
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e + 1);
    if (!t)
      throw new Error("Unable to move Block down since it is already the last");
    const o2 = t.holder, i = o2.getBoundingClientRect();
    let s2 = Math.abs(window.innerHeight - o2.offsetHeight);
    i.top < window.innerHeight && (s2 = window.scrollY + o2.offsetHeight), window.scrollTo(0, s2), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(true);
  }
};
$n.isTune = true;
var zn = class {
  /**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Gi,
      title: this.api.i18n.t("Delete"),
      name: "delete",
      confirmation: {
        title: this.api.i18n.t("Click to delete"),
        onActivate: () => this.handleClick()
      }
    };
  }
  /**
   * Delete block conditions passed
   */
  handleClick() {
    this.api.blocks.delete();
  }
};
zn.isTune = true;
var Un = class {
  /**
   * MoveUpTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Zi,
      title: this.api.i18n.t("Move up"),
      onActivate: () => this.handleClick(),
      name: "move-up"
    };
  }
  /**
   * Move current block up
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e), o2 = this.api.blocks.getBlockByIndex(e - 1);
    if (e === 0 || !t || !o2)
      throw new Error("Unable to move Block up since it is already the first");
    const i = t.holder, s2 = o2.holder, r = i.getBoundingClientRect(), a3 = s2.getBoundingClientRect();
    let l2;
    a3.top > 0 ? l2 = Math.abs(r.top) - Math.abs(a3.top) : l2 = Math.abs(r.top) + a3.height, window.scrollBy(0, -1 * l2), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(true);
  }
};
Un.isTune = true;
var Ba = Object.defineProperty;
var Ca = Object.getOwnPropertyDescriptor;
var Ta = (n, e, t, o2) => {
  for (var i = o2 > 1 ? void 0 : o2 ? Ca(e, t) : e, s2 = n.length - 1, r; s2 >= 0; s2--)
    (r = n[s2]) && (i = (o2 ? r(e, t, i) : r(i)) || i);
  return o2 && i && Ba(e, t, i), i;
};
var Wn = class extends E {
  constructor() {
    super(...arguments), this.stubTool = "stub", this.toolsAvailable = new j(), this.toolsUnavailable = new j();
  }
  /**
   * Returns available Tools
   */
  get available() {
    return this.toolsAvailable;
  }
  /**
   * Returns unavailable Tools
   */
  get unavailable() {
    return this.toolsUnavailable;
  }
  /**
   * Return Tools for the Inline Toolbar
   */
  get inlineTools() {
    return this.available.inlineTools;
  }
  /**
   * Return editor block tools
   */
  get blockTools() {
    return this.available.blockTools;
  }
  /**
   * Return available Block Tunes
   *
   * @returns {object} - object of Inline Tool's classes
   */
  get blockTunes() {
    return this.available.blockTunes;
  }
  /**
   * Returns default Tool object
   */
  get defaultTool() {
    return this.blockTools.get(this.config.defaultBlock);
  }
  /**
   * Returns internal tools
   */
  get internal() {
    return this.available.internalTools;
  }
  /**
   * Creates instances via passed or default configuration
   *
   * @returns {Promise<void>}
   */
  async prepare() {
    if (this.validateTools(), this.config.tools = ut({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0)
      throw Error("Can't start without tools");
    const e = this.prepareConfig();
    this.factory = new xa(e, this.config, this.Editor.API);
    const t = this.getListOfPrepareFunctions(e);
    if (t.length === 0)
      return Promise.resolve();
    await Qn(t, (o2) => {
      this.toolPrepareMethodSuccess(o2);
    }, (o2) => {
      this.toolPrepareMethodFallback(o2);
    }), this.prepareBlockTools();
  }
  getAllInlineToolsSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => {
      Object.assign(e, t.sanitizeConfig);
    }), e;
  }
  /**
   * Calls each Tool reset method to clean up anything set by Tool
   */
  destroy() {
    Object.values(this.available).forEach(async (e) => {
      A(e.reset) && await e.reset();
    });
  }
  /**
   * Returns internal tools
   * Includes Bold, Italic, Link and Paragraph
   */
  get internalTools() {
    return {
      convertTo: {
        class: Fn,
        isInternal: true
      },
      link: {
        class: bo,
        isInternal: true
      },
      bold: {
        class: go,
        isInternal: true
      },
      italic: {
        class: mo,
        isInternal: true
      },
      paragraph: {
        class: fo,
        inlineToolbar: true,
        isInternal: true
      },
      stub: {
        class: jn,
        isInternal: true
      },
      moveUp: {
        class: Un,
        isInternal: true
      },
      delete: {
        class: zn,
        isInternal: true
      },
      moveDown: {
        class: $n,
        isInternal: true
      }
    };
  }
  /**
   * Tool prepare method success callback
   *
   * @param {object} data - append tool to available list
   */
  toolPrepareMethodSuccess(e) {
    const t = this.factory.get(e.toolName);
    if (t.isInline()) {
      const i = ["render"].filter((s2) => !t.create()[s2]);
      if (i.length) {
        S(
          `Incorrect Inline Tool: ${t.name}. Some of required methods is not implemented %o`,
          "warn",
          i
        ), this.toolsUnavailable.set(t.name, t);
        return;
      }
    }
    this.toolsAvailable.set(t.name, t);
  }
  /**
   * Tool prepare method fail callback
   *
   * @param {object} data - append tool to unavailable list
   */
  toolPrepareMethodFallback(e) {
    this.toolsUnavailable.set(e.toolName, this.factory.get(e.toolName));
  }
  /**
   * Binds prepare function of plugins with user or default config
   *
   * @returns {Array} list of functions that needs to be fired sequentially
   * @param config - tools config
   */
  getListOfPrepareFunctions(e) {
    const t = [];
    return Object.entries(e).forEach(([o2, i]) => {
      t.push({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function: A(i.class.prepare) ? i.class.prepare : () => {
        },
        data: {
          toolName: o2,
          config: i.config
        }
      });
    }), t;
  }
  /**
   * Assign enabled Inline Tools and Block Tunes for Block Tool
   */
  prepareBlockTools() {
    Array.from(this.blockTools.values()).forEach((e) => {
      this.assignInlineToolsToBlockTool(e), this.assignBlockTunesToBlockTool(e);
    });
  }
  /**
   * Assign enabled Inline Tools for Block Tool
   *
   * @param tool - Block Tool
   */
  assignInlineToolsToBlockTool(e) {
    if (this.config.inlineToolbar !== false) {
      if (e.enabledInlineTools === true) {
        e.inlineTools = new j(
          Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((t) => [t, this.inlineTools.get(t)]) : Array.from(this.inlineTools.entries())
        );
        return;
      }
      Array.isArray(e.enabledInlineTools) && (e.inlineTools = new j(
        /** Prepend ConvertTo Inline Tool */
        ["convertTo", ...e.enabledInlineTools].map((t) => [t, this.inlineTools.get(t)])
      ));
    }
  }
  /**
   * Assign enabled Block Tunes for Block Tool
   *
   * @param tool — Block Tool
   */
  assignBlockTunesToBlockTool(e) {
    if (e.enabledBlockTunes !== false) {
      if (Array.isArray(e.enabledBlockTunes)) {
        const t = new j(
          e.enabledBlockTunes.map((o2) => [o2, this.blockTunes.get(o2)])
        );
        e.tunes = new j([...t, ...this.blockTunes.internalTools]);
        return;
      }
      if (Array.isArray(this.config.tunes)) {
        const t = new j(
          this.config.tunes.map((o2) => [o2, this.blockTunes.get(o2)])
        );
        e.tunes = new j([...t, ...this.blockTunes.internalTools]);
        return;
      }
      e.tunes = this.blockTunes.internalTools;
    }
  }
  /**
   * Validate Tools configuration objects and throw Error for user if it is invalid
   */
  validateTools() {
    for (const e in this.config.tools)
      if (Object.prototype.hasOwnProperty.call(this.config.tools, e)) {
        if (e in this.internalTools)
          return;
        const t = this.config.tools[e];
        if (!A(t) && !A(t.class))
          throw Error(
            `Tool \xAB${e}\xBB must be a constructor function or an object with function in the \xABclass\xBB property`
          );
      }
  }
  /**
   * Unify tools config
   */
  prepareConfig() {
    const e = {};
    for (const t in this.config.tools)
      D(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = { class: this.config.tools[t] };
    return e;
  }
};
Ta([
  me
], Wn.prototype, "getAllInlineToolsSanitizeConfig", 1);
var Sa = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}.codex-editor ::-moz-selection{background-color:#d4ecff}.codex-editor ::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;--color-background-icon-active: rgba(56, 138, 229, .1);--color-text-icon-active: #388AE5;--color-text-primary: black;position:absolute;visibility:hidden;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;will-change:opacity,left,top;top:0;left:0;z-index:3;opacity:1;visibility:visible}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{color:var(--color-text-primary);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:0;border-radius:4px;line-height:normal;height:100%;padding:0;width:28px;background-color:transparent;cursor:pointer}@media (max-width: 650px){.ce-inline-tool{width:36px;height:36px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#f8f8f8}}.ce-inline-tool svg{display:block;width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:4px 8px;font-size:14px;line-height:22px;outline:none;margin:0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-inline-tool--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:12px 18px;margin:10px 0;border-radius:10px;background:#eff2f5;border:1px solid #EFF0F1;color:#707684;font-size:14px}.ce-stub svg{width:20px;height:20px}.ce-stub__info{margin-left:14px}.ce-stub__title{font-weight:500;text-transform:capitalize}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #EFF0F1;--color-shadow: rgba(13, 20, 33, .1);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #F8F8F8;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;--popover-top: calc(100% + var(--offset-from-target));--popover-left: 0;--nested-popover-overlap: 4px;--icon-size: 20px;--item-padding: 3px;--item-height: calc(var(--icon-size) + 2 * var(--item-padding))}.ce-popover__container{min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:var(--popover-left);top:var(--popover-top);background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened>.ce-popover__container{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened>.ce-popover__container{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover--open-top .ce-popover__container{--popover-top: calc(-1 * (var(--offset-from-target) + var(--popover-height)))}.ce-popover--open-left .ce-popover__container{--popover-left: calc(-1 * var(--width) + 100%)}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}@media (max-width: 650px){.ce-popover .ce-popover__container{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}}.ce-popover__search{margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover--nested .ce-popover__container{--popover-left: calc(var(--nesting-level) * (var(--width) - var(--nested-popover-overlap)));top:calc(var(--trigger-item-top) - var(--nested-popover-overlap));position:absolute}.ce-popover--open-top.ce-popover--nested .ce-popover__container{top:calc(var(--trigger-item-top) - var(--popover-height) + var(--item-height) + var(--offset-from-target) + var(--nested-popover-overlap))}.ce-popover--open-left .ce-popover--nested .ce-popover__container{--popover-left: calc(-1 * (var(--nesting-level) + 1) * var(--width) + 100%)}.ce-popover-item-separator{padding:4px 3px}.ce-popover-item-separator--hidden{display:none}.ce-popover-item-separator__line{height:1px;background:var(--color-border);width:100%}.ce-popover-item-html--hidden{display:none}.ce-popover-item{--border-radius: 6px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:var(--item-padding);color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;background:transparent}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover-item__icon--tool{margin-right:4px}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:auto}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title,.ce-popover-item--confirmation .ce-popover-item__icon{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.ce-popover-header{margin-bottom:8px;margin-top:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover-header__text{font-size:18px;font-weight:600}.ce-popover-header__back-button{border:0;background:transparent;width:36px;height:36px;color:var(--color-text-primary)}.ce-popover-header__back-button svg{display:block;width:28px;height:28px}.ce-popover--inline{--height: 38px;--height-mobile: 46px;--container-padding: 4px;position:relative}.ce-popover--inline .ce-popover__custom-content{margin-bottom:0}.ce-popover--inline .ce-popover__items{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-popover--inline .ce-popover__container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:var(--container-padding);height:var(--height);top:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:-webkit-max-content;width:-moz-max-content;width:max-content;-webkit-animation:none;animation:none}@media (max-width: 650px){.ce-popover--inline .ce-popover__container{height:var(--height-mobile);position:absolute}}.ce-popover--inline .ce-popover-item-separator{padding:0 4px}.ce-popover--inline .ce-popover-item-separator__line{height:100%;width:1px}.ce-popover--inline .ce-popover-item{border-radius:4px;padding:4px}.ce-popover--inline .ce-popover-item__icon--tool{-webkit-box-shadow:none;box-shadow:none;background:transparent;margin-right:0}.ce-popover--inline .ce-popover-item__icon{width:auto;width:initial;height:auto;height:initial}.ce-popover--inline .ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover--inline .ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover--inline .ce-popover-item:not(:last-of-type){margin-bottom:0;margin-bottom:initial}.ce-popover--inline .ce-popover-item-html{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover--inline .ce-popover-item__icon--chevron-right{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{--offset: 3px;left:0;top:calc(var(--height) + var(--offset))}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{top:calc(var(--height-mobile) + var(--offset))}}.ce-popover--inline .ce-popover--nested .ce-popover__container{min-width:var(--width);width:var(--width);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding:6px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ce-popover--inline .ce-popover--nested .ce-popover__items{display:block;width:100%}.ce-popover--inline .ce-popover--nested .ce-popover-item{border-radius:6px;padding:3px}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested .ce-popover-item{padding:4px}}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon--tool{margin-right:4px}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon{width:26px;height:26px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator{padding:4px 3px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator__line{width:100%;height:1px}.codex-editor [data-placeholder]:empty:before,.codex-editor [data-placeholder][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text;content:attr(data-placeholder)}.codex-editor [data-placeholder-active]:empty:before,.codex-editor [data-placeholder-active][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text}.codex-editor [data-placeholder-active]:empty:focus:before,.codex-editor [data-placeholder-active][data-empty=true]:focus:before{content:attr(data-placeholder-active)}
`;
var Ia = class extends E {
  constructor() {
    super(...arguments), this.isMobile = false, this.contentRectCache = null, this.resizeDebouncer = Eo(() => {
      this.windowResize();
    }, 200), this.selectionChangeDebounced = Eo(() => {
      this.selectionChanged();
    }, da), this.documentTouchedListener = (e) => {
      this.documentTouched(e);
    };
  }
  /**
   * Editor.js UI CSS class names
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorWrapperNarrow: "codex-editor--narrow",
      editorZone: "codex-editor__redactor",
      editorZoneHidden: "codex-editor__redactor--hidden",
      editorEmpty: "codex-editor--empty",
      editorRtlFix: "codex-editor--rtl"
    };
  }
  /**
   * Return Width of center column of Editor
   *
   * @returns {DOMRect}
   */
  get contentRect() {
    if (this.contentRectCache !== null)
      return this.contentRectCache;
    const e = this.nodes.wrapper.querySelector(`.${R.CSS.content}`);
    return e ? (this.contentRectCache = e.getBoundingClientRect(), this.contentRectCache) : {
      width: 650,
      left: 0,
      right: 0
    };
  }
  /**
   * Making main interface
   */
  async prepare() {
    this.setIsMobile(), this.make(), this.loadStyles();
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - removes all listeners from main UI module elements
   *
   * if readOnly is false:
   *  - enables all listeners to UI module elements
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.unbindReadOnlySensitiveListeners() : window.requestIdleCallback(() => {
      this.bindReadOnlySensitiveListeners();
    }, {
      timeout: 2e3
    });
  }
  /**
   * Check if Editor is empty and set CSS class to wrapper
   */
  checkEmptiness() {
    const { BlockManager: e } = this.Editor;
    this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, e.isEditorEmpty);
  }
  /**
   * Check if one of Toolbar is opened
   * Used to prevent global keydowns (for example, Enter) conflicts with Enter-on-toolbar
   *
   * @returns {boolean}
   */
  get someToolbarOpened() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: o2 } = this.Editor;
    return !!(t.opened || o2.opened || e.toolbox.opened);
  }
  /**
   * Check for some Flipper-buttons is under focus
   */
  get someFlipperButtonFocused() {
    return this.Editor.Toolbar.toolbox.hasFocus() ? true : Object.entries(this.Editor).filter(([e, t]) => t.flipper instanceof ce).some(([e, t]) => t.flipper.hasFocus());
  }
  /**
   * Clean editor`s UI
   */
  destroy() {
    this.nodes.holder.innerHTML = "", this.unbindReadOnlyInsensitiveListeners();
  }
  /**
   * Close all Editor's toolbars
   */
  closeAllToolbars() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: o2 } = this.Editor;
    t.close(), o2.close(), e.toolbox.close();
  }
  /**
   * Check for mobile mode and save the result
   */
  setIsMobile() {
    const e = window.innerWidth < Ro;
    e !== this.isMobile && this.eventsDispatcher.emit(Te, {
      isEnabled: this.isMobile
    }), this.isMobile = e;
  }
  /**
   * Makes Editor.js interface
   */
  make() {
    this.nodes.holder = u.getHolder(this.config.holder), this.nodes.wrapper = u.make("div", [
      this.CSS.editorWrapper,
      ...this.isRtl ? [this.CSS.editorRtlFix] : []
    ]), this.nodes.redactor = u.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper), this.bindReadOnlyInsensitiveListeners();
  }
  /**
   * Appends CSS
   */
  loadStyles() {
    const e = "editor-js-styles";
    if (u.get(e))
      return;
    const t = u.make("style", null, {
      id: e,
      textContent: Sa.toString()
    });
    this.config.style && !V(this.config.style) && this.config.style.nonce && t.setAttribute("nonce", this.config.style.nonce), u.prepend(document.head, t);
  }
  /**
   * Adds listeners that should work both in read-only and read-write modes
   */
  bindReadOnlyInsensitiveListeners() {
    this.listeners.on(document, "selectionchange", this.selectionChangeDebounced), this.listeners.on(window, "resize", this.resizeDebouncer, {
      passive: true
    }), this.listeners.on(this.nodes.redactor, "mousedown", this.documentTouchedListener, {
      capture: true,
      passive: true
    }), this.listeners.on(this.nodes.redactor, "touchstart", this.documentTouchedListener, {
      capture: true,
      passive: true
    });
  }
  /**
   * Removes listeners that should work both in read-only and read-write modes
   */
  unbindReadOnlyInsensitiveListeners() {
    this.listeners.off(document, "selectionchange", this.selectionChangeDebounced), this.listeners.off(window, "resize", this.resizeDebouncer), this.listeners.off(this.nodes.redactor, "mousedown", this.documentTouchedListener), this.listeners.off(this.nodes.redactor, "touchstart", this.documentTouchedListener);
  }
  /**
   * Adds listeners that should work only in read-only mode
   */
  bindReadOnlySensitiveListeners() {
    this.readOnlyMutableListeners.on(this.nodes.redactor, "click", (e) => {
      this.redactorClicked(e);
    }, false), this.readOnlyMutableListeners.on(document, "keydown", (e) => {
      this.documentKeydown(e);
    }, true), this.readOnlyMutableListeners.on(document, "mousedown", (e) => {
      this.documentClicked(e);
    }, true), this.watchBlockHoveredEvents(), this.enableInputsEmptyMark();
  }
  /**
   * Listen redactor mousemove to emit 'block-hovered' event
   */
  watchBlockHoveredEvents() {
    let e;
    this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", dt((t) => {
      const o2 = t.target.closest(".ce-block");
      this.Editor.BlockSelection.anyBlockSelected || o2 && e !== o2 && (e = o2, this.eventsDispatcher.emit(ln, {
        block: this.Editor.BlockManager.getBlockByChildNode(o2)
      }));
    }, 20), {
      passive: true
    });
  }
  /**
   * Unbind events that should work only in read-only mode
   */
  unbindReadOnlySensitiveListeners() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Resize window handler
   */
  windowResize() {
    this.contentRectCache = null, this.setIsMobile();
  }
  /**
   * All keydowns on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  documentKeydown(e) {
    switch (e.keyCode) {
      case y.ENTER:
        this.enterPressed(e);
        break;
      case y.BACKSPACE:
      case y.DELETE:
        this.backspacePressed(e);
        break;
      case y.ESC:
        this.escapePressed(e);
        break;
      default:
        this.defaultBehaviour(e);
        break;
    }
  }
  /**
   * Ignore all other document's keydown events
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  defaultBehaviour(e) {
    const { currentBlock: t } = this.Editor.BlockManager, o2 = e.target.closest(`.${this.CSS.editorWrapper}`), i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    if (t !== void 0 && o2 === null) {
      this.Editor.BlockEvents.keydown(e);
      return;
    }
    o2 || t && i || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
  }
  /**
   * @param {KeyboardEvent} event - keyboard event
   */
  backspacePressed(e) {
    const { BlockManager: t, BlockSelection: o2, Caret: i } = this.Editor;
    if (o2.anyBlockSelected && !b.isSelectionExists) {
      const s2 = t.removeSelectedBlocks(), r = t.insertDefaultBlockAtIndex(s2, true);
      i.setToBlock(r, i.positions.START), o2.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }
  }
  /**
   * Escape pressed
   * If some of Toolbar components are opened, then close it otherwise close Toolbar
   *
   * @param {Event} event - escape keydown event
   */
  escapePressed(e) {
    this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
  }
  /**
   * Enter pressed on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  enterPressed(e) {
    const { BlockManager: t, BlockSelection: o2 } = this.Editor;
    if (this.someToolbarOpened)
      return;
    const i = t.currentBlockIndex >= 0;
    if (o2.anyBlockSelected && !b.isSelectionExists) {
      o2.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
      return;
    }
    if (!this.someToolbarOpened && i && e.target.tagName === "BODY") {
      const s2 = this.Editor.BlockManager.insert();
      e.preventDefault(), this.Editor.Caret.setToBlock(s2), this.Editor.Toolbar.moveAndOpen(s2);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * All clicks on document
   *
   * @param {MouseEvent} event - Click event
   */
  documentClicked(e) {
    var a3, l2;
    if (!e.isTrusted)
      return;
    const t = e.target;
    this.nodes.holder.contains(t) || b.isAtEditor || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
    const i = (a3 = this.Editor.BlockSettings.nodes.wrapper) == null ? void 0 : a3.contains(t), s2 = (l2 = this.Editor.Toolbar.nodes.settingsToggler) == null ? void 0 : l2.contains(t), r = i || s2;
    if (this.Editor.BlockSettings.opened && !r) {
      this.Editor.BlockSettings.close();
      const c3 = this.Editor.BlockManager.getBlockByChildNode(t);
      this.Editor.Toolbar.moveAndOpen(c3);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * First touch on editor
   * Fired before click
   *
   * Used to change current block — we need to do it before 'selectionChange' event.
   * Also:
   * - Move and show the Toolbar
   * - Set a Caret
   *
   * @param event - touch or mouse event
   */
  documentTouched(e) {
    let t = e.target;
    if (t === this.nodes.redactor) {
      const o2 = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, i = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      t = document.elementFromPoint(o2, i);
    }
    try {
      this.Editor.BlockManager.setCurrentBlockByChildNode(t);
    } catch {
      this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
    }
    this.Editor.ReadOnly.isEnabled || this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * All clicks on the redactor zone
   *
   * @param {MouseEvent} event - click event
   * @description
   * - By clicks on the Editor's bottom zone:
   *      - if last Block is empty, set a Caret to this
   *      - otherwise, add a new empty Block and set a Caret to that
   */
  redactorClicked(e) {
    if (!b.isCollapsed)
      return;
    const t = e.target, o2 = e.metaKey || e.ctrlKey;
    if (u.isAnchor(t) && o2) {
      e.stopImmediatePropagation(), e.stopPropagation();
      const i = t.getAttribute("href"), s2 = oi(i);
      ii(s2);
      return;
    }
    this.processBottomZoneClick(e);
  }
  /**
   * Check if user clicks on the Editor's bottom zone:
   *  - set caret to the last block
   *  - or add new empty block
   *
   * @param event - click event
   */
  processBottomZoneClick(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(-1), o2 = u.offset(t.holder).bottom, i = e.pageY, { BlockSelection: s2 } = this.Editor;
    if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && /**
    * If there is cross block selection started, target will be equal to redactor so we need additional check
    */
    !s2.anyBlockSelected && /**
    * Prevent caret jumping (to last block) when clicking between blocks
    */
    o2 < i) {
      e.stopImmediatePropagation(), e.stopPropagation();
      const { BlockManager: a3, Caret: l2, Toolbar: c3 } = this.Editor;
      (!a3.lastBlock.tool.isDefault || !a3.lastBlock.isEmpty) && a3.insertAtEnd(), l2.setToTheLastBlock(), c3.moveAndOpen(a3.lastBlock);
    }
  }
  /**
   * Handle selection changes on mobile devices
   * Uses for showing the Inline Toolbar
   */
  selectionChanged() {
    const { CrossBlockSelection: e, BlockSelection: t } = this.Editor, o2 = b.anchorElement;
    if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && b.get().removeAllRanges(), !o2) {
      b.range || this.Editor.InlineToolbar.close();
      return;
    }
    const i = o2.closest(`.${R.CSS.content}`);
    (i === null || i.closest(`.${b.CSS.editorWrapper}`) !== this.nodes.wrapper) && (this.Editor.InlineToolbar.containsNode(o2) || this.Editor.InlineToolbar.close(), !(o2.dataset.inlineToolbar === "true")) || (this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(o2), this.Editor.InlineToolbar.tryToShow(true));
  }
  /**
   * Editor.js provides and ability to show placeholders for empty contenteditable elements
   *
   * This method watches for input and focus events and toggles 'data-empty' attribute
   * to workaroud the case, when inputs contains only <br>s and has no visible content
   * Then, CSS could rely on this attribute to show placeholders
   */
  enableInputsEmptyMark() {
    function e(t) {
      const o2 = t.target;
      Do(o2);
    }
    this.readOnlyMutableListeners.on(this.nodes.wrapper, "input", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusin", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusout", e);
  }
};
var Oa = {
  // API Modules
  BlocksAPI: gi,
  CaretAPI: bi,
  EventsAPI: vi,
  I18nAPI: kt,
  API: ki,
  InlineToolbarAPI: yi,
  ListenersAPI: wi,
  NotifierAPI: Ci,
  ReadOnlyAPI: Ti,
  SanitizerAPI: Li,
  SaverAPI: Pi,
  SelectionAPI: Ni,
  ToolsAPI: Ri,
  StylesAPI: Di,
  ToolbarAPI: Fi,
  TooltipAPI: Ui,
  UiAPI: Wi,
  // Toolbar Modules
  BlockSettings: ms,
  Toolbar: Bs,
  InlineToolbar: Cs,
  // Modules
  BlockEvents: na,
  BlockManager: ra,
  BlockSelection: aa,
  Caret: Ye,
  CrossBlockSelection: la,
  DragNDrop: ca,
  ModificationsObserver: ha,
  Paste: pa,
  ReadOnly: fa,
  RectangleSelection: Be,
  Renderer: ga,
  Saver: ma,
  Tools: Wn,
  UI: Ia
};
var _a = class {
  /**
   * @param {EditorConfig} config - user configuration
   */
  constructor(e) {
    this.moduleInstances = {}, this.eventsDispatcher = new Oe();
    let t, o2;
    this.isReady = new Promise((i, s2) => {
      t = i, o2 = s2;
    }), Promise.resolve().then(async () => {
      this.configuration = e, this.validate(), this.init(), await this.start(), await this.render();
      const { BlockManager: i, Caret: s2, UI: r, ModificationsObserver: a3 } = this.moduleInstances;
      r.checkEmptiness(), a3.enable(), this.configuration.autofocus === true && this.configuration.readOnly !== true && s2.setToBlock(i.blocks[0], s2.positions.START), t();
    }).catch((i) => {
      S(`Editor.js is not ready because of ${i}`, "error"), o2(i);
    });
  }
  /**
   * Setting for configuration
   *
   * @param {EditorConfig|string} config - Editor's config to set
   */
  set configuration(e) {
    var o2, i;
    D(e) ? this.config = {
      ...e
    } : this.config = {
      holder: e
    }, ht(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = Lo.VERBOSE), Zn(this.config.logLevel), ht(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
    const t = {
      type: this.config.defaultBlock,
      data: {}
    };
    this.config.placeholder = this.config.placeholder || false, this.config.sanitizer = this.config.sanitizer || {
      p: true,
      b: true,
      a: true
    }, this.config.hideToolbar = this.config.hideToolbar ? this.config.hideToolbar : false, this.config.tools = this.config.tools || {}, this.config.i18n = this.config.i18n || {}, this.config.data = this.config.data || { blocks: [] }, this.config.onReady = this.config.onReady || (() => {
    }), this.config.onChange = this.config.onChange || (() => {
    }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : true, (V(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = { blocks: [t] }), this.config.readOnly = this.config.readOnly || false, (o2 = this.config.i18n) != null && o2.messages && z.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((i = this.config.i18n) == null ? void 0 : i.direction) || "ltr";
  }
  /**
   * Returns private property
   *
   * @returns {EditorConfig}
   */
  get configuration() {
    return this.config;
  }
  /**
   * Checks for required fields in Editor's config
   */
  validate() {
    const { holderId: e, holder: t } = this.config;
    if (e && t)
      throw Error("\xABholderId\xBB and \xABholder\xBB param can't assign at the same time.");
    if (te(t) && !u.get(t))
      throw Error(`element with ID \xAB${t}\xBB is missing. Pass correct holder's ID.`);
    if (t && D(t) && !u.isElement(t))
      throw Error("\xABholder\xBB value must be an Element node");
  }
  /**
   * Initializes modules:
   *  - make and save instances
   *  - configure
   */
  init() {
    this.constructModules(), this.configureModules();
  }
  /**
   * Start Editor!
   *
   * Get list of modules that needs to be prepared and return a sequence (Promise)
   *
   * @returns {Promise<void>}
   */
  async start() {
    await [
      "Tools",
      "UI",
      "BlockManager",
      "Paste",
      "BlockSelection",
      "RectangleSelection",
      "CrossBlockSelection",
      "ReadOnly"
    ].reduce(
      (t, o2) => t.then(async () => {
        try {
          await this.moduleInstances[o2].prepare();
        } catch (i) {
          if (i instanceof Ho)
            throw new Error(i.message);
          S(`Module ${o2} was skipped because of %o`, "warn", i);
        }
      }),
      Promise.resolve()
    );
  }
  /**
   * Render initial data
   */
  render() {
    return this.moduleInstances.Renderer.render(this.config.data.blocks);
  }
  /**
   * Make modules instances and save it to the @property this.moduleInstances
   */
  constructModules() {
    Object.entries(Oa).forEach(([e, t]) => {
      try {
        this.moduleInstances[e] = new t({
          config: this.configuration,
          eventsDispatcher: this.eventsDispatcher
        });
      } catch (o2) {
        S("[constructModules]", `Module ${e} skipped because`, "error", o2);
      }
    });
  }
  /**
   * Modules instances configuration:
   *  - pass other modules to the 'state' property
   *  - ...
   */
  configureModules() {
    for (const e in this.moduleInstances)
      Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
  }
  /**
   * Return modules without passed name
   *
   * @param {string} name - module for witch modules difference should be calculated
   */
  getModulesDiff(e) {
    const t = {};
    for (const o2 in this.moduleInstances)
      o2 !== e && (t[o2] = this.moduleInstances[o2]);
    return t;
  }
};
var Aa = class {
  /** Editor version */
  static get version() {
    return "2.31.0";
  }
  /**
   * @param {EditorConfig|string|undefined} [configuration] - user configuration
   */
  constructor(e) {
    let t = () => {
    };
    D(e) && A(e.onReady) && (t = e.onReady);
    const o2 = new _a(e);
    this.isReady = o2.isReady.then(() => {
      this.exportAPI(o2), t();
    });
  }
  /**
   * Export external API methods
   *
   * @param {Core} editor — Editor's instance
   */
  exportAPI(e) {
    const t = ["configuration"], o2 = () => {
      Object.values(e.moduleInstances).forEach((s2) => {
        A(s2.destroy) && s2.destroy(), s2.listeners.removeAll();
      }), zi(), e = null;
      for (const s2 in this)
        Object.prototype.hasOwnProperty.call(this, s2) && delete this[s2];
      Object.setPrototypeOf(this, null);
    };
    t.forEach((s2) => {
      this[s2] = e[s2];
    }), this.destroy = o2, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
      blocks: {
        clear: "clear",
        render: "render"
      },
      caret: {
        focus: "focus"
      },
      events: {
        on: "on",
        off: "off",
        emit: "emit"
      },
      saver: {
        save: "save"
      }
    }).forEach(([s2, r]) => {
      Object.entries(r).forEach(([a3, l2]) => {
        this[l2] = e.moduleInstances.API.methods[s2][a3];
      });
    });
  }
};

// node_modules/@editorjs/header/dist/header.mjs
(function() {
  "use strict";
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode(".ce-header{padding:.6em 0 3px;margin:0;line-height:1.25em;outline:none}.ce-header p,.ce-header div{padding:0!important;margin:0!important}")), document.head.appendChild(e);
    }
  } catch (n) {
    console.error("vite-plugin-css-injected-by-js", n);
  }
})();
var a = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>';
var l = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>';
var o = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>';
var h = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>';
var d = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>';
var u2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>';
var g = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"/></svg>';
var v = class {
  constructor({ data: e, config: t, api: s2, readOnly: r }) {
    this.api = s2, this.readOnly = r, this._settings = t, this._data = this.normalizeData(e), this._element = this.getTag();
  }
  /**
   * Styles
   */
  get _CSS() {
    return {
      block: this.api.styles.block,
      wrapper: "ce-header"
    };
  }
  /**
   * Check if data is valid
   * 
   * @param {any} data - data to check
   * @returns {data is HeaderData}
   * @private
   */
  isHeaderData(e) {
    return e.text !== void 0;
  }
  /**
   * Normalize input data
   *
   * @param {HeaderData} data - saved data to process
   *
   * @returns {HeaderData}
   * @private
   */
  normalizeData(e) {
    const t = { text: "", level: this.defaultLevel.number };
    return this.isHeaderData(e) && (t.text = e.text || "", e.level !== void 0 && !isNaN(parseInt(e.level.toString())) && (t.level = parseInt(e.level.toString()))), t;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLHeadingElement}
   * @public
   */
  render() {
    return this._element;
  }
  /**
   * Returns header block tunes config
   *
   * @returns {Array}
   */
  renderSettings() {
    return this.levels.map((e) => ({
      icon: e.svg,
      label: this.api.i18n.t(`Heading ${e.number}`),
      onActivate: () => this.setLevel(e.number),
      closeOnActivate: true,
      isActive: this.currentLevel.number === e.number,
      render: () => document.createElement("div")
    }));
  }
  /**
   * Callback for Block's settings buttons
   *
   * @param {number} level - level to set
   */
  setLevel(e) {
    this.data = {
      level: e,
      text: this.data.text
    };
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {HeaderData} data - saved data to merger with current block
   * @public
   */
  merge(e) {
    this._element.insertAdjacentHTML("beforeend", e.text);
  }
  /**
   * Validate Text block data:
   * - check for emptiness
   *
   * @param {HeaderData} blockData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return e.text.trim() !== "";
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLHeadingElement} toolsContent - Text tools rendered view
   * @returns {HeaderData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML,
      level: this.currentLevel.number
    };
  }
  /**
   * Allow Header to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      export: "text",
      // use 'text' property for other blocks
      import: "text"
      // fill 'text' property from other block's export string
    };
  }
  /**
   * Sanitizer Rules
   */
  static get sanitize() {
    return {
      level: false,
      text: {}
    };
  }
  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }
  /**
   * Get current Tools`s data
   *
   * @returns {HeaderData} Current data
   * @private
   */
  get data() {
    return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data;
  }
  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {HeaderData} data — data to set
   * @private
   */
  set data(e) {
    if (this._data = this.normalizeData(e), e.level !== void 0 && this._element.parentNode) {
      const t = this.getTag();
      t.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(t, this._element), this._element = t;
    }
    e.text !== void 0 && (this._element.innerHTML = this._data.text || "");
  }
  /**
   * Get tag for target level
   * By default returns second-leveled header
   *
   * @returns {HTMLElement}
   */
  getTag() {
    const e = document.createElement(this.currentLevel.tag);
    return e.innerHTML = this._data.text || "", e.classList.add(this._CSS.wrapper), e.contentEditable = this.readOnly ? "false" : "true", e.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), e;
  }
  /**
   * Get current level
   *
   * @returns {level}
   */
  get currentLevel() {
    let e = this.levels.find((t) => t.number === this._data.level);
    return e || (e = this.defaultLevel), e;
  }
  /**
   * Return default level
   *
   * @returns {level}
   */
  get defaultLevel() {
    if (this._settings.defaultLevel) {
      const e = this.levels.find((t) => t.number === this._settings.defaultLevel);
      if (e)
        return e;
      console.warn("(\u0E07'\u0300-'\u0301)\u0E07 Heading Tool: the default level specified was not found in available levels");
    }
    return this.levels[1];
  }
  /**
   * @typedef {object} level
   * @property {number} number - level number
   * @property {string} tag - tag corresponds with level number
   * @property {string} svg - icon
   */
  /**
   * Available header levels
   *
   * @returns {level[]}
   */
  get levels() {
    const e = [
      {
        number: 1,
        tag: "H1",
        svg: a
      },
      {
        number: 2,
        tag: "H2",
        svg: l
      },
      {
        number: 3,
        tag: "H3",
        svg: o
      },
      {
        number: 4,
        tag: "H4",
        svg: h
      },
      {
        number: 5,
        tag: "H5",
        svg: d
      },
      {
        number: 6,
        tag: "H6",
        svg: u2
      }
    ];
    return this._settings.levels ? e.filter(
      (t) => this._settings.levels.includes(t.number)
    ) : e;
  }
  /**
   * Handle H1-H6 tags on paste to substitute it with header Tool
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(e) {
    const t = e.detail;
    if ("data" in t) {
      const s2 = t.data;
      let r = this.defaultLevel.number;
      switch (s2.tagName) {
        case "H1":
          r = 1;
          break;
        case "H2":
          r = 2;
          break;
        case "H3":
          r = 3;
          break;
        case "H4":
          r = 4;
          break;
        case "H5":
          r = 5;
          break;
        case "H6":
          r = 6;
          break;
      }
      this._settings.levels && (r = this._settings.levels.reduce((n, i) => Math.abs(i - r) < Math.abs(n - r) ? i : n)), this.data = {
        level: r,
        text: s2.innerHTML
      };
    }
  }
  /**
   * Used by Editor.js paste handling API.
   * Provides configuration to handle H1-H6 tags.
   *
   * @returns {{handler: (function(HTMLElement): {text: string}), tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["H1", "H2", "H3", "H4", "H5", "H6"]
    };
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: g,
      title: "Heading"
    };
  }
};

// node_modules/@editorjs/list/dist/editorjs-list.mjs
(function() {
  "use strict";
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode('.cdx-list{margin:0;padding:0;outline:none;display:grid;counter-reset:item;gap:var(--spacing-s);padding:var(--spacing-xs);--spacing-s: 8px;--spacing-xs: 6px;--list-counter-type: numeric;--radius-border: 5px;--checkbox-background: #fff;--color-border: #C9C9C9;--color-bg-checked: #369FFF;--line-height: 1.45em;--color-bg-checked-hover: #0059AB;--color-tick: #fff;--size-checkbox: 1.2em}.cdx-list__item{line-height:var(--line-height);display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;grid-template-areas:"checkbox content" ". child"}.cdx-list__item-children{display:grid;grid-area:child;gap:var(--spacing-s);padding-top:var(--spacing-s)}.cdx-list__item [contenteditable]{outline:none}.cdx-list__item-content{word-break:break-word;white-space:pre-wrap;grid-area:content;padding-left:var(--spacing-s)}.cdx-list__item:before{counter-increment:item;white-space:nowrap}.cdx-list-ordered .cdx-list__item:before{content:counters(item,".",var(--list-counter-type)) "."}.cdx-list-ordered{counter-reset:item}.cdx-list-unordered .cdx-list__item:before{content:"\u2022"}.cdx-list-checklist .cdx-list__item:before{content:""}.cdx-list__settings .cdx-settings-button{width:50%}.cdx-list__checkbox{padding-top:calc((var(--line-height) - var(--size-checkbox)) / 2);grid-area:checkbox;width:var(--size-checkbox);height:var(--size-checkbox);display:flex;cursor:pointer}.cdx-list__checkbox svg{opacity:0;height:var(--size-checkbox);width:var(--size-checkbox);left:-1px;top:-1px;position:absolute}@media (hover: hover){.cdx-list__checkbox:not(.cdx-list__checkbox--no-hover):hover .cdx-list__checkbox-check svg{opacity:1}}.cdx-list__checkbox--checked{line-height:var(--line-height)}@media (hover: hover){.cdx-list__checkbox--checked:not(.cdx-list__checkbox--checked--no-hover):hover .cdx-checklist__checkbox-check{background:var(--color-bg-checked-hover);border-color:var(--color-bg-checked-hover)}}.cdx-list__checkbox--checked .cdx-list__checkbox-check{background:var(--color-bg-checked);border-color:var(--color-bg-checked)}.cdx-list__checkbox--checked .cdx-list__checkbox-check svg{opacity:1}.cdx-list__checkbox--checked .cdx-list__checkbox-check svg path{stroke:var(--color-tick)}.cdx-list__checkbox--checked .cdx-list__checkbox-check:before{opacity:0;visibility:visible;transform:scale(2.5)}.cdx-list__checkbox-check{cursor:pointer;display:inline-block;position:relative;margin:0 auto;width:var(--size-checkbox);height:var(--size-checkbox);box-sizing:border-box;border-radius:var(--radius-border);border:1px solid var(--color-border);background:var(--checkbox-background)}.cdx-list__checkbox-check:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:100%;background-color:var(--color-bg-checked);visibility:hidden;pointer-events:none;transform:scale(1);transition:transform .4s ease-out,opacity .4s}.cdx-list__checkbox-check--disabled{pointer-events:none}.cdx-list-start-with-field{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-list-start-with-field--invalid{background:#FFECED;border:1px solid #E13F3F}.cdx-list-start-with-field--invalid .cdx-list-start-with-field__input{color:#e13f3f}.cdx-list-start-with-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - var(--toolbox-buttons-size) - var(--icon-margin-right))}.cdx-list-start-with-field__input::placeholder{color:var(--grayText);font-weight:500}')), document.head.appendChild(e);
    }
  } catch (c3) {
    console.error("vite-plugin-css-injected-by-js", c3);
  }
})();
var Ct2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 12L10.4884 15.8372C10.5677 15.9245 10.705 15.9245 10.7844 15.8372L17 9"/></svg>';
var Ae2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.2 12L11.0586 13.8586C11.1367 13.9367 11.2633 13.9367 11.3414 13.8586L14.7 10.5"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>';
var $e2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="9" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 17H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 12H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 7H4.99002"/></svg>';
var Be2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="12" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.79999 14L7.79999 7.2135C7.79999 7.12872 7.7011 7.0824 7.63597 7.13668L4.79999 9.5"/></svg>';
var St2 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14.2L10 7.4135C10 7.32872 9.90111 7.28241 9.83598 7.33668L7 9.7" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M13.2087 14.2H13.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>';
var Ot2 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2087 14.2H13.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M10 14.2L10 9.5" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M10 7.01L10 7" stroke="black" stroke-width="1.8" stroke-linecap="round"/></svg>';
var kt2 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2087 14.2H13.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M10 14.2L10 7.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>';
var _t2 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0087 14.2H16" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M7 14.2L7.78865 12M13 14.2L12.1377 12M7.78865 12C7.78865 12 9.68362 7 10 7C10.3065 7 12.1377 12 12.1377 12M7.78865 12L12.1377 12" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>';
var Et2 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2087 14.2H14.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M11.5 14.5C11.5 14.5 11 13.281 11 12.5M7 9.5C7 9.5 7.5 8.5 9 8.5C10.5 8.5 11 9.5 11 10.5L11 11.5M11 11.5L11 12.5M11 11.5C11 11.5 7 11 7 13C7 15.3031 11 15 11 12.5" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>';
var It2 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14.2L8 7.4135C8 7.32872 7.90111 7.28241 7.83598 7.33668L5 9.7" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M14 13L16.4167 10.7778M16.4167 10.7778L14 8.5M16.4167 10.7778H11.6562" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var A2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wt2(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: true }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: true,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var c = {};
var V2 = {};
var Y2 = {};
Object.defineProperty(Y2, "__esModule", { value: true });
Y2.allInputsSelector = Pt2;
function Pt2() {
  var e = ["text", "password", "email", "number", "search", "tel", "url"];
  return "[contenteditable=true], textarea, input:not([type]), " + e.map(function(t) {
    return 'input[type="'.concat(t, '"]');
  }).join(", ");
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.allInputsSelector = void 0;
  var t = Y2;
  Object.defineProperty(e, "allInputsSelector", { enumerable: true, get: function() {
    return t.allInputsSelector;
  } });
})(V2);
var k = {};
var J2 = {};
Object.defineProperty(J2, "__esModule", { value: true });
J2.isNativeInput = jt2;
function jt2(e) {
  var t = [
    "INPUT",
    "TEXTAREA"
  ];
  return e && e.tagName ? t.includes(e.tagName) : false;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isNativeInput = void 0;
  var t = J2;
  Object.defineProperty(e, "isNativeInput", { enumerable: true, get: function() {
    return t.isNativeInput;
  } });
})(k);
var Fe2 = {};
var Q = {};
Object.defineProperty(Q, "__esModule", { value: true });
Q.append = Tt2;
function Tt2(e, t) {
  Array.isArray(t) ? t.forEach(function(n) {
    e.appendChild(n);
  }) : e.appendChild(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.append = void 0;
  var t = Q;
  Object.defineProperty(e, "append", { enumerable: true, get: function() {
    return t.append;
  } });
})(Fe2);
var Z2 = {};
var x = {};
Object.defineProperty(x, "__esModule", { value: true });
x.blockElements = Lt2;
function Lt2() {
  return [
    "address",
    "article",
    "aside",
    "blockquote",
    "canvas",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "noscript",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "table",
    "tbody",
    "thead",
    "tr",
    "tfoot",
    "ul",
    "video"
  ];
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.blockElements = void 0;
  var t = x;
  Object.defineProperty(e, "blockElements", { enumerable: true, get: function() {
    return t.blockElements;
  } });
})(Z2);
var Re2 = {};
var ee2 = {};
Object.defineProperty(ee2, "__esModule", { value: true });
ee2.calculateBaseline = Mt2;
function Mt2(e) {
  var t = window.getComputedStyle(e), n = parseFloat(t.fontSize), r = parseFloat(t.lineHeight) || n * 1.2, i = parseFloat(t.paddingTop), a3 = parseFloat(t.borderTopWidth), l2 = parseFloat(t.marginTop), s2 = n * 0.8, o2 = (r - n) / 2, d2 = l2 + a3 + i + o2 + s2;
  return d2;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.calculateBaseline = void 0;
  var t = ee2;
  Object.defineProperty(e, "calculateBaseline", { enumerable: true, get: function() {
    return t.calculateBaseline;
  } });
})(Re2);
var qe2 = {};
var te2 = {};
var ne2 = {};
var re2 = {};
Object.defineProperty(re2, "__esModule", { value: true });
re2.isContentEditable = Nt2;
function Nt2(e) {
  return e.contentEditable === "true";
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isContentEditable = void 0;
  var t = re2;
  Object.defineProperty(e, "isContentEditable", { enumerable: true, get: function() {
    return t.isContentEditable;
  } });
})(ne2);
Object.defineProperty(te2, "__esModule", { value: true });
te2.canSetCaret = Bt2;
var At2 = k;
var $t2 = ne2;
function Bt2(e) {
  var t = true;
  if ((0, At2.isNativeInput)(e))
    switch (e.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        t = false;
        break;
    }
  else
    t = (0, $t2.isContentEditable)(e);
  return t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.canSetCaret = void 0;
  var t = te2;
  Object.defineProperty(e, "canSetCaret", { enumerable: true, get: function() {
    return t.canSetCaret;
  } });
})(qe2);
var $2 = {};
var ie = {};
function Wt2(e, t, n) {
  const r = n.value !== void 0 ? "value" : "get", i = n[r], a3 = `#${t}Cache`;
  if (n[r] = function(...l2) {
    return this[a3] === void 0 && (this[a3] = i.apply(this, l2)), this[a3];
  }, r === "get" && n.set) {
    const l2 = n.set;
    n.set = function(s2) {
      delete e[a3], l2.apply(this, s2);
    };
  }
  return n;
}
function Ue2() {
  const e = {
    win: false,
    mac: false,
    x11: false,
    linux: false
  }, t = Object.keys(e).find((n) => window.navigator.appVersion.toLowerCase().indexOf(n) !== -1);
  return t !== void 0 && (e[t] = true), e;
}
function ae2(e) {
  return e != null && e !== "" && (typeof e != "object" || Object.keys(e).length > 0);
}
function Dt2(e) {
  return !ae2(e);
}
var Ht2 = () => typeof window < "u" && window.navigator !== null && ae2(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function Ft2(e) {
  const t = Ue2();
  return e = e.replace(/shift/gi, "\u21E7").replace(/backspace/gi, "\u232B").replace(/enter/gi, "\u23CE").replace(/up/gi, "\u2191").replace(/left/gi, "\u2192").replace(/down/gi, "\u2193").replace(/right/gi, "\u2190").replace(/escape/gi, "\u238B").replace(/insert/gi, "Ins").replace(/delete/gi, "\u2421").replace(/\+/gi, "+"), t.mac ? e = e.replace(/ctrl|cmd/gi, "\u2318").replace(/alt/gi, "\u2325") : e = e.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), e;
}
function Rt2(e) {
  return e[0].toUpperCase() + e.slice(1);
}
function qt2(e) {
  const t = document.createElement("div");
  t.style.position = "absolute", t.style.left = "-999px", t.style.bottom = "-999px", t.innerHTML = e, document.body.appendChild(t);
  const n = window.getSelection(), r = document.createRange();
  if (r.selectNode(t), n === null)
    throw new Error("Cannot copy text to clipboard");
  n.removeAllRanges(), n.addRange(r), document.execCommand("copy"), document.body.removeChild(t);
}
function Ut2(e, t, n) {
  let r;
  return (...i) => {
    const a3 = this, l2 = () => {
      r = void 0, n !== true && e.apply(a3, i);
    }, s2 = n === true && r !== void 0;
    window.clearTimeout(r), r = window.setTimeout(l2, t), s2 && e.apply(a3, i);
  };
}
function S2(e) {
  return Object.prototype.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function Kt2(e) {
  return S2(e) === "boolean";
}
function Ke2(e) {
  return S2(e) === "function" || S2(e) === "asyncfunction";
}
function zt2(e) {
  return Ke2(e) && /^\s*class\s+/.test(e.toString());
}
function Xt2(e) {
  return S2(e) === "number";
}
function M(e) {
  return S2(e) === "object";
}
function Gt2(e) {
  return Promise.resolve(e) === e;
}
function Vt2(e) {
  return S2(e) === "string";
}
function Yt2(e) {
  return S2(e) === "undefined";
}
function X2(e, ...t) {
  if (!t.length)
    return e;
  const n = t.shift();
  if (M(e) && M(n))
    for (const r in n)
      M(n[r]) ? (e[r] === void 0 && Object.assign(e, { [r]: {} }), X2(e[r], n[r])) : Object.assign(e, { [r]: n[r] });
  return X2(e, ...t);
}
function Jt2(e, t, n) {
  const r = `\xAB${t}\xBB is deprecated and will be removed in the next major release. Please use the \xAB${n}\xBB instead.`;
  e && console.warn(r);
}
function Qt2(e) {
  try {
    return new URL(e).href;
  } catch {
  }
  return e.substring(0, 2) === "//" ? window.location.protocol + e : window.location.origin + e;
}
function Zt2(e) {
  return e > 47 && e < 58 || e === 32 || e === 13 || e === 229 || e > 64 && e < 91 || e > 95 && e < 112 || e > 185 && e < 193 || e > 218 && e < 223;
}
var xt2 = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
};
var en2 = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
var tn2 = class {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   * @param operation - promise should be added to queue
   */
  add(t) {
    return new Promise((n, r) => {
      this.completed = this.completed.then(t).then(n).catch(r);
    });
  }
};
function nn2(e, t, n = void 0) {
  let r, i, a3, l2 = null, s2 = 0;
  n || (n = {});
  const o2 = function() {
    s2 = n.leading === false ? 0 : Date.now(), l2 = null, a3 = e.apply(r, i), l2 === null && (r = i = null);
  };
  return function() {
    const d2 = Date.now();
    !s2 && n.leading === false && (s2 = d2);
    const u3 = t - (d2 - s2);
    return r = this, i = arguments, u3 <= 0 || u3 > t ? (l2 && (clearTimeout(l2), l2 = null), s2 = d2, a3 = e.apply(r, i), l2 === null && (r = i = null)) : !l2 && n.trailing !== false && (l2 = setTimeout(o2, u3)), a3;
  };
}
var rn2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PromiseQueue: tn2,
  beautifyShortcut: Ft2,
  cacheable: Wt2,
  capitalize: Rt2,
  copyTextToClipboard: qt2,
  debounce: Ut2,
  deepMerge: X2,
  deprecationAssert: Jt2,
  getUserOS: Ue2,
  getValidUrl: Qt2,
  isBoolean: Kt2,
  isClass: zt2,
  isEmpty: Dt2,
  isFunction: Ke2,
  isIosDevice: Ht2,
  isNumber: Xt2,
  isObject: M,
  isPrintableKey: Zt2,
  isPromise: Gt2,
  isString: Vt2,
  isUndefined: Yt2,
  keyCodes: xt2,
  mouseButtons: en2,
  notEmpty: ae2,
  throttle: nn2,
  typeOf: S2
}, Symbol.toStringTag, { value: "Module" }));
var le2 = /* @__PURE__ */ wt2(rn2);
Object.defineProperty(ie, "__esModule", { value: true });
ie.containsOnlyInlineElements = sn2;
var an2 = le2;
var ln2 = Z2;
function sn2(e) {
  var t;
  (0, an2.isString)(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
  var n = function(r) {
    return !(0, ln2.blockElements)().includes(r.tagName.toLowerCase()) && Array.from(r.children).every(n);
  };
  return Array.from(t.children).every(n);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.containsOnlyInlineElements = void 0;
  var t = ie;
  Object.defineProperty(e, "containsOnlyInlineElements", { enumerable: true, get: function() {
    return t.containsOnlyInlineElements;
  } });
})($2);
var ze2 = {};
var se = {};
var B = {};
var oe2 = {};
Object.defineProperty(oe2, "__esModule", { value: true });
oe2.make = on2;
function on2(e, t, n) {
  var r;
  t === void 0 && (t = null), n === void 0 && (n = {});
  var i = document.createElement(e);
  if (Array.isArray(t)) {
    var a3 = t.filter(function(s2) {
      return s2 !== void 0;
    });
    (r = i.classList).add.apply(r, a3);
  } else
    t !== null && i.classList.add(t);
  for (var l2 in n)
    Object.prototype.hasOwnProperty.call(n, l2) && (i[l2] = n[l2]);
  return i;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.make = void 0;
  var t = oe2;
  Object.defineProperty(e, "make", { enumerable: true, get: function() {
    return t.make;
  } });
})(B);
Object.defineProperty(se, "__esModule", { value: true });
se.fragmentToString = cn2;
var un2 = B;
function cn2(e) {
  var t = (0, un2.make)("div");
  return t.appendChild(e), t.innerHTML;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.fragmentToString = void 0;
  var t = se;
  Object.defineProperty(e, "fragmentToString", { enumerable: true, get: function() {
    return t.fragmentToString;
  } });
})(ze2);
var Xe2 = {};
var ue2 = {};
Object.defineProperty(ue2, "__esModule", { value: true });
ue2.getContentLength = fn2;
var dn2 = k;
function fn2(e) {
  var t, n;
  return (0, dn2.isNativeInput)(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : (n = (t = e.textContent) === null || t === void 0 ? void 0 : t.length) !== null && n !== void 0 ? n : 0;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.getContentLength = void 0;
  var t = ue2;
  Object.defineProperty(e, "getContentLength", { enumerable: true, get: function() {
    return t.getContentLength;
  } });
})(Xe2);
var ce2 = {};
var de2 = {};
var We2 = A2 && A2.__spreadArray || function(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a3; r < i; r++)
      (a3 || !(r in t)) && (a3 || (a3 = Array.prototype.slice.call(t, 0, r)), a3[r] = t[r]);
  return e.concat(a3 || Array.prototype.slice.call(t));
};
Object.defineProperty(de2, "__esModule", { value: true });
de2.getDeepestBlockElements = Ge2;
var pn2 = $2;
function Ge2(e) {
  return (0, pn2.containsOnlyInlineElements)(e) ? [e] : Array.from(e.children).reduce(function(t, n) {
    return We2(We2([], t, true), Ge2(n), true);
  }, []);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.getDeepestBlockElements = void 0;
  var t = de2;
  Object.defineProperty(e, "getDeepestBlockElements", { enumerable: true, get: function() {
    return t.getDeepestBlockElements;
  } });
})(ce2);
var Ve2 = {};
var fe2 = {};
var W = {};
var pe2 = {};
Object.defineProperty(pe2, "__esModule", { value: true });
pe2.isLineBreakTag = hn2;
function hn2(e) {
  return [
    "BR",
    "WBR"
  ].includes(e.tagName);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isLineBreakTag = void 0;
  var t = pe2;
  Object.defineProperty(e, "isLineBreakTag", { enumerable: true, get: function() {
    return t.isLineBreakTag;
  } });
})(W);
var D2 = {};
var he2 = {};
Object.defineProperty(he2, "__esModule", { value: true });
he2.isSingleTag = mn2;
function mn2(e) {
  return [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ].includes(e.tagName);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isSingleTag = void 0;
  var t = he2;
  Object.defineProperty(e, "isSingleTag", { enumerable: true, get: function() {
    return t.isSingleTag;
  } });
})(D2);
Object.defineProperty(fe2, "__esModule", { value: true });
fe2.getDeepestNode = Ye2;
var gn2 = k;
var vn2 = W;
var bn2 = D2;
function Ye2(e, t) {
  t === void 0 && (t = false);
  var n = t ? "lastChild" : "firstChild", r = t ? "previousSibling" : "nextSibling";
  if (e.nodeType === Node.ELEMENT_NODE && e[n]) {
    var i = e[n];
    if ((0, bn2.isSingleTag)(i) && !(0, gn2.isNativeInput)(i) && !(0, vn2.isLineBreakTag)(i))
      if (i[r])
        i = i[r];
      else if (i.parentNode !== null && i.parentNode[r])
        i = i.parentNode[r];
      else
        return i.parentNode;
    return Ye2(i, t);
  }
  return e;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.getDeepestNode = void 0;
  var t = fe2;
  Object.defineProperty(e, "getDeepestNode", { enumerable: true, get: function() {
    return t.getDeepestNode;
  } });
})(Ve2);
var Je2 = {};
var me2 = {};
var T = A2 && A2.__spreadArray || function(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a3; r < i; r++)
      (a3 || !(r in t)) && (a3 || (a3 = Array.prototype.slice.call(t, 0, r)), a3[r] = t[r]);
  return e.concat(a3 || Array.prototype.slice.call(t));
};
Object.defineProperty(me2, "__esModule", { value: true });
me2.findAllInputs = kn2;
var yn2 = $2;
var Cn2 = ce2;
var Sn2 = V2;
var On2 = k;
function kn2(e) {
  return Array.from(e.querySelectorAll((0, Sn2.allInputsSelector)())).reduce(function(t, n) {
    return (0, On2.isNativeInput)(n) || (0, yn2.containsOnlyInlineElements)(n) ? T(T([], t, true), [n], false) : T(T([], t, true), (0, Cn2.getDeepestBlockElements)(n), true);
  }, []);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.findAllInputs = void 0;
  var t = me2;
  Object.defineProperty(e, "findAllInputs", { enumerable: true, get: function() {
    return t.findAllInputs;
  } });
})(Je2);
var Qe2 = {};
var ge2 = {};
Object.defineProperty(ge2, "__esModule", { value: true });
ge2.isCollapsedWhitespaces = _n2;
function _n2(e) {
  return !/[^\t\n\r ]/.test(e);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isCollapsedWhitespaces = void 0;
  var t = ge2;
  Object.defineProperty(e, "isCollapsedWhitespaces", { enumerable: true, get: function() {
    return t.isCollapsedWhitespaces;
  } });
})(Qe2);
var ve = {};
var be2 = {};
Object.defineProperty(be2, "__esModule", { value: true });
be2.isElement = In2;
var En2 = le2;
function In2(e) {
  return (0, En2.isNumber)(e) ? false : !!e && !!e.nodeType && e.nodeType === Node.ELEMENT_NODE;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isElement = void 0;
  var t = be2;
  Object.defineProperty(e, "isElement", { enumerable: true, get: function() {
    return t.isElement;
  } });
})(ve);
var Ze2 = {};
var ye2 = {};
var Ce2 = {};
var Se2 = {};
Object.defineProperty(Se2, "__esModule", { value: true });
Se2.isLeaf = wn2;
function wn2(e) {
  return e === null ? false : e.childNodes.length === 0;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isLeaf = void 0;
  var t = Se2;
  Object.defineProperty(e, "isLeaf", { enumerable: true, get: function() {
    return t.isLeaf;
  } });
})(Ce2);
var Oe2 = {};
var ke2 = {};
Object.defineProperty(ke2, "__esModule", { value: true });
ke2.isNodeEmpty = Mn2;
var Pn2 = W;
var jn2 = ve;
var Tn2 = k;
var Ln2 = D2;
function Mn2(e, t) {
  var n = "";
  return (0, Ln2.isSingleTag)(e) && !(0, Pn2.isLineBreakTag)(e) ? false : ((0, jn2.isElement)(e) && (0, Tn2.isNativeInput)(e) ? n = e.value : e.textContent !== null && (n = e.textContent.replace("\u200B", "")), t !== void 0 && (n = n.replace(new RegExp(t, "g"), "")), n.trim().length === 0);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isNodeEmpty = void 0;
  var t = ke2;
  Object.defineProperty(e, "isNodeEmpty", { enumerable: true, get: function() {
    return t.isNodeEmpty;
  } });
})(Oe2);
Object.defineProperty(ye2, "__esModule", { value: true });
ye2.isEmpty = $n2;
var Nn2 = Ce2;
var An2 = Oe2;
function $n2(e, t) {
  e.normalize();
  for (var n = [e]; n.length > 0; ) {
    var r = n.shift();
    if (r) {
      if (e = r, (0, Nn2.isLeaf)(e) && !(0, An2.isNodeEmpty)(e, t))
        return false;
      n.push.apply(n, Array.from(e.childNodes));
    }
  }
  return true;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isEmpty = void 0;
  var t = ye2;
  Object.defineProperty(e, "isEmpty", { enumerable: true, get: function() {
    return t.isEmpty;
  } });
})(Ze2);
var xe2 = {};
var _e2 = {};
Object.defineProperty(_e2, "__esModule", { value: true });
_e2.isFragment = Wn2;
var Bn2 = le2;
function Wn2(e) {
  return (0, Bn2.isNumber)(e) ? false : !!e && !!e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isFragment = void 0;
  var t = _e2;
  Object.defineProperty(e, "isFragment", { enumerable: true, get: function() {
    return t.isFragment;
  } });
})(xe2);
var et2 = {};
var Ee2 = {};
Object.defineProperty(Ee2, "__esModule", { value: true });
Ee2.isHTMLString = Hn2;
var Dn2 = B;
function Hn2(e) {
  var t = (0, Dn2.make)("div");
  return t.innerHTML = e, t.childElementCount > 0;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isHTMLString = void 0;
  var t = Ee2;
  Object.defineProperty(e, "isHTMLString", { enumerable: true, get: function() {
    return t.isHTMLString;
  } });
})(et2);
var tt = {};
var Ie2 = {};
Object.defineProperty(Ie2, "__esModule", { value: true });
Ie2.offset = Fn2;
function Fn2(e) {
  var t = e.getBoundingClientRect(), n = window.pageXOffset || document.documentElement.scrollLeft, r = window.pageYOffset || document.documentElement.scrollTop, i = t.top + r, a3 = t.left + n;
  return {
    top: i,
    left: a3,
    bottom: i + t.height,
    right: a3 + t.width
  };
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.offset = void 0;
  var t = Ie2;
  Object.defineProperty(e, "offset", { enumerable: true, get: function() {
    return t.offset;
  } });
})(tt);
var nt2 = {};
var we2 = {};
Object.defineProperty(we2, "__esModule", { value: true });
we2.prepend = Rn2;
function Rn2(e, t) {
  Array.isArray(t) ? (t = t.reverse(), t.forEach(function(n) {
    return e.prepend(n);
  })) : e.prepend(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.prepend = void 0;
  var t = we2;
  Object.defineProperty(e, "prepend", { enumerable: true, get: function() {
    return t.prepend;
  } });
})(nt2);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.prepend = e.offset = e.make = e.isLineBreakTag = e.isSingleTag = e.isNodeEmpty = e.isLeaf = e.isHTMLString = e.isFragment = e.isEmpty = e.isElement = e.isContentEditable = e.isCollapsedWhitespaces = e.findAllInputs = e.isNativeInput = e.allInputsSelector = e.getDeepestNode = e.getDeepestBlockElements = e.getContentLength = e.fragmentToString = e.containsOnlyInlineElements = e.canSetCaret = e.calculateBaseline = e.blockElements = e.append = void 0;
  var t = V2;
  Object.defineProperty(e, "allInputsSelector", { enumerable: true, get: function() {
    return t.allInputsSelector;
  } });
  var n = k;
  Object.defineProperty(e, "isNativeInput", { enumerable: true, get: function() {
    return n.isNativeInput;
  } });
  var r = Fe2;
  Object.defineProperty(e, "append", { enumerable: true, get: function() {
    return r.append;
  } });
  var i = Z2;
  Object.defineProperty(e, "blockElements", { enumerable: true, get: function() {
    return i.blockElements;
  } });
  var a3 = Re2;
  Object.defineProperty(e, "calculateBaseline", { enumerable: true, get: function() {
    return a3.calculateBaseline;
  } });
  var l2 = qe2;
  Object.defineProperty(e, "canSetCaret", { enumerable: true, get: function() {
    return l2.canSetCaret;
  } });
  var s2 = $2;
  Object.defineProperty(e, "containsOnlyInlineElements", { enumerable: true, get: function() {
    return s2.containsOnlyInlineElements;
  } });
  var o2 = ze2;
  Object.defineProperty(e, "fragmentToString", { enumerable: true, get: function() {
    return o2.fragmentToString;
  } });
  var d2 = Xe2;
  Object.defineProperty(e, "getContentLength", { enumerable: true, get: function() {
    return d2.getContentLength;
  } });
  var u3 = ce2;
  Object.defineProperty(e, "getDeepestBlockElements", { enumerable: true, get: function() {
    return u3.getDeepestBlockElements;
  } });
  var p = Ve2;
  Object.defineProperty(e, "getDeepestNode", { enumerable: true, get: function() {
    return p.getDeepestNode;
  } });
  var g3 = Je2;
  Object.defineProperty(e, "findAllInputs", { enumerable: true, get: function() {
    return g3.findAllInputs;
  } });
  var w2 = Qe2;
  Object.defineProperty(e, "isCollapsedWhitespaces", { enumerable: true, get: function() {
    return w2.isCollapsedWhitespaces;
  } });
  var _3 = ne2;
  Object.defineProperty(e, "isContentEditable", { enumerable: true, get: function() {
    return _3.isContentEditable;
  } });
  var ut2 = ve;
  Object.defineProperty(e, "isElement", { enumerable: true, get: function() {
    return ut2.isElement;
  } });
  var ct2 = Ze2;
  Object.defineProperty(e, "isEmpty", { enumerable: true, get: function() {
    return ct2.isEmpty;
  } });
  var dt2 = xe2;
  Object.defineProperty(e, "isFragment", { enumerable: true, get: function() {
    return dt2.isFragment;
  } });
  var ft2 = et2;
  Object.defineProperty(e, "isHTMLString", { enumerable: true, get: function() {
    return ft2.isHTMLString;
  } });
  var pt2 = Ce2;
  Object.defineProperty(e, "isLeaf", { enumerable: true, get: function() {
    return pt2.isLeaf;
  } });
  var ht2 = Oe2;
  Object.defineProperty(e, "isNodeEmpty", { enumerable: true, get: function() {
    return ht2.isNodeEmpty;
  } });
  var mt2 = W;
  Object.defineProperty(e, "isLineBreakTag", { enumerable: true, get: function() {
    return mt2.isLineBreakTag;
  } });
  var gt2 = D2;
  Object.defineProperty(e, "isSingleTag", { enumerable: true, get: function() {
    return gt2.isSingleTag;
  } });
  var vt2 = B;
  Object.defineProperty(e, "make", { enumerable: true, get: function() {
    return vt2.make;
  } });
  var bt2 = tt;
  Object.defineProperty(e, "offset", { enumerable: true, get: function() {
    return bt2.offset;
  } });
  var yt2 = nt2;
  Object.defineProperty(e, "prepend", { enumerable: true, get: function() {
    return yt2.prepend;
  } });
})(c);
var m = "cdx-list";
var h2 = {
  wrapper: m,
  item: `${m}__item`,
  itemContent: `${m}__item-content`,
  itemChildren: `${m}__item-children`
};
var v2 = class _v {
  /**
   * Getter for all CSS classes used in unordered list rendering
   */
  static get CSS() {
    return {
      ...h2,
      orderedList: `${m}-ordered`
    };
  }
  /**
   * Assign passed readonly mode and config to relevant class properties
   * @param readonly - read-only mode flag
   * @param config - user config for Tool
   */
  constructor(t, n) {
    this.config = n, this.readOnly = t;
  }
  /**
   * Renders ol wrapper for list
   * @param isRoot - boolean variable that represents level of the wrappre (root or childList)
   * @returns - created html ol element
   */
  renderWrapper(t) {
    let n;
    return t === true ? n = c.make("ol", [_v.CSS.wrapper, _v.CSS.orderedList]) : n = c.make("ol", [_v.CSS.orderedList, _v.CSS.itemChildren]), n;
  }
  /**
   * Redners list item element
   * @param content - content used in list item rendering
   * @param _meta - meta of the list item unused in rendering of the ordered list
   * @returns - created html list item element
   */
  renderItem(t, n) {
    const r = c.make("li", _v.CSS.item), i = c.make("div", _v.CSS.itemContent, {
      innerHTML: t,
      contentEditable: (!this.readOnly).toString()
    });
    return r.appendChild(i), r;
  }
  /**
   * Return the item content
   * @param item - item wrapper (<li>)
   * @returns - item content string
   */
  getItemContent(t) {
    const n = t.querySelector(`.${_v.CSS.itemContent}`);
    return !n || c.isEmpty(n) ? "" : n.innerHTML;
  }
  /**
   * Returns item meta, for ordered list
   * @returns item meta object
   */
  getItemMeta() {
    return {};
  }
  /**
   * Returns default item meta used on creation of the new item
   */
  composeDefaultMeta() {
    return {};
  }
};
var b2 = class _b {
  /**
   * Getter for all CSS classes used in unordered list rendering
   */
  static get CSS() {
    return {
      ...h2,
      unorderedList: `${m}-unordered`
    };
  }
  /**
   * Assign passed readonly mode and config to relevant class properties
   * @param readonly - read-only mode flag
   * @param config - user config for Tool
   */
  constructor(t, n) {
    this.config = n, this.readOnly = t;
  }
  /**
   * Renders ol wrapper for list
   * @param isRoot - boolean variable that represents level of the wrappre (root or childList)
   * @returns - created html ul element
   */
  renderWrapper(t) {
    let n;
    return t === true ? n = c.make("ul", [_b.CSS.wrapper, _b.CSS.unorderedList]) : n = c.make("ul", [_b.CSS.unorderedList, _b.CSS.itemChildren]), n;
  }
  /**
   * Redners list item element
   * @param content - content used in list item rendering
   * @param _meta - meta of the list item unused in rendering of the unordered list
   * @returns - created html list item element
   */
  renderItem(t, n) {
    const r = c.make("li", _b.CSS.item), i = c.make("div", _b.CSS.itemContent, {
      innerHTML: t,
      contentEditable: (!this.readOnly).toString()
    });
    return r.appendChild(i), r;
  }
  /**
   * Return the item content
   * @param item - item wrapper (<li>)
   * @returns - item content string
   */
  getItemContent(t) {
    const n = t.querySelector(`.${_b.CSS.itemContent}`);
    return !n || c.isEmpty(n) ? "" : n.innerHTML;
  }
  /**
   * Returns item meta, for unordered list
   * @returns Item meta object
   */
  getItemMeta() {
    return {};
  }
  /**
   * Returns default item meta used on creation of the new item
   */
  composeDefaultMeta() {
    return {};
  }
};
function O(e) {
  return e.nodeType === Node.ELEMENT_NODE;
}
var j2 = {};
var Pe2 = {};
var H = {};
var F = {};
Object.defineProperty(F, "__esModule", { value: true });
F.getContenteditableSlice = Un2;
var qn2 = c;
function Un2(e, t, n, r, i) {
  var a3;
  i === void 0 && (i = false);
  var l2 = document.createRange();
  if (r === "left" ? (l2.setStart(e, 0), l2.setEnd(t, n)) : (l2.setStart(t, n), l2.setEnd(e, e.childNodes.length)), i === true) {
    var s2 = l2.extractContents();
    return (0, qn2.fragmentToString)(s2);
  }
  var o2 = l2.cloneContents(), d2 = document.createElement("div");
  d2.appendChild(o2);
  var u3 = (a3 = d2.textContent) !== null && a3 !== void 0 ? a3 : "";
  return u3;
}
Object.defineProperty(H, "__esModule", { value: true });
H.checkContenteditableSliceForEmptiness = Xn2;
var Kn = c;
var zn2 = F;
function Xn2(e, t, n, r) {
  var i = (0, zn2.getContenteditableSlice)(e, t, n, r);
  return (0, Kn.isCollapsedWhitespaces)(i);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.checkContenteditableSliceForEmptiness = void 0;
  var t = H;
  Object.defineProperty(e, "checkContenteditableSliceForEmptiness", { enumerable: true, get: function() {
    return t.checkContenteditableSliceForEmptiness;
  } });
})(Pe2);
var rt2 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.getContenteditableSlice = void 0;
  var t = F;
  Object.defineProperty(e, "getContenteditableSlice", { enumerable: true, get: function() {
    return t.getContenteditableSlice;
  } });
})(rt2);
var it2 = {};
var je2 = {};
Object.defineProperty(je2, "__esModule", { value: true });
je2.focus = Vn2;
var Gn2 = c;
function Vn2(e, t) {
  var n, r;
  if (t === void 0 && (t = true), (0, Gn2.isNativeInput)(e)) {
    e.focus();
    var i = t ? 0 : e.value.length;
    e.setSelectionRange(i, i);
  } else {
    var a3 = document.createRange(), l2 = window.getSelection();
    if (!l2)
      return;
    var s2 = function(g3, w2) {
      w2 === void 0 && (w2 = false);
      var _3 = document.createTextNode("");
      w2 ? g3.insertBefore(_3, g3.firstChild) : g3.appendChild(_3), a3.setStart(_3, 0), a3.setEnd(_3, 0);
    }, o2 = function(g3) {
      return g3 != null;
    }, d2 = e.childNodes, u3 = t ? d2[0] : d2[d2.length - 1];
    if (o2(u3)) {
      for (; o2(u3) && u3.nodeType !== Node.TEXT_NODE; )
        u3 = t ? u3.firstChild : u3.lastChild;
      if (o2(u3) && u3.nodeType === Node.TEXT_NODE) {
        var p = (r = (n = u3.textContent) === null || n === void 0 ? void 0 : n.length) !== null && r !== void 0 ? r : 0, i = t ? 0 : p;
        a3.setStart(u3, i), a3.setEnd(u3, i);
      } else
        s2(e, t);
    } else
      s2(e);
    l2.removeAllRanges(), l2.addRange(a3);
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.focus = void 0;
  var t = je2;
  Object.defineProperty(e, "focus", { enumerable: true, get: function() {
    return t.focus;
  } });
})(it2);
var Te2 = {};
var R2 = {};
Object.defineProperty(R2, "__esModule", { value: true });
R2.getCaretNodeAndOffset = Yn;
function Yn() {
  var e = window.getSelection();
  if (e === null)
    return [null, 0];
  var t = e.focusNode, n = e.focusOffset;
  return t === null ? [null, 0] : (t.nodeType !== Node.TEXT_NODE && t.childNodes.length > 0 && (t.childNodes[n] !== void 0 ? (t = t.childNodes[n], n = 0) : (t = t.childNodes[n - 1], t.textContent !== null && (n = t.textContent.length))), [t, n]);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.getCaretNodeAndOffset = void 0;
  var t = R2;
  Object.defineProperty(e, "getCaretNodeAndOffset", { enumerable: true, get: function() {
    return t.getCaretNodeAndOffset;
  } });
})(Te2);
var at2 = {};
var q = {};
Object.defineProperty(q, "__esModule", { value: true });
q.getRange = Jn2;
function Jn2() {
  var e = window.getSelection();
  return e && e.rangeCount ? e.getRangeAt(0) : null;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.getRange = void 0;
  var t = q;
  Object.defineProperty(e, "getRange", { enumerable: true, get: function() {
    return t.getRange;
  } });
})(at2);
var lt2 = {};
var Le2 = {};
Object.defineProperty(Le2, "__esModule", { value: true });
Le2.isCaretAtEndOfInput = xn2;
var De2 = c;
var Qn2 = Te2;
var Zn2 = Pe2;
function xn2(e) {
  var t = (0, De2.getDeepestNode)(e, true);
  if (t === null)
    return true;
  if ((0, De2.isNativeInput)(t))
    return t.selectionEnd === t.value.length;
  var n = (0, Qn2.getCaretNodeAndOffset)(), r = n[0], i = n[1];
  return r === null ? false : (0, Zn2.checkContenteditableSliceForEmptiness)(e, r, i, "right");
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isCaretAtEndOfInput = void 0;
  var t = Le2;
  Object.defineProperty(e, "isCaretAtEndOfInput", { enumerable: true, get: function() {
    return t.isCaretAtEndOfInput;
  } });
})(lt2);
var st2 = {};
var Me2 = {};
Object.defineProperty(Me2, "__esModule", { value: true });
Me2.isCaretAtStartOfInput = nr2;
var L2 = c;
var er2 = R2;
var tr2 = H;
function nr2(e) {
  var t = (0, L2.getDeepestNode)(e);
  if (t === null || (0, L2.isEmpty)(e))
    return true;
  if ((0, L2.isNativeInput)(t))
    return t.selectionEnd === 0;
  if ((0, L2.isEmpty)(e))
    return true;
  var n = (0, er2.getCaretNodeAndOffset)(), r = n[0], i = n[1];
  return r === null ? false : (0, tr2.checkContenteditableSliceForEmptiness)(e, r, i, "left");
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.isCaretAtStartOfInput = void 0;
  var t = Me2;
  Object.defineProperty(e, "isCaretAtStartOfInput", { enumerable: true, get: function() {
    return t.isCaretAtStartOfInput;
  } });
})(st2);
var ot2 = {};
var Ne2 = {};
Object.defineProperty(Ne2, "__esModule", { value: true });
Ne2.save = ar2;
var rr2 = c;
var ir2 = q;
function ar2() {
  var e = (0, ir2.getRange)(), t = (0, rr2.make)("span");
  if (t.id = "cursor", t.hidden = true, !!e)
    return e.insertNode(t), function() {
      var r = window.getSelection();
      r && (e.setStartAfter(t), e.setEndAfter(t), r.removeAllRanges(), r.addRange(e), setTimeout(function() {
        t.remove();
      }, 150));
    };
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.save = void 0;
  var t = Ne2;
  Object.defineProperty(e, "save", { enumerable: true, get: function() {
    return t.save;
  } });
})(ot2);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), e.save = e.isCaretAtStartOfInput = e.isCaretAtEndOfInput = e.getRange = e.getCaretNodeAndOffset = e.focus = e.getContenteditableSlice = e.checkContenteditableSliceForEmptiness = void 0;
  var t = Pe2;
  Object.defineProperty(e, "checkContenteditableSliceForEmptiness", { enumerable: true, get: function() {
    return t.checkContenteditableSliceForEmptiness;
  } });
  var n = rt2;
  Object.defineProperty(e, "getContenteditableSlice", { enumerable: true, get: function() {
    return n.getContenteditableSlice;
  } });
  var r = it2;
  Object.defineProperty(e, "focus", { enumerable: true, get: function() {
    return r.focus;
  } });
  var i = Te2;
  Object.defineProperty(e, "getCaretNodeAndOffset", { enumerable: true, get: function() {
    return i.getCaretNodeAndOffset;
  } });
  var a3 = at2;
  Object.defineProperty(e, "getRange", { enumerable: true, get: function() {
    return a3.getRange;
  } });
  var l2 = lt2;
  Object.defineProperty(e, "isCaretAtEndOfInput", { enumerable: true, get: function() {
    return l2.isCaretAtEndOfInput;
  } });
  var s2 = st2;
  Object.defineProperty(e, "isCaretAtStartOfInput", { enumerable: true, get: function() {
    return s2.isCaretAtStartOfInput;
  } });
  var o2 = ot2;
  Object.defineProperty(e, "save", { enumerable: true, get: function() {
    return o2.save;
  } });
})(j2);
var f = class _f {
  /**
   * Getter for all CSS classes used in unordered list rendering
   */
  static get CSS() {
    return {
      ...h2,
      checklist: `${m}-checklist`,
      itemChecked: `${m}__checkbox--checked`,
      noHover: `${m}__checkbox--no-hover`,
      checkbox: `${m}__checkbox-check`,
      checkboxContainer: `${m}__checkbox`,
      checkboxCheckDisabled: `${m}__checkbox-check--disabled`
    };
  }
  /**
   * Assign passed readonly mode and config to relevant class properties
   * @param readonly - read-only mode flag
   * @param config - user config for Tool
   */
  constructor(t, n) {
    this.config = n, this.readOnly = t;
  }
  /**
   * Renders ul wrapper for list
   * @param isRoot - boolean variable that represents level of the wrappre (root or childList)
   * @returns - created html ul element
   */
  renderWrapper(t) {
    let n;
    return t === true ? (n = c.make("ul", [_f.CSS.wrapper, _f.CSS.checklist]), n.addEventListener("click", (r) => {
      const i = r.target;
      if (i) {
        const a3 = i.closest(`.${_f.CSS.checkboxContainer}`);
        a3 && a3.contains(i) && this.toggleCheckbox(a3);
      }
    })) : n = c.make("ul", [_f.CSS.checklist, _f.CSS.itemChildren]), n;
  }
  /**
   * Redners list item element
   * @param content - content used in list item rendering
   * @param meta - meta of the list item used in rendering of the checklist
   * @returns - created html list item element
   */
  renderItem(t, n) {
    const r = c.make("li", [_f.CSS.item, _f.CSS.item]), i = c.make("div", _f.CSS.itemContent, {
      innerHTML: t,
      contentEditable: (!this.readOnly).toString()
    }), a3 = c.make("span", _f.CSS.checkbox), l2 = c.make("div", _f.CSS.checkboxContainer);
    return n.checked === true && l2.classList.add(_f.CSS.itemChecked), this.readOnly && l2.classList.add(_f.CSS.checkboxCheckDisabled), a3.innerHTML = Ct2, l2.appendChild(a3), r.appendChild(l2), r.appendChild(i), r;
  }
  /**
   * Return the item content
   * @param item - item wrapper (<li>)
   * @returns - item content string
   */
  getItemContent(t) {
    const n = t.querySelector(`.${_f.CSS.itemContent}`);
    return !n || c.isEmpty(n) ? "" : n.innerHTML;
  }
  /**
   * Return meta object of certain element
   * @param item - will be returned meta information of this item
   * @returns Item meta object
   */
  getItemMeta(t) {
    const n = t.querySelector(`.${_f.CSS.checkboxContainer}`);
    return {
      checked: n ? n.classList.contains(_f.CSS.itemChecked) : false
    };
  }
  /**
   * Returns default item meta used on creation of the new item
   */
  composeDefaultMeta() {
    return { checked: false };
  }
  /**
   * Toggle checklist item state
   * @param checkbox - checkbox element to be toggled
   */
  toggleCheckbox(t) {
    t.classList.toggle(_f.CSS.itemChecked), t.classList.add(_f.CSS.noHover), t.addEventListener("mouseleave", () => this.removeSpecialHoverBehavior(t), { once: true });
  }
  /**
   * Removes class responsible for special hover behavior on an item
   * @param el - item wrapper
   */
  removeSpecialHoverBehavior(t) {
    t.classList.remove(_f.CSS.noHover);
  }
};
function U2(e, t = "after") {
  const n = [];
  let r;
  function i(a3) {
    switch (t) {
      case "after":
        return a3.nextElementSibling;
      case "before":
        return a3.previousElementSibling;
    }
  }
  for (r = i(e); r !== null; )
    n.push(r), r = i(r);
  return n.length !== 0 ? n : null;
}
function y2(e, t = true) {
  let n = e;
  return e.classList.contains(h2.item) && (n = e.querySelector(`.${h2.itemChildren}`)), n === null ? [] : t ? Array.from(n.querySelectorAll(`:scope > .${h2.item}`)) : Array.from(n.querySelectorAll(`.${h2.item}`));
}
function lr2(e) {
  return e.nextElementSibling === null;
}
function sr2(e) {
  return e.querySelector(`.${h2.itemChildren}`) !== null;
}
function C(e) {
  return e.querySelector(`.${h2.itemChildren}`);
}
function K2(e) {
  let t = e;
  e.classList.contains(h2.item) && (t = C(e)), t !== null && y2(t).length === 0 && t.remove();
}
function N(e) {
  return e.querySelector(`.${h2.itemContent}`);
}
function E2(e, t = true) {
  const n = N(e);
  n && j2.focus(n, t);
}
var z2 = class {
  /**
   * Getter method to get current item
   * @returns current list item or null if caret position is not undefined
   */
  get currentItem() {
    const t = window.getSelection();
    if (!t)
      return null;
    let n = t.anchorNode;
    return !n || (O(n) || (n = n.parentNode), !n) || !O(n) ? null : n.closest(`.${h2.item}`);
  }
  /**
   * Method that returns nesting level of the current item, null if there is no selection
   */
  get currentItemLevel() {
    const t = this.currentItem;
    if (t === null)
      return null;
    let n = t.parentNode, r = 0;
    for (; n !== null && n !== this.listWrapper; )
      O(n) && n.classList.contains(h2.item) && (r += 1), n = n.parentNode;
    return r + 1;
  }
  /**
   * Assign all passed params and renderer to relevant class properties
   * @param params - tool constructor options
   * @param params.data - previously saved data
   * @param params.config - user config for Tool
   * @param params.api - Editor.js API
   * @param params.readOnly - read-only mode flag
   * @param renderer - renderer instance initialized in tool class
   */
  constructor({ data: t, config: n, api: r, readOnly: i, block: a3 }, l2) {
    this.config = n, this.data = t, this.readOnly = i, this.api = r, this.block = a3, this.renderer = l2;
  }
  /**
   * Function that is responsible for rendering list with contents
   * @returns Filled with content wrapper element of the list
   */
  render() {
    return this.listWrapper = this.renderer.renderWrapper(true), this.data.items.length ? this.appendItems(this.data.items, this.listWrapper) : this.appendItems(
      [
        {
          content: "",
          meta: {},
          items: []
        }
      ],
      this.listWrapper
    ), this.readOnly || this.listWrapper.addEventListener(
      "keydown",
      (t) => {
        switch (t.key) {
          case "Enter":
            t.shiftKey || this.enterPressed(t);
            break;
          case "Backspace":
            this.backspace(t);
            break;
          case "Tab":
            t.shiftKey ? this.shiftTab(t) : this.addTab(t);
            break;
        }
      },
      false
    ), "start" in this.data.meta && this.data.meta.start !== void 0 && this.changeStartWith(this.data.meta.start), "counterType" in this.data.meta && this.data.meta.counterType !== void 0 && this.changeCounters(this.data.meta.counterType), this.listWrapper;
  }
  /**
   * Function that is responsible for list content saving
   * @param wrapper - optional argument wrapper
   * @returns whole list saved data if wrapper not passes, otherwise will return data of the passed wrapper
   */
  save(t) {
    const n = t ?? this.listWrapper, r = (l2) => y2(l2).map((o2) => {
      const d2 = C(o2), u3 = this.renderer.getItemContent(o2), p = this.renderer.getItemMeta(o2), g3 = d2 ? r(d2) : [];
      return {
        content: u3,
        meta: p,
        items: g3
      };
    }), i = n ? r(n) : [];
    let a3 = {
      style: this.data.style,
      meta: {},
      items: i
    };
    return this.data.style === "ordered" && (a3.meta = {
      start: this.data.meta.start,
      counterType: this.data.meta.counterType
    }), a3;
  }
  /**
   * On paste sanitzation config. Allow only tags that are allowed in the Tool.
   * @returns - config that determines tags supposted by paste handler
   * @todo - refactor and move to list instance
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * Method that specified hot to merge two List blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * Content of the first item of the next List would be merged with deepest item in current list
   * Other items of the next List would be appended to the current list without any changes in nesting levels
   * @param data - data of the second list to be merged with current
   */
  merge(t) {
    const n = this.block.holder.querySelectorAll(`.${h2.item}`), r = n[n.length - 1], i = N(r);
    if (r === null || i === null || (i.insertAdjacentHTML("beforeend", t.items[0].content), this.listWrapper === void 0))
      return;
    const a3 = y2(this.listWrapper);
    if (a3.length === 0)
      return;
    const l2 = a3[a3.length - 1];
    let s2 = C(l2);
    const o2 = t.items.shift();
    o2 !== void 0 && (o2.items.length !== 0 && (s2 === null && (s2 = this.renderer.renderWrapper(false)), this.appendItems(o2.items, s2)), t.items.length > 0 && this.appendItems(t.items, this.listWrapper));
  }
  /**
   * On paste callback that is fired from Editor.
   * @param event - event with pasted data
   * @todo - refactor and move to list instance
   */
  onPaste(t) {
    const n = t.detail.data;
    this.data = this.pasteHandler(n);
    const r = this.listWrapper;
    r && r.parentNode && r.parentNode.replaceChild(this.render(), r);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   * @param element - html element that contains whole list
   * @todo - refactor and move to list instance
   */
  pasteHandler(t) {
    const { tagName: n } = t;
    let r = "unordered", i;
    switch (n) {
      case "OL":
        r = "ordered", i = "ol";
        break;
      case "UL":
      case "LI":
        r = "unordered", i = "ul";
    }
    const a3 = {
      style: r,
      meta: {},
      items: []
    };
    r === "ordered" && (this.data.meta.counterType = "numeric", this.data.meta.start = 1);
    const l2 = (s2) => Array.from(s2.querySelectorAll(":scope > li")).map((d2) => {
      const u3 = d2.querySelector(`:scope > ${i}`), p = u3 ? l2(u3) : [];
      return {
        content: d2.innerHTML ?? "",
        meta: {},
        items: p
      };
    });
    return a3.items = l2(t), a3;
  }
  /**
   * Changes ordered list start property value
   * @param index - new value of the start property
   */
  changeStartWith(t) {
    this.listWrapper.style.setProperty("counter-reset", `item ${t - 1}`), this.data.meta.start = t;
  }
  /**
   * Changes ordered list counterType property value
   * @param counterType - new value of the counterType value
   */
  changeCounters(t) {
    this.listWrapper.style.setProperty("--list-counter-type", t), this.data.meta.counterType = t;
  }
  /**
   * Handles Enter keypress
   * @param event - keydown
   */
  enterPressed(t) {
    var s2;
    const n = this.currentItem;
    if (t.stopPropagation(), t.preventDefault(), t.isComposing || n === null)
      return;
    const r = ((s2 = this.renderer) == null ? void 0 : s2.getItemContent(n).trim().length) === 0, i = n.parentNode === this.listWrapper, a3 = n.previousElementSibling === null, l2 = this.api.blocks.getCurrentBlockIndex();
    if (i && r)
      if (lr2(n) && !sr2(n)) {
        a3 ? this.convertItemToDefaultBlock(l2, true) : this.convertItemToDefaultBlock();
        return;
      } else {
        this.splitList(n);
        return;
      }
    else if (r) {
      this.unshiftItem(n);
      return;
    } else
      this.splitItem(n);
  }
  /**
   * Handle backspace
   * @param event - keydown
   */
  backspace(t) {
    var r;
    const n = this.currentItem;
    if (n !== null && j2.isCaretAtStartOfInput(n) && ((r = window.getSelection()) == null ? void 0 : r.isCollapsed) !== false) {
      if (t.stopPropagation(), n.parentNode === this.listWrapper && n.previousElementSibling === null) {
        this.convertFirstItemToDefaultBlock();
        return;
      }
      t.preventDefault(), this.mergeItemWithPrevious(n);
    }
  }
  /**
   * Reduce indentation for current item
   * @param event - keydown
   */
  shiftTab(t) {
    t.stopPropagation(), t.preventDefault(), this.currentItem !== null && this.unshiftItem(this.currentItem);
  }
  /**
   * Decrease indentation of the passed item
   * @param item - list item to be unshifted
   */
  unshiftItem(t) {
    if (!t.parentNode || !O(t.parentNode))
      return;
    const n = t.parentNode.closest(`.${h2.item}`);
    if (!n)
      return;
    let r = C(t);
    if (t.parentElement === null)
      return;
    const i = U2(t);
    i !== null && (r === null && (r = this.renderer.renderWrapper(false)), i.forEach((a3) => {
      r.appendChild(a3);
    }), t.appendChild(r)), n.after(t), E2(t, false), K2(n);
  }
  /**
   * Method that is used for list splitting and moving trailing items to the new separated list
   * @param item - current item html element
   */
  splitList(t) {
    const n = y2(t), r = this.block, i = this.api.blocks.getCurrentBlockIndex();
    if (n.length !== 0) {
      const o2 = n[0];
      this.unshiftItem(o2), E2(t, false);
    }
    if (t.previousElementSibling === null && t.parentNode === this.listWrapper) {
      this.convertItemToDefaultBlock(i);
      return;
    }
    const a3 = U2(t);
    if (a3 === null)
      return;
    const l2 = this.renderer.renderWrapper(true);
    a3.forEach((o2) => {
      l2.appendChild(o2);
    });
    const s2 = this.save(l2);
    s2.meta.start = this.data.style == "ordered" ? 1 : void 0, this.api.blocks.insert(r == null ? void 0 : r.name, s2, this.config, i + 1), this.convertItemToDefaultBlock(i + 1), l2.remove();
  }
  /**
   * Method that is used for splitting item content and moving trailing content to the new sibling item
   * @param currentItem - current item html element
   */
  splitItem(t) {
    const [n, r] = j2.getCaretNodeAndOffset();
    if (n === null)
      return;
    const i = N(t);
    let a3;
    i === null ? a3 = "" : a3 = j2.getContenteditableSlice(i, n, r, "right", true);
    const l2 = C(t), s2 = this.renderItem(a3);
    t == null || t.after(s2), l2 && s2.appendChild(l2), E2(s2);
  }
  /**
   * Method that is used for merging current item with previous one
   * Content of the current item would be appended to the previous item
   * Current item children would not change nesting level
   * @param item - current item html element
   */
  mergeItemWithPrevious(t) {
    const n = t.previousElementSibling, r = t.parentNode;
    if (r === null || !O(r))
      return;
    const i = r.closest(`.${h2.item}`);
    if (!n && !i || n && !O(n))
      return;
    let a3;
    if (n) {
      const p = y2(n, false);
      p.length !== 0 && p.length !== 0 ? a3 = p[p.length - 1] : a3 = n;
    } else
      a3 = i;
    const l2 = this.renderer.getItemContent(t);
    if (!a3)
      return;
    E2(a3, false);
    const s2 = N(a3);
    if (s2 === null)
      return;
    s2.insertAdjacentHTML("beforeend", l2);
    const o2 = y2(t);
    if (o2.length === 0) {
      t.remove(), K2(a3);
      return;
    }
    const d2 = n || i, u3 = C(d2) ?? this.renderer.renderWrapper(false);
    n ? o2.forEach((p) => {
      u3.appendChild(p);
    }) : o2.forEach((p) => {
      u3.prepend(p);
    }), C(d2) === null && a3.appendChild(u3), t.remove();
  }
  /**
   * Add indentation to current item
   * @param event - keydown
   */
  addTab(t) {
    var a3;
    t.stopPropagation(), t.preventDefault();
    const n = this.currentItem;
    if (!n)
      return;
    if (((a3 = this.config) == null ? void 0 : a3.maxLevel) !== void 0) {
      const l2 = this.currentItemLevel;
      if (l2 !== null && l2 === this.config.maxLevel)
        return;
    }
    const r = n.previousSibling;
    if (r === null || !O(r))
      return;
    const i = C(r);
    if (i)
      i.appendChild(n), y2(n).forEach((s2) => {
        i.appendChild(s2);
      });
    else {
      const l2 = this.renderer.renderWrapper(false);
      l2.appendChild(n), y2(n).forEach((o2) => {
        l2.appendChild(o2);
      }), r.appendChild(l2);
    }
    K2(n), E2(n, false);
  }
  /**
   * Convert current item to default block with passed index
   * @param newBloxkIndex - optional parameter represents index, where would be inseted default block
   * @param removeList - optional parameter, that represents condition, if List should be removed
   */
  convertItemToDefaultBlock(t, n) {
    let r;
    const i = this.currentItem, a3 = i !== null ? this.renderer.getItemContent(i) : "";
    n === true && this.api.blocks.delete(), t !== void 0 ? r = this.api.blocks.insert(void 0, { text: a3 }, void 0, t) : r = this.api.blocks.insert(), i == null || i.remove(), this.api.caret.setToBlock(r, "start");
  }
  /**
   * Convert first item of the list to default block
   * This method could be called when backspace button pressed at start of the first item of the list
   * First item of the list would be converted to the paragraph and first item children would be unshifted
   */
  convertFirstItemToDefaultBlock() {
    const t = this.currentItem;
    if (t === null)
      return;
    const n = y2(t);
    if (n.length !== 0) {
      const l2 = n[0];
      this.unshiftItem(l2), E2(t);
    }
    const r = U2(t), i = this.api.blocks.getCurrentBlockIndex(), a3 = r === null;
    this.convertItemToDefaultBlock(i, a3);
  }
  /**
   * Method that calls render function of the renderer with a necessary item meta cast
   * @param itemContent - content to be rendered in new item
   * @param meta - meta used in list item rendering
   * @returns html element of the rendered item
   */
  renderItem(t, n) {
    const r = n ?? this.renderer.composeDefaultMeta();
    switch (true) {
      case this.renderer instanceof v2:
        return this.renderer.renderItem(t, r);
      case this.renderer instanceof b2:
        return this.renderer.renderItem(t, r);
      default:
        return this.renderer.renderItem(t, r);
    }
  }
  /**
   * Renders children list
   * @param items - list data used in item rendering
   * @param parentElement - where to append passed items
   */
  appendItems(t, n) {
    t.forEach((r) => {
      var a3;
      const i = this.renderItem(r.content, r.meta);
      if (n.appendChild(i), r.items.length) {
        const l2 = (a3 = this.renderer) == null ? void 0 : a3.renderWrapper(false);
        this.appendItems(r.items, l2), i.appendChild(l2);
      }
    });
  }
};
var I = {
  wrapper: `${m}-start-with-field`,
  input: `${m}-start-with-field__input`,
  startWithElementWrapperInvalid: `${m}-start-with-field--invalid`
};
function or2(e, { value: t, placeholder: n, attributes: r, sanitize: i }) {
  const a3 = c.make("div", I.wrapper), l2 = c.make("input", I.input, {
    placeholder: n,
    /**
     * Used to prevent focusing on the input by Tab key
     * (Popover in the Toolbar lays below the blocks,
     * so Tab in the last block will focus this hidden input if this property is not set)
     */
    tabIndex: -1,
    /**
     * Value of the start property, if it is not specified, then it is set to one
     */
    value: t
  });
  for (const s2 in r)
    l2.setAttribute(s2, r[s2]);
  return a3.appendChild(l2), l2.addEventListener("input", () => {
    i !== void 0 && (l2.value = i(l2.value));
    const s2 = l2.checkValidity();
    !s2 && !a3.classList.contains(I.startWithElementWrapperInvalid) && a3.classList.add(I.startWithElementWrapperInvalid), s2 && a3.classList.contains(I.startWithElementWrapperInvalid) && a3.classList.remove(I.startWithElementWrapperInvalid), s2 && e(l2.value);
  }), a3;
}
var P2 = /* @__PURE__ */ new Map([
  /**
   * Value that represents default arabic numbers for counters
   */
  ["Numeric", "numeric"],
  /**
   * Value that represents lower roman numbers for counteres
   */
  ["Lower Roman", "lower-roman"],
  /**
   * Value that represents upper roman numbers for counters
   */
  ["Upper Roman", "upper-roman"],
  /**
   * Value that represents lower alpha characters for counters
   */
  ["Lower Alpha", "lower-alpha"],
  /**
   * Value that represents upper alpha characters for counters
   */
  ["Upper Alpha", "upper-alpha"]
]);
var He2 = /* @__PURE__ */ new Map([
  /**
   * Value that represents Icon for Numeric counter type
   */
  ["numeric", St2],
  /**
   * Value that represents Icon for Lower Roman counter type
   */
  ["lower-roman", Ot2],
  /**
   * Value that represents Icon for Upper Roman counter type
   */
  ["upper-roman", kt2],
  /**
   * Value that represents Icon for Lower Alpha counter type
   */
  ["lower-alpha", Et2],
  /**
   * Value that represents Icon for Upper Alpha counter type
   */
  ["upper-alpha", _t2]
]);
function ur2(e) {
  return e.replace(/\D+/g, "");
}
function cr2(e) {
  return typeof e.items[0] == "string";
}
function dr2(e) {
  return !("meta" in e);
}
function fr2(e) {
  return typeof e.items[0] != "string" && "text" in e.items[0] && "checked" in e.items[0] && typeof e.items[0].text == "string" && typeof e.items[0].checked == "boolean";
}
function pr2(e) {
  const t = [];
  return cr2(e) ? (e.items.forEach((n) => {
    t.push({
      content: n,
      meta: {},
      items: []
    });
  }), {
    style: e.style,
    meta: {},
    items: t
  }) : fr2(e) ? (e.items.forEach((n) => {
    t.push({
      content: n.text,
      meta: {
        checked: n.checked
      },
      items: []
    });
  }), {
    style: "checklist",
    meta: {},
    items: t
  }) : dr2(e) ? {
    style: e.style,
    meta: {},
    items: e.items
  } : structuredClone(e);
}
var G2 = class _G {
  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return true;
  }
  /**
   * Allow to use native Enter behaviour
   */
  static get enableLineBreaks() {
    return true;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */
  static get toolbox() {
    return [
      {
        icon: $e2,
        title: "Unordered List",
        data: {
          style: "unordered"
        }
      },
      {
        icon: Be2,
        title: "Ordered List",
        data: {
          style: "ordered"
        }
      },
      {
        icon: Ae2,
        title: "Checklist",
        data: {
          style: "checklist"
        }
      }
    ];
  }
  /**
   * On paste sanitzation config. Allow only tags that are allowed in the Tool.
   * @returns - paste config object used in editor
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * Convert from text to list with import and export list to text
   */
  static get conversionConfig() {
    return {
      export: (t) => _G.joinRecursive(t),
      import: (t, n) => ({
        meta: {},
        items: [
          {
            content: t,
            meta: {},
            items: []
          }
        ],
        style: (n == null ? void 0 : n.defaultStyle) !== void 0 ? n.defaultStyle : "unordered"
      })
    };
  }
  /**
   * Get list style name
   */
  get listStyle() {
    return this.data.style || this.defaultListStyle;
  }
  /**
   * Set list style
   * @param style - new style to set
   */
  set listStyle(t) {
    var r;
    this.data.style = t, this.changeTabulatorByStyle();
    const n = this.list.render();
    (r = this.listElement) == null || r.replaceWith(n), this.listElement = n;
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   * @param params - tool constructor options
   * @param params.data - previously saved data
   * @param params.config - user config for Tool
   * @param params.api - Editor.js API
   * @param params.readOnly - read-only mode flag
   */
  constructor({ data: t, config: n, api: r, readOnly: i, block: a3 }) {
    var s2;
    this.api = r, this.readOnly = i, this.config = n, this.block = a3, this.defaultListStyle = ((s2 = this.config) == null ? void 0 : s2.defaultStyle) || "unordered", this.defaultCounterTypes = this.config.counterTypes || Array.from(P2.values());
    const l2 = {
      style: this.defaultListStyle,
      meta: {},
      items: []
    };
    this.data = Object.keys(t).length ? pr2(t) : l2, this.listStyle === "ordered" && this.data.meta.counterType === void 0 && (this.data.meta.counterType = "numeric"), this.changeTabulatorByStyle();
  }
  /**
   * Convert from list to text for conversionConfig
   * @param data - current data of the list
   * @returns - string of the recursively merged contents of the items of the list
   */
  static joinRecursive(t) {
    return t.items.map((n) => `${n.content} ${_G.joinRecursive(n)}`).join("");
  }
  /**
   * Function that is responsible for content rendering
   * @returns rendered list wrapper with all contents
   */
  render() {
    return this.listElement = this.list.render(), this.listElement;
  }
  /**
   * Function that is responsible for content saving
   * @returns formatted content used in editor
   */
  save() {
    return this.data = this.list.save(), this.data;
  }
  /**
   * Function that is responsible for mergind two lists into one
   * @param data - data of the next standing list, that should be merged with current
   */
  merge(t) {
    this.list.merge(t);
  }
  /**
   * Creates Block Tune allowing to change the list style
   * @returns array of tune configs
   */
  renderSettings() {
    const t = [
      {
        label: this.api.i18n.t("Unordered"),
        icon: $e2,
        closeOnActivate: true,
        isActive: this.listStyle == "unordered",
        onActivate: () => {
          this.listStyle = "unordered";
        }
      },
      {
        label: this.api.i18n.t("Ordered"),
        icon: Be2,
        closeOnActivate: true,
        isActive: this.listStyle == "ordered",
        onActivate: () => {
          this.listStyle = "ordered";
        }
      },
      {
        label: this.api.i18n.t("Checklist"),
        icon: Ae2,
        closeOnActivate: true,
        isActive: this.listStyle == "checklist",
        onActivate: () => {
          this.listStyle = "checklist";
        }
      }
    ];
    if (this.listStyle === "ordered") {
      const n = or2(
        (a3) => this.changeStartWith(Number(a3)),
        {
          value: String(this.data.meta.start ?? 1),
          placeholder: "",
          attributes: {
            required: "true"
          },
          sanitize: (a3) => ur2(a3)
        }
      ), r = [
        {
          label: this.api.i18n.t("Start with"),
          icon: It2,
          children: {
            items: [
              {
                element: n,
                // @ts-expect-error ts(2820) can not use PopoverItem enum from editor.js types
                type: "html"
              }
            ]
          }
        }
      ], i = {
        label: this.api.i18n.t("Counter type"),
        icon: He2.get(this.data.meta.counterType),
        children: {
          items: []
        }
      };
      P2.forEach((a3, l2) => {
        const s2 = P2.get(l2);
        this.defaultCounterTypes.includes(s2) && i.children.items.push({
          title: this.api.i18n.t(l2),
          icon: He2.get(s2),
          isActive: this.data.meta.counterType === P2.get(l2),
          closeOnActivate: true,
          onActivate: () => {
            this.changeCounters(P2.get(l2));
          }
        });
      }), i.children.items.length > 1 && r.push(i), t.push({ type: "separator" }, ...r);
    }
    return t;
  }
  /**
   * On paste callback that is fired from Editor.
   * @param event - event with pasted data
   */
  onPaste(t) {
    const { tagName: n } = t.detail.data;
    switch (n) {
      case "OL":
        this.listStyle = "ordered";
        break;
      case "UL":
      case "LI":
        this.listStyle = "unordered";
    }
    this.list.onPaste(t);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   * @param element - html element that contains whole list
   */
  pasteHandler(t) {
    return this.list.pasteHandler(t);
  }
  /**
   * Changes ordered list counterType property value
   * @param counterType - new value of the counterType value
   */
  changeCounters(t) {
    var n;
    (n = this.list) == null || n.changeCounters(t), this.data.meta.counterType = t;
  }
  /**
   * Changes ordered list start property value
   * @param index - new value of the start property
   */
  changeStartWith(t) {
    var n;
    (n = this.list) == null || n.changeStartWith(t), this.data.meta.start = t;
  }
  /**
   * This method allows changing tabulator respectfully to passed style
   */
  changeTabulatorByStyle() {
    switch (this.listStyle) {
      case "ordered":
        this.list = new z2(
          {
            data: this.data,
            readOnly: this.readOnly,
            api: this.api,
            config: this.config,
            block: this.block
          },
          new v2(this.readOnly, this.config)
        );
        break;
      case "unordered":
        this.list = new z2(
          {
            data: this.data,
            readOnly: this.readOnly,
            api: this.api,
            config: this.config,
            block: this.block
          },
          new b2(this.readOnly, this.config)
        );
        break;
      case "checklist":
        this.list = new z2(
          {
            data: this.data,
            readOnly: this.readOnly,
            api: this.api,
            config: this.config,
            block: this.block
          },
          new f(this.readOnly, this.config)
        );
        break;
    }
  }
};

// node_modules/@editorjs/image/dist/image.mjs
(function() {
  "use strict";
  try {
    if (typeof document < "u") {
      var o2 = document.createElement("style");
      o2.appendChild(document.createTextNode('.image-tool{--bg-color: #cdd1e0;--front-color: #388ae5;--border-color: #e8e8eb}.image-tool__image{border-radius:3px;overflow:hidden;margin-bottom:10px;padding-bottom:0}.image-tool__image-picture{max-width:100%;vertical-align:bottom;display:block}.image-tool__image-preloader{width:50px;height:50px;border-radius:50%;background-size:cover;margin:auto;position:relative;background-color:var(--bg-color);background-position:center center}.image-tool__image-preloader:after{content:"";position:absolute;z-index:3;width:60px;height:60px;border-radius:50%;border:2px solid var(--bg-color);border-top-color:var(--front-color);left:50%;top:50%;margin-top:-30px;margin-left:-30px;animation:image-preloader-spin 2s infinite linear;box-sizing:border-box}.image-tool__caption{visibility:hidden;position:absolute;bottom:0;left:0;margin-bottom:10px}.image-tool__caption[contentEditable=true][data-placeholder]:before{position:absolute!important;content:attr(data-placeholder);color:#707684;font-weight:400;display:none}.image-tool__caption[contentEditable=true][data-placeholder]:empty:before{display:block}.image-tool__caption[contentEditable=true][data-placeholder]:empty:focus:before{display:none}.image-tool--empty .image-tool__image,.image-tool--empty .image-tool__image-preloader{display:none}.image-tool--empty .image-tool__caption,.image-tool--uploading .image-tool__caption{visibility:hidden!important}.image-tool .cdx-button{display:flex;align-items:center;justify-content:center}.image-tool .cdx-button svg{height:auto;margin:0 6px 0 0}.image-tool--filled .cdx-button,.image-tool--filled .image-tool__image-preloader{display:none}.image-tool--uploading .image-tool__image{min-height:200px;display:flex;border:1px solid var(--border-color);background-color:#fff}.image-tool--uploading .image-tool__image-picture,.image-tool--uploading .cdx-button{display:none}.image-tool--withBorder .image-tool__image{border:1px solid var(--border-color)}.image-tool--withBackground .image-tool__image{padding:15px;background:var(--bg-color)}.image-tool--withBackground .image-tool__image-picture{max-width:60%;margin:0 auto}.image-tool--stretched .image-tool__image-picture{width:100%}.image-tool--caption .image-tool__caption{visibility:visible}.image-tool--caption{padding-bottom:50px}@keyframes image-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')), document.head.appendChild(o2);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
var R3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19V19C9.13623 19 8.20435 19 7.46927 18.6955C6.48915 18.2895 5.71046 17.5108 5.30448 16.5307C5 15.7956 5 14.8638 5 13V12C5 9.19108 5 7.78661 5.67412 6.77772C5.96596 6.34096 6.34096 5.96596 6.77772 5.67412C7.78661 5 9.19108 5 12 5H13.5C14.8956 5 15.5933 5 16.1611 5.17224C17.4395 5.56004 18.44 6.56046 18.8278 7.83886C19 8.40666 19 9.10444 19 10.5V10.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.5 17.5L17.5 6.5"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 10.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.9919 19H11.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13L13 5"/></svg>';
var I2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 9.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 5H14.5096"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.625 5H15C17.2091 5 19 6.79086 19 9V9.375"/><path stroke="currentColor" stroke-width="2" d="M9.375 5L9 5C6.79086 5 5 6.79086 5 9V9.375"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 5H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9.5H5.00957"/><path stroke="currentColor" stroke-width="2" d="M9.375 19H9C6.79086 19 5 17.2091 5 15V14.625"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 19H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14.55H5.00957"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/></svg>';
var L3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"/></svg>';
var x2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>';
var B2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
function S3(C3, i = null, a3 = {}) {
  const s2 = document.createElement(C3);
  Array.isArray(i) ? s2.classList.add(...i) : i !== null && s2.classList.add(i);
  for (const r in a3)
    a3.hasOwnProperty(r) && (s2[r] = a3[r]);
  return s2;
}
var _2 = /* @__PURE__ */ ((C3) => (C3.Empty = "empty", C3.Uploading = "uploading", C3.Filled = "filled", C3))(_2 || {});
var D3 = class {
  /**
   * @param ui - image tool Ui module
   * @param ui.api - Editor.js API
   * @param ui.config - user config
   * @param ui.onSelectFile - callback for clicks on Select file button
   * @param ui.readOnly - read-only mode flag
   */
  constructor({ api: i, config: a3, onSelectFile: s2, readOnly: r }) {
    this.api = i, this.config = a3, this.onSelectFile = s2, this.readOnly = r, this.nodes = {
      wrapper: S3("div", [this.CSS.baseClass, this.CSS.wrapper]),
      imageContainer: S3("div", [this.CSS.imageContainer]),
      fileButton: this.createFileButton(),
      imageEl: void 0,
      imagePreloader: S3("div", this.CSS.imagePreloader),
      caption: S3("div", [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly
      })
    }, this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder, this.nodes.imageContainer.appendChild(this.nodes.imagePreloader), this.nodes.wrapper.appendChild(this.nodes.imageContainer), this.nodes.wrapper.appendChild(this.nodes.caption), this.nodes.wrapper.appendChild(this.nodes.fileButton);
  }
  /**
   * Apply visual representation of activated tune
   * @param tuneName - one of available tunes {@link Tunes.tunes}
   * @param status - true for enable, false for disable
   */
  applyTune(i, a3) {
    this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${i}`, a3);
  }
  /**
   * Renders tool UI
   */
  render() {
    return this.toggleStatus(
      "empty"
      /* Empty */
    ), this.nodes.wrapper;
  }
  /**
   * Shows uploading preloader
   * @param src - preview source
   */
  showPreloader(i) {
    this.nodes.imagePreloader.style.backgroundImage = `url(${i})`, this.toggleStatus(
      "uploading"
      /* Uploading */
    );
  }
  /**
   * Hide uploading preloader
   */
  hidePreloader() {
    this.nodes.imagePreloader.style.backgroundImage = "", this.toggleStatus(
      "empty"
      /* Empty */
    );
  }
  /**
   * Shows an image
   * @param url - image source
   */
  fillImage(i) {
    const a3 = /\.mp4$/.test(i) ? "VIDEO" : "IMG", s2 = {
      src: i
    };
    let r = "load";
    a3 === "VIDEO" && (s2.autoplay = true, s2.loop = true, s2.muted = true, s2.playsinline = true, r = "loadeddata"), this.nodes.imageEl = S3(a3, this.CSS.imageEl, s2), this.nodes.imageEl.addEventListener(r, () => {
      this.toggleStatus(
        "filled"
        /* Filled */
      ), this.nodes.imagePreloader !== void 0 && (this.nodes.imagePreloader.style.backgroundImage = "");
    }), this.nodes.imageContainer.appendChild(this.nodes.imageEl);
  }
  /**
   * Shows caption input
   * @param text - caption content text
   */
  fillCaption(i) {
    this.nodes.caption !== void 0 && (this.nodes.caption.innerHTML = i);
  }
  /**
   * Changes UI status
   * @param status - see {@link Ui.status} constants
   */
  toggleStatus(i) {
    for (const a3 in _2)
      if (Object.prototype.hasOwnProperty.call(_2, a3)) {
        const s2 = _2[a3];
        this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${s2}`, s2 === i);
      }
  }
  /**
   * CSS classes
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,
      /**
       * Tool's classes
       */
      wrapper: "image-tool",
      imageContainer: "image-tool__image",
      imagePreloader: "image-tool__image-preloader",
      imageEl: "image-tool__image-picture",
      caption: "image-tool__caption"
    };
  }
  /**
   * Creates upload-file button
   */
  createFileButton() {
    const i = S3("div", [this.CSS.button]);
    return i.innerHTML = this.config.buttonContent ?? `${L3} ${this.api.i18n.t("Select an Image")}`, i.addEventListener("click", () => {
      this.onSelectFile();
    }), i;
  }
};
function U3(C3) {
  return C3 && C3.__esModule && Object.prototype.hasOwnProperty.call(C3, "default") ? C3.default : C3;
}
var H2 = { exports: {} };
(function(C3, i) {
  (function(a3, s2) {
    C3.exports = s2();
  })(window, function() {
    return (function(a3) {
      var s2 = {};
      function r(o2) {
        if (s2[o2]) return s2[o2].exports;
        var e = s2[o2] = { i: o2, l: false, exports: {} };
        return a3[o2].call(e.exports, e, e.exports, r), e.l = true, e.exports;
      }
      return r.m = a3, r.c = s2, r.d = function(o2, e, d2) {
        r.o(o2, e) || Object.defineProperty(o2, e, { enumerable: true, get: d2 });
      }, r.r = function(o2) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(o2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o2, "__esModule", { value: true });
      }, r.t = function(o2, e) {
        if (1 & e && (o2 = r(o2)), 8 & e || 4 & e && typeof o2 == "object" && o2 && o2.__esModule) return o2;
        var d2 = /* @__PURE__ */ Object.create(null);
        if (r.r(d2), Object.defineProperty(d2, "default", { enumerable: true, value: o2 }), 2 & e && typeof o2 != "string") for (var v4 in o2) r.d(d2, v4, (function(l2) {
          return o2[l2];
        }).bind(null, v4));
        return d2;
      }, r.n = function(o2) {
        var e = o2 && o2.__esModule ? function() {
          return o2.default;
        } : function() {
          return o2;
        };
        return r.d(e, "a", e), e;
      }, r.o = function(o2, e) {
        return Object.prototype.hasOwnProperty.call(o2, e);
      }, r.p = "", r(r.s = 3);
    })([function(a3, s2) {
      var r;
      r = /* @__PURE__ */ (function() {
        return this;
      })();
      try {
        r = r || new Function("return this")();
      } catch {
        typeof window == "object" && (r = window);
      }
      a3.exports = r;
    }, function(a3, s2, r) {
      (function(o2) {
        var e = r(2), d2 = setTimeout;
        function v4() {
        }
        function l2(n) {
          if (!(this instanceof l2)) throw new TypeError("Promises must be constructed via new");
          if (typeof n != "function") throw new TypeError("not a function");
          this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], t(n, this);
        }
        function f3(n, c3) {
          for (; n._state === 3; ) n = n._value;
          n._state !== 0 ? (n._handled = true, l2._immediateFn(function() {
            var u3 = n._state === 1 ? c3.onFulfilled : c3.onRejected;
            if (u3 !== null) {
              var g3;
              try {
                g3 = u3(n._value);
              } catch (m3) {
                return void y4(c3.promise, m3);
              }
              p(c3.promise, g3);
            } else (n._state === 1 ? p : y4)(c3.promise, n._value);
          })) : n._deferreds.push(c3);
        }
        function p(n, c3) {
          try {
            if (c3 === n) throw new TypeError("A promise cannot be resolved with itself.");
            if (c3 && (typeof c3 == "object" || typeof c3 == "function")) {
              var u3 = c3.then;
              if (c3 instanceof l2) return n._state = 3, n._value = c3, void w2(n);
              if (typeof u3 == "function") return void t((g3 = u3, m3 = c3, function() {
                g3.apply(m3, arguments);
              }), n);
            }
            n._state = 1, n._value = c3, w2(n);
          } catch (h3) {
            y4(n, h3);
          }
          var g3, m3;
        }
        function y4(n, c3) {
          n._state = 2, n._value = c3, w2(n);
        }
        function w2(n) {
          n._state === 2 && n._deferreds.length === 0 && l2._immediateFn(function() {
            n._handled || l2._unhandledRejectionFn(n._value);
          });
          for (var c3 = 0, u3 = n._deferreds.length; c3 < u3; c3++) f3(n, n._deferreds[c3]);
          n._deferreds = null;
        }
        function b4(n, c3, u3) {
          this.onFulfilled = typeof n == "function" ? n : null, this.onRejected = typeof c3 == "function" ? c3 : null, this.promise = u3;
        }
        function t(n, c3) {
          var u3 = false;
          try {
            n(function(g3) {
              u3 || (u3 = true, p(c3, g3));
            }, function(g3) {
              u3 || (u3 = true, y4(c3, g3));
            });
          } catch (g3) {
            if (u3) return;
            u3 = true, y4(c3, g3);
          }
        }
        l2.prototype.catch = function(n) {
          return this.then(null, n);
        }, l2.prototype.then = function(n, c3) {
          var u3 = new this.constructor(v4);
          return f3(this, new b4(n, c3, u3)), u3;
        }, l2.prototype.finally = e.a, l2.all = function(n) {
          return new l2(function(c3, u3) {
            if (!n || n.length === void 0) throw new TypeError("Promise.all accepts an array");
            var g3 = Array.prototype.slice.call(n);
            if (g3.length === 0) return c3([]);
            var m3 = g3.length;
            function h3(T3, E4) {
              try {
                if (E4 && (typeof E4 == "object" || typeof E4 == "function")) {
                  var M3 = E4.then;
                  if (typeof M3 == "function") return void M3.call(E4, function(F3) {
                    h3(T3, F3);
                  }, u3);
                }
                g3[T3] = E4, --m3 == 0 && c3(g3);
              } catch (F3) {
                u3(F3);
              }
            }
            for (var k3 = 0; k3 < g3.length; k3++) h3(k3, g3[k3]);
          });
        }, l2.resolve = function(n) {
          return n && typeof n == "object" && n.constructor === l2 ? n : new l2(function(c3) {
            c3(n);
          });
        }, l2.reject = function(n) {
          return new l2(function(c3, u3) {
            u3(n);
          });
        }, l2.race = function(n) {
          return new l2(function(c3, u3) {
            for (var g3 = 0, m3 = n.length; g3 < m3; g3++) n[g3].then(c3, u3);
          });
        }, l2._immediateFn = typeof o2 == "function" && function(n) {
          o2(n);
        } || function(n) {
          d2(n, 0);
        }, l2._unhandledRejectionFn = function(n) {
          typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", n);
        }, s2.a = l2;
      }).call(this, r(5).setImmediate);
    }, function(a3, s2, r) {
      s2.a = function(o2) {
        var e = this.constructor;
        return this.then(function(d2) {
          return e.resolve(o2()).then(function() {
            return d2;
          });
        }, function(d2) {
          return e.resolve(o2()).then(function() {
            return e.reject(d2);
          });
        });
      };
    }, function(a3, s2, r) {
      function o2(t) {
        return (o2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
          return typeof n;
        } : function(n) {
          return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        })(t);
      }
      r(4);
      var e, d2, v4, l2, f3, p, y4, w2 = r(8), b4 = (d2 = function(t) {
        return new Promise(function(n, c3) {
          t = l2(t), (t = f3(t)).beforeSend && t.beforeSend();
          var u3 = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
          u3.open(t.method, t.url), u3.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(t.headers).forEach(function(m3) {
            var h3 = t.headers[m3];
            u3.setRequestHeader(m3, h3);
          });
          var g3 = t.ratio;
          u3.upload.addEventListener("progress", function(m3) {
            var h3 = Math.round(m3.loaded / m3.total * 100), k3 = Math.ceil(h3 * g3 / 100);
            t.progress(Math.min(k3, 100));
          }, false), u3.addEventListener("progress", function(m3) {
            var h3 = Math.round(m3.loaded / m3.total * 100), k3 = Math.ceil(h3 * (100 - g3) / 100) + g3;
            t.progress(Math.min(k3, 100));
          }, false), u3.onreadystatechange = function() {
            if (u3.readyState === 4) {
              var m3 = u3.response;
              try {
                m3 = JSON.parse(m3);
              } catch {
              }
              var h3 = w2.parseHeaders(u3.getAllResponseHeaders()), k3 = { body: m3, code: u3.status, headers: h3 };
              y4(u3.status) ? n(k3) : c3(k3);
            }
          }, u3.send(t.data);
        });
      }, v4 = function(t) {
        return t.method = "POST", d2(t);
      }, l2 = function() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (t.url && typeof t.url != "string") throw new Error("Url must be a string");
        if (t.url = t.url || "", t.method && typeof t.method != "string") throw new Error("`method` must be a string or null");
        if (t.method = t.method ? t.method.toUpperCase() : "GET", t.headers && o2(t.headers) !== "object") throw new Error("`headers` must be an object or null");
        if (t.headers = t.headers || {}, t.type && (typeof t.type != "string" || !Object.values(e).includes(t.type))) throw new Error("`type` must be taken from module's \xABcontentType\xBB library");
        if (t.progress && typeof t.progress != "function") throw new Error("`progress` must be a function or null");
        if (t.progress = t.progress || function(n) {
        }, t.beforeSend = t.beforeSend || function(n) {
        }, t.ratio && typeof t.ratio != "number") throw new Error("`ratio` must be a number");
        if (t.ratio < 0 || t.ratio > 100) throw new Error("`ratio` must be in a 0-100 interval");
        if (t.ratio = t.ratio || 90, t.accept && typeof t.accept != "string") throw new Error("`accept` must be a string with a list of allowed mime-types");
        if (t.accept = t.accept || "*/*", t.multiple && typeof t.multiple != "boolean") throw new Error("`multiple` must be a true or false");
        if (t.multiple = t.multiple || false, t.fieldName && typeof t.fieldName != "string") throw new Error("`fieldName` must be a string");
        return t.fieldName = t.fieldName || "files", t;
      }, f3 = function(t) {
        switch (t.method) {
          case "GET":
            var n = p(t.data, e.URLENCODED);
            delete t.data, t.url = /\?/.test(t.url) ? t.url + "&" + n : t.url + "?" + n;
            break;
          case "POST":
          case "PUT":
          case "DELETE":
          case "UPDATE":
            var c3 = (function() {
              return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).type || e.JSON;
            })(t);
            (w2.isFormData(t.data) || w2.isFormElement(t.data)) && (c3 = e.FORM), t.data = p(t.data, c3), c3 !== b4.contentType.FORM && (t.headers["content-type"] = c3);
        }
        return t;
      }, p = function() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        switch (arguments.length > 1 ? arguments[1] : void 0) {
          case e.URLENCODED:
            return w2.urlEncode(t);
          case e.JSON:
            return w2.jsonEncode(t);
          case e.FORM:
            return w2.formEncode(t);
          default:
            return t;
        }
      }, y4 = function(t) {
        return t >= 200 && t < 300;
      }, { contentType: e = { URLENCODED: "application/x-www-form-urlencoded; charset=utf-8", FORM: "multipart/form-data", JSON: "application/json; charset=utf-8" }, request: d2, get: function(t) {
        return t.method = "GET", d2(t);
      }, post: v4, transport: function(t) {
        return t = l2(t), w2.selectFiles(t).then(function(n) {
          for (var c3 = new FormData(), u3 = 0; u3 < n.length; u3++) c3.append(t.fieldName, n[u3], n[u3].name);
          w2.isObject(t.data) && Object.keys(t.data).forEach(function(m3) {
            var h3 = t.data[m3];
            c3.append(m3, h3);
          });
          var g3 = t.beforeSend;
          return t.beforeSend = function() {
            return g3(n);
          }, t.data = c3, v4(t);
        });
      }, selectFiles: function(t) {
        return delete (t = l2(t)).beforeSend, w2.selectFiles(t);
      } });
      a3.exports = b4;
    }, function(a3, s2, r) {
      r.r(s2);
      var o2 = r(1);
      window.Promise = window.Promise || o2.a;
    }, function(a3, s2, r) {
      (function(o2) {
        var e = o2 !== void 0 && o2 || typeof self < "u" && self || window, d2 = Function.prototype.apply;
        function v4(l2, f3) {
          this._id = l2, this._clearFn = f3;
        }
        s2.setTimeout = function() {
          return new v4(d2.call(setTimeout, e, arguments), clearTimeout);
        }, s2.setInterval = function() {
          return new v4(d2.call(setInterval, e, arguments), clearInterval);
        }, s2.clearTimeout = s2.clearInterval = function(l2) {
          l2 && l2.close();
        }, v4.prototype.unref = v4.prototype.ref = function() {
        }, v4.prototype.close = function() {
          this._clearFn.call(e, this._id);
        }, s2.enroll = function(l2, f3) {
          clearTimeout(l2._idleTimeoutId), l2._idleTimeout = f3;
        }, s2.unenroll = function(l2) {
          clearTimeout(l2._idleTimeoutId), l2._idleTimeout = -1;
        }, s2._unrefActive = s2.active = function(l2) {
          clearTimeout(l2._idleTimeoutId);
          var f3 = l2._idleTimeout;
          f3 >= 0 && (l2._idleTimeoutId = setTimeout(function() {
            l2._onTimeout && l2._onTimeout();
          }, f3));
        }, r(6), s2.setImmediate = typeof self < "u" && self.setImmediate || o2 !== void 0 && o2.setImmediate || this && this.setImmediate, s2.clearImmediate = typeof self < "u" && self.clearImmediate || o2 !== void 0 && o2.clearImmediate || this && this.clearImmediate;
      }).call(this, r(0));
    }, function(a3, s2, r) {
      (function(o2, e) {
        (function(d2, v4) {
          if (!d2.setImmediate) {
            var l2, f3, p, y4, w2, b4 = 1, t = {}, n = false, c3 = d2.document, u3 = Object.getPrototypeOf && Object.getPrototypeOf(d2);
            u3 = u3 && u3.setTimeout ? u3 : d2, {}.toString.call(d2.process) === "[object process]" ? l2 = function(h3) {
              e.nextTick(function() {
                m3(h3);
              });
            } : (function() {
              if (d2.postMessage && !d2.importScripts) {
                var h3 = true, k3 = d2.onmessage;
                return d2.onmessage = function() {
                  h3 = false;
                }, d2.postMessage("", "*"), d2.onmessage = k3, h3;
              }
            })() ? (y4 = "setImmediate$" + Math.random() + "$", w2 = function(h3) {
              h3.source === d2 && typeof h3.data == "string" && h3.data.indexOf(y4) === 0 && m3(+h3.data.slice(y4.length));
            }, d2.addEventListener ? d2.addEventListener("message", w2, false) : d2.attachEvent("onmessage", w2), l2 = function(h3) {
              d2.postMessage(y4 + h3, "*");
            }) : d2.MessageChannel ? ((p = new MessageChannel()).port1.onmessage = function(h3) {
              m3(h3.data);
            }, l2 = function(h3) {
              p.port2.postMessage(h3);
            }) : c3 && "onreadystatechange" in c3.createElement("script") ? (f3 = c3.documentElement, l2 = function(h3) {
              var k3 = c3.createElement("script");
              k3.onreadystatechange = function() {
                m3(h3), k3.onreadystatechange = null, f3.removeChild(k3), k3 = null;
              }, f3.appendChild(k3);
            }) : l2 = function(h3) {
              setTimeout(m3, 0, h3);
            }, u3.setImmediate = function(h3) {
              typeof h3 != "function" && (h3 = new Function("" + h3));
              for (var k3 = new Array(arguments.length - 1), T3 = 0; T3 < k3.length; T3++) k3[T3] = arguments[T3 + 1];
              var E4 = { callback: h3, args: k3 };
              return t[b4] = E4, l2(b4), b4++;
            }, u3.clearImmediate = g3;
          }
          function g3(h3) {
            delete t[h3];
          }
          function m3(h3) {
            if (n) setTimeout(m3, 0, h3);
            else {
              var k3 = t[h3];
              if (k3) {
                n = true;
                try {
                  (function(T3) {
                    var E4 = T3.callback, M3 = T3.args;
                    switch (M3.length) {
                      case 0:
                        E4();
                        break;
                      case 1:
                        E4(M3[0]);
                        break;
                      case 2:
                        E4(M3[0], M3[1]);
                        break;
                      case 3:
                        E4(M3[0], M3[1], M3[2]);
                        break;
                      default:
                        E4.apply(v4, M3);
                    }
                  })(k3);
                } finally {
                  g3(h3), n = false;
                }
              }
            }
          }
        })(typeof self > "u" ? o2 === void 0 ? this : o2 : self);
      }).call(this, r(0), r(7));
    }, function(a3, s2) {
      var r, o2, e = a3.exports = {};
      function d2() {
        throw new Error("setTimeout has not been defined");
      }
      function v4() {
        throw new Error("clearTimeout has not been defined");
      }
      function l2(u3) {
        if (r === setTimeout) return setTimeout(u3, 0);
        if ((r === d2 || !r) && setTimeout) return r = setTimeout, setTimeout(u3, 0);
        try {
          return r(u3, 0);
        } catch {
          try {
            return r.call(null, u3, 0);
          } catch {
            return r.call(this, u3, 0);
          }
        }
      }
      (function() {
        try {
          r = typeof setTimeout == "function" ? setTimeout : d2;
        } catch {
          r = d2;
        }
        try {
          o2 = typeof clearTimeout == "function" ? clearTimeout : v4;
        } catch {
          o2 = v4;
        }
      })();
      var f3, p = [], y4 = false, w2 = -1;
      function b4() {
        y4 && f3 && (y4 = false, f3.length ? p = f3.concat(p) : w2 = -1, p.length && t());
      }
      function t() {
        if (!y4) {
          var u3 = l2(b4);
          y4 = true;
          for (var g3 = p.length; g3; ) {
            for (f3 = p, p = []; ++w2 < g3; ) f3 && f3[w2].run();
            w2 = -1, g3 = p.length;
          }
          f3 = null, y4 = false, (function(m3) {
            if (o2 === clearTimeout) return clearTimeout(m3);
            if ((o2 === v4 || !o2) && clearTimeout) return o2 = clearTimeout, clearTimeout(m3);
            try {
              o2(m3);
            } catch {
              try {
                return o2.call(null, m3);
              } catch {
                return o2.call(this, m3);
              }
            }
          })(u3);
        }
      }
      function n(u3, g3) {
        this.fun = u3, this.array = g3;
      }
      function c3() {
      }
      e.nextTick = function(u3) {
        var g3 = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var m3 = 1; m3 < arguments.length; m3++) g3[m3 - 1] = arguments[m3];
        p.push(new n(u3, g3)), p.length !== 1 || y4 || l2(t);
      }, n.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, e.title = "browser", e.browser = true, e.env = {}, e.argv = [], e.version = "", e.versions = {}, e.on = c3, e.addListener = c3, e.once = c3, e.off = c3, e.removeListener = c3, e.removeAllListeners = c3, e.emit = c3, e.prependListener = c3, e.prependOnceListener = c3, e.listeners = function(u3) {
        return [];
      }, e.binding = function(u3) {
        throw new Error("process.binding is not supported");
      }, e.cwd = function() {
        return "/";
      }, e.chdir = function(u3) {
        throw new Error("process.chdir is not supported");
      }, e.umask = function() {
        return 0;
      };
    }, function(a3, s2, r) {
      function o2(d2, v4) {
        for (var l2 = 0; l2 < v4.length; l2++) {
          var f3 = v4[l2];
          f3.enumerable = f3.enumerable || false, f3.configurable = true, "value" in f3 && (f3.writable = true), Object.defineProperty(d2, f3.key, f3);
        }
      }
      var e = r(9);
      a3.exports = (function() {
        function d2() {
          (function(p, y4) {
            if (!(p instanceof y4)) throw new TypeError("Cannot call a class as a function");
          })(this, d2);
        }
        var v4, l2, f3;
        return v4 = d2, f3 = [{ key: "urlEncode", value: function(p) {
          return e(p);
        } }, { key: "jsonEncode", value: function(p) {
          return JSON.stringify(p);
        } }, { key: "formEncode", value: function(p) {
          if (this.isFormData(p)) return p;
          if (this.isFormElement(p)) return new FormData(p);
          if (this.isObject(p)) {
            var y4 = new FormData();
            return Object.keys(p).forEach(function(w2) {
              var b4 = p[w2];
              y4.append(w2, b4);
            }), y4;
          }
          throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement");
        } }, { key: "isObject", value: function(p) {
          return Object.prototype.toString.call(p) === "[object Object]";
        } }, { key: "isFormData", value: function(p) {
          return p instanceof FormData;
        } }, { key: "isFormElement", value: function(p) {
          return p instanceof HTMLFormElement;
        } }, { key: "selectFiles", value: function() {
          var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return new Promise(function(y4, w2) {
            var b4 = document.createElement("INPUT");
            b4.type = "file", p.multiple && b4.setAttribute("multiple", "multiple"), p.accept && b4.setAttribute("accept", p.accept), b4.style.display = "none", document.body.appendChild(b4), b4.addEventListener("change", function(t) {
              var n = t.target.files;
              y4(n), document.body.removeChild(b4);
            }, false), b4.click();
          });
        } }, { key: "parseHeaders", value: function(p) {
          var y4 = p.trim().split(/[\r\n]+/), w2 = {};
          return y4.forEach(function(b4) {
            var t = b4.split(": "), n = t.shift(), c3 = t.join(": ");
            n && (w2[n] = c3);
          }), w2;
        } }], (l2 = null) && o2(v4.prototype, l2), f3 && o2(v4, f3), d2;
      })();
    }, function(a3, s2) {
      var r = function(e) {
        return encodeURIComponent(e).replace(/[!'()*]/g, escape).replace(/%20/g, "+");
      }, o2 = function(e, d2, v4, l2) {
        return d2 = d2 || null, v4 = v4 || "&", l2 = l2 || null, e ? (function(f3) {
          for (var p = new Array(), y4 = 0; y4 < f3.length; y4++) f3[y4] && p.push(f3[y4]);
          return p;
        })(Object.keys(e).map(function(f3) {
          var p, y4, w2 = f3;
          if (l2 && (w2 = l2 + "[" + w2 + "]"), typeof e[f3] == "object" && e[f3] !== null) p = o2(e[f3], null, v4, w2);
          else {
            d2 && (y4 = w2, w2 = !isNaN(parseFloat(y4)) && isFinite(y4) ? d2 + Number(w2) : w2);
            var b4 = e[f3];
            b4 = (b4 = (b4 = (b4 = b4 === true ? "1" : b4) === false ? "0" : b4) === 0 ? "0" : b4) || "", p = r(w2) + "=" + r(b4);
          }
          return p;
        })).join(v4).replace(/[!'()*]/g, "") : "";
      };
      a3.exports = o2;
    }]);
  });
})(H2);
var q2 = H2.exports;
var j3 = /* @__PURE__ */ U3(q2);
function O2(C3) {
  return C3 !== void 0 && typeof C3.then == "function";
}
var A3 = class {
  /**
   * @param params - uploader module params
   * @param params.config - image tool config
   * @param params.onUpload - one callback for all uploading (file, url, d-n-d, pasting)
   * @param params.onError - callback for uploading errors
   */
  constructor({ config: i, onUpload: a3, onError: s2 }) {
    this.config = i, this.onUpload = a3, this.onError = s2;
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.transport()
   * @param onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview: i }) {
    const a3 = function(r) {
      const o2 = new FileReader();
      o2.readAsDataURL(r), o2.onload = (e) => {
        i(e.target.result);
      };
    };
    let s2;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile == "function") {
      const r = this.config.uploader.uploadByFile;
      s2 = j3.selectFiles({ accept: this.config.types ?? "image/*" }).then((o2) => {
        a3(o2[0]);
        const e = r(o2[0]);
        return O2(e) || console.warn("Custom uploader method uploadByFile should return a Promise"), e;
      });
    } else
      s2 = j3.transport({
        url: this.config.endpoints.byFile,
        data: this.config.additionalRequestData,
        accept: this.config.types ?? "image/*",
        headers: this.config.additionalRequestHeaders,
        beforeSend: (r) => {
          a3(r[0]);
        },
        fieldName: this.config.field ?? "image"
      }).then((r) => r.body);
    s2.then((r) => {
      this.onUpload(r);
    }).catch((r) => {
      this.onError(r);
    });
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   * @param url - image source url
   */
  uploadByUrl(i) {
    let a3;
    this.config.uploader && typeof this.config.uploader.uploadByUrl == "function" ? (a3 = this.config.uploader.uploadByUrl(i), O2(a3) || console.warn("Custom uploader method uploadByUrl should return a Promise")) : a3 = j3.post({
      url: this.config.endpoints.byUrl,
      data: Object.assign({
        url: i
      }, this.config.additionalRequestData),
      type: j3.contentType.JSON,
      headers: this.config.additionalRequestHeaders
    }).then((s2) => s2.body), a3.then((s2) => {
      this.onUpload(s2);
    }).catch((s2) => {
      this.onError(s2);
    });
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   * @param file - file pasted by drag-n-drop
   * @param onPreview - file pasted by drag-n-drop
   */
  uploadByFile(i, { onPreview: a3 }) {
    const s2 = new FileReader();
    s2.readAsDataURL(i), s2.onload = (o2) => {
      a3(o2.target.result);
    };
    let r;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile == "function")
      r = this.config.uploader.uploadByFile(i), O2(r) || console.warn("Custom uploader method uploadByFile should return a Promise");
    else {
      const o2 = new FormData();
      o2.append(this.config.field ?? "image", i), this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length && Object.entries(this.config.additionalRequestData).forEach(([e, d2]) => {
        o2.append(e, d2);
      }), r = j3.post({
        url: this.config.endpoints.byFile,
        data: o2,
        type: j3.contentType.JSON,
        headers: this.config.additionalRequestHeaders
      }).then((e) => e.body);
    }
    r.then((o2) => {
      this.onUpload(o2);
    }).catch((o2) => {
      this.onError(o2);
    });
  }
};
var P3 = class _P {
  /**
   * @param tool - tool properties got from editor.js
   * @param tool.data - previously saved data
   * @param tool.config - user config for Tool
   * @param tool.api - Editor.js API
   * @param tool.readOnly - read-only mode flag
   * @param tool.block - current Block API
   */
  constructor({ data: i, config: a3, api: s2, readOnly: r, block: o2 }) {
    this.isCaptionEnabled = null, this.api = s2, this.block = o2, this.config = {
      endpoints: a3.endpoints,
      additionalRequestData: a3.additionalRequestData,
      additionalRequestHeaders: a3.additionalRequestHeaders,
      field: a3.field,
      types: a3.types,
      captionPlaceholder: this.api.i18n.t(a3.captionPlaceholder ?? "Caption"),
      buttonContent: a3.buttonContent,
      uploader: a3.uploader,
      actions: a3.actions,
      features: a3.features || {}
    }, this.uploader = new A3({
      config: this.config,
      onUpload: (e) => this.onUpload(e),
      onError: (e) => this.uploadingFailed(e)
    }), this.ui = new D3({
      api: s2,
      config: this.config,
      onSelectFile: () => {
        this.uploader.uploadSelectedFile({
          onPreview: (e) => {
            this.ui.showPreloader(e);
          }
        });
      },
      readOnly: r
    }), this._data = {
      caption: "",
      withBorder: false,
      withBackground: false,
      stretched: false,
      file: {
        url: ""
      }
    }, this.data = i;
  }
  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return true;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */
  static get toolbox() {
    return {
      icon: L3,
      title: "Image"
    };
  }
  /**
   * Available image tools
   */
  static get tunes() {
    return [
      {
        name: "withBorder",
        icon: I2,
        title: "With border",
        toggle: true
      },
      {
        name: "stretched",
        icon: x2,
        title: "Stretch image",
        toggle: true
      },
      {
        name: "withBackground",
        icon: R3,
        title: "With background",
        toggle: true
      }
    ];
  }
  /**
   * Renders Block content
   */
  render() {
    var i, a3, s2;
    return (((i = this.config.features) == null ? void 0 : i.caption) === true || ((a3 = this.config.features) == null ? void 0 : a3.caption) === void 0 || ((s2 = this.config.features) == null ? void 0 : s2.caption) === "optional" && this.data.caption) && (this.isCaptionEnabled = true, this.ui.applyTune("caption", true)), this.ui.render();
  }
  /**
   * Validate data: check if Image exists
   * @param savedData — data received after saving
   * @returns false if saved data is not correct, otherwise true
   */
  validate(i) {
    return !!i.file.url;
  }
  /**
   * Return Block data
   */
  save() {
    const i = this.ui.nodes.caption;
    return this._data.caption = i.innerHTML, this.data;
  }
  /**
   * Returns configuration for block tunes: add background, add border, stretch image
   * @returns TunesMenuConfig
   */
  renderSettings() {
    var o2;
    const i = _P.tunes.concat(this.config.actions || []), a3 = {
      border: "withBorder",
      background: "withBackground",
      stretch: "stretched",
      caption: "caption"
    };
    ((o2 = this.config.features) == null ? void 0 : o2.caption) === "optional" && i.push({
      name: "caption",
      icon: B2,
      title: "With caption",
      toggle: true
    });
    const s2 = i.filter((e) => {
      var v4, l2;
      const d2 = Object.keys(a3).find((f3) => a3[f3] === e.name);
      return d2 === "caption" ? ((v4 = this.config.features) == null ? void 0 : v4.caption) !== false : d2 == null || ((l2 = this.config.features) == null ? void 0 : l2[d2]) !== false;
    }), r = (e) => {
      let d2 = this.data[e.name];
      return e.name === "caption" && (d2 = this.isCaptionEnabled ?? d2), d2;
    };
    return s2.map((e) => ({
      icon: e.icon,
      label: this.api.i18n.t(e.title),
      name: e.name,
      toggle: e.toggle,
      isActive: r(e),
      onActivate: () => {
        if (typeof e.action == "function") {
          e.action(e.name);
          return;
        }
        let d2 = !r(e);
        e.name === "caption" && (this.isCaptionEnabled = !(this.isCaptionEnabled ?? false), d2 = this.isCaptionEnabled), this.tuneToggled(e.name, d2);
      }
    }));
  }
  /**
   * Fires after clicks on the Toolbox Image Icon
   * Initiates click on the Select File button
   */
  appendCallback() {
    this.ui.nodes.fileButton.click();
  }
  /**
   * Specify paste substitutes
   * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
   */
  static get pasteConfig() {
    return {
      /**
       * Paste HTML into Editor
       */
      tags: [
        {
          img: { src: true }
        }
      ],
      /**
       * Paste URL of image into the Editor
       */
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|svg|webp)(\?[a-z0-9=]*)?$/i
      },
      /**
       * Drag n drop file from into the Editor
       */
      files: {
        mimeTypes: ["image/*"]
      }
    };
  }
  /**
   * Specify paste handlers
   * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
   * @param event - editor.js custom paste event
   *                              {@link https://github.com/codex-team/editor.js/blob/master/types/tools/paste-events.d.ts}
   */
  async onPaste(i) {
    switch (i.type) {
      case "tag": {
        const a3 = i.detail.data;
        if (/^blob:/.test(a3.src)) {
          const r = await (await fetch(a3.src)).blob();
          this.uploadFile(r);
          break;
        }
        this.uploadUrl(a3.src);
        break;
      }
      case "pattern": {
        const a3 = i.detail.data;
        this.uploadUrl(a3);
        break;
      }
      case "file": {
        const a3 = i.detail.file;
        this.uploadFile(a3);
        break;
      }
    }
  }
  /**
   * Private methods
   * ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿
   */
  /**
   * Stores all Tool's data
   * @param data - data in Image Tool format
   */
  set data(i) {
    var a3;
    this.image = i.file, this._data.caption = i.caption || "", this.ui.fillCaption(this._data.caption), _P.tunes.forEach(({ name: s2 }) => {
      const r = typeof i[s2] < "u" ? i[s2] === true || i[s2] === "true" : false;
      this.setTune(s2, r);
    }), i.caption ? this.setTune("caption", true) : ((a3 = this.config.features) == null ? void 0 : a3.caption) === true && this.setTune("caption", true);
  }
  /**
   * Return Tool data
   */
  get data() {
    return this._data;
  }
  /**
   * Set new image file
   * @param file - uploaded file data
   */
  set image(i) {
    this._data.file = i || { url: "" }, i && i.url && this.ui.fillImage(i.url);
  }
  /**
   * File uploading callback
   * @param response - uploading server response
   */
  onUpload(i) {
    i.success && i.file ? this.image = i.file : this.uploadingFailed("incorrect response: " + JSON.stringify(i));
  }
  /**
   * Handle uploader errors
   * @param errorText - uploading error info
   */
  uploadingFailed(i) {
    console.log("Image Tool: uploading failed because of", i), this.api.notifier.show({
      message: this.api.i18n.t("Couldn\u2019t upload image. Please try another."),
      style: "error"
    }), this.ui.hidePreloader();
  }
  /**
   * Callback fired when Block Tune is activated
   * @param tuneName - tune that has been clicked
   * @param state - new state
   */
  tuneToggled(i, a3) {
    i === "caption" ? (this.ui.applyTune(i, a3), a3 == false && (this._data.caption = "", this.ui.fillCaption(""))) : this.setTune(i, a3);
  }
  /**
   * Set one tune
   * @param tuneName - {@link Tunes.tunes}
   * @param value - tune state
   */
  setTune(i, a3) {
    this._data[i] = a3, this.ui.applyTune(i, a3), i === "stretched" && Promise.resolve().then(() => {
      this.block.stretched = a3;
    }).catch((s2) => {
      console.error(s2);
    });
  }
  /**
   * Show preloader and upload image file
   * @param file - file that is currently uploading (from paste)
   */
  uploadFile(i) {
    this.uploader.uploadByFile(i, {
      onPreview: (a3) => {
        this.ui.showPreloader(a3);
      }
    });
  }
  /**
   * Show preloader and upload image by target url
   * @param url - url pasted
   */
  uploadUrl(i) {
    this.ui.showPreloader(i), this.uploader.uploadByUrl(i);
  }
};

// node_modules/@editorjs/table/dist/table.mjs
(function() {
  var r;
  "use strict";
  try {
    if (typeof document < "u") {
      var o2 = document.createElement("style");
      o2.nonce = (r = document.head.querySelector("meta[property=csp-nonce]")) == null ? void 0 : r.content, o2.appendChild(document.createTextNode('.tc-wrap{--color-background:#f9f9fb;--color-text-secondary:#7b7e89;--color-border:#e8e8eb;--cell-size:34px;--toolbox-icon-size:18px;--toolbox-padding:6px;--toolbox-aiming-field-size:calc(var(--toolbox-icon-size) + var(--toolbox-padding)*2);border-left:0;position:relative;height:100%;width:100%;margin-top:var(--toolbox-icon-size);box-sizing:border-box;display:grid;grid-template-columns:calc(100% - var(--cell-size)) var(--cell-size);z-index:0}.tc-wrap--readonly{grid-template-columns:100% var(--cell-size)}.tc-wrap svg{vertical-align:top}@media print{.tc-wrap{border-left-color:var(--color-border);border-left-style:solid;border-left-width:1px;grid-template-columns:100% var(--cell-size)}}@media print{.tc-wrap .tc-row:after{display:none}}.tc-table{position:relative;width:100%;height:100%;display:grid;font-size:14px;border-top:1px solid var(--color-border);line-height:1.4}.tc-table:after{width:calc(var(--cell-size));height:100%;left:calc(var(--cell-size)*-1);top:0}.tc-table:after,.tc-table:before{position:absolute;content:""}.tc-table:before{width:100%;height:var(--toolbox-aiming-field-size);top:calc(var(--toolbox-aiming-field-size)*-1);left:0}.tc-table--heading .tc-row:first-child{font-weight:600;border-bottom:2px solid var(--color-border);position:sticky;top:0;z-index:2;background:var(--color-background)}.tc-table--heading .tc-row:first-child [contenteditable]:empty:before{content:attr(heading);color:var(--color-text-secondary)}.tc-table--heading .tc-row:first-child:after{bottom:-2px;border-bottom:2px solid var(--color-border)}.tc-add-column,.tc-add-row{display:flex;color:var(--color-text-secondary)}@media print{.tc-add{display:none}}.tc-add-column{display:grid;border-top:1px solid var(--color-border);grid-template-columns:var(--cell-size);grid-auto-rows:var(--cell-size);place-items:center}.tc-add-column svg{padding:5px;position:sticky;top:0;background-color:var(--color-background)}.tc-add-column--disabled{visibility:hidden}@media print{.tc-add-column{display:none}}.tc-add-row{height:var(--cell-size);align-items:center;padding-left:4px;position:relative}.tc-add-row--disabled{display:none}.tc-add-row:before{content:"";position:absolute;right:calc(var(--cell-size)*-1);width:var(--cell-size);height:100%}@media print{.tc-add-row{display:none}}.tc-add-column,.tc-add-row{transition:0s;cursor:pointer;will-change:background-color}.tc-add-column:hover,.tc-add-row:hover{transition:background-color .1s ease;background-color:var(--color-background)}.tc-add-row{margin-top:1px}.tc-add-row:hover:before{transition:.1s;background-color:var(--color-background)}.tc-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(10px,1fr));position:relative;border-bottom:1px solid var(--color-border)}.tc-row:after{content:"";pointer-events:none;position:absolute;width:var(--cell-size);height:100%;bottom:-1px;right:calc(var(--cell-size)*-1);border-bottom:1px solid var(--color-border)}.tc-row--selected{background:var(--color-background)}.tc-row--selected:after{background:var(--color-background)}.tc-cell{border-right:1px solid var(--color-border);padding:6px 12px;overflow:hidden;outline:none;line-break:normal}.tc-cell--selected{background:var(--color-background)}.tc-wrap--readonly .tc-row:after{display:none}.tc-toolbox{--toolbox-padding:6px;--popover-margin:30px;--toggler-click-zone-size:30px;--toggler-dots-color:#7b7e89;--toggler-dots-color-hovered:#1d202b;position:absolute;cursor:pointer;z-index:1;opacity:0;transition:opacity .1s;will-change:left,opacity}.tc-toolbox--column{top:calc(var(--toggler-click-zone-size)*-1);transform:translate(calc(var(--toggler-click-zone-size)*-1/2));will-change:left,opacity}.tc-toolbox--row{left:calc(var(--popover-margin)*-1);transform:translateY(calc(var(--toggler-click-zone-size)*-1/2));margin-top:-1px;will-change:top,opacity}.tc-toolbox--showed{opacity:1}.tc-toolbox .tc-popover{position:absolute;top:0;left:var(--popover-margin)}.tc-toolbox__toggler{display:flex;align-items:center;justify-content:center;width:var(--toggler-click-zone-size);height:var(--toggler-click-zone-size);color:var(--toggler-dots-color);opacity:0;transition:opacity .15s ease;will-change:opacity}.tc-toolbox__toggler:hover{color:var(--toggler-dots-color-hovered)}.tc-toolbox__toggler svg{fill:currentColor}.tc-wrap:hover .tc-toolbox__toggler{opacity:1}.tc-settings .cdx-settings-button{width:50%;margin:0}.tc-popover{--color-border:#eaeaea;--color-background:#fff;--color-background-hover:rgba(232,232,235,.49);--color-background-confirm:#e24a4a;--color-background-confirm-hover:#d54040;--color-text-confirm:#fff;background:var(--color-background);border:1px solid var(--color-border);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;padding:6px;display:none;will-change:opacity,transform}.tc-popover--opened{display:block;animation:menuShowing .1s cubic-bezier(.215,.61,.355,1) forwards}.tc-popover__item{display:flex;align-items:center;padding:2px 14px 2px 2px;border-radius:5px;cursor:pointer;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;user-select:none}.tc-popover__item:hover{background:var(--color-background-hover)}.tc-popover__item:not(:last-of-type){margin-bottom:2px}.tc-popover__item-icon{display:inline-flex;width:26px;height:26px;align-items:center;justify-content:center;background:var(--color-background);border-radius:5px;border:1px solid var(--color-border);margin-right:8px}.tc-popover__item-label{line-height:22px;font-size:14px;font-weight:500}.tc-popover__item--confirm{background:var(--color-background-confirm);color:var(--color-text-confirm)}.tc-popover__item--confirm:hover{background-color:var(--color-background-confirm-hover)}.tc-popover__item--confirm .tc-popover__item-icon{background:var(--color-background-confirm);border-color:#0000001a}.tc-popover__item--confirm .tc-popover__item-icon svg{transition:transform .2s ease-in;transform:rotate(90deg) scale(1.2)}.tc-popover__item--hidden{display:none}@keyframes menuShowing{0%{opacity:0;transform:translateY(-8px) scale(.9)}70%{opacity:1;transform:translateY(2px)}to{transform:translateY(0)}}')), document.head.appendChild(o2);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
function c2(d2, t, e = {}) {
  const o2 = document.createElement(d2);
  Array.isArray(t) ? o2.classList.add(...t) : t && o2.classList.add(t);
  for (const i in e)
    Object.prototype.hasOwnProperty.call(e, i) && (o2[i] = e[i]);
  return o2;
}
function f2(d2) {
  const t = d2.getBoundingClientRect();
  return {
    y1: Math.floor(t.top + window.pageYOffset),
    x1: Math.floor(t.left + window.pageXOffset),
    x2: Math.floor(t.right + window.pageXOffset),
    y2: Math.floor(t.bottom + window.pageYOffset)
  };
}
function g2(d2, t) {
  const e = f2(d2), o2 = f2(t);
  return {
    fromTopBorder: o2.y1 - e.y1,
    fromLeftBorder: o2.x1 - e.x1,
    fromRightBorder: e.x2 - o2.x2,
    fromBottomBorder: e.y2 - o2.y2
  };
}
function k2(d2, t) {
  const e = d2.getBoundingClientRect(), { width: o2, height: i, x: n, y: r } = e, { clientX: h3, clientY: l2 } = t;
  return {
    width: o2,
    height: i,
    x: h3 - n,
    y: l2 - r
  };
}
function m2(d2, t) {
  return t.parentNode.insertBefore(d2, t);
}
function C2(d2, t = true) {
  const e = document.createRange(), o2 = window.getSelection();
  e.selectNodeContents(d2), e.collapse(t), o2.removeAllRanges(), o2.addRange(e);
}
var a2 = class _a2 {
  /**
   * @param {object} options - constructor options
   * @param {PopoverItem[]} options.items - constructor options
   */
  constructor({ items: t }) {
    this.items = t, this.wrapper = void 0, this.itemEls = [];
  }
  /**
   * Set of CSS classnames used in popover
   *
   * @returns {object}
   */
  static get CSS() {
    return {
      popover: "tc-popover",
      popoverOpened: "tc-popover--opened",
      item: "tc-popover__item",
      itemHidden: "tc-popover__item--hidden",
      itemConfirmState: "tc-popover__item--confirm",
      itemIcon: "tc-popover__item-icon",
      itemLabel: "tc-popover__item-label"
    };
  }
  /**
   * Returns the popover element
   *
   * @returns {Element}
   */
  render() {
    return this.wrapper = c2("div", _a2.CSS.popover), this.items.forEach((t, e) => {
      const o2 = c2("div", _a2.CSS.item), i = c2("div", _a2.CSS.itemIcon, {
        innerHTML: t.icon
      }), n = c2("div", _a2.CSS.itemLabel, {
        textContent: t.label
      });
      o2.dataset.index = e, o2.appendChild(i), o2.appendChild(n), this.wrapper.appendChild(o2), this.itemEls.push(o2);
    }), this.wrapper.addEventListener("click", (t) => {
      this.popoverClicked(t);
    }), this.wrapper;
  }
  /**
   * Popover wrapper click listener
   * Used to delegate clicks in items
   *
   * @returns {void}
   */
  popoverClicked(t) {
    const e = t.target.closest(`.${_a2.CSS.item}`);
    if (!e)
      return;
    const o2 = e.dataset.index, i = this.items[o2];
    if (i.confirmationRequired && !this.hasConfirmationState(e)) {
      this.setConfirmationState(e);
      return;
    }
    i.onClick();
  }
  /**
   * Enable the confirmation state on passed item
   *
   * @returns {void}
   */
  setConfirmationState(t) {
    t.classList.add(_a2.CSS.itemConfirmState);
  }
  /**
   * Disable the confirmation state on passed item
   *
   * @returns {void}
   */
  clearConfirmationState(t) {
    t.classList.remove(_a2.CSS.itemConfirmState);
  }
  /**
   * Check if passed item has the confirmation state
   *
   * @returns {boolean}
   */
  hasConfirmationState(t) {
    return t.classList.contains(_a2.CSS.itemConfirmState);
  }
  /**
   * Return an opening state
   *
   * @returns {boolean}
   */
  get opened() {
    return this.wrapper.classList.contains(_a2.CSS.popoverOpened);
  }
  /**
   * Opens the popover
   *
   * @returns {void}
   */
  open() {
    this.items.forEach((t, e) => {
      typeof t.hideIf == "function" && this.itemEls[e].classList.toggle(_a2.CSS.itemHidden, t.hideIf());
    }), this.wrapper.classList.add(_a2.CSS.popoverOpened);
  }
  /**
   * Closes the popover
   *
   * @returns {void}
   */
  close() {
    this.wrapper.classList.remove(_a2.CSS.popoverOpened), this.itemEls.forEach((t) => {
      this.clearConfirmationState(t);
    });
  }
};
var R4 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L10 12M10 12L7 15M10 12H4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L14 12M14 12L17 15M14 12H20"/></svg>';
var b3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>';
var x3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.8833 9.16666L18.2167 12.5M18.2167 12.5L14.8833 15.8333M18.2167 12.5H10.05C9.16594 12.5 8.31809 12.1488 7.69297 11.5237C7.06785 10.8986 6.71666 10.0507 6.71666 9.16666"/></svg>';
var S4 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.9167 14.9167L11.5833 18.25M11.5833 18.25L8.25 14.9167M11.5833 18.25L11.5833 10.0833C11.5833 9.19928 11.9345 8.35143 12.5596 7.72631C13.1848 7.10119 14.0326 6.75 14.9167 6.75"/></svg>';
var y3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.13333 14.9167L12.4667 18.25M12.4667 18.25L15.8 14.9167M12.4667 18.25L12.4667 10.0833C12.4667 9.19928 12.1155 8.35143 11.4904 7.72631C10.8652 7.10119 10.0174 6.75 9.13333 6.75"/></svg>';
var L4 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.8833 15.8333L18.2167 12.5M18.2167 12.5L14.8833 9.16667M18.2167 12.5L10.05 12.5C9.16595 12.5 8.31811 12.8512 7.69299 13.4763C7.06787 14.1014 6.71667 14.9493 6.71667 15.8333"/></svg>';
var M2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.41 9.66H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 9.66H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.31 14.36H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 14.36H14.59"/></svg>';
var v3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>';
var O3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>';
var T2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M5 10H19"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>';
var H3 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M10 5V18.5"/><path stroke="currentColor" stroke-width="2" d="M14 5V18.5"/><path stroke="currentColor" stroke-width="2" d="M5 10H19"/><path stroke="currentColor" stroke-width="2" d="M5 14H19"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>';
var A4 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M10 5V18.5"/><path stroke="currentColor" stroke-width="2" d="M5 10H19"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>';
var w = class _w {
  /**
   * Creates toolbox buttons and toolbox menus
   *
   * @param {Object} config
   * @param {any} config.api - Editor.js api
   * @param {PopoverItem[]} config.items - Editor.js api
   * @param {function} config.onOpen - callback fired when the Popover is opening
   * @param {function} config.onClose - callback fired when the Popover is closing
   * @param {string} config.cssModifier - the modifier for the Toolbox. Allows to add some specific styles.
   */
  constructor({ api: t, items: e, onOpen: o2, onClose: i, cssModifier: n = "" }) {
    this.api = t, this.items = e, this.onOpen = o2, this.onClose = i, this.cssModifier = n, this.popover = null, this.wrapper = this.createToolbox();
  }
  /**
   * Style classes
   */
  static get CSS() {
    return {
      toolbox: "tc-toolbox",
      toolboxShowed: "tc-toolbox--showed",
      toggler: "tc-toolbox__toggler"
    };
  }
  /**
   * Returns rendered Toolbox element
   */
  get element() {
    return this.wrapper;
  }
  /**
   * Creating a toolbox to open menu for a manipulating columns
   *
   * @returns {Element}
   */
  createToolbox() {
    const t = c2("div", [
      _w.CSS.toolbox,
      this.cssModifier ? `${_w.CSS.toolbox}--${this.cssModifier}` : ""
    ]);
    t.dataset.mutationFree = "true";
    const e = this.createPopover(), o2 = this.createToggler();
    return t.appendChild(o2), t.appendChild(e), t;
  }
  /**
   * Creates the Toggler
   *
   * @returns {Element}
   */
  createToggler() {
    const t = c2("div", _w.CSS.toggler, {
      innerHTML: M2
    });
    return t.addEventListener("click", () => {
      this.togglerClicked();
    }), t;
  }
  /**
   * Creates the Popover instance and render it
   *
   * @returns {Element}
   */
  createPopover() {
    return this.popover = new a2({
      items: this.items
    }), this.popover.render();
  }
  /**
   * Toggler click handler. Opens/Closes the popover
   *
   * @returns {void}
   */
  togglerClicked() {
    this.popover.opened ? (this.popover.close(), this.onClose()) : (this.popover.open(), this.onOpen());
  }
  /**
   * Shows the Toolbox
   *
   * @param {function} computePositionMethod - method that returns the position coordinate
   * @returns {void}
   */
  show(t) {
    const e = t();
    Object.entries(e).forEach(([o2, i]) => {
      this.wrapper.style[o2] = i;
    }), this.wrapper.classList.add(_w.CSS.toolboxShowed);
  }
  /**
   * Hides the Toolbox
   *
   * @returns {void}
   */
  hide() {
    this.popover.close(), this.wrapper.classList.remove(_w.CSS.toolboxShowed);
  }
};
function B3(d2, t) {
  let e = 0;
  return function(...o2) {
    const i = (/* @__PURE__ */ new Date()).getTime();
    if (!(i - e < d2))
      return e = i, t(...o2);
  };
}
var s = {
  wrapper: "tc-wrap",
  wrapperReadOnly: "tc-wrap--readonly",
  table: "tc-table",
  row: "tc-row",
  withHeadings: "tc-table--heading",
  rowSelected: "tc-row--selected",
  cell: "tc-cell",
  cellSelected: "tc-cell--selected",
  addRow: "tc-add-row",
  addRowDisabled: "tc-add-row--disabled",
  addColumn: "tc-add-column",
  addColumnDisabled: "tc-add-column--disabled"
};
var E3 = class {
  /**
   * Creates
   *
   * @constructor
   * @param {boolean} readOnly - read-only mode flag
   * @param {object} api - Editor.js API
   * @param {TableData} data - Editor.js API
   * @param {TableConfig} config - Editor.js API
   */
  constructor(t, e, o2, i) {
    this.readOnly = t, this.api = e, this.data = o2, this.config = i, this.wrapper = null, this.table = null, this.toolboxColumn = this.createColumnToolbox(), this.toolboxRow = this.createRowToolbox(), this.createTableWrapper(), this.hoveredRow = 0, this.hoveredColumn = 0, this.selectedRow = 0, this.selectedColumn = 0, this.tunes = {
      withHeadings: false
    }, this.resize(), this.fill(), this.focusedCell = {
      row: 0,
      column: 0
    }, this.documentClicked = (n) => {
      const r = n.target.closest(`.${s.table}`) !== null, h3 = n.target.closest(`.${s.wrapper}`) === null;
      (r || h3) && this.hideToolboxes();
      const u3 = n.target.closest(`.${s.addRow}`), p = n.target.closest(`.${s.addColumn}`);
      u3 && u3.parentNode === this.wrapper ? (this.addRow(void 0, true), this.hideToolboxes()) : p && p.parentNode === this.wrapper && (this.addColumn(void 0, true), this.hideToolboxes());
    }, this.readOnly || this.bindEvents();
  }
  /**
   * Returns the rendered table wrapper
   *
   * @returns {Element}
   */
  getWrapper() {
    return this.wrapper;
  }
  /**
   * Hangs the necessary handlers to events
   */
  bindEvents() {
    document.addEventListener("click", this.documentClicked), this.table.addEventListener("mousemove", B3(150, (t) => this.onMouseMoveInTable(t)), { passive: true }), this.table.onkeypress = (t) => this.onKeyPressListener(t), this.table.addEventListener("keydown", (t) => this.onKeyDownListener(t)), this.table.addEventListener("focusin", (t) => this.focusInTableListener(t));
  }
  /**
   * Configures and creates the toolbox for manipulating with columns
   *
   * @returns {Toolbox}
   */
  createColumnToolbox() {
    return new w({
      api: this.api,
      cssModifier: "column",
      items: [
        {
          label: this.api.i18n.t("Add column to left"),
          icon: S4,
          hideIf: () => this.numberOfColumns === this.config.maxcols,
          onClick: () => {
            this.addColumn(this.selectedColumn, true), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Add column to right"),
          icon: y3,
          hideIf: () => this.numberOfColumns === this.config.maxcols,
          onClick: () => {
            this.addColumn(this.selectedColumn + 1, true), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Delete column"),
          icon: b3,
          hideIf: () => this.numberOfColumns === 1,
          confirmationRequired: true,
          onClick: () => {
            this.deleteColumn(this.selectedColumn), this.hideToolboxes();
          }
        }
      ],
      onOpen: () => {
        this.selectColumn(this.hoveredColumn), this.hideRowToolbox();
      },
      onClose: () => {
        this.unselectColumn();
      }
    });
  }
  /**
   * Configures and creates the toolbox for manipulating with rows
   *
   * @returns {Toolbox}
   */
  createRowToolbox() {
    return new w({
      api: this.api,
      cssModifier: "row",
      items: [
        {
          label: this.api.i18n.t("Add row above"),
          icon: L4,
          hideIf: () => this.numberOfRows === this.config.maxrows,
          onClick: () => {
            this.addRow(this.selectedRow, true), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Add row below"),
          icon: x3,
          hideIf: () => this.numberOfRows === this.config.maxrows,
          onClick: () => {
            this.addRow(this.selectedRow + 1, true), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Delete row"),
          icon: b3,
          hideIf: () => this.numberOfRows === 1,
          confirmationRequired: true,
          onClick: () => {
            this.deleteRow(this.selectedRow), this.hideToolboxes();
          }
        }
      ],
      onOpen: () => {
        this.selectRow(this.hoveredRow), this.hideColumnToolbox();
      },
      onClose: () => {
        this.unselectRow();
      }
    });
  }
  /**
   * When you press enter it moves the cursor down to the next row
   * or creates it if the click occurred on the last one
   */
  moveCursorToNextRow() {
    this.focusedCell.row !== this.numberOfRows ? (this.focusedCell.row += 1, this.focusCell(this.focusedCell)) : (this.addRow(), this.focusedCell.row += 1, this.focusCell(this.focusedCell), this.updateToolboxesPosition(0, 0));
  }
  /**
   * Get table cell by row and col index
   *
   * @param {number} row - cell row coordinate
   * @param {number} column - cell column coordinate
   * @returns {HTMLElement}
   */
  getCell(t, e) {
    return this.table.querySelectorAll(`.${s.row}:nth-child(${t}) .${s.cell}`)[e - 1];
  }
  /**
   * Get table row by index
   *
   * @param {number} row - row coordinate
   * @returns {HTMLElement}
   */
  getRow(t) {
    return this.table.querySelector(`.${s.row}:nth-child(${t})`);
  }
  /**
   * The parent of the cell which is the row
   *
   * @param {HTMLElement} cell - cell element
   * @returns {HTMLElement}
   */
  getRowByCell(t) {
    return t.parentElement;
  }
  /**
   * Ger row's first cell
   *
   * @param {Element} row - row to find its first cell
   * @returns {Element}
   */
  getRowFirstCell(t) {
    return t.querySelector(`.${s.cell}:first-child`);
  }
  /**
   * Set the sell's content by row and column numbers
   *
   * @param {number} row - cell row coordinate
   * @param {number} column - cell column coordinate
   * @param {string} content - cell HTML content
   */
  setCellContent(t, e, o2) {
    const i = this.getCell(t, e);
    i.innerHTML = o2;
  }
  /**
   * Add column in table on index place
   * Add cells in each row
   *
   * @param {number} columnIndex - number in the array of columns, where new column to insert, -1 if insert at the end
   * @param {boolean} [setFocus] - pass true to focus the first cell
   */
  addColumn(t = -1, e = false) {
    var n;
    let o2 = this.numberOfColumns;
    if (this.config && this.config.maxcols && this.numberOfColumns >= this.config.maxcols)
      return;
    for (let r = 1; r <= this.numberOfRows; r++) {
      let h3;
      const l2 = this.createCell();
      if (t > 0 && t <= o2 ? (h3 = this.getCell(r, t), m2(l2, h3)) : h3 = this.getRow(r).appendChild(l2), r === 1) {
        const u3 = this.getCell(r, t > 0 ? t : o2 + 1);
        u3 && e && C2(u3);
      }
    }
    const i = this.wrapper.querySelector(`.${s.addColumn}`);
    (n = this.config) != null && n.maxcols && this.numberOfColumns > this.config.maxcols - 1 && i && i.classList.add(s.addColumnDisabled), this.addHeadingAttrToFirstRow();
  }
  /**
   * Add row in table on index place
   *
   * @param {number} index - number in the array of rows, where new column to insert, -1 if insert at the end
   * @param {boolean} [setFocus] - pass true to focus the inserted row
   * @returns {HTMLElement} row
   */
  addRow(t = -1, e = false) {
    let o2, i = c2("div", s.row);
    this.tunes.withHeadings && this.removeHeadingAttrFromFirstRow();
    let n = this.numberOfColumns;
    if (this.config && this.config.maxrows && this.numberOfRows >= this.config.maxrows && h3)
      return;
    if (t > 0 && t <= this.numberOfRows) {
      let l2 = this.getRow(t);
      o2 = m2(i, l2);
    } else
      o2 = this.table.appendChild(i);
    this.fillRow(o2, n), this.tunes.withHeadings && this.addHeadingAttrToFirstRow();
    const r = this.getRowFirstCell(o2);
    r && e && C2(r);
    const h3 = this.wrapper.querySelector(`.${s.addRow}`);
    return this.config && this.config.maxrows && this.numberOfRows >= this.config.maxrows && h3 && h3.classList.add(s.addRowDisabled), o2;
  }
  /**
   * Delete a column by index
   *
   * @param {number} index
   */
  deleteColumn(t) {
    for (let o2 = 1; o2 <= this.numberOfRows; o2++) {
      const i = this.getCell(o2, t);
      if (!i)
        return;
      i.remove();
    }
    const e = this.wrapper.querySelector(`.${s.addColumn}`);
    e && e.classList.remove(s.addColumnDisabled);
  }
  /**
   * Delete a row by index
   *
   * @param {number} index
   */
  deleteRow(t) {
    this.getRow(t).remove();
    const e = this.wrapper.querySelector(`.${s.addRow}`);
    e && e.classList.remove(s.addRowDisabled), this.addHeadingAttrToFirstRow();
  }
  /**
   * Create a wrapper containing a table, toolboxes
   * and buttons for adding rows and columns
   *
   * @returns {HTMLElement} wrapper - where all buttons for a table and the table itself will be
   */
  createTableWrapper() {
    if (this.wrapper = c2("div", s.wrapper), this.table = c2("div", s.table), this.readOnly && this.wrapper.classList.add(s.wrapperReadOnly), this.wrapper.appendChild(this.toolboxRow.element), this.wrapper.appendChild(this.toolboxColumn.element), this.wrapper.appendChild(this.table), !this.readOnly) {
      const t = c2("div", s.addColumn, {
        innerHTML: v3
      }), e = c2("div", s.addRow, {
        innerHTML: v3
      });
      this.wrapper.appendChild(t), this.wrapper.appendChild(e);
    }
  }
  /**
   * Returns the size of the table based on initial data or config "size" property
   *
   * @return {{rows: number, cols: number}} - number of cols and rows
   */
  computeInitialSize() {
    const t = this.data && this.data.content, e = Array.isArray(t), o2 = e ? t.length : false, i = e ? t.length : void 0, n = o2 ? t[0].length : void 0, r = Number.parseInt(this.config && this.config.rows), h3 = Number.parseInt(this.config && this.config.cols), l2 = !isNaN(r) && r > 0 ? r : void 0, u3 = !isNaN(h3) && h3 > 0 ? h3 : void 0;
    return {
      rows: i || l2 || 2,
      cols: n || u3 || 2
    };
  }
  /**
   * Resize table to match config size or transmitted data size
   *
   * @return {{rows: number, cols: number}} - number of cols and rows
   */
  resize() {
    const { rows: t, cols: e } = this.computeInitialSize();
    for (let o2 = 0; o2 < t; o2++)
      this.addRow();
    for (let o2 = 0; o2 < e; o2++)
      this.addColumn();
  }
  /**
   * Fills the table with data passed to the constructor
   *
   * @returns {void}
   */
  fill() {
    const t = this.data;
    if (t && t.content)
      for (let e = 0; e < t.content.length; e++)
        for (let o2 = 0; o2 < t.content[e].length; o2++)
          this.setCellContent(e + 1, o2 + 1, t.content[e][o2]);
  }
  /**
   * Fills a row with cells
   *
   * @param {HTMLElement} row - row to fill
   * @param {number} numberOfColumns - how many cells should be in a row
   */
  fillRow(t, e) {
    for (let o2 = 1; o2 <= e; o2++) {
      const i = this.createCell();
      t.appendChild(i);
    }
  }
  /**
   * Creating a cell element
   *
   * @return {Element}
   */
  createCell() {
    return c2("div", s.cell, {
      contentEditable: !this.readOnly
    });
  }
  /**
   * Get number of rows in the table
   */
  get numberOfRows() {
    return this.table.childElementCount;
  }
  /**
   * Get number of columns in the table
   */
  get numberOfColumns() {
    return this.numberOfRows ? this.table.querySelectorAll(`.${s.row}:first-child .${s.cell}`).length : 0;
  }
  /**
   * Is the column toolbox menu displayed or not
   *
   * @returns {boolean}
   */
  get isColumnMenuShowing() {
    return this.selectedColumn !== 0;
  }
  /**
   * Is the row toolbox menu displayed or not
   *
   * @returns {boolean}
   */
  get isRowMenuShowing() {
    return this.selectedRow !== 0;
  }
  /**
   * Recalculate position of toolbox icons
   *
   * @param {Event} event - mouse move event
   */
  onMouseMoveInTable(t) {
    const { row: e, column: o2 } = this.getHoveredCell(t);
    this.hoveredColumn = o2, this.hoveredRow = e, this.updateToolboxesPosition();
  }
  /**
   * Prevents default Enter behaviors
   * Adds Shift+Enter processing
   *
   * @param {KeyboardEvent} event - keypress event
   */
  onKeyPressListener(t) {
    if (t.key === "Enter") {
      if (t.shiftKey)
        return true;
      this.moveCursorToNextRow();
    }
    return t.key !== "Enter";
  }
  /**
   * Prevents tab keydown event from bubbling
   * so that it only works inside the table
   *
   * @param {KeyboardEvent} event - keydown event
   */
  onKeyDownListener(t) {
    t.key === "Tab" && t.stopPropagation();
  }
  /**
   * Set the coordinates of the cell that the focus has moved to
   *
   * @param {FocusEvent} event - focusin event
   */
  focusInTableListener(t) {
    const e = t.target, o2 = this.getRowByCell(e);
    this.focusedCell = {
      row: Array.from(this.table.querySelectorAll(`.${s.row}`)).indexOf(o2) + 1,
      column: Array.from(o2.querySelectorAll(`.${s.cell}`)).indexOf(e) + 1
    };
  }
  /**
   * Unselect row/column
   * Close toolbox menu
   * Hide toolboxes
   *
   * @returns {void}
   */
  hideToolboxes() {
    this.hideRowToolbox(), this.hideColumnToolbox(), this.updateToolboxesPosition();
  }
  /**
   * Unselect row, close toolbox
   *
   * @returns {void}
   */
  hideRowToolbox() {
    this.unselectRow(), this.toolboxRow.hide();
  }
  /**
   * Unselect column, close toolbox
   *
   * @returns {void}
   */
  hideColumnToolbox() {
    this.unselectColumn(), this.toolboxColumn.hide();
  }
  /**
   * Set the cursor focus to the focused cell
   *
   * @returns {void}
   */
  focusCell() {
    this.focusedCellElem.focus();
  }
  /**
   * Get current focused element
   *
   * @returns {HTMLElement} - focused cell
   */
  get focusedCellElem() {
    const { row: t, column: e } = this.focusedCell;
    return this.getCell(t, e);
  }
  /**
   * Update toolboxes position
   *
   * @param {number} row - hovered row
   * @param {number} column - hovered column
   */
  updateToolboxesPosition(t = this.hoveredRow, e = this.hoveredColumn) {
    this.isColumnMenuShowing || e > 0 && e <= this.numberOfColumns && this.toolboxColumn.show(() => ({
      left: `calc((100% - var(--cell-size)) / (${this.numberOfColumns} * 2) * (1 + (${e} - 1) * 2))`
    })), this.isRowMenuShowing || t > 0 && t <= this.numberOfRows && this.toolboxRow.show(() => {
      const o2 = this.getRow(t), { fromTopBorder: i } = g2(this.table, o2), { height: n } = o2.getBoundingClientRect();
      return {
        top: `${Math.ceil(i + n / 2)}px`
      };
    });
  }
  /**
   * Makes the first row headings
   *
   * @param {boolean} withHeadings - use headings row or not
   */
  setHeadingsSetting(t) {
    this.tunes.withHeadings = t, t ? (this.table.classList.add(s.withHeadings), this.addHeadingAttrToFirstRow()) : (this.table.classList.remove(s.withHeadings), this.removeHeadingAttrFromFirstRow());
  }
  /**
   * Adds an attribute for displaying the placeholder in the cell
   */
  addHeadingAttrToFirstRow() {
    for (let t = 1; t <= this.numberOfColumns; t++) {
      let e = this.getCell(1, t);
      e && e.setAttribute("heading", this.api.i18n.t("Heading"));
    }
  }
  /**
   * Removes an attribute for displaying the placeholder in the cell
   */
  removeHeadingAttrFromFirstRow() {
    for (let t = 1; t <= this.numberOfColumns; t++) {
      let e = this.getCell(1, t);
      e && e.removeAttribute("heading");
    }
  }
  /**
   * Add effect of a selected row
   *
   * @param {number} index
   */
  selectRow(t) {
    const e = this.getRow(t);
    e && (this.selectedRow = t, e.classList.add(s.rowSelected));
  }
  /**
   * Remove effect of a selected row
   */
  unselectRow() {
    if (this.selectedRow <= 0)
      return;
    const t = this.table.querySelector(`.${s.rowSelected}`);
    t && t.classList.remove(s.rowSelected), this.selectedRow = 0;
  }
  /**
   * Add effect of a selected column
   *
   * @param {number} index
   */
  selectColumn(t) {
    for (let e = 1; e <= this.numberOfRows; e++) {
      const o2 = this.getCell(e, t);
      o2 && o2.classList.add(s.cellSelected);
    }
    this.selectedColumn = t;
  }
  /**
   * Remove effect of a selected column
   */
  unselectColumn() {
    if (this.selectedColumn <= 0)
      return;
    let t = this.table.querySelectorAll(`.${s.cellSelected}`);
    Array.from(t).forEach((e) => {
      e.classList.remove(s.cellSelected);
    }), this.selectedColumn = 0;
  }
  /**
   * Calculates the row and column that the cursor is currently hovering over
   * The search was optimized from O(n) to O (log n) via bin search to reduce the number of calculations
   *
   * @param {Event} event - mousemove event
   * @returns hovered cell coordinates as an integer row and column
   */
  getHoveredCell(t) {
    let e = this.hoveredRow, o2 = this.hoveredColumn;
    const { width: i, height: n, x: r, y: h3 } = k2(this.table, t);
    return r >= 0 && (o2 = this.binSearch(
      this.numberOfColumns,
      (l2) => this.getCell(1, l2),
      ({ fromLeftBorder: l2 }) => r < l2,
      ({ fromRightBorder: l2 }) => r > i - l2
    )), h3 >= 0 && (e = this.binSearch(
      this.numberOfRows,
      (l2) => this.getCell(l2, 1),
      ({ fromTopBorder: l2 }) => h3 < l2,
      ({ fromBottomBorder: l2 }) => h3 > n - l2
    )), {
      row: e || this.hoveredRow,
      column: o2 || this.hoveredColumn
    };
  }
  /**
   * Looks for the index of the cell the mouse is hovering over.
   * Cells can be represented as ordered intervals with left and
   * right (upper and lower for rows) borders inside the table, if the mouse enters it, then this is our index
   *
   * @param {number} numberOfCells - upper bound of binary search
   * @param {function} getCell - function to take the currently viewed cell
   * @param {function} beforeTheLeftBorder - determines the cursor position, to the left of the cell or not
   * @param {function} afterTheRightBorder - determines the cursor position, to the right of the cell or not
   * @returns {number}
   */
  binSearch(t, e, o2, i) {
    let n = 0, r = t + 1, h3 = 0, l2;
    for (; n < r - 1 && h3 < 10; ) {
      l2 = Math.ceil((n + r) / 2);
      const u3 = e(l2), p = g2(this.table, u3);
      if (o2(p))
        r = l2;
      else if (i(p))
        n = l2;
      else
        break;
      h3++;
    }
    return l2;
  }
  /**
   * Collects data from cells into a two-dimensional array
   *
   * @returns {string[][]}
   */
  getData() {
    const t = [];
    for (let e = 1; e <= this.numberOfRows; e++) {
      const o2 = this.table.querySelector(`.${s.row}:nth-child(${e})`), i = Array.from(o2.querySelectorAll(`.${s.cell}`));
      i.every((r) => !r.textContent.trim()) || t.push(i.map((r) => r.innerHTML));
    }
    return t;
  }
  /**
   * Remove listeners on the document
   */
  destroy() {
    document.removeEventListener("click", this.documentClicked);
  }
};
var F2 = class {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }
  /**
   * Allow to press Enter inside the CodeTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {TableConstructor} init
   */
  constructor({ data: t, config: e, api: o2, readOnly: i, block: n }) {
    this.api = o2, this.readOnly = i, this.config = e, this.data = {
      withHeadings: this.getConfig("withHeadings", false, t),
      stretched: this.getConfig("stretched", false, t),
      content: t && t.content ? t.content : []
    }, this.table = null, this.block = n;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: A4,
      title: "Table"
    };
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.table = new E3(this.readOnly, this.api, this.data, this.config), this.container = c2("div", this.api.styles.block), this.container.appendChild(this.table.getWrapper()), this.table.setHeadingsSetting(this.data.withHeadings), this.container;
  }
  /**
   * Returns plugin settings
   *
   * @returns {Array}
   */
  renderSettings() {
    return [
      {
        label: this.api.i18n.t("With headings"),
        icon: T2,
        isActive: this.data.withHeadings,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this.data.withHeadings = true, this.table.setHeadingsSetting(this.data.withHeadings);
        }
      },
      {
        label: this.api.i18n.t("Without headings"),
        icon: H3,
        isActive: !this.data.withHeadings,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this.data.withHeadings = false, this.table.setHeadingsSetting(this.data.withHeadings);
        }
      },
      {
        label: this.data.stretched ? this.api.i18n.t("Collapse") : this.api.i18n.t("Stretch"),
        icon: this.data.stretched ? R4 : O3,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this.data.stretched = !this.data.stretched, this.block.stretched = this.data.stretched;
        }
      }
    ];
  }
  /**
   * Extract table data from the view
   *
   * @returns {TableData} - saved data
   */
  save() {
    const t = this.table.getData();
    return {
      withHeadings: this.data.withHeadings,
      stretched: this.data.stretched,
      content: t
    };
  }
  /**
   * Plugin destroyer
   *
   * @returns {void}
   */
  destroy() {
    this.table.destroy();
  }
  /**
   * A helper to get config value.
   *
   * @param {string} configName - the key to get from the config.
   * @param {any} defaultValue - default value if config doesn't have passed key
   * @param {object} savedData - previously saved data. If passed, the key will be got from there, otherwise from the config
   * @returns {any} - config value.
   */
  getConfig(t, e = void 0, o2 = void 0) {
    const i = this.data || o2;
    return i ? i[t] ? i[t] : e : this.config && this.config[t] ? this.config[t] : e;
  }
  /**
   * Table onPaste configuration
   *
   * @public
   */
  static get pasteConfig() {
    return { tags: ["TABLE", "TR", "TH", "TD"] };
  }
  /**
   * On paste callback that is fired from Editor
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(t) {
    const e = t.detail.data, o2 = e.querySelector(":scope > thead, tr:first-of-type th"), n = Array.from(e.querySelectorAll("tr")).map((r) => Array.from(r.querySelectorAll("th, td")).map((l2) => l2.innerHTML));
    this.data = {
      withHeadings: o2 !== null,
      content: n
    }, this.table.wrapper && this.table.wrapper.replaceWith(this.render());
  }
};

// editor.js
var initialContent = document.getElementById("editorjs").dataset.content;
var editToggler = document.getElementById("editor-edit-toggler");
var pageID = editToggler.dataset.id;
document.body.setAttribute("spellcheck", false);
document.body.setAttribute("autocomplete", false);
document.body.setAttribute("autocorrect", false);
var editor = new Aa({
  holder: "editorjs",
  placeholder: "Write something...",
  readOnly: true,
  tools: {
    header: {
      class: v,
      inlineToolbar: true
    },
    list: {
      class: G2,
      inlineToolbar: true
    },
    table: {
      class: F2,
      config: {
        rows: 2,
        cols: 2
      },
      inlineToolbar: true
    },
    image: {
      class: P3,
      config: {
        endpoints: {
          byFile: `/wiki/uploadimage/${pageID}`,
          byUrl: `/wiki/fetchimage/${pageID}`
        }
      },
      features: {
        border: false,
        caption: "optional",
        stretch: true
      }
    }
  },
  data: JSON.parse(initialContent)
});
var editTogglerIcon = editToggler.querySelector("i");
var editTogglerLabel = editToggler.querySelector("span");
editToggler.addEventListener("click", (event) => {
  if (editor.readOnly.isEnabled) {
    editToggler.classList.add("btn-success");
    editToggler.classList.remove("btn-primary");
    editTogglerIcon.classList.add("fa-save");
    editTogglerIcon.classList.remove("fa-file-pen");
    editTogglerLabel.textContent = LN.GenericSave;
    editor.readOnly.toggle();
  } else {
    editToggler.classList.add("btn-primary");
    editToggler.classList.remove("btn-success");
    editTogglerIcon.classList.add("fa-file-pen");
    editTogglerIcon.classList.remove("fa-save");
    editTogglerLabel.textContent = LN.GenericEdit;
    editor.save().then((content) => {
      fetch(`/wiki/save/${pageID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
      });
      editor.readOnly.toggle();
    });
  }
});
window.addEventListener("beforeunload", (event) => {
  if (!editor.readOnly.isEnabled) {
    event.preventDefault();
  }
});
/*! Bundled license information:

@editorjs/editorjs/dist/editorjs.mjs:
  (*!
   * CodeX.Tooltips
   * 
   * @version 1.0.5
   * 
   * @licence MIT
   * @author CodeX <https://codex.so>
   * 
   * 
   *)
  (*!
   * Library for handling keyboard shortcuts
   * @copyright CodeX (https://codex.so)
   * @license MIT
   * @author CodeX (https://codex.so)
   * @version 1.2.0
   *)
  (**
   * Base Paragraph Block for the Editor.js.
   * Represents a regular text block
   *
   * @author CodeX (team@codex.so)
   * @copyright CodeX 2018
   * @license The MIT License (MIT)
   *)
  (**
   * Editor.js
   *
   * @license Apache-2.0
   * @see Editor.js <https://editorjs.io>
   * @author CodeX Team <https://codex.so>
   *)

@editorjs/header/dist/header.mjs:
  (**
   * Header block for the Editor.js.
   *
   * @author CodeX (team@ifmo.su)
   * @copyright CodeX 2018
   * @license MIT
   * @version 2.0.0
   *)

@editorjs/image/dist/image.mjs:
  (**
   * Image Tool for the Editor.js
   * @author CodeX <team@codex.so>
   * @license MIT
   * @see {@link https://github.com/editor-js/image}
   *
   * To developers.
   * To simplify Tool structure, we split it to 4 parts:
   *  1) index.ts — main Tool's interface, public API and methods for working with data
   *  2) uploader.ts — module that has methods for sending files via AJAX: from device, by URL or File pasting
   *  3) ui.ts — module for UI manipulations: render, showing preloader, etc
   *
   * For debug purposes there is a testing server
   * that can save uploaded files and return a Response {@link UploadResponseFormat}
   *
   *       $ node dev/server.js
   *
   * It will expose 8008 port, so you can pass http://localhost:8008 with the Tools config:
   *
   * image: {
   *   class: ImageTool,
   *   config: {
   *     endpoints: {
   *       byFile: 'http://localhost:8008/uploadFile',
   *       byUrl: 'http://localhost:8008/fetchUrl',
   *     }
   *   },
   * },
   *)
*/
