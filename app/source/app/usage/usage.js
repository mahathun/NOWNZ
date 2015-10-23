

(function( ) {
  var module;

  module = angular.module( 'ngNow.portal' );

  function UsageConfig( $stateProvider ) {

    $stateProvider.state( 'usage', {
      url: '/usage',
      views: {
        main: {
          controller: 'UsageCtrl',
          templateUrl: 'source/app/usage/usage.tpl.html'
        }
      },
      data: {
        pageTitle: 'Usage'
      }
    })
  }

  module.config( [
    '$stateProvider',
    UsageConfig
  ]);

  function UsageCtrl( $scope,PageLinks, User, Api,  $location) {
    $scope.pageLinks  = null;
    //var test = PageLinks;
    $scope.pageLinks = PageLinks.getLinks();



    $scope.user = User;
    console.log($scope.user.session.user.name);
    //calling usage

    var usage = {call:null, data:null, publicData: null};


    $scope.usage = usage;


    Api.getCallingUsage( )
      .then( function ( usage ) {
          var call = usage;
        $scope.usage.call = call;


          //data usage
          Api.getDataUsage( )
              .then( function ( usage ) {
                var data = usage;
                $scope.usage.data = data;

                //wifi usage
                Api.getPublicDataUsage( )
                    .then( function ( usage ) {
                      var publicData = usage;
                      $scope.usage.publicData= publicData;

                      //initialising the circles
                      init($scope.usage);
                      initText($('#circle1'),$scope.usage.call,"MINS", " MINS remaining");
                      initText($('#circle2'),$scope.usage.data,"DATA", " GB remaining");
                      initText($('#circle3'),$scope.usage.publicData,"WiFi", " GB used");

                      renewalDates($scope.usage);
                    });
              });
        });





        //temporary
    //$scope.usage = { call:{limit:100, used:45},data:{limit:23,used:2},publicData:{used:34}};
    //init($scope.usage);
    //initText($('#circle1'),$scope.usage.call,"MINS", " MINS remaining");
    //initText($('#circle2'),$scope.usage.data,"DATA", " GB remaining");
    //initText($('#circle3'),$scope.usage.publicData,"WiFi", " GB used");
    //temp


  }

  function initText(object,val,typeText, text){
    object
        .on('resizestop', function() {
          this.circleProgress();
        });

    object.on('circle-animation-progress', function(e, v) {
      var leftUsageValue = (val.limit==0)?100: ((val.limit-val.used)/val.limit)*100;
      var obj = $(this).data('circle-progress'),
          ctx = obj.ctx,
          s = obj.size,
          sv = ( leftUsageValue * v).toFixed(),
          fill = obj.arcFill;

      ctx.save();
      ctx.font = "bold " + s / 5+ "px sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#AAAAAA';
      ctx.fillText(typeText, s/2,s/2.8);


      //draw line
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#AAAAAA';

      ctx.beginPath();
      ctx.moveTo(0+15, s/2);
      ctx.lineTo(s-15, s/2);
      ctx.closePath();
      ctx.stroke();

      ctx.font = "bold " + s / 12+ "px sans-serif";
      ctx.fillText( (typeText=="WiFi")?val.used +text:sv + text , s / 2, s / 1.7);
      ctx.restore();
    });

  }

  function init(usage){
    var start_Angle = -0.5 * Math.PI;
    var thickness = 8;
    var default_size = 160;

    var colorArray = ['#FF3000','#FF7000','#FFA000','#FFD000','#FFFF00','#D0FF00','#A0FF00','#70FF00','#40FF00','#10FF00'];

    var val1 = (usage.call.limit==0)?1:((usage.call.limit - usage.call.used)/usage.call.limit);
    var val2 = (usage.data.limit==0)?1:((usage.data.limit - usage.data.used)/usage.data.limit);
    var val3 = usage.publicData.used;

    console.log( usage);

    console.log(((Math.round(val2*10)==10)?'9':(Math.round(val2*10)))+'\n'+colorArray[((Math.round(val2*10)==10)?'9':(Math.round(val2*10)))]+'\n'+val2);
    //console.log(val);
    
    $('#circle1').circleProgress({
      value: val1 ,
      size: default_size,
      startAngle: start_Angle,
      thickness: thickness,
      fill: {color:colorArray[((Math.round(val1*10)==10)?'9':(Math.round(val1*10)))]}
    });

    $('#circle2').circleProgress({
      value:val2,
      size: default_size,
      startAngle: start_Angle,
      thickness : thickness,
      fill: {color:colorArray[((Math.round(val2*10)==10)?'9':(Math.round(val2*10)))]}

    });

    $('#circle3').circleProgress({
      value: 1,
      size: default_size,
      startAngle: start_Angle,
      thickness:thickness,
      fill: {
        gradient: ["green","yellow",  "red"]
      },
      fill: {color:colorArray[9]}
    });

    //$('#circle1').circleProgress({
    //  value: val1 ,
    //  size: default_size-50,
    //  startAngle: start_Angle,
    //  thickness: thickness,
    //  fill: {color:colorArray[((Math.round(val1*10)==10)?'9':(Math.round(val1*10)))]}
    //});


  }


  function renewalDates(usage){
    var start = null;
    var end = null;

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds


    //var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

    if(usage.call.start != null & usage.call.end != null){
      start = new Date(usage.call.start);
      end = new Date(usage.call.end);
    }else if(usage.data.start != null && usage.data.end != null){
      start = new Date(usage.data.start);
      end = new Date(usage.data.end);
    }

    numberOfDays = Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));
    console.log(Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay))));

    $('.remainingDays').html("You have <b>" + numberOfDays + "</b> days remaining for renewal.");

  }

  module.controller( 'UsageCtrl', [
    '$scope',
    'PageLinks',
    'User',
    'Api',
    '$location',
    UsageCtrl
  ])



}( ));


$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#carrot").removeClass("glyphicon-chevron-left");
});


