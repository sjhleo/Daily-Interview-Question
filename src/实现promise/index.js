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
            let result = callback.onFulfilled();
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
        for (let i = 0; i < callbacks.length; i++) {
            handle(callbacks[i]);
        }
    }
    fn(resolve);
}
let p = new newPromise((resolve) => {
    setTimeout(() => {
        resolve(5);
    }, 10000);
});
p.then((data) => {
    console.log(123);
})
p.then((data) => {
    console.log(456);
})