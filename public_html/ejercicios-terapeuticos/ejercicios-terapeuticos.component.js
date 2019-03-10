angular.module("ejerciciosTerapeuticos").component("ejerciciosTerapeuticos", {
  templateUrl: "ejercicios-terapeuticos/ejercicios-terapeuticos.template.html",
  controller: function GestionarEjercicios($http, $scope) {
    $scope.ejercicio;
    $scope.medico = "jabm979@gmail.com";
    $scope.crearEjercicio = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/medicos/"+$scope.medico+"/ejercicios",
        data: $scope.ejercicio
      }).then(function(success) {
        callback(success);
      });
    };


    
  }
});
