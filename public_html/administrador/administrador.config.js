'use strict'

angular.
  module('adminApp').
  config(function($routeProvider){
    $routeProvider.
    when('/crear-medico', {
      template: '<crear-medico></crear-medico>'
    }).
    when('/obtener-medico', {
        template: '<obtener-medico></obtener-medico>'
    }).
    otherwise('/crear-medico');

  })

