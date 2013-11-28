var express = require('express');

module.exports = function(app){
  app.transmit = {
    subscribers: [],

    provide: function(route, fn){
      app.transmit.subscribers.push(new express.Route('', route, fn));
    },

    request: function(path, data, callback){
      var subscribers, i;

      if(arguments.length == 2){
        callback = data;
        data = {};
      }

      subscribers = app.transmit.subscribers.filter(function(subscriber){
        return subscriber.match(path);
      })

      if(subscribers.length > 0){
        subscribers.forEach(function(subscriber, i){
          subscriber.callbacks(subscriber.params, data, callback);
        });
      }else{
        callback('No matching routes.');
      }
    }
  }

  return app;
};

