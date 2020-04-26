const mongoose = require('mongoose');
const { url } = require('./setting');
const conn = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
  phone: String,
})

const User = conn.model('User', UserSchema);

const SliderSchema = new mongoose.Schema({
  url: String
})

const Slider = conn.model('Slider', SliderSchema);

module.exports = {
  User,
  Slider
}
