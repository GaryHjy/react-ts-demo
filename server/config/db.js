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

const LessonSchema = new mongoose.Schema({
  order: Number,//顺序
  title: String,//标题
  video: String,//视频
  poster: String, //海报
  url: String,//url地址
  price: Number,//价格
  category: String,//分类
})

const Lesson = conn.model('Lesson', LessonSchema);

module.exports = {
  User,
  Slider,
  Lesson
}
