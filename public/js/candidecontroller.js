"use strict";
(function(){
	var candidatecontroller = function($rootScope, $routeParams, $scope, $http, Upload, candidatesFactory){
    var candiateIndex = $routeParams.candiateIndex;
    var refresh = function(){
      $http.get('/condidateslist').success(function(data){
          $rootScope.candidateList = data;
		      $rootScope.candide = $rootScope.candidateList[parseInt(candiateIndex)];
          //console.log($rootScope.candide);
          if ($rootScope.candide.imageName && $rootScope.candide.imageName.length){
            $scope.imageName = 'https://s3.amazonaws.com/mostafa-1/tmp/' + $rootScope.candide.imageName;
          }else{
            $scope.imageName = "http://lorempixel.com/150/150/fashion/";
          }
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
        $rootScope.candide.toalVote =  $rootScope.candide.toalVote + 1;
  			$rootScope.candidateList[parseInt(candiateIndex)] = $rootScope.candide;
        candidatesFactory.putSingleCandide($rootScope.candidateList[parseInt(candiateIndex)]._id, $rootScope.candide);
  		}
  		// image uploading
  		$scope.uploadFile = function(files) {
        if(files.length > 0){
  		    var preview = document.getElementById("preview");
  		    preview.file = files[0];
          var reader = new FileReader();
          reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(preview);
          //console.log("The file that, I am uploading to the browser is :", preview.file);
          reader.readAsDataURL(files[0]);
              Upload.upload(
                {
                  url: '/image/' + $rootScope.candidateList[parseInt(candiateIndex)]._id,
                  method: 'POST',
                  // data: data // Any data needed to be submitted along with the files
                  file: preview.file
                }).progress(function(evt){
              }).success(function(data, status, headers, config){
                //console.log("Image succesfully uploaded to server");                     
              }).error(function(error){
                console.log("Error uploading image to server");
              });         

        }
      };
	};

	candidatecontroller.$inject = ['$rootScope', '$routeParams', '$scope', '$http', 'Upload', 'candidatesFactory'];
	angular.module('ratingApp').controller('candidatecontroller', candidatecontroller);
}());