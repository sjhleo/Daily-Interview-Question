function heapSort(arr) {
    // i节点的子节点下标为 2i+1 和2i+2 所以最后一个非叶子节点 2i+2 >=length
    // i>= length/2 -1
    // 从最后一个非叶子节点开始 把所有非叶子节点调整成大顶堆
    // 调整完以后 arr[0]为最大元素 其他所有非叶子节点也满足大顶堆，但是非叶子节点的大小顺序不定
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        console.log(i);
        adjust(arr, i, arr.length);
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        // 将arr[0](a[0] - a[i]的最大值)与arr[i]互换，此时arr[i] - arr[arr.length -1] 是已经按照升序排好 ，arr[arr.length -1]最大
        swap(arr, 0, i);
        // 这时候arr[0]的值被置换，可能破坏大顶堆，但是其他非叶子节点均满足大顶堆，所以这里针对arr[0]进行大顶堆调整
        // 剩余需要排序的数组长度为i
        adjust(arr, 0, i);
    }
}
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function adjust(arr, i, length) {
    // 需要调整大顶堆的当前元素
    let temp = arr[i];
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        temp = arr[i];
        // 找到2个子节点较大的一个
        if (j + 1 < length && arr[j] < arr[j + 1]) {
            j++;
        }
        // 如果子节点大于当前节点 则需要调整子节点和当前节点位置
        // 并且这样调整后 还要继续循环调整 因为这样可能破坏了子节点j的大顶堆
        if (arr[j] > temp) {
            swap(arr, i, j);
            i = j;
        } else {
            // 如果当前节点大于子节点 说明是满足大顶堆的，而且由于没有产生移动，
            // 下面的节点都是满足的 ,直接退出循环
            break;
        }
    }
}
let array = [11, 3, 4, 5, 23, 1];
heapSort(array);
console.log(array);
