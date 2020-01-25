const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(5004, () => {
  console.log('app listening on port 5002!')
});