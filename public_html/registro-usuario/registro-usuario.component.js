angular.module("registro").component("gestionRegistro", {
  templateUrl: "registro-usuario.template.html",
  controller: function RegistroMedicoController($http, $scope) {
    $scope.usuario;
    $scope.token = getParameterByName("token");
    function getParameterByName(name) {
      var match = RegExp("[?&]" + name + "=([^&]*)").exec(
        window.location.search
      );
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    $scope.identificarToken = function() {
      $http({
        method: "GET",
        url: "http://localhost:8080/usuarios/" + $scope.token
      }).then(function(success) {
        $scope.usuario = success.data;
      });
    };

    $scope.completarRegistro = function() {

      $http({
        method: "POST",
        url: "http://localhost:8080/usuarios",
        data: $scope.usuario
      }).then(function(success) {
        $scope.usuario = success.data;
      });
    };
  }
});
