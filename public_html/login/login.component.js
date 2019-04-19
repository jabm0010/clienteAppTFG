angular.module("login").component("gestionLogin", {
  templateUrl: "login.template.html",
  controller: function LoginController($http, $scope, $window) {
    $scope.usuario;
    $scope.respuestaPeticion;

    $scope.crearSesion = function() {
      sessionStorage.setItem(
        "correoElectronico",
        $scope.usuario.correoElectronico
      );
      sessionStorage.setItem("clave", $scope.usuario.clave);
    };

    $scope.identificarUsuario = function() {
      $scope.usuario.clave = btoa($scope.usuario.clave);
      $http({
        method: "POST",
        url: "http://localhost:8080/usuarios",
        data: $scope.usuario
      }).then(
        function successCallback(response) {
          $scope.crearSesion();
          if (response.data.rol == "MEDICO") {
            $window.location.href = "../medico/medico.html#!/principal";
          }
        },
        function errorCallback(response) {
          $scope.respuestaPeticion = false;
          $scope.usuario.correoElectronico = "";
          $scope.usuario.clave = "";
        }
      );
    };
  }
});
