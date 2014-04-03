'use strict';

angular.module('curation.directives.curationscrolling', []).
	directive('qScrolling', [ '$timeout', function( $timeout ) {
	    return {
	    	 restrict: 'AC',
	    	link: function( scope, element, attr ) {
				var $win = $( window );
				
				$win.on( 'scroll', function(){
					var $winH = $win.height(),
						$winScroll = $win.scrollTop(),
						$bodyH = $( 'body' ).height() - 50;

					if( $winH + $winScroll >= $bodyH ){
						//$timeout(function(){
							scope.$emit( 'scroll.endPosition' );
						//});
					}
				});
		    }
		}
	}]);
