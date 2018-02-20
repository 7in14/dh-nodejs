const app = require('./app.js');
const supertest = require('supertest');


describe("7 in 14 Tests", function() {
    let server = app.listen();
    let request = supertest.agent(server);


    it("Ping Pong", function(done) {
        request
            .get("/ping")
            .expect("pong")
            .expect(200, done);
    })
});