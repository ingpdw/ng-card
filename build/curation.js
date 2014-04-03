'use strict';

/* commonControllers */
angular.module('curation.commonControllers', [ 'curation.pageCheck' ]).
  controller( 'commons', ['$scope', '$pageCheck', function( $scope, page ){

    $scope.disbleDimmed = true;
    $scope.isFirstAccess = page.isFirstAccess();
    $scope.isFirstLogin = page.isFirstLogin();

    $scope.isLoginFlag = isLoginFlag; //로그인 여부 window.isLoginFlag = 'Y'
     
    // if( window.ncGnbP ){ //window.ncGnbP
    //   $scope.nickname = ncGnbP.nickname;
    //   $scope.guid = ncGnbP.uid;
    // }

    if( $scope.isFirstAccess ){
      //블소 now
    }else{
      //입문자의 모험
      page.setFirstAccess();
    }

    if( $scope.isLoginFlag === 'Y' ){
       if( $scope.isFirstLogin ){
        //블소 매거진 알아보기
        //TODO dimmed
        //TODO highlight
        //TODO Next Information
        page.setFirstLogin();
      }else{

      }
    }else{
      $scope.stopVideo = false;
      $scope.$watch( 'stopVideo', function(){
          
      });
    }
  }]).
  controller('common.controller', [ '$scope', 'v',  function( $scope, version ) {
  	//console.log( version );
  }]).
  controller( 'common.toast', function( $scope ){

  }).
  controller( 'common.layout', function( $scope ){
    
  });
'use strict';

/* commonControllers */
angular.module('curation.cardControllers', []).
	controller( 'cardCtrl', [ '$scope', '$element', '$window', '$query', '$qurl', '$login', '$rootScope', '$timeout',  
	function( $scope, $element, $window ,$query, $qUrl, $login, $rootScope, $timeout ){
		
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


			/*
			$.ajax({
				type: 'post',
				url: $qUrl.getCardUrl(),
				dataType: 'jsonp',
				data: {
	        		index: $scope.previousIndex
	        	},
				success: function( data ){
					if( data.result == 'fail' ){
      					alert( data.message );
      					//$login.goLogin();
      				}else{
      					if( data.previousIndex ) 
      						$scope.previousIndex = data.previousIndex;

      					if( data.commentArticles )
      						$scope.commentArticles = data.commentArticles;

      					if( data.curations.length == 0 ){ //curation data가 없을 때
      						//alert( '컨텐츠가 없습니다.');
      					}else{

							$.ajax({
								type: 'post',
								url: $qUrl.getCounts(),
								dataType: 'jsonp',
								data: {
					        		commentArticles: $scope.commentArticles
					        	},
								success: function( counts ){
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
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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

										testData.contentsHtml += data.curations[ i ].boardName;

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

										buff.push( testData );
									};	

									$timeout(function(){
										$scope.cards = $scope.cards.concat( buff );	
									});
								},
								error: function( counts ){

								}
							});
      					}
      				}
      				
      				isCardLoading = false;					
				},
				error: function( data ){

				}
			});*/


	        $query.getJsonp( $qUrl.getCardUrl(), {
	        	index: $scope.previousIndex
	        }, function callback( data ){

      				if( data.result == 'fail' ){
      					alert( data.message );
      					//$login.goLogin();
      				}else{

      					if( data.msg === 'error' ){
	        				data.curations = [
	        					{
	        						contentsHtml: '<div class="boxType">'+
												'<header class="badgeType1">'+
													'<span class="badge"></span>'+
													'<h1><a href="#"></a></h1>'+
												'</header>'+
												'<div class="boxContents">'+
													'<div class="boxDesc">'+
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
	        						location:'1',cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',cardType: 'admin',
									collectionId: 2005,boardName: 'admin',categoryName: 'banner1',articleId: 333333,
									contentsUrl: '',commentId: 222222,commentCnt: 1, likeCnt: 2,comments: []
	        					},
	        					{
	        						contentsHtml: '<div class="boxType">'+
												'<header class="badgeType1">'+
													'<span class="badge"></span>'+
													'<h1><a href="#"></a></h1>'+
												'</header>'+
												'<div class="boxContents">'+
													'<div class="boxDesc">'+
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
	        						location:'1',cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',cardType: 'admin',
									collectionId: 2005,boardName: 'admin',categoryName: 'banner1',articleId: 333333,
									contentsUrl: '',commentId: 222222,commentCnt: 1, likeCnt: 2,comments: []
	        					},
	        					{
	        						contentsHtml: '<div class="boxType">'+
												'<header class="badgeType1">'+
													'<span class="badge"></span>'+
													'<h1><a href="#"></a></h1>'+
												'</header>'+
												'<div class="boxContents">'+
													'<div class="boxDesc">'+
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
	        						location:'1',cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',cardType: 'admin',
									collectionId: 2005,boardName: 'admin',categoryName: 'banner1',articleId: 333333,
									contentsUrl: '',commentId: 222222,commentCnt: 1, likeCnt: 2,comments: []
	        					},{
	        						contentsHtml: '<div class="boxType">'+
												'<header class="badgeType1">'+
													'<span class="badge"></span>'+
													'<h1><a href="#"></a></h1>'+
												'</header>'+
												'<div class="boxContents">'+
													'<div class="boxDesc">'+
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
	        						location:'1',cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',cardType: 'admin',
									collectionId: 2005,boardName: 'admin',categoryName: 'banner1',articleId: 333333,
									contentsUrl: '',commentId: 222222,commentCnt: 1, likeCnt: 2,comments: []
	        					},{
	        						contentsHtml: '<div class="boxType">'+
												'<header class="badgeType1">'+
													'<span class="badge"></span>'+
													'<h1><a href="#"></a></h1>'+
												'</header>'+
												'<div class="boxContents">'+
													'<div class="boxDesc">'+
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
	        						location:'1',cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',cardType: 'admin',
									collectionId: 2005,boardName: 'admin',categoryName: 'banner1',articleId: 333333,
									contentsUrl: '',commentId: 222222,commentCnt: 1, likeCnt: 2,comments: []
	        					},{
	        						contentsHtml: '<div class="boxType">'+
												'<header class="badgeType1">'+
													'<span class="badge"></span>'+
													'<h1><a href="#"></a></h1>'+
												'</header>'+
												'<div class="boxContents">'+
													'<div class="boxDesc">'+
														'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
														'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
	        						location:'1',cardId:'2dc7a9cd-e8de-3a81-80c8-2a1e622c14ce',cardType: 'admin',
									collectionId: 2005,boardName: 'admin',categoryName: 'banner1',articleId: 333333,
									contentsUrl: '',commentId: 222222,commentCnt: 1, likeCnt: 2,comments: []
	        					}
	        				];
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
													'<a href="#">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! <br><br>'+
													'소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.립니다! 소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요.</a>'+
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
'use strict';

angular.module('curation.characterBoxControllers', [ 'curation.goLogin' ]).
  controller('characterBoxCtrl', [ '$scope', '$query', '$qurl', '$login', '$timeout', 
  	function( $scope, $query, $qUrl, $login, $timeout ) {
  		$scope.characters = [{
			"job":"FORCEMASTER",
		    "jobName":"기공사",
		    "characterName":"으헹헹",
		    "serverName":"QA02",
		    "level":40,
		    "masteryLevel":0,
		    "masteryFactionCode":"FACTION_NONE",
		    "masteryFaction":"",
		    "isPlaying":false,
		    "lastPlayEndTime":"2014.02.20 16:24:13",
		    "zoneId":3000,
		    "checked":false,
		    'cssName': 'tab_forcemaster' 				
		}];

		$scope.getData = function( charNm ){
			$query.getJsonp( $qUrl.getCharacterList(), {
				cn:  charNm || ''
			}, function( data ){

				//스크롤을 상위로 이동
				$timeout(function(){
					$( window ).scrollTop( 0 );
				});
				
				//TODO
				if( data.msg === 'error' ){ //실패시 처리
					data.characters = [
						{
						"job":"FORCEMASTER",
					    "jobName":"기공사",
					    "characterName":"으헹헹",
					    "serverName":"QA02",
					    "level":40,
					    "masteryLevel":0,
					    "masteryFactionCode":"FACTION_NONE",
					    "masteryFaction":"",
					    "isPlaying":false,
					    "lastPlayEndTime":"2014.02.20 16:24:13",
					    "zoneId":3000,
					    "checked":false,
					    'cssName': 'tab_forcemaster' 				
						}
					];
				};

				if( data.result === 'fail' ){
					//alert( d.message );
					$login.goLogin();
					//return;
				};
				
				if( !data.characters ) return;

				for( var i = 0, len = data.characters.length; i < len; i++ ){
	  				var ch = data.characters[ i ];
	  					ch.cssName = 'tab_' + ch.job.toLowerCase();

  					if( ch.checked ){
  						ch.selectedCss = 'on';
  					}
	   			};

	   			$timeout(function(){
	   				$scope.characters = data.characters;
	   				$scope.$emit( 'change.character' );
	   			});

			});			
		};

		/*
		$scope.getData = function( charNm ){
			$.ajax({ 
				type: 'post',
				url: $qUrl.getCharacterList(),
				data:  {cn: charNm || ''},
				dataType: 'jsonp',
				success: function( data ){
					if( data.result === 'fail' ){
						//alert( d.message );
						$login.goLogin();
						//return;
					};

					if( !data.characters ) return;

					for( var i = 0, len = data.characters.length; i < len; i++ ){
		  				var ch = data.characters[ i ];
		  					ch.cssName = 'tab_' + ch.job.toLowerCase();

	  					if( ch.checked ){
	  						ch.selectedCss = 'on';
	  					}
		   			};

	   				$scope.characters = data.characters;
	   				$scope.$apply();
	   				$scope.$emit( 'change.character' );
				},
				error: function( data ){

				}
			});

		}*/		
  }]);
'use strict';

/* Directives */

angular.module('curation.directives', [
	'curation.directives.video', 
	'curation.directives.resize',
	'curation.directives.characterBox',
	'curation.directives.loading',
	'curation.directives.curationscrolling',
	'curation.directives.card',
	'curation.directives.trailer',
	'curation.directives.cardComment'
]).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
	  elm.text(version);
	};
}]);
(function () {
  'use strict';

  //Support for Windows Internet Explorer7+8
  if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
  };

  if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = [], key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {keys.push(key);}
        }
        return keys;
    };
  };

  if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun /*, thisArg */){
      
      if (this === void 0 || this === null)
        throw new TypeError();

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function")
        throw new TypeError();

      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++)
      {
        if (i in t)
          fun.call(thisArg, t[i], i, t);
      }
    };
  }

  angular.module('curation.masonry', [])
    .controller('MasonryCtrl', function( $scope, $element, $timeout) {
      var items = {};
      var schedule = [];
      var destroyed = false;
      var self = this;
      var timeout = null;

      this.preserveOrder = false;

      this.scheduleMasonryOnce = function() {
        var args = arguments;
        var found = schedule.filter(function(item) {
          return item[0] === args[0];
        }).length > 0;

        if (!found) {
          this.scheduleMasonry.apply(null, arguments);
        }
      };

      this.scheduleMasonry = function() {
        if (timeout) {
          $timeout.cancel(timeout);
        }

        schedule.push([].slice.call(arguments));

        timeout = $timeout(function() {
          if (destroyed) {
            return;
          }
          schedule.forEach(function(args) {
            $element.masonry && $element.masonry.apply($element, args);
          });
          schedule = [];
        }, 30);
      };

      function defaultLoaded($element) {
        $element.addClass('loaded');
      }

      this.appendItem = function(element, id) {
        if (destroyed) return;

        function _append() {
          if (Object.keys(items).length === 0) {
            $element.masonry && $element.masonry('resize');
          }
          if (items[id] === undefined) {
            items[id] = true;
            defaultLoaded(element);
            $element.masonry && $element.masonry('appended', element, true);
          }
        }

        function _layout() {
          self.scheduleMasonryOnce('layout');
        }

        if (self.preserveOrder) {
          _append();
          element.imagesLoaded(_layout);
        } else {
          element.imagesLoaded(function() {
            _append();
            _layout();
          });
        }
      };

      this.removeItem = function(id, element) {
        if (destroyed) {
          return;
        }

        delete items[id];
        $element.masonry('remove', element);
        this.scheduleMasonryOnce('layout');
      };

      this.destroy = function() {
        destroyed = true;

        if ($element.data('masonry')) {
          $element.masonry('destroy');
        }
        $scope.$emit( 'masonry.destroyed' );

        items = [];
      };

      this.reload = function() {
        $element.masonry();
        $scope.$emit( 'masonry.reloaded' );
      };

      this.relayout = function(){
         self.scheduleMasonryOnce('layout');
      };

    }).directive('masonry', function( $timeout ) {
      return {
        restrict: 'AEC',
        controller: 'MasonryCtrl',
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {
            var windowWidth = $( window ).width();
            var cardWidth = 364;

            var attrOptions = scope.$eval(attrs.masonry || attrs.masonryOptions);
            var options = angular.extend({
              itemSelector: attrs.itemSelector || '.masonry-item',
              columnWidth: cardWidth || parseInt(attrs.columnWidth, 10) || attrs.columnWidth,
              transitionDuration : 0,
              gutter: 19
            }, attrOptions || {});

            element.masonry( options );

            var preserveOrder = scope.$eval(attrs.preserveOrder);
            ctrl.preserveOrder = (preserveOrder !== false && attrs.preserveOrder !== undefined);

            scope.$emit( 'masonry.created', element );
            scope.$on( '$destroy', ctrl.destroy );
            scope.$on( 'change.card', ctrl.relayout );
          }
        }
      };
    }).directive('masonryItem', function( $timeout) {
      return {
        restrict: 'AC',
        require: '^masonry',
        scope: true,
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {

            var id = scope.$id, index;
            var windowWidth = $( window ).width();
            var cardWidth = scope.card.width || 364;
            element.css({ width: cardWidth});

            $timeout( function(){
              ctrl.appendItem(element, id);
            });
              
            element.on('$destroy', function () {
              ctrl.removeItem(id, element);
            });

            scope.$on('masonry.reload', function () {
              ctrl.scheduleMasonryOnce('reloadItems');
              ctrl.scheduleMasonryOnce('layout');
            });

            scope.$watch('$index', function () {
              if (index !== undefined && index !== scope.$index) {
                ctrl.scheduleMasonryOnce('reloadItems');
                ctrl.scheduleMasonryOnce('layout');
              }
              index = scope.$index;
            });
          }
        }
      };
    });
}());











'use strict';

angular.module('curation.directives.trailer', [ 'curation.dimmed' ]).
	directive('qTrailer', [ '$window', '$dimmed', function( $window, dimmed ) {
		return {
			restrict: 'C',
			link: function( scope, element, attrs ) {
				$( '#popup' ).hide();
				element.on( 'click', function ( e ) {
					e.preventDefault();

					var $popup = $( '#popup' );
					var movieUrl = $popup.data( 'movieUrl' ) || 
						'http://www.youtube.com/embed/5QGnggCrPvw';
					var w = $popup.data( 'width' ) || 960, 
						h = $popup.data( 'height' ) || 720;

		   			var iframe = '<iframe width="'+ w + '" height="'+ h +'" src="'+ movieUrl + '" frameborder="0" allowfullscreen></iframe>',
						iframeWidth = w || 960,
						iframeHeight = h || 720,
						scrollTop = $( window ).scrollTop(),
						scrollLeft = $( window ).scrollLeft();

					$popup.css({
						marginTop : ( -iframeHeight / 2 ),
						marginLeft : ( -iframeWidth / 2 ) + scrollLeft
					}).width( iframeWidth ).height( iframeHeight ).html( iframe ).addClass( 'popup-animate' ).show();

					scope.stopVideo = true;
					scope.$apply();	
					
					dimmed.show( /*hide Callback*/function(){
						$popup.removeClass( 'popup-animate' );
						$popup.hide();

						scope.stopVideo = false;
						scope.$apply();
					});
		        });
			}
		}
	}]);

'use strict';

angular.module('curation.directives.curationscrolling', []).
	directive('qScrolling', [ '$timeout', function( $timeout ) {
	    return {
	    	 restrict: 'AC',
	    	link: function( scope, element, attr ) {
				var $win = $( window );
				
				$win.on( 'scroll', function(){
					var $winH = $win.height(),
						$winScroll = $win.scrollTop(),
						$bodyH = $( 'body' ).height() - 50;

					if( $winH + $winScroll >= $bodyH ){
						//$timeout(function(){
							scope.$emit( 'scroll.endPosition' );
						//});
					}
				});
		    }
		}
	}]);

'use strict';

angular.module('curation.directives.loading', []).
	directive('qLoading', function( $window ) {
		return {
			restrict: 'AC',
			template: '<p class="moreArticle"><img src="http://static.plaync.co.kr/sandbox/common/loading.gif" alt="로딩중"></p>'
		}
	});
'use strict';

angular.module('curation.directives.card', [ 'curation.cardUrl' ]).
	directive('curationCard', [ '$query', '$qurl', '$compile', function( $query, $qUrl, $compile ) {
		return {
			scope: {
		      ngModel: '='
		    },
			restrict: 'AC',
			replace: true,
			link: function( scope, element, attr ) {
				
				element.append( scope.ngModel.contentsHtml );
				var idx = element.parent().index() + 1;
				
				//카드의 margin-right 19
				if( !( idx >=3 && idx % 3 === 0 ) ){
					element.find( '.boxType' ).css({'margin-right': 19});	
				};

				//댓글 리스트 가져오기
				var getCommentList = function( boardName, articleId, lastCommentId, callbackFn ){
					$query.getJsonp( $qUrl.getCommentList( boardName, articleId ), {
              				cp: 5,
              				c: lastCommentId
              			}, function( d ){
              				callbackFn( d );
					});
				};

				//마지막 댓글 ID 탐색
				var getLastCommentId = function(){
					var comments = scope.ngModel.comments,
						len = scope.ngModel.comments.length;
					
					if( len > 0 ){
						return comments[ len - 1 ].commentId;
					}else{
						return '';
					}
				};

				//좋아요 수
              	if( scope.ngModel.likeCnt > 0 ){
               		var like = element.find( '.wrapBtnLike' );
              		var count = element.find( '.btnCount .count' );
              		count.text( scope.ngModel.likeCnt );
              		like.addClass( 'on' );
              	};

              	//댓글 수
              	if( scope.ngModel.commentCnt > 0 ){
              		var comment = element.find( '.wrapBtnComment' );
               		var count = element.find( '.btnComment .count' );
              		count.text( scope.ngModel.commentCnt );
              		comment.addClass( 'on' );
              	};
              	

              	//출처 클릭
               	element.find( '.originLink' ).on( 'click', function( e ){
              		e.preventDefault();
              		location.href = scope.ngModel.contentsUrl;
              	});

              	//좋아요 클릭
              	element.on( 'click', '.wrapBtnLike', function( e ){
              		e.preventDefault();
              		var boardName = scope.ngModel.boardName;
              		var articleId = scope.ngModel.articleId;
              		var site = 'BNS';
              		var extPostId = site + ':' + boardName + ':' + articleId;

					$query.getJsonp( $qUrl.getLikeUrl(),{'extPostTxtId': extPostId},  function( data ){

						if( data.msg === 'error' ){
              				return;	
              			};

						if( !data ) return;
						if( !data.result ) return;

						var code = data.result.code;

						if( 302 === code ){
							alert( '이미 좋아요 하셨습니다.');
						}else{
							if( 101 === code ){
								alert( '로그인이 필요합니다.' );
								return;
							}

							if( 1 !== code ){
								return;
							}

							scope.ngModel.likeCnt = scope.ngModel.likeCnt + 1;	

							var like = element.find( '.wrapBtnLike' );
		              		var count = element.find( '.btnCount .count' );
		              		count.text( scope.ngModel.likeCnt );
		              		like.addClass( 'on' );
						};
					});
              	});

              	//댓글 더보기
              	element.on( 'click', '.commentList', function(){
               		var boardName = scope.ngModel.boardName;
              		var articleId = scope.ngModel.articleId;
              		var lastCommentId = getLastCommentId();

              		getCommentList( boardName, articleId, lastCommentId, function( data ){

              			if( data.msg === 'error' ){
              				data.commentList = [];
              			};

						if( data.commentList && data.commentList.length > 0 ){

							if( !scope.ngModel.comments )
									scope.ngModel.comments = [];

							for( var i = 0; data.commentList[ i ]; i++){
								 scope.ngModel.comments.push( data.commentList[ i ] );
							}

							scope.$digest();
							scope.$emit( 'change.card' );
						};
              		});
              	});

              	//댓글 클릭
              	element.on( 'click', '.btnComment', function(){
					var boardName = scope.ngModel.boardName;
              		var articleId = scope.ngModel.articleId;
              		var lastCommentId = getLastCommentId();

              		getCommentList( boardName, articleId, lastCommentId, function( data ){

              			if( data.msg === 'error' ){
              				data.commentList = [];
              			};

              			var panel = element.find( '.curationCardCommentWrap' );
						if( panel.length > 0 ){
							
							if( panel.is( ':visible' ) ){
								panel.hide();
							}else{
								panel.show();
							}

							//댓글 클릭시 5개 더 가져오기라면?
	              			//scope.ngModel.comments.concat( data.commentList );
	              		}else{
	              			
	              			if( !scope.ngModel.comments )
									scope.ngModel.comments = [];

							for( var i = 0; data.commentList[ i ]; i++){
								 scope.ngModel.comments.push( data.commentList[ i ] );
							}

	              			var tmp = '<div class="curationCardCommentWrap" ng-model="ngModel"></div>';
		              		tmp = angular.element( tmp );

							element.find( '.boxType' ).append( $compile( tmp )( scope ) );
	              		}
						scope.$digest();				
	              		scope.$emit( 'change.card' );
              		});
              	});
			}
		}
	}]);

'use strict';

angular.module('curation.directives.video', []).
	directive('qVideo', function() {
		return {
			restrict: 'C',

			link: function( scope, element, attrs ) {

				var template = '', 
					$window = angular.element( window ), 
					$videoViewport = angular.element( '#video-viewport' ), 
					$video,
					siteUrl = 'http://plat-lego.korea.ncsoft.corp/!/uidevelopmentteam/bns-tft';
				
				var poster = attrs.poster || 
					siteUrl + '/src/images/@temp_poster.png';
				var movie = attrs.movieUrl || 
					siteUrl + '/src/images/background_720.webm';
				var movieMp4 = attrs.movieUrlMp ||
					siteUrl + '/src/images/background_1130.mp4';

				var movieW = attrs.movieWidth, movieH = attrs.movieHeight;

				var isCanPlayType = !!document.createElement( 'video' ).canPlayType;
	
				if( isCanPlayType ){
			 		template =  '<video id="video" autoplay loop preload poster="'+ poster +'">'+
						 		'<source src="'+ movie +'" />'+
						 		'<source src="'+ movieMp4 +'" />'+
						 		'</video>';
			 	}else{
			 		//video 미지원
			 	 	template = '<div id="video" style="background:url(' + poster + ') no-repeat center 78px"></div>';
			 	}	

			 	//template으로 element 교체
			 	element.replaceWith( template );

			 	//get video tag
				$video = angular.element( '#video' );	

				//visiblilityChange
			 	angular.element( document ).on( 'webkitvisibilitychange', function(){
					if ( !window._checkVisibilityChange ) {
						return;
					}

					if ( document[ 'webkitHidden' ] ) {
						$video[ 0 ].pause();
						scope.stopVideo = true;
					} else {
						$video[ 0 ].play();
						scope.stopVideo = false;
					}			 		
			 	});

			 	//trailer show/hide
			 	scope.$watch( 'stopVideo', function(){
			 		if( !isCanPlayType ) return;

			 		if ( scope.stopVideo ) {
						$video[ 0 ].pause();
					} else {
						$video[ 0 ].play();
					}
			 	});

			 	//window resize
				$window.on( 'resize', function() {
					
					var videoMinHeight = 1030, originVideoWidth = movieW, originVideoHeight = movieH;
					var windowWidth = $window.width(), windowHeight = $window.height();
					var scaleHorizontal = windowWidth / originVideoWidth;
					var scaleVertical = windowHeight / originVideoHeight;
					var scale = scaleHorizontal > scaleVertical ? scaleHorizontal : scaleVertical;
					var videoWidth, videoHeight;

					if ( scale * originVideoHeight < videoMinHeight )
						scale = videoMinHeight / originVideoHeight;

					$video.width( videoWidth = scale * originVideoWidth )
						.height( videoHeight = scale * originVideoHeight );

					$videoViewport.width( $window.width() )
						.height( videoMinHeight )
						.scrollLeft( ( videoWidth - windowWidth ) / 2 )
						.scrollTop( ( videoHeight - windowHeight ) / 2 );
				}).trigger( 'resize' );

			 	window._checkVisibilityChange = true;
			}
		}
	});
'use strict';

angular.module('curation.directives.resize', []).
	directive('qResize', function( $window ) {
		return {
			restrict: 'C',
			link: function( scope, element ) {
				var w = angular.element( $window );

				scope.size = function(){
					return {w: w.width()};
				};

				scope.$watch( scope.size, function( newValue, oldValue ){
					var $body = angular.element( 'body' );

					$body.attr({ 'size': newValue.w });
				}, true);

				 w.on( 'resize', function () {
		            scope.$apply();
		        });
			}
		}
	});


'use strict';

angular.module('curation.directives.characterBox', []).
	directive('qCharacterBox', function() {
		return {
			restrict: 'C',
			replace: true,
			template: '<li class="{{character.cssName}} {{character.selectedCss}}" data-nick="{{character.characterName}}">'+
							'<span class="className">{{character.jobName}}</span>'+
							'<dl class="characterBox">'+
							'<dt class="nickname"><strong>{{character.characterName}}</strong>님</dt>'+
							'<dd class="bnsInfo">'+
								'<span class="info">'+
									'{{character.serverName}}'+
									'<span class="bar">|</span>'+
									'Lv.{{character.level}}  <span class="ic_bull">&bull;</span> '+
									'<span class="masteryLv">{{character.masteryFaction}} {{character.masteryLevel}}성</span>'+
								'</span>'+
							'</dd>'+
							'</dl>'+
						'</li>',
			link: function( scope, element, attr, controller ) {

				element.on( 'click', function(){
					var charNm = element.attr( 'data-nick' ) || '';
					scope.getData( charNm );
				});

			}
		}
	});

'use strict';

angular.module('curation.directives.cardComment', []).
	directive('curationCardCommentWrap', [ '$query', '$qurl', '$compile', function( $query, $qUrl, $compile) {
		return {
			restrict: 'AC',
			scope: {
		      ngModel: '='
		    },
			replace: true,
			link: function( scope, element, attrs ) {
				var tmp = '<div class="boxComment">'+
					'<p class="commentList"><span>댓글 더보기</span></p>'+
					'<section class="commentBody">'+
					'<div class="curationCardComment" ng-repeat="comment in ngModel.comments"></div>'+
					'</section>'+
					'<fieldset class="commentInput">'+
						'<legend>댓글 쓰기</legend>'+
						'<div class="comment"><input type="text" placeholder="댓글을 입력해 주세요"></div>'+
					'</fieldset>'+
				'</div>';
				element.append( $compile( angular.element( tmp ) )( scope ) );

				//글 작성 완료
				element.find( '.comment input' ).on( 'keydown', function( e ){
					if( e.keyCode === 13 ){ //enter key
						
						var targetUrl = '', contents = $( this ).val();

						$query.getJsonp( $qUrl.getCommentWrite( scope.ngModel.boardName, scope.ngModel.articleId ), '', function( data ){
							if( data.msg === 'error' ){
								return;
							}

							if( data.result === 'success' ){
									
								scope.$apply(function(){
									scope.ngModel.comments.push( data.comment );
								});
							}

							if( data.result === 'fail' ){
								alert( data.message );
								return;
							}
						});
					}
				});
			}
		}		
	}]).		

	directive('curationCardComment', [ '$query', '$qurl', '$compile', '$rootScope', '$timeout',
	 function( $query, $qUrl, $compile, $rootScope, $timeout ) {
		return {
			restrict: 'AC',
			replace: false,
			link: function( scope, element, attr ) {
				var charTmp = '<a class="game"></a>';
				var guid = scope.comment.writer.sandboxId,
					charName = scope.comment.writer.characterName,
					thumbnail = $qUrl.getThumbnail( guid ),
					linkUrl = $qUrl.getSandboxUrl( guid ),
					charUrl = $qUrl.getCharacterUrl( charName );

				var articleId = scope.ngModel.articleId,
					commentId = scope.comment.commentId,
					boardName = scope.ngModel.boardName;

				var depth = ( scope.comment.depth ==  '1' )? 'replyArticle': 'commentArticle';

				if( charName ){
					charTmp = '[' + charName + ']';
				}

				//TODO article로 변경
				var tmp = '<div class="'+ depth +'">'+ 
					'<a class="thumb" href="' + linkUrl + '">'+
						'<img alt="" src="' + thumbnail + '"></a>'+
					'<span class="writer">'+
					'<a class="nick" href="' + linkUrl + '">{{comment.writer.writerName}}</a> '+ 
					'<a class="game">' + charTmp + '</a>'+
					'</span>' +
					'<div class="content">{{comment.contents}}'+
					'<span class="delete"><span class="bar">|</span> <a class="deleteBtn" href="#">삭제</a></span>'+
					'</div>'+ 
					'<span class="feedtime"><time>{{comment.postDate}}</time></span>'+ 
					'</div>';


				element.append( $compile( tmp )( scope ) );

				element.find( '.deleteBtn' ).on( 'click', function( e ){
					e.preventDefault();
					if( confirm( '댓글을 삭제하시겠습니까?' ) ){
						 $query.getJsonp( $qUrl.getCommentDelete( boardName, articleId, commentId ), {}, function( data ){
						 	if( !data ) return;

						 	if( data.result === 'fail' ){
						 		alert( data.message );
						 	}

						 	if( data.result === 'success' ){
						 		var comments = scope.ngModel.comments;

						 		for( var i = 0; comments[ i ]; i++){
						 			if( comments[ i ].commentId == commentId ){
						 				$timeout(function(){
						 					comments = comments.splice( i, 1 );	
						 				});
						 				
						 				break;
						 			}
						 		}
						 	}
						 });

					}else{
						return;
					}
					
				});

			}
		}
	}]);

'use strict';

/* Filters */

angular.module('curation.filters', ['filter.time']).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
'use strict';

angular.module('filter.time', []).
    filter('timeago', function() {
        return function(input, p_allowFuture) {
            var substitute = function (stringOrFunction, number, strings) {
                    var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                    var value = (strings.numbers && strings.numbers[number]) || number;
                    return string.replace(/%d/i, value);
                },
                nowTime = (new Date()).getTime(),
                date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || false,
                strings= {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
            
                // var strings = this.settings.strings;
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;
                
            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);

            return $.trim([prefix, words, suffix].join(separator));
            // conditional based on optional argument
            // if (somethingElse) {
            //     out = out.toUpperCase();
            // }
            // return out;
        }
    });

'use strict';

/* Services */
angular.module('curation.services', [ 'httpWrapper' ]).
	value( 'version', '0.1' ).
	provider( 'v', function(){
		this.$get = function(){
			return {version: '0.1'};
		}
	});
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
	
 
  
'use strict';

/* Services */
angular.module('curation.dimmed', []).
	service( '$dimmed', function(){
		var hideFn = function(){};

		var hideDimmed = function(){
			$( 'html' ).removeClass( 'backdrop-active' );
			$( '#backdrop' ).off( 'click', hideDimmed );
			hideFn();
		};

		this.show = function( callback ) {
			hideFn = callback || function(){};
			$( 'html' ).addClass( 'backdrop-active' );
			$( '#backdrop' ).css({
				height : $( 'body' ).height()
			});
			$( '#backdrop' ).on( 'click', hideDimmed );
    	};

    	this.hide = function(){
			hideDimmed();
			hideFn();
    	};

    	this.isShow = function(){
    		return $( 'html' ).hasClass( 'backdrop-active' );
    	};
	});
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
  
'use strict';

angular.module('curation.cardUrl', []).
	factory( '$qurl', function(){
		var factory = {};

		var url = {
			'commentList': '/api/board/{boardName}/article/{articleId}/comment', //jsonp
			'commontDelete': '/api/board/{boardName}/article/{articleId}/comment/{commentId}/delete', //post
			'commentWrite': '/api/board/{boardName}/article/{articleId}/comment/post',
			'characterList': '/api/bs/me/changeCharacter', //jsonp 
			'sandboxUrl': 'http://sandbox.plaync.com/{guid}',
			'thumbnailUrl': 'http://dn.sfile.plaync.com/data/{guid}/profile?type=small',
			'characterUrl': 'http://bns.plaync.com/bs/character/profile/{charName}',
			'cardUrl' : ' /api/bs/me/curationContents',
			'likeUrl' : 'http://api.sandbox.plaync.com/timeline/like/like.jsonp',
			'countsUrl': '/api/board/contentsDetails'
		};

		factory.getCardUrl = function(){
			return url.cardUrl;
		};

		factory.getCounts = function(){
			return url.countsUrl;
		};

		factory.getLikeUrl = function(){
			return url.likeUrl;
		}

		factory.getCommentList = function( boardName, articleId ){
			var list = url.commentList;
			list = list.replace( '{boardName}', boardName );
			list = list.replace( '{articleId}', articleId );

			return list;
		};

		factory.getCommentDelete = function( boardName, articleId, commentId ){
			var list = url.commontDelete;
			list = list.replace( '{boardName}', boardName );
			list = list.replace( '{commentId}', commentId );
			list = list.replace( '{articleId}', articleId );

			return list;
		};

		factory.getCommentWrite = function( boardName, articleId ){
			var list = url.commentWrite;
			list = list.replace( '{boardName}', boardName );
			list = list.replace( '{articleId}', articleId );

			return list;
		};

		factory.getCharacterList = function(){
			return url.characterList;
		};

		factory.getThumbnail = function( guid ){
			var thumb = url.thumbnailUrl;
			thumb = thumb.replace( '{guid}', guid );
			return thumb;
		};

		factory.getSandboxUrl = function( guid ){
			var sb = url.sandboxUrl;
			sb = sb.replace( '{guid}', guid );
			return sb;
		};

		factory.getCharacterUrl = function( name ){
			var charUrl = url.characterUrl;
			charUrl = charUrl.replace( '{charName}', name );
			return charUrl;	
		};

		return factory;
	});
	
 
  
'use strict';

angular.module('curation.goLogin', []).
	factory( '$login', function( $cookieStore ){
		var factory = {};

		factory.goLogin = function(){
			location.href= 'http://login.plaync.com/login/loginform?return_url=' + encodeURIComponent( location.href );
		};

		return factory;
	});
	
 
  
'use strict';

/* Services */
angular.module('exception', []).
	factory( '$exceptionHandler', function(){
		return function( exception, cause ){
			//console.log( exception.message );
		}
	});
var curationArr = [];

if( !!navigator.userAgent.toLowerCase().match( /msie 7/ ) ){
	curationArr = [
		'curation.commonControllers',
		'curation.cardControllers',
		'curation.characterBoxControllers',
		'curation.filters',
		'curation.services',
		'curation.directives',
		'exception'
	];
}else{
	curationArr = [
		'curation.masonry',
		'curation.commonControllers',
		'curation.cardControllers',
		'curation.characterBoxControllers',
		'curation.filters',
		'curation.services',
		'curation.directives',
		'exception'
	]
};
$( document ).ready( function(){
	angular.bootstrap( document.getElementsByTagName( 'body' ), curationArr );	
});
	

