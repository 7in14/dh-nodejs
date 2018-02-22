const app = require('../app.js');
const supertest = require('supertest');

// test the server
describe("Ping Test", function() {
    let server = app.listen();
    let request = supertest.agent(server);


    it("Ping Pong", function(done) {
        request
            .get("/ping")
            .expect("pong")
            .expect(200, done);
    })
});
