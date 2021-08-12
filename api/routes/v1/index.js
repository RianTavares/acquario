const { Router } = require('express');
const router = Router();

const recognition = require('./recognition');
const twitter = require('./twitter');


router.use('/recognition', recognition);
router.use('/twitter', twitter);
module.exports = router;