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