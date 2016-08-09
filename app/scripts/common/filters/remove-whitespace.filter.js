(function() {
  'use strict';

  angular
    .module('bizdir.common')
    .filter('removeWhitespace', removeWhitespace);

  removeWhitespace.$inject = ['_'];

  /* @ngInject */
  function removeWhitespace(_) {
    return function(value) {
      if (_.isString(value)) {
        return value.replace(/\s*/g, '');
      }
    };
  }
})();

