function observe(obj){
  for(let prop in obj){
    if(obj.hasOwnProperty(prop)){
      let val = obj[prop]
      if(typeof prop === 'object'){
          val = observe(obj[prop])
        }
        Object.defineProperty(obj, prop, {set: function(value){
          if(typeof value === 'object'){
            value = observe(value)
          }
          val = value
        }})
        Object.defineProperty(obj, prop, {get: function(){console.log('setting a to', val)}})
      }
    }
    return obj
  }

observe(obj)

function observe(obj){
  for(let prop in obj){
    let val = obj[prop]
    if(typeof val === 'object'){
      val = observe(val)
    }

    Object.defineProperty(obj, prop, {
      get: function(){
        console.log('getting prop ', prop)
        return val
      },
      set: function(){
        console.log('setting prop ', prop, 'to', value)
        if(typeof value === 'object'){
          value = observe(value)
        }
        val = value
      }
    })
  }
  return obj
}



Function.prototype.bind = function(context, ...args) {
    let self = this;//谨记this表示 调用bind的函数
    let fBound = function(...args2) {
        //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
        return self.apply(this instanceof fBound ? this : context || window, [...args, ...args2);
    }

    fBound.prototype = Object.create(this.prototype);//保证原函数的原型对象上的属性不丢失
    return fBound;
}


Function.prototype.myBind = function(thisArg, ...fixedArgs) {
  var self = this
  return function bound(...args) {
    if (new.target == bound) {
      return new self(...fixedArgs, ...args)
    } 
    return self.call(thisArg, ...fixedArgs, ...args)
  }
}


function People(gender, name){
  this.gender = gender
  this.name = name
}

var zhang = new People("man", "zhang")

var Man = People.bind(null, 'man')

a = new Man('a') //=> a.__proto__ === People.prototype