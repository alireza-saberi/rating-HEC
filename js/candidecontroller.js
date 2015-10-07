"use strict";
(function(){
	var candidatecontroller = function($rootScope, $routeParams){
		var candidateId = $routeParams.candiateIndex;
		console.log(candidateId);
		//console.log("routeParams is : "+ $routeParams.candiateIndex);
		// $scope.candidateList = [
		// {name:'Ali Saberi', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		// {name:'Mostafa Purmehdi', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		// {name:'Sina Sheikh', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		// {name:'Mirza Abbass', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}}
		// ];
		$rootScope.candide = $rootScope.candidateList[candidateId];

	};

	candidatecontroller.$inject = ['$rootScope', '$routeParams'];
	angular.module('ratingApp').controller('candidatecontroller', candidatecontroller);
}());