"use strict";
(function(){
	var candidatescontroller = function($rootScope, $scope, $http){
		$http.get('/contactlist').success(function(data){
			console.log(data);
			$rootScope.candidateList = data;

		}).error(function(){
			console.log("Can not reach the server");
		});
		$scope.hoveringOver = function(value) {
			    $scope.overStar = value;
			    $scope.percent = 100 * (value / 7);
  			};
  		 $scope.ratingStates = [
							    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
							    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
							    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
							    {stateOn: 'glyphicon-heart'},
							    {stateOff: 'glyphicon-off'}
  								];

	};

	candidatescontroller.$inject = ['$rootScope', '$scope', '$http'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());