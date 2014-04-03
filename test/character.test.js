'use strict';

describe('cardCtrl', function(){
 	var $scope;
	var _$query;
	var _$qurl;
	var _$login;
	var createController;
	var $controller;

	beforeEach( module('curation.characterBoxControllers') );
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
              return $controller('characterBoxCtrl', 
              	{'$scope' : $scope }, 
              	{'$query' : _$query}, 
              	{'$qUrl' : _$qurl}, 
              	{'$login' : _$login},
              	{'$timeout': $timeout});
          };
  	}));

  it('캐릭터의 데이터가 있다.', function(){
  	createController();
  	expect( $scope.characters.length ).toEqual( 1 );
  });

  it('캐릭터 api가 정상이다.', function(){
  	createController();
  	expect( _$qurl.getCharacterList() ).toBe( '/api/bs/me/changeCharacter' );
  });
});