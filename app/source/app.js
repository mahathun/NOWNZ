/* We are going to wrap all files in an anonymous function*/
(function( ){
  var module;

  /*
    For this project we will just use a single module, ngNow.portal
  */
  module = angular.module( 'ngNow.portal', [

    /* Define all your angular dependencies here */

    'ui.router'

  ]);

  function AppConfig( $urlRouterProvider ) {

    // A default route if the requested route can't be found
    $urlRouterProvider.otherwise( '/' )

  }

  module.config( [
    '$urlRouterProvider',
    AppConfig
  ]);


  function AppCtrl( $scope, Session, $location, User ) {

    $scope.user = User;

    $scope.logout = function( ) {
      $location.path('/login');
      $(".footer").hide();
      User.logout( );
    };


    function checkLoggedIn( ) {
      if (
        (
          !Session.token ||
          !Session.user
        ) &&
        $location.path( ) !== '/login'
      ) {
        // Redirect if not on login page and no user details
        $location.path( '/login' );
        $(".footer").hide();
      }
    }

    $scope.$on( '$stateChangeSuccess', function (event, toState ) {


      // Change the title based on page
      var pageTitle = 'Now Portal';

      if ( toState.data && toState.data.pageTitle ) {
        pageTitle = toState.data.pageTitle + ' | ' + pageTitle;
      }

      $scope.pageTitle = pageTitle;

      // Some simple "security"

      checkLoggedIn( );

    });

    $scope.$on( 'sessionChange', checkLoggedIn )

  }

  module.controller( 'AppCtrl', [
    // Define all your dependencies for your controller like this
    '$scope',
    'Session',
    '$location',
    'User',
    // The last value in this array will be the function called for your controller
    AppCtrl
  ])


}( ));