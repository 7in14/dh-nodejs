'use strict'

const supertest = require('supertest');
const sinon = require('sinon');
const nock = require('nock');
const chai = require('chai');
const app = require('../app');
const raleighCrime = require('../controllers/raleighCrime');
const expect = chai.expect;

const sandbox = sinon.createSandbox();

describe('DataSource Tests', function () {
    const testDoc = { name: 'test' };

    let server = app.listen();
    let request = supertest.agent(server);

    beforeEach(function () {
        sandbox.restore();
    });

    it('get /raleigh/crime', async() => {
        let scope = nock(raleighCrime.crimeUrl.origin).get(/.*/)
            .reply(200, testDoc);
        
        await request
            .get('/raleigh/crime')
            .expect(200, testDoc);

        expect(scope.isDone()).to.be.true;   // make sure it was called
    });

    it('get /raleigh/crime with query', async() => {
        let scope = nock(raleighCrime.crimeUrl.origin).get(/.*abc=123/)
            .reply(200, testDoc);

        await request
            .get('/raleigh/crime?query=abc%3D123')
            .expect(testDoc)
            .expect(200);

        expect(scope.isDone()).to.be.true;
    });
});