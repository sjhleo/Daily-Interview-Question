Promise.retry = function (fn, num = 1) {
    return new Promise(async (resolve, reject) => {
        while (num > 0) {
            try {
                let result = await fn();
                console.log(result);
                resolve(result);
                num = 0;
            } catch (error) {
                console.log(error);
                if (--num === 0) reject(error);
            }
        }
    });
};
function test() {
    const n = Math.random();
    return new Promise((resolve, reject) => {
        setTimeout(() => (n > 0.9 ? resolve(n) : reject(n)), 1000);
    });
}
Promise.retry(test, 5);
