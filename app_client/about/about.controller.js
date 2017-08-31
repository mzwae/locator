(function(){
  angular
    .module('locatorApp')
    .controller('aboutCtrl', aboutCtrl);
  
  function aboutCtrl(){
    var vm = this;
    vm.pageHeader = {
      title: 'About LocatoR'
    };
    
    vm.main = {
      content: "Looking for wifi and a seat? LocatoR helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let LocatoR help you find the place you're looking for."
    };
  }
})();