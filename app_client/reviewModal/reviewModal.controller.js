(function () {
  angular
    .module('locatorApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$modalInstance', 'locationData', 'locatorData'];

  function reviewModalCtrl($modalInstance, locationData, locatorData) {
    var vm = this;
    vm.locationData = locationData;

    vm.modal = {
      cancel: function () {
        $modalInstance.dismiss('cancel');
      },
      close: function (result) {
        $modalInstance.close(result);
      }
    };

    //when the submit review button is clicked
    vm.onSubmit = function () {
      vm.formError = ""; //Reset any existing error messages
      if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again!";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);

      }
    };

    /*New function formats data and sends it to new service method*/
    vm.doAddReview = function (locationid, formData) {

      locatorData.addReviewById(locationid, {
          author: formData.name,
          rating: formData.rating,
          reviewText: formData.reviewText
        })
        .success(function (data, status) {
          vm.modal.close(data);
        })
        .error(function (error) {
          vm.formatError = "Your review has not been saved, try again!";
        });
      return false;
    };
  }
})();