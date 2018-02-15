const Koa = require("koa");
const Router = require("koa-router");

var app = new Koa();
var router = new Router();


router.get('/:name', async(ctx) => {
    ctx.body = await `Hello, ${ctx.params.name}!\n`;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);