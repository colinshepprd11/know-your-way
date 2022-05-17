// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api', async (req, res) => {
  try {
    res.send('hi')
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});


app.listen(5000, async (err) => {
  console.log('API endpoint listening on port 5000');
});