'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Session } = require('inspector');
const app = express();
const port = 3000;

const user = {name: 'foo', password: 'bar'};
let pageViews = 0;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'afshjgfgdgf899ew', resave: false, saveUninitialized: true }));

app.get('/', (req, res) => {
  //global values are shared between all clients/sessions
  pageViews++;
  console.log('global pageViews', pageViews);
  if(req.session.pageViews != 0){
    req.session.pageViews++;
  } else {
    req.session.pageViews = 0;
  }
  console.log('session pageViews', req.session.pageViews);

  res.render('home');
});
app.get('/form', (req, res) => {
  res.render('form');
});
app.get('/secret', (req, res) => {
  if(req.session.loggedIn ){
    res.render('secret');
  } else {
    res.status(403).send('you must login to see this!');
  }
 
});
app.post('/login', (req,res) => {
  console.log('trying to log in', req.body);
  if(req.body.username === user.name && 
    req.body.password === user.password){
    req.session.loggedIn = true;
    res.redirect('/secret');
  } else {
    res.status(401).send('login failed');
  }
});
app.get('/logout', (req,res) => {
  req.session.loggedIn = false;
  res.redirect('/form');
});

//Cookie
app.get('/setCookie/:color', (req, res) => {
  req.params.color;
  res.cookie('color', req.params.color).send('cookie set');
});

app.get('/getCookie', (req,res) => {
  console.log('Cookies: ', req.cookies);
  res.send('Color cookie value: ' + req.cookies.color);
});

app.get('/deleteCookie', (req,res) => {
  res.clearCookie('color').send('color cookie deleted');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
