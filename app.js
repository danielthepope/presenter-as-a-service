const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/:who', (req, res) => {
  const slide = req.query['slide'];
  const person = req.params.who;

  res.send({person, slide});
})

app.listen(3000);
