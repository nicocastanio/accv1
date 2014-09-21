

    //
    function onDeviceReady() {            
        console.log("entra onDeviceReady");

        // leer datos almacenados para cargar variables             
        // cargar valores previamente 
        var cliente = document.getElementById("inputCliente");
        cliente.value = window.localStorage.getItem("cliente");
        var nombre = document.getElementById("inputNombre");
        nombre.value = window.localStorage.getItem("nombre");
        document.getElementById("inputApellido").value = window.localStorage.getItem("apellido");
        document.getElementById("inputCelular").value = window.localStorage.getItem("celular");
        document.getElementById("inputDir1").value = window.localStorage.getItem("direc1");
        document.getElementById("inputDir2").value = window.localStorage.getItem("direc2");
        //document.getElementById("inputDir3").value = window.localStorage.getItem("direc3"); 
        $("#inputDir3").val(localStorage.getItem("direc3")); 

        if ( cliente.value === '' ) {
            console.log("cliente vacio");
            // mostrar tab para cargar datos de configuracion 
            $('#li-profile').addClass('active');
            $('#profile').addClass('active');
            $('#home').removeClass('active');
        } else {
            console.log("cliente tiene datos "+cliente.value);
            $('#li-home').addClass('active');
        }

        // - Cargar direcciones guardadas en localStorage 
        $('#selDirec').append($('<option>', {
            value: 1,
            text: window.localStorage.getItem("direc1")
            }));
        if (localStorage.getItem("direc2")) { 
            $('#selDirec').append($('<option>', {
                value: 2,
                text: window.localStorage.getItem("direc2")
                }));
        }
        if (localStorage.getItem("direc3")) { 
            $('#selDirec').append($('<option>', {
                value: 3,
                text: window.localStorage.getItem("direc3")
                }));
        }

    } // fin onDeviceReady()
            
        // - 
        function save_config()  { 
            // verificar que todos los campos esten completos. 
            console.log("guardando...."+document.getElementById("inputCliente").value); 
            
            // guardar configuracion 
            //window.localStorage.setItem("cliente", document.getElementById("inputCliente").value);
            window.localStorage.setItem("cliente", $('#inputCliente').val() );
            window.localStorage.setItem("nombre", document.getElementById("inputNombre").value);
            window.localStorage.setItem("apellido", document.getElementById("inputApellido").value);
            window.localStorage.setItem("celular", document.getElementById("inputCelular").value);
            window.localStorage.setItem("direc1", document.getElementById("inputDir1").value);
            window.localStorage.setItem("direc2", document.getElementById("inputDir2").value);
            window.localStorage.setItem("direc3", document.getElementById("inputDir3").value);
            
            $('#alert-mess-ok').removeClass('hidden');          
            //$('#alert-mess-ok').addClass('in');
        }
            
        // - 
        function verData() {
            var value = window.localStorage.getItem("cliente");
            console.log("localstorage cliente: "+value);
        }

        // - 
        function borrarStorage() {
            // blanquear datos guardados en localStorage 
            window.localStorage.clear();
        }
        
        // - 
        function closeApp() {
            window.close(); 
        }
            
        // - 
        function GetURLParameter(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam)
                {
                    return sParameterName[1];
                }
            }
        }            
            
        // - cambiar Navs cuando presionamos 
        $('#myTab a[href="#profile"]').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $('#myTab a[href="#home"]').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        }); 
            
// 
var enviarEmail = function(smsBody) { 

    // enviar 
    var smsBody = 'ID Cliente: ' + $('#inputCliente').val() + ' / ' + $('#inputNombre').val() +' '+ $('#inputApellido').val() + ' / Direccion: ' +  $('select[name=selDirec] option:selected').text() + ' en ' + $("#selTime option:selected").val();
    
    window.plugin.email.isServiceAvailable(
        function (isAvailable) {
            // alert('Service is not available') unless isAvailable;
            console.log("servicio email");
            window.plugin.email.open({
                to:      ['nicocastanio@gmail.com','sebaali07@gmail.com'],
                //cc:      ['erika.mustermann@appplant.de'],
                //bcc:     ['john.doe@appplant.com', 'jane.doe@appplant.com'],
                subject: 'Acuda',
                body:   smsBody ,
                isHtml: false 
            });
        }
    );  // window.plugin 
    
    // window.plugins.emailComposer.showEmailComposerWithCallback(callback,subject,body,toRecipients,ccRecipients,bccRecipients,isHtml,attachments,attachmentsData);

}

// 
var enviarSMS = function(smsBody) {
    
    var celNumer = "+5491131644089"; 
    var celTxt = smsBody; 
    //var intent = "INTENT"; //leave empty for sending sms using default intent
    var success = function () { 
        alert('Message sent successfully'); 
    };
    var error = function (e) { 
        alert('Message Failed:' + e); 
    };
    window.plugin.sms.send(number, message, intent, success, error);
    
}

//
var envioConPHP = function(smsBody) {
    
    $.ajax({
        type: "GET",
        url: "http://www.presmia.com/app/send-data.php",
        data: 'body='+smsBody+'&email=nicolas.castanio@presmia.com',
        success: function(msg){
            $('#resultip').html(msg);
        }

    }); // Ajax Call    
    
    
    console.log('envio con php');
    
    console.log(smsBody); 
    
    //$.getJSON("http://www.presmia.com/app/acuda_app.json?callback=?", function(data){
    $.getJSON("http://www.presmia.com/app/get_json_data.php", function(data){
        /*$.each(data.items, function(i,item){
            console.log('json email: '+item.email);
            console.log(item.celu1);
        });*/
        var items = [];
        $.each( data, function( key, val ) {
            //items.push( "<li id='" + key + "'>" + val + "</li>" );
            console.log('key: '+key+ ' value: '+val);
        });
    });
    
}


            
// validaciones de campos 
// --- 
$(document).ready( function() {
    // este evento se dispara en browser y en dispositivo . 
    console.log("ready antes de validator"); 
    
    onDeviceReady();

    var send = GetURLParameter('send');
    var save = GetURLParameter('save');
    if (save === 'ok') {
        $('#alert-saved-ok').removeClass('hidden'); 
    }

    // --- submit en Formulario Envio Alerta --- 
    $("#form-alerta").submit( function( event ) {  
        console.log("envio alerta");
        $('#alert-sent-ok').removeClass('hidden'); 
        //console.log( "leyendo " + $('#inputCliente').val() ); 
        //console.log( $('input[name=inputCliente]').text() ); 
        
        var smsBody = 'ID Cliente: ' + $('#inputCliente').val() + ' / ' + $('#inputNombre').val() +' '+ $('#inputApellido').val() + ' / Direccion: ' +  $('select[name=selDirec] option:selected').text() + ' en ' + $("#selTime option:selected").val();
        
        enviarEmail(smsBody); 
        
        enviarSMS(smsBody); 

        envioConPHP(smsBody); 

        //
        event.preventDefault();
    });

    // --- Captura evento mientras carga Form Registracion  --- 
    $('#form-register').bootstrapValidator({
        container: '#messko',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitButtons: 'button[type="submit"]',
        fields: {
            cliente: {
                validators: {
                    notEmpty: {
                        message: 'ID Cliente es obligatorio.'
                    }
                }
            },
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'Campo Nombre es obligatorio.'
                    }
                }
            },
            apellido: {
                validators: {
                    notEmpty: {
                        message: 'Campo Apellido es obligatorio.'
                    }
                }
            },
            celular: {
                validators: {
                    digits: {
                        message: 'N&uacute;mero de celular puede contener solo dígitos.'
                    },
                    notEmpty: {
                        message: 'N&uacute;mero de celular obligatorio.'
                    }
                }
            },
            dir1: {
                validators: {
                    notEmpty: {
                        message: 'Campo Direcci&oacute; 1 es obligatorio.'
                    }
                }
            },

            /*   --- solo la Dir 1 es obligatoria --- 
            dir2: {
                validators: {
                    notEmpty: {
                        message: 'Campo Direcci&oacute; 2 es obligatorio.'
                    }
                }
            },
            dir3: {
                validators: {
                    notEmpty: {
                        message: 'Campo Direcci&oacute; 3 es obligatorio.'
                    }
                }
            }*/ 

        } // fields 
    })  // validator 

    .on('error.validator.bv', function(e, data) {
        // $(e.target)    --> The form instance
        // data.field     --> The field name
        // data.element   --> The field element
        // data.validator --> The validator name

        // Do something ...
        // si hubo errores matener nav Profile. 
        $('#myTab a[href="#profile"]').tab('show');                
    })

    .on('success.form.bv', function(e) {
        // The e parameter is the same as one
        // in the error.validator.bv event above

        // Do something ...
        // si NO hubo errores, guardar y mostrar nav Home. 
        save_config();   
        // mostrar mensaje OK 
        //e.preventDefault();
    });        

    // --- 
    /*
    $("#form-register").submit( function( event ) {  
        $('#alert-saved-ok').removeClass('hidden');  
        event.preventDefault();
    } ); 
    */

}  // function en ready()
);



// Wait for PhoneGap to load  --> este evento funciona solo en un Dispositivo, en Browser no
// PhoneGap is ready
document.addEventListener("deviceready", function() {
    onDeviceReady();   // cargar valores por defecto 
    
    document.addEventListener("backbutton", backButtonEvent, false);

    document.addEventListener("exitButton", function(){ 
        if(navigator.app){
            navigator.app.exitApp();  // solo funciona para Android 
        }else if(navigator.device){
            navigator.device.exitApp();
        }
    }, true);
    
    
}, false);  // deviceready


// 
var backButtonEvent = function () {
    e.preventDefault();
    if(navigator.app){
        navigator.app.exitApp();  // solo funciona para Android 
    }else if(navigator.device){
        navigator.device.exitApp();
    }
}
