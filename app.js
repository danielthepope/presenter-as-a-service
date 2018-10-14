const express = require('express');
const request = require('request');
const people = require('./people');
const app = express();

app.get('/', (req, res) => res.redirect('https://picsoung.typeform.com/to/Oo2bus'));

app.get('/:who', (req, res) => {
  const slide = req.query['slide'] === '_____' ? '' : req.query['slide'];
  const text = req.query['text'] === '_____' ? '' : req.query['text'];
  const textColour = req.query['textColour'];
  const person = req.params.who.toLowerCase();

  if (!people[person]) {
    return res.status(404).send(`Person not found. Try one of ${Object.keys(people)}`);
  }

  if (!slide && !text) {
    return res.status(400).send('We require either ?slide with an image URL or ?text with a message');
  }

  const brightness = people[person].brightness;
  const distortion = people[person].distortion;
  const base_image = people[person].base_image;

  const textColourValue = textColour ? `,co_rgb:${textColour}` : '';
  const textTemplate = text ? `w_800,h_600,c_fit,l_text:Arial_80:${text}${textColourValue}/` : '';

  const method = slide ? 'fetch' : 'upload';
  const slide_content = slide || 'white.jpg';

  const url = `https://res.cloudinary.com/dpope/image/${method}/${textTemplate}e_brightness_hsb:${brightness}/c_fit,e_distort:${distortion},w_700/g_north_west,e_screen,l_${base_image}/w_700/${slide_content}`;
  console.log(url);
  request({
    url: url,
  }).pipe(res);
});

app.listen(process.env.PORT || 3000);
