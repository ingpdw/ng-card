'use strict';

/* Filters */

angular.module('curation.filters', ['filter.time']).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);