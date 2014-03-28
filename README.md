# Shurly

Shurly is a simple, dependency free, Node.js module for ensuring indexes in MongoDb.

### Install

    npm install shurly 

### Use

    var shurly = require('shurly');
    
    var mongo // your mongo connection
    
    var collections = [{  
      name: 'posts',
      fields:  ['_userId']
    }];
    
    var log = function (mes) {
      console.log(mes);
    };

    shurly.ensure({
      mongo: mongo, 
      collections: collections,
      log: log
    }, function (err) {
      if (err) { console.log(err); }
    });
