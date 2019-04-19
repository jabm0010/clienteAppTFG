'use strict';

angular.module('medicoApp', [
  'ejerciciosTerapeuticos',
  'ngRoute',
  'perfilUsuario',
  'gestionPacientes',
  'gestionTerapias'
]);



angular.module('medicoApp').run(function($http, $rootScope) {
  var usuario = sessionStorage.getItem("correoElectronico")
  var clave = sessionStorage.getItem("clave")
  clave = atob(clave)
  var autorizacion = (usuario+":"+clave)
  autorizacion = btoa(autorizacion)
  $http.defaults.headers.common.Authorization = 'Basic '+autorizacion;
  $rootScope.usuarioURL = usuario;

});