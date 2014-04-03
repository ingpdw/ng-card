'use strict';

/* commonControllers */
angular.module('curation.cardControllers', []).
	controller( 'cardCtrl', [ '$scope', '$query', '$qurl', '$login', '$rootScope', '$timeout',  
	function( $scope, $query, $qUrl, $login, $rootScope, $timeout ){
		
		//카드 로딩 여부(로딩바)
		$scope.isCardLoading = false;

		$scope.version = '0.9';

		//이전 추천 차수 – 더보기 시 index parameter로 다시 넘겨줘야 할 값
		$scope.previousIndex = '';

		//카드 리스트
		$scope.cards = [];

		$scope.loadMore = function(){
			if( $scope.isCardLoading ) return;
			
			$scope.isCardLoading = true;

	        $query.getJsonp( $qUrl.getCardUrl(), {
	        	index: $scope.previousIndex
	        }, function callback( data ){

      				if( data.result == 'fail' ){
      					alert( data.message );
      					//$login.goLogin();
      				}else{

      					if( data.msg === 'error' ){
	        				data.curations = [];
	        			}

      					if( data.previousIndex ) 
      						$scope.previousIndex = data.previousIndex;

      					if( data.commentArticles )
      						$scope.commentArticles = data.commentArticles;

      					if( data.curations.length == 0 ){ //curation data가 없을 때
      						
      					}else{

      						$query.getJsonp( $qUrl.getCounts(), {
      							commentArticles: $scope.commentArticles
      						}, function( counts ){

  								if( counts.msg === 'error' ){
  									//console.log( 'detail Error');
  								}

								var buff = [];
								for( var i = 0; data.curations[ i ]; i++){
      								//TODO test
									var testDataTemplate = {
										contentsHtml: '<div class="boxType">'+
											'<header class="badgeType1">'+
												'<span class="badge"></span>'+
												'<h1><a href="#"></a></h1>'+
											'</header>'+
											'<div class="boxContents">'+
												'<div class="boxDesc">'+
													'<a href="#">소지품창'+
												'</div>'+
											'</div>'+
											'<div class="boxOptions">'+
												'<div class="boxOrigin">'+
													'<span class="feedtime">'+
														'<time>2014.1.22.</time>'+
													'</span>'+
													'<span class="bar">|</span>'+
													'<span class="originLink"><a href="#">공지</a></span>'+
												'</div>'+
												'<section class="boxSns">'+
													'<div class="wrapBtnComment on"><a class="btnComment"><span class="value">댓글</span><strong class="count">0</strong></a></div>'+
													'<div class="wrapBtnLike on"><a class="btnLike"><span class="value">좋아요</span></a><a class="btnCount"><span class="count">0</span></a></div>'+
													'</section>'+
											'</div>'+
										'</div>',
										location:'1', //컨텐츠 순서/위치
										cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',
										cardType: 'admin', //추천 콜렉션 ID – 운영자 컨텐츠의 경우 0
										collectionId: 2005,
										boardName: 'admin', //추천 게시물 게시판 Alias – 운영자 컨텐츠의 경우 admin
										categoryName: 'banner1',
										articleId: 333333,
										contentsUrl: '', //추천 컨텐츠 원본 url - 운영자 컨텐츠의 경우 empty string
										commentId: 222222,
										commentCnt: 1, 
										likeCnt: 2,
										comments: []

									};
	
									var testData = testDataTemplate;
									testData.contentsHtml = data.curations[ i ].contentsHtml || '<div class="boxType"></div>';
									testData.location = data.curations[ i ].location;
									testData.cardId = data.curations[ i ].cardId;
									testData.cardType = data.curations[ i ].cardType;
									testData.collectionId = data.curations[ i ].collectionId;
									var boardNm = testData.boardName = data.curations[ i ].boardName;
									testData.categoryName = data.curations[ i ].categoryName;
									var articleId = testData.articleId = data.curations[ i ].articleId;
									testData.contentsUrl = data.curations[ i ].contentsUrl;

									var countsData = counts[ boardNm + '_' + articleId ];
									var likeCnt = ( countsData )? countsData.likeCount: 0;
									var commentCnt = ( countsData )? countsData.commentCount: 0;
									testData.commentCnt = commentCnt;
									testData.likeCnt = likeCnt;
									testData.comments = [];

									//test
									if( i == 7 ){
										var testData = testDataTemplate;
										testData.contentsHtml = '<div class="wrapDayBar" column-width="1132">'+
											'<strong><em>2014</em>년 <em>4</em>월 <em>25</em>일(수) 블소매거진</strong>'+
											'<a class="goTop" href="#">맨위로</a>'+
										'</div>';
										testData.dayBarWidth = '1132';
									};

									buff.push( testData );
								};

								


								$timeout(function(){
									$scope.cards = $scope.cards.concat( buff );	
								});
      						});
						};
      				}
      				
      				$scope.isCardLoading = false;
      			}
      		);

		};

		$scope.$on( 'scroll.endPosition', function(){
			$timeout(function(){
				$scope.loadMore();
			});
		});

		$scope.$on( 'change.character', function(){

			$timeout(function(){
				$scope.previousIndex = '';
				$scope.cards = [];
				$scope.loadMore();
			});
		});

		$scope.$on( 'change.card.complated', function(){
			
		});
	}]);