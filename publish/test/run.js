var etQuery = require("../enemy-territory-query");

var disconnectPacket = new Buffer("\xff\xff\xff\xffdisconnect", "binary");

describe("ETQuery", function () {
  describe("getstatus", function () {
    it("Should print the status of a server with correct addr/port",
      function (done) {
        etQuery.getStatus({
          address: "future.etjump.com",
          port: 27960
        }, function (status, rinfo, err) {
          if (err) {
            throw err;
          }

          if (status.toString().length === 0) {
            throw "nope";
          }
          done();
        });
      });

    it("Should not succeed with an invalid address", function (done) {
      etQuery.getStatus({
        address: "abc",
        port: 27960
      }, function (status, rinfo, err) {
        if (!err) {
          throw "No error while supplying invalid address";
        }
        done();
      });
    });

    it("Should not succeed with no address", function (done) {
      etQuery.getStatus({port: 27960}, function (status, rinfo, err) {
        if (!err) {
          throw "No error";
        }
        done();
      });
    });

    it("Should not succeed with no port", function (done) {
      etQuery.getStatus({address: "future.etjump.com"}, function (status, rinfo, err) {
        if (!err) {
          throw "No error";
        }
        done();
      });
    });

    it("Should print the info of a server with correct addr/port",
      function (done) {
        etQuery.getInfo({
          address: "future.etjump.com",
          port: 27960
        }, function (status, rinfo, err) {
          if (err) {
            throw err;
          }

          if (status.toString().length === 0 ||
              status.toString() === disconnectPacket) {
            throw "No info";
          }
          done();
        });
      });

    it("Should not succeed with an invalid address", function (done) {
      etQuery.getInfo({
        address: "abc",
        port: 27960
      }, function (status, rinfo, err) {
        if (!err) {
          throw "No error while supplying invalid address";
        }
        done();
      });
    });

    it("Should not succeed with no address", function (done) {
      etQuery.getInfo({port: 27960}, function (status, rinfo, err) {
        if (!err) {
          throw "No error";
        }
        done();
      });
    });

    it("Should not succeed with no port", function (done) {
      etQuery.getInfo({address: "future.etjump.com"}, function (status, rinfo, err) {
        if (!err) {
          throw "No error";
        }
        done();
      });
    });
  });
});