"use strict";
(function(){
	var app = angular.module('ratingApp', ['ngRoute', 'ui.bootstrap', 'ngMessages', 'ngFileUpload', 'ngAnimate', 'pascalprecht.translate']);
	app.config(function($routeProvider, $translateProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'views/list.html',
				controller: 'candidatescontroller'
				})
			.when('/candidate/:candiateIndex', {
				templateUrl: 'views/candiate.html',
				controller: 'candidatecontroller'
				})
		// .when('', )
			.otherwise({ redirectTo: '/'});
   		$translateProvider.translations('en', {
   			'TOPIC':'Candidate Poll',
   			'NAME':'Name',
   			'ACTION':'Action',
   			'ADDCANDIDE':'Add Candidate',
   			'UPDATE': 'Update'
    			});
    	$translateProvider.translations('fr', {
    		'TOPIC':'Sondage de candidat',
    		'NAME':'Nom',
   			'ACTION':'Action',
   			'ADDCANDIDE':'Ajouter un candidat',
   			'UPDATE': 'Mise à jour'
    			});
    	$translateProvider.preferredLanguage('en'); 

	});


}());