

(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function BillingConfig( $stateProvider ) {

    $stateProvider.state( 'billing', {
      url: '/billing',
      views: {
        main: {
          controller: 'BillingCtrl',
          templateUrl: 'source/app/billing/billing.tpl.html'
        }
      },
      data: {
        pageTitle: 'Billing'
      }
    })
  }

  module.config( [
    '$stateProvider',
    BillingConfig
  ]);

  function BillingCtrl( $scope,PageLinks, User, Api,  $location) {
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();



    $scope.user = User;

    //calling usage


  }


  module.controller( 'BillingCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    BillingCtrl
  ])


  $('.nav-tabs > li > a').click(function() {
    if($(this).hasClass('disabled')) {
      return false;
    } else {
      var linkIndex = $(this).parent().index() - 1;
      $('.nav-tabs > li').each(function(index, item) {
        $(this).attr('rel-index', index - linkIndex);
      });
    }
  });

}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});


$('#step-1-next').click(function() {
  // Check values here
  var isValid = true;

  if(isValid) {
    $('.nav-tabs > li:nth-of-type(2) > a').removeClass('disabled').click();
  }
});
$('#step-2-next').click(function() {
  // Check values here
  var isValid = true;

  if(isValid) {
    $('.nav-tabs > li:nth-of-type(3) > a').removeClass('disabled').click();
  }
});
$('#step-3-next').click(function() {
  // Check values here
  var isValid = true;

  if(isValid) {
    $('.nav-tabs > li:nth-of-type(4) > a').removeClass('disabled').click();
  }
});

