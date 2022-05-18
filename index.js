// Express App Setup
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg')

// SETUP SERVER
const app = express();
app.use(cors());
app.use(bodyParser.json());

const serverPort = process.env.PORT || 80
const connectionString = process.env.DATABASE_URL;

app.get('/', async (req, res) => {
  try {
    res.send(`hi from server port:${serverPort}`)
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const {user} = req.body
    const firstname = user.firstName ? user.firstName :  '';
    const lastname = user.lastName ? user.lastName : '';
    const email = user.email ? user.email : '';
    const values = [firstname, lastname, email];
    const text = 'INSERT INTO userx(firstname, lastname, email) VALUES($1, $2, $3);'
    await client.query(text, values);
    res.send({success:true});
  } catch (err) {
    console.log(err);
    res.send({success:false});
  }
});


// SETUP DB CLIENT
const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

// INIT DB AND SERVER
client
  .connect()
  .then(() => {
    app.listen(serverPort, async (err) => {
      console.log(`API endpoint listening on port ${serverPort}`);
    });
  })
  .catch(err => {
    console.log(err)
  })