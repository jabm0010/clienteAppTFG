'use strict'

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
    otherwise('/ejercicios');

  })


