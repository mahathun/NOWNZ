//
//(function( ) {
//
//  var module;
//
//
//
//  module = angular.module( 'ngNow.portal' );
//
//
//
//  function OrderConfig( $stateProvider ) { ////need to rename the config to new file
//
//
//
//    $stateProvider.state( 'order', {
//
//      url: '/order',
//
//      views: {
//
//        main: {
//
//          controller: 'OrderCtrl',
//
//          templateUrl: 'source/app/order/order.html'
//
//        }
//
//      },
//
//      data: {
//
//        pageTitle: 'Order Status'
//
//      }
//
//    })
//
//  }
//
//
//
//  module.config( [
//
//    '$stateProvider',
//
//    OrderConfig
//
//  ]);
//
//
//
//
//
//  module.controller( 'OrderCtrl', [
//
//    '$scope',
//
//    'PageLinks',
//
//    'User',
//
//    'Api',
//
//    '$location',
//
//    OrderCtrl
//
//  ]);
//
//
//
//  //need to have a controller function...
//
//  function OrderCtrl( $scope,PageLinks,  User, $location ) {
//
//    $scope.user = User; // set this variable, so later we can access the user
//
//    $scope.pageLinks  = null;
//    //var test = PageLinks;
//    $scope.pageLinks = PageLinks.getLinks();
//    var stateOptions = {"_id": "","create_date": "2015-10-04T19:16:00.000Z","status": "complete"}
//
//
//
//  }
//
//
//
//
//
//}( ));
//
//
//
//(function() {
//    var module;
//    module = angular.module('ngNow.portal');
//
//    function OrderConfig($stateProvider) {
//        $stateProvider.state('order', {
//            url: '/order',
//            views: {
//                main: {
//                    controller: 'OrderCtrl',
//                    templateUrl: 'source/app/order/order.html'
//                }
//            },
//            data: {
//                pageTitle: 'Order Status'
//            }
//        });
//    }
//    module.config([
//        '$stateProvider',
//        OrderConfig
//    ]);
//    module.controller('OrderCtrl', [
//        '$scope',
//        'PageLinks',
//        'User',
//        'api',
//        '$location',
//        OrderCtrl
//    ]);
//    //need to have a controller function...
//    function OrderCtrl($scope, PageLinks, User, $location) {
//        $scope.user = User; // set this variable, so later we can access the user
//        $scope.pageLinks = null;
//        //var test = PageLinks;
//        $scope.pageLinks = PageLinks.getLinks();
//        var stateOptions = {
//            "_id": "",
//            "create_date": "2015-10-04T19:16:00.000Z",
//            "status": "complete"
//        }
//    }
//}( ));
//
//$("#menu-toggle").click(function(e) {
//
//    e.preventDefault();
//
//    $("#wrapper").toggleClass("active");
//
//    $("#carrot").removeClass("glyphicon-chevron-left");
//
//});