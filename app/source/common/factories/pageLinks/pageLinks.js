
(function() {
    var module;

    module = angular.module('ngNow.portal');

    function PageLinks($http ) {

        this.$http = $http;

    }

    PageLinks.prototype.getLinks = function (  ) {
    var data = [
        {"page": "page 1", "url": "/page 1"},
        {"page": "page 2", "url": "/page 2"},
        {"page": "page 3", "url": "/page 3"}

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