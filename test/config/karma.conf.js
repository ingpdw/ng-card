module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],  
    files: [
      'http://static.plaync.co.kr/common/js/lib/jquery_171_min.js',
      '../js/lib/1.1.0/angular.min.js',
      '../js/lib/1.1.0/angular-cookies.js',
      '../js/lib/1.1.0/angular-mocks.js',
      /*'../curation.lib.js',
      '../curation.min.js',*/

    '../js/controllers/commonControllers.js',
    '../js/controllers/cardController.js',
    '../js/controllers/characterBoxController.js',
    '../js/controllers/blockController.js',
    '../js/directives/directives.js',
 //   '../js/directives/curationMasonry.js',
    '../js/directives/trailer.js',
    '../js/directives/curationScrolling.js',
    '../js/directives/curationLoading.js',
    '../js/directives/curationVideo.js',
    '../js/directives/curationCard.js',
    '../js/directives/curationResize.js',
    '../js/directives/characterBox.js',
    '../js/directives/cardComment.js',
    '../js/directives/block.js',
    '../js/filters/filters.js',
    '../js/filters/timeage.js',
    '../js/services/services.js',
    '../js/services/pageCheck.js',
    '../js/services/dimmed.js',
    '../js/services/query.js',
    '../js/services/cardUrl.js',
    '../js/services/goLogin.js',
    '../js/services/exception.js',
    //'../js/app.js',


      '../js/test/*.test.js'
    ],
    browsers: ['PhantomJS'],
    plugins: ['karma-jasmine',
      'karma-phantomjs-launcher']   
  });
};

 