'use strict';

angular.module('block.controller', []).
  controller('blockCtrl', [ '$scope', '$timeout', 
  	function( $scope, $timeout ) {
  		$scope.blockCode = '';
  		$scope.blockFlag = '';

  		$scope.initBlock = function( code, flag ){
  			$timeout( function(){
		  		//제재코드
		  		$scope.blockCode = code;	

		  		//제재
		  		$scope.blockFlag = flag;
  			});
  		};
}]);