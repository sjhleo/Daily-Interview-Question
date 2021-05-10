function new_instance_of(leftVaule, rightVaule) {
    let rightProto = rightVaule.prototype;
    while(true) {
        if(leftVaule === null) {
            return  false;
        }
        if(leftVaule === rightProto) {
            return true;
        }
        leftVaule = leftVaule.__proto__;
    }
}
// 结合原型链理解
// true
Object instanceof Object ;
// true
Object instanceof Function;
// true
Function instanceof Function;
// true
Function instanceof Object;

// typeof 只能判断 number, string, object, boolean, function, undefined, symbol 这七种类型
// 而且typeof null 返回的是object 而 null instanceof Object 是false 这是js的历史遗留bug