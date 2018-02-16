const app = require('./app.js');
const supertest = require('supertest');

//let request = supertest.agent(app.listen());

describe("Hello world test", function() {
    it("Says 'Hello!'", function(done) {
        request
            .get("/")
            .expect("Hello!")
            .expect(200, done);
    })
});

//request.close();