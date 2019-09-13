
  (function(modules){
    function require(id){
      const[fn, mapping] = modules[id];

      function localRequire(name){
        return require(mapping[name])
      }

      const module = {exports: {}}
      fn(localRequire, module, module.exports)

      return module.exports
    }
  
    require(0)
  })({0: [
      function(require, moduld, exports){
        "use strict";

var _message = require("./message.js");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_message2.default);
      },
      {"./message.js":1}
    ],
1: [
      function(require, moduld, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require("./name.js");

exports.default = "hello " + _name.name + "!";
      },
      {"./name.js":2}
    ],
2: [
      function(require, moduld, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = 'world';
      },
      {}
    ],
})
  


[
  {
    id: 0,
    filename: './entry.js',
    dependencies: [ './message.js' ],
    code: '"use strict";\n\nvar _message = require("./message.js");\n\nvar ' +
      '_message2 = _interopRequireDefault(_message);\n\nfunction ' +
      '_interopRequireDefault(obj) { return obj && obj.__esModule ' +
      '? obj : { default: obj }; }\n\n' +
      'console.log(_message2.default);',
    mapping: { './message.js': 1 }
  },
  {
    id: 1,
    filename: 'message.js',
    dependencies: [ './name.js' ],
    code: '"use strict";\n\nObject.defineProperty(exports, ' +
      '"__esModule", {\n  value: true\n});\n\nvar _name = ' +
      'require("./name.js");\n\nexports.default = "hello " + ' +
      '_name.name + "!";',
    mapping: { './name.js': 2 }
  },
  {
    id: 2,
    filename: 'name.js',
    dependencies: [],
    code: '"use strict";\n\nObject.defineProperty(exports, ' +
      '"__esModule", {\n  value: true\n});\nvar name = exports.name ' +
      "= 'world';",
    mapping: {}
  }
]