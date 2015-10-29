
(function() {
    var module;

    module = angular.module('ngNow.portal');

    function PageLinks($http ) {

        this.$http = $http;

    }

    PageLinks.prototype.getLinks = function (  ) {
<<<<<<< HEAD
    var data = [
        {"page": "Usage", "url": "#/usage"},
        {"page": "Payments", "url": "#/payment", "subLinks":{"page":"Make a Payment", "url":"#/billing"}},
        {"page": "Plan", "url": "#/plan"}

    ];
=======
        var data = [
            {"page": "Usage", "url": "#/usage"},
            {"page": "Payments", "url": "#/billing"},
            {"page": "UserProfile", "url": "#/userProfile"},
            {"page": "ChangeProfile", "url": "#/changeUserProfile"},
            {"page": "Password", "url": "#/password"},
            {"page": "Plan", "url": "#/plan"},
            {"page": "Order", "url": "#/order"}
        ];
>>>>>>> f3ec3e711df0445b20ac9ab730b40c7de5e78217
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
