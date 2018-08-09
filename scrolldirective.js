app.directive('whenScrollEnds', function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {

              //  console.log(angular.element.height())
               var visibleHeight = element[0].offsetHeight;
                var threshold = 75;

                element.on('scroll', function (e) {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element[0].scrollTop <= threshold) {
                        scope.$apply(attrs.whenScrollEnds);
                    }
                }); 
            }
        };
    });