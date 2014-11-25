/**
 * Created by Jussi on 25.11.2014.
 */
var etQuery = require("./enemy-territory-query");

etQuery.getStatus({
  address: "future.etjump.com",
  port: 27960
}, function (status, rinfo, err) {
  console.log(status.toString());
});