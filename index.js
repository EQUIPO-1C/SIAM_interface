const express = require('express');
const app = express();
const xmlparser = require('express-xml-bodyparser')
const parser = require('body-parser')
const soap = require('soap')
const axios = require("axios");

app.set('port',6000)

const endpoint = "http://localhost:5000/graphql";
const headers = {
	"content-type": "application/json",
    "Authorization": "<token>"
};
const graphqlQuery = `query{
        allAsignaturas{
            codigoasignatura
            nombreAsignatura
            idProfesor
            idEdificio
            programa
            creditos
            cupos
            descripcion
            fechaInicio
            fechaFinal
            horario
            jornada
            nivelDeEstudio
            sede
            tipologia
        }
    }`;



//url ejemplo para query con axios
/*app.get("/asignaturas",parser.json(),async (request,response)=>{
    var result = {}
    await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: {query: graphqlQuery}
    }).then((data)=>result=data.data);
    var asg = xml2json.js2xml(result,{compact:true, spaces: 4})
    response.status(200).send(asg);
});*/

//url ejemplo con xml parser
app.post("/xml/asignatura",xmlparser({trim:false,explicitArray:false}),function(request,response,next){
    console.log(request.rawBody)
    response.status(200).send("llego la peticion")
})

//ejemplo con libreria soap
var myService = {
    MyService: {
        MyPort: {
            MyFunction: async function(args) {
                console.log('my function ' + args)
                var result = {}
                await axios({
                    url: endpoint,
                    method: 'post',
                    headers: headers,
                    data: {query: graphqlQuery}
                }).then((data)=>result=data.data.data);
                console.log(args)
                return {
                    name: result
                };
            },

            // This is how to define an asynchronous function with a callback.
            MyAsyncFunction: function(args, callback) {
                console.log('my Asyncfunction ' + args)
                // do some work
                callback({
                    name: args.name
                });
            },

            // This is how to define an asynchronous function with a Promise.
            MyPromiseFunction: function(args) {
                console.log('my promisefunction ' + args)
                return new Promise((resolve) => {
                  // do some work
                  resolve({
                    name: args.name
                  });
                });
            },

            // This is how to receive incoming headers
            HeadersAwareFunction: function(args, cb, headers) {
                console.log('my headerAware function ' + args)
                return {
                    name: headers.Token
                };
            },

            // You can also inspect the original `req`
            reallyDetailedFunction: function(args, cb, headers, req) {
                console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
                return {
                    name: headers.Token
                };
            }
        }
    }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//body parser middleware are supported (optional)
app.use(parser.raw({type: function(){return true;}, limit: '5mb'}));


//Consumo de la interface del equipo 1B
app.post("/consumo1B/asignaturas",async function (request,response){
    /*var url = 'http://example.com/wsdl?wsdl';
    var args = {name: 'value'};

    soap.createClient(url, {}, function(err, client) {
        client.MyFunction(args, function(err, result) {
            console.log(result);
        });
    });
    var result = {}
    await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: {
            query: mutationAsignaturas,
            variables: request
        }
    }).then((data)=>result=data.data);
    var asg = xml2json.js2xml(result,{compact:true, spaces: 4})
    */
    response.status(200).send("consumo exitoso")
})



app.listen(app.get('port'),()=>{
    console.log('Aplicacion iniciada ' + app.get('port')),
    soap.listen(app, '/asignaturas', myService, xml, function(){
        console.log('server initialized');
      });
})