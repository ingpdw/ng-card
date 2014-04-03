'use strict';

/* Services */
angular.module('exception', []).
	factory( '$exceptionHandler', function(){
		return function( exception, cause ){
			//console.log( exception.message );
		}
	});