

(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function PlanConfig( $stateProvider ) {

    $stateProvider.state( 'plan', {
      url: '/plan',
      views: {
        main: {
          controller: 'PlanCtrl',
          templateUrl: 'source/app/plan/plan.tpl.html'
        }
      },
      data: {
        pageTitle: 'Plan'
      }
    })
  }

  module.config( [
    '$stateProvider',
    PlanConfig
  ]);

  function PlanCtrl( $scope,PageLinks, User, Api,  $location) {
    if(window.innerWidth< 700) {
      //$("#wrapper").toggleClass("active");
      $("#carrot").removeClass("glyphicon-chevron-left");
      $("#carrot").addClass("glyphicon-chevron-right");
      $('#wrapper').toggleClass('toggled')

    }
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();



    $scope.user = User;

    function get_Plan(){
      $("#loadingScreen").show();

      Api.getPlan( )
          .then( function ( plan ) {
            $("#loadingScreen").hide();

            $scope.plan = plan;

            if(!plan.internet.limit){
              plan.internet.limit  = "Unlimited"
            }


            //if(plan.phone.charge >0 && plan.internet.charge>0){
            //  $scope.plan.planType = "Phone and Data";
            //}else if(plan.phone.charge > 0 && plan.internet.charge==0){
            //  $scope.plan.planType = "Phone only";
            //}else if(plan.phone.charge == 0 && plan.internet.charge>0){
            //  $scope.plan.planType = "Phone only";
            //}else{
            //  $scope.plan.planType = "None";
            //
            //}



            if(plan.phone){
              $scope.plan.planType = "Phone and Data";
            }else{
              $scope.plan.planType = "Naked Broadband";
            }
            //console.log(plan);
          });



      $("#loadingScreen").show();

      Api.getNetworkStatus( )
          .then( function ( status ) {
            $("#loadingScreen").hide();

            $scope.networkStatus = status;
            // console.log(status);
          });
    }

    //console.log($scope.user.session.user.username);
    $("#loadingScreen").show();

    Api.getPlan( )
        .then( function ( plan ) {
          $("#loadingScreen").hide();

          $scope.plan = plan;

          if(!plan.internet.limit){
            plan.internet.limit  = "Unlimited"
          }

          //if(plan.phone.charge >0 && plan.internet.charge>0){
          //  $scope.plan.planType = "Phone and Data";
          //}else if(plan.phone.charge > 0 && plan.internet.charge==0){
          //  $scope.plan.planType = "Phone only";
          //}else if(plan.phone.charge == 0 && plan.internet.charge>0){
          //  $scope.plan.planType = "Phone only";
          //}else{
          //  $scope.plan.planType = "None";
          //
          //}


          if(plan.phone){
            $scope.plan.planType = "Phone and Data";
          }else{
            $scope.plan.planType = "Naked Broadband";
          }
          console.log(plan);
        });

    Api.getNetworkStatus( )
        .then( function ( status ) {
          $scope.networkStatus = status;
         // console.log(status);
        });

    var plan ={
      "phone": {
        "charge": 0
      },
      "internet": {
        "connection": "ADSL",
        "limit": 0,
        "charge": 0
      },
      "charge": 0
    };
    $scope.changePlan = function (planType) {
      //console.log(planType);

      switch (planType){
        case 'plan1':
              plan = {

                "internet": {
                  "connection": "ADSL",
                  "limit": 100,
                  "charge": 70
                },
                "charge": 70
              };
              change_Plan(plan);
              break;
        case 'plan2':
              plan = {
                "phone": {
                  "charge": 10
                },
                "internet": {
                  "connection": "VDSL",
                  "limit": 50,
                  "charge": 60
                },
                "charge": 70
              };
          change_Plan(plan);

          break;

        case 'plan3':
          plan = {
            "phone": {
              "charge": 24
            },
            "internet": {
              "connection": "Fibre",
              "limit": 0,
              "charge": 75
            },
            "charge": 99
          };
          change_Plan(plan);

          break;

      }


    };


    function change_Plan(p){
      Api.updatePlan( p, null)
          .then( function ( ) {
            //console.log(p);
            // console.log(status);
            get_Plan();
          });
    }


  }




  module.controller( 'PlanCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    PlanCtrl
  ])



}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});

