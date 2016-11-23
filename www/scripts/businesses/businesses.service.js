(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.factory('businessesService', businessesService);

	businessesService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function businessesService(dataService, $q, _) {
		var service = {
			getBusinesses: getBusinesses,
			getBusinessesByCategory: getBusinessesByCategory,
			getBusiness: getBusiness,
			getCommon: getCommon,
			getCategories: getCategories,
			getSubcategories: getSubcategories
		};
		return service;

		// ***************************************************************

		function getCategories() {
			return dataService.getCategories();
		};

		function getSubcategories() {
			return dataService.getSubcategories();
		};

		function getBusinesses() {
			return dataService.getBusinesses();
		}

		function getBusinessesByCategory(category, subcategory) {
			return dataService.getBusinessesByCategory(category, subcategory);
		}

		function getBusiness(businessId) {
                    console.log(dataService.getBusiness(businessId));
			return dataService.getBusiness(businessId);
		}

		function getCommon() {
			return dataService.getCommon();
		}
	}
})();
