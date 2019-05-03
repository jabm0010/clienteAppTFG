angular.module("gestionPacientes").component("verPacientes", {
  templateUrl: "gestion-pacientes/gestion-pacientes.template.html",
  controller: function verPacientes($http, $scope, $window, $location, $rootScope) {

    $scope.listadoPacientes;
  

    $scope.goToLink = function(p, path) {
      $window.localStorage.setItem("pacienteSeleccionado", p.correoElectronico);
      $window.localStorage.setItem("nombrePaciente", p.nombre);
      $window.localStorage.setItem("apellidosPaciente", p.apellidos);
      if (p.imagen == null) {
        $window.localStorage.setItem(
          "imagenPaciente",
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
        );
      } else {
        $window.localStorage.setItem("imagenPaciente", p.imagen);
      }
      $location.path("/" + path);
    };

    $scope.obtenerPacientes = function() {
      $http({
        method: "GET",
        url: "http://localhost:8080/medicos/" + $rootScope.usuarioURL + "/pacientes"
      }).then(function(success) {
        $scope.listadoPacientes = success.data;
      });
    };
  }
});

angular.module("gestionPacientes").component("nuevoPaciente", {
  templateUrl: "gestion-pacientes/nuevo-paciente.template.html",

  controller: function anadirPaciente($http, $scope, $rootScope) {
  
    $scope.paciente;
    $scope.respuestaPeticion;

    $scope.nuevoPaciente = function() {
      $http({
        method: "POST",
        url: "http://localhost:8080/medicos/" + $rootScope.usuarioURL + "/pacientes",
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

angular.module("gestionPacientes").component("historialMedico", {
  templateUrl: "gestion-pacientes/historial-medico.template.html",

  controller: function gestionarHistorialMedico($http, $scope, $window, $rootScope,$location) {

    $scope.paciente = $window.localStorage.getItem("pacienteSeleccionado");
    $scope.nombre = $window.localStorage.getItem("nombrePaciente");
    $scope.apellidos = $window.localStorage.getItem("apellidosPaciente");
    $scope.imagen = $window.localStorage.getItem("imagenPaciente");
    $scope.nuevoComentario;
    $scope.historialMedico;
    $scope.modoNuevoComentario = false;
    $scope.listaTerapias;


    $scope.init = function (){
      $scope.obtenerHistorialMedico();
      $scope.obtenerTerapias();
    }

    $scope.obtenerHistorialMedico = function() {
      $http({
        method: "GET",
        url:
          "http://localhost:8080/medicos/" +
          $rootScope.usuarioURL +
          "/historial/" +
          $scope.paciente
      }).then(function successBallback(response) {
        $scope.historialMedico = response.data;
        $scope.historialMedico = $scope.historialMedico.comentariosHistorial;

        var historialOrdenado = {};
        var keys = Object.keys($scope.historialMedico);
        keys.sort();
        keys.reverse();
        for (var i = 0; i < keys.length; i++) {
          var clave = keys[i];
          historialOrdenado[clave] = $scope.historialMedico[clave];
        }
        $scope.historialMedico = historialOrdenado;
      });
    };

    $scope.enviarComentario = function() {
      $http({
        method: "POST",
        url:
          "http://localhost:8080/medicos/" +
          $rootScope.usuarioURL +
          "/historial/" +
          $scope.paciente,
        data: $scope.nuevoComentario
      }).then(
        function successBallback(response) {
          $scope.modoNuevoComentario = false;
          $scope.nuevoComentario = "";
          $scope.obtenerHistorialMedico();
        },

        function errorBallback(response) {}
      );
    };

    $scope.obtenerTerapias = function(){
      $http({
        method: "GET",
        url:
          "http://localhost:8080/medicos/" +
          $rootScope.usuarioURL +
          "/terapias/" +
          $scope.paciente,

      }).then(
        function successBallback(response) {
          $scope.listaTerapias = response.data;
        },

        function errorBallback(response) {}
      );
    }

    $scope.terapiaActual = function(terapia){

      var fechas = $scope.ordenarFechas(terapia);
      var ahora = new Date();
      ahora.toLocaleString();
      var ultimaFecha = new Date(fechas[0]);
      ultimaFecha.toLocaleString();
      if(ultimaFecha > ahora){
        return true;
      }
      return false;
    }

    $scope.ordenarFechas = function(terapia){
      var fechas = terapia.fechas;
      fechas.sort();
      fechas.reverse();
      return fechas;
    }

    $scope.goToLink = function(t) {
      $window.localStorage.setItem("terapiaSeleccionada",JSON.stringify(t)) 
      $location.path("/terapias/"+t.id);
    };
 
  }


});
