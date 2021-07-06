const Mongoose = require('mongoose');
Mongoose.connect('mongodb://admin_idsos:admin321@127.0.0.1:27017/idsos?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = Mongoose.connection;

// const userSchema = new Mongoose.Schema({
//   username: {
//       type: String,
//       required: true,
//       minlength: 2,
//       maxlength: 20,
//       unique: true
//   }, 
//   email: {
//       type: String,
//       validate: {
//           validator: function(v){
//               return /^\S+@\S+$/.test(v);
//           },
//           message: props => `${props.value} is not a valid email!`
//       },
//       unique: true
//   },
//   name: {
//       type: String,
//       required: true,
//       minlength: 2,
//       maxlength: 40,
//   }, 
//   username: {
//       type: String,
//       required: true,
//   }, 
// })
// const User = Mongoose.model('User', userSchema);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect')
  // const test = await User.find()
  // console.log(test);
});