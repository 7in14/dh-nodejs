const Koa = require('koa');
const Router = require('koa-router');
const mongoClient = require('mongodb').MongoClient;

const app = module.exports = new Koa();
const router = new Router();

var database;

mongoClient.connect('7in14-db:CIDWd20A5KCQMXYTSxYHbGlbm4SbwLj1z6yuoK6BwQCCgpjlzdc55VkCeLqRU4EWCUdsW1aDTq7H1SVJQN1BiA==@7in14-db.documents.azure.com:10255/?ssl=true', 
    function (error, client) {
        if(error != null) {
            console.log('error: ' + error);
        }
        else {
            console.log('connected');
            database = client.db('dh');
        }
    });


router.get('/hello/:name', async (ctx) => {
    ctx.body = `Hello, ${ctx.params.name}!`;
});

router.get('/ping', async (ctx) => {
    ctx.body = 'pong';
});

router.get('/dataSources', async (ctx) => {
    console.log('calling /dataSources');



    var dataSources = await db.get("dataSources");
    var data = await dataSources.find(/*{ name: 'US States' }*/)

    ctx.body = data;
    ctx.status = 200;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);