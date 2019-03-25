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
    otherwise('/ejercicios');

  })


