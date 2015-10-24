(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function ContactConfig( $stateProvider ) {

    $stateProvider.state( 'contact', {
      url: '/contact',
      views: {
        main: {
          controller: 'ContactCtrl',
          templateUrl: 'source/app/contact/contact-tpl.html'
        }
      },
      data: {
        pageTitle: 'Contact'
      }
    })
  }

  module.config( [
    '$stateProvider',
    ContactConfig
  ]);

  function ContactCtrl( $scope, User, Api ) {

    $scope.user = User;
    $scope.plan = { };

    $scope.logout = function( ) {
      User.logout( );
    };

    Api.getContact( )
      .then( function ( contact ) {
        $scope.contact = contact;
      });

  }

  module.controller( 'ContactCtrl', [
    '$scope',
    'User',
    'Api',
    ContactCtrl
  ])

}( ));