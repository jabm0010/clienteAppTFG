'use strict'

angular.
  module('medicoApp').
  config(function($routeProvider){
    $routeProvider.
    when('/ejercicios-nuevo', {
      template: '<ejercicios-terapeuticos></ejercicios-terapeuticos>'
    }).
    when('/ejercicios', {
      template: ''
    }).
    otherwise('/principal');

  })


