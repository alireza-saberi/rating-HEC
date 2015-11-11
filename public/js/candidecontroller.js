"use strict";
(function(){
	var candidatecontroller = function($rootScope, $routeParams, $scope, $http, Upload, candidatesFactory, $location){
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
  			var pastAvg = parseInt($rootScope.candide.overAllRate);
        var pastTotalVote = parseInt($rootScope.candide.totalVote);
        var pastTotal = pastAvg * pastTotalVote;
        var newTotal = (parseInt($rootScope.candide.subrates.item1) + parseInt($rootScope.candide.subrates.item2) + parseInt($rootScope.candide.subrates.item3));
        var total = pastTotal + newTotal;
        var totalVote = pastTotalVote + 1;
        var avg = total / totalVote;
        console.log(avg);
        $rootScope.candide.totalVote =  totalVote;
        $rootScope.candide.overAllRate = avg;
  			$rootScope.candidateList[parseInt(candiateIndex)] = $rootScope.candide;
        candidatesFactory.putSingleCandide($rootScope.candidateList[parseInt(candiateIndex)]._id, $rootScope.candide);
        $location.path('/');
  		}
  		// image uploading
  		$scope.uploadFiles = function(file, errFiles) {
        console.log(file);
            //console.log(file.length);
  		      var preview = document.getElementById("preview");
  		      preview.file = file;
            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(preview);
            console.log("The file that, I am uploading to the browser is :", preview.file);
            reader.readAsDataURL(file);
               Upload.upload(
                 {
                   url: '/image/' + $rootScope.candidateList[parseInt(candiateIndex)]._id,
                   method: 'POST',
                   // data: data // Any data needed to be submitted along with the files
                   file: preview.file
                 }).progress(function(evt){
                 }).success(function(data, status, headers, config){
                     console.log("Image succesfully uploaded to server");                     
                 }).error(function(error){
                   console.log("Error uploading image to server");
               });         

      };
	};

	candidatecontroller.$inject = ['$rootScope', '$routeParams', '$scope', '$http', 'Upload', 'candidatesFactory', '$location'];
	angular.module('ratingApp').controller('candidatecontroller', candidatecontroller);
}());