'use strict';

/* Services */
angular.module('curation.services', [ 'httpWrapper' ]).
	value( 'version', '0.1' ).
	provider( 'v', function(){
		this.$get = function(){
			return {version: '0.1'};
		}
	});