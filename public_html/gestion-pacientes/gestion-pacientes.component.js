angular.module("gestionPacientes").component("verPacientes", {
    templateUrl: "gestion-pacientes/gestion-pacientes.template.html",
    controller: function verPacientes($http, $scope) {
      $scope.medico = "usuario0@gmail.com";
      $scope.listadoPacientes;

      $scope.obtenerPacientes = function(){
        $http({
          method: "GET",
          url: "http://localhost:8080/medicos/"+$scope.medico+"/pacientes",
  
        }).then(function(success) {
          $scope.listadoPacientes = success.data;
         
          
        });
      }
    }
    
});

angular.module("gestionPacientes").component("agregarPaciente",{
  templateUrl: "gestion-pacientes/gestion-pacientes.template.html",

  controller: function anadirPaciente($http, $scope){

  }
});
  
  