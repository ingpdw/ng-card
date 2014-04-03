'use strict';

describe('pageCheck Service', function(){

	beforeEach( module('curation.pageCheck') );

	it('should contain a $pageCheck',
       inject(function( $pageCheck ) {
            expect( $pageCheck ).toNotEqual( null )
  }));
	
  it('should contain a $pageCheck',
       inject(function( $pageCheck ) {
            expect( $pageCheck.isFirstLogin() ).toBeFalsy();
  }));	
});