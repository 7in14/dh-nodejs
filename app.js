const Koa = require('koa');
const Body = require('koa-body');
const Router = require('koa-router');
const Mongoose = require('mongoose');

const app = module.exports = new Koa();
const router = new Router();

// Setup database
Mongoose.connect('mongodb://localhost:27017/7in14');
let database = Mongoose.connection;
database.on('error', console.error.bind(console, 'connection error: '));
database.once('open', () => { console.log('connected to database') });

const dataSourceSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { versionKey: false });

const DataSource = Mongoose.model('DataSource', dataSourceSchema);

// Setup routes
router.get('/hello/:name', async (ctx) => {
    ctx.body = `Hello, ${ctx.params.name}!`;
});

router.get('/ping', async (ctx) => {
    ctx.body = 'pong';
});

router.get('/dataSources', async (ctx) => {
    console.log('getting /dataSources');

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

router.get('/dataSource/:id', async (ctx) => {
    console.log('getting /dataSource/id');

    const id = ctx.params.id;

    if (!Mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not valid: " + id)
        ctx.status = 400;
        return;
    }

    await DataSource.find({ _id: id }, function (err, result) {
        if (err) {
            ctx.status = 500;
            console.log(err);
        }
        else if (result.length === 0) {
            console.log("Could not find data source with id: " + id);
            ctx.status = 404;
        }
        else {
            console.log("Found data source: " + result);
            ctx.body = result;
            ctx.status = 200;
        }
    });
});

router.put('/dataSource', Body(), async (ctx) => {
    console.log('putting /dataSource');

    const dataSource = new DataSource(ctx.request.body);

    try {
        const result = await dataSource.save();
        console.log('saved new datasource')
        ctx.body = result;
        ctx.status = 201;
    } catch (error) {
        console.log('could not save datasource: ' + error);
        if (error.name == 'ValidationError') {
            ctx.status = 400;
        }
        else {
            ctx.status = 500;
        }
    }
});

router.delete('/dataSource/:id', async (ctx) => {
    console.log('deleting /dataSource/id');

    const id = ctx.params.id;

    if (!Mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not valid: " + id)
        ctx.status = 400;   // bad request
        return;
    }

    await DataSource.remove({ _id: id }, function (err, dataSource) {
        console.log("removed: " + dataSource);
    })
});

//app.use(body);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);