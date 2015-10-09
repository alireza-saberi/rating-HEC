"use strict";
(function(){
	var candidatescontroller = function($rootScope, $scope){
		$rootScope.candidateList = [
		{name:'Ali Saberi', overAllRate: 7, subrates:{item1:1, item2:2, item3:3, item4:4}},
		{name:'Mostafa Purmehdi', overAllRate: 5, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Sina Sheikh', overAllRate: 2, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Mirza Abbass', overAllRate: 0, subrates:{item1:3, item2:3, item3:3, item4:3}}
		];
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

	candidatescontroller.$inject = ['$rootScope', '$scope'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());