function compose(...fns) {
    return function (...args) {
        let list = fns.slice();
        while (list.length) {
            args = list.pop()(args);
        }
        return args;
    };
}
function composePromise(...fns) {
    return function (...args) {
        let list = fns.slice();
        let init = list.pop();
        list.reduce((seq, fn) => {
            seq.then(function (result) {
                fn.call(null, result);
            });
        }, Promise.resolve(init.aplly(null, args)));
    };
}
