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

  angular.module('curation.masonry', [])
    .controller('MasonryCtrl', function( $scope, $element, $timeout) {
      var items = {};
      var schedule = [];
      var destroyed = false;
      var self = this;
      var timeout = null;

      this.preserveOrder = false;

      this.scheduleMasonryOnce = function() {
        var args = arguments;
        var found = schedule.filter(function(item) {
          return item[0] === args[0];
        }).length > 0;

        if (!found) {
          this.scheduleMasonry.apply(null, arguments);
        }
      };

      this.scheduleMasonry = function() {
        if (timeout) {
          $timeout.cancel(timeout);
        }

        schedule.push([].slice.call(arguments));

        timeout = $timeout(function() {
          if (destroyed) {
            return;
          }
          schedule.forEach(function(args) {
            $element.masonry && $element.masonry.apply($element, args);
          });
          schedule = [];
        }, 30);
      };

      function defaultLoaded($element) {
        $element.addClass('loaded');
      }

      this.appendItem = function(element, id) {
        if (destroyed) return;

        function _append() {
          if (Object.keys(items).length === 0) {
            $element.masonry && $element.masonry('resize');
          }
          if (items[id] === undefined) {
            items[id] = true;
            defaultLoaded(element);
            $element.masonry && $element.masonry('appended', element, true);
          }
        }

        function _layout() {
          self.scheduleMasonryOnce('layout');
        }

        if (self.preserveOrder) {
          _append();
          element.imagesLoaded(_layout);
        } else {
          element.imagesLoaded(function() {
            _append();
            _layout();
          });
        }
      };

      this.removeItem = function(id, element) {
        if (destroyed) {
          return;
        }

        delete items[id];
        $element.masonry('remove', element);
        this.scheduleMasonryOnce('layout');
      };

      this.destroy = function() {
        destroyed = true;

        if ($element.data('masonry')) {
          $element.masonry('destroy');
        }
        $scope.$emit( 'masonry.destroyed' );

        items = [];
      };

      this.reload = function() {
        $element.masonry();
        $scope.$emit( 'masonry.reloaded' );
      };

      this.relayout = function(){
         self.scheduleMasonryOnce('layout');
      };

    }).directive('masonry', function( $timeout ) {
      return {
        restrict: 'AEC',
        controller: 'MasonryCtrl',
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {
            var windowWidth = $( window ).width();
            var cardWidth = 364;

            var attrOptions = scope.$eval(attrs.masonry || attrs.masonryOptions);
            var options = angular.extend({
              itemSelector: attrs.itemSelector || '.masonry-item',
              columnWidth: parseInt(attrs.columnWidth, 10) || cardWidth,
              transitionDuration : 0,
              gutter: 19
            }, attrOptions || {});

            element.masonry( options );

            var preserveOrder = scope.$eval(attrs.preserveOrder);
            ctrl.preserveOrder = (preserveOrder !== false && attrs.preserveOrder !== undefined);

            scope.$emit( 'masonry.created', element );
            scope.$on( '$destroy', ctrl.destroy );
            scope.$on( 'change.card', ctrl.relayout );
          }
        }
      };
    }).directive('masonryItem', function( $timeout) {
      return {
        restrict: 'AC',
        require: '^masonry',
        scope: true,
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {

            var id = scope.$id, index;
            var windowWidth = $( window ).width();

            var cardWidth = attrs.columnWidth || 364;

            element.css({ width: cardWidth});

            $timeout( function(){
              ctrl.appendItem(element, id);
            });
              
            element.on('$destroy', function () {
              ctrl.removeItem(id, element);
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










