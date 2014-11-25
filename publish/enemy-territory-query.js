var _ = require("lodash");
var udp = require("dgram");

var packetPrefix = "\xff\xff\xff\xff";

/**
 * Creates a quake 3 protocol packet out of the message
 * @param message
 * @returns {Buffer}
 */
function _createPacket(message) {
  return new Buffer(packetPrefix + message, "binary");
}

/**
 * Sends a UDP packet to the server defined in server-param.
 * Waits for the reply and calls the callback with the reply.
 * Also calls the callback if an error happens.
 *
 * server.address: server address
 * server.port: server port
 *
 * @param server
 * @param callback (message, rinfo, error)
 */
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
      udpClient.close();
    });
    var packet = _createPacket("getstatus");
    try {
      udpClient.send(packet, 0, packet.length, server.port, server.address,
        function (err) {
          if (err) {
            if (err.code === 'ENOTFOUND') {
              err.message = "Couldn't reach host "
                + server.address + ":" + server.port;
            }
            callback(null, null, err);
            udpClient.close();
          }
        });
    } catch (err) {
      callback(null, null, err);
      udpClient.close();
    }
  }
}

exports.getStatus = getStatus;

/**
 * Sends a UDP packet to the server defined in server-param.
 * Waits for the reply and calls the callback with the reply.
 * Also calls the callback if an error happens.
 *
 * server.address: server address
 * server.port: server port
 *
 * @param server
 * @param callback (message, rinfo, error)
 */
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
    var packet = _createPacket("getinfo");
    try {
      udpClient.send(packet, 0, packet.length, server.port, server.address,
        function (err) {
          if (err) {
            if (err.code === 'ENOTFOUND') {
              err.message = "Couldn't reach host "
                + server.address + ":" + server.port;
            }
            callback(null, null, err);
          }
        });
    } catch (err) {
      callback(null, null, err);
    }

  }
}

exports.getInfo = getInfo;
