const supertest = require('supertest')

  describe("GET /", function() {
    let server;
    beforeEach(() => {
      server = require("../src/index");
    });
    afterEach(() => {
      server.close()
    });
    it("it should has status code 200", function(done) {
      supertest(server)
        .get("/")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
  });

  describe("POST /", function() {
    let server;
    beforeEach(() => {
      server = require("../src/index");
    });
    afterEach(() => {
      server.close()
    });
    it("it should return status 200", function(done) {
      supertest(server)
        .post("/")
        .send({name:"louis"})
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
  });
