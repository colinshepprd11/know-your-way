// Express App Setup
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const moment = require('moment-timezone');


// SETUP TIMEZONE edit
var momentObject = moment.tz("America/New_York");

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

// Post new CB user (colinsheppard10.github.io)
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

// Get computation results (colinshepprd11.github.io)
app.get('/api/data', async (req, res) => {
  try {
    const text = 'SELECT * from morning_routine;'
    const results = await client.query(text);
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.send({success:false});
  }
});

// Post computation daily result (colinshepprd11.github.io)
app.post('/api/insert', async (req, res) => {
  try {
    const currentDate = momentObject.format('yyyy-MM-DD')
    const getQuery = `SELECT * from morning_routine where "time" = '${currentDate}';`
    const queryResults = await client.query(getQuery);
    let insertStatement;
    if(queryResults.rows.length) {
      const currentValue = queryResults.rows[0].study_session_results + 1;
      insertStatement = `UPDATE morning_routine set "study_session_results" = ${currentValue} where "time" = '${currentDate}';`
    } else {
      insertStatement = `INSERT INTO morning_routine (time) VALUES ('${currentDate}');`
    }
    await client.query(insertStatement);

    const text = 'SELECT * from morning_routine;'
    const results = await client.query(text);
    res.send(results.rows);

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

//   CREATE TABLE userx (
//     time DATE DEFAULT CURRENT_DATE,
//     firstName varchar(255),
//     lastName varchar(255),
//     email varchar(255)
// );

// CREATE TABLE morning_routine(
//     time DATE PRIMARY KEY,
//     computation_correct INT,
//     random_correct INT,
//     study_session_results INT DEFAULT 1 
// );
