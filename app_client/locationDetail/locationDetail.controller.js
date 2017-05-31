(function () {
  angular
    .module('locatorApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  /*Inject $routeParams service into controller to protect from minification*/
  locationDetailCtrl.$inject = ['$routeParams', 'locatorData'];

  function locationDetailCtrl($routeParams, locatorData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    locatorData.locationById(vm.locationid)
      .success(function (data) {
        vm.data = {
          location: data
        };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function (e) {
        console.log(e);
      });

  }
})();