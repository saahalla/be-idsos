const Mongoose = require('mongoose');
Mongoose.connect('mongodb://admin_idsos:admin321@127.0.0.1:27017/idsos?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect')
});