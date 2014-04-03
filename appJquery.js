'use strict';

// angular.module('curation', [
// 	'curation.commonControllers',
// 	'curation.menuControllers',
// 	'curation.filters',
// 	'curation.services',
// 	'curation.directives'
// ]);

angular.bootstrap( document.getElementsByTagName( 'body' ), [
	'wu.masonry',
	'curation.commonControllers',
	'curation.menuControllers',
	'curation.cardControllers',
	'curation.characterBoxControllers',
	'curation.filters',
	'curation.services',
	'curation.directives'
]);