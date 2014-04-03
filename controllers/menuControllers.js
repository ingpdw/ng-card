'use strict';

/* menuControllers */

//TODO
angular.module('curation.menuControllers', []).
  controller('menuCtrl', function( $scope ) {
  		$scope.menu = [
  			{name:'샌드박스', sub: [
  				{name: '뉴스피드', url: ''},
  				{name: '문파', url: ''},
  				{name: '친구찾기', url: ''},
  				{name: '친구', url: ''}
  			]}, 
  			{name:'소식', sub: [
  				{name: '공지', url: ''},
  				{name: '업데이트', url: ''}
  			]}, 
  			{name:'가이드', sub: [
  				{name: '파워북', url: ''},
  				{name: '백청산맥', url: ''}
  			]},
  			{name:'블소월드', sub: [
  				{name: '캐릭터', url: ''},
  				{name: '시장', url: ''},
  				{name: '문파', url: ''},
  				{name: '랭킹', url: ''}
  			]},
  			{name:'커뮤니티', sub: [
  				{name: '직업게시판', url: ''},
  				{name: '서버게시판', url: ''},
  				{name: '이미지게시판', url: ''},
  				{name: '블소TV', url: ''},
  				{name: '갤러리', url: ''}
  			]},
  			{name:'다운로드', sub: [
  				{name: '클라이언트', url: ''}
  			]},
  			{name:'블소N샵'}];
  }).directive( 'menu', function(){
  	return function(){}
  });