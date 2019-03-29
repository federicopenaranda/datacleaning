var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/upload_dataset', function(req, res, next) {
  
    var formidable = require('formidable');
    var fs = require('fs');
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      var oldpath = files.connection_driver_file.path;
      var newpath = global.connectionDriverPath + files.connection_driver_file.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err){
            return res.send(`{"success":"false", "msg":"File Upload Error."}`);
        }
        else
        {
            return res.send(`{"success":"true", "msg":"File Uploaded.", "name":"${files.connection_driver_file.name}"}`);
        }

      });
    });

});

module.exports = router;