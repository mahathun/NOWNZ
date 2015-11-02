

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
    $scope.cardError = false;
    $scope.paymentSuccess = false;


    $scope.user = User;

    //calling usage

    $scope.payNow = function(){

      var payment =  {
        "amount": $scope.amount,
        "reason": $scope.reason,
        "card": {
          "number": $scope.cardNo,
          "name": $scope.name,
          "security": {
            "number": $scope.securityNo,
            "month": $scope.expiryMonth,
            "year": $scope.expiryYear
          }
        }
      };
      //console.log(payment);

      $("#loadingScreen").show();


      Api.savePayment( payment )
          .then( function ( pay ) {
            $("#loadingScreen").hide();

            //$scope.username = username;
            console.log("success");

            payment_Success();
          }, function errorCallback(response) {
            $("#loadingScreen").hide();

            showCardError()
          });



      function payment_Success(){
        $scope.cardError = false;
        $scope.paymentSuccess = true;

        setTimeout(function(){$('.nextBtn').trigger('click')},1000);

      }
      function showCardError(){
        $scope.cardError = true;
        $scope.paymentSuccess = false;



      }

    }



      initSteps();

  }


  module.controller( 'BillingCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    BillingCtrl
  ])



}( ));



function initSteps(){



  var navListItems = $('div.setup-panel div a'),
      allWells = $('.setup-content'),
      allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
        $item = $(this);

    if (!$item.hasClass('disabled')) {
      navListItems.removeClass('btn-primary').addClass('btn-default');
      $item.addClass('btn-primary');
      allWells.hide();
      $target.show();
      $target.find('input:eq(0)').focus();
    }
  });

  allNextBtn.click(function(){
    var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='email'],input[id='amount']"),
        isValid = true;

    $(".form-group").removeClass("has-error");
    for(var i=0; i<curInputs.length; i++){
      if (!curInputs[i].validity.valid){
        console.log(curInputs[i]);
        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");
      }

      if(i==2 && curInputs[i].value<0){

        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");

      }
    }

    if (isValid)
      nextStepWizard.removeAttr('disabled').trigger('click');
  });

  $('div.setup-panel div a.btn-primary').trigger('click');
}






/////////////////////////////////// payment controller ////////////////////////////////


(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function PaymentConfig( $stateProvider ) {

    $stateProvider.state( 'payment', {
      url: '/payment',
      views: {
        main: {
          controller: 'PaymentCtrl',
          templateUrl: 'source/app/billing/payment.tpl.html'
        }
      },
      data: {
        pageTitle: 'Payment'
      }
    })
  }

  module.config( [
    '$stateProvider',
    PaymentConfig
  ]);

  function PaymentCtrl( $scope,PageLinks, User, Api,  $location) {
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();



    $scope.user = User;

    //calling usage

    $scope.paymentHistory = {};
    $("#loadingScreen").show();

    Api.getTransactions( )
        .then( function ( transactions ) {

          $("#loadingScreen").hide();

          $scope.paymentHistory = transactions;
          console.log($scope.paymentHistory);

         setTimeout(function(){ initTable()}, 500) ;
        });

    Api.getBalance( )
        .then( function ( balance ) {

          $scope.balance= -1* parseInt(balance.value);
          console.log($scope.balance);


        });


  }


  module.controller( 'PaymentCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    PaymentCtrl
  ])



}( ));


function initTable(){
  var $table = $('#fresh-table'),
      $alertBtn = $('#alertBtn'),
      full_screen = false;

  $().ready(function(){
    $table.bootstrapTable({
      toolbar: ".toolbar",

      //showRefresh: true,
      search: true,
      showToggle: true,
      showColumns: true,
      pagination: true,
      striped: true,
      pageSize: 3,
      pageList: [3,8,25,50,100],

      formatShowingRows: function(pageFrom, pageTo, totalRows){
        //do nothing here, we don't want to show the text "showing x of y from..."
      },
      formatRecordsPerPage: function(pageNumber){
        return pageNumber + " rows visible";
      },
      icons: {
        refresh: 'fa fa-refresh',
        toggle: 'glyphicon glyphicon-th-list',
        columns: 'glyphicon glyphicon-option-vertical',
        detailOpen: 'fa fa-plus-circle',
        detailClose: 'fa fa-minus-circle'
      }
    });



    $(window).resize(function () {
      $table.bootstrapTable('resetView');
    });


    window.operateEvents = {
      'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
      },
      'click .edit': function (e, value, row, index) {
        alert('You click edit icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
      },
      'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
          field: 'id',
          values: [row.id]
        });

      }
    };

    $alertBtn.click(function () {
      alert("You pressed on Alert");
    });

  });


  function operateFormatter(value, row, index) {
    return [
      '<a rel="tooltip" title="Like" class="table-action like" href="javascript:void(0)" title="Like">',
      '<i class="fa fa-heart"></i>',
      '</a>',
      '<a rel="tooltip" title="Edit" class="table-action edit" href="javascript:void(0)" title="Edit">',
      '<i class="fa fa-edit"></i>',
      '</a>',
      '<a rel="tooltip" title="Remove" class="table-action remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-remove"></i>',
      '</a>'
    ].join('');
  }

}

$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});

