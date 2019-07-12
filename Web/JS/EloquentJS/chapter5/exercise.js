// ! Historical life expectancy
// * 计算不同时期人群的年龄
const ANCESTRY = JSON.parse(require("./ancestry"));

// * reduce
function groupBy(ary, f) {
  let sum = {};
  // * reduce
  for (let element of ary) {
    sum = f(sum, element);
  }
  return sum;
}

function groupDate(sum, object) {
  // * 根据object.died的时间得出century时间(>100)
  let century = Math.ceil(object.died / 100) * 100;
  // * 如果sum中没有该属性, 创建该属性
  if (!sum[century]) {
    sum[century] = [object.died - object.born];
  } else {
    // * 否则直接添加
    sum[century].push(object.died - object.born);
  }
  return sum;
}

console.log(groupBy(ANCESTRY, groupDate));

// * 计算数组元素的平均值, memo * index 为之前项总和
function average(memo, item, index) {
  return (memo * index + item) / (index + 1);
}

// * 计算obj中不同属性的属性值(数组)的平均值
function expectancy(obj) {
  let result = {};
  for (let element in obj) {
    result[element] = obj[element].reduce(average).toFixed(1);
  }
  return result;
}

console.log(expectancy(groupBy(ANCESTRY, groupDate)));

// ! Flattening
// * [1, [1, 3, 2], [4, 5]] => [1, 1, 3, 2, 4, 5]
function flatten(memo, a) {
  // * 如果a为数组, 就将其和累积的项合并
  if (Array.isArray(a)) memo = memo.concat(a);
  // * 如果是其他项, 直接push到累积的项中
  else memo.push(a);
  return memo;
}

var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce(flatten, []));

// ! Mother-child age difference
// * get Mother's borthday
// * 过滤数据, 得到符合name值的新数组
function byName(name, data) {
  return data.filter(x => x.name === name);
}

// * 得到经过f()处理的ary的数组值的新数组
function groupByA(ary, f) {
  let sum = [];
  // * reduce
  for (let element of ary) {
    let age = f(element);
    if (age) sum.push(age);
  }
  return sum;
}

// * 调用byName()得到包含mother对象的新数组(只有一个元素), 如果mother对象存在, 
// * 返回和传入的object(子女)的born属性之差(即所需的生育年龄数据)
function getMage(object) {
  let mother = byName(object.mother, ANCESTRY);
  if (mother[0]) {
    return object.born - mother[0].born;
  }
}
console.log(
  groupByA(ANCESTRY, getMage)
    .reduce(average)
    .toFixed(1)
);

// ! every & some
function every(ary, f){
  // * 有序使用 of(array), 无序使用 in(object)
  for(let element of ary){
    if(!f(element)) return false 
  }
  return true
}
function some(ary, f){
  // * 有序使用 of(array), 无序使用 in(object)
  for(let element of ary){
    if(f(element)) return true
  }
  return false
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false