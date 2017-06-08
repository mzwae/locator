(function () {
  angular
    .module('locatorApp')
    .service('authentication', authentication);

  authentication.$inject = ['$window'];

  function authentication($window) {

    var saveToken = function (token) {
      $window.localStorage['locator-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['locator-token'];
    };

    var register = function (user) {
      return $http
        .post('/api/register', user)
        .success(function (data) {
          saveToken(data.token);
        });
    };

    var login = function (user) {
      return $http
        .post('/api/login', user)
        .success(function (data) {
          saveToken(data.token);
        });
    };

    var logout = function () {
      $window.localStorage.removeItem('locator-token');
    };


    //to check whether a user is logged in or not
    var isLoggedIn = function () {
      var token = getToken(); // get token from local storage

      if (token) {
        //if token exists, get payload, decod it, and parse it to JSON
        //atob is a browser function for decoding JWT payload
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        //validate whether expiry date has passed
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    //Getting the user information from the JWT
    var currentUser = function () {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn, 
      currentUser: currentUser
    };
  }
})();