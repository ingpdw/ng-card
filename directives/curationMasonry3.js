angular.module('curation.masonry', [])
  .directive("masonry", function($parse) {
    return {
      restrict: 'AC',
      controller:function($scope,$element){
        // register and unregister bricks
        var bricks = [];
        this.addBrick = function(brick){
          bricks.push(brick)
        }
        this.removeBrick = function(brick){
          var index = bricks.indexOf(brick);
          if(index!=-1)bricks.splice(index,1);
        }
        $scope.$watch(function(){
          return bricks
        },function(){
          // triggers only once per list change (not for each brick)
          $element.masonry('reload');
        },true);
      },
      link: function (scope, elem, attrs) {
        var windowWidth = $( window ).width();
        var cardWidth = 364;
        var options = angular.extend({
              itemSelector: attrs.itemSelector || '.masonry-item',
              columnWidth: cardWidth || parseInt(attrs.columnWidth, 10) || attrs.columnWidth,
              transitionDuration : 0,
              gutter: 19
            });


        elem.masonry(options);
      }
    };     
  })
  .directive('masonryItem', function ($compile, $timeout) {
    return {
      restrict: 'AC',
      require:'^masonry',
      link: function (scope, elem, attrs,ctrl) {
         $timeout(function(){
          ctrl.addBrick(scope.$id);  
         })
        

        scope.$on('$destroy',function(){
          ctrl.removeBrick(scope.$id);
        });
      }
    };
  });