'use strict';

describe('cardUrl Service', function(){

	beforeEach( module('curation.cardUrl') );

	it('should contain a $qurl',
       inject(function( $qurl ) {
            expect( $qurl ).toNotEqual( null )
    }));
	
	it('should contain a getCardUrl',
       inject(function( $qurl ) {
            expect( $qurl.getCardUrl() ).toEqual( '/api/bs/me/curationContents' );
    }));

    it('should contain a sandboxUrl',
       inject(function( $qurl ) {
       		var id = 1;
            expect( $qurl.getSandboxUrl( id ) ).toEqual( 'http://sandbox.plaync.com/1' );
    }));

    it('should contain a sandboxUrl',
       inject(function( $qurl ) {
       		var id = '';
            expect( $qurl.getSandboxUrl( id ) ).toEqual( 'http://sandbox.plaync.com/' );
    }));

    it('should contain a sandboxUrl',
       inject(function( $qurl ) {
       		var id = undefined;
            expect( $qurl.getSandboxUrl( id ) ).toEqual( 'http://sandbox.plaync.com/' );
    }));
});