'use strict'

const app = require('../app.js');
const supertest = require('supertest');
const sinon = require('sinon');
const DataSource = require('../models/dataSource');

const sandbox = sinon.createSandbox();

describe('DataSource Tests', function() {
    let server = app.listen();
    let request = supertest.agent(server);

    const validId = '5a7891604fc48cd116842dc1';
    const docNoId = { 'name': 'n', 'url': 'u' };
    const doc = { 'name': 'n', 'url': 'u', '_id': validId };
    const invalidDoc = { 'url': 'u', '_id': validId };  // missing name

    afterEach(function() {
        sandbox.restore();
    });

    it('get /dataSources', function(done) {
        const blank = 'blank';
        sandbox.stub(DataSource, 'find').resolves(blank);

        request
            .get('/dataSources')
            .expect(blank)
            .expect(200, done);
    });

    it('get /dataSource/:id', function(done) {
        
        sandbox.stub(DataSource, 'find').resolves(doc);

        request
            .get('/dataSource/' + validId)
            .expect(doc)
            .expect(200, done);
    });

    it('get /dataSource/:id with bad id', function(done) {
        request
            .get('/dataSource/badId0000')
            .expect(400, done);
    });

    it('get /dataSource/:id not found', function(done) {
        sandbox.stub(DataSource, 'find').resolves([]);

        request
            .get('/dataSource/' + validId)
            .expect(404, done);
    });

    it('put /dataSource', function(done) {
        sandbox.stub(DataSource.prototype, 'save').resolves(doc);

        request
            .put('/dataSource', docNoId)
            .expect(doc)
            .expect(201, done);
    });

    it('put /dataSource bad document', function(done) {
        sandbox.stub(DataSource.prototype, 'save').rejects({name: 'ValidationError'});

        request
            .put('/dataSource', invalidDoc)
            .expect(400, done);
    });
    
    it('del /dataSource', function(done) {
        sandbox.stub(DataSource, 'findOneAndRemove').resolves(doc);

        request
            .del('/dataSource/' + validId)
            .expect(202, done);
    });

    it('del /dataSource not found', function(done) {
        sandbox.stub(DataSource, 'findOneAndRemove').resolves();

        request
            .del('/dataSource/' + validId)
            .expect(404, done);
    });

    it('del /dataSource bad id', function(done) {
        sandbox.stub(DataSource, 'findOneAndRemove').resolves();

        request
            .del('/dataSource/badId0000', invalidDoc)
            .expect(400, done);
    });
});
