function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}
//这个exports究竟用来干啥子？？？？？？？？
module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next();
  }
}