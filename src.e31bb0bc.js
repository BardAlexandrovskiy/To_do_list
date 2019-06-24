// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"img/check.png":[function(require,module,exports) {
module.exports = "/check.07a7377f.png";
},{}],"img/delete.png":[function(require,module,exports) {
module.exports = "/delete.c3776b29.png";
},{}],"dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = _interopRequireDefault(require("./img/check.png"));

var _delete = _interopRequireDefault(require("./img/delete.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dom =
/*#__PURE__*/
function () {
  function Dom() {
    _classCallCheck(this, Dom);

    this.toDoInput = document.querySelector('#to_do_input');
    this.toDoList = document.querySelector('#to_do_list');
  }

  _createClass(Dom, [{
    key: "localStorageCreate",
    value: function localStorageCreate() {
      var _this = this;

      if (!localStorage.getItem('Todo')) {
        localStorage.setItem('Todo', JSON.stringify({
          'list': []
        }));
      } else {
        var toDoArr = this.getLocalStorage().list;

        if (toDoArr.length) {
          toDoArr.forEach(function (element) {
            var liId = element.id;
            _this[liId] = {
              'value': element.value,
              'check': element.check,
              'id': liId
            };

            var toDoItem = _this.addNewElement(_this.toDoList, 'li');

            toDoItem.className = 'to_do_item';
            toDoItem.setAttribute('li_id', "".concat(liId));

            var checkBoxBtn = _this.addNewElement(toDoItem, 'button');

            var checkImg = _this.addNewElement(checkBoxBtn, 'img');

            checkImg.src = _check.default;

            var textDiv = _this.addNewElement(toDoItem, 'div');

            var deleteButton = _this.addNewElement(toDoItem, 'button');

            deleteButton.className = 'button_delete';

            var deleteImg = _this.addNewElement(deleteButton, 'img');

            deleteImg.className = 'img_delete';
            deleteImg.src = _delete.default;

            if (element.check) {
              checkBoxBtn.className = 'check_box check_box_checked';
              checkImg.className = 'img_check img_checked';
              textDiv.className = 'to_do_text to_do_text_checked';
            } else {
              checkBoxBtn.className = 'check_box';
              checkImg.className = 'img_check';
              textDiv.className = 'to_do_text';
            }

            textDiv.innerText = element.value;

            checkBoxBtn.onclick = function () {
              if (!checkBoxBtn.classList.contains('check_box_checked')) {
                checkBoxBtn.classList.add('check_box_checked');
                checkImg.classList.add('img_checked');
                textDiv.classList.add('to_do_text_checked');
                _this[liId].check = true;

                var localStorageCheck = _this.getLocalStorage();

                localStorageCheck.list.forEach(function (elementLocal) {
                  if (elementLocal.id === liId) {
                    // eslint-disable-next-line no-param-reassign
                    elementLocal.check = true;
                  }

                  _this.setLocalStorage(localStorageCheck);
                });
              } else {
                checkBoxBtn.classList.remove('check_box_checked');
                checkImg.classList.remove('img_checked');
                textDiv.classList.remove('to_do_text_checked');
                _this[liId].check = false;

                var _localStorageCheck = _this.getLocalStorage();

                _localStorageCheck.list.forEach(function (elementLocal) {
                  if (elementLocal.id === liId) {
                    // eslint-disable-next-line no-param-reassign
                    elementLocal.check = false;
                  }

                  _this.setLocalStorage(_localStorageCheck);
                });
              }
            };

            deleteButton.onclick = function () {
              toDoItem.style.borderRadius = '0 5px 5px 0';
              var translateX = 0;
              new Promise(function (resolve) {
                var interval = setInterval(function () {
                  if (translateX < 100) {
                    translateX += 5;
                    toDoItem.style.transform = "translateX(-".concat(translateX, "%)");
                  } else {
                    toDoItem.style.opacity = 0;
                    clearInterval(interval);
                    resolve('animation done');
                  }
                }, 20);
              }).then(function () {
                var deleteLocalStorageEl = _this.getLocalStorage();

                var deletedLocalStorageEl = {
                  'list': deleteLocalStorageEl.list.filter(function (elementLocal) {
                    return elementLocal.id !== liId;
                  })
                };

                _this.setLocalStorage(deletedLocalStorageEl);

                toDoItem.remove();
                delete _this[liId];
              });
            };

            toDoItem.classList.add('to_do_item_add_animation');
          });
        }
      }
    }
  }, {
    key: "getLocalStorage",
    value: function getLocalStorage() {
      return JSON.parse(localStorage.getItem('Todo'));
    }
  }, {
    key: "setLocalStorage",
    value: function setLocalStorage(changedData) {
      return localStorage.setItem('Todo', JSON.stringify(changedData));
    }
  }, {
    key: "addNewElement",
    value: function addNewElement(parent, element) {
      return parent.appendChild(document.createElement(element));
    }
  }, {
    key: "createToDoItem",
    value: function createToDoItem() {
      var _this2 = this;

      // Добавляем элемент в localStorage
      var id = Date.now();
      var localStorageAddEl = this.getLocalStorage();
      localStorageAddEl.list.push({
        'value': this.toDoInput.value,
        'check': false,
        'id': id
      });
      this.setLocalStorage(localStorageAddEl); // Добавляем элемент в class Dom

      this[id] = {
        'value': this.toDoInput.value,
        'check': false,
        'id': id
      };
      console.log(this[id]); // Добавляем элемент в html

      var toDoItem = this.addNewElement(this.toDoList, 'li');
      toDoItem.className = 'to_do_item';
      toDoItem.setAttribute('li_id', "".concat(id));
      var checkBoxBtn = this.addNewElement(toDoItem, 'button');
      checkBoxBtn.className = 'check_box';
      var checkImg = this.addNewElement(checkBoxBtn, 'img');
      checkImg.className = 'img_check';
      checkImg.src = _check.default;
      var textDiv = this.addNewElement(toDoItem, 'div');
      textDiv.className = 'to_do_text';
      var deleteButton = this.addNewElement(toDoItem, 'button');
      deleteButton.className = 'button_delete';
      var deleteImg = this.addNewElement(deleteButton, 'img');
      deleteImg.className = 'img_delete';
      deleteImg.src = _delete.default;
      textDiv.innerText = this.toDoInput.value;
      this.toDoInput.value = '';
      this.toDoInput.blur();

      checkBoxBtn.onclick = function () {
        if (!checkBoxBtn.classList.contains('check_box_checked')) {
          checkBoxBtn.classList.add('check_box_checked');
          checkImg.classList.add('img_checked');
          textDiv.classList.add('to_do_text_checked');
          _this2[id].check = true;

          var localStorageCheck = _this2.getLocalStorage();

          localStorageCheck.list.forEach(function (element) {
            if (element.id === id) {
              // eslint-disable-next-line no-param-reassign
              element.check = true;
            }

            _this2.setLocalStorage(localStorageCheck);
          });
        } else {
          checkBoxBtn.classList.remove('check_box_checked');
          checkImg.classList.remove('img_checked');
          textDiv.classList.remove('to_do_text_checked');
          _this2[id].check = false;

          var _localStorageCheck2 = _this2.getLocalStorage();

          _localStorageCheck2.list.forEach(function (element) {
            if (element.id === id) {
              // eslint-disable-next-line no-param-reassign
              element.check = false;
            }

            _this2.setLocalStorage(_localStorageCheck2);
          });
        }
      };

      deleteButton.onclick = function () {
        toDoItem.style.borderRadius = '0 5px 5px 0';
        var translateX = 0;
        new Promise(function (resolve) {
          var interval = setInterval(function () {
            if (translateX < 100) {
              translateX += 5;
              toDoItem.style.transform = "translateX(-".concat(translateX, "%)");
            } else {
              toDoItem.style.opacity = 0;
              clearInterval(interval);
              resolve('animation done');
            }
          }, 20);
        }).then(function () {
          var deleteLocalStorageEl = _this2.getLocalStorage();

          var deletedLocalStorageEl = {
            'list': deleteLocalStorageEl.list.filter(function (element) {
              return element.id !== id;
            })
          };

          _this2.setLocalStorage(deletedLocalStorageEl);

          toDoItem.remove();
          delete _this2[id];
        });
      };

      toDoItem.classList.add('to_do_item_add_animation');
    }
  }]);

  return Dom;
}();

exports.default = Dom;
},{"./img/check.png":"img/check.png","./img/delete.png":"img/delete.png"}],"index.js":[function(require,module,exports) {
"use strict";

var _dom = _interopRequireDefault(require("./dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = new _dom.default();
dom.localStorageCreate();
dom.toDoInput.addEventListener('keydown', function (key) {
  if (key.keyCode === 13 && dom.toDoInput.value.trim() !== '') {
    dom.createToDoItem();
  }
});
},{"./dom":"dom.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51009" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map