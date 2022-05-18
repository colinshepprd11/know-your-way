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

app.get('/', async (req, res) => {
  try {
    res.send(`hi from server port:${serverPort}`)
  } catch (err) {
    console.log(err);
  }
});

// SETUP DB CLIENT
const connectionString = process.env.DATABASE_URL;
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