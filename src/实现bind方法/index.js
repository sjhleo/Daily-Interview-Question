// ? bind()函数的两个特性：
// ?  函数科里化
// function add(a, b, c) {
//     var i = a+b+c;
//     console.log(i);
//     return i;
// }

// var func = add.bind(undefined, 100);//给add()传了第一个参数a
// func(1, 2);//103，继续传入b和c

// var func2 = func.bind(undefined, 200);//给func2传入第一个参数，也就是b，此前func已有参数a=100
// func2(10);//310,继续传入c，100+200+10
// ?  通过new的方式创建一个对象，bind()函数在this层面上并不起作用，但是需要注意在参数层面上仍起作用
// function foo(c) {
//     this.b = 100;
//     console.log(this.a);
//     console.log(c);
//     return this.a;
// }

// var func =  foo.bind({a:1},20);
// new func();//undefined 20，通过new创建对象func，bind绑定的c依旧起作用

// ? new bound的返回值是以original原函数构造器生成的新对象。original原函数的this指向的就是这个新对象
Function.prototype.bind = function (thisArg, ...params) {
    let fn = this;
    let result = function (...args) {
        let isNew = this instanceof result;
        let bindThis = isNew ? this : Object(thisArg);
        return fn.call(bindThis, ...params, ...args);
    };

    // result.prototype = Object.create(fn.prototype);
    function F() {}
    F.prototype = fn.prototype;
    result.prototype = new F();
    // 这种更接近实际的bind函数
    // 这种写法 下面的示例 f2.__proto__ === func.prototype;
    // 上面这种写法 f2.__proto__.__proto__ === func.prototype
    // result.prototype = fn.prototype;
    return result;
};
// 这样的结果
let func = function() {console.log(this.a)};
let f1 = func.bind({a: 123});
let f2 = new f1();
f2.__proto__ === f1.prototype; //  true
f2.__proto__.__proto__ === func.prototype //true 
// 这样就能满足使用f1 new出来的对象是func类型的
// 实际的bind函数
f2.__proto__ === func.prototype;