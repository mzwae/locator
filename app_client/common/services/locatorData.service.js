

/*Data service for pulling data from the API*/
var locatorData = function ($http) {
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