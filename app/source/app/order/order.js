

(function( ) {
    var module;

    module = angular.module( 'ngNow.portal' );

    function OrderConfig( $stateProvider ) {

        $stateProvider.state( 'order', {
            url: '/order',
            views: {
                main: {
                    controller: 'OrderCtrl',
                    templateUrl: 'source/app/order/order.html'
                }
            },
            data: {
                pageTitle: 'Order'
            }
        })

        // $scope.currentPage = $stateProvider.data.pageTitle;
    }

    module.config( [
        '$stateProvider',
        OrderConfig
    ]);
    function getRandom() {
        return Math.random();
    }

    function OrderCtrl( $scope,PageLinks, User, Api,  $location) {
        $scope.user = User; // set this variable, so later we can access the user
        $scope.pageLinks = null;
        //var test = PageLinks;
        $scope.pageLinks = PageLinks.getLinks();
        $scope.orderStatus = {};
        $scope.helpText="";

        var randomInt = null;
        var colourchange = null;
        var stateOptions = null;


        randomInt = parseInt(getRandom() *10);

        
        console.log(randomInt);
        
        //dummy data showing that the order.status will change the html to show what is needed.
        if (randomInt >5)
        {
            stateOptions = {
                "_id": "",
                "create_date": "2015-10-04T19:16:00.000Z",
                "status": "processing"
            }
            colourchange = document.getElementById("processing");
            colourchange.style.backgroundColor = "orange";
            var processingText = "Your order is being processed, if any errors occur we will get in contact with you."
            $scope.helpText = processingText;
        }
        else if (randomInt <=5)
        {
            stateOptions = {
                "_id": "",
                "create_date": "2015-10-04T18:16:00.000Z",
                "status": "complete"
            }
            colourchange = document.getElementById("completed");
            colourchange.style.backgroundColor = "green";
            var completeText = "Your order is completed."
            $scope.helpText = completeText;
        }
        $scope.orderStatus = stateOptions;

        // console.log($scope.orderStatus)
        colourchange = null;

    }

    module.controller( 'OrderCtrl', [
        '$scope',
        'PageLinks',
        'User',
        'Api',
        '$location',
        OrderCtrl
    ])

}( ));


$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
    $("#carrot").removeClass("glyphicon-chevron-left");
});