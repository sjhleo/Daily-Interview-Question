function newFunction() {
    let fn = [].shift.call(arguments);
    if (Object.prototype.toString.call(fn) !== "[object Function]") {
        return console.error("参数必须传入函数对象");
    }
    // let f = function() {};
    // f.prototype = fn.prototype;
    // let obj = new f();
    // 如果使用 obj = Object.create(null) , 
    // 那么 obj.__proto__ = fn.prototype; 这一句不是修改obj的原型链，而是添加了__proto__这个属性
    // 所以下面测试的person.sayHello()会报错！
    // obj = Object.create(null);Object.setPrototypeOf(obj, fn.prototype); 这样写就没有问题
    let obj = {};
    obj.__proto__ = fn.prototype;
    let result = fn.apply(obj, arguments);
    return typeof result === "object" ? result || obj : obj;
}
function Otaku(age) {}

Otaku.prototype.sayHello = function () {
    console.log("hello");
};

var person = newFunction(Otaku, "Kevin", "18");
console.log(person);
person.sayHello();
