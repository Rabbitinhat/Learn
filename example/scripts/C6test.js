var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";

person.sayName = function(){
    console.log(this.name);
};
person.sayName();

var person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",

    sayName: function(){
        console.log(this.name);
    }
}

var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
console.log(person.name);
person.name = "Greg";
console.log(person.name);

var person = {};
console.log(person.name);

Object.defineProperty(person, "name", {
    configurable: true,
    value: "Greg"
})

Object.defineProperty(person, "name", {
    value: "Greg"
});
console.log(person.name);

var book = {
    _year: 2004,
    edition: 1
};

Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004){
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

book.year = 2005;
console.log(book.edition);

var book = {
    _year: 2004,
    edition: 1
};

book.__defineGetter__("year", function(){
    return this._year;
});

book.__defineSetter__("year", function(newValue){
    if(newValue > 2004){
        this._year = newValue;
        this.edition += newValue - 2004;
    }
});

book.year = 2005;
console.log(book.edition);

var book = {};

Object.defineProperties(book, {
    _year: {
        writable: true,
        value: 2004
    },

    edition: {
        writable: true,
        value: 1
    },

    year: {
        get:function(){
            return this._year;
        },

        set: function(newValue){
            if(newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});

var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor.value);
console.log(descriptor.configurable);
console.log(descriptor.enumerable);
console.log(typeof descriptor.get);

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value);
console.log(descriptor.enumerable);
console.log(typeof descriptor.get);