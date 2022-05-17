// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 80

app.get('/', async (req, res) => {
  try {
    res.send('hi from server')
  } catch (err) {
    console.log(err);
    logger.info(err);
  }
});


app.listen(port, async (err) => {
  console.log(`API endpoint listening on port ${port}`);
});