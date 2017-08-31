(function () {
  /*Data service for pulling data from the API*/
  locatorData.$inject = ['$http', 'authentication'];
  function locatorData($http, authentication) {
    var locationByCoords = function (lat, lng, maxdist) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=' + '200');
    };

    
    var locationById = function(locationid){
      return $http.get('/api/locations/' + locationid);
    };
    
    var addReviewById = function(locationid, data){
      console.log("data is: ", data);
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
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