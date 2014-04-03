var curationArr = [];

if( !!navigator.userAgent.toLowerCase().match( /msie 7/ ) ){
	curationArr = [
		'curation.commonControllers',
		'curation.cardControllers',
		'curation.characterBoxControllers',
		'curation.filters',
		'curation.services',
		'curation.directives',
		'exception',
		'block.controller',
		'block.directive'
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
		'exception',
		'block.controller',
		'block.directive'
	]
};

jQuery( document ).ready( function(){
	angular.bootstrap( document.getElementsByTagName( 'body' ), curationArr );	
});