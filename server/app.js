const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const cors = require('cors');
const { url } = require('./config/setting');
const { User, Slider, Lesson } = require('./config/db');
const { md5 } = require('./utils');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'public') });

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
    allowedHeaders: "Content-type,x-requested-with",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  })
)
app.use((req,res,next) => {
  if(req.method === 'OPTIONS') {
    res.sendStatus('200')
  } else {
    next();
  }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'GaryHjy',
  store: new MongoStore({url})

}))
app.post('/api/register', async (req, res) => {
  const user = req.body;
  user.avatar = `http://secure.gravatar.com/avatar/${md5(user.email)}?s=48`
  const result = await User.create(user);
  res.json({
    code: 0,
    data: result 
  })
})

app.post('/api/login', async (req, res) => {
  const params = req.body;
  const user = await User.findOne(params);
  if (user) {
    req.session.user = user;
    res.json({
      code: 0,
      data: user
    })
  } else {
    res.json({
      code: 1,
      error: '用户登录失败'
    })
  }
})

app.get('/api/validate', async (req, res) => {
  let user = req.session.user;
  if (user) {
    res.json({ code: 0, data: user });
  } else {
    res.json({ code: 1, error: '当前用户未登录' });
  }
})

app.get('/api/logout', async (req, res) => {
  req.session.user = null;
  res.json({ code: 0, data: "退出登录成功" });
})

app.post('/api/uploadAvatar', upload.single('avatar'), async (req, res) => {
  const avatar = `http://localhost:9000/${req.file.filename}` 
  await User.updateOne({
    _id: req.body.userId
  }, {
    avatar
  })
  if (req.session.user){
    req.session.user.avatar = avatar;
  }
  res.json({ 
    code: 0,
    data: avatar 
  });
})

app.get('/api/getSliders', async (req, res) => {
  const result = await Slider.find()
  res.json({
    code: 0,
    data: result
  });
})

// app.post('/api/getSliders', async (req, res) => {
//   const result = await Slider.create(req.body);
//   res.json({
//     code: 0,
//     data: result
//   })
// })


app.get('/api/getLessons', async (req,res) => {
  let { currentCategory: category = 'all', offset, limit} = req.query;
  offset = isNaN(offset) ? 0 : parseInt(offset);//偏移量 
  limit = isNaN(limit) ? 5 : parseInt(limit); //每页条数
  let query = {}
  if (category !== 'all') {
    query['category'] = category
  }
  const total = await Lesson.countDocuments(query);
  const list = await Lesson.find(query).sort({ order: 1}).skip(offset).limit(limit);
  res.json({ 
    code: 0, 
    data: { 
      list, 
      hasMore: total > offset + limit 
    }});
})

app.listen('9000', () => {
  console.log('启动成功！')
})
