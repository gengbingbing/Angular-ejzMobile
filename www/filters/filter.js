define(['app'], function(app) {
	app.register.filter('FilterScreen',function() {
		return function(array) {
			if (array != " ") {
				return array;
			}
		};
	});
})