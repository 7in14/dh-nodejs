'use strict'

const supertest = require('supertest');
const sinon = require('sinon');
const nock = require('nock');
const chai = require('chai');
const Mongoose = require('mongoose');
const app = require('../app.js');
const allData = require('../controllers/allData');
const DataSource = require('../models/dataSource');

const expect = chai.expect;

const sandbox = sinon.createSandbox();

describe('DataSource Tests', function () {
    const testUrl = 'http://test';
    const dataSources = [
        { name: 'test1', url: testUrl + '/1' },
        { name: 'test2', url: testUrl + '/2' }
    ];

    let server = app.listen();
    let request = supertest.agent(server);

    beforeEach(function() {
        sandbox.stub(Mongoose, 'connect');
    });
    
    afterEach(function () {
        sandbox.restore();
    });

    it('get /allData', async() => {
        sandbox.stub(DataSource, 'find').resolves(dataSources);

        var scope1 = nock(testUrl).get("/1").reply(200, []);
        var scope2 = nock(testUrl).get("/2").reply(200, []);

        await request
            .get('/allData')
            .expect(200);

        expect(scope1.isDone()).to.be.true;
        expect(scope2.isDone()).to.be.true;
    });
});