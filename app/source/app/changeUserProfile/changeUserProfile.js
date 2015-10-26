

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
      if ($scope.email == null && $scope.mobile == null){
        console.log("Nothing inputted")
      }
      else if ($scope.email == "") {
        Api.setUserEmailMobile({"email":$scope.email, "mobile": $scope.mobile})
          .then( function ( ) {
            console.log("changed", $scope.email,$scope.mobile)
        })
      }
      else if ($scope.mobile == "") {
        Api.setUserEmailMobile({"email":$scope.email, "mobile": $scope.mobile})
          .then( function ( ) {
            console.log("changed", $scope.email,$scope.mobile)
        })
      }
      else{
        Api.setUserEmailMobile({"email":$scope.email, "mobile": $scope.mobile})
          .then( function ( ) {
            console.log("changed", $scope.email,$scope.mobile)
        })
      }
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
