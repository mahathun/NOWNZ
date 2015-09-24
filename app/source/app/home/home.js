(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function HomeConfig( $stateProvider ) {

    $stateProvider.state( 'home', {
      url: '/',
      views: {
        main: {
          controller: 'HomeCtrl',
          templateUrl: 'source/app/home/home.tpl.html'
        }
      },
      data: {
        pageTitle: 'Home'
      }
    })
  }

  module.config( [
    '$stateProvider',
    HomeConfig
  ]);

  function HomeCtrl( $scope, User, Api ) {

    $scope.user = User;
    $scope.plan = { };

    $scope.logout = function( ) {
      User.logout( );
    };

    Api.getPlan( )
      .then( function ( plan ) {
        $scope.plan = plan;
      });

  }

  module.controller( 'HomeCtrl', [
    '$scope',
    'User',
    'Api',
    HomeCtrl
  ])

}( ));