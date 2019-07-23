const express = require('express');
const multer = require('multer');
const path = require('path');
var Volunteer = require('./routes/volunteer')
var app = express.Router();

// app.post('/api/file',Volunteer.uploadFile);
// app.get('/api/file',Volunteer.getUploadFile)

// app.get('/',Volunteer.getCreation)
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage}).single('file');
  
  app.get('/',function(req,res){
      return res.render('creation')
  });
  
  app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
    console.log(req.file,"req.file");
    // console.log(req.file.path);
      if(err) {
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
  });
  });
  
module.exports = app;
