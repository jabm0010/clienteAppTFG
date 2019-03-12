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
  controller: function VerEjercicios($http, $scope,$window, $location){
    $scope.numeropaginas = [];
    $scope.pagina;
    $scope.medico = "jabm979@gmail.com";""

    $scope.goToLink = function(e) {
      $window.localStorage.setItem("ejercicioSeleccionado",JSON.stringify(e)) 
      $location.path("/ejercicios/"+e.id);
    };


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


angular.module("ejerciciosTerapeuticos").component("detallesEjercicio",{
  templateUrl:"ejercicios-terapeuticos/detalles-ejercicio.template.html",
  controller: function ModificarEjercicio($routeParams,$http,$window, $scope){
    $scope.ejercicio = JSON.parse($window.localStorage.getItem("ejercicioSeleccionado"));
    $scope.modoeditar = false;
    
    $scope.id = $routeParams.ejercicioId;
    $scope.medico = "jabm979@gmail.com";

    $scope.activarModoEditar = function(){
      $scope.modoeditar = $scope.modoeditar === false ? $scope.modoeditar = true : $scope.modoeditar = false;
 
    };

    $scope.guardarCambios = function(){
      $http({
        method: "PUT",
        url: "http://localhost:8080/medicos/"+$scope.medico+"/ejercicios",
        data: $scope.ejercicio

      }).then(function(success) {
        callback(success);
       
      });
    }
    
  }
}
)
