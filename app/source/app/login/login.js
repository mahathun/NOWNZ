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
    if(User.session.token!=null){
      $location.path('/usage');
    }
    $scope.username = '';
    $scope.password = '';
    $scope.callb=null;
    $scope.loginError = null;


    $scope.submit = function ( ) {


      if($scope.username != "" && $scope.password != "") {
        $("#loadingScreen").show();
        $scope.emptyUsername = ($scope.username == "")? 'true': null;
        $scope.emptyPassword = ($scope.password == "")? 'true': null;
        User.login($scope.username, $scope.password)
            .then(function () {
              $("#loadingScreen").hide();

              $location.path('/usage');
              console.log(test);
              $scope.loginError = null;
              $(".footer").show();
              $(".background-index").css('overflow', 'visible');
            }, function errorCallback(response) {
              $("#loadingScreen").hide();

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
    var txt = $(document).height();
    console.log(txt);
    $("#loginBody").height(txt);
    $(".background-index").css('overflow', 'hidden');

    $(".footer").hide();
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




}( ));

