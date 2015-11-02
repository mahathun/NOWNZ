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


  function AppCtrl( $scope, Api, Session, $location, User ) {

    $scope.user = User;

    $scope.saveProfileSuccess = false;
    $scope.saveProfileError = false;

    $scope.logout = function( ) {
      $location.path('/login');
      $(".footer").hide();
      User.logout( );
      $location.reload();
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



    var profile = { };
    //$scope.usage = profile;
    //var username, name, create_date;
    console.log(".");
    Api.getUserEmailMobile(  )
        .then( function ( user ) {
          //$scope.username = username;
          console.log(user);
          $scope.email = user.email;
          $scope.mobile = user.mobile;
        });

    Api.getUserProfile(  )
        .then( function ( user ) {
          console.log(user);
          $scope.username = user.username;
          $scope.name = user.name;
          $scope.create_date = user.create_date.substring(0,10);

        });

    $scope.getUserProfile = function(){
      Api.getUserEmailMobile(  )
          .then( function ( user ) {
            //$scope.username = username;
            console.log(user);
            $scope.email = user.email;
            $scope.mobile = user.mobile;
          });

      Api.getUserProfile(  )
          .then( function ( user ) {
            console.log(user);
            $scope.username = user.username;
            $scope.name = user.name;
            $scope.create_date = user.create_date.substring(0,10);

          });

    }

    $scope.saveProfile = function ( ) {

      $("#loadingScreen").show();

      if ($scope.email == null && $scope.mobile == null){
        console.log("Nothing inputted")
      }
      else if ($scope.email == "") {
        Api.setUserEmailMobile({"email":$scope.email, "mobile": $scope.mobile})
            .then( function ( ) {
              $("#loadingScreen").hide();
              $scope.saveProfileSuccess = true;


              console.log("changed", $scope.email,$scope.mobile)
            })
      }
      else if ($scope.mobile == "") {
        Api.setUserEmailMobile({"email":$scope.email, "mobile": $scope.mobile})
            .then( function ( ) {
              $("#loadingScreen").hide();
              $scope.saveProfileSuccess = true;

              console.log("changed", $scope.email,$scope.mobile)
            })
      }
      else{
        Api.setUserEmailMobile({"email":$scope.email, "mobile": $scope.mobile})
            .then( function ( ) {
              $("#loadingScreen").hide();
              $scope.saveProfileSuccess = true;

              console.log("changed", $scope.email,$scope.mobile)
            })
      }
    }

  }

  module.controller( 'AppCtrl', [
    // Define all your dependencies for your controller like this
    '$scope',
      'Api',
    'Session',
    '$location',
    'User',
    // The last value in this array will be the function called for your controller
    AppCtrl
  ])


}( ));