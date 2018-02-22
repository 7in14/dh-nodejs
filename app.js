const Koa = require('koa');
const Body = require('koa-body');
const Router = require('koa-router');
const Mongoose = require('mongoose');

const DataSource = require('./models/dataSource');
const DataSourceController = require('./controllers/dataSource');
const PingController = require('./controllers/ping');
const FileController = require('./controllers/file');

const app = module.exports = new Koa();
const router = new Router();

// Setup database
let database = Mongoose.connection;
database.on('error', console.error.bind(console, 'connection error: '));
database.once('open', () => { console.log('connected to database') });
Mongoose.connect('mongodb://localhost:27017/7in14');

// Setup routes
router.get('/ping', PingController.get);

router.get('/dataSources', DataSourceController.getAll);
router.get('/dataSource/:id', DataSourceController.get);
router.put('/dataSource', Body(), DataSourceController.put);
router.delete('/dataSource/:id', DataSourceController.delete);

router.get('/file', FileController.get);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);