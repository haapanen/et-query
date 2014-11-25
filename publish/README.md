et-query
========
A small library for querying Wolfenstein: Enemy Territory servers.

## Usage
```javascript
var etQuery = require("enemy-territory-query");

etQuery.getStatus({
  address: "server-address-here",
  port: 27960
}, function (status, rinfo, err) {
  // If err was set, getting server status failed.
  if (err) {
    throw err;
  }
  // The status is a Buffer object.
  // To convert it to text, just use the .toString() method.
  console.log(status.toString());
});
```