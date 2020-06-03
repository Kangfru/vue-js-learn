const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

// 매번 서버 시작할 때마다 데이터 지움
// db.sequelize.sync({ force: true });
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(cors('http://localhost:3000'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session( {
   resave: false,
   saveUninitialized: false,
   secret: 'cookiesecret',
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
   res.status(200).send('Hello B');
});

app.post('/user', async (req, res, next) => {
   try{
      const hash = await bcrypt.hash(req.body.password, 12);
      const exUser = await db.User.findOne({
         email: req.body.email,
      });
      if (exUser) { // 이미 가입되어 있으면
         // return 필수
         return res.status(403).json({
            errorCode: 1,
            message: '이미 회원가입되어있습니다.',
         });
      }
      // 비밀번호 암호화
      // bcrypt, scrypt, pbkdf2
      const newUser = await db.User.create({
         email: req.body.email,
         password: hash,
         nickname: req.body.nickname,
      });
      return res.status(201).json(newUser);
   } catch (err) {
      console.log(err);
      return next(err);
   };
});

const user = {

};

app.post('/user/login', (req, res) => {
   req.body.email;
   req.body.password;
});

app.listen(3085, () => {
   console.log(`백엔드 서버 ${3085}번 포트에서 작동 중.`);
});
