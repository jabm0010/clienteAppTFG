angular.module("gestionTerapias").component("verTerapias", {
  templateUrl: "gestion-terapias/gestion-terapias.template.html",

  controller: function verTerapias(
    $http,
    $scope,
    $window,
    $rootScope,
    $location
  ) {
    $scope.listaTerapias = [];

    $scope.init = function() {
      $scope.obtenerTerapias();
    };

    /**
     * Método para comprobar si una en el día actual corresponde la realización de una terapia.
     * Se verifica que la fecha actual corresponda con alguna de las fechas definidas en el inicio de la terapia y que
     * no se haya realizado ya la sesión del día de hoy
     */
    $scope.accederRealizarTerapia = function() {
      var hoy = new Date();

      for (let i = 0; i < $scope.listaTerapias.length; i++) {
        $scope.listaTerapias[i].terapiaHoy = "false";
        for (let j = 0; j < $scope.listaTerapias[i].fechas.length; j++) {
          if (
            hoy.toLocaleDateString() ==
            $scope.listaTerapias[i].fechas[j].toLocaleDateString()
          ) {
            $scope.listaTerapias[i].terapiaHoy = "true";
          }
        }

        for (
          let j = 0;
          j < $scope.listaTerapias[i].fechasRealizadas.length;
          j++
        ) {
            let fechaRealizada = new Date($scope.listaTerapias[i].fechasRealizadas[j]);
          if (
            hoy.toLocaleDateString() ==
           fechaRealizada.toLocaleDateString()
          ) {
            $scope.listaTerapias[i].terapiaHoy = "realizada";
          }
        }
      }
    };

    $scope.obtenerTerapias = function() {
      $http({
        method: "GET",
        url:
          "http://localhost:8080/pacientes/" +
          $rootScope.usuarioURL +
          "/terapias"
      }).then(function successBallback(response) {
        $scope.listaTerapias = response.data;
        for (var i = 0; i < $scope.listaTerapias.length; i++) {
          let d = new Date($scope.listaTerapias[i].fechaCreacion);
          d = d.toLocaleDateString();
          $scope.listaTerapias[i].fechaCreacion = d;
          $scope.listaTerapias[i].fechasFormato = [];
          for (var j = 0; j < $scope.listaTerapias[i].fechas.length; j++) {
            let e = new Date($scope.listaTerapias[i].fechas[j]);
            $scope.listaTerapias[i].fechas[j] = e;
            e = e.toLocaleDateString();
            $scope.listaTerapias[i].fechasFormato[j] = e;
          }
        }
        $scope.accederRealizarTerapia();
      });
    };

    $scope.ordenarFechas = function(terapia) {
      var fechas = terapia.fechas;
      fechas.sort();
      fechas.reverse();
      return fechas;
    };

    $scope.goToLink = function(t) {
      $window.localStorage.setItem("terapiaSeleccionada", JSON.stringify(t));
      $location.path("/terapias/" + t.id);
    };
  }
});







/**
 * Ver detalles de terapia
 */
angular.module("gestionTerapias").component("detallesTerapia", {
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

    $scope.chat = [];
    $scope.nuevoMensaje;
    kendo.culture("es-ES");

    $scope.fechas = [];
    $scope.fechasRealizadas = [];
    $scope.fechasFallidas = [];
    $scope.fechasFuturas = [];
    $scope.fechasRealizadasF = [];
    $scope.fechasFallidasF = [];
    $scope.fechasFuturasF = [];
    $scope.progreso;

    var contains = function(needle) {
      // Per spec, the way to identify NaN is that it is not equal to itself
      var findNaN = needle !== needle;
      var indexOf;

      if (!findNaN && typeof Array.prototype.indexOf === "function") {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function(needle) {
          var i = -1,
            index = -1;

          for (i = 0; i < this.length; i++) {
            var item = this[i];

            if ((findNaN && item !== item) || item === needle) {
              index = i;
              break;
            }
          }

          return index;
        };
      }

      return indexOf.call(this, needle) > -1;
    };

    $scope.gestionarFechasCalendario = function(fechas, fechasre) {
      var today = new Date();
      today = today.toLocaleDateString();

      fechasReForm = [];
      for (let i = 0; i < fechasre.length; i++) {
        fechasReForm.push(fechasre[i].toLocaleDateString());
      }
      console.log(fechasReForm);
      for (let i = 0; i < fechas.length; i++) {
        fechaComp = new Date(
          fechas[i].getFullYear(),
          fechas[i].getMonth(),
          fechas[i].getDate()
        );

        //console.log(fechas[i].toLocaleDateString())
        //console.log(today)
        if (
          fechas[i].toLocaleDateString() >= today &&
          !contains.call(fechasReForm, fechas[i].toLocaleDateString())
        ) {
          console.log("ee");
          $scope.fechasFuturas.push(+fechaComp);

          $scope.fechasFuturasF.push(fechas[i].toLocaleDateString());
        } else if (
          contains.call(fechasReForm, fechas[i].toLocaleDateString())
        ) {
          $scope.fechasRealizadas.push(+fechaComp);

          $scope.fechasRealizadasF.push(fechas[i].toLocaleDateString());
        } else {
          $scope.fechasFallidas.push(+fechaComp);

          $scope.fechasFallidasF.push(fechas[i].toLocaleDateString());
        }
      }
      $scope.fechas = $scope.fechasRealizadas.concat(
        $scope.fechasFallidas,
        $scope.fechasFuturas
      );
    };

    $scope.init = function() {
      for (f in $scope.terapia.fechas) {
        let d = new Date($scope.terapia.fechas[f]);
        $scope.terapia.fechas[f] = d;
      }
      for (f in $scope.terapia.fechasRealizadas) {
        let d = new Date($scope.terapia.fechasRealizadas[f]);
        $scope.terapia.fechasRealizadas[f] = d;
      }

      $scope.gestionarFechasCalendario(
        $scope.terapia.fechas,
        $scope.terapia.fechasRealizadas
      );
      var today = new Date();
      fechas = $scope.fechas;
      fechasRealizadas = $scope.fechasRealizadas;
      fechasFallidas = $scope.fechasFallidas;
      fechasFuturas = $scope.fechasFuturas;

      $scope.progreso = (fechasRealizadas.length / fechas.length) * 100;

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

      $("#progreso").css("width", $scope.progreso + "%");
    };
  }
});

/**
 * Ver ejercicios terapia
 */
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
    $scope.infoEjercicio = null;

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
            if ($scope.chat[i].imagenAutor == null) {
              $scope.chat[i].imagenAutor =
                "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
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

/**
 * Módulo para gestionar la realización de terapias
 */
angular.module("gestionTerapias").component("realizarTerapia", {
  templateUrl: "gestion-terapias/realizar-terapia.template.html",
  controller: function obtenerChatTerapia(
    $http,
    $scope,
    $window,
    $interval,
    $rootScope
  ) {
    $scope.terapia = JSON.parse(
      $window.localStorage.getItem("terapiaSeleccionada")
    );

    $scope.infoEjercicio = null;
    $scope.contador = null;
    $scope.duracionEjercicioActual = null;
    $scope.intervalo;
    $scope.init = function() {};

    $scope.cambiarContador = function(duracion) {
      $scope.contador = duracion * 60;
      $scope.duracionEjercicioActual = $scope.contador;
    };

    $scope.iniciarContador = function() {
      $scope.intervalo = $interval(function() {
        $scope.contador--;
      }, 1000);
    };
    $scope.reiniciarContador = function() {
      $scope.contador = $scope.duracionEjercicioActual;
    };

    $scope.pararContador = function() {
      $interval.cancel($scope.intervalo);
    };

    $scope.realizarSesion = function() {
      var hoy = new Date();
      $http({
        method: "POST",
        url:
          "http://localhost:8080/pacientes/" +
          $rootScope.usuarioURL +
          "/terapias/" +
          $scope.terapia.idTerapia,
        data: hoy
      }).then(
        function successBallback(response) {},

        function errorBallback(response) {}
      );
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
  }
});
