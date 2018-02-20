const Koa = require('koa');
const Router = require('koa-router');
const Mongoose = require('mongoose');

const app = module.exports = new Koa();
const router = new Router();

// Setup database
Mongoose.connect('mongodb://localhost:27017/7in14');
let database = Mongoose.connection;
database.on('error', console.error.bind(console, 'connection error: '));
database.once('open', () => { console.log('connected to database') });

var dataSourceSchema = new Mongoose.Schema({
    name: String,
    url: String
});

var DataSource = Mongoose.model('DataSource', dataSourceSchema);

// Setup routes
router.get('/hello/:name', async (ctx) => {
    ctx.body = `Hello, ${ctx.params.name}!`;
});

router.get('/ping', async (ctx) => {
    ctx.body = 'pong';
});

router.get('/dataSources', async (ctx) => {
    console.log('calling /dataSources');

    await DataSource.find(function (err, result) {
        if (err) {
            ctx.status = 500;
            return console.log(err);
        }

        console.log(result);
        ctx.body = result;
        ctx.status = 200;
    });
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);