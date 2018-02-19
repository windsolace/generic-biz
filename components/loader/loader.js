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
