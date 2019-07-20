const express = require('express');
const path = require('path');
const mongoose = require('mongoose');       
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
//const Swag = require('swag');
const Handlebars = require('handlebars');
var url = require('./url');
//Swag.registerHelpers(Handlebars);
mongoose.connect('mongodb://localhost:27017/host',{useNewUrlParser:true});

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true  // methods to easy
}));

hbs = exphbs.create({
  handlebars: Handlebars, //Pass the Handlebar instance with Swag
  defaultLayout: 'main'
});


app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', hbs.engine);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'handlebars');

app.use('/',url);
app.listen(2321,console.log('server listening'));

