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
				//마크업을 append
				element.append( scope.ngModel.contentsHtml );

				var idx = element.find( '.boxType' ).parent().parent().index() + 1;

				//카드의 margin-right 19
				if( !( idx >=3 && idx % 3 === 0 ) ){
					element.find( '.boxType' ).css({ 'margin-right': 19 });	
				};

				//시간 바 width 조정
				if( scope.ngModel.dayBarWidth ){
					element.parent().css( 'width', scope.ngModel.dayBarWidth );
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
