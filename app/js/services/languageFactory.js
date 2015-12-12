(function(){
	var languageFactory = function($translate){
		var language = {};
		language.changeLanguage = function(key){
			$translate.use(key);
		};
		return language;

	};
	languageFactory.$inject = ['$translate'];
	angular.module('ratingApp').factory('languageFactory', languageFactory);
}());