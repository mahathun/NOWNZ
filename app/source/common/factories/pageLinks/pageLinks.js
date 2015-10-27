
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
            {"page": "UserProfile", "url": "#/userProfile"},
            {"page": "ChangeProfile", "url": "#/changeUserProfile"},
            {"page": "Password", "url": "#/password"},
            {"page": "Plan", "url": "#/plan"},
            {"page": "Order", "url": "#/order"}
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
