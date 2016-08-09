(function() {
	'use strict';

	angular
		.module('bizdir.map')
		.factory('mapService', mapService);

	mapService.$inject = ['_', 'businessesService'];

	/* @ngInject */
	function mapService(_, businessesService) {
		var pins;

		var service = {
			getPins: getPins,
			getCommon: getCommon
		};
		return service;

		// ***************************************************************

		function getPins() {
			return businessesService.getBusinesses().then(function(businesses) {
				pins = [];
				_.each(businesses, function(business) {
					if (business.address.longitude && business.address.latitude) {
						pins.push({
							title: business.name,
							lat: business.address.latitude,
							lon: business.address.longitude,
							businessId: business._id
						});
						// _.each(business.mapdata.annotations, function(annotation) {
						// });
					}
				});
				return pins;
			});
		}

		function getCommon() {
			return businessesService.getCommon();
		}
	}
})();
