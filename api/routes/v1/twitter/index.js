const { Router } = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const Twit = require('twit');

const router = Router();
dotenv.config();
const Twitter = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

router.post('/post', (req, res) => {
  let rua;
  let bairro;

  axios.get(`https://viacep.com.br/ws/${req.body.zipcode}/json/`)
  .then(response => {
    rua = response.data.logradouro;
    bairro = response.data.bairro;
    const tweet = `ALERTA! Segundo último levantamento de testes da nossa base, dados apontam contamanição de água no bairro ${bairro}, ${rua}`
    
    Twitter.post('statuses/update', { status: tweet }).then(result => {
      console.log('You successfully tweeted this : "' + result + '"');
    }).catch(console.error);
  }).catch(console.error);


});


module.exports = router;