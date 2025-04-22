const express = require('express');
const morgan = require('morgan');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const fs = require('fs/promises');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const port = process.env.PORT || 3000;
const redirect_url = process.env.NODE_ENV === 'production'
  ? process.env.PRODUCTION_REDIRECT_URL
  : `http://localhost:${process.env.PORT}`

// static files
app.use('/assets', express.static('assets'));
app.use('/learn', express.static('learn'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/index.css', (req, res) => {
  res.sendFile(__dirname + '/index.css');
});
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});
app.get('/attribution.js', (req, res) => {
  res.sendFile(__dirname + '/attribution.js');
});
app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/index.js');
});
app.get("/favicon.svg", (req, res) => {
  res.sendFile(__dirname + '/favicon.svg');
});

app.get('/auth/slack', async (req, res) => {
  const R = await fetch(`https://slack.com/api/oauth.v2.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${redirect_url}/auth/slack`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  }).then(R => R.json());
  if (R.ok && R.authed_user?.access_token) {
    res.cookie('uid', R.authed_user.id);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});