var express = require("express");
var router = express.Router();
var multer = require('multer');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/datasets')
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + '-' + file.originalname )
    }
});

var upload = multer({storage: storage});

router.post('/upload_dataset', upload.single('datasetFile'), (req, res, next) => {
    const response = {'message': 'File uploaded successfully', 'file': req.file.filename};
    res.status(200).send(JSON.stringify(response));
});


router.get('/dataset_list', (req, res, next) => {
  const datasetFolder = '../public/datasets';
  const fs = require('fs');

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });
});


module.exports = router;
