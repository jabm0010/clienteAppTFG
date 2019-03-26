angular.module("gestionAdministrador").component("crearMedico", {
  templateUrl: "gestion-administrador/crear-medico.template.html",
  controller: function RegistroMedicoController($http, $scope) {
    $scope.respuestaPeticion;
    $scope.medico;
    $scope.registrarUsuario = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/administrador/medicos",
        data: $scope.medico
      }).then(
        function(success) {
          $scope.respuestaPeticion = true;
        },
        function errorCallback(response) {
          $scope.respuestaPeticion = false;
        }
      );
    };
  }
});

angular.module("gestionAdministrador").component("obtenerMedico", {
  templateUrl: "gestion-administrador/obtener-medico.template.html",
  controller: function ObtenerMedicoController($http, $scope) {
    $scope.identificador;
    $scope.resultadoLlamada;
    $scope.medico;
    $scope.buscarUsuario = function() {
      $http({
        method: "GET",
        url: "http://localhost:8080/administrador/medicos/"+$scope.identificador,
       
      }).then(
        function(success) {
          $scope.medico = success.data;
          $scope.resultadoBusqueda = true;
        },
        function errorCallback(response) {
          $scope.resultadoBusqueda = false;
        }
      );
    };

    $scope.modificarUsuario = function() {
        $http({
          method: "PUT",
          url: "http://localhost:8080/administrador/medicos",
          data: $scope.medico
        }).then(
          function(success) {
            resultadoLlamada = true;
          },
  
          function errorCallback(response) {
            $scope.respuestaPeticion = false;
          }
        );
      };
  }
});

angular.module("gestionAdministrador").component("modificarMedico", {
  templateUrl: "gestion-administrador/crear-medico.template.html",
  controller: function ModificarMedicoController($http, $scope) {
    $scope.resultadoLlamada;
    $scope.medico;
    $scope.registrarUsuario = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/administrador/medicos",
        data: $scope.medico
      }).then(
        function(success) {
          resultadoLlamada = true;
        },

        function errorCallback(response) {
          $scope.respuestaPeticion = false;
        }
      );
    };
  }
});
