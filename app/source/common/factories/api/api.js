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