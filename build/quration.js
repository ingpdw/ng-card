'use strict';

/* commonControllers */
angular.module('curation.commonControllers', [ 'curation.pageCheck' ]).
  controller( 'commons', ['$scope', 'pageCheck', function( $scope, page ){

    $scope.disbleDimmed = true;
    $scope.isFirstAccess = page.isFirstAccess();
    $scope.isFirstLogin = page.isFirstLogin();

    $scope.isLoginFlag = isLoginFlag; //로그인 여부 window.isLoginFlag = 'Y'
     
    if( ncGnbP ){ //window.ncGnbP
      $scope.nickname = ncGnbP.nickname;
      $scope.guid = ncGnbP.uid;
    }

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
	controller( 'cardCtrl', function( $scope, $element, $window ){
		$scope.isLoading = false;
		$scope.options = {};

		//좋아요 수
		$scope.likeCnt = [];

		$scope.version = '0.9';

		//카드 리스트
		$scope.cards = [
			{
				markup: '<div class="boxType w2">'+
				'<div class="newBox">NEW</div>'+
				'<header class="iconType0">'+
					'<span class="boxIcon">공지</span>'+
					'<h1>제작 조합의 비밀 \'철무방의 비밀\'</h1>'+
				'</header>'+
				'<div class="boxDesc">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다!</div>'+
				'<p class="boxImg">'+
					'<img src="src/images/data/공지1.jpg" />'+
				'</p>'+
				'<div class="boxOptions">'+
					'<div class="boxOrigin">'+
						'<time class="date">2014.1.22.</time>'+
						'<span class="originLink"><a href="#">공지</a></span>'+
					'</div>'+
					'<section class="boxSns">'+
						'<div class="wrapBtnComment on">'+
						'<a class="btnComment">'+
						'<span class="value">댓글</span>'+
						'<strong class="count"></strong></a></div>'+
						'<div class="wrapBtnLike on "><a class="btnLike"><span class="value">좋아요</span></a>'+
						'<a class="btnCount"><span class="count">0</span></a></div>'+
					'</section>'+
				'</div>'+
				'</div>',
				commentCnt: 12, 
				likeCnt: 3,
				articleId: 1234,
				comments: [
					{
					"status":"NORMAL",
					"depth":0,
					"commentId":7464594,
					"contents":"&lt;a href=&quot;#&quot; onClick=&quot;javascript:alert(&#039;&#039;)&quot;&gt;aaaaa&lt;/a&gt; eeee",
					"isAdmin":false,
					"writer":{
						"emoticonUrl":"",
						"writerName":"캬캬캬캬",
						"characterName":"에라이",
						"sandboxId":"67F54829-F073-E111-8405-18A90577F91B"
						},
					"mention":{
						"mentionedId":"",
						"mentionedName":""
						},
					"postDate":"2014.03.17 17:06"
					},{
						"status":"NORMAL",
						"depth":1,
						"commentId":7464590,
						"contents":"a222",
						"isAdmin":false,
						"writer":{
							"emoticonUrl":"",
							"writerName":"캬캬캬캬",
							"characterName":"에라이",
							"sandboxId":"67F54829-F073-E111-8405-18A90577F91B"
						},
						"mention":{
							"mentionedId":"",
							"mentionedName":""
						},
						"postDate":"2014.03.17 16:47"
					}
				]
			},{
				markup: '<div class="boxType">'+
				'<div class="newBox">NEW</div>'+
				'<header class="iconType9">'+
					'<span class="boxIcon">공지</span>'+
					'<h1>제작 조합의 비밀 \'철무방의 비밀\'</h1>'+
				'</header>'+
				'<div class="boxDesc">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다!</div>'+
				'<p class="boxImg">'+
					'<img src="src/images/data/공지1.jpg" />'+
				'</p>'+
				'<div class="boxOptions">'+
					'<div class="boxOrigin">'+
						'<time class="date">2014.1.22.</time>'+
						'<span class="originLink"><a href="#">공지</a></span>'+
					'</div>'+
					'<section class="boxSns">'+
						'<div class="wrapBtnComment on">'+
						'<a class="btnComment">'+
						'<span class="value">댓글</span><strong class="count"></strong></a></div>'+
						'<div class="wrapBtnLike on "><a class="btnLike"><span class="value">좋아요</span></a>'+
						'<a class="btnCount"><span class="count">0</span></a></div>'+
					'</section>'+
				'</div>'+
				'</div>',
				commentCnt: 10, 
				likeCnt: 5,
				articleId: 1432,
				comments: []
			},{
			markup: '<div class="boxType wrapPromo">'+
				'<header class="iconTypeNone">'+
					'<h1>프로모션</h1>'+
				'</header>'+
				'<img class="promo" src="src/images/data/banner3.jpg">'+
				'</div>'
			},{
			markup: '<div class="boxType wrapPromo">'+
				'<header class="iconTypeNone">'+
					'<h1>프로모션</h1>'+
				'</header>'+
				'<img class="promo" src="src/images/data/banner3.jpg">'+
			'</div>'
			},{
			markup: '<div class="boxType wrapPromo">'+
				'<header class="iconTypeNone">'+
					'<h1>프로모션</h1>'+
				'</header>'+
				'<img class="promo" src="src/images/data/banner3.jpg">'+
			'</div>'
			},{
			markup: '<div class="boxType wrapPromo">'+
				'<header class="iconTypeNone">'+
					'<h1>프로모션</h1>'+
				'</header>'+
				'<img class="promo" src="src/images/data/banner3.jpg">'+
			'</div>'}
		];

		$scope.loadMore = function(){
			//TODO https
			var data = {
				markup: '<div class="boxType">'+
				'<div class="newBox">NEW</div>'+
				'<header class="iconType9">'+
					'<span class="boxIcon">공지</span>'+
					'<h1>제작 조합의 비밀 \'철무방의 비밀\'</h1>'+
				'</header>'+
				'<div class="boxDesc">소지품창에 잠자고 있는 무기가 있으신가요? 철무방과 함께 대박을 노려보세요. 오직 축제 기간 동안만 얻을 수 있는 철무방의 특별한 무기가 일확천금의 꿈을 이루어 드립니다!</div>'+
				'<p class="boxImg">'+
					'<img src="src/images/data/공지1.jpg" />'+
				'</p>'+
				'<div class="boxOptions">'+
					'<div class="boxOrigin">'+
						'<time class="date">2014.1.22.</time>'+
						'<span class="originLink"><a href="#">공지</a></span>'+
					'</div>'+
					'<section class="boxSns">'+
						'<div class="wrapBtnComment on"><a class="btnComment"><span class="value">댓글</span><strong class="count">1</strong></a></div>'+
						'<div class="wrapBtnLike on"><a class="btnLike"><span class="value">좋아요</span></a><a class="btnCount"><span class="count">55</span></a></div>'+
					'</section>'+
				'</div>'+
				'</div>',
				commentCnt: 10, 
				likeCnt: 5,
				articleId: 1432,
				comments: []
			};

			$scope.cards.push( data );
		};

		$scope.$on( 'scroll.endPosition', function(){
			$scope.$apply( $scope.loadMore() );
		});

		$scope.$on( 'change.character', function(){
			$scope.$apply( $scope.loadMore() );
		})
	});
'use strict';

angular.module('curation.characterBoxControllers', []).
  controller('characterBoxCtrl', [ '$scope', 'query', function( $scope, $query ) {
  		$scope.characters = [
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
  			},/*{   
			    "job":"BLADEMASTER",
			    "jobName":"검사",
			    "characterName":"으히히히",
			    "serverName":"QA01",
			    "level":50,
			    "masteryLevel":4,
			    "masteryFactionCode":"SECONDFACTION2",
			    "masteryFaction":"마도",
			    "isPlaying":false,
			    "lastPlayEndTime":"2014.02.20 16:23:57",
			    "zoneId":4900,
			    "checked":true,
				'cssName': 'tab_blademaster' 
			},*/{   
			    "job":"SUMMONER",
			    "jobName":"소환사",
			    "characterName":"소환사캐릭터명팔구십일이",
			    "serverName":"QA01",
			    "level":50,
			    "masteryLevel":4,
			    "masteryFactionCode":"SECONDFACTION2",
			    "masteryFaction":"마도",
			    "isPlaying":false,
			    "lastPlayEndTime":"2014.02.20 16:23:57",
			    "zoneId":4900,
			    "checked":false,
				'cssName': 'tab_summoner' 
			},{   
			    "job":"KUNGFUFIGHTER",
			    "jobName":"권사",
			    "characterName":"소환사캐릭터명팔구십일이",
			    "serverName":"QA01",
			    "level":50,
			    "masteryLevel":4,
			    "masteryFactionCode":"SECONDFACTION2",
			    "masteryFaction":"마도",
			    "isPlaying":false,
			    "lastPlayEndTime":"2014.02.20 16:23:57",
			    "zoneId":4900,
			    "checked":false,
				'cssName': 'tab_kungfufighter' 
			},{   
			    "job":"SWORDMASTER",
			    "jobName":"린검사",
			    "characterName":"린검사캐릭터명팔구십일이",
			    "serverName":"파죽지세",
			    "level":50,
			    "masteryLevel":4,
			    "masteryFactionCode":"SECONDFACTION2",
			    "masteryFaction":"마도",
			    "isPlaying":false,
			    "lastPlayEndTime":"2014.02.20 16:23:57",
			    "zoneId":4900,
			    "checked":false,
				'cssName': 'tab_swordmaster' 
			},{   
			    "job":"DESTROYER",
			    "jobName":"역사",
			    "characterName":"린검사캐릭터명팔구십일이",
			    "serverName":"파죽지세",
			    "level":50,
			    "masteryLevel":4,
			    "masteryFactionCode":"SECONDFACTION2",
			    "masteryFaction":"마도",
			    "isPlaying":false,
			    "lastPlayEndTime":"2014.02.20 16:23:57",
			    "zoneId":4900,
			    "checked":false,
				'cssName': 'tab_destroyer'
			}
		];

		$scope.getData = function(){
			$query.getJsonp( '/api/bs/me/changeCharacter', function( d ){

				if( !d.characters ) return;

				$scope.characters = d.characters;

				for( var i = 0, len = $scope.characters.length; i < len; i++ ){
	  				var ch = $scope.characters;
	  					ch.cssName = 'tab_' + ch.job.toLowerCase();

	  					if( ch.checked ){
	  						ch.selectedCss = 'on';
	  					}
	   			}

	   			$scope.$emit( 'change.character' );	
	   			$scope.$apply();
			});			
		};

		$scope.getData();
		
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
'use strict';

angular.module('curation.directives.trailer', [ 'curation.dimmed' ]).
	directive('qTrailer', [ '$window', 'dimmed', function( $window, dimmed ) {
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
					scope.getData();
				});
			}
		}
	});

'use strict';

/* Filters */

angular.module('curation.filters', [
	'filter.time']).
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
	factory( 'pageCheck', function( $cookieStore ){
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
	service( 'dimmed', function(){
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
    	}
	});


if( !!navigator.userAgent.toLowerCase().match( /msie 7/ ) ){
	angular.bootstrap( document.getElementsByTagName( 'body' ), [
		'curation.commonControllers',
		'curation.cardControllers',
		'curation.characterBoxControllers',
		'curation.filters',
		'curation.services',
		'curation.directives'
	]);	
}else{
	angular.bootstrap( document.getElementsByTagName( 'body' ), [
		'curation.masonry',
		'curation.commonControllers',
		'curation.cardControllers',
		'curation.characterBoxControllers',
		'curation.filters',
		'curation.services',
		'curation.directives'
	]);	
}




