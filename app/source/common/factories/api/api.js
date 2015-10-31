/**
 * Created by thaindu on 30/10/2015.
 */
(function(){
    var module;

    module = angular.module( 'ngNow.portal' );


    function Api( $http, $q, session, swaggerClient ) {
        this.$http = $http;
        this.session = session;
        this.$q = $q;
        this.swaggerClient = swaggerClient;
    }

    Api.prototype.login = function ( username, password, callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'user',
            'login',
            {
                username: username,
                password: password
            },
            callback,
            false
        )

    };



    //------------------- Usage Starts -------------------------

    // call usage
    Api.prototype.getCallingUsage = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'usage',
            'getCallingUsage',
            { },
            callback,
            true
        )
    };

    // data usage
    Api.prototype.getDataUsage = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'usage',
            'getInternetUsage',
            { },
            callback,
            true
        )
    };

    // wifi usage
    Api.prototype.getPublicDataUsage = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'usage',
            'getPublicWiFiUsage',
            { },
            callback,
            true
        )
    };
    //------------------- Usage Ends -------------------------

    //------------------- Plan Start-------------------------
    //network status
    Api.prototype.getNetworkStatus = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'network',
            'getNetworkStatus',
            { },
            callback,
            true
        )
    };

    // get plan
    Api.prototype.getPlan = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'plan',
            'getPlan',
            { },
            callback,
            true
        )
    };

    Api.prototype.updatePlan = function ( obj,callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'plan',
            'updatePlan',
            {plan:obj},
            callback,
            true
        )
    };
    //------------------- Plan Ends-------------------------


//------------------- Password Starts -------------------------
  Api.prototype.setPassword = function ( newPass,oldPass ,callback ) {

       // Callback is optional
        callback = callback || null;

        return this.call(
            'user',
            'setPassword',
            { old_password:oldPass, new_password:newPass},
            callback,
            true
          )

   };
//------------------- Passowrd Ends -------------------------

//------------------- User Profile Starts -------------------------

    Api.prototype.getUserEmailMobile = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'user',
            'getUserContactInfo',
            { },
            callback,
            true
        )
    };

    Api.prototype.getUserProfile = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'user',
            'getUser',
            { },
            callback,
            true
        )
    };

    Api.prototype.setUserEmailMobile = function (obj, callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'user',
            'setUserContactInfo',
            { contact:obj},
            callback,
            true
        )
    };


//------------------- User Profile Ends -------------------------

    //------------------- payment Start-------------------------
    //get payment
    Api.prototype.getTransactions = function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'billing',
            'getTransactions',
            { },
            callback,
            true
        )
    };

    //get balance
    Api.prototype.getBalance= function ( callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'billing',
            'getBalance',
            { },
            callback,
            true
        )
    };


    //make a payment
    Api.prototype.savePayment = function (obj, callback ) {

        // Callback is optional
        callback = callback || null;

        return this.call(
            'billing',
            'createTransaction',
            { payment:obj},
            callback,
            true
        )
    };


    //------------------- payment Ends-------------------------


    Api.prototype.call = function ( tag, operationId, options, callback, authenticated ) {
        var deferred;

        if ( authenticated ) {
            options.Authorization = 'Bearer ' + this.session.token;
        }

        deferred = this.$q.defer( );

        function internalCallback( response ) {
            deferred.resolve( response.obj );
            callback instanceof Function && callback( null, response );
        }
        function internalErrorCallback( error ) {
            deferred.reject( error );
            callback instanceof Function && callback( error, null );
        }


        this.swaggerClient[ tag ][ operationId ](
            options,
            internalCallback,
            internalErrorCallback
        );

        return deferred.promise;
    };


    function ApiFactory( $http, $q, session, SwaggerClient ){
        return new Api( $http, $q, session, SwaggerClient )
    }

    module.factory(
        'Api',
        [
            '$http',
            '$q',
            'Session',
            'SwaggerClient',
            ApiFactory
        ]
    );

}( ));
