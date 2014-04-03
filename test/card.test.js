'use strict';

describe('cardCtrl', function(){
 	var $scope;
	var _$query;
	var _$qurl;
	var _$login;
	var createController;
	var $controller;

	beforeEach( module('curation.cardControllers') );
	beforeEach( module('curation.cardUrl') );
	beforeEach( module('curation.goLogin') );
	beforeEach( module('httpWrapper') );
	beforeEach(inject(function($rootScope, $controller, $injector, $query, $login, $qurl, $timeout ) {
	    $scope = $rootScope.$new();

	  	$controller = $injector.get('$controller');

	  	_$query = $query;
	  	_$qurl = $qurl;
	  	_$login = $login;

	  	createController = function() { // Method to create controller 
              return $controller('cardCtrl', 
              	{'$scope' : $scope }, 
              	{'$query' : _$query}, 
              	{'$qUrl' : _$qurl}, 
              	{'$login' : _$login},
              	{'$timeout': $timeout});
          };
  	}));

  it('버전은 0.9이다.', function(){
  	createController();
  	expect( $scope.version ).toEqual( '0.9' );
  });

  it('카드 length는 0이다.', function(){
	createController();
  	expect( $scope.cards.length ).toBe( 0 );
  });
});