(function () {
  /*geolocation service to get the current user position*/
  var geolocation = function () {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);

      } else {
        cbNoGeo();
      }
    };
    return {
      getPosition: getPosition
    };
  };


  angular
    .module('locatorApp')
    .service('geolocation', geolocation);

})();