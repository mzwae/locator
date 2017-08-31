(function () {
  angular
    .module('locatorApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'locatorData', 'geolocation'];

  function homeCtrl($scope, locatorData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'LocatoR',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? LocatoR helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let LocatoR help you find the place you're looking for."
    };


    vm.getData = function (position) {
      var lat = position.coords.latitude,
        lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      vm.working = true;
//      vm.maxdist = 20;
      locatorData
        .locationByCoords(lat, lng, vm.maxdist)
        .success(function (data) {
          vm.working = false;
          vm.message = data.length > 0 ? "" : "No locations found";
          vm.data = {
            locations: data
          };
        })
        .error(function (e) {
          vm.working = false;
          vm.message = "Sorry, something's gone wrong";
          console.log(e);
        });
    };


    vm.showError = function (error) {
      $scope.$apply(function () {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function () {
        vm.message = "Geolocation not supported by this browser.";
      });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  };

})();