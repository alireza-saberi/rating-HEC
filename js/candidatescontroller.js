"use strict";
(function(){
	var candidatescontroller = function($scope){
		$scope.candidateList = [
		{name:'Ali Saberi', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Mostafa Purmehdi', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Sina Sheikh', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Mirza Abbass', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}}
		];

	};

	candidatescontroller.$inject = ['$scope'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());