angular.module('curation.masonry', [])
  .directive("masonry", function($parse, $timeout) {
    return {
      restrict: 'AC',
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
        // Opitonal Params, delimited in class name like:
        // class="masonry:70;"
        //elem.masonry({ itemSelector: '.masonry-item', columnWidth: 140, gutterWidth: $parse(attrs.masonry)(scope) });
      },
      controller : function($scope,$element){
          var bricks = [];
          this.appendBrick = function(child, brickId, waitForImage){
            function addBrick() {
              $element.masonry('appended', child, true);

              // If we don't have any bricks then we're going to want to 
              // resize when we add one.
              if (bricks.length === 0) {
                // Timeout here to allow for a potential
                // masonary timeout when appending (when animating
                // from the bottom)
                $timeout(function(){
                  $element.masonry('resize');  
                }, 2);  
              }

              // Store the brick id
              var index = bricks.indexOf(brickId);
              if (index === -1) {
                bricks.push(brickId);
              }
            }

            if (waitForImage) {
              child.imagesLoaded(addBrick);      
            } else {
              addBrick();
            }
          };

          // Removed bricks - we only want to call masonry.reload() once
          // if a whole batch of bricks have been removed though so push this
          // async.
          var willReload = false;
          function hasRemovedBrick() {
            if (!willReload) {
              willReload = true;
              $scope.$evalAsync(function(){
                willReload = false;
                $element.masonry("reload");
              });
            }
          }

          this.removeBrick = function(brickId){
              hasRemovedBrick();
              var index = bricks.indexOf(brickId);
              if (index != -1) {
                bricks.splice(index,1);
              }
          };
      }
    };     
  })
  .directive('masonryItem', function ($compile) {
    return {
      restrict: 'AC',
      require : '^masonry',
      link: function (scope, elem, attrs, MasonryCtrl) {

      elem.imagesLoaded(function () {
        MasonryCtrl.appendBrick(elem, scope.$id, true);
      });

      scope.$on("$destroy",function(){
          MasonryCtrl.removeBrick(scope.$id);
      }); 
    }
  };
});