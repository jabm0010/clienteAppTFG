'use strict';

angular.module('pacienteApp', [ 
  'perfilUsuario',
  'gestionTerapias',
  'ngRoute'
]);

angular.module('pacienteApp').filter('counter', [function() {
  return function(seconds) {
      return new Date(1970, 0, 1).setSeconds(seconds);
  };
}])

angular.module('pacienteApp').run(function($http, $rootScope) {
  var usuario = sessionStorage.getItem("correoElectronico")
  var clave = sessionStorage.getItem("clave")
  clave = atob(clave)
  var autorizacion = (usuario+":"+clave)
  autorizacion = btoa(autorizacion)
  $http.defaults.headers.common.Authorization = 'Basic '+autorizacion;
  $rootScope.usuarioURL = usuario;

});