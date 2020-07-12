const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const qs = require('querystring');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let client_id = 'CLIENT_ID';
let client_secret = 'CLIENT_SECRET';

const data = {
  grant_type: 'client_credentials',
};
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
  },
};

// get token response
app.get('/auth', async function (req, res, next) {
  try {
    const access_token = await axios
      .post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(data),
        config
      )
      .then((response) => {
        console.log(`Status: ${response.status}`);
        console.log('Body: ', response.data);
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(access_token);
    return res.json(access_token);
  } catch (e) {
    return next(e);
  }
});

app.get('/search', async function (req, res, next) {
  try {
    return res.json({"hello": "hello"});
  } catch (e) {
    return next(e);
  }
});


app.listen(3001, () => console.log('Server started on 3001'));
