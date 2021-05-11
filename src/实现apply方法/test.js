Function.prototype.call = function (context, ...args) {
    context = context || window;
    let method = Symbol("fn");
    context[method] = this;
    let result = context[method](...args);
    delete context.fn;
    return result;
};
Function.prototype.apply = function (context, arr) {
    context = context || window;
    let method = Symbol("fn");
    context[method] = this;
    let result = context[method](...arr);
    delete context.fn;
    return result;
};
Function.prototype.bind = function (context, ...args) {
    let self = this;
    let fn = function () {};
    let fbind = function (...args2) {
        let isNew = this instanceof self;
        return self.apply(isNew ? this : context, args.concat(args2));
    };
    fn.prototype = this.prototype;
    fbind.prototype = new fn();
    return fbind;
};
