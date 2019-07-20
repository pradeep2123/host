const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');  
const _ = require('underscore')
const moment = require('moment');

var db = require('../models')
const getCreation = function(req,res,next){
    var volunteer_role = req.body.volunteer_role || req.params.volunteer_role
    if(volunteer_role == "ADMIN" || volunteer_role== "SUPER_ADMIN"){
        return res.redirect('/create/volunteer')
    }
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
            return res.render('home',{message:"volunteer already created"})
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
module.exports ={
    createVolunteer:createVolunteer,
    getCreation:getCreation
}

