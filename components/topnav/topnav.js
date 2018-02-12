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