'use strict';

angular.module('curation.pageCheck', ['ngCookies']).
	factory( '$pageCheck', function( $cookieStore ){
		var factory = {};

		factory.isFirstAccess = function(){
			var access = $cookieStore.get( 'lastAccessTime' );
			return !!access;
		};

		factory.setFirstAccess = function(){
			$cookieStore.put( 'lastAccessTime', +new Date() );
		};

		factory.isFirstLogin = function(){
			var access = $cookieStore.get( 'lastAccessLoginTime' );
			return !!access;
		};

		factory.setFirstLogin = function(){
			$cookieStore.put( 'lastAccessLoginTime', +new Date() );
			
		};

		return factory;
	});
	
 
  