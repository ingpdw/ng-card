'use strict';

angular.module('curation.directives.scroll', []).
	directive('qScrolling', function() {
	    return {
	    	 restrict: 'AC',
	    	link: function( scope, element, attr ) {
		        // var panel = element[0];
		        
		        // element.on( 'scroll', function(){
		        //     if (panel.scrollTop + panel.offsetHeight >= panel.scrollHeight) {
		        //         scope.$apply( attr.scrolled );
		                
		        //     }
		        // });

				var $win = $( window );
				$win.on( 'scroll', function(){
					var scrollEndPosition = $( '.footer' ).offset().top || $( 'body' ).height(),
						scrollTop = $win.scrollTop(),
						windowHeight = $win.height();

		 			if ( scrollTop + windowHeight > scrollEndPosition - 100 ){
		 				scope.$emit( 'scroll.endPosition' );
		 				//scope.$broadcast( 'scroll.endPosition' );
		 			}
				});
		    }
		}
	});