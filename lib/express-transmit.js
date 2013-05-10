var express = require("express");

module.exports = function(app){
  app.transmit = {
    subscribers: [],

    provide: function(route, fn){
      app.transmit.subscribers.push(new express.Route("", route, fn));
    },

    request: function(path, data, callback){
      var subscriber, i;

      if(arguments.length == 2){
        callback = data;
        data = {};
      }

      for(i in app.transmit.subscribers){
        subscriber = app.transmit.subscribers[i];

        if(subscriber.match(path)){
          subscriber.callbacks(subscriber.params, data, callback);
        }
      }
    }
  }

  return app;
};

