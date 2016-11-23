(function() {
	'use strict';

	angular
		.module('bizdir.common')
		.factory('externalAppsService', externalAppsService);

	externalAppsService.$inject = ['$window'];

	/* @ngInject */
	function externalAppsService($window) {
		var service = {
			openMapsApp: openMapsApp,
			openExternalUrl: openExternalUrl,
			openPdf: openPdf
		};
		return service;

		// ****************************************************************

		function openPdf(url) {
			openExternalUrl(url);
		}

		function openMapsApp(coords) {
                    console.log(coords);
			if (angular.isObject(coords)) {
				coords = coords.latitude + ',' + coords.longitude;
			}

			var q;
                        
                        /*
			if (ionic.Platform.isAndroid()) {
				q = 'geo:' + coords + '?q=' + coords;
			} else {
				q = 'maps://maps.apple.com/?q=' + coords;
			}
			q = q.replace(' ', '');
                    
                        
                        */
                       
                        q = "http://maps.google.com/?q=" + coords;
                        
                        window.open(q,"_system");
			//$window.location.href = q;
		}

		function openExternalUrl(url) {
			$window.open(url, '_system', 'location=yes');
			return false;
		}
	}
})();
