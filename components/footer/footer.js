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
