angular.module("gestionTerapias").component("asignarTerapia", {
  templateUrl: "gestion-terapias/gestion-terapias.template.html",
  controller: function crearTerapia($http, $scope, $window) {
    $scope.medico = "usuario1@gmail.com";
    $scope.paciente = $window.localStorage.getItem("pacienteSeleccionado");
    $scope.terapia = {
      ejerciciosTerapia: [
        {
          codigoEjercicio: "1",
          duracionEjercicio: "5"
        },
        {
          codigoEjercicio: "2",
          duracionEjercicio: "8"
        },
        {
          codigoEjercicio: "3",
          duracionEjercicio: "10"
        }
      ],
   
    };

    $scope.respuestaPeticion;
    $scope.mostrarTablaEjercicios = true;
    $scope.ejerciciosTerapia = [];
    $scope.duracionEjercicio = {};
    $scope.fechas = [];

    $scope.crearTerapia = function() {


      $scope.terapia.fechas = $scope.fechas;
      $scope.terapia.ejerciciosTerapia = [];
      Object.keys($scope.duracionEjercicio).forEach(function(key) {
        let value = $scope.duracionEjercicio[key];
        console.log(value);
        
        var tmp  = new Object();
        tmp.codigoEjercicio = key;
        tmp.duracionEjercicio = value;

        $scope.terapia.ejerciciosTerapia.push(tmp);
    });


      $http({
        method: "POST",
        url:
          "http://localhost:8080/medicos/" +
          $scope.medico +
          "/terapias/" +
          $scope.paciente,
        data: $scope.terapia
      }).then(
        function successCallback(response) {
          $scope.respuestaPeticion = true;
        },
        function errorCallback(response) {
          $scope.respuestaPeticion = false;
        }
      );
    };
    //Repetido
    $scope.verEjercicios = function() {
      $http({
        method: "GET",
        url: "http://localhost:8080/medicos/" + $scope.medico + "/ejercicios"
      }).then(function(success) {
        $scope.ejercicios = success.data;
        $scope.ejercicios.sort($scope.sort_by("fechaCreacion", true, null));
      });
    };

    $scope.mostrarTablaEjercicios = function() {
      $scope.mostrarTablaEjercicios = true;
    };

    $scope.anadirEjercicio = function(e) {
      if (!$scope.ejerciciosTerapia.includes(e))
        $scope.ejerciciosTerapia.push(e);
    };

    $scope.eliminarEjercicio = function(e) {
      let index = $scope.ejerciciosTerapia.indexOf(e);
      $scope.ejerciciosTerapia.splice(index, 1);
      let idEjercicio = e.id;
      delete $scope.duracionEjercicio[idEjercicio];
    };

    $scope.anadirDuracion = function(e, d) {
      let infoejercicio = { codigoEjercicio: e, duracionEjercicio: d };
      $scope.duracionEjercicio.push(infoEjercicio);
    };

 

    //Gestión widget calendario
    kendo.culture("es-ES");
    $(document).ready(function() {
      $("#calendar").kendoCalendar({
        selectable: "multiple",
        change: onChange
      });
    });

    function onChange(e) {
      let fechasTmp = e.sender.selectDates();
      var arrayLength = fechasTmp.length;
      $scope.fechas = [];
      for (var i = 0; i < arrayLength; i++) {
        var f = new Date(fechasTmp[i]);
        f.setUTCHours(f.getUTCHours() + 2);
        $scope.fechas.push(f.toJSON());

      }

      //updateResult($scope.fechas);
    }
  }
});
