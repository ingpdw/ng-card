'use strict';

/* commonControllers */
angular.module('curation.commonControllers', [ 'curation.pageCheck' ]).
  controller( 'commons', ['$scope', '$pageCheck', function( $scope, page ){

    $scope.disbleDimmed = true;
    $scope.isFirstAccess = page.isFirstAccess();
    $scope.isFirstLogin = page.isFirstLogin();

    $scope.isLoginFlag = isLoginFlag; //로그인 여부 window.isLoginFlag = 'Y'
     
    // if( window.ncGnbP ){ //window.ncGnbP
    //   $scope.nickname = ncGnbP.nickname;
    //   $scope.guid = ncGnbP.uid;
    // }

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