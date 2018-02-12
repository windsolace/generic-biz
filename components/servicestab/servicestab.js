angular.module('servicestab', ['servicedetail'])
.component('servicestab', {
	templateUrl:'components/servicestab/servicestab.html'
})
.controller('ServicesTabCtrl', function ($rootScope, $scope, $http, $sce, anchorSmoothScroll) {
	let API_SERVICE = "/api/services/"
	$scope.activeItem = "" || "aircon";
	$scope.activeServiceList = []; //list of either aircon or cctv svc
	$scope.selectedService = ""; //name of svc detail
	$scope.selectedServiceId=""; //id of svc detail
	$scope.selectedServiceObj = ""; //html of svc detail
	$scope.services = [
		{id:'aircon', name:'Aircon'},
		{id:'cctv', name:'CCTV'}
	];

	$scope.init = function(){
		this.getServiceList(this.activeItem);
	}

	$scope.showServices = function(id){
		$scope.activeItem = id;
		$scope.activeServiceList = this.getServiceList(id);
	}

	$scope.getServiceList = function(serviceid){
		$http.get(API_SERVICE + serviceid + ".json").then(function(response){
			$scope.activeServiceList = response.data.serviceList;
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
		$http.get("../content/services/ac-repair.html").then(function(response){
			$scope.selectedServiceObj = $sce.trustAsHtml(response.data);
			anchorSmoothScroll.scrollTo("svcdetail");

		});
	}

	$scope.init();
});