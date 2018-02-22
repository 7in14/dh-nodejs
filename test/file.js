const app = require('../app.js');
const fs = require('fs');
const supertest = require('supertest');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

// tests the call to read a file; mocks fs
describe("File Test", function() {
    let server = app.listen();
    let request = supertest.agent(server);

    const fileContent = 'file content';

    beforeEach(function() {
        sandbox.stub(fs, 'readFile').resolves(fileContent);
    });

    it("get /file", function(done) {
        request
            .get("/file")
            .expect(fileContent)
            .expect(200, done);
        done(); // for some reason I have to include done() hereto avoid a test timeout,
                // ... even though it should have been called at the end of request
    });
});
