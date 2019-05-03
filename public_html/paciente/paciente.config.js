'use strict'

// Función para pasar datos entre controladores

/
angular.
  module('pacienteApp').
  config(function($routeProvider){
    $routeProvider.
    when('/principal', {
      template: '<ver-terapias></ver-terapias>'
    }).
    when('/terapias/:terapiaId',{
      template: '<detalles-terapia></detalles-terapia>'
    }).
    when('/terapias/:terapiaId/ejercicios',{
      template: '<ver-ejercicios-terapia></ver-ejercicios-terapia>'
    }).
    when('/terapias/:terapiaId/chat',{
      template: '<ver-chat-terapia></ver-chat-terapia>'
    }).
    when('/terapias/:terapiaId/realizar',{
      template: '<realizar-terapia></realizar-terapia>'
    }).
    otherwise('/principal');

  })

 
