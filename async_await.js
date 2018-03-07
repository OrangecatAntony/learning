/*
即使用async关键字修饰function即可，async函数的特征在于调用return返回的并不是一个普通的值，
而是一个Promise对象，如果正常return了，则返回Promise.resolve(返回值)，如果throw一个异常了，
则返回Promise.reject(异常)。也就是说async函数的返回值一定是一个promise，只是你写出来是一个普通的值，
这仅仅是一个语法糖。await关键字只能在async函数中才能使用，也就是说你不能在任意地方使用await。
await关键字后跟一个promise对象，函数执行到await后会退出该函数，
直到事件轮询检查到Promise有了状态resolve或reject 才重新执行这个函数后面的内容。
*/ 
var i = 0;
//函数返回promise
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('我执行好了');
            i++;
            if (i >= 2) reject(new Error('i>=2'));
            else resolve(i);
        }, ms);
    })
}

(async function () {
    try {
        var val;
        val = await sleep(1000);
        console.log(val);
        val = await sleep(1000);
        console.log(val);
        val = await sleep(1000);
        console.log(val);
    }
    catch (err) {
        console.log('出错啦:'+err.message);
    }
} ())
console.log("主程序没有被阻塞");
