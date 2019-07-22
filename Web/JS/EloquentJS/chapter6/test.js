// * 扩展原型链
// * New initialization
function foo(){}
foo.prototype = {
  foo_prop: "foo val"
};

function bar(){}
var proto = new foo
proto.bar_prop = "bar val"
// * 重新赋值bar的原型
bar.prototype = proto
var inst = new bar
// * inst => bar.prototype => proto => foo.prototype => Object.prototype => null
console.log(inst.foo_prop)
console.log(inst.bar_prop)

// * Object create



function forOwn(obj, iterator){
  // * 防止hasOwnPropery方法被覆盖
  var hasOwn = Object.prototype.hasOwnProperty
  for(let element in obj){
    if(hasOwn.call(obj, element)){
      iterator(obj[element], element, obj)
    }
  }
}

// * 传入null 创建无原型对象
let map = Object.create(null)
console.log(Object.getPrototypeOf(map)) //->null
map["pizza"] = .069
console.log("toString" in map)
console.log("pizza" in map)

// * minHeight() min lines
// * minWidth() char numbers
// * draw
function rowHeights(rows){
  return rows.map(function(row){
    return row.reduce(function(max, cell){
      // * minHeight
      return Math.max(max, cell.minHeight())
    })
  })
}

function colWidths(rows){
  return rows[0].map(function(_, i){
    return rows.reduce(function(max, row){
      return Math.max(max, row[i].minWidth())
    }, 0)
  })
}

var blocks = [
  [
    'foo',
    'bar',
    'baz',
  ],
  
  [
    'aaaaaaa',
    'bbbbbbb',
    '       ',
  ],

  [
    'miao     ',
    '         ',
    '         ',
  ],
  
  [
    'the quick brown',
    'fox jumps over ',
    'the lazy dog   ',
  ]
]

function rowHeight(row){
  return row.map()
}