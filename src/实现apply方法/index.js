Function.prototype.apply = function (thisArg, arr) {
    if (thisArg === undefined || thisArg === null) {
        thisArg = window;
    } else {
        thisArg = Object(thisArg);
    }
    let args = arr === undefined ? [] : arr;
    if (!isArrayLike(args)) {
        throw new TypeError("第二个参数既不为数组，也不为类数组对象。抛出错误");
    }
    args = Array.from(args);
    let methodName = Symbol("method");
    thisArg[methodName] = this; // fn.call  this指向实际函数体 fn
    let result = thisArg[methodName](...args);
    delete thisArg[methodName];
    return result;
};
function isArrayLike(o) {
    if (
        o && // o不是null、undefined等
        typeof o === "object" && // o是对象
        isFinite(o.length) && // o.length是有限数值
        o.length >= 0 && // o.length为非负值
        o.length === Math.floor(o.length) && // o.length是整数
        o.length < 4294967296
    )
        // o.length < 2^32
        return true;
    return false;
}
