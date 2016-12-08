(function() {
  'use strict';

  var mongoose = require('mongoose');
  var mongoURL;

  if (process.env.NODE_ENV === "production") {
      mongoURL = process.env.MONGODB_URI;
  } else {
      mongoURL = 'mongodb://localhost/news';
  }

  mongoose.connect(mongoURL, function(err) {
    if (err) {
      console.log('Failed connecting to Mongodb!');
    } else {
      console.log('Successfully connected to Mongodb!');
    }
  });

})();
