(function () {
  angular
    .module('locatorApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  /*Inject $routeParams service into controller to protect from minification*/
  locationDetailCtrl.$inject = ['$routeParams', 'locatorData', '$modal', 'authentication', '$location'];

  function locationDetailCtrl($routeParams, locatorData, $modal, authentication, $location) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    locatorData.locationById(vm.locationid)
      .success(function (data) {
        vm.data = {
          location: data.location,
          key: data.key
        };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function (e) {
        console.log(e);
      });

    vm.popupReviewForm = function () {
      var modalInstance = $modal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve: { //passing data object to reviewModal controller
          locationData: function () {
            return {
              locationid: vm.locationid,
              locationName: vm.data.location.name
            }
          }
        }
      });

      modalInstance.result.then(function (data) { //when modal promise is resolved

        /*push returned data into array of reviews, Angular binding will do the rest*/
        vm.data.location.reviews.push(data);
      });
    };


    //to get current visitor state
    vm.isLoggedIn = authentication.isLoggedIn();

    //to get the current url path of the user
    vm.currentPath = $location.path();

  }


})();