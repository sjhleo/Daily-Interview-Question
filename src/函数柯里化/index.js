function curry(fn, args) {
    let length = fn.length;
    args = args ?? [];
    return function() {
        // 这里使用_args复制args 是防止柯里化的函数调用多次 影响args 
        // args的初始值应该是初次调用curry时的值，柯里化可以使用闭包保存参数 就是这个原理
        let _args = args.slice(0);
        for(let i = 0;i < arguments.length; i++) {
            _args.push(arguments[i])
        }
        if(_args.length >= length) {
            return fn.apply(this, _args);
        } else {
            return curry.call(this, fn, _args);
        }
    }
}
var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
}, ["a"]);

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]