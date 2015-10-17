(function(){
	var candidatesFactory = function($http){
		var candidatesInfo = {};
		candidatesInfo.get = function(){
			return $http.get('/condidateslist');
		}
		candidatesInfo.post = function(newCandidate){
			return $http.post('/condidateslist', newCandidate);
		}
		candidatesInfo.delete = function(id){
			return $http.delete('/condidateslist/' + id);
		}
		candidatesInfo.put = function(id, newInfo){
			return $http.put('/condidateslist/' + id, newInfo);
		}
		return candidatesInfo;
	}
	candidatesFactory.$inject = ['$http'];
	angular.module('ratingApp').factory('candidatesFactory', candidatesFactory);
}());