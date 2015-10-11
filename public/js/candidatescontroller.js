"use strict";
(function(){
	var candidatescontroller = function($rootScope, $scope, $http){
		//geting data related codes
		var refresh = function(){$http.get('/condidateslist').success(function(data){
			console.log(data);
			$rootScope.candidateList = data;

		}).error(function(){
			console.log("Can not reach the server");
		})};
		refresh();

		$scope.addCandide = function(){
			var newCandidate = {};
			newCandidate.name = $scope.newCandidate.name;
			newCandidate.overAllRate = 0;
			newCandidate.subrates = {item1 : 0, item2 : 0, item3 : 0, item4:0};
			$http.post('/condidateslist', newCandidate).success(function(res){
				console.log(res);
				refresh();
			}).error(function(err){
				console.log('Sorry, something wrong happened when adding a new candide');
			});
		};

		// removing a candiate
		$scope.removeCandide = function(id) {
		  $http.delete('/condidateslist/' + id).success(function(response) {
		    refresh();
		  }).error(function(err){
		  	console.log('Sorry, something wrong happened when deleting a new candide');
		  });
		};

		//rating related codes
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