

(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function PasswordConfig( $stateProvider ) {

    $stateProvider.state( 'password', {
      url: '/password',
      views: {
        main: {
          controller: 'PasswordCtrl',
          templateUrl: 'source/app/password/password.tpl.html'
        }
      },
      data: {
        pageTitle: 'Password'
      }
    })

   // $scope.currentPage = $stateProvider.data.pageTitle;
  }

  module.config( [
    '$stateProvider',
    PasswordConfig
  ]);

  function PasswordCtrl( $scope,PageLinks, User, Api,  $location) {
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();

    console.log($scope.currentPage);

    console.log(User);


    $scope.user = User;
    $scope.old_password = { };


    $scope.logout = function( ) {
      User.logout( );
    };

    $scope.contact = function(){
      console.log('test')
      $location.path( '/contact' );
    }
    $scope.submit = function ( ) {

      var newPassword1 = $scope.newPassword1;
      var newPassword2 = $scope.newPassword2;
      var oldPassword = $scope.oldPassword;
      console.log(newPassword1,newPassword2,oldPassword)
      if (oldPassword != ""){

        if (newPassword1 == newPassword2){
          var password = {"old_password": oldPassword, "new_password": newPassword1}
          console.log(oldPassword, newPassword1)
          Api.setPassword(oldPassword, newPassword1, null)
            .then(function () {
              console.log("password changed");

              })

            //Api.setPassword({old_password:"123", new_password:newPassword1});

          }
          else{
            console.log("password not changed");
          }

          }
        else{
          console.log("password not changed");
      };
    }
  }


  module.controller( 'PasswordCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    PasswordCtrl
  ])

}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});
