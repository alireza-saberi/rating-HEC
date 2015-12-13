(function(){
	"use strict";
	var ModalInstanceCtrl = function($scope, candidatesFactory, $uibModalInstance){
		 $scope.ok = function () {
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
    							$uibModalInstance.close($scope.selected.item);
 								 };
 		  $scope.cancel = function () {
   								 $uibModalInstance.dismiss('cancel');
  								};						 
	};
	ModalInstanceCtrl.$inject = ['$scope', 'candidatesFactory', '$uibModalInstance'];
	angular.module('ratingApp').controller('ModalInstanceCtrl', ModalInstanceCtrl);
}());