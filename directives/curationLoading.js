'use strict';

angular.module('curation.directives.loading', []).
	directive('qLoading', function( $window ) {
		return {
			restrict: 'AC',
			template: '<p class="moreArticle"><img src="http://static.plaync.co.kr/sandbox/common/loading.gif" alt="로딩중"></p>'
		}
	});