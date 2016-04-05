var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  },
  upvotes: {
    type: Number,
    default: 0
  },
  usersWhoUpvoted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

PostSchema.methods.upvote = function(user, cb) {
  // if user has not upvoted yet:
  if (this.usersWhoUpvoted.indexOf(user._id) == -1) {
    this.usersWhoUpvoted.push(user._id);
    this.upvotes += 1;
    console.log('yes sir!');
    this.save(cb);

  } else {
    console.log('no sorry!');
    this.save(cb);
  }

  // this.upvotes += 1;
  // this.save(cb);
};

mongoose.model('Post', PostSchema);
