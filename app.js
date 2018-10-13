const express = require('express');
const request = require('request');
const people = require('./people');
const app = express();

app.use(express.static('./public'));

app.get('/:who', (req, res) => {
  const slide = req.query['slide'];
  const text = req.query['text'];
  const person = req.params.who.toLowerCase();

  if (!people[person]) {
    return res.status(404).send(`Person not found. Try one of ${Object.keys(people)}`);
  }

  if (!slide && !text) {
    return res.status(400).send('We require either ?slide with an image URL or ?text with a message');
  }

  if (text) {
    return res.status(400).send('Text not yet supported.');
  }

  const brightness = people[person].brightness;
  const distortion = people[person].distortion;
  const base_image = people[person].base_image;

  console.log({brightness, distortion, base_image})

  const url = `https://res.cloudinary.com/dpope/image/fetch/e_brightness_hsb:${brightness}/c_fit,e_distort:${distortion},w_500/g_north_west,e_screen,l_${base_image}/w_500/${slide}`;
  console.log(url);
  request({
    url: url,
  }).pipe(res);
});

app.listen(3000);
