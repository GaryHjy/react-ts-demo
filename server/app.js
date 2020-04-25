const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const cors = require('cors');
const { url } = require('./config/setting');
const { User } = require('./config/db');

app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
    allowedHeaders: "Content-type",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  })
)
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
  if (req.session.user) {
    res({
      code: 0,
      data: req.session.user
    })
  } else {
    res.json({
      code: 1,
      error: '此用户尚未登录'
    })
  }
})

app.listen('9000', () => {
  console.log('启动成功！')
})
