const app = require('../app.js');
const supertest = require('supertest');
const sinon = require('sinon');
const DataSource = require('../models/dataSource');

const sandbox = sinon.createSandbox();

describe("DataSource Tests", function() {
    let server = app.listen();
    let request = supertest.agent(server);

    const validId = '5a7891604fc48cd116842dc1';

    beforeEach(function() {
        sandbox.restore();
    });

    it("get /dataSources", function(done) {
        const blank = 'blank';
        sandbox.stub(DataSource, 'find').resolves(blank);

        request
            .get("/dataSources")
            .expect(blank)
            .expect(200, done);
    });

    it("get /dataSource/:id", function(done) {
        const doc = { 'name': 'n', 'url': 'u' };
        sandbox.stub(DataSource, 'find').resolves(doc);

        request
            .get("/dataSource/" + validId)
            .expect(doc)
            .expect(200, done);
    });

    it("get /dataSource/:id with bad id", function(done) {
        request
            .get("/dataSource/badId0000")
            .expect(400, done);
    });

    it("get /dataSource/:id not found", function(done) {
        sandbox.stub(DataSource, 'find').resolves([]);

        request
            .get("/dataSource/" + validId)
            .expect(404, done);
    });
});
