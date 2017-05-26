(function () {
  /*Data service for pulling data from the API*/
  locatorData.$inject = ['$http'];
  function locatorData($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=20');
    };

    return {
      locationByCoords: locationByCoords
    };
  };


  angular
    .module('locatorApp')
    .service('locatorData', locatorData);

})();