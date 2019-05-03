angular.module("perfilUsuario").component("perfilUsuario", {
    templateUrl: "perfil-usuario/perfil-usuario.template.html",
    controller: function obtenerPerfilUsuario($http, $scope, $rootScope) {

      $scope.informacionUsuario;
      $scope.obtenerPerfilUsuario = function() {
        $http({
          method: "GET",
          url: "http://localhost:8080/pacientes/"+$rootScope.usuarioURL

        }).then(function(success) {
          $scope.informacionUsuario = success.data;
          //Imagen por defecto de perfil de usuario en caso de que el usuario no tenga una
          if($scope.informacionUsuario.imagen == null){
              $scope.informacionUsuario.imagen = "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
          }



        });
      };
  
    
    }
    
  });
  
  