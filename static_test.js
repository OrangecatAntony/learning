const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()
/*
每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。
我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能
，如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了。
*/

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'


app.use(static(
  path.join( __dirname,  staticPath)//_dirname是当前目录，后者是static资源相对于当前目录的位置
))//访问静态资源默认把body设置设置成要访问的东西


app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})//默认是3000

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})