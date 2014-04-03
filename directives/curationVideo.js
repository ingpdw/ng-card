'use strict';

angular.module('curation.directives.video', []).
	directive('qVideo', function() {
		return {
			restrict: 'C',

			link: function( scope, element, attrs ) {

				var template = '', 
					$window = angular.element( window ), 
					$videoViewport = angular.element( '#video-viewport' ), 
					$video,
					siteUrl = 'http://plat-lego.korea.ncsoft.corp/!/uidevelopmentteam/bns-tft';
				
				var poster = attrs.poster || 
					siteUrl + '/src/images/@temp_poster.png';
				var movie = attrs.movieUrl || 
					siteUrl + '/src/images/background_720.webm';
				var movieMp4 = attrs.movieUrlMp ||
					siteUrl + '/src/images/background_1130.mp4';

				var movieW = attrs.movieWidth, movieH = attrs.movieHeight;

				var isCanPlayType = !!document.createElement( 'video' ).canPlayType;
	
				if( isCanPlayType ){
			 		template =  '<video id="video" autoplay loop preload poster="'+ poster +'">'+
						 		'<source src="'+ movie +'" />'+
						 		'<source src="'+ movieMp4 +'" />'+
						 		'</video>';
			 	}else{
			 		//video 미지원
			 	 	template = '<div id="video" style="background:url(' + poster + ') no-repeat center 78px"></div>';
			 	}	

			 	//template으로 element 교체
			 	element.replaceWith( template );

			 	//get video tag
				$video = angular.element( '#video' );	

				//visiblilityChange
			 	angular.element( document ).on( 'webkitvisibilitychange', function(){
					if ( !window._checkVisibilityChange ) {
						return;
					}

					if ( document[ 'webkitHidden' ] ) {
						$video[ 0 ].pause();
						scope.stopVideo = true;
					} else {
						$video[ 0 ].play();
						scope.stopVideo = false;
					}			 		
			 	});

			 	//trailer show/hide
			 	scope.$watch( 'stopVideo', function(){
			 		if( !isCanPlayType ) return;

			 		if ( scope.stopVideo ) {
						$video[ 0 ].pause();
					} else {
						$video[ 0 ].play();
					}
			 	});

			 	//window resize
				$window.on( 'resize', function() {
					
					var videoMinHeight = 1030, originVideoWidth = movieW, originVideoHeight = movieH;
					var windowWidth = $window.width(), windowHeight = $window.height();
					var scaleHorizontal = windowWidth / originVideoWidth;
					var scaleVertical = windowHeight / originVideoHeight;
					var scale = scaleHorizontal > scaleVertical ? scaleHorizontal : scaleVertical;
					var videoWidth, videoHeight;

					if ( scale * originVideoHeight < videoMinHeight )
						scale = videoMinHeight / originVideoHeight;

					$video.width( videoWidth = scale * originVideoWidth )
						.height( videoHeight = scale * originVideoHeight );

					$videoViewport.width( $window.width() )
						.height( videoMinHeight )
						.scrollLeft( ( videoWidth - windowWidth ) / 2 )
						.scrollTop( ( videoHeight - windowHeight ) / 2 );
				}).trigger( 'resize' );

			 	window._checkVisibilityChange = true;
			}
		}
	});