!function(){"use strict";var a=function(a,b,c,d,e,f,g){var h=a.candiateIndex,i=function(){c.get("/condidateslist").success(function(a){b.candidateList=a,b.candide=b.candidateList[parseInt(h)],b.candide.imageName&&b.candide.imageName.length?b.imageName="https://s3.amazonaws.com/mostafa-1/"+b.candide.imageName:b.imageName="http://lorempixel.com/150/150/fashion/"}).error(function(a){console.log("Cant find contact information")})};i(),b.hoveringOver=function(a){b.overStar=a,b.percent=100*(a/7)},b.ratingStates=[{stateOn:"glyphicon-ok-sign",stateOff:"glyphicon-ok-circle"},{stateOn:"glyphicon-star",stateOff:"glyphicon-star-empty"},{stateOn:"glyphicon-heart",stateOff:"glyphicon-ban-circle"},{stateOn:"glyphicon-heart"},{stateOff:"glyphicon-off"}],b.save=function(){var a=parseInt(b.candide.overAllRate),c=parseInt(b.candide.totalVote),d=a*c,g=parseInt(b.candide.subrates.item1)+parseInt(b.candide.subrates.item2)+parseInt(b.candide.subrates.item3),i=d+g,j=c+1,k=i/j;console.log(k),b.candide.totalVote=j,b.candide.overAllRate=k,b.candidateList[parseInt(h)]=b.candide,e.putSingleCandide(b.candidateList[parseInt(h)]._id,b.candide),f.path("/")},b.uploadFiles=function(a,c){console.log(a);var e=document.getElementById("preview");e.file=a;var f=new FileReader;f.onload=function(a){return function(b){a.src=b.target.result}}(e),console.log("The file that, I am uploading to the browser is :",e.file),f.readAsDataURL(a),d.upload({url:"/image/"+b.candidateList[parseInt(h)]._id,method:"POST",file:e.file}).progress(function(a){}).success(function(a,b,c,d){console.log("Image succesfully uploaded to server")}).error(function(a){console.log("Error uploading image to server")})}};a.$inject=["$routeParams","$scope","$http","Upload","candidatesFactory","$location","languageFactory"],angular.module("ratingApp").controller("candidatecontroller",a)}();