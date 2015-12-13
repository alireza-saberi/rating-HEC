(function(){
"use strict";
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
   			'UPDATE': 'Update',
   			'REMOVE':'Remove',
   			'EDIT':'Edit',
   			'FEATURE':'Feature',
   			'RATE':'Rate',
   			'KNOWLEDGE':'Knowledge',
   			'SMARTNESS':'Smartness',
   			'SPEED':'Speed',
   			'SEXINESS':'Sexiness',
   			'UPLOAD':'Upload Image',
   			'SUBMIT':'Submit',
   			'CANCEL':'Cancel',
   			'DELETE':'Delete',
   			'MODAL':'Are you sure you want to delete this candidate?',
   			'DELCANDIDE': 'Delete Candidate'

    			});
    	$translateProvider.translations('fr', {
    		'TOPIC':'Sondage de candidat',
    		'NAME':'Nom',
   			'ACTION':'Action',
   			'ADDCANDIDE':'Ajouter un candidat',
   			'UPDATE': 'Mise à jour',
   			'REMOVE':'Supprimer',
   			'EDIT':'Modifier',
   			'FEATURE':'Caractéristique',
   			'RATE':'Taux',
   			'KNOWLEDGE':'Connaissance',
   			'SMARTNESS':'Élégance',
   			'SPEED':'La rapidité',
   			'SEXINESS':'Côté sexy',
   			'UPLOAD':'Envoyer une image',
   			'SUBMIT':'Soumettre',
   			'CANCEL':'Annuler',
   			'DELETE':'Effacer',
   			'MODAL':'Êtes-vous sûr de vouloir supprimer ce candidat?',
   			'DELCANDIDE':'supprimer Candidat'
    			});
    	$translateProvider.preferredLanguage('en'); 

	});


}());