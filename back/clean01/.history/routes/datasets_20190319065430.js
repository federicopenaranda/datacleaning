var express = require("express");
var router = express.Router();
var multer = require('multer');

const datasetFolder = 'public/datasets';
const fs = require('fs');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/datasets')
    },
    filename: (req, file, cb) => {
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
    res.status(200).json(files);
  });

  fs.stat(datasetFolder, (err, stats) => {
    console.log(stats);
  })
});


module.exports = router;