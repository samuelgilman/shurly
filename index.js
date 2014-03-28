module.exports = {

  ensure: function(params, next) {

    var that = this;
    var mongo = params.mongo;
    var collections = params.collections;
    var log = (params.log || function (mes) {});

    that.mongo = mongo;
    that.log = log;

    that.ensureCollection({
      index: 0,
      collections: collections
    }, function (err) {
      next(err);
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
        fields: fields

      }, function (err) {
      
        if (err) {
          next(err);
        } else {

          that.ensureCollection({
            index: (index + 1),
            collections: collections
          }, next);
      
        }

      });

    } else {
      next();
    }

  },

  ensureCollectionField: function(params, next) {

    var that = this
    var log = that.log;
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

          log('ensured ' + name + '.' + field);

          that.ensureCollectionField({
            index: (index + 1),
            name: name,
            fields: fields
          }, next);

        }

      });

    } else {
      next();
    }

  }

};
