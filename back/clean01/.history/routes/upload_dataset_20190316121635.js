var express = require("express");
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/datasets')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage: storage});

router.post('/upload_dataset', /* upload.single('image'), */ (req, res, next) => {
    //console.log(req.file.filename);
    res.json({'message': 'File uploaded successfully', 'file': req.file.filename});
});


module.exports = router;
