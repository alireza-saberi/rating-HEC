"use strict";
(function(){
	var candidatecontroller = function($rootScope, $routeParams, $scope, $http){
    var candiateIndex = $routeParams.candiateIndex;
    var refresh = function(){
      $http.get('/condidateslist').success(function(data){
        $rootScope.candidateList = data;
		    $rootScope.candide = $rootScope.candidateList[parseInt(candiateIndex)];     
      }).error(function(error){
        console.log("Cant find contact information");
      }); 
    }
    refresh()
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
  		// saving individual candidate information
  		$scope.save = function(){
  			$rootScope.candide.overAllRate = (1/3) * (parseInt($rootScope.candide.subrates.item1) + parseInt($rootScope.candide.subrates.item2) + parseInt($rootScope.candide.subrates.item3));
  			$rootScope.candidateList[parseInt(candiateIndex)] = $rootScope.candide;
  			$http.put('/candide/' + $rootScope.candidateList[parseInt(candiateIndex)]._id, $rootScope.candide)
  		}
  		// image uploading
  		$scope.uploadFile = function(files) {
  			console.log(files[0].name + ",  " + files[0].size + " Bytes, Type: "+ files[0].type);
  			/*
				I will add some codes here to control
  			*/
  			var preview = document.getElementById("preview");
  			preview.file = files[0];
  			
    		var fd = new FormData();
    		//Take the first selected file
    		// fd.append("file", files[0]);
    		// console.log(fd);
    		// $http.post(uploadUrl, fd, {
      //   								withCredentials: true,
      //   								headers: {'Content-Type': undefined },
      //   								transformRequest: angular.identity
    		// 						    }).success(function(data){
    		// 						    	console.log("image uploading is done!");
    		// 						    }).error(function(err){
    		// 						    	console.log("Something went wrong with image uploading for " + err);
    		// 						    });

};

	};

	candidatecontroller.$inject = ['$rootScope', '$routeParams', '$scope', '$http'];
	angular.module('ratingApp').controller('candidatecontroller', candidatecontroller);
}());