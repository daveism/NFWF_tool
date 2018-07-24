(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index~store"],{

/***/ "./src/scripts/localStorageAPI.js":
/*!****************************************!*\
  !*** ./src/scripts/localStorageAPI.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Provides common functions used by the local storage API. Used in the Store and URL classes. In\n * the case that we cannot use localStorage or if we want to define multiple store providers for\n * backwards compatibility we will be able to swap out the storage object for one that implements\n * the getItem, setItem & removeItem functions in an equivalent way without changing any of the\n * code in the Store, URL, etc classes.\n */\nvar STATE_KEY = 'state';\n\nvar StorageAPI = exports.StorageAPI = function () {\n  function StorageAPI() {\n    _classCallCheck(this, StorageAPI);\n\n    if (StorageAPI.storageAvailable()) {\n      this.storage = window.localStorage;\n    }\n    // We need this custom event since browsers do not generally dispatch the 'storage' event most\n    // of the time. They only tend to fire it when you have the same tab open in two windows and\n    // one tab changes the localStorage.\n    this.storageEvent = new CustomEvent('storages');\n  }\n\n  _createClass(StorageAPI, [{\n    key: 'dispatchStorageEvent',\n    value: function dispatchStorageEvent() {\n      window.dispatchEvent(this.storageEvent);\n    }\n\n    // Gets an item from the storage provider, primarily used later in the composed functions\n    //\n    // @param key | string\n    // @return string\n\n  }, {\n    key: 'getItem',\n    value: function getItem() {\n      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n      return this.storage.getItem(key);\n    }\n\n    // Gets the state from the storage provider\n    //\n    // @return string\n\n  }, {\n    key: 'getStateAsString',\n    value: function getStateAsString() {\n      return this.getItem(STATE_KEY);\n    }\n\n    // Gets the state from the storage provider as an object\n    //\n    // @return object\n\n  }, {\n    key: 'getState',\n    value: function getState() {\n      return this.checkStateExists() ? JSON.parse(this.getItem(STATE_KEY)) : {};\n    }\n\n    // Sets a key/value pair to the storage provider, primarily used later in the composed functions\n    //\n    // @param key | string\n    // @param value | string\n\n  }, {\n    key: 'setItem',\n    value: function setItem() {\n      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n      this.storage.setItem(key, value);\n      this.dispatchStorageEvent();\n    }\n\n    // Sets a new state string state, should be a stringified object\n    //\n    // @param value | string\n\n  }, {\n    key: 'setStateAsString',\n    value: function setStateAsString() {\n      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n      this.setItem(STATE_KEY, value);\n    }\n\n    // Sets a new state object state\n    //\n    // @param value | string\n\n  }, {\n    key: 'setState',\n    value: function setState() {\n      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n      this.setItem(STATE_KEY, JSON.stringify(value));\n    }\n\n    // Removes a key/value pair from the storage provider, primarily used later in the composed\n    // functions\n    //\n    // @param key | string\n\n  }, {\n    key: 'removeItem',\n    value: function removeItem() {\n      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n      this.storage.removeItem(key);\n      this.dispatchStorageEvent();\n    }\n\n    // Removes the current state from the store\n\n  }, {\n    key: 'removeState',\n    value: function removeState() {\n      this.removeItem(STATE_KEY);\n    }\n\n    // Checks if the state exists in the storage provider\n\n  }, {\n    key: 'checkStateExists',\n    value: function checkStateExists() {\n      return this.getItem(STATE_KEY) ? true : false;\n    }\n  }], [{\n    key: 'listenForStateChange',\n    value: function listenForStateChange(handler) {\n      window.addEventListener('storages', handler);\n    }\n\n    // Check if localStorage available.\n    // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API\n    //\n    // @return boolean\n\n  }, {\n    key: 'storageAvailable',\n    value: function storageAvailable() {\n      var type = 'localStorage';\n      var storage = void 0;\n      try {\n        storage = window[type];\n        var x = '__storage_test__';\n        storage.setItem(x, x);\n        storage.removeItem(x);\n        return true;\n      } catch (e) {\n        return e instanceof DOMException && (\n        // everything except Firefox\n        e.code === 22 ||\n        // Firefox\n        e.code === 1014 ||\n        // test name field too, because code might not be present\n        // everything except Firefox\n        e.name === 'QuotaExceededError' ||\n        // Firefox\n        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&\n        // acknowledge QuotaExceededError only if there's something already stored\n        storage.length !== 0;\n      }\n    }\n  }]);\n\n  return StorageAPI;\n}();\n\n//# sourceURL=webpack:///./src/scripts/localStorageAPI.js?");

/***/ }),

/***/ "./src/scripts/store.js":
/*!******************************!*\
  !*** ./src/scripts/store.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Store = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _localStorageAPI = __webpack_require__(/*! ./localStorageAPI */ \"./src/scripts/localStorageAPI.js\");\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * This component is intended to handle the storage and retrieval of the state of\n * the NFWF application. As of this writing it is using localStorage to do this.\n * Uses simple class instance methods with the short-hand method declaration\n * pattern.\n *\n * To note: There is a difference between the Store and the State. As of 0a3106e\n * the Store is a String saved to the browsers localStorage and is a serialized\n * version of the State. The State is an Object which is interacted with by\n * parsing the State string from the Store, modifying the results of the parse,\n * and re-serializing it back to the Store.\n */\nvar Store = exports.Store = function () {\n  // ..and an (optional) custom class constructor. If one is\n  // not supplied, a default constructor is used instead:\n  // constructor() { }\n  function Store() {\n    _classCallCheck(this, Store);\n\n    // this.state = state;\n    this.store = new _localStorageAPI.StorageAPI();\n\n    // this.state = {};\n    // if(this.isStateExists){\n    //   this.state = this.getState();\n    // } else {\n    //   const state = {};\n    //   this.state = {state};\n    // }\n  }\n\n  // // GETTERS\n\n  // As of 0a3106e this is probably intended to be used as a getter for the\n  // Store. However it is pulling an unused and undeclared variable _state so it\n  // probably just returns undefined.\n\n\n  _createClass(Store, [{\n    key: 'getStateItem',\n\n\n    // Gets an individual top level item from the state\n    //\n    // @param item - string\n    // @return string || object\n    value: function getStateItem(item) {\n      return this.checkItem(item) ? this.getState()[item] : {};\n    }\n\n    // Gets the entire state object\n    //\n    // @return object\n\n  }, {\n    key: 'getState',\n    value: function getState() {\n      return this.store.getState();\n    }\n\n    // // SETTERS\n\n    // Setter for the state to the Store, preserving any non-overwritten\n    // properties in the Store.\n    //\n    // @param state - object\n\n  }, {\n    key: 'saveState',\n    value: function saveState(state) {\n      var currentState = this.getState();\n      var newState = _extends({}, currentState, state);\n      this.store.setState(newState);\n    }\n\n    // Setter for the state to the Store, overriding any non-overwritten\n    // properties in the Store.\n    //\n    // @param state - object\n\n  }, {\n    key: 'saveNewState',\n    value: function saveNewState(state) {\n      this.store.setState(state);\n    }\n\n    // Setter which overrides the entire Store with a new State object.\n    //\n    // @param StateObject - object\n\n  }, {\n    key: 'setStateFromObject',\n    value: function setStateFromObject(StateObject) {\n      this.saveNewState(StateObject);\n    }\n\n    // Setter for a key value pair to the State, which means that it writes it to\n    // the Store.\n    //\n    // @param key - string\n    // @param value - string\n\n  }, {\n    key: 'addStateItem',\n    value: function addStateItem(key, value) {\n      var state = this.getState();\n      state[key] = value;\n      this.saveNewState(state);\n    }\n\n    // Setter for a key value pair to the Store.\n    //\n    // @param key - string\n    // @param value - string\n\n  }, {\n    key: 'setStoreItem',\n    value: function setStoreItem(key, value) {\n      var storeObj = _defineProperty({}, key, value);\n      var newStateObj = _extends({}, this.getState(), storeObj);\n      this.saveNewState(newStateObj);\n    }\n\n    // // REMOVERS\n\n    // Removes the entire state from the browser.\n\n  }, {\n    key: 'clearState',\n    value: function clearState() {\n      this.store.removeState();\n    }\n\n    // Removes a key value pair from the State and the Store.\n    //\n    // @param key - string\n\n  }, {\n    key: 'removeStateItem',\n    value: function removeStateItem(key) {\n      var currentState = this.getState();\n      delete currentState[key];\n      this.saveNewState(currentState);\n    }\n\n    // // UTILITIES\n\n    // Check if localStorage available.\n    // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API\n    //\n    // @return boolean\n\n  }, {\n    key: 'isStateExists',\n\n\n    // Check if the state has been saved to the browser store\n    //\n    // @return boolean\n    value: function isStateExists() {\n      return this.store.checkStateExists();\n    }\n\n    // Check if an item has been saved to the store\n    // unused as of 0a3106e\n    //\n    // @param item - string\n    // @return boolean\n\n  }, {\n    key: 'isStateItemExist',\n    value: function isStateItemExist(item) {\n      if (this.isStateExists()) {\n        var stateStr = this.store.getStateAsString();\n        if (stateStr.indexOf(item) > 0) {\n          return true;\n        }\n      }\n      return false;\n    }\n\n    // Also checks if an item has been saved to the store\n    // TODO: Rewrite the indexOf check to parse the deeply nested keys of an object since the current\n    // code will give an error in some edge cases. EX:\n    //\n    // this.store.setStateAsString('{foo:\"bar\",bars:\"baz\"}');\n    // checkItem('bar'); // returns TRUE ();\n    //\n    // @param item - string\n    // @return boolean\n\n  }, {\n    key: 'checkItem',\n    value: function checkItem(item) {\n      return this.isStateExists() && this.store.getStateAsString().indexOf(item) > 0;\n    }\n\n    //  const ele.addEventListener('click', (e) => {\n    //    this.setStateFromObject();\n    //  })\n\n    // We will look at static and subclassed methods shortly\n\n    // save map action.\n    // ensures the state map action is consistent\n\n  }, {\n    key: 'saveAction',\n    value: function saveAction(type) {\n      this.setStoreItem('lastaction', type);\n    }\n  }, {\n    key: 'Store',\n    get: function get() {\n      return this._state;\n    }\n  }], [{\n    key: 'storageAvailable',\n    value: function storageAvailable() {\n      return _localStorageAPI.StorageAPI.storageAvailable();\n    }\n  }]);\n\n  return Store;\n}();\n\n//# sourceURL=webpack:///./src/scripts/store.js?");

/***/ })

}]);