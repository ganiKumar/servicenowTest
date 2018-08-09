app.directive('myRepeatDirective', function( $timeout) {
  return {

  	link: function(scope, element, attrs) {
   //angular.element(element).css('color','blue');
     if (scope.$last === true) {
                $timeout(function () {
                	console.log('valueee')
                   // scope.addDrag();
                },2000);
            }

 }
   

}
})
