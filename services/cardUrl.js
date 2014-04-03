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
			'cardUrl' : '/api/bs/me/curationContents',
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
			sb = ( guid )? sb.replace( '{guid}', guid ):
					sb.replace( '{guid}', '' );
			return sb;
		};

		factory.getCharacterUrl = function( name ){
			var charUrl = url.characterUrl;
			charUrl = charUrl.replace( '{charName}', name );
			return charUrl;	
		};

		return factory;
	});
	
 
  