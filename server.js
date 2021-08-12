const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const v1 = require('./api/routes/v1');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use('/api/v1', v1);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

const port = process.env.PORT || 5000;

const cb = () => {
  console.log(`Server started on ${port}`);
};

app.listen(port, cb);