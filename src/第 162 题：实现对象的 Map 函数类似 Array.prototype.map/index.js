function map(obj, fn) {
    let result = obj;
    Object.keys(obj).forEach(function (key) {
        let value = fn.call(null, obj[key], key, obj);
        result[key] = value;
    });
    return result;
}
Object.prototype.map = function (fn) {
    return map.call(null, this, fn);
};
