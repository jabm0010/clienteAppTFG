angular.module("gestionTerapias").component("asignarTerapia", {
  templateUrl: "gestion-terapias/gestion-terapias.template.html",
  controller: function crearTerapia($http, $scope, $window, $rootScope) {
    $scope.paciente = $window.localStorage.getItem("pacienteSeleccionado");
    $scope.terapia = {};

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

        var tmp = new Object();
        tmp.codigoEjercicio = key;
        tmp.duracionEjercicio = value;

        $scope.terapia.ejerciciosTerapia.push(tmp);
      });

      $http({
        method: "POST",
        url:
          "http://localhost:8080/medicos/" +
          $rootScope.usuarioURL +
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
        url:
          "http://localhost:8080/medicos/" +
          $rootScope.usuarioURL +
          "/ejercicios"
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

angular.module("gestionTerapias").component("verTerapia", {
  templateUrl: "gestion-terapias/ver-terapia.template.html",
  controller: function obtenerTerapia(
    $http,
    $scope,
    $window,
    $rootScope,
    $location
  ) {
    $scope.terapia = JSON.parse(
      $window.localStorage.getItem("terapiaSeleccionada")
    );
    $scope.infoEjercicio;
    $scope.fechas = [];
    $scope.chat = [];
    $scope.nuevoMensaje;
    kendo.culture("es-ES");

    $scope.init = function() {
      var today = new Date();
      fechasRealizadas = [
        +new Date(today.getFullYear(), today.getMonth(), 8),
        +new Date(today.getFullYear(), today.getMonth(), 12)
      ];
      fechasFallidas = [+new Date(today.getFullYear(), today.getMonth(), 13)];
      fechasFuturas = [
        +new Date(today.getFullYear(), today.getMonth(), 26),
        +new Date(today.getFullYear(), today.getMonth(), 27)
      ];

      fechas = fechasRealizadas.concat(fechasFallidas, fechasFuturas);

      for (f in $scope.terapia.fechas) {
        let d = new Date($scope.terapia.fechas[f]);
        console.log(d);
        let fechaFormato = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate() + 1
        );
        console.log(fechaFormato);
        $scope.fechas.push(+fechaFormato);
      }

      $("#calendar").kendoCalendar({
        value: today,
        dates: $scope.fechas,
        month: {
          // template for dates in month view
          content:
            "# if ($.inArray(+data.date, fechas) != -1) { #" +
            '<div class="' +
            "# if ($.inArray(+data.date, fechasRealizadas)!= -1) { #" +
            "realizadas" +
            "# } else if ( $.inArray(+data.date, fechasFallidas)!= -1 ) { #" +
            "fallidas" +
            "# } else { #" +
            "pendientes" +
            "# } #" +
            '">#= data.value #</div>' +
            "# } else { #" +
            "#= data.value #" +
            "# } #",
          weekNumber: '<a class="italic">#= data.weekNumber #</a>'
        },
        navigate: function() {
          $(".realizadas", "#calendar")
            .parent()
            .addClass("realizadas-style k-state");
          $(".fallidas", "#calendar")
            .parent()
            .addClass("fallidas-style k-state");
          $(".pendientes", "#calendar")
            .parent()
            .addClass("pendientes-style k-state");
          $(".realizadas", "#calendar").addClass("fecha k-state");
          $(".fallidas", "#calendar").addClass("fecha k-state");
          $(".pendientes", "#calendar").addClass("fecha k-state");
        },
        footer: false
      });

      $scope.verChatTerapia();
    };

    $scope.verEjercicio = function(e) {
      $scope.infoEjercicio = null;
      $http({
        method: "GET",
        url: e.enlaceEjercicio.href
      }).then(
        function successBallback(response) {
          $scope.infoEjercicio = response.data;
        },

        function errorBallback(response) {}
      );
    };

    $scope.goToLink = function() {
      $location.path("/ejercicios/" + $scope.infoEjercicio.identificador);
    };
  }
});

angular.module("gestionTerapias").component("verEjerciciosTerapia", {
  templateUrl: "gestion-terapias/ver-ejercicios-terapia.template.html",
  controller: function obtenerEjerciciosTerapia(
    $http,
    $scope,
    $window,
    $location
  ) {
    $scope.terapia = JSON.parse(
      $window.localStorage.getItem("terapiaSeleccionada")
    );
    $scope.infoEjercicio;

    $scope.init = function() {};

    $scope.verEjercicio = function(e) {
      $scope.infoEjercicio = null;
      $http({
        method: "GET",
        url: e.enlaceEjercicio.href
      }).then(
        function successBallback(response) {
          $scope.infoEjercicio = response.data;
        },

        function errorBallback(response) {}
      );
    };

    $scope.goToLink = function() {
      $location.path("/ejercicios/" + $scope.infoEjercicio.identificador);
    };
  }
});

angular.module("gestionTerapias").component("verChatTerapia", {
  templateUrl: "gestion-terapias/ver-chat-terapia.template.html",
  controller: function obtenerChatTerapia($http, $scope, $window, $location) {
    $scope.terapia = JSON.parse(
      $window.localStorage.getItem("terapiaSeleccionada")
    );
    $scope.chat = [];
    $scope.nuevoMensaje;

    $scope.init = function() {
      $scope.verChatTerapia();
    };

    $scope.verChatTerapia = function() {
      $http({
        method: "GET",
        url: $scope.terapia.linkChatTerapia.href
      }).then(
        function successBallback(response) {
          $scope.chat = response.data;
          for (var i = 0; i < $scope.chat.length; i++) {
            let d = new Date($scope.chat[i].fechaActualizacion);
            d = d.toLocaleString();
            $scope.chat[i].fechaActualizacion = d;
            if($scope.chat[i].imagenAutor == null){
              $scope.chat[i].imagenAutor = "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
             
            }
          }





        },
        function errorBallback(response) {}
      );
    };

    $scope.nuevoMensajeChat = function() {
      $http({
        method: "POST",
        url: $scope.terapia.linkChatTerapia.href,
        data: $scope.nuevoMensaje
      }).then(
        function successBallback(response) {
          $scope.nuevoMensaje = null;
          $scope.verChatTerapia();

        },
        function errorBallback(response) {}
      );
    };
  }
});
