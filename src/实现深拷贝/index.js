function copy(target, map = new WeakMap()) {
    if (typeof target != "object") {
        return target;
    }
    // 循环引用
    let obj = map.get(target);
    if (obj) {
        return obj;
    }
    // 兼容数组
    let copyTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget);
    for (let key in target) {
        copyTarget[key] = copy(target[key], map);
    }
    return copyTarget;
}
