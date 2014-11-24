/**
 * Created by Jussi on 24.11.2014.
 */

var _ = require("lodash");
var udp = require("dgram");

var packetPrefix = "\xff\xff\xff\xff";

function createPacket(message) {
  return new Buffer(packetPrefix + message, "binary");
}


function getStatus(server, callback) {
  var port;
  if (server.port && _.isNumber(server.port)) {
    port = parseInt(server.port, 10);
  }

  if (!server.address) {
    callback(null, null, "no server address defined.");
  } else if (!port) {
    callback(null, null, "invalid port or no port defined.");
  } else {
    var udpClient = udp.createSocket("udp4");
    udpClient.on("message", function (message, rinfo) {
      callback(message, rinfo);
    });
    var packet = createPacket("getstatus");
    udpClient.send(packet, 0, packet.length, server.port, server.address, function (err) {
      if (err) {
        callback(null, null, err);
      }
    });
  }
}

exports.getStatus = getStatus;

function getInfo(server, callback) {
  var port;
  if (server.port && _.isNumber(server.port)) {
    port = parseInt(server.port, 10);
  }

  if (!server.address) {
    callback(null, null, "no server address defined.");
  } else if (!port) {
    callback(null, null, "invalid port or no port defined.");
  } else {
    var udpClient = udp.createSocket("udp4");
    udpClient.on("message", function (message, rinfo) {
      callback(message, rinfo);
    });
    var packet = createPacket("getinfo");
    udpClient.send(packet, 0, packet.length, server.port, server.address, function (err) {
      if (err) {
        callback(null, null, err);
      }
    });
  }
}

exports.getInfo = getInfo;
