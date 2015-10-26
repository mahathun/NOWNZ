
(function() {
    var module;

    module = angular.module('ngNow.portal');

    function PageLinks($http ) {

        this.$http = $http;

    }

    PageLinks.prototype.getLinks = function (  ) {
    var data = [
        {"page": "Usage", "url": "#/usage"},
        {"page": "Payments", "url": "#/billing"},
<<<<<<< HEAD
        {"page": "UserProfile", "url": "#/userProfile"},
        {"page": "ChangeProfile", "url": "#/changeUserProfile"},
        {"page": "Password", "url": "#/password"},
        {"page": "Plan", "url": "#/plan"}
=======
        {"page": "Plan", "url": "#/plan"},
        {"page": "Order", "url": "#/order"}
>>>>>>> be110e7833f74ac6a32a16d5cbcf1f1a21d15f23

    ];
        //return this.$http.get('/source/common/factories/pageLinks/JsonCData.json')
        //.success(function(data){
        //    //console.log(data);
        //    return data[0];
        //})
        //.error(function(){console.log("error")});
        return data;
    };


    function PageLinksFactory(  $http){
        return new PageLinks( $http)
    }

    module.factory('PageLinks',[

        '$http',

            PageLinksFactory
        ])
}( ));
