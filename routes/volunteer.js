const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer')
// const xlsx = require('xlsx');
const fs = require('fs');
const db = require('../models/index');
const app = express.Router();


const getCreation = function(req,res,next){
    var volunteer_role = req.body.volunteer_role || req.params.volunteer_role
    if(volunteer_role == "ADMIN" || volunteer_role== "SUPER_ADMIN"){
        return res.redirect('/create/volunteer')
    }
    return res.render('createwords')
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
    console.log(req,"req")
    var file = req.file
    console.log(file,"file")
    var NOTE_UPLOAD_DIR = '../public/files/'
    var year = moment().format('YYYY-DD');

    var is_folder_exists = fs.existsSync(path.join(__dirname, NOTE_UPLOAD_DIR + year ))

    console.log(file,"fff")
    if(!is_folder_exists) {
        // CREATE FOLDER
        console.log("ddddddd")
        fs.mkdirSync(path.join(__dirname, NOTE_UPLOAD_DIR + year))
    }
    var file_path = NOTE_UPLOAD_DIR +year ;
   
    fs.writeFile(path.join(__dirname,file_path),file, function(err,data) {
        if (err){
            console.log(err,"err")
        }
        else{
            console.log(data, req.file)
            DataExtract(req.file);
            return res.render('createwords',{message:"Successfully uploaded"})
        }
    });
}

const getUploadFile = function(req,res,next){
  return res.render('createwords');
}


// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname,'public/files'))
//     },
//     filename: (req, file, cb) => {
//     var year = moment().format('YYYY-DD');
//       cb(null, file.fieldname + '-' + year)
//     }
// });

// var upload = multer({storage: storage});
// app.post('/uploadfile', upload.single('file'), (req, res, next) => {
//     const files = req.file
//     console.log(files)
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//     console.log(file)
//       return res.send('ffff')
    
//   })
// const DataExtract = function(req,res,next){
//     var filePath = 'D:\node-projects\thamaku\Book1.xlsx'
//     var workbook = new Excel.Workbook();
//     //Use then function to executed code that need to perform immediately after readFile
//     workbook.xlsx.readFile(filePath).then(function () {
//     //Use sheetName in getWorksheet function
//     var worksheet = workbook.getWorksheet("SheetInfo");
//     //Use nested iterator to read cell in rows 
//     //First iterator for rows in sheet
//         worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
//             console.log("Current Row:" + rowNumber);
//             //Second iterator for cells in row
//             row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
//             //print row number, column number and cell value at[row][col]
            
//             /*
//                 write code
//             */
//             });
//         });
//     });
// }





  

module.exports ={
    createVolunteer:createVolunteer,
    getCreation:getCreation,
    uploadFile:uploadFile,
    getUploadFile:getUploadFile,
    // DataExtract:DataExtract
}


