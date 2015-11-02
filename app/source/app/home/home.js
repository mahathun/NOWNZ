

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

   // $scope.currentPage = $stateProvider.data.pageTitle;
  }

  module.config( [
    '$stateProvider',
    HomeConfig
  ]);

  function HomeCtrl( $scope,PageLinks, User, Api,  $location) {
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();

    console.log($scope.currentPage);

    console.log(User);


    $scope.user = User;
    $scope.plan = { };


    $scope.logout = function( ) {
      $location.path('/login');

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


  }

  module.controller( 'HomeCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    HomeCtrl
  ])

}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});

