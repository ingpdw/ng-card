'use strict';

/* Services */
angular.module('curation.dimmed', []).
	service( '$dimmed', function(){
		var hideFn = function(){};

		var hideDimmed = function(){
			$( 'html' ).removeClass( 'backdrop-active' );
			$( '#backdrop' ).off( 'click', hideDimmed );
			hideFn();
		};

		this.show = function( callback ) {
			hideFn = callback || function(){};
			$( 'html' ).addClass( 'backdrop-active' );
			$( '#backdrop' ).css({
				height : $( 'body' ).height()
			});
			$( '#backdrop' ).on( 'click', hideDimmed );
    	};

    	this.hide = function(){
			hideDimmed();
			hideFn();
    	};

    	this.isShow = function(){
    		return $( 'html' ).hasClass( 'backdrop-active' );
    	};
	});