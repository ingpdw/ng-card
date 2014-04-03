'use strict';

/*navi scroll action*/

(function( $ ){
	var $window = $( window ), $body = $( 'body' ), 
		$gnb = $( '#gnbContainerG' ), $navi = $( '.wrapHeader' );

	var gnbH = 33,
		scrollTop = $window.scrollTop(),
		isFixed = scrollTop >= gnbH;

	$window.on( 'scroll', function( e ){

		if( isLoginFlag && isLoginFlag == 'N') return;

		var scrollTop = $window.scrollTop();
		var isFixed = scrollTop >= gnbH;
		var bodyHeight = $body.height();

		if ( isFixed ) {
			$body.addClass( 'h44' );
			$navi.css( 'top', gnbH );
		} else {
			$body.removeClass( 'h44' );
			$navi.css( 'top', gnbH - scrollTop );
		}
	});
})( jQuery );

/* search box - http://static.plaync.co.kr/common/js/suggest.js*/

(function( $ ){

})( jQuery );

/*login - http://static.plaync.co.kr/common/js/login.min.js*/

(function( $ ){

})( jQuery );