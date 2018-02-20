module.component('banner', {
	templateUrl:'components/banner/banner.html'
});
module.component('myfooter', {
	templateUrl:'components/footer/footer.html'
})
.controller('FooterCtrl', function ($rootScope, $scope) {
	$scope.isMobile = false;

	$scope.init = function(){
		if(window.innerWidth > 800){
			$scope.isMobile = false;
		} else {
			$scope.isMobile = true;
		}
		// console.log($scope.isMobile);
	}

	$scope.init();
});

module.component('breadcrumbs', {
	templateUrl:'components/breadcrumbs/breadcrumbs.html'
})
.controller('BreadcrumbCtrl', function ($rootScope, $scope, $timeout) {
	// console.log($rootScope);
});
module.component('loader', {
	templateUrl:'components/loader/loader.html',
	bindings:{
		loading: '<'
	},
	controller: function loaderCtrl() {
		// this.$onInit = function(){
		// 	console.log("init svc id is " +this.loading);
		// }
	}
});

/**
 * Child component of servicetab
 */
angular.module('servicedetail', [])
.component('servicedetail', {
	templateUrl:'components/servicedetail/servicedetail.html',
	bindings:{
		svccontent: '<'
	},
	controller: function serviceDetailCtrl() {
		// this.$onInit = function(){
		// 	console.log("init svc id is " +this.svccontent);
		// }
	}
});

angular.module('servicestab', ['servicedetail'])
.component('servicestab', {
	templateUrl:'components/servicestab/servicestab.html'
})
.controller('ServicesTabCtrl', function ($rootScope, $scope, $http, $sce, anchorSmoothScroll) {
	let API_SERVICE = "/api/services/"
	$scope.loading = false;
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
		$scope.loading = true;
		$http.get(API_SERVICE + serviceid + ".json").then(function(response){
			$scope.loading = false;
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
module.component('topNav', {
	templateUrl:'components/topnav/topnav.html'
});

module.controller('TopNavCtrl', function ($rootScope, $scope, $timeout) {

	$scope.navigate = function(){
		$timeout(function(){
			$rootScope.currentPage = window.location.pathname.substring(1);
			for(let menuItem of $rootScope.menu){
				if(menuItem.name === $rootScope.currentPage){
					$rootScope.currentPageName = menuItem.label;
				}
			}
			//only close menu when in mobile mode
			if(window.innerWidth < 800){
				$('.navbar-toggler').click();
			}
		}, 100);
	}
});