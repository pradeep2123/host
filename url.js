const express = require('express');
var Volunteer = require('./routes/volunteer')
var app = express.Router();

app.post('/file',Volunteer.uploadFile);
app.get('/file',Volunteer.getUploadFile)

app.get('/',Volunteer.getCreation)
module.exports = app;
