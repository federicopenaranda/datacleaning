var express = require("express");
var router = express.Router();
var multer = require('multer');

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
    console.log(req.file.filename);
    const response = {'message': 'File uploaded successfully', 'file': req.file.filename};
    console.log(response);
    // res.send();
    res.status(200).send(JSON.stringify(response));
});


module.exports = router;
