//中间件处理post请求
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
//post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
const app = new Koa();
//所以，我们又需要引入另一个middleware--koa-bodyparser来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
//action在submit之后的网页域名加入/singn
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

// add router middleware:
app.use(bodyParser());//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');