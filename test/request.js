var assert = require('chai').assert,
    expressTransmit = require("../lib/express-transmit.js");

describe('expressTransmit', function(){
  it('should fire a fn for a given route', function(done){
    var app = {},
        path = ":method/data/:collection",
        data = { format: "long" },
        fn = function(params, passedData, passedCallback){ 
          assert.equal(params.method, "get");
          assert.equal(params.collection, "users");
          assert.equal(passedData, data);
          assert.equal(passedCallback, callback);
          done();
        },
        callback = function(){};

    app = expressTransmit(app);

    app.transmit.provide(path, fn);

    app.transmit.request("get/data/users", data, callback);
  });
});

