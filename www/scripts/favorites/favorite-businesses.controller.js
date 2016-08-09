(function() {
	'use strict';

	angular
		.module('bizdir.favorite-businesses')
		.controller('FavoriteBusinessesController', FavoriteBusinessesController);

	FavoriteBusinessesController.$inject = ['$state', 'favoriteBusinessesService', 'businessesService', '_'];

	/* @ngInject */
	function FavoriteBusinessesController($state, favoriteBusinessesService, businessesService, _) {
		var vm = angular.extend(this, {
			categories: null,
			subcategories: null,
			businesses: [],
			navigate: navigate,
			deleteFromFavorites: deleteFromFavorites
		});

		(function activate() {
			getBusinesses();
			loadCategories();
		})();

		// ********************************************************************

		function deleteFromFavorites(business) {
			favoriteBusinessesService.removeFromFavorites(business.guid);
			var t = _.remove(vm.businesses, function(item) {
				return item.guid === business.guid;
			});
			
			console.log(t);
		}

		function loadCategories() {
			businessesService.getCategories().then(function(categories) {
				vm.categories = categories;
			});

			businessesService.getSubcategories().then(function(subcategories) {
				vm.subcategories = subcategories;
			});
		}

		function getBusinesses() {
			favoriteBusinessesService.getFavoriteBusinesses()
				.then(function(businesses) {
					vm.businesses = businesses;
				});
		}

		function navigate(businessId) {
			$state.go('app.business-details', { businessId: businessId });
		}
	}
})();