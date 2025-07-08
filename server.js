const express = require('express');
const morgan = require('morgan');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const fs = require('fs/promises');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
require('dotenv').config();

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

app.get('/auth', (req, res) => {
  res.json({ auth: !!req.cookies.uid });
});

app.get('/auth/slack', async (req, res) => {
  const R = await fetch(`https://slack.com/api/oauth.v2.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${redirect_url}/auth/slack`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  }).then(R => R.json());
  if (R.ok && R.authed_user?.access_token) {
    res.cookie('uid', R.authed_user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    // Make internal request to /scrap
    // await fetch(`${redirect_url}/scrap`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Cookie': `uid=${R.authed_user.id}`
    //   },
    //   body: JSON.stringify({
    //     task: 'Login',
    //     text_entry: '-'
    //   })
    // });
  }
  res.redirect('/');
});

app.post('/scrap', async (req, res) => {
  // sanity check
  if (req.cookies.uid === undefined) {
    res.status(500).json({ success: false, lost_id: true });
    return;
  }
  // ...
  const task = req.body.task;
  const text_entry = req.body.text_entry;
  const R = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_SCRAPS_TABLE_ID}`, {
    headers: {
      'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
      'Content-Type': 'application/json'
    },
    // method: 'PATCH',
    method: 'POST',
    body: JSON.stringify({
      // performUpsert: { fieldsToMergeOn: ['Slack ID'] },
      records: [
        {
          fields: {
            'Slack ID': req.cookies.uid,
            'Task': task,
            'Text Entry': text_entry,
          },
        },
      ],
    }),
  }).then(R => R.json());
  console.log(R);
  if (R.error) {
    res.status(500).json({ success: false })
  } else {
    res.status(200).json({ success: true });
  }
});

app.get('/scraps', async (req, res) => {
  const R = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Scraps?fields%5B%5D=Task&filterByFormula=%7BSlack+ID%7D%3D%22${req.cookies.uid}%22`, {
    headers: {
      'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
      'Content-Type': 'application/json'
    },
    method: 'GET',
  }).then(R => R.json());
  console.log(R);
  if (R.error) {
    res.status(500).json({ success: false })
  } else {
    res.status(200).json({ success: true, ...R });
  }
});

app.get('/auth/logout', (req, res) => {
  res.cookie('uid', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // sameSite: 'lax',
    expires: new Date(0)
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});