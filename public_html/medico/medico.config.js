'use strict'

// Función para pasar datos entre controladores


angular.
  module('medicoApp').
  config(function($routeProvider){
    $routeProvider.
    when('/ejercicios-nuevo', {
      template: '<ejercicios-terapeuticos></ejercicios-terapeuticos>'
    }).
    when('/ejercicios', {
      template: '<ver-ejercicios-terapeuticos></ver-ejercicios-terapeuticos>'
    }).
    when('/ejercicios/:ejercicioId', {
      template: '<detalles-ejercicio></detalles-ejercicio>'
    }).
    when('/principal', {
      template: '<ver-pacientes></ver-pacientes>'
    }).
    when('/nuevo-paciente', {
      template: '<nuevo-paciente></nuevo-paciente>'
    }).
    when('/asignar-terapia', {
      template: '<asignar-terapia></asignar-terapia>'
    }).
    when('/historial-medico',{
      template: '<historial-medico></historial-medico>'
    }).
    otherwise('/ejercicios');

  })


