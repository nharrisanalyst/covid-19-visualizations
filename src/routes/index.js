import express from 'express';

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect('/states');
});


router.get('/states', (req, res, next) => {
    res.sendfile('public/html/states.html');
});

module.exports = router;
