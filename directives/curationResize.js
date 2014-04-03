'use strict';

angular.module('curation.directives.resize', []).
	directive('qResize', function( $window ) {
		return {
			restrict: 'C',
			link: function( scope, element ) {
				var w = angular.element( $window );

				scope.size = function(){
					return {w: w.width()};
				};

				scope.$watch( scope.size, function( newValue, oldValue ){
					var $body = angular.element( 'body' );

					$body.attr({ 'size': newValue.w });
				}, true);

				 w.on( 'resize', function () {
		            scope.$apply();
		        });
			}
		}
	});
