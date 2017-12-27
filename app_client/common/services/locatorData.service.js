(function () {
  /*Data service for pulling data from the API*/
  locatorData.$inject = ['$http', 'authentication'];

  function locatorData($http, authentication) {
    var locationByCoords = function (lat, lng, maxdist) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=' + '200');
    };


    var locationById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          //Add an options parameter to pass a new HTTP header containing JWT
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };
    return {
      locationByCoords: locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  };


  angular
    .module('locatorApp')
    .service('locatorData', locatorData);

})();