'use strict';

describe('cardComment', function(){
 
	var $scope;
	var _$query;
	var _$qurl;
	var template;
	var html = "<div class='curationCardCommentWrap' ng-model='test'></div>";
	var elem;

	beforeEach( module('curation.directives.cardComment') );
	beforeEach( module('curation.cardUrl') );
	beforeEach( module('httpWrapper') );

	beforeEach(inject(function($rootScope, $compile, $query, $qurl, $timeout) {
		elem = angular.element( html );

	    $scope = $rootScope.$new();
	    $scope.test = {};
		$scope.test.comments = [{
			contents: '안녕하세요??',
			writer: {
				sandboxId: 11111,
				characterName: 'pdw'
			}
		}];

		template = $compile( elem )( $scope );
		$scope.$digest();
	}));
	

	it("commentBody가 생성되었다.", function(){
		expect(elem[ 0 ].innerHTML).toContain( 'commentBody' );
	});

	it("썸네일이 정상적으로 노출된다.", function(){
		expect(elem[ 0 ].innerHTML).toContain( 'http://dn.sfile.plaync.com/data/11111/profile' );
	});		

	it("데이터가 정상적으로 추가된다.", function(){

		$scope.test.comments.push({
			contents: '안녕하세요2??',
			writer: {
				sandboxId: 22222,
				characterName: 'pdw2'
			}
		});
		$scope.$digest();
		expect(elem[ 0 ].innerHTML).toContain( 'http://dn.sfile.plaync.com/data/22222/profile' );
	});

	it("데이터의 length가 3이다.", function(){
		$scope.test.comments.push({
			contents: '안녕하세요2??',
			writer: {
				sandboxId: 22222,
				characterName: 'pdw2'
			}
		});

		$scope.test.comments.push({
			contents: '안녕하세요3??',
			writer: {
				sandboxId: 33333,
				characterName: 'pdw3'
			}
		});

		$scope.$digest();		
		expect( $scope.test.comments.length ).toBe( 3 );
	});	

});