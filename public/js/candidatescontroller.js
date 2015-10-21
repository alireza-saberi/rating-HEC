"use strict";
(function(){
	var candidatescontroller = function($rootScope, $scope, $http, candidatesFactory, $timeout){
		var index = 0;
		var newCandidate = {};
		$scope.msgs = {};
		$scope.deactiveUpdateButton = true;
		//geting data related codes
		var refresh = function(){candidatesFactory.get().success(function(data){
			$rootScope.candidateList = data;

		}).error(function(){
			console.log("Sorry, can not reach the server");
		})};
		refresh();

		// adding a new candidate
		$scope.addCandide = function(){
			if ($scope.newCandidateName && $scope.newCandidateName.length)
				{
					newCandidate.name = $scope.newCandidateName;
					newCandidate.overAllRate = 0;
					newCandidate.subrates = {item1 : 0, item2 : 0, item3 : 0, item4:0};
					candidatesFactory.post(newCandidate).success(function(res){
						refresh();
						$scope.msgs.newCandidatesuccess =  true;
						$timeout(function() {
							$scope.msgs.newCandidatesuccess = false;
						}, 2000);
					}).error(function(err){
						console.log('Sorry, something wrong happened when adding a new candide');
						$scope.msgs.newCandidateError =  true;
						$timeout(function() {
							$scope.msgs.newCandidateError = false;
						}, 2000);
					});	
				}else{
					$scope.msgs.updateCandidateError2 =  true;
					$timeout(function() {
					$scope.msgs.updateCandidateError2 = false;
				}, 2000);
				}
		};

		// removing a candiate
		$scope.removeCandide = function(id) {
		  candidatesFactory.delete(id).success(function(response) {
		    refresh();
			$scope.msgs.deleteCandidatesuccess =  true;
				$timeout(function() {
					$scope.msgs.deleteCandidatesuccess = false;
			}, 2000);		    
		  }).error(function(err){
		  	console.log('Sorry, something wrong happened when deleting a new candide');
			$scope.msgs.newCandidateError =  true;
				$timeout(function() {
					$scope.msgs.newCandidateError = false;
				}, 2000);		  	
		  });
		};

		//editing a candidate
		$scope.editCandide = function(id){
			$scope.deactiveUpdateButton = false;
			$scope.newCandidateName = $rootScope.candidateList[id].name;
			index = id;
		};

		// update candidate name
		$scope.update = function(){
			if ($scope.newCandidateName && $scope.newCandidateName.length){
			$rootScope.candidateList[index].name = $scope.newCandidateName;
			candidatesFactory.put($rootScope.candidateList[index]._id, {name : $rootScope.candidateList[index].name}).success(function(){
					refresh();
					$scope.msgs.updateCandidatesuccess =  true;
					$timeout(function() {
							$scope.msgs.updateCandidatesuccess = false;
					}, 2000);
					$scope.deactiveUpdateButton = true;
			}).error(function(){
					$scope.msgs.updateCandidateError =  true;
					$timeout(function() {
							$scope.msgs.updateCandidateError = false;
					}, 2000);				
			});
		}else{
				$scope.msgs.updateCandidateError2 =  true;
					$timeout(function() {
							$scope.msgs.updateCandidateError2 = false;
				}, 2000);
		}
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

	candidatescontroller.$inject = ['$rootScope', '$scope', '$http', 'candidatesFactory', '$timeout'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());