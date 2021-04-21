// ?
const list = [1, 2, 3];
const square = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    });
};

function test() {
    list.forEach(async x => {
        const res = await square(x);
        console.log(res);
    });
}
test();

// *
function test() {
    var p = Promise.resolve();
    list.forEach(x => {
        p = p.then(() => square(x).then(res => console.log(res)));
    });
}
// 这样写也可以
function test() {
    var p = Promise.resolve();
    list.reduce((pre, current) => {
        return pre.then(() => square(current).then(res => console.log(res)));
    }, p);
}
function test() {
    var p = Promise.resolve();
    list.reduce(async (pre, current) => {
        await pre;
        let result = await square(current);
        console.log(result);
        return result;
    }, p);
}
