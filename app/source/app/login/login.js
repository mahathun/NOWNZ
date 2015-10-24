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
    $scope.callb=null;
    $scope.loginError = null;


    $scope.submit = function ( ) {

      if($scope.username != "" && $scope.password != "") {
        $scope.emptyUsername = ($scope.username == "")? 'true': null;
        $scope.emptyPassword = ($scope.password == "")? 'true': null;
        User.login($scope.username, $scope.password)
            .then(function () {
              $location.path('/usage');
              console.log(test);
              $scope.loginError = null;
              $(".footer").show();
            }, function errorCallback(response) {
              $scope.username = "";
              $scope.password = "";

              $scope.loginError = response;
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
      }else{

        $scope.emptyUsername = ($scope.username == "")? 'true': null;
        $scope.emptyPassword = ($scope.password == "")? 'true': null;
      }
    };


  }

  function test(){
    alert("tes");
  }

  module.controller( 'LoginCtrl', [
    '$scope',
    'User',
    '$location',
    LoginCtrl
  ])

  var height = $(window).height()-50;

  $(".background").height(height);
  //$(".footer").hide();



}( ));

