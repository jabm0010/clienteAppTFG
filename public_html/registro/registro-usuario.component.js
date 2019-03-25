angular.module("registroUsuario").component("registroUsuario", {
  templateUrl: "registro/registro-usuario.template.html",
  controller: function RegistroUsuarioController($http, $scope) {

    $scope.imagenPrueba;
    $scope.usuario;
    $scope.contrasenaverificar = {};
    $scope.registrarUsuario = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/usuarios",
        data: $scope.usuario
      }).then(function(success) {
        callback(success);
      });
    };

  
  }
  
});

