

(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function ChangeProfileConfig( $stateProvider ) {

    $stateProvider.state( 'changeProfile', {
      url: '/changeUserProfile',
      views: {
        main: {
          controller: 'ChangeProfileCtrl',
          templateUrl: 'source/app/changeUserProfile/changeUserProfile.tpl.html'
        }
      },
      data: {
        pageTitle: 'ChangeProfile'
      }
    })

   // $scope.currentPage = $stateProvider.data.pageTitle;
  }

  module.config( [
    '$stateProvider',
    ChangeProfileConfig
  ]);

  function ChangeProfileCtrl( $scope,PageLinks, User, Api,  $location) {
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();

    console.log($scope.currentPage);

    console.log(User);


    $scope.user = User;
    $scope.plan = { };


    $scope.logout = function( ) {
      User.logout( );
    };

    $scope.contact = function(){
      console.log('test')
      $location.path( '/contact' );
    }
    Api.getPlan( )
      .then( function ( plan ) {
        $scope.plan = plan;
      });

    $scope.submit = function ( ) {
      var undifined = $scope.undifined;
      var aChange = false;
      var currentEmail;
      var currentMobile;
      Api.getUserEmailMobile(  )
        .then( function ( user ) {
          //$scope.username = username;
          console.log(user);
          currentEmail = user.email;
          currentMobile = user.mobile;
        });
      if ($scope.email == undifined && $scope.mobile == undifined){
        aChange = false
        console.log("Nothing inputted")
      }
      if ($scope.email == undifined && $scope.mobile != undifined) {
        aChange = true
          var contact = {
            "email": currentEmail,
            "mobile": $scope.mobile
          }
            console.log("changed mobile", $scope.email, $scope.mobile)
        }

      if ($scope.email != undifined && $scope.mobile == undifined) {
        aChange = true
        var contact = {
          "email": $scope.email,
          "mobile": currentMobile
        }
            console.log("changed email", $scope.email, $scope.mobile)
        }
        if ($scope.email != undifined && $scope.mobile != undifined ) {
          aChange = true
          var contact = {
            "email": $scope.email,
            "mobile": $scope.mobile
          }
          console.log("changed both", $scope.email, $scope.mobile)
          }
          if (aChange){
            changeDetails(contact);
          }
      }

      function changeDetails(d){
        Api.setUserEmailMobile(d, null)
          .then( function(){
            console.log("email and mobile changed to:", d);
          });

      }


     }


  module.controller( 'ChangeProfileCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    ChangeProfileCtrl
  ])

}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});
