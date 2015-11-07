(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function UserProfileConfig( $stateProvider ) {

    $stateProvider.state( 'userProfile', {
      url: '/userProfile',
      views: {
        main: {
          controller: 'UserProfileCtrl',
          templateUrl: 'source/app/userProfile/userProfile.tpl.html'
        }
      },
      data: {
        pageTitle: 'UserProfile'
      }
    })

   // $scope.currentPage = $stateProvider.data.pageTitle;
  }

  module.config( [
    '$stateProvider',
    UserProfileConfig
  ]);

  function UserProfileCtrl( $scope,PageLinks, User, Api,  $location) {
    if(window.innerWidth< 700) {
      //$("#wrapper").toggleClass("active");
      $("#carrot").removeClass("glyphicon-chevron-left");
      $("#carrot").addClass("glyphicon-chevron-right");
      $('#wrapper').toggleClass('toggled')

    }
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();

    console.log($scope.currentPage);


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

    }

  module.controller( 'UserProfileCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    UserProfileCtrl
  ])

}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});
