/*
var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: String,
  badge: Number,
  dob: { type: Date, default: Date.now },
  isloved: Boolean
});
mongoose.model('Blob', blobSchema);
*/ 


var mongoose = require('mongoose');  

var profesorSchema = new mongoose.Schema({
    "nombre" : String,
    "apellido" : String,
    "email" : String,
    "id" : Number
});

mongoose.model('Profesor', profesorSchema);