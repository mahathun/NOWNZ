(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function LoginConfig( $stateProvider ) {

    $stateProvider.state( 'login', {
      url: '/login',
      views: {
        main: {
          controller: 'LoginCtrl',
          templateUrl: 'source/app/login/login.tpl.html'
        }
      },
      data: {
        pageTitle: 'Home'
      }
    })
  }

  module.config( [
    '$stateProvider',
    LoginConfig
  ]);

  function LoginCtrl( $scope, User, $location ) {

    $scope.username = '';
    $scope.password = '';

    $scope.submit = function ( ) {

      User.login( $scope.username, $scope.password )
        .then( function( ) {
          $location.path( '/' );
        });
    };

  }

  module.controller( 'LoginCtrl', [
    '$scope',
    'User',
    '$location',
    LoginCtrl
  ])

}( ));