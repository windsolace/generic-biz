var module = angular.module('app',['ngRoute','servicestab']);
module.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true); //removes the hashtag
	$routeProvider
    .when("/", {
        templateUrl:"templates/home.html"
    })
    .when("/services", {
        templateUrl:"templates/services.html"
    })
    .otherwise({redirectTo:'templates/home.html'});
});

module.run(function($rootScope, anchorSmoothScroll){
	$rootScope.currentPage = window.location.pathname.substring(1) || "";

	$rootScope.menu = [
		{name: "", label: "Home"},
		{name: "services", label: "Services"}
	];

	for(let menuItem of $rootScope.menu){
		if(menuItem.name === $rootScope.currentPage){
			$rootScope.currentPageName = menuItem.label;
		}
	}

	/* ==========================================================================
	Scroll To Top
	========================================================================== */
	window.onscroll = function() {$rootScope.scrollFunction()};

	$rootScope.scrollFunction = function() {
	    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	        document.getElementById("scrolltotop").style.display = "block";
	    } else {
	        document.getElementById("scrolltotop").style.display = "none";
	    }
	}

	// When the user clicks on the button, scroll to the top of the document
	$rootScope.topFunction = function() {
	    // document.body.scrollTop = 0; // For Safari
	    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	    anchorSmoothScroll.scrollTo('hiddentop');
	}
});

/* ==========================================================================
	Smooth Scroll 
	========================================================================== */
module.service('anchorSmoothScroll', function(){
	this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
});
