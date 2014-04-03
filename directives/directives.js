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