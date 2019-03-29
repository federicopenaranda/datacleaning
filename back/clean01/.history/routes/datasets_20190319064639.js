var express = require("express");
var router = express.Router();
var multer = require('multer');

const datasetFolder = '../public/datasets';
const fs = require('fs');


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
  fs.readdir(datasetFolder, (err, files) => {
    /* files.forEach(file => {
      console.log(file);
    }); */
    console.log(files);
    console.log(err);
  });

  res.status(200).send('');
});


module.exports = router;
