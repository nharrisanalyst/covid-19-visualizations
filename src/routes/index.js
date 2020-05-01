import express from 'express';

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.sendfile('public/html/states.html');
});


router.get('/states', (req, res, next) => {
    res.sendfile('public/html/states.html');
});

router.get('/about', (req, res, next) => {
    res.sendfile('public/html/about.html');
});

router.get('/contact', (req, res, next) => {
    res.sendfile('public/html/contact.html');
});

module.exports = router;
