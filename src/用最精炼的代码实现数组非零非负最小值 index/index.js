function findNumIndex(arr) {
    let result = [-1, Infinity];
    arr.forEach(function (obj, index) {
        if (obj > 0 && obj < result[1]) {
            result = [index, obj];
        }
    });
    return result[0] > -1 ? result : undefined;
}
