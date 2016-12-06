/* global nombres */

// Cargamos el modelo implementado con Mongoose

var db = require('./model/db.js');
var profesor = require('./model/profesor.js');
var mongoose = require('mongoose');

var Profesor = mongoose.model('Profesor');

var generador = require('./lib/generador-personas.js');

// generamos 200 personas para probar nuestra aplicación y su velocidad
var personas = generador.generador(200);

console.log(personas);

Profesor.collection.insert( personas,  function (err, profesor) {
    if (!err) {
        console.log('Usuarios creados.'+profesor);
    } else {
        console.log('Error');
    }
});

