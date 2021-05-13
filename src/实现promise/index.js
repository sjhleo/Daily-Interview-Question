// 1. 只含 resolve 方法的 Promise 模型
function newPromise(fn) {
    let state = "pending";
    let callbacks = [];
    let value = null;
    this.then = function (onFulfilled) {
        return new newPromise((resolve, reject) => {
            //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
            handle({
                onFulfilled,
                resolve
            });
        });
    };
    function handle(callback) {
        if (state === "pending") {
            return callbacks.push(callback);
        }
        if (state === "fulfilled") {
            if (!callback.onFulfilled) {
                return callback.resolve(value);
            }
            let result = callback.onFulfilled(value);
            callback.resolve(result);
        }
    }
    function resolve(newValue) {
        let fn = () => {
            if (state !== "pending") return;
            state = "fulfilled";
            value = newValue;
            handleCb();
        };
        // 模拟微任务
        setTimeout(fn, 0);
    }
    function handleCb() {
        while (callbacks.length) {
            const fulfiledFn = callbacks.shift();
            handle(fulfiledFn);
        }
    }
    fn(resolve);
}
let p = new newPromise((resolve) => {
    setTimeout(() => {
        resolve(5);
    }, 3000);
});
p.then((data) => {
    console.log(data);
    console.log(123);
});
p.then((data) => {
    console.log(data);
    console.log(456);
});
// 2. then返回的是promise 情况
// 调整resolve方法，处理返回值为promise的情况

function newPromise(fn) {
    let state = "pending";
    let callbacks = [];
    let value = null;
    this.then = function (onFulfilled) {
        return new newPromise((resolve, reject) => {
            //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
            handle({
                onFulfilled,
                resolve
            });
        });
    };
    function handle(callback) {
        if (state === "pending") {
            return callbacks.push(callback);
        }
        if (state === "fulfilled") {
            if (!callback.onFulfilled) {
                return callback.resolve(value);
            }
            let result = callback.onFulfilled(value);
            callback.resolve(result);
        }
    }
    function resolve(newValue) {
        console.log(newValue);
        console.log(this);
        const fn = () => {
            if (state !== "pending") return;

            if (
                newValue &&
                (typeof newValue === "object" || typeof newValue === "function")
            ) {
                const { then } = newValue;
                if (typeof then === "function") {
                    // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
                    //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
                    // 相当于吧本次resolve 传入本次then的onFulfilled返回的promise 的then的onFulfilled
                    // 本次then的onFulfilled返回的promise resolve后 就会执行 它的then的onFulfilled 也就是本次的resolve
                    // 然后最外层promise继续下去。。
                    then.call(newValue, resolve);
                    return;
                }
            }
            state = "fulfilled";
            value = newValue;
            handleCb();
        };

        setTimeout(fn, 0);
    }
    function handleCb() {
        while (callbacks.length) {
            const fulfiledFn = callbacks.shift();
            handle(fulfiledFn);
        }
    }
    fn(resolve);
}
new newPromise((resolve, reject) => {
    setTimeout(() => {
        resolve({ test: 1 });
    }, 1000);
})
    .then((data) => {
        console.log("result1", data);
        //dosomething
        return test();
    })
    .then((data) => {
        console.log("result2", data);
    });

function test(id) {
    return new newPromise((resolve) => {
        setTimeout(() => {
            resolve({ test: 2 });
        }, 5000);
    });
}
// 3. 添加reject逻辑
function newPromise(fn) {
    let state = "pending";
    let callbacks = [];
    let value = null;
    this.then = function (onFulfilled, onRejected) {
        return new newPromise((resolve, reject) => {
            //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
            handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            });
        });
    };
    function handle(callback) {
        if (state === "pending") {
            return callbacks.push(callback);
        }
        const cb =
            state === "fulfilled" ? callback.onFulfilled : callback.onRejected;
        const next = state === "fulfilled" ? callback.resolve : callback.reject;

        if (!cb) {
            next(value);
            return;
        }
        const ret = cb(value);
        next(ret);
    }
    function resolve(newValue) {
        console.log(newValue);
        console.log(this);
        const fn = () => {
            if (state !== "pending") return;

            if (
                newValue &&
                (typeof newValue === "object" || typeof newValue === "function")
            ) {
                const { then } = newValue;
                if (typeof then === "function") {
                    // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
                    //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
                    // 相当于吧本次resolve 传入本次then的onFulfilled返回的promise 的then的onFulfilled
                    // 本次then的onFulfilled返回的promise resolve后 就会执行 它的then的onFulfilled 也就是本次的resolve
                    // 然后最外层promise继续下去。。
                    then.call(newValue, resolve);
                    return;
                }
            }
            state = "fulfilled";
            value = newValue;
            handleCb();
        };

        setTimeout(fn, 0);
    }
    function reject(error) {
        const fn = () => {
            if (state !== "pending") return;

            if (
                error &&
                (typeof error === "object" || typeof error === "function")
            ) {
                const { then } = error;
                if (typeof then === "function") {
                    then.call(error, resolve, reject);
                    return;
                }
            }
            state = "rejected";
            value = error;
            handelCb();
        };
        setTimeout(fn, 0);
    }
    function handleCb() {
        while (callbacks.length) {
            const fulfiledFn = callbacks.shift();
            handle(fulfiledFn);
        }
    }
    fn(resolve,reject);
}
