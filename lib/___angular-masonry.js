/*!
 * angular-masonry <%= pkg.version %>
 * Pascal Hartig, weluse GmbH, http://weluse.de/
 * License: MIT
 */
(function () {
  'use strict';

  //Support for Windows Internet Explorer7+8
  if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
  };

  if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = [], key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {keys.push(key);}
        }
        return keys;
    };
  };

  if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun /*, thisArg */){
      
      if (this === void 0 || this === null)
        throw new TypeError();

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function")
        throw new TypeError();

      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++)
      {
        if (i in t)
          fun.call(thisArg, t[i], i, t);
      }
    };
  }

  angular.module('wu.masonry', [])
    .controller('MasonryCtrl', function controller($scope, $element, $timeout) {
      var bricks = {};
      var schedule = [];
      var destroyed = false;
      var self = this;
      var timeout = null;

      this.preserveOrder = false;

      this.scheduleMasonryOnce = function scheduleMasonryOnce() {
        var args = arguments;
        var found = schedule.filter(function filterFn(item) {
          return item[0] === args[0];
        }).length > 0;

        if (!found) {
          this.scheduleMasonry.apply(null, arguments);
        }
      };

      // Make sure it's only executed once within a reasonable time-frame in
      // case multiple elements are removed or added at once.
      this.scheduleMasonry = function scheduleMasonry() {
        if (timeout) {
          $timeout.cancel(timeout);
        }

        schedule.push([].slice.call(arguments));

        timeout = $timeout(function runMasonry() {
          if (destroyed) {
            return;
          }
          schedule.forEach(function scheduleForEach(args) {
            $element.masonry.apply($element, args);
          });
          schedule = [];
        }, 30);
      };

      function defaultLoaded($element) {
        $element.addClass('loaded');
      }

      this.appendBrick = function appendBrick(element, id) {
        if (destroyed) {
          return;
        }

        function _append() {
          if (Object.keys(bricks).length === 0) {
            $element.masonry('resize');
          }
          if (bricks[id] === undefined) {
            // Keep track of added elements.
            bricks[id] = true;
            defaultLoaded(element);
            $element.masonry('appended', element, true);
          }
        }

        function _layout() {
          // I wanted to make this dynamic but ran into huuuge memory leaks
          // that I couldn't fix. If you know how to dynamically add a
          // callback so one could say <masonry loaded="callback($element)">
          // please submit a pull request!
          self.scheduleMasonryOnce('layout');
        }

        if (self.preserveOrder) {
          _append();
          element.imagesLoaded(_layout);
        } else {
          element.imagesLoaded(function imagesLoaded() {
            _append();
            _layout();
          });
        }
      };

      this.removeBrick = function removeBrick(id, element) {
        if (destroyed) {
          return;
        }

        delete bricks[id];
        $element.masonry('remove', element);
        this.scheduleMasonryOnce('layout');
      };

      this.destroy = function destroy() {
        destroyed = true;

        if ($element.data('masonry')) {
          // Gently uninitialize if still present
          $element.masonry('destroy');
        }
        $scope.$emit('masonry.destroyed');

        bricks = [];
      };

      this.reload = function reload() {
        $element.masonry();
        $scope.$emit('masonry.reloaded');
      };

      $scope.$on( 'cards.changed', function(){
       self.scheduleMasonryOnce('layout');
      });

    }).directive('masonry', function masonryDirective() {
      return {
        restrict: 'AEC',
        controller: 'MasonryCtrl',
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {

            var windowWidth = $( window ).width();
            var cardWidth = 363;

            var attrOptions = scope.$eval(attrs.masonry || attrs.masonryOptions);
            var options = angular.extend({
              itemSelector: attrs.itemSelector || '.masonry-brick',
              columnWidth: cardWidth || parseInt(attrs.columnWidth, 10) || attrs.columnWidth,
              transitionDuration : 0,
              gutter: 16
            }, attrOptions || {});

            element.masonry( options );

            //element.masonry('resize');

            var preserveOrder = scope.$eval(attrs.preserveOrder);
            ctrl.preserveOrder = (preserveOrder !== false && attrs.preserveOrder !== undefined);

            scope.$emit('masonry.created', element);
            scope.$on('$destroy', ctrl.destroy);
          }
        }
      };
    }).directive('masonryBrick', function masonryBrickDirective() {
      return {
        restrict: 'AC',
        require: '^masonry',
        scope: true,
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {
            var id = scope.$id, index;

            var windowWidth = $( window ).width();
            var cardWidth = 363;

            element.css({ width: cardWidth});

            ctrl.appendBrick(element, id);
            element.on('$destroy', function () {
              ctrl.removeBrick(id, element);
            });

            scope.$on('masonry.reload', function () {
              ctrl.scheduleMasonryOnce('reloadItems');
              ctrl.scheduleMasonryOnce('layout');
            });

            scope.$watch('$index', function () {
              if (index !== undefined && index !== scope.$index) {
                ctrl.scheduleMasonryOnce('reloadItems');
                ctrl.scheduleMasonryOnce('layout');
              }
              index = scope.$index;
            });
          }
        }
      };
    });
}());










