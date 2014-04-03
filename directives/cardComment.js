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
