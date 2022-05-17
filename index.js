// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    res.send('hi from server')
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});


app.listen(8080, async (err) => {
  console.log('API endpoint listening on port 8080');
});