'use strict';

angular.module('block.directive', []).
	directive('qBlock', function() {
		return {
			restrict: 'C',
			link: function( scope, element ) {
				var tmp = '';
				
				var show = function(){
					//IE7 처리
					if( !!navigator.userAgent.toLowerCase().match( /msie 7/ ) ){
						tmp = '보안에 취약하고 콘텐츠 표현에 제약이 많은 Internet Explorer 버전을 사용하고 있습니다. '+
						  		'<strong><a href="http://windows.microsoft.com/ko-kr/internet-explorer/download-ie">최신 브라우저</a></strong>로 업그레이드하세요.'+
								'<a class="moreview" href="#">자세히</a>';
					}
					
					//제재 계정 처리
					if( scope.blockFlag != '' && scope.blockFlag != '0' && scope.blockCode == '32768' ){
						tmp = '<span class="iconLimit"></span>임시 제한된 계정입니다.  <strong>본인확인</strong>이 필요합니다.';
					}else if( scope.blockFlag != '' && scope.blockFlag != '0' ){
						tmp = '<span class="iconLimit"></span>이용이 제한된 계정입니다. 고객센터(1600-0020)로 문의해 주세요.';
					}else if( scope.blockCode == 'SELFCERTIFICATION' ){
						tmp = '<span class="iconLimit"></span>임시 제한된 계정입니다.  <strong>본인인증</strong> 후 이용해 주세요.';
					}else if( scope.blockCode == 'REPORTCENTER' ){
						tmp = '<span class="iconLimit"></span>이용이 제한된 계정입니다.  <strong>신고/이의내역</strong>을 확인해 주세요.';
					}else if( scope.blockCode == 'CUSTOMERCENTER' ){
						tmp = '<span class="iconLimit"></span>이용이 제한된 계정입니다. 고객센터(1600-0020)로 문의해 주세요.';
					}else if( scope.blockCode == '10300' || scope.blockCode == '10090' || scope.blockCode == '10160' || scope.blockCode == '10190' ){
						tmp = '<span class="iconLimit"></span>임시 제한된 계정입니다.  <strong>본인확인</strong>이 필요합니다.';
					};

					if( tmp ){
						tmp += '<button class="barClose">닫기</button>';
						
						element.append( tmp );

						element.find( '.barClose' ).on( 'click', function( e ){
							e.preventDefault();
							element.parent().hide();
						});						

					}else{
						element.parent().hide();
					};

				};
				//scope.$watch( 'blockFlag', function(){
				show();
				//});

			}
		}
	});
