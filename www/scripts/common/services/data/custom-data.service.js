(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('customDataService', customDataService);

	customDataService.$inject = ['$http', '$q', '_', 'ENV', 'localStorageService'];

	/* @ngInject */
	function customDataService($http, $q, _, ENV, localStorageService) {
		var catalogs = {};
		var products = {};
		var services = {};
		var news = {};
		var businesses;
		var common;
		var categories;
		var subcategories;

		var commonUrl = ENV.apiUrl + 'common';
		var businessUrl = ENV.apiUrl + 'businesses';
		var categoryUrl = ENV.apiUrl + 'statics/categories';
		var subcategoryUrl = ENV.apiUrl + 'subcategories';

		var service = {
			getBusinesses: getBusinesses,
			getBusiness: getBusiness,
			getBusinessesByCategory: getBusinessesByCategory,
			getCategories: getCategories,
			getSubcategories: getSubcategories,
			getCatalogs: getCatalogs,
			getCatalog: getCatalog,
			getCommon: getCommon,
			getProducts: getProducts,
			getProduct: getProduct,
			getServices: getServices,
			getService: getService,
			getArticle: getArticle,
			getArticles: getArticles,
			getReviews: getReviews,
			addReview: addReview
		};
		return service;

		// ***********************************************************************

		function getArticles(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.news)
					.then(function(response) {
						news[businessId] = response.data.result;
						return news[businessId];
					});
			})
		}

		function getArticle(businessId, articleId) {
			var promise;
			if (services[businessId]) {
				promise = $q.when(news[businessId]);
			} else {
				promise = getArticles(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item._id == articleId;
				});
			});
		}

		function getServices(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.services)
					.then(function(response) {
						services[businessId] = response.data.result;
						return services[businessId];
					});
			});
		}

		function getService(businessId, serviceId) {
			var promise;
			if (services[businessId]) {
				promise = $q.when(services[businessId]);
			} else {
				promise = getServices(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item._id == serviceId;
				});
			});
		}

		function getProducts(businessId) {
			return getBusiness(businessId).then(function(business) {
				return $http.get(business.products)
					.then(function(response) {
						products[businessId] = response.data.result;
						return products[businessId];
					});
			});
		}

		function getProduct(businessId, productId) {
			var promise;
			if (products[businessId]) {
				promise = $q.when(products[businessId]);
			} else {
				promise = getProducts(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item._id == productId;
				});
			});
		}

		function getCategories() {
			if (categories) {
				return $q.when(categories);
			} else {
				return $http({
					method: 'GET',
					url: categoryUrl
				}).then(function(response) {
					categories = response.data;

					localStorageService.set('categories', categories);

					return categories;
				}, function (response) {
					categories = localStorageService.get('categories');
					return categories;
				});
			}

			// return getBusinesses().then(function(businesses) {
			// 	var categories = _.map(businesses, function(business) {
			// 		return business.category;
			// 	});
			// 	categories = ['All'].concat(_.sortBy(_.unique(categories)));
			// 	return categories;
			// });
		}

		function getSubcategories() {
			if (subcategories) {
				return $q.when(subcategories);
			} else {
				return $http({
					method: 'GET',
					url: subcategoryUrl,
                                        params:{
                                            _perPage: 'ALL',
                                            _sortField: 'name',
                                            _sortDir: 'DESC'
                                        }
				}).then(function(response) {
					var subcategoriesRaw = response.data;
                                        subcategories = [];
					for (var index in subcategoriesRaw){
                                            var subcategory = subcategoriesRaw[index];
                                            if (subcategory.category in subcategories){
                                                subcategories[subcategory.category].push(subcategory);
                                            }
                                            else{
                                                subcategories[subcategory.category] = [subcategory];
                                            }
                                        }
					localStorageService.set('subcategories', subcategories);
					return subcategories;
				}, function (response) {
					subcategories = localStorageService.get('subcategories');
					return subcategories;
				});
			}

			// return getBusinesses().then(function(businesses) {
			// 	var categories = _.map(businesses, function(business) {
			// 		return business.category;
			// 	});
			// 	categories = ['All'].concat(_.sortBy(_.unique(categories)));
			// 	return categories;
			// });
		}

		function getBusinessesByCategory(category, subcategory) {
			var promise;

			if (businesses) {
				promise = $q.when(businesses);
			} else {
				promise = getBusinesses();
			}

			return promise.then(function(businesses) {
				var filtered;

				filtered =  _.filter(businesses, function(business) {
					return category === 'All' || business.category === category;
				})

				filtered = _.filter(filtered, function(business) {
					return subcategory === 'All' || business.subcategory === subcategory;
				});

				return filtered;
			});
		}

		function getBusinesses() {
			return $http({
				method: 'GET',
				url: businessUrl,
				params: {
					_sortField: 'name',
					_sortDir: 'DESC',
					_perPage: '*'
				}
			}).then(function(response) {
				businesses = response.data; //.result

				localStorageService.set('businesses', businesses);

				return businesses;
			}, function (response) {
				console.log('failed', response);
				
				businesses = localStorageService.get('businesses');
				console.log('fetched from localStorageService', businesses);

				return businesses;
			});
		}

		function getBusiness(businessId) {
			var promise;

			if (businesses) {
				promise = $q.when(businesses);
			} else {
				promise = getBusinesses();
			}

			return promise.then(function(businesses) {
				var business = _.find(businesses, function(business) {
					return business._id === businessId;
				});
                                console.log(business);
				// business = enrichBusiness(business);
				return business;
			});
		}

		function enrichBusiness(item) {
			if (!item.rating) {
				item.rating = {
					value: 0,
					reviews: 0
				}
			}
			return item;
		}

		function getCatalogs(businessId) {
			return get(businessId).then(function(business) {
				return $http.get(business.catalogs)
					.then(function(response) {
						catalogs[businessId] = response.data.result;
						return catalogs[businessId];
					});
			});
		}

		function getCatalog(businessId, catalogId) {
			var promise;
			if (catalogs[businessId]) {
				promise = $q.when(catalogs[businessId]);
			} else {
				promise = getCatalogs(businessId);
			}

			return promise.then(function(items) {
				return _.find(items, function(item) {
					return item._id == catalogId;
				});
			});
		}

		function getReviews(businessId) {
			return $q.when([{
				author: 'John Snow',
				comment: 'Good business',
				rate: 4,
				date: 1
			}, {
				author: 'Tyrion Lanniste',
				comment: 'Not bad',
				rate: 2,
				date: 2
			}, {
				author: 'Daenerys Targaryen',
				comment: 'Wonderful',
				date: 3
			}]);
		}

		function addReview(review) {
			alert('Not implemented: Please use a persistent storage for a real serialization experience');
			return $q.when(true);
		}

		function getCommon() {
			return $http.get(commonUrl).then(function(response) {
				common = response.data.result;
				return common;
			});
		}
	}
})();
