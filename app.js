const express = require('express');
var  path = require('path');
const mongoose = require('mongoose');       
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const Swag = require('swag');
const handlebars = require('handlebars');
var url = require('./url');
Swag.registerHelpers(handlebars);
mongoose.connect('mongodb://localhost:27017/host',{useNewUrlParser:true});

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true  // methods to easy
}));

hbs = exphbs.create({
  handlebars: handlebars, //Pass the Handlebar instance with Swag
});

app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', hbs.engine);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'handlebars');

app.use('/',url);
app.listen(1990,console.log('server listening'));

