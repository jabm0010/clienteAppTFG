angular.module("gestionPacientes").component("verPacientes", {
  templateUrl: "gestion-pacientes/gestion-pacientes.template.html",
  controller: function verPacientes($http, $scope, $window, $location) {
    $scope.medico = "usuario0@gmail.com";
    $scope.listadoPacientes;

    $scope.goToLink = function(p) {
      $window.localStorage.setItem("pacienteSeleccionado",p.correoElectronico);
      $location.path("/asignar-terapia");
    };



    $scope.obtenerPacientes = function() {
      $http({
        method: "GET",
        url: "http://localhost:8080/medicos/" + $scope.medico + "/pacientes"
      }).then(function(success) {
        $scope.listadoPacientes = success.data;
      });
    };
  }
});

angular.module("gestionPacientes").component("nuevoPaciente", {
  templateUrl: "gestion-pacientes/nuevo-paciente.template.html",

  controller: function anadirPaciente($http, $scope) {
    $scope.medico = "usuario0@gmail.com";
    $scope.paciente;
    $scope.respuestaPeticion;

    $scope.nuevoPaciente = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/medicos/" + $scope.medico + "/pacientes",
        data: $scope.paciente
      }).then(
        function successCallback(response) {
          $scope.respuestaPeticion = true;
        },
        function errorCallback(response) {
          $scope.respuestaPeticion = false;
        }
      );
    };
  }
});
