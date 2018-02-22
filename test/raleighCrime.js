'use strict'

const supertest = require('supertest');
const sinon = require('sinon');
const nock = require('nock');
const app = require('../app');
const raleighCrime = require('../controllers/raleighCrime');

const sandbox = sinon.createSandbox();

describe('DataSource Tests', function () {
    let server = app.listen();
    let request = supertest.agent(server);

    beforeEach(function () {
        sandbox.restore();
    });

    it('get /raleigh/crime', function (done) {
        const testDoc = { name: 'test' };

        let scope = nock(raleighCrime.crimeUrl.origin).get(/.*/)
            .reply(200, testDoc);

        request
            .get('/raleigh/crime')
            .expect(testDoc)
            .expect(200, done);
    });
});