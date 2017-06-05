(function () {
  /*Data service for pulling data from the API*/
  locatorData.$inject = ['$http'];
  function locatorData($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=20');
    };

    
    var locationById = function(locationid){
      return $http.get('/api/locations/' + locationid);
    };
    
    var addReviewById = function(locationid, data){
      return $http.post('/api/locations/' + locationid + '/reviews', data);
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