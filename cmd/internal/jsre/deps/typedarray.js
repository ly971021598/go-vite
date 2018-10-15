/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId]) {
            /******/ 			return installedModules[moduleId].exports;
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
        /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
        /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ 		}
        /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
        /******/ 		if(mode & 1) value = __webpack_require__(value);
        /******/ 		if(mode & 8) return value;
        /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/ 		var ns = Object.create(null);
        /******/ 		__webpack_require__.r(ns);
        /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
        /******/ 		return ns;
        /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
        /******/ 		var getter = module && module.__esModule ?
        /******/ 			function getDefault() { return module['default']; } :
        /******/ 			function getModuleExports() { return module; };
        /******/ 		__webpack_require__.d(getter, 'a', getter);
        /******/ 		return getter;
        /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = '';
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = './polyfill/typedarray.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './polyfill/typedarray.js':
    /*!********************************!*\
  !*** ./polyfill/typedarray.js ***!
  \********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {

        eval('function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nvar undefined = void 0; // Paranoia\n// Beyond this value, index getters/setters (i.e. array[0], array[1]) are so slow to\n// create, and consume so much memory, that the browser appears frozen.\n\nvar MAX_ARRAY_LENGTH = 1e5; // Approximations of internal ECMAScript conversion functions\n\nvar ECMAScript = function () {\n  // Stash a copy in case other scripts modify these\n  var opts = Object.prototype.toString,\n      ophop = Object.prototype.hasOwnProperty;\n  return {\n    // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:\n    Class: function Class(v) {\n      return opts.call(v).replace(/^\\[object *|\\]$/g, \'\');\n    },\n    HasProperty: function HasProperty(o, p) {\n      return p in o;\n    },\n    HasOwnProperty: function HasOwnProperty(o, p) {\n      return ophop.call(o, p);\n    },\n    IsCallable: function IsCallable(o) {\n      return typeof o === \'function\';\n    },\n    ToInt32: function ToInt32(v) {\n      return v >> 0;\n    },\n    ToUint32: function ToUint32(v) {\n      return v >>> 0;\n    }\n  };\n}(); // Snapshot intrinsics\n\n\nvar LN2 = Math.LN2,\n    abs = Math.abs,\n    floor = Math.floor,\n    log = Math.log,\n    min = Math.min,\n    pow = Math.pow,\n    round = Math.round; // ES5: lock down object properties\n\nfunction configureProperties(obj) {\n  if (getOwnPropNames && defineProp) {\n    var props = getOwnPropNames(obj),\n        i;\n\n    for (i = 0; i < props.length; i += 1) {\n      defineProp(obj, props[i], {\n        value: obj[props[i]],\n        writable: false,\n        enumerable: false,\n        configurable: false\n      });\n    }\n  }\n} // emulate ES5 getter/setter API using legacy APIs\n// http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx\n// (second clause tests for Object.defineProperty() in IE<9 that only supports extending DOM prototypes, but\n// note that IE<9 does not support __defineGetter__ or __defineSetter__ so it just renders the method harmless)\n\n\nvar defineProp;\n\nif (Object.defineProperty && function () {\n  try {\n    Object.defineProperty({}, \'x\', {});\n    return true;\n  } catch (e) {\n    return false;\n  }\n}()) {\n  defineProp = Object.defineProperty;\n} else {\n  defineProp = function defineProp(o, p, desc) {\n    if (!o === Object(o)) throw new TypeError(\'Object.defineProperty called on non-object\');\n\n    if (ECMAScript.HasProperty(desc, \'get\') && Object.prototype.__defineGetter__) {\n      Object.prototype.__defineGetter__.call(o, p, desc.get);\n    }\n\n    if (ECMAScript.HasProperty(desc, \'set\') && Object.prototype.__defineSetter__) {\n      Object.prototype.__defineSetter__.call(o, p, desc.set);\n    }\n\n    if (ECMAScript.HasProperty(desc, \'value\')) {\n      o[p] = desc.value;\n    }\n\n    return o;\n  };\n}\n\nvar getOwnPropNames = Object.getOwnPropertyNames || function (o) {\n  if (o !== Object(o)) throw new TypeError(\'Object.getOwnPropertyNames called on non-object\');\n  var props = [],\n      p;\n\n  for (p in o) {\n    if (ECMAScript.HasOwnProperty(o, p)) {\n      props.push(p);\n    }\n  }\n\n  return props;\n}; // ES5: Make obj[index] an alias for obj._getter(index)/obj._setter(index, value)\n// for index in 0 ... obj.length\n\n\nfunction makeArrayAccessors(obj) {\n  if (!defineProp) {\n    return;\n  }\n\n  if (obj.length > MAX_ARRAY_LENGTH) throw new RangeError(\'Array too large for polyfill\');\n\n  function makeArrayAccessor(index) {\n    defineProp(obj, index, {\n      \'get\': function get() {\n        return obj._getter(index);\n      },\n      \'set\': function set(v) {\n        obj._setter(index, v);\n      },\n      enumerable: true,\n      configurable: false\n    });\n  }\n\n  var i;\n\n  for (i = 0; i < obj.length; i += 1) {\n    makeArrayAccessor(i);\n  }\n} // Internal conversion functions:\n//    pack<Type>()   - take a number (interpreted as Type), output a byte array\n//    unpack<Type>() - take a byte array, output a Type-like number\n\n\nfunction as_signed(value, bits) {\n  var s = 32 - bits;\n  return value << s >> s;\n}\n\nfunction as_unsigned(value, bits) {\n  var s = 32 - bits;\n  return value << s >>> s;\n}\n\nfunction packI8(n) {\n  return [n & 0xff];\n}\n\nfunction unpackI8(bytes) {\n  return as_signed(bytes[0], 8);\n}\n\nfunction packU8(n) {\n  return [n & 0xff];\n}\n\nfunction unpackU8(bytes) {\n  return as_unsigned(bytes[0], 8);\n}\n\nfunction packU8Clamped(n) {\n  n = round(Number(n));\n  return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff];\n}\n\nfunction packI16(n) {\n  return [n >> 8 & 0xff, n & 0xff];\n}\n\nfunction unpackI16(bytes) {\n  return as_signed(bytes[0] << 8 | bytes[1], 16);\n}\n\nfunction packU16(n) {\n  return [n >> 8 & 0xff, n & 0xff];\n}\n\nfunction unpackU16(bytes) {\n  return as_unsigned(bytes[0] << 8 | bytes[1], 16);\n}\n\nfunction packI32(n) {\n  return [n >> 24 & 0xff, n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff];\n}\n\nfunction unpackI32(bytes) {\n  return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);\n}\n\nfunction packU32(n) {\n  return [n >> 24 & 0xff, n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff];\n}\n\nfunction unpackU32(bytes) {\n  return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);\n}\n\nfunction packIEEE754(v, ebits, fbits) {\n  var bias = (1 << ebits - 1) - 1,\n      s,\n      e,\n      f,\n      ln,\n      i,\n      bits,\n      str,\n      bytes;\n\n  function roundToEven(n) {\n    var w = floor(n),\n        f = n - w;\n    if (f < 0.5) return w;\n    if (f > 0.5) return w + 1;\n    return w % 2 ? w + 1 : w;\n  } // Compute sign, exponent, fraction\n\n\n  if (v !== v) {\n    // NaN\n    // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping\n    e = (1 << ebits) - 1;\n    f = pow(2, fbits - 1);\n    s = 0;\n  } else if (v === Infinity || v === -Infinity) {\n    e = (1 << ebits) - 1;\n    f = 0;\n    s = v < 0 ? 1 : 0;\n  } else if (v === 0) {\n    e = 0;\n    f = 0;\n    s = 1 / v === -Infinity ? 1 : 0;\n  } else {\n    s = v < 0;\n    v = abs(v);\n\n    if (v >= pow(2, 1 - bias)) {\n      e = min(floor(log(v) / LN2), 1023);\n      f = roundToEven(v / pow(2, e) * pow(2, fbits));\n\n      if (f / pow(2, fbits) >= 2) {\n        e = e + 1;\n        f = 1;\n      }\n\n      if (e > bias) {\n        // Overflow\n        e = (1 << ebits) - 1;\n        f = 0;\n      } else {\n        // Normalized\n        e = e + bias;\n        f = f - pow(2, fbits);\n      }\n    } else {\n      // Denormalized\n      e = 0;\n      f = roundToEven(v / pow(2, 1 - bias - fbits));\n    }\n  } // Pack sign, exponent, fraction\n\n\n  bits = [];\n\n  for (i = fbits; i; i -= 1) {\n    bits.push(f % 2 ? 1 : 0);\n    f = floor(f / 2);\n  }\n\n  for (i = ebits; i; i -= 1) {\n    bits.push(e % 2 ? 1 : 0);\n    e = floor(e / 2);\n  }\n\n  bits.push(s ? 1 : 0);\n  bits.reverse();\n  str = bits.join(\'\'); // Bits to bytes\n\n  bytes = [];\n\n  while (str.length) {\n    bytes.push(parseInt(str.substring(0, 8), 2));\n    str = str.substring(8);\n  }\n\n  return bytes;\n}\n\nfunction unpackIEEE754(bytes, ebits, fbits) {\n  // Bytes to bits\n  var bits = [],\n      i,\n      j,\n      b,\n      str,\n      bias,\n      s,\n      e,\n      f;\n\n  for (i = bytes.length; i; i -= 1) {\n    b = bytes[i - 1];\n\n    for (j = 8; j; j -= 1) {\n      bits.push(b % 2 ? 1 : 0);\n      b = b >> 1;\n    }\n  }\n\n  bits.reverse();\n  str = bits.join(\'\'); // Unpack sign, exponent, fraction\n\n  bias = (1 << ebits - 1) - 1;\n  s = parseInt(str.substring(0, 1), 2) ? -1 : 1;\n  e = parseInt(str.substring(1, 1 + ebits), 2);\n  f = parseInt(str.substring(1 + ebits), 2); // Produce number\n\n  if (e === (1 << ebits) - 1) {\n    return f !== 0 ? NaN : s * Infinity;\n  } else if (e > 0) {\n    // Normalized\n    return s * pow(2, e - bias) * (1 + f / pow(2, fbits));\n  } else if (f !== 0) {\n    // Denormalized\n    return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));\n  } else {\n    return s < 0 ? -0 : 0;\n  }\n}\n\nfunction unpackF64(b) {\n  return unpackIEEE754(b, 11, 52);\n}\n\nfunction packF64(v) {\n  return packIEEE754(v, 11, 52);\n}\n\nfunction unpackF32(b) {\n  return unpackIEEE754(b, 8, 23);\n}\n\nfunction packF32(v) {\n  return packIEEE754(v, 8, 23);\n} //\n// 3 The ArrayBuffer Type\n//\n\n\n(function () {\n  /** @constructor */\n  var ArrayBuffer = function ArrayBuffer(length) {\n    length = ECMAScript.ToInt32(length);\n    if (length < 0) throw new RangeError(\'ArrayBuffer size is not a small enough positive integer\');\n    this.byteLength = length;\n    this._bytes = [];\n    this._bytes.length = length;\n    var i;\n\n    for (i = 0; i < this.byteLength; i += 1) {\n      this._bytes[i] = 0;\n    }\n\n    configureProperties(this);\n  };\n\n  exports.ArrayBuffer = exports.ArrayBuffer || ArrayBuffer; //\n  // 4 The ArrayBufferView Type\n  //\n  // NOTE: this constructor is not exported\n\n  /** @constructor */\n\n  var ArrayBufferView = function ArrayBufferView() {//this.buffer = null;\n    //this.byteOffset = 0;\n    //this.byteLength = 0;\n  }; //\n  // 5 The Typed Array View Types\n  //\n\n\n  function makeConstructor(bytesPerElement, pack, unpack) {\n    // Each TypedArray type requires a distinct constructor instance with\n    // identical logic, which this produces.\n    var _ctor;\n\n    _ctor = function ctor(buffer, byteOffset, length) {\n      var array, sequence, i, s;\n\n      if (!arguments.length || typeof arguments[0] === \'number\') {\n        // Constructor(unsigned long length)\n        this.length = ECMAScript.ToInt32(arguments[0]);\n        if (length < 0) throw new RangeError(\'ArrayBufferView size is not a small enough positive integer\');\n        this.byteLength = this.length * this.BYTES_PER_ELEMENT;\n        this.buffer = new ArrayBuffer(this.byteLength);\n        this.byteOffset = 0;\n      } else if (_typeof(arguments[0]) === \'object\' && arguments[0].constructor === _ctor) {\n        // Constructor(TypedArray array)\n        array = arguments[0];\n        this.length = array.length;\n        this.byteLength = this.length * this.BYTES_PER_ELEMENT;\n        this.buffer = new ArrayBuffer(this.byteLength);\n        this.byteOffset = 0;\n\n        for (i = 0; i < this.length; i += 1) {\n          this._setter(i, array._getter(i));\n        }\n      } else if (_typeof(arguments[0]) === \'object\' && !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === \'ArrayBuffer\')) {\n        // Constructor(sequence<type> array)\n        sequence = arguments[0];\n        this.length = ECMAScript.ToUint32(sequence.length);\n        this.byteLength = this.length * this.BYTES_PER_ELEMENT;\n        this.buffer = new ArrayBuffer(this.byteLength);\n        this.byteOffset = 0;\n\n        for (i = 0; i < this.length; i += 1) {\n          s = sequence[i];\n\n          this._setter(i, Number(s));\n        }\n      } else if (_typeof(arguments[0]) === \'object\' && (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === \'ArrayBuffer\')) {\n        // Constructor(ArrayBuffer buffer,\n        //             optional unsigned long byteOffset, optional unsigned long length)\n        this.buffer = buffer;\n        this.byteOffset = ECMAScript.ToUint32(byteOffset);\n\n        if (this.byteOffset > this.buffer.byteLength) {\n          throw new RangeError(\'byteOffset out of range\');\n        }\n\n        if (this.byteOffset % this.BYTES_PER_ELEMENT) {\n          // The given byteOffset must be a multiple of the element\n          // size of the specific type, otherwise an exception is raised.\n          throw new RangeError(\'ArrayBuffer length minus the byteOffset is not a multiple of the element size.\');\n        }\n\n        if (arguments.length < 3) {\n          this.byteLength = this.buffer.byteLength - this.byteOffset;\n\n          if (this.byteLength % this.BYTES_PER_ELEMENT) {\n            throw new RangeError(\'length of buffer minus byteOffset not a multiple of the element size\');\n          }\n\n          this.length = this.byteLength / this.BYTES_PER_ELEMENT;\n        } else {\n          this.length = ECMAScript.ToUint32(length);\n          this.byteLength = this.length * this.BYTES_PER_ELEMENT;\n        }\n\n        if (this.byteOffset + this.byteLength > this.buffer.byteLength) {\n          throw new RangeError(\'byteOffset and length reference an area beyond the end of the buffer\');\n        }\n      } else {\n        throw new TypeError(\'Unexpected argument type(s)\');\n      }\n\n      this.constructor = _ctor;\n      configureProperties(this);\n      makeArrayAccessors(this);\n    };\n\n    _ctor.prototype = new ArrayBufferView();\n    _ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;\n    _ctor.prototype._pack = pack;\n    _ctor.prototype._unpack = unpack;\n    _ctor.BYTES_PER_ELEMENT = bytesPerElement; // getter type (unsigned long index);\n\n    _ctor.prototype._getter = function (index) {\n      if (arguments.length < 1) throw new SyntaxError(\'Not enough arguments\');\n      index = ECMAScript.ToUint32(index);\n\n      if (index >= this.length) {\n        return undefined;\n      }\n\n      var bytes = [],\n          i,\n          o;\n\n      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {\n        bytes.push(this.buffer._bytes[o]);\n      }\n\n      return this._unpack(bytes);\n    }; // NONSTANDARD: convenience alias for getter: type get(unsigned long index);\n\n\n    _ctor.prototype.get = _ctor.prototype._getter; // setter void (unsigned long index, type value);\n\n    _ctor.prototype._setter = function (index, value) {\n      if (arguments.length < 2) throw new SyntaxError(\'Not enough arguments\');\n      index = ECMAScript.ToUint32(index);\n\n      if (index >= this.length) {\n        return undefined;\n      }\n\n      var bytes = this._pack(value),\n          i,\n          o;\n\n      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {\n        this.buffer._bytes[o] = bytes[i];\n      }\n    }; // void set(TypedArray array, optional unsigned long offset);\n    // void set(sequence<type> array, optional unsigned long offset);\n\n\n    _ctor.prototype.set = function (index, value) {\n      if (arguments.length < 1) throw new SyntaxError(\'Not enough arguments\');\n      var array, sequence, offset, len, i, s, d, byteOffset, byteLength, tmp;\n\n      if (_typeof(arguments[0]) === \'object\' && arguments[0].constructor === this.constructor) {\n        // void set(TypedArray array, optional unsigned long offset);\n        array = arguments[0];\n        offset = ECMAScript.ToUint32(arguments[1]);\n\n        if (offset + array.length > this.length) {\n          throw new RangeError(\'Offset plus length of array is out of range\');\n        }\n\n        byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;\n        byteLength = array.length * this.BYTES_PER_ELEMENT;\n\n        if (array.buffer === this.buffer) {\n          tmp = [];\n\n          for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {\n            tmp[i] = array.buffer._bytes[s];\n          }\n\n          for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {\n            this.buffer._bytes[d] = tmp[i];\n          }\n        } else {\n          for (i = 0, s = array.byteOffset, d = byteOffset; i < byteLength; i += 1, s += 1, d += 1) {\n            this.buffer._bytes[d] = array.buffer._bytes[s];\n          }\n        }\n      } else if (_typeof(arguments[0]) === \'object\' && typeof arguments[0].length !== \'undefined\') {\n        // void set(sequence<type> array, optional unsigned long offset);\n        sequence = arguments[0];\n        len = ECMAScript.ToUint32(sequence.length);\n        offset = ECMAScript.ToUint32(arguments[1]);\n\n        if (offset + len > this.length) {\n          throw new RangeError(\'Offset plus length of array is out of range\');\n        }\n\n        for (i = 0; i < len; i += 1) {\n          s = sequence[i];\n\n          this._setter(offset + i, Number(s));\n        }\n      } else {\n        throw new TypeError(\'Unexpected argument type(s)\');\n      }\n    }; // TypedArray subarray(long begin, optional long end);\n\n\n    _ctor.prototype.subarray = function (start, end) {\n      function clamp(v, min, max) {\n        return v < min ? min : v > max ? max : v;\n      }\n\n      start = ECMAScript.ToInt32(start);\n      end = ECMAScript.ToInt32(end);\n\n      if (arguments.length < 1) {\n        start = 0;\n      }\n\n      if (arguments.length < 2) {\n        end = this.length;\n      }\n\n      if (start < 0) {\n        start = this.length + start;\n      }\n\n      if (end < 0) {\n        end = this.length + end;\n      }\n\n      start = clamp(start, 0, this.length);\n      end = clamp(end, 0, this.length);\n      var len = end - start;\n\n      if (len < 0) {\n        len = 0;\n      }\n\n      return new this.constructor(this.buffer, this.byteOffset + start * this.BYTES_PER_ELEMENT, len);\n    };\n\n    return _ctor;\n  }\n\n  var Int8Array = makeConstructor(1, packI8, unpackI8);\n  var Uint8Array = makeConstructor(1, packU8, unpackU8);\n  var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);\n  var Int16Array = makeConstructor(2, packI16, unpackI16);\n  var Uint16Array = makeConstructor(2, packU16, unpackU16);\n  var Int32Array = makeConstructor(4, packI32, unpackI32);\n  var Uint32Array = makeConstructor(4, packU32, unpackU32);\n  var Float32Array = makeConstructor(4, packF32, unpackF32);\n  var Float64Array = makeConstructor(8, packF64, unpackF64);\n  exports.Int8Array = exports.Int8Array || Int8Array;\n  exports.Uint8Array = exports.Uint8Array || Uint8Array;\n  exports.Uint8ClampedArray = exports.Uint8ClampedArray || Uint8ClampedArray;\n  exports.Int16Array = exports.Int16Array || Int16Array;\n  exports.Uint16Array = exports.Uint16Array || Uint16Array;\n  exports.Int32Array = exports.Int32Array || Int32Array;\n  exports.Uint32Array = exports.Uint32Array || Uint32Array;\n  exports.Float32Array = exports.Float32Array || Float32Array;\n  exports.Float64Array = exports.Float64Array || Float64Array;\n})(); //\n// 6 The DataView View Type\n//\n\n\n(function () {\n  function r(array, index) {\n    return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];\n  }\n\n  var IS_BIG_ENDIAN = function () {\n    var u16array = new exports.Uint16Array([0x1234]),\n        u8array = new exports.Uint8Array(u16array.buffer);\n    return r(u8array, 0) === 0x12;\n  }(); // Constructor(ArrayBuffer buffer,\n  //             optional unsigned long byteOffset,\n  //             optional unsigned long byteLength)\n\n  /** @constructor */\n\n\n  var DataView = function DataView(buffer, byteOffset, byteLength) {\n    if (arguments.length === 0) {\n      buffer = new exports.ArrayBuffer(0);\n    } else if (!(buffer instanceof exports.ArrayBuffer || ECMAScript.Class(buffer) === \'ArrayBuffer\')) {\n      throw new TypeError(\'TypeError\');\n    }\n\n    this.buffer = buffer || new exports.ArrayBuffer(0);\n    this.byteOffset = ECMAScript.ToUint32(byteOffset);\n\n    if (this.byteOffset > this.buffer.byteLength) {\n      throw new RangeError(\'byteOffset out of range\');\n    }\n\n    if (arguments.length < 3) {\n      this.byteLength = this.buffer.byteLength - this.byteOffset;\n    } else {\n      this.byteLength = ECMAScript.ToUint32(byteLength);\n    }\n\n    if (this.byteOffset + this.byteLength > this.buffer.byteLength) {\n      throw new RangeError(\'byteOffset and length reference an area beyond the end of the buffer\');\n    }\n\n    configureProperties(this);\n  };\n\n  function makeGetter(arrayType) {\n    return function (byteOffset, littleEndian) {\n      byteOffset = ECMAScript.ToUint32(byteOffset);\n\n      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {\n        throw new RangeError(\'Array index out of range\');\n      }\n\n      byteOffset += this.byteOffset;\n      var uint8Array = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT),\n          bytes = [],\n          i;\n\n      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {\n        bytes.push(r(uint8Array, i));\n      }\n\n      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {\n        bytes.reverse();\n      }\n\n      return r(new arrayType(new exports.Uint8Array(bytes).buffer), 0);\n    };\n  }\n\n  DataView.prototype.getUint8 = makeGetter(exports.Uint8Array);\n  DataView.prototype.getInt8 = makeGetter(exports.Int8Array);\n  DataView.prototype.getUint16 = makeGetter(exports.Uint16Array);\n  DataView.prototype.getInt16 = makeGetter(exports.Int16Array);\n  DataView.prototype.getUint32 = makeGetter(exports.Uint32Array);\n  DataView.prototype.getInt32 = makeGetter(exports.Int32Array);\n  DataView.prototype.getFloat32 = makeGetter(exports.Float32Array);\n  DataView.prototype.getFloat64 = makeGetter(exports.Float64Array);\n\n  function makeSetter(arrayType) {\n    return function (byteOffset, value, littleEndian) {\n      byteOffset = ECMAScript.ToUint32(byteOffset);\n\n      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {\n        throw new RangeError(\'Array index out of range\');\n      } // Get bytes\n\n\n      var typeArray = new arrayType([value]),\n          byteArray = new exports.Uint8Array(typeArray.buffer),\n          bytes = [],\n          i,\n          byteView;\n\n      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {\n        bytes.push(r(byteArray, i));\n      } // Flip if necessary\n\n\n      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {\n        bytes.reverse();\n      } // Write them\n\n\n      byteView = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);\n      byteView.set(bytes);\n    };\n  }\n\n  DataView.prototype.setUint8 = makeSetter(exports.Uint8Array);\n  DataView.prototype.setInt8 = makeSetter(exports.Int8Array);\n  DataView.prototype.setUint16 = makeSetter(exports.Uint16Array);\n  DataView.prototype.setInt16 = makeSetter(exports.Int16Array);\n  DataView.prototype.setUint32 = makeSetter(exports.Uint32Array);\n  DataView.prototype.setInt32 = makeSetter(exports.Int32Array);\n  DataView.prototype.setFloat32 = makeSetter(exports.Float32Array);\n  DataView.prototype.setFloat64 = makeSetter(exports.Float64Array);\n  exports.DataView = exports.DataView || DataView;\n})();\n\n//# sourceURL=webpack:///./polyfill/typedarray.js?');

        /***/ })

/******/ });