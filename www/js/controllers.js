//var sesion=0;

angular.module('starter.controllers', ['ngCordova'])

  .controller('loginCtrl', function ($scope, $ionicPopup, $location, $http, $rootScope) {
    $scope.login = function (usuario, clave) {
      var pass2 = (clave);
      //pass2 = md5.createHash(clave);
      console.log(usuario, pass2);
      $http.post("http://parra.chillan.ubiobio.cl:8070/crgajard/grifo/web/index.php?r=api/usuario&usu=" + usuario + "&pas=" + pass2)
        .success(function (data) {
          if (data["respuesta"] == "true") {
            $location.path("/home-usuario");
            var alertPopup = $ionicPopup.alert({
              title: 'Sistema Gestión Emergencia',
              template: ' Bienvenido ' + data["nombre_usuario"]
            })
          } else {
            var alertPopup = $ionicPopup.alert({
              title: 'Error Inicio',
              template: ' Rut o contraseña incorrecta '
            });
          }
        })
    }
  })
  .controller('listarEmergenciasCtrl', function ($scope, $ionicPopup, $location, $http, $rootScope) {
    $scope.emergencias = [];
    $http.get("http://parra.chillan.ubiobio.cl:8070/crgajard/grifo/web/index.php?r=api/emergencia")
      .success(function (data) {
        console.log(data);
        $scope.emergencias = data;
      })
      .error(function (error) {
        console.log(error)
      });
    $scope.hola = function (id_emergencia) {
      var id = (id_emergencia);
      $scope.emer = [];
      $location.path("/listar-info");
      $http.get("http://parra.chillan.ubiobio.cl:8070/crgajard/grifo/web/index.php?r=api/hola&id=" + id)
        .success(function (data2) {
          console.log(data2);
          console.log(data2[1].latitudEmergencia);
          var image = {
            url: "img/grifo.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }
          var image2 = {
            url: "img/incendio.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }
          var mapOptions = {
            zoom: 18,
            center: new google.maps.LatLng(data2[1].latitudEmergencia, data2[1].longitudEmergencia),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          }
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          $scope.markers = [];
          var infoWindow = new google.maps.InfoWindow();
          var createMarker = function (info) {
            var marker = new google.maps.Marker({
              map: $scope.map,
              icon: image,
              position: new google.maps.LatLng(info.latitudGrifo, info.longitudGrifo),
            });
            var marker2 = new google.maps.Marker({
              map: $scope.map,
              icon: image2,
              position: new google.maps.LatLng(info.latitudEmergencia, info.longitudEmergencia),
            });
            $scope.markers.push(marker);
            $scope.markers.push(marker2);

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.setContent('<h5>' + 'Direccion' + '</h5>' + info.direccionGrifo);
              infoWindow.open($scope.map, marker);
            });
            google.maps.event.addListener(marker2, 'click', function () {
              infoWindow.setContent('<h5>' + 'Direccion Emergencia' + '</h5>' + info.direccion);
              infoWindow.open($scope.map, marker2);
            });
          }
          for (i = 0; i < data2.length; i++) {
            createMarker(data2[i]);
          }
          $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
          }
        })
        .error(function (error) {
          console.log(error)
        });

    }
    $scope.volver = function () {
      $location.path("/home-usuario");
    }
  })

  .controller('listarGrifosCtrl', function ($scope, $cordovaGeolocation, $location, $http, $state) {
    $http.get("http://parra.chillan.ubiobio.cl:8070/crgajard/grifo/web/index.php?r=api/grifos")
      .success(function (data) {
        var posOptions = {
          enableHighAccuracy: false,
          timeout: 10000,
        };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          var myLatlng = new google.maps.LatLng(lat, long);
          console.log(myLatlng);
          var mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var image = {
            url: "img/grifo.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          var image2 = {
            url: "img/run.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

          $scope.markers = [];
          var infoWindow = new google.maps.InfoWindow();
          var createMarker = function (info) {
            var marker = new google.maps.Marker({
              map: $scope.map,
              icon: image,
              position: new google.maps.LatLng(info.latitud, info.longitud)
            });
             var marker2 = new google.maps.Marker({
              map: $scope.map,
              icon: image2,
              position: new google.maps.LatLng(lat, long)
            });
            $scope.markers.push(marker);
            $scope.markers.push(marker2);

            marker.content = '<div class="infoWindowContent">' + info.id_grifo + '</div>';

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.setContent('<h5>' + 'Direccion' + '</h5>' + info.direccionGrifo);
              infoWindow.open($scope.map, marker);
            });
          }
          for (i = 0; i < data.length; i++) {
            createMarker(data[i]);
          }
          $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
          }
        })
      })
      .error(function (error) {
        console.log(error)
      })
  })

  .controller('pasarCtrl', function ($scope, $location, $rootScope, $http, $cordovaSocialSharing, $ionicPopup) {
    $scope.listarEmergencias = function () {
      $location.path("/listar-emergencias");
    }
    $scope.listarGrifos = function () {
      $location.path("/listar-grifos");
    }
    $scope.cerrarSesion = function () {
      window.localStorage.removeItem("usuario");
      window.localStorage.removeItem("patente");
      $location.path("/login");
      //console.log(window.localStorage.getItem("usuario"));
    };
  })