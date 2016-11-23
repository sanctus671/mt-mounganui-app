(function() {
	'use strict';

	angular
		.module('bizdir.businesses')
		.controller('BusinessDetailsController', BusinessDetailsController);

	BusinessDetailsController.$inject = [
		'business', 'businessesService', 'externalAppsService', 'openHoursService', 'distanceService', '$state', 'favoriteBusinessesService', 'ionicToast', '$window'];

	/* @ngInject */
	function BusinessDetailsController(
		business, businessesService, externalAppsService, openHoursService, distanceService, $state, favoriteBusinessesService, ionicToast, $window) {

		// var connection = navigator.connection;
		// console.log('CONNECTION', connection);
		// console.log('$cordovaNetwork', $cordovaNetwork);
		var vm = angular.extend(this, {
			categories: null,
			subcategories: null,
			currentDateTime: (new Date()).format('dddd HH:MM'),
			business: business,
			// {
			// 	// containsOpenHours: !!business.openhours,
			// 	// isBusinessOpen: business.openhours && openHoursService.isBusinessOpen(business.openhours),
			// 	distance: null,
			// 	// pictures: business.pictures,
			// 	name: business.name,
			// 	category: business.category,
			// 	isInFavorites: favoriteBusinessesService.isInFavorites(business.guid),
			// 	rating: business.rating
			// },
			goToBusinessWebsite: goToBusinessWebsite,
			showNews: showNews,
			showServices: showServices,
			showCatalogues: showCatalogues,
			showProducts: showProducts,
			showFavorites: showFavorites,
			showWordpress: showWordpress,
			showDrupal: showDrupal,
			getDirections: getDirections,
			toggleFavorites: toggleFavorites,
			showContactUs: showContactUs,
			showReviews: showReviews
			// isOnline: $cordovaNetwork.isOnline()
		});

		(function activate() {
			setDistanceToOrigin();
			loadCategories();
		})();

		// *************************************************************

		function toggleFavorites() {
			vm.business.isInFavorites = !vm.business.isInFavorites;
			if (vm.business.isInFavorites) {
				favoriteBusinessesService.addToFavorites(business._id);
				ionicToast.show('\'' + vm.business.name + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				favoriteBusinessesService.removeFromFavorites(business._id);
				ionicToast.show('\'' + vm.business.name + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function loadCategories() {
			businessesService.getCategories().then(function(categories) {
				vm.categories = categories;
			});

			businessesService.getSubcategories().then(function(subcategories) {
				vm.subcategories = subcategories;
			});
		}

		function goToBusinessWebsite() {
			$window.open(business.site_url, '_system', 'location=yes');
		}

		function showReviews() {
			$state.go('app.reviews', {
				businessId: business.guid
			});
		}

		function showContactUs() {
			$state.go('app.contact-us', {
				businessId: business._id
			});
		}

		function showFavorites() {
			$state.go('app.favorite-businesses', {
				random: (new Date()).getTime()
			});
		}

		function showProducts() {
			$state.go('app.products', {
				businessId: business.guid
			});
		}

		function showNews() {
			$state.go('app.articles', {
				businessId: business.guid
			});
		}

		function showServices() {
			$state.go('app.services', {
				businessId: business.guid
			});
		}

		function showCatalogues() {
			$state.go('app.catalogs', {
				businessId: business.guid
			});
		}

		function showWordpress() {
			$state.go('app.wordpress-articles');
		}

		function showDrupal() {
			$state.go('app.drupal-articles');
		}

		function setDistanceToOrigin() {
			distanceService.getDistanceToOrigin([business.address.latitude, business.address.longitude]).then(function(distance) {
				vm.business.distance = distance;
			});
		}

		function getDirections() {
			externalAppsService.openMapsApp(business.address);
		}
	}
})();
