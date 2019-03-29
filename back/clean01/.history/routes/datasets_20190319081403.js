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


router.get('/dataset_list', async (req, res, next) => {

  let datasetResponse = [];



  import fs from 'fs';
  const fsPromises = fs.promises;

  async function listDir() {
    try {
      return await fsPromises.readdir(datasetFolder);
    } catch (err) {
      console.error('Error occured while reading directory!', err);
    }
  }

  console.log( listDir() );




  await fs.readdir(datasetFolder, async (err, files) => {
    files.forEach( (file) => {
      let fileData = { name: file, date: '' };
      datasetResponse.push(fileData);
    });
  });

  console.log(datasetResponse);

  for ( let i=0; i<datasetResponse.length; i++ ) {
    fs.stat(datasetFolder + '/' + datasetResponse[i].name, (err, stats) => {
      datasetResponse[i].date = stats.birthtime;
    });
  }

  res.status(200).json(datasetResponse);
  
  
});


module.exports = router;
