angular.module("registroUsuario").component("registroUsuario", {
  // This name is what AngularJS uses to match to the `<phone-list>` element.
  templateUrl: "registro/registro-usuario.template.html",
  controller: function RegistroUsuarioController($http, $scope) {
    $scope.usuario = {};
    $scope.contrasenaverificar = {};
    $scope.registrarUsuario = function(){
        $http({
            method: 'POST',
            url: 'http://localhost:8080/usuarios',
            data: $scope.usuario
          })
          .then(function (success) {
            callback(success);
          });

    }
    
   

}
});
