const Koa = require("koa");
const Router = require("koa-router");

var app = new Koa();
var router = new Router();


router.get('/:name', async(ctx) => {
    ctx.body = `Hello, ${ctx.params.name}!\n`;
});

router.get('/', async(ctx) => {
    ctx.body = `Hello!\n`;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);