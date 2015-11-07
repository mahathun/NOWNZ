

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

    console.log(User);

    $scope.error = false;
    $scope.success = false;
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
      if (oldPassword != undefined && newPassword2 != undefined ){

        if (newPassword1 == newPassword2){
          $("#loadingScreen").show();

          var password = {"old_password": oldPassword, "new_password": newPassword1}
          console.log(oldPassword, newPassword1)
          Api.setPassword(oldPassword, newPassword1, null)
            .then(function () {
                $("#loadingScreen").hide();

                $scope.error= false;
                $scope.success = true;
                $scope.successMessage = "You have successfully changed your password.";
              //console.log("password changed");

              }, function errorCallback(response) {
                $("#loadingScreen").hide();

                $("#loadingScreen").hide();
                $scope.success = false;

                $scope.error = true;
                $scope.errorMessage = "It seems you have entered an incorrect current password";


                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
          }
          else{
          $scope.error = true;
          $scope.success = false;

          $scope.errorMessage = "Passwords do not match. Enter the same password to both fields";
            //console.log("password not changed");
          }

      }else{

        $scope.error = true;
        $scope.success = false;

        $scope.errorMessage = "You can't leave these fields blank.";
          //console.log("password not changed");
      };
    }


    initValidatePassword();
  }


  function initValidatePassword(){
    $("input[type=password]").keyup(function(){
      var ucase = new RegExp("[A-Z]+");
      var lcase = new RegExp("[a-z]+");
      var num = new RegExp("[0-9]+");

      if($("#password1").val().length >= 8){
        $("#8char").removeClass("glyphicon-remove");
        $("#8char").addClass("glyphicon-ok");
        $("#8char").css("color","#00A41E");
      }else{
        $("#8char").removeClass("glyphicon-ok");
        $("#8char").addClass("glyphicon-remove");
        $("#8char").css("color","#FF0004");
      }

      if(ucase.test($("#password1").val())){
        $("#ucase").removeClass("glyphicon-remove");
        $("#ucase").addClass("glyphicon-ok");
        $("#ucase").css("color","#00A41E");
      }else{
        $("#ucase").removeClass("glyphicon-ok");
        $("#ucase").addClass("glyphicon-remove");
        $("#ucase").css("color","#FF0004");
      }

      if(lcase.test($("#password1").val())){
        $("#lcase").removeClass("glyphicon-remove");
        $("#lcase").addClass("glyphicon-ok");
        $("#lcase").css("color","#00A41E");
      }else{
        $("#lcase").removeClass("glyphicon-ok");
        $("#lcase").addClass("glyphicon-remove");
        $("#lcase").css("color","#FF0004");
      }

      if(num.test($("#password1").val())){
        $("#num").removeClass("glyphicon-remove");
        $("#num").addClass("glyphicon-ok");
        $("#num").css("color","#00A41E");
      }else{
        $("#num").removeClass("glyphicon-ok");
        $("#num").addClass("glyphicon-remove");
        $("#num").css("color","#FF0004");
      }

      if($("#password1").val() == $("#password2").val()){
        $("#pwmatch").removeClass("glyphicon-remove");
        $("#pwmatch").addClass("glyphicon-ok");
        $("#pwmatch").css("color","#00A41E");
      }else{
        $("#pwmatch").removeClass("glyphicon-ok");
        $("#pwmatch").addClass("glyphicon-remove");
        $("#pwmatch").css("color","#FF0004");
      }
    });
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
