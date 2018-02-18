const app = require('./app.js');
const supertest = require('supertest');


describe("Hello world test", function() {
    let server = app.listen();
    let request = supertest.agent(server);


    it("Says 'Hello!'", function(done) {
        request
            .get("/")
            .expect("Hello!")
            .expect(200, done);
    })
});