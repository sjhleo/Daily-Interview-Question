Function.prototype.call = function (thisArg, ...args) {
    if (thisArg === undefined || thisArg === null) {
        thisArg = window;
    } else {
        thisArg = Object(thisArg);
    }
    let methodName = Symbol("method");
    thisArg[methodName] = this; // fn.call  this指向实际函数体 fn
    let result = thisArg[methodName](...args);
    delete thisArg[methodName];
    return result;
};
