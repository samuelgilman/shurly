# Shurly

Shurly is a simple, dependency free, Node.js module for ensuring indexes in MongoDb.

### Install

<pre>
npm install shurly 
</pre>

### Use

<pre>
var shurly = require('shurly');

shurly.ensure({

  mongo: mongo, 
  collections: [{
    name: 'webpages',
    fields:  ['url', 'ok']
  }]

}, function (err, ensured) {

  if (err) {
    console.log(err);
  } else {
    console.log(ensured); 
  }

});
</pre>
