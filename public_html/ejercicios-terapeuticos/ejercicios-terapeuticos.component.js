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

angular.module("ejerciciosTerapeuticos").component("verEjerciciosTerapeuticos",{
  templateUrl:"ejercicios-terapeuticos/ver-ejercicios-terapeuticos.template.html",
  controller: function VerEjercicios($http, $scope){
    $scope.numeropaginas = [];
    $scope.pagina;
    $scope.medico = "jabm979@gmail.com";
    $scope.verEjercicios = function(){
      $http({
        method: "GET",
        url: "http://localhost:8080/medicos/"+$scope.medico+"/ejercicios",

      }).then(function(success) {
        $scope.pagina = success.data;
        for(i = 0;i<$scope.pagina.pag_totales;i++){
          $scope.numeropaginas.push("pagina");
        }
       
       
      });
    }
    
  }
}
)
