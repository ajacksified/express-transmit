var assert = require('chai').assert,
    expressTransmit = require("../lib/express-transmit.js");

describe('expressTransmit', function(){
  it('should provide a subscriber list', function(){
    var app = {};
    app = expressTransmit(app);

    assert.isDefined(app.transmit.subscribers);
  });

  it('should register a fn for a given route', function(){
    var app = {},
        path = ":method/data/:collection/:id",
        fn = function(){};

    app = expressTransmit(app);

    app.transmit.provide(path, fn);

    var subscriber = app.transmit.subscribers[0];
    assert.equal(subscriber.path, path)
    assert.equal(subscriber.callbacks, fn)
    assert.equal(app.transmit.subscribers.length, 1)
  });
});

