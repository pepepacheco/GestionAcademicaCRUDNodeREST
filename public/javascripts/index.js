$(document).ready(function () {
    mainMenu();
});

function mainMenu() {
    var text ='<div class="jumbotron"><h2>Gestión Académica</h2></div>';
    $('#main').html(text);
}

function showMessage(msg) {
    var text ='<div class="well"><h2>'+msg.title+'</h2><p>'+
        msg.body+'</p></div>';
    $('#main').html(text);
}

function profesorForm(profesor) {
    $('#main').html('<h3>Crear nuevo profesor:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">Nombre:</label>');
    div.append('<input id="nombre" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">Apellidos:</label>');
    div.append('<input id="apellido" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="email">email:</label>');
    div.append('<input id="email" type="email" class="form-control" />');
    form.append(div);

    div = $('<div />').addClass('form-group');
    div.append('<label for="id">id:</label>');
    div.append('<input id="id" type="text" class="form-control" />');
    form.append(div);
    
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="profesorPostREST()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function profesorPostREST() {

    var datos = {
        "nombre": $('#nombre').val(),
        "apellido": $('#apellido').val(),
        "email": $('#email').val(),
        "id": $('#id').val()
    };
    $.ajax({
        // la URL para la petición
        url: '/Profesor',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: datos,
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (json) {
            $('<h1/>').text(json.title).appendTo('body');
            $('<div class="content"/>')
                    .html(json.html).appendTo('body');
        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            alert('Petición realizada');
        }
    });
}

function profesorRead(){
	profesorReadREST(null);
}

function profesorReadREST(caso) {
    $.ajax({
        url: '/Profesor',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(JSON.stringify(json));
            $('#main').html('<h3>Listado de Profesores</h3>');
            var table = $('<table />').addClass('table table-stripped');
            
            if (caso) {
                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>', '<th>email</th>', '<th> </th>')));
            } else {
                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>', '<th>email</th>')));
            }
            var tbody = $('<tbody />');
            for (var profe in json) {
                console.log(profe);
                switch (caso) {
                    case 1:
                        tbody.append($('<tr />').append('<td>' + json[profe].id + '</td>',
                            '<td>' + json[profe].nombre + '</td>', '<td>' + json[profe].apellido + '</td>',
                            '<td>' + json[profe].email + '</td>', 
                            '<td> <div class="btn btn-danger" onclick="profesorDelREST(\''+json[profe]._id+'\')">eliminar</button></td>'));
                        break;
                    case 2:
                        tbody.append($('<tr />').append('<td>' + json[profe].id + '</td>',
                            '<td>' + json[profe].nombre + '</td>', '<td>' + json[profe].apellido + '</td>',
                            '<td>' + json[profe].email + '</td>', 
                            '<td> <div class="btn btn-info" onclick="profesorUpdaREST(\''+json[profe]._id+'\')">actualizar</button></td>'));
                        break;
                    default:
                        tbody.append($('<tr />').append('<td>' + json[profe].id + '</td>',
                            '<td>' + json[profe].nombre + '</td>', '<td>' + json[profe].apellido + '</td>',
                            '<td>' + json[profe].email + '</td>'));
                }
            }
            table.append(tbody);
            
            $('#main').append( $('<div />').append(table) );
            $('tr:odd').css('background','#CCCCCC');
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

function profesorDelete(){
    profesorReadREST(1);
}

function profesorDelREST(clave) {

    var datos = {
        "_id": clave
    };
    $.ajax({
        // la URL para la petición
        url: '/Profesor',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: datos,
        // especifica si será una petición POST o GET
        type: 'DELETE',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success:function () {
            showMessage({"title": "Borrar profesor", "body": "Profesor eliminado correctamente de la base de datos." });
	        // profesorReadREST(1);
        },        
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            profesorReadREST(1);
        }/*,
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            showMessage({"title":"ERROR borrando profesor", "body": 'Disculpe, existió un problema'});
        }*/
    });
}

function profesorUpdate() {
    profesorReadREST(2);
}

function profesorUpdaREST(id){
    var datos = {
        "_id": id
    };
    $.ajax({
        // la URL para la petición
        url: '/Profesor/'+id,
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        // data: datos,
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success:function (datos) {
            profesorUpdateForm(datos);
        }   
        // código a ejecutar sin importar si la petición falló o no
        /* complete: function (xhr, status) {
        //    profesorReadREST(1);
        }/*,
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            showMessage({"title":"ERROR borrando profesor", "body": 'Disculpe, existió un problema'});
        }*/
    });
}

function profesorUpdateForm(profesor) {
    $('#main').html('<h3>Crear nuevo profesor:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">Nombre:</label>');
    div.append('<input id="nombre" type="text" class="form-control" value="'+profesor.nombre+'"/>');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellido">Apellidos:</label>');
    div.append('<input id="apellido" type="text" class="form-control" value="'+profesor.apellido+'"/>');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="email">email:</label>');
    div.append('<input id="email" type="email" class="form-control" value="'+profesor.email+'" />');
    form.append(div);

    div = $('<div />').addClass('form-group');
    div.append('<label for="id">id:</label>');
    div.append('<input id="id" type="text" class="form-control" value="'+profesor.id+'"/>');
    div.append('<input id="_id" type="hidden" value="'+profesor._id+'"/>');
    form.append(div);
    
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="profesorUpdateREST()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#main').append(form);
}

function profesorUpdateREST(){
    var profesor = {
        "_id": $("#_id").val(),
        "id": $("#id").val(),
        "nombre": $("#nombre").val(),
        "apellido": $("#apellido").val(),
        "email": $("#email").val()
    };
    $.ajax({
        // la URL para la petición
        url: '/Profesor',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: profesor,
        // especifica si será una petición POST o GET
        type: 'PUT',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success:function (profesor) {
            profesorReadREST(2);
        }, 
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            profesorReadREST(2);
        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            showMessage({"title":"ERROR borrando profesor", "body": 'Disculpe, existió un problema'});
        }
    });
}