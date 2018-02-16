var Koa = require("koa");
var Router = require("koa-router");

var app = module.exports = new Koa();
var router = new Router();

router.get("/:name", async(ctx) => {
    ctx.body = `Hello, ${ctx.params.name}!`;
});

router.get("/", async(ctx) => {
    ctx.body = "Hello!";
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);