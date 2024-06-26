const express = require('express'),
      app = express(),
      cors = require('cors'),
      getReq = require('./routes/getReq'),
      postReq = require('./routes/postReq'),
      patchReq = require('./routes/patchReq'),
      session = require('express-session'),
      passport = require('passport')
      dotenv = require('dotenv');
    
dotenv.config();


const port = process.env.PORT
// Middlware
app.use(
    session({
      secret: process.env.sk,
      resave: false,
      saveUninitialized: true,
      cookie: {
          maxAge: 1000*60*60*24,
          }
    })
  );

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', getReq);
app.use('/api', postReq);
app.use('/mod', patchReq);


passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})
