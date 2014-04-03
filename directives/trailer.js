'use strict';

angular.module('curation.directives.trailer', [ 'curation.dimmed' ]).
	directive('qTrailer', [ '$window', '$dimmed', function( $window, dimmed ) {
		return {
			restrict: 'C',
			link: function( scope, element, attrs ) {
				$( '#popup' ).hide();
				element.on( 'click', function ( e ) {
					e.preventDefault();

					var $popup = $( '#popup' );
					var movieUrl = $popup.data( 'movieUrl' ) || 
						'http://www.youtube.com/embed/5QGnggCrPvw';
					var w = $popup.data( 'width' ) || 960, 
						h = $popup.data( 'height' ) || 720;

		   			var iframe = '<iframe width="'+ w + '" height="'+ h +'" src="'+ movieUrl + '" frameborder="0" allowfullscreen></iframe>',
						iframeWidth = w || 960,
						iframeHeight = h || 720,
						scrollTop = $( window ).scrollTop(),
						scrollLeft = $( window ).scrollLeft();

					$popup.css({
						marginTop : ( -iframeHeight / 2 ),
						marginLeft : ( -iframeWidth / 2 ) + scrollLeft
					}).width( iframeWidth ).height( iframeHeight ).html( iframe ).addClass( 'popup-animate' ).show();

					scope.stopVideo = true;
					scope.$apply();	
					
					dimmed.show( /*hide Callback*/function(){
						$popup.removeClass( 'popup-animate' );
						$popup.hide();

						scope.stopVideo = false;
						scope.$apply();
					});
		        });
			}
		}
	}]);
