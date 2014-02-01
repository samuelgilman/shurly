module.exports = {

  ensure: function(params, next) {

    var that = this;
    var mongo = params.mongo;
    var collections = params.collections;

    that.mongo = mongo;

    that.ensureCollection({
      index: 0,
      collections: collections,
      results: [] 
    }, function (err, results) {
      next(err, results);
    });

  },

  ensureCollection: function(params, next) {

    var that = this;
    var results = params.results;
    var index = params.index;
    var collections = params.collections;
    var collection = collections[index];

    if (collection) {

      var name = collection.name;
      var fields = collection.fields;

      that.ensureCollectionField({

        index: 0,
        name: name,
        fields: fields,
        results: results 

      }, function (err, results) {
      
        if (err) {

          next(err);

        } else {

          that.ensureCollection({
            index: (index + 1),
            collections: collections,
            results: results
          }, next);
      
        }

      });

    } else {

      next(null, results);
  
    }

  },

  ensureCollectionField: function(params, next) {

    var that = this
    var results = params.results;
    var mongo = that.mongo;
    var name = params.name;
    var index = params.index;
    var fields = params.fields;;
    var field = fields[index];

    if (field) {

      mongo.collection(name).ensureIndex(field, function(err) {

        if (err) {

          next(err);

        } else {

          results.push('ensured ' + name + '.' + field);

          that.ensureCollectionField({
            index: (index + 1),
            name: name,
            fields: fields,
            results: results 
          }, next);

        }

      });

    } else {

      next(null, results);
  
    }

  }

};
