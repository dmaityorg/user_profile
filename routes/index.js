var express = require('express');
var router = express.Router();

//File upload using multer
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({storage: storage});

const profileController = require('../controllers').profile;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/profile', profileController.list);
router.get('/api/profile/:id', profileController.getById);
router.put('/api/profile/:id', profileController.update);
router.post('/api/profile', profileController.add);

// Routes For File Upoad
router.post('/api/upload',upload.single('file'),function(req, res, next) {
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: 'http://localhost:4000/images/' + req.file.filename });
})

module.exports = router;
