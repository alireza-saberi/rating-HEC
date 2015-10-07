"use strict";
(function(){
	var candidatescontroller = function($rootScope){
		$rootScope.candidateList = [
		{name:'Ali Saberi', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Mostafa Purmehdi', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Sina Sheikh', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Mirza Abbass', overAllRate: 3, subrates:{item1:3, item2:3, item3:3, item4:3}}
		];

	};

	candidatescontroller.$inject = ['$rootScope'];
	angular.module('ratingApp').controller('candidatescontroller', candidatescontroller);
}());