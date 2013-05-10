express-transmit
================

An [express.js](https://github.com/visionmedia/express) utility for firing off
named events that you expect to callback.

Installation
------------

```
npm install express-transmit
```

Usage
-----

```javascript
var express = require('express'),
    expressTransmit = require('express-transmit'),
    app = express.createServer(),
    http = require('http');

app.eventRouter = expressTransmit(app);

// Provide an endpoint; external for prod, dummy data for development
app.configure('production', function(){
  app.transmit.provide(':method/data/:collection/:id', function(params, data, callback){
    http.get('http://myapi.com/users/' + params.id, function(res){
      var chunks = [];

      res.on('data', function(chunk){
        chunks.push(chunk);
      });

      res.on('end', function(){
        callback(null, JSON.parse(chunks.join(''));
      });
    }).on('error', function(error){
      callback(error);
    });
  });
});

app.configure('development', function(){
  app.transmit.provide(':method/data/:collection/:id', function(params, data, callback){
    callback(null, { 
      id: 1,
      name: 'Jack' 
    });
  });
});

// Perform a request
app.get('/api/users/1', function(req, res){
  app.request('get/data/users/1', function(params, data, function(err, data){
    if(!err){
      res.json(data);
    }else{
      res.json({ error: err.message });
    }
  });
});
```

