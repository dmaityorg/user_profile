var express = require('express');
var router = express.Router();

const profileController = require('../controllers').profile;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/profile', profileController.list);
router.get('/api/profile/:id', profileController.getById);
router.put('/api/profile/:id', profileController.update);
router.post('/api/profile', profileController.add);


module.exports = router;
