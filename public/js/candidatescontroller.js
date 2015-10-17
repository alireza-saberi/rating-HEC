"use strict";
(function(){
	var candidatescontroller = function($rootScope, $scope, $http, candidatesFactory){
		var index = 0;
		//geting data related codes
		var refresh = function(){candidatesFactory.get().success(function(data){
			$rootScope.candidateList = data;

		}).error(function(){
			console.log("Sorry, can not reach the server");
		})};
		refresh();

		// adding a new candidate
		$scope.addCandide = function(){
			var newCandidate = {};
			if ($scope.newCandidateName && $scope.newCandidateName.length)
				{newCandidate.name = $scope.newCandidateName;}else{
					return;
				}
			newCandidate.overAllRate = 0;
			newCandidate.subrates = {item1 : 0, item2 : 0, item3 : 0, item4:0};
			candidatesFactory.post(newCandidate).success(function(res){
				refresh();
			}).error(function(err){
				console.log('Sorry, something wrong happened when adding a new candide');
			});
		};

		// removing a candiate
		$scope.removeCandide = function(id) {
		  candidatesFactory.delete(id).success(function(response) {
		    refresh();
		  }).error(function(err){
		  	console.log('Sorry, something wrong happened when deleting a new candide');
		  });
		};

		//editing a candidate
		$scope.editCandide = function(id){
			$scope.newCandidateName = $rootScope.candidateList[id].name;
			index = id;
		};

		// update candidate name
		$scope.update = function(){
			$rootScope.candidateList[index].name = $scope.newCandidateName;
			candidatesFactory.put($rootScope.candidateList[index]._id, {name : $rootScope.candidateList[index].name});
			refresh();
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

	candidatescontroller.$inject = ['$rootScope', '$scope', '$http', 'candidatesFactory'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());