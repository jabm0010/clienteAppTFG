angular.module("ejerciciosTerapeuticos").component("ejerciciosTerapeuticos", {
  templateUrl: "ejercicios-terapeuticos/ejercicios-terapeuticos.template.html",
  controller: function GestionarEjercicios($http, $scope, $rootScope) {
    $scope.respuestaPeticion;
    $scope.ejercicio;

    $scope.crearEjercicio = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/medicos/"+$rootScope.usuarioURL+"/ejercicios",
        data: $scope.ejercicio,

      }).then(function successCallback(response) {
        $scope.respuestaPeticion = true;
      }, function errorCallback(response){
        $scope.respuestaPeticion = false;
      }
      
      
      );
    };


    
  }
});

angular.module("ejerciciosTerapeuticos").component("verEjerciciosTerapeuticos",{
  templateUrl:"ejercicios-terapeuticos/ver-ejercicios-terapeuticos.template.html",
  controller: function VerEjercicios($http, $scope,$window, $location, $rootScope){

    $scope.ejercicios;
  


    $scope.goToLink = function(e) {
      $window.localStorage.setItem("ejercicioSeleccionado",JSON.stringify(e)) 
      $location.path("/ejercicios/"+e.id);
    };

    $scope.sort_by = function(field, reverse, primer){

      var key = primer ? 
          function(x) {return primer(x[field])} : 
          function(x) {return x[field]};
   
      reverse = !reverse ? 1 : -1;
   
      return function (a, b) {
          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
   }

   $scope.ordenarPorTitulo = function(){
    $scope.ejercicios.sort($scope.sort_by('titulo', false, null));
   }

   $scope.ordenarPorFecha = function(){
    $scope.ejercicios.sort($scope.sort_by('fechaCreacion', true, null));
   }

    $scope.verEjercicios = function(){
      $http({
        method: "GET",
        url: "http://localhost:8080/medicos/"+$rootScope.usuarioURL+"/ejercicios",
  
      }).then(function(success) {
        $scope.ejercicios = success.data;
        $scope.ejercicios.sort($scope.sort_by('fechaCreacion', true, null));
        
      });
    }
    
  }
}
)


angular.module("ejerciciosTerapeuticos").component("detallesEjercicio",{
  templateUrl:"ejercicios-terapeuticos/detalles-ejercicio.template.html",
  controller: function ModificarEjercicio($routeParams,$http,$window, $scope, $rootScope){
    $scope.ejercicio = JSON.parse($window.localStorage.getItem("ejercicioSeleccionado"));
    $scope.modoeditar = false;
    $scope.respuestaPeticion;
    
    $scope.id = $routeParams.ejercicioId;


    $scope.activarModoEditar = function(){
      $scope.modoeditar = $scope.modoeditar === false ? $scope.modoeditar = true : $scope.modoeditar = false;
 
    };

    $scope.guardarCambios = function(){
      $http({
        method: "PUT",
        url: "http://localhost:8080/medicos/"+$rootScope.usuarioURL+"/ejercicios",
        data: $scope.ejercicio,


      }).then(function successCallback(response) {
        $scope.respuestaPeticion = true;
      }, function errorCallback(response){
        $scope.respuestaPeticion = false;
      }
      
      
      );
    }
    
  }
}
)
