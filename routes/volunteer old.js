const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const bodyParser = require('body-parser');


// const express = require('express');
// var app = express.Router();


const path = require('path')
const fs = require('fs');

var db = require('../models')

const getCreation = function(req,res,next){
    var volunteer_role = req.body.volunteer_role || req.params.volunteer_role
    if(volunteer_role == "ADMIN" || volunteer_role== "SUPER_ADMIN"){
        return res.redirect('/create/volunteer')
    }
    return res.render('creation')
}

const createVolunteer = function(req,res,next){
    
    var volunteer_id = req.body.volunteer_id;
    var volunteer_name = req.body.volunteer_name;
    var volunteer_role = req.body.volunteer_role;
    var volunteer_team = req.body.volunteer_team;
    var volunteer_email = req.body.volunteer_email;
    var volunteer_password = req.body.volunteer_password;

    var salt = bcrypt.genSaltSync(8);
    var hash = bcrypt.hashSync(volunteer_password, salt);
    volunteer_password = hash;

    db.Volunteer.findOne({
        volunteer_email:volunteer_email
    })
    .exec(function(error,old_volunteer){
        if(error){
            return res.render('home',{error:"Volunteer not created"})
        }
        if(old_volunteer){
            return res.render('home',{volunteer:"volunteer already created"})
        }
        else if(!old_volunteer){
            db.Volunteer.create({
                volunteer_id:volunteer_id,
                volunteer_name:volunteer_name,
                volunteer_email:volunteer_email,
                volunteer_password:volunteer_password,
                volunteer_role:volunteer_role,
                volunteer_team:volunteer_team
            })
            .then(function(new_volunteer){
                if(new_volunteer.length == 0){
                    return res.render('creation',{error:"VOLUNTEER NOT CREATED"})
                }
                return res.render('home',{success:"VOLUNTEER CREATED SUCCESSFULLY"})
            })
            .catch(function(error){
                res.render('creation',{error:"NO VOLUNTEER CREATED",message:error})
            })
        }
    })

}

const uploadFile = (req,res,next)=>{
    var file = req.files
    var NOTE_UPLOAD_DIR = '../public/files/'
    var year = moment().format('DD/MM/YYYY');

    var is_folder_exists = fs.existsSync(path.join(__dirname, NOTE_UPLOAD_DIR ))

    if(!is_folder_exists) {
        // CREATE FOLDER
        console.log("ddddddd")
        fs.mkdirSync(path.join(__dirname, NOTE_UPLOAD_DIR ))
    }
    var file_path = NOTE_UPLOAD_DIR +year ;
   
    fs.writeFile(path.join(__dirname,file_path),file, function(err) {
        if (err){
            console.log(err,"err")
        }
        else{
            console.log("FILE UPLOADED")
        }
    });
}

const getUploadFile = function(req,res,next){
  return res.render('home.handlebars');
}

app.get('/download', function(req, res){
    const file = `${__dirname}/zip/example.zip`;
    res.download(file); // Set disposition and send it.
  });
  
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');
  app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+"/views/home.html"));
  
  });
  
  app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
    console.log(req.file,"req.file");
      if(err) {
          return res.end("Error uploading file.");
      }
      var workbook = xlsx.read(req.file.originalname);
  const sheet_name = workbook.SheetNames;
  console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name[0]]))
      res.end("File is uploaded");
  });
  });
  
  const DataExtract = function(val){
  
  }
  
  

module.exports ={
    createVolunteer:createVolunteer,
    getCreation:getCreation,
    uploadFile:uploadFile,
    getUploadFile:getUploadFile
}

