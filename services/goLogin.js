'use strict';

angular.module('curation.goLogin', []).
	factory( '$login', function(){
		var factory = {};

		factory.goLogin = function(){
			location.href= 'http://login.plaync.com/login/loginform?return_url=' + encodeURIComponent( location.href );
		};

		return factory;
	});
	
 
  