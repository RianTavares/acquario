const { Router } = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const upload = multer();
const router = Router();
dotenv.config();

router.post('/classify', upload.single('file'), async (req, res) => {
  const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    authenticator: new IamAuthenticator({
      apikey: process.env.WATSON_API_KEY,
    }),
    serviceUrl: process.env.WATSON_API_URL,
  });

  const classifyParams = {
    imagesFile: req.file.buffer,
    owners: ['me'],
    threshold: 0.6,
  };

  visualRecognition.classify(classifyParams)
    .then(response => {
      const classifiedImages = response.result;
      res.send(JSON.stringify(classifiedImages, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
});


module.exports = router;