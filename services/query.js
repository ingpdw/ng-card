'use strict';

angular.module('httpWrapper', []).
	factory( '$query', function( $http ){
		var factory = {};
		
		factory.get = function( url, params, method ){
			var promise = $http.get({
					url: url, 
					method: method || 'post',
					params: params
				}).then(function (response) {
		        	return response;
	      		}, function( response){
	      			return $q.reject( response );
	      		});

	      	return promise;
		};

		factory.getJsonp = function( url, params, callback ){
			$.ajax({
				url : url,
				dataType : "jsonp",
				method: 'get',
				data: params,
				success : function(d){
					callback && callback( d );
				},
				error: function( d ){
					d.msg = 'error';
					callback && callback( d );
				}
			});
		};

		return factory;
	});
  