
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
