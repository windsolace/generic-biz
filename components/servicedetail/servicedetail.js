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
