angular.module('servicestab', ['servicedetail'])
.component('servicestab', {
	templateUrl:'components/servicestab/servicestab.html'
})
.controller('ServicesTabCtrl', function ($rootScope, $scope, $http, $sce, anchorSmoothScroll) {
	let API_SERVICE = $rootScope.API_SERVICE || "/api/services/";
	$scope.loading = false;
	$scope.activeItem = "" || "aircon";
	$scope.activeServiceList = []; //list of either aircon or cctv svc
	$scope.selectedService = ""; //name of svc detail
	$scope.selectedServiceId=""; //id of svc detail
	$scope.selectedServiceObj = ""; //html of svc detail
	$scope.serviceTypes = [
		{id:'aircon', name:'Aircon'},
		{id:'cctv', name:'CCTV'}
	];

	$scope.init = function(){
		//Load the correct service tab and service list
		if(window.location.hash){
	        var hashArr = window.location.hash.replace("#", "").split(".");
	        $scope.activeItem = hashArr[0] || "aircon";
	        $scope.selectedServiceId = hashArr[1] || "";
	    }
		this.getServiceList(this.activeItem).then(function(serviceList) {
			//load the correct service details
			if(window.location.hash){
		        $scope.selectedService = getServiceNameFromList($scope.selectedServiceId, serviceList);
		        $scope.loadDetails($scope.selectedServiceId, $scope.selectedService);
		    }
		});
	}

	$scope.showServices = function(id){
		$scope.activeItem = id;
		$scope.activeServiceList = this.getServiceList(id);
	}

	/**
	 * Get all the services available for a serviceType e.g. aircon
	 * @param serviceid - aircon / cctv
	 * @return the serviceList
	 */
	$scope.getServiceList = function(serviceid){
		$scope.loading = true;
		return new Promise(function(resolve, reject){
			$http.get(API_SERVICE + serviceid + ".json").then(function(response){
				$scope.loading = false;
				$scope.activeServiceList = response.data.serviceList;
				resolve(response.data.serviceList);
			}, function(err){
				reject(err);
			});

		});
		
	}

	/**
	 * Get service details by <service.id>.html
	 * HTML name must match the service.id defined in /api/services in order to get data successfully
	 * @param serviceid - unique
	 * @param servicename
	 */
	$scope.loadDetails = function(serviceid, servicename){
		$scope.selectedService = servicename;
		$scope.selectedServiceId = serviceid;
		$http.get("../content/services/" + $scope.activeItem + "/" + $scope.selectedServiceId + ".html").then(function(response){
			$scope.selectedServiceObj = $sce.trustAsHtml(response.data);
			anchorSmoothScroll.scrollTo("svcdetail");
		}, function(err){
			//reset selectedService to hide svcdetail
			$scope.selectedService = "";
			$scope.selectedServiceId = "";
			console.error(servicename + " " + err.status + ":" + err.statusText);
		});
	}

	/**
	 * Util function to get serviceName from provided serviceid
	 * @param serviceid - unique id of svc
	 * @param serviceList - optional, fallsback to activeServiceList in scope
	 * @ return serviceName
	 */
	let getServiceNameFromList = function(serviceid, serviceList){
		if(!serviceList){
			serviceList = $scope.activeServiceList;
		}
		if(serviceList){
			for(let service of serviceList){
				if(service.id == serviceid) return service.name;
			}
		}

		return serviceid;
	}

	$scope.init();
});