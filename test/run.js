/**
 * Created by Jussi on 24.11.2014.
 */

var etQuery = require("../enemy-territory-query");
var validServer = {
  address: "future.etjump.com",
  port: 27960
};
var noAddress = {};
var noPort = {};
var invalidServerAddress = {
  address: "future.etjump1.com",
  port: 27960
};

var disconnectPacket = new Buffer("\xff\xff\xff\xffdisconnect", "binary");

exports.tests = {
  getStatusValidAddressAndPort: function (test) {
    etQuery.getStatus(validServer, function (status, rinfo, err) {
      test.ok(!err, "error: " + err);
      test.ok(status.length > 0 && status !== disconnectPacket,
        "invalid response packet.");
    });
    test.done();
  },

  getStatusInvalidAddress: function (test) {
    etQuery.getStatus(invalidServerAddress, function (status, rinfo, err) {
      test.ok(!err && err.length > 0, "no error");
    });

    test.done();
  },

  getStatusNoAddress: function (test) {
    etQuery.getStatus(noAddress, function () {

    });
    test.done();
  },

  getStatusNoPort: function (test) {
    etQuery.getStatus(noPort, function () {

    });
    test.done();
  },

  getStatusInvalidPort: function (test) {
    etQuery.getStatus({address: "future.etjump.com", port: "abc"},
      function () {

    });
    test.done();
  },

  getInfoValidAddress: function (test) {
    test.done();
  },

  getInfoInvalidAddress: function (test) {
    test.done();
  },

  getInfoValidPort: function (test) {
    test.done();
  },

  getInfoInvalidPort: function (test) {
    test.done();
  },
};