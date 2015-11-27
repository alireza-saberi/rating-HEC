"use strict";
(function(){
	var candidatescontroller = function($scope, $http, candidatesFactory, $timeout, modalService, $location, $anchorScroll){
		var index = 0;
		$scope.msgs = {};
		$scope.deactiveUpdateButton = true;
		$scope.animationsEnabled = true;
		//geting data related codes
		var refresh = function(){candidatesFactory.get().success(function(data){
			$scope.candidateList = data;
			$scope.candidateImage =[];
			for(var i = 0;i < data.length; i++){
				if (data[i].imageName && data[i].imageName.length){
				$scope.candidateImage[i] = 'https://s3.amazonaws.com/mostafa-1/' + 	data[i].imageName;
				} else{
					$scope.candidateImage[i] = "http://lorempixel.com/150/150/fashion/";
				}
			}
		}).error(function(){
			console.log("Sorry, can not reach the server");
		})};
		refresh();

		// adding a new candidate
		$scope.addCandide = function(){
			if ($scope.newCandidateName && $scope.newCandidateName.length > 0)
				{
					for(var i = 0; i < $scope.candidateList.length; i++){
						if ($scope.candidateList[i].name === $scope.newCandidateName){
							$scope.msgs.newCandidateRepeatError =  true;
							$timeout(function() {
								$scope.msgs.newCandidateRepeatError = false;
							}, 2000);
							$scope.newCandidateName="";
							return;
							}}
								var newCandidate = {};
								newCandidate.name = $scope.newCandidateName;
								newCandidate.overAllRate = 0;
								newCandidate.subrates = {item1 : 0, item2 : 0, item3 : 0, item4:0};
								newCandidate.imageName = "";
								newCandidate.totalVote = 0;
								candidatesFactory.post(newCandidate).success(function(res){
									refresh();
									$scope.newCandidateName = "";
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
		$scope.removeCandide = function(id, size) {

		var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete Candidate',
            headerText: 'Delete',
            bodyText: 'Are you sure you want to delete this candidate?'
        };

        modalService.showModal({}, modalOptions).then(function (result) {

		 							if($scope.candidateList && $scope.candidateList.length > 1){
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
		  							});} else{
		  									return false;
									}

        });

		  };

		//editing a candidate
		$scope.editCandide = function(id){
			$scope.deactiveUpdateButton = false;
			$scope.newCandidateName = $scope.candidateList[id].name;
			index = id;
		};

		// update candidate name
		$scope.update = function(){
			if ($scope.newCandidateName && $scope.newCandidateName.length){
			$scope.candidateList[index].name = $scope.newCandidateName;
			candidatesFactory.put($scope.candidateList[index]._id, {name : $scope.candidateList[index].name}).success(function(){
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

  		$scope.goToTop = function(){
  			      // set the location.hash to the id of
      				// the element you wish to scroll to.
     				$location.hash('top');

     				 // call $anchorScroll()
      				$anchorScroll();
  		};
	};

	candidatescontroller.$inject = ['$scope', '$http', 'candidatesFactory', '$timeout', 'modalService', '$location', '$anchorScroll'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());