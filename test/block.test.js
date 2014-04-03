'use strict';

describe('block.directive', function(){
 
	var $scope;
	var template;
	var html = "<div class='qBlock'></div>";
	var elem;
	var _$compile;

	beforeEach( module('block.directive') );

	beforeEach(inject(function($rootScope, $compile, $timeout) {
		elem = angular.element( html );
		_$compile = $compile;

	    $scope = $rootScope.$new();
	    $scope.blockFlag = '32768';
		$scope.blockCode = '1';

		template = $compile( elem )( $scope );
		$scope.$digest();
	}));
	

	it("barClose가 생성되었다.", function(){
		expect(elem[ 0 ].innerHTML).toContain( 'barClose' );
	});

	it("이용이 제한된 계정입니다", function(){
		expect(elem[ 0 ].innerHTML).toContain( '이용이 제한된 계정입니다' );
	});		
});