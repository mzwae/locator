(function(){
  angular
    .module('locatorApp')
    .controller('navigationCtrl', navigationCtrl);
  
  navigationCtrl.$inject = ['$location', 'authentication'];
  
  function navigationCtrl($location, authentication){
    var vm = this;
    
    vm.currentPath = $location.path();
    
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    
    //redirect to home page when complete
    vm.logout = function(){
      authentication.logout();
      $location.path('/');
    };
  }
})();