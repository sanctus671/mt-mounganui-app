(function() {
  'use strict';

  angular
    .module('bizdir.common')
    .filter('findNameBySlug', findNameBySlug);

  findNameBySlug.$inject = ['_'];

  /* @ngInject */
  function findNameBySlug(_) {
    return function(name, objs) {

      var obj = _.find(objs, function (obj) {
        return name === obj.slug;
      });

      return _.isObject(obj) ? obj.name : obj;
    };
  }
})();

